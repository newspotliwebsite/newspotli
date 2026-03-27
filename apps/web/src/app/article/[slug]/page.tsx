/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

import { client, urlFor, projectId } from '@/lib/sanity'
import {
  ARTICLE_BY_SLUG_QUERY,
  ALL_ARTICLE_SLUGS_QUERY,
  RELATED_ARTICLES_BY_CATEGORY_QUERY,
} from '@/lib/queries'
import { articleComponents } from '@/components/article/PortableTextComponents'
import SocialShareBar from '@/components/article/SocialShareBar'
import ProgressBar from '@/components/article/ProgressBar'
import ArticleCard from '@/components/shared/ArticleCard'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── ISR ──
export const revalidate = 60

// ── Static Params ──
export async function generateStaticParams() {
  if (projectId === 'yourprojectid') return []
  try {
    const slugs: string[] = await client.fetch(ALL_ARTICLE_SLUGS_QUERY)
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
  const article = await fetchArticle(params.slug)
  if (!article) return { title: 'Article Not Found — News Potli' }

  const title = article.seoTitle || article.title
  const description = article.seoDescription || article.excerpt || ''
  const category = article.category?.title || ''
  const author = article.author?.name || 'News Potli'
  const ogImage = article.heroImage?.asset
    ? urlFor(article.heroImage).width(1200).height(630).quality(80).url()
    : `/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(category)}&author=${encodeURIComponent(author)}`

  return {
    title: `${title} — News Potli`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      siteName: 'News Potli',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/article/${params.slug}`,
    },
  }
}

// ── Data Fetching ──
async function fetchArticle(slug: string) {
  if (projectId === 'yourprojectid') return null
  try {
    return await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
  } catch {
    return null
  }
}

async function fetchRelated(catId: string, currentId: string) {
  if (projectId === 'yourprojectid') return []
  try {
    return (await client.fetch(RELATED_ARTICLES_BY_CATEGORY_QUERY, { catId, currentId })) || []
  } catch {
    return []
  }
}

// ── Helpers ──
function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

// SVG icons
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-charcoal/30">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

// ── Main Page ──
export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await fetchArticle(params.slug)

  // If no Sanity config or article not found, show mock
  const isMock = !article
  const data = article || MOCK_ARTICLE

  const relatedArticles = article?.category?._id
    ? await fetchRelated(article.category._id, article._id)
    : []

  const heroUrl = data.heroImage?.asset
    ? urlFor(data.heroImage).width(1600).height(900).quality(90).url()
    : 'https://placehold.co/1600x900/1a0505/FFFFFF/webp?text=News+Potli'

  const authorPhotoUrl = data.author?.photo?.asset
    ? urlFor(data.author.photo).width(160).height(160).url()
    : null

  const catColor = data.category?.color || '#8B1A1A'
  const date = formatDate(data.publishedAt)
  const articleUrl = `/article/${params.slug}`

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: data.title,
    description: data.excerpt || '',
    image: heroUrl,
    datePublished: data.publishedAt,
    author: {
      '@type': 'Person',
      name: data.author?.name || 'News Potli',
    },
    publisher: {
      '@type': 'Organization',
      name: 'News Potli',
      logo: { '@type': 'ImageObject', url: '/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  }

  return (
    <>
      <ProgressBar />
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Social Share */}
      <SocialShareBar title={data.title} url={articleUrl} />

      <main className="bg-[#faf7f0] min-h-screen pb-24 lg:pb-16">

        {/* ── Breadcrumb ── */}
        <nav className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-2">
          <ol className="flex items-center gap-1.5 text-xs font-source text-charcoal/50 flex-wrap">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-maroon transition-colors">
                <HomeIcon /> Home
              </Link>
            </li>
            <li><ChevronRight /></li>
            {data.category && (
              <>
                <li>
                  <Link
                    href={`/category/${data.category.slug?.current || ''}`}
                    className="hover:text-maroon transition-colors"
                  >
                    {data.category.title}
                  </Link>
                </li>
                <li><ChevronRight /></li>
              </>
            )}
            <li className="text-charcoal/70 font-semibold line-clamp-1 max-w-[200px]">{data.title}</li>
          </ol>
        </nav>

        {/* ── Article Header ── */}
        <header className="max-w-4xl mx-auto px-4 md:px-6 mb-8">
          {/* Category tag */}
          {data.category && (
            <Link
              href={`/category/${data.category.slug?.current || ''}`}
              className="inline-block category-stamp text-white mb-5 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: catColor }}
            >
              {data.category.title}
            </Link>
          )}

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black italic text-charcoal leading-[1.15] mb-6 text-balance">
            {data.title}
          </h1>

          {/* Excerpt */}
          {data.excerpt && (
            <p className="font-noto text-lg md:text-xl text-charcoal/65 leading-relaxed mb-6 max-w-3xl">
              {data.excerpt}
            </p>
          )}

          {/* Author Row */}
          <div className="flex flex-wrap items-center gap-4 border-y border-charcoal/10 py-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30 bg-gradient-to-br from-maroon to-maroon-dark">
              {authorPhotoUrl ? (
                <Image
                  src={authorPhotoUrl}
                  alt={data.author?.name || ''}
                  width={48} height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-white font-playfair font-black italic text-lg">
                  NP
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-source font-bold text-charcoal text-sm">
                {data.author?.name || 'News Potli'}
                {data.author?.role && (
                  <span className="font-normal text-charcoal/50 ml-2">· {data.author.role}</span>
                )}
              </p>
              <p className="font-source text-xs text-charcoal/50 flex items-center gap-2 mt-0.5">
                <span>{date}</span>
                {data.readTime && (
                  <>
                    <span className="text-charcoal/20">·</span>
                    <span className="flex items-center gap-1"><ClockIcon /> {data.readTime} min read</span>
                  </>
                )}
              </p>
            </div>

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="hidden md:flex gap-2">
                {data.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="bg-charcoal/5 text-charcoal/60 text-[10px] font-bold tracking-wider uppercase px-3 py-1 font-source">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Hero Image ── */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12">
          <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-xl">
            <Image
              src={heroUrl}
              alt={data.heroImage?.alt || data.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1100px"
            />
          </div>
          {data.heroImage?.alt && (
            <p className="text-center font-source text-xs text-charcoal/40 mt-3 italic">
              {data.heroImage.alt}
            </p>
          )}
        </div>

        {/* ── Article Body ── */}
        <article className="max-w-3xl mx-auto px-4 md:px-6">
          {/* YouTube embed */}
          {data.youtubeId && (
            <div className="relative w-full aspect-video mb-10 rounded-sm overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${data.youtubeId}`}
                title="YouTube video"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          )}

          {/* Portable Text body */}
          {data.body ? (
            <PortableText value={data.body} components={articleComponents} />
          ) : (
            isMock && <MockArticleBody />
          )}
        </article>

        {/* ── Author Box ── */}
        {data.author && (
          <div className="max-w-3xl mx-auto px-4 md:px-6 mt-16">
            <div className="bg-white border border-charcoal/8 p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start rounded-sm shadow-sm">
              {/* Photo */}
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30 bg-gradient-to-br from-maroon to-maroon-dark">
                {authorPhotoUrl ? (
                  <Image
                    src={authorPhotoUrl}
                    alt={data.author.name}
                    width={80} height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-white font-playfair font-black italic text-2xl">
                    NP
                  </span>
                )}
              </div>

              <div className="flex-1">
                <p className="font-source text-[10px] font-black tracking-[0.2em] uppercase text-charcoal/40 mb-1">
                  About the Author
                </p>
                <h3 className="font-playfair text-xl font-black italic text-charcoal mb-1">
                  {data.author.name}
                </h3>
                {data.author.role && (
                  <p className="font-source text-sm text-maroon font-bold mb-3">
                    {data.author.role}
                  </p>
                )}
                {data.author.bio && (
                  <p className="font-noto text-sm text-charcoal/65 leading-relaxed">
                    {data.author.bio}
                  </p>
                )}
                {data.author.slug?.current && (
                  <Link
                    href={`/author/${data.author.slug.current}`}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-maroon hover:text-gold transition-colors font-source group"
                  >
                    सभी लेख देखें
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Related Articles ── */}
        {relatedArticles.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 md:px-6 mt-16">
            <div className="border-b border-charcoal/10 pb-4 mb-8">
              <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1">
                Related Coverage
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl font-black italic text-charcoal">
                और पढ़ें<span className="text-maroon">.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((ra: any) => (
                <ArticleCard key={ra._id} article={ra} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

// ── Mock Data (when Sanity is not connected) ──
const MOCK_ARTICLE = {
  _id: 'mock-1',
  title: 'मराठवाड़ा के किसानों की अनकही कहानी: तीन साल का सूखा और एक परिवार का संघर्ष',
  slug: { current: 'marathwada-drought-story' },
  excerpt: 'पानी के लिए तरसते मराठवाड़ा के गाँवों में हमने तीन साल बिताए। यह है उन किसानों की कहानी जिन्होंने सब कुछ खोकर भी उम्मीद नहीं छोड़ी।',
  body: null,
  heroImage: null,
  category: { _id: 'cat-1', title: 'खेती किसानी', slug: { current: 'kheti-kisani' }, color: '#8B1A1A' },
  author: {
    _id: 'a-1',
    name: 'राहुल शर्मा',
    slug: { current: 'rahul-sharma' },
    bio: 'ग्रामीण भारत के वरिष्ठ संवाददाता। 15 वर्षों से किसानों और गाँवों की कहानियाँ दुनिया तक पहुँचा रहे हैं।',
    role: 'Senior Correspondent',
    photo: null,
  },
  tags: ['Drought', 'Marathwada', 'Farmer'],
  publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  readTime: 12,
  seoTitle: 'Marathwada Drought Report 2026',
  seoDescription: 'An in-depth investigation into the three-year drought in Marathwada and its devastating impact on farming families.',
  youtubeId: null,
  featured: false,
  deepStory: true,
}

// Mock body content when Sanity is not connected
function MockArticleBody() {
  return (
    <div>
      <p className="font-noto text-[17px] leading-[1.9] text-charcoal/85 mb-6">
        मराठवाड़ा, महाराष्ट्र — जब तक आप इन सूखी ज़मीनों पर खड़े नहीं होते, तब तक आपको अंदाज़ा नहीं हो सकता कि पानी का मतलब क्या है। यहाँ के किसान तीन साल से बारिश की राह देख रहे हैं। उनके खेत सूखे पड़े हैं, कुएँ खाली हो चुके हैं, और उम्मीदें भी धीरे-धीरे सिकुड़ती जा रही हैं।
      </p>

      <h2 className="font-playfair text-2xl md:text-3xl font-black italic text-charcoal mt-12 mb-4 leading-snug border-l-4 border-gold pl-5">
        तीन साल का इंतज़ार
      </h2>

      <p className="font-noto text-[17px] leading-[1.9] text-charcoal/85 mb-6">
        2023 से 2026 तक, लातूर ज़िले के गाँवों में हमने पाया कि 70% से ज़्यादा किसान परिवार क़र्ज़ में डूबे हुए हैं। सरकारी राहत पैकेज पहुँचने में महीनों लग रहे हैं, और जब तक ये पहुँचते हैं, कई परिवार पलायन कर चुके होते हैं।
      </p>

      <blockquote className="relative my-10 py-6 px-8 border-l-4 border-maroon bg-maroon/[0.04] italic">
        <span className="absolute -top-3 left-4 font-playfair text-5xl text-maroon/20 select-none leading-none">&ldquo;</span>
        <div className="font-noto text-lg leading-relaxed text-charcoal/80">
          हमने अपने बैल बेच दिए, ज़मीन गिरवी रख दी, फिर भी बच्चों की फीस नहीं भर पाए। अब क्या बचा है बेचने को?
        </div>
      </blockquote>

      <p className="font-noto text-[17px] leading-[1.9] text-charcoal/85 mb-6">
        यह बात कहते हुए 56 वर्षीय रामदास पाटिल की आँखें भर आती हैं। उनके परिवार की पाँच पीढ़ियाँ इसी ज़मीन पर खेती करती आई हैं, लेकिन आज वो ज़मीन उन्हें खिला नहीं पा रही।
      </p>

      <h2 className="font-playfair text-2xl md:text-3xl font-black italic text-charcoal mt-12 mb-4 leading-snug border-l-4 border-gold pl-5">
        सरकारी योजनाओं का सच
      </h2>

      <p className="font-noto text-[17px] leading-[1.9] text-charcoal/85 mb-6">
        प्रधानमंत्री फसल बीमा योजना और किसान सम्मान निधि जैसी योजनाएँ कागज़ पर तो अच्छी लगती हैं, लेकिन ज़मीनी हालात कुछ और ही बयां करते हैं। हाई-टेक प्रक्रियाओं से अनजान किसान इन योजनाओं का लाभ उठाने में असमर्थ हैं।
      </p>

      <h3 className="font-noto text-xl md:text-2xl font-bold text-charcoal mt-10 mb-3 leading-snug">
        आगे की राह
      </h3>

      <p className="font-noto text-[17px] leading-[1.9] text-charcoal/85 mb-6">
        विशेषज्ञों का मानना है कि ड्रिप इरिगेशन, वाटरशेड मैनेजमेंट, और रेनवाटर हार्वेस्टिंग जैसी तकनीकें मराठवाड़ा जैसे सूखा-प्रभावित क्षेत्रों के लिए जीवनदायी साबित हो सकती हैं। लेकिन इसके लिए सरकार और समुदाय दोनों को मिलकर काम करना होगा।
      </p>
    </div>
  )
}
