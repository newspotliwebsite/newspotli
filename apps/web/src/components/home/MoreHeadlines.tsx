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
    <section className="bg-white py-20 px-5">
      <div className="max-w-site mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
              और खबरें पढ़ें
            </h2>
            <p className="mt-2 font-source text-xs md:text-sm uppercase tracking-[0.12em] text-charcoal/50">
              More Stories
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[#e8e0d0] overflow-hidden">
          {articles.map((article, i) => (
            <Link
              key={article._id}
              href={`/article/${article.slug.current}`}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-4 px-5 transition-colors duration-200 hover:bg-cream ${
                i < articles.length - 1 ? 'border-b border-[#e8e0d0]' : ''
              }`}
            >
              <div className="flex items-center gap-2.5 w-[130px] min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: article.category?.color || '#8B1A1A' }}
                />
                <span className="font-source text-xs font-bold uppercase tracking-wide text-charcoal/50 truncate">
                  {article.category?.title || 'खबर'}
                </span>
              </div>

              <h4 className="font-noto text-base md:text-[17px] font-bold text-charcoal leading-snug group-hover:text-maroon transition-colors line-clamp-2">
                {article.title}
              </h4>

              <span className="font-source text-xs text-charcoal/60 whitespace-nowrap">
                {timeAgo(article.publishedAt)}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/latest"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-maroon text-maroon font-source font-bold text-sm rounded-full hover:bg-maroon hover:text-white transition-all duration-200"
          >
            और पढ़ें
          </Link>
        </div>
      </div>
    </section>
  )
}
