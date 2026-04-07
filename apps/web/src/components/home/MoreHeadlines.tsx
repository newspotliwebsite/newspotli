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
    <section className="bg-cream py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-charcoal/10 pb-5 mb-8">
          <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1.5">
            More Headlines
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-black text-charcoal">
            और <span className="text-maroon">खबरें.</span>
          </h2>
        </div>

        {/* Scrollable Headlines List */}
        <div className="max-h-[480px] overflow-y-auto scrollbar-thin pr-2">
          <ul className="divide-y divide-charcoal/8">
            {articles.map((article) => (
              <li key={article._id}>
                <Link
                  href={`/article/${article.slug.current}`}
                  className="group flex items-start gap-3 py-4 hover:bg-maroon/[0.03] transition-colors -mx-3 px-3 rounded"
                >
                  {/* Category dot */}
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: article.category?.color || '#8B1A1A' }}
                  />

                  {/* Headline */}
                  <span className="flex-1 font-noto font-bold text-[15px] leading-snug text-charcoal group-hover:text-maroon transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </span>

                  {/* Time ago */}
                  <span className="font-source text-xs text-charcoal/40 flex-shrink-0 mt-0.5 whitespace-nowrap">
                    {timeAgo(article.publishedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
