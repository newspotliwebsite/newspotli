import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getArticleImage, timeAgo } from '@/lib/utils'

interface ArticleType {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  heroImage?: { alt?: string; asset?: { _ref: string } }
  category?: { title: string; color?: string; slug?: { current: string } }
  author?: { name: string; photo?: { asset?: { _ref: string } } }
  publishedAt: string
  readTime?: number
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 flex-shrink-0">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const WhatsAppSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function FeaturedCard({ article }: { article: ArticleType }) {
  const imageUrl = article.heroImage?.asset
    ? urlFor(article.heroImage).width(1200).height(700).quality(85).url()
    : null
  const catColor = article.category?.color || '#8B1A1A'

  return (
    <Link
      href={`/article/${article.slug?.current || ''}`}
      className="group relative block rounded-sm overflow-hidden bg-charcoal shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
      style={{ gridArea: 'featured' }}
    >
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.heroImage?.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}99)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0000] via-[#0d0000]/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {article.category && (
          <span className="category-stamp bg-gold text-white mb-3 inline-block">
            {article.category.title}
          </span>
        )}
        <h3 className="font-playfair font-black italic text-white text-xl md:text-2xl lg:text-[24px] leading-snug line-clamp-3 group-hover:text-gold transition-colors duration-300 text-balance mb-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="font-noto text-cream/70 text-sm line-clamp-2 mb-3 max-w-lg">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-cream/60 text-xs font-source">
          <span className="font-semibold text-cream/80">{article.author?.name || 'News Potli'}</span>
          <span className="text-white/20">·</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}

function RegularCard({ article }: { article: ArticleType }) {
  const imageUrl = getArticleImage(article, { width: 700, height: 400 })
  const shareUrl = encodeURIComponent(`पढ़िए: ${article.title} - https://newspotli.com/article/${article.slug?.current}`)

  return (
    <div className="group flex flex-col bg-white overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm relative">
      {/* Thumbnail */}
      <Link href={`/article/${article.slug?.current || ''}`} className="relative block aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={article.heroImage?.alt || article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {article.category && (
          <div className="absolute bottom-0 left-0">
            <span className="category-stamp bg-maroon text-white">
              {article.category.title}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/article/${article.slug?.current || ''}`}>
          <h3 className="font-noto font-bold text-charcoal text-[15px] leading-snug line-clamp-3 group-hover:text-maroon transition-colors duration-200 mb-2">
            {article.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2 text-xs text-charcoal/50 font-source mt-auto pt-2 border-t border-charcoal/5">
          <div className="flex items-center gap-1.5">
            <span>{timeAgo(article.publishedAt)}</span>
            {article.readTime && (
              <>
                <span className="text-charcoal/20">·</span>
                <ClockIcon />
                <span>{article.readTime} min</span>
              </>
            )}
          </div>
          {/* WhatsApp share */}
          <a
            href={`https://wa.me/?text=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:text-green-mid transition-colors p-1"
          >
            <WhatsAppSmall />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LatestNewsGrid({ articles }: { articles: ArticleType[] }) {
  if (!articles || articles.length === 0) return null

  const gridArticles = articles.slice(0, 5)
  const featuredArticle = gridArticles[0]
  const regularArticles = gridArticles.slice(1)

  return (
    <section className="bg-[#f5f0e8] py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex justify-between items-end mb-8 border-b border-charcoal/10 pb-5">
          <div>
            <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1.5">
              Breaking Coverage
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
              ताज़ा <span className="text-maroon">खबरें.</span>
            </h2>
          </div>
          <Link
            href="/latest"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-maroon hover:text-gold transition-colors group font-source"
          >
            All News
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Bento Grid */}
        <div
          className="grid gap-5 lg:gap-6"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'auto auto',
            gridTemplateAreas: `
              "featured featured card2 card3"
              "featured featured card4 card5"
            `,
          }}
        >
          {/* On mobile, collapse to single column */}
          <style>{`
            @media (max-width: 1023px) {
              .bento-grid {
                grid-template-columns: 1fr !important;
                grid-template-rows: auto !important;
                grid-template-areas:
                  "featured"
                  "card2"
                  "card3"
                  "card4"
                  "card5" !important;
              }
            }
            @media (min-width: 640px) and (max-width: 1023px) {
              .bento-grid {
                grid-template-columns: 1fr 1fr !important;
                grid-template-areas:
                  "featured featured"
                  "card2 card3"
                  "card4 card5" !important;
              }
            }
          `}</style>
          {featuredArticle && (
            <div style={{ gridArea: 'featured' }} className="min-h-[300px] md:min-h-[400px]">
              <FeaturedCard article={featuredArticle} />
            </div>
          )}
          {regularArticles.map((article, i) => (
            <div key={article._id} style={{ gridArea: `card${i + 2}` }}>
              <RegularCard article={article} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <Link
          href="/latest"
          className="sm:hidden mt-8 w-full flex items-center justify-center gap-2 bg-maroon text-white font-bold py-3.5 text-sm font-source hover:bg-maroon-dark transition-colors"
        >
          सभी खबरें देखें
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </section>
  )
}
