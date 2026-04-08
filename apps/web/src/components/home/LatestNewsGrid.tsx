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
  author?: { name: string }
  publishedAt: string
  readTime?: number
}

function LargeCard({ article }: { article: ArticleType }) {
  const imageUrl = article.heroImage?.asset
    ? urlFor(article.heroImage).width(1200).height(675).quality(85).url()
    : null

  return (
    <Link
      href={`/article/${article.slug?.current || ''}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250"
    >
      {/* Image */}
      <div className="relative aspect-video bg-cream-dark flex items-center justify-center text-[80px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.heroImage?.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <span>👨‍🌾</span>
        )}
        {article.category && (
          <span className="absolute bottom-5 left-5 rounded-[6px] bg-maroon px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {article.category.title}
          </span>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        <h3 className="font-noto text-[22px] font-bold text-charcoal leading-snug mb-3 group-hover:text-maroon transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-charcoal/70 mb-5 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm text-charcoal/70 font-source">
          <span>{article.author?.name || 'News Potli'}</span>
          <span>•</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}

function SmallCard({ article }: { article: ArticleType }) {
  const imageUrl = getArticleImage(article, { width: 240, height: 240 })

  return (
    <Link
      href={`/article/${article.slug?.current || ''}`}
      className="group flex gap-5 pb-5 mb-5 border-b border-border-warm last:border-b-0 last:mb-0 last:pb-0 hover:translate-x-1 transition-all duration-250"
    >
      <div className="w-[120px] h-[120px] rounded-lg bg-cream-dark flex-shrink-0 overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={article.heroImage?.alt || article.title}
          fill
          className="object-cover"
          sizes="120px"
        />
      </div>
      <div className="flex-1 min-w-0">
        {article.category && (
          <span className="inline-block rounded-[6px] bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-1">
            {article.category.title}
          </span>
        )}
        <h4 className="font-noto text-base font-bold text-charcoal leading-snug line-clamp-2 group-hover:text-maroon transition-colors mb-1">
          {article.title}
        </h4>
        <span className="font-source text-xs text-charcoal/70">
          {timeAgo(article.publishedAt)}
        </span>
      </div>
    </Link>
  )
}

export default function LatestNewsGrid({ articles }: { articles: ArticleType[] }) {
  if (!articles || articles.length === 0) return null

  const featured = articles[0]
  const smallCards = articles.slice(1, 3)

  return (
    <section className="bg-cream py-20 px-5">
      <div className="max-w-site mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-noto text-2xl font-bold text-charcoal">
              स्पेशल रिपोर्ट्स
            </h2>
            <span className="font-source text-sm text-charcoal/70">
              ग्राउंड रिपोर्ट्स
            </span>
          </div>
          <Link
            href="/latest"
            className="font-source text-sm font-bold text-maroon hover:text-gold transition-colors"
          >
            सभी देखें →
          </Link>
        </div>

        {/* Grid: 60% large + 40% small list */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
          <LargeCard article={featured} />
          <div>
            {smallCards.map((article) => (
              <SmallCard key={article._id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
