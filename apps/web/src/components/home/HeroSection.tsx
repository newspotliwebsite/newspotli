import Link from 'next/link'
import Image from 'next/image'
import { timeAgo } from '@/lib/utils'

interface HeroSectionProps {
  featuredArticle: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    heroImage?: { alt?: string; asset?: { _ref: string } }
    publishedAt: string
    readTime?: number
    category?: { title: string; slug?: { current: string }; color?: string }
    author?: { name: string; photo?: { asset?: { _ref: string } } }
  } | null
  sidebarArticles: Array<{
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    category?: { title: string; color?: string }
  }>
}

export default function HeroSection({ featuredArticle, sidebarArticles }: HeroSectionProps) {
  if (!featuredArticle) return null

  const articleUrl = `/article/${featuredArticle.slug.current}`
  const shareText = encodeURIComponent(
    `${featuredArticle.title} - https://newspotli.com${articleUrl}`
  )

  return (
    <section
      className="bg-cream py-16 px-5 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(#e8e0d0 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    >
      {/* Background illustration */}
      <Image
        src="/images/illustrations/hero-farmer-field.png"
        alt=""
        fill
        className="object-cover opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        priority={false}
      />
      <div className="max-w-site mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          {/* LEFT COLUMN -- Featured Card */}
          <div className="relative overflow-hidden rounded-lg border border-[#e8e0d0] bg-white p-6 sm:p-10 shadow-card">
            {/* Decorative wheat emoji */}
            <span
              className="pointer-events-none absolute bottom-0 right-0 select-none text-[200px] leading-none opacity-5"
              aria-hidden="true"
            >
              🌾
            </span>

            {/* Category pill */}
            {featuredArticle.category && (
              <span className="mb-5 inline-block rounded-[6px] bg-maroon px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {featuredArticle.category.title}
              </span>
            )}

            {/* Headline */}
            <Link href={articleUrl}>
              <h2 className="mb-5 font-noto text-3xl font-bold leading-[1.3] text-charcoal sm:text-4xl">
                {featuredArticle.title}
              </h2>
            </Link>

            {/* Excerpt */}
            {featuredArticle.excerpt && (
              <p className="mb-8 line-clamp-2 text-lg text-charcoal/70">
                {featuredArticle.excerpt}
              </p>
            )}

            {/* Author row */}
            <div className="mb-8 flex items-center gap-3 text-sm text-charcoal/70">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-sm font-bold text-white">
                {featuredArticle.author?.name?.[0] || 'N'}
              </span>
              <span>{featuredArticle.author?.name || 'News Potli'}</span>
              <span>•</span>
              <span>{timeAgo(featuredArticle.publishedAt)}</span>
              {featuredArticle.readTime && (
                <>
                  <span>•</span>
                  <span>{featuredArticle.readTime} मिनट में पढ़ें</span>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link
                href={articleUrl}
                className="rounded bg-gold px-6 py-2.5 font-semibold text-white transition-all hover:translate-y-[-2px] hover:bg-[#b07509]"
              >
                पूरी खबर पढ़ें →
              </Link>
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-[#25D366] px-5 py-2.5 font-semibold text-white"
              >
                WhatsApp शेयर
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN -- Top Stories */}
          <div className="rounded-lg border border-[#e8e0d0] bg-white p-6 shadow-card">
            <h3 className="mb-5 border-b border-[#e8e0d0] pb-2.5 text-sm font-bold uppercase tracking-wider text-maroon">
              Top Stories
            </h3>

            <div>
              {sidebarArticles.slice(0, 4).map((article, index) => (
                <Link
                  key={article._id}
                  href={`/article/${article.slug.current}`}
                  className={`block py-4 transition-all hover:rounded hover:bg-cream-dark hover:px-2.5 hover:-mx-2.5 ${
                    index < sidebarArticles.slice(0, 4).length - 1
                      ? 'border-b border-[#e8e0d0]'
                      : ''
                  }`}
                >
                  {/* Category row */}
                  {article.category && (
                    <div className="mb-1 flex items-center gap-2 text-xs text-charcoal/70">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: article.category.color || '#8B1A1A',
                        }}
                      />
                      <span>{article.category.title}</span>
                    </div>
                  )}

                  {/* Headline */}
                  <h4 className="line-clamp-2 font-noto text-base font-bold leading-snug hover:text-maroon">
                    {article.title}
                  </h4>

                  {/* Time */}
                  <p className="mt-1 text-xs text-charcoal/70">
                    {timeAgo(article.publishedAt)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
