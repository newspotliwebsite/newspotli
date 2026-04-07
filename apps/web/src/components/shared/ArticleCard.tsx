import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface ArticleCardProps {
  article: {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    heroImage?: { asset?: { _ref: string }; alt?: string }
    category?: { title: string; color?: string }
    author?: { name: string }
    readTime?: number
    publishedAt: string
  }
  featured?: boolean
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 flex-shrink-0">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const imageUrl = article.heroImage?.asset
    ? urlFor(article.heroImage).width(featured ? 1200 : 700).height(featured ? 700 : 450).quality(85).url()
    : `https://placehold.co/${featured ? '1200x700' : '700x450'}/1a0505/FFFFFF/webp?text=News+Potli`

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  if (featured) {
    return (
      <Link href={`/article/${article.slug?.current || ''}`} className="group relative block col-span-2 rounded-sm overflow-hidden bg-charcoal min-h-[400px] shadow-xl">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={article.heroImage?.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0000] via-[#0d0000]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-7">
          {article.category && (
            <span className="category-stamp bg-gold text-white mb-3 inline-block">
              {article.category.title}
            </span>
          )}
          <h3 className="font-playfair font-black text-white text-2xl md:text-3xl leading-snug line-clamp-3 group-hover:text-gold transition-colors duration-300 text-balance">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 text-cream/60 text-xs font-source mt-3">
            <span className="font-semibold text-cream/80">{article.author?.name || 'News Potli'}</span>
            <span className="text-white/20">·</span>
            <span>{date}</span>
            {article.readTime && (
              <>
                <span className="text-white/20">·</span>
                <ClockIcon />
                <span>{article.readTime} min</span>
              </>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="group flex flex-col bg-white overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm">
      {/* Thumbnail */}
      <Link href={`/article/${article.slug?.current || ''}`} className="relative block aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={article.heroImage?.alt || article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Category ink stamp */}
        {article.category && (
          <div className="absolute bottom-0 left-0">
            <span className="category-stamp bg-maroon text-white">
              {article.category.title}
            </span>
          </div>
        )}
        {/* Gold left border on hover */}
        <div className="absolute inset-y-0 left-0 w-0 group-hover:w-1 bg-gold transition-all duration-200" />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/article/${article.slug?.current || ''}`}>
          <h3 className="font-noto font-bold text-charcoal text-[17px] leading-snug line-clamp-3 group-hover:text-maroon transition-colors duration-200 mb-2">
            {article.title}
          </h3>
        </Link>

        {article.excerpt && (
          <p className="font-noto text-charcoal/60 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-charcoal/50 font-source mt-auto pt-3 border-t border-charcoal/5">
          <span className="font-semibold text-charcoal/70">{article.author?.name || 'News Potli'}</span>
          <span className="text-charcoal/20">·</span>
          <span>{date}</span>
          {article.readTime && (
            <>
              <span className="text-charcoal/20">·</span>
              <ClockIcon />
              <span>{article.readTime} min</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
