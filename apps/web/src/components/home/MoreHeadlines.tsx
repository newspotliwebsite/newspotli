import Link from 'next/link'
import Image from 'next/image'
import { getArticleImage, timeAgo } from '@/lib/utils'

interface HeadlineArticle {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  heroImage?: { alt?: string; asset?: { _ref: string } }
  category?: { title: string; color?: string; slug?: { current: string } }
  author?: { name: string }
}

export default function MoreHeadlines({ articles }: { articles: HeadlineArticle[] }) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-site mx-auto">
        <div className="mb-10">
          <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
            और खबरें पढ़ें
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article) => {
            const imageUrl = getArticleImage(article, { width: 800, height: 450, quality: 85 })
            const catColor = article.category?.color || '#8B1A1A'
            return (
              <Link
                key={article._id}
                href={`/article/${article.slug.current}`}
                className="group block transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-cream-dark mb-4">
                  <Image
                    src={imageUrl}
                    alt={article.heroImage?.alt || article.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {article.category && (
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-3"
                    style={{ backgroundColor: catColor }}
                  >
                    {article.category.title}
                  </span>
                )}

                <h3 className="font-noto text-base md:text-[17px] font-bold leading-snug text-charcoal line-clamp-3 group-hover:text-maroon transition-colors">
                  {article.title}
                </h3>

                <p className="mt-2 font-source text-xs text-charcoal/60">
                  {article.author?.name || 'News Potli'}
                  <span className="mx-1.5">•</span>
                  {timeAgo(article.publishedAt)}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
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
