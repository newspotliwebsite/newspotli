import Link from 'next/link'
import { timeAgo } from '@/lib/utils'

interface HeadlineArticle {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  category?: { title: string; color?: string }
}

export default function MoreHeadlines({ articles }: { articles: HeadlineArticle[] }) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="bg-cream py-20 px-5">
      <div className="max-w-site mx-auto">
        {/* Title with gold underline */}
        <div className="text-center mb-10">
          <h2 className="font-noto text-[28px] font-bold text-charcoal inline-block relative">
            और खबरें पढ़ें
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gold" />
          </h2>
          <p className="text-charcoal/70 text-sm mt-3 font-source">More Stories</p>
        </div>

        {/* Headlines List */}
        <div className="bg-white rounded-lg p-5 shadow-card">
          {articles.map((article, i) => (
            <Link
              key={article._id}
              href={`/article/${article.slug.current}`}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-4 px-2.5 transition-all duration-200 hover:bg-cream-dark ${
                i < articles.length - 1 ? 'border-b border-border-warm' : ''
              }`}
            >
              {/* Category with dot */}
              <div className="flex items-center gap-2.5 w-[120px]">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: article.category?.color || '#8B1A1A' }}
                />
                <span className="font-source text-xs font-bold uppercase tracking-wide text-charcoal/50">
                  {article.category?.title || 'खबर'}
                </span>
              </div>

              {/* Headline */}
              <h4 className="font-noto text-[17px] font-bold text-charcoal group-hover:text-maroon transition-colors">
                {article.title}
              </h4>

              {/* Time */}
              <span className="font-source text-xs text-charcoal/70 whitespace-nowrap">
                {timeAgo(article.publishedAt)}
              </span>
            </Link>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-10">
          <Link
            href="/latest"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-maroon text-maroon font-source font-bold text-sm rounded hover:bg-maroon hover:text-white transition-all duration-200"
          >
            और पढ़ें
          </Link>
        </div>
      </div>
    </section>
  )
}
