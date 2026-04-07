/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { client, urlFor } from '@/lib/sanity'
import {
  AUTHOR_BY_SLUG_QUERY,
  ARTICLES_BY_AUTHOR_QUERY,
  ALL_AUTHOR_SLUGS_QUERY,
} from '@/lib/queries'
import { getArticleImage, timeAgo } from '@/lib/utils'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── ISR ──
export const revalidate = 60

// ── Static Params ──
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(ALL_AUTHOR_SLUGS_QUERY)
    return (slugs || []).map((slug) => ({ slug }))
  } catch {
    return []
  }
}

// ── Metadata ──
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const author = await fetchAuthor(params.slug)
  if (!author) return { title: 'लेखक नहीं मिला — News Potli' }

  const description = author.bio
    ? author.bio.slice(0, 155)
    : `${author.name} — ${author.role || 'पत्रकार'} | News Potli`
  const photoUrl = author.photo?.asset
    ? urlFor(author.photo).width(400).height(400).quality(80).url()
    : undefined

  return {
    title: `${author.name} — News Potli`,
    description,
    openGraph: {
      title: `${author.name} — News Potli`,
      description,
      type: 'profile',
      images: photoUrl ? [{ url: photoUrl, width: 400, height: 400 }] : [],
      siteName: 'News Potli',
    },
    twitter: {
      card: 'summary',
      title: `${author.name} — News Potli`,
      description,
      images: photoUrl ? [photoUrl] : [],
    },
    alternates: {
      canonical: `/author/${params.slug}`,
    },
  }
}

// ── Data Fetching ──
async function fetchAuthor(slug: string) {
  try {
    return await client.fetch(AUTHOR_BY_SLUG_QUERY, { slug })
  } catch {
    return null
  }
}

async function fetchAuthorArticles(slug: string) {
  try {
    return (await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { slug })) || []
  } catch {
    return []
  }
}

// ── SVG Icons ──
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-charcoal/30">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

// ── Helpers ──
function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getUniqueCategories(categories: any[]): any[] {
  if (!categories) return []
  const seen = new Set<string>()
  return categories.filter((cat) => {
    if (!cat?._id || seen.has(cat._id)) return false
    seen.add(cat._id)
    return true
  })
}

// ── Main Page ──
export default async function AuthorPage({
  params,
}: {
  params: { slug: string }
}) {
  const [author, articles] = await Promise.all([
    fetchAuthor(params.slug),
    fetchAuthorArticles(params.slug),
  ])

  if (!author) {
    const { notFound } = await import('next/navigation')
    notFound()
  }

  const photoUrl = author.photo?.asset
    ? urlFor(author.photo).width(320).height(320).quality(90).url()
    : null

  const uniqueCategories = getUniqueCategories(author.categories)
  const articleCount = author.articleCount || articles.length

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role || 'पत्रकार',
    description: author.bio || '',
    url: `/author/${params.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'News Potli',
    },
    ...(photoUrl && { image: photoUrl }),
  }

  return (
    <>
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-cream min-h-screen pb-16 lg:pb-24">

        {/* ── Breadcrumb ── */}
        <nav className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-2">
          <ol className="flex items-center gap-1.5 text-xs font-source text-charcoal/50 flex-wrap">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-maroon transition-colors">
                <HomeIcon /> Home
              </Link>
            </li>
            <li><ChevronRight /></li>
            <li className="text-charcoal/70 font-semibold">{author.name}</li>
          </ol>
        </nav>

        {/* ── Author Hero ── */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 mt-4 mb-12">
          <div className="bg-white border border-charcoal/8 rounded-sm shadow-sm overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-maroon via-gold to-green" />

            <div className="p-6 md:p-10 lg:p-12">
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-gold/20 bg-gradient-to-br from-maroon to-maroon-dark shadow-lg">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={author.name}
                        width={144}
                        height={144}
                        priority
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-white font-playfair font-black text-4xl md:text-5xl">
                        {author.name?.charAt(0) || 'N'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-source text-[10px] font-black tracking-[0.2em] uppercase text-maroon mb-2">
                    Author
                  </p>
                  <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-black text-charcoal leading-tight mb-2">
                    {author.name}
                  </h1>
                  {author.role && (
                    <p className="font-source text-base md:text-lg text-maroon font-bold mb-4">
                      {author.role}
                    </p>
                  )}
                  {author.bio && (
                    <p className="font-noto text-base text-charcoal/65 leading-relaxed max-w-2xl mb-5">
                      {author.bio}
                    </p>
                  )}

                  {/* Contact */}
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="inline-flex items-center gap-2 text-sm font-source font-bold text-charcoal/50 hover:text-maroon transition-colors"
                    >
                      <MailIcon />
                      {author.email}
                    </a>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="mt-8 pt-6 border-t border-charcoal/8 flex flex-wrap gap-6 md:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-maroon/8 flex items-center justify-center text-maroon">
                    <PenIcon />
                  </div>
                  <div>
                    <p className="font-playfair text-2xl font-black text-charcoal leading-none">
                      {articleCount}
                    </p>
                    <p className="font-source text-xs text-charcoal/50 mt-0.5">
                      {articleCount === 1 ? 'लेख' : 'लेख प्रकाशित'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green/8 flex items-center justify-center text-green">
                    <FolderIcon />
                  </div>
                  <div>
                    <p className="font-playfair text-2xl font-black text-charcoal leading-none">
                      {uniqueCategories.length}
                    </p>
                    <p className="font-source text-xs text-charcoal/50 mt-0.5">
                      विषय कवर
                    </p>
                  </div>
                </div>

                {/* Category pills */}
                {uniqueCategories.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap sm:ml-auto">
                    {uniqueCategories.map((cat: any) => (
                      <Link
                        key={cat._id}
                        href={`/category/${cat.slug?.current || ''}`}
                        className="text-xs font-source font-bold px-3 py-1.5 rounded-full border border-charcoal/10 text-charcoal/60 hover:border-maroon/30 hover:text-maroon transition-colors"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Articles Grid ── */}
        <section className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="border-b border-charcoal/10 pb-4 mb-8">
            <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1">
              All Stories
            </span>
            <h2 className="font-playfair text-2xl md:text-3xl font-black text-charcoal">
              सभी लेख<span className="text-maroon">.</span>
            </h2>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-noto text-charcoal/40 text-lg">
                अभी कोई लेख प्रकाशित नहीं हुआ।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any) => {
                const imgUrl = getArticleImage(article, { width: 700, height: 400 })
                const catColor = article.category?.color || '#8B1A1A'

                return (
                  <Link
                    key={article._id}
                    href={`/article/${article.slug?.current || ''}`}
                    className="group bg-white border border-charcoal/6 rounded-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gold/20"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={imgUrl}
                        alt={article.heroImage?.alt || article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Category stamp */}
                      {article.category && (
                        <span
                          className="absolute bottom-2.5 left-2.5 text-white text-[10px] font-source font-black tracking-wider uppercase px-2.5 py-1 rounded-sm"
                          style={{ backgroundColor: catColor }}
                        >
                          {article.category.title}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-noto text-base font-bold text-charcoal leading-snug line-clamp-3 mb-3 group-hover:text-maroon transition-colors">
                        {article.title}
                      </h3>

                      {article.excerpt && (
                        <p className="font-noto text-sm text-charcoal/50 leading-relaxed line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs font-source text-charcoal/40">
                        <span>{formatDate(article.publishedAt)}</span>
                        {article.readTime && (
                          <>
                            <span className="text-charcoal/20">·</span>
                            <span className="flex items-center gap-1">
                              <ClockIcon /> {article.readTime} min
                            </span>
                          </>
                        )}
                        {article.publishedAt && (
                          <>
                            <span className="text-charcoal/20">·</span>
                            <span>{timeAgo(article.publishedAt)}</span>
                          </>
                        )}
                      </div>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          {article.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="bg-charcoal/4 text-charcoal/50 text-[10px] font-source font-bold tracking-wider uppercase px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
