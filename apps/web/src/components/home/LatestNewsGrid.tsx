import Link from 'next/link'
import Image from 'next/image'
import { getArticleImage, formatArticleDate } from '@/lib/utils'

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

function ArticleCard({ article }: { article: ArticleType }) {
  const imageUrl = getArticleImage(article, { width: 600, height: 400, quality: 80 })

  return (
    <Link
      href={`/article/${article.slug?.current || ''}`}
      className="group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[3/2] bg-cream-dark rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={article.heroImage?.alt || article.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="pt-4">
        <h3 className="font-noto text-base md:text-lg font-bold leading-snug text-charcoal line-clamp-3 group-hover:text-maroon transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 font-source text-xs text-charcoal/60">
          {article.author?.name || 'News Potli'}
          <span className="mx-1.5">•</span>
          {formatArticleDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  )
}

export default function LatestNewsGrid({ articles }: { articles: ArticleType[] }) {
  if (!articles || articles.length === 0) return null
  const displayed = articles.slice(0, 8)

  return (
    <section className="bg-white py-10 md:py-14 px-5">
      <div className="max-w-site mx-auto">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
              स्पेशल रिपोर्ट्स <span className="text-charcoal/40">/</span> ग्राउंड रिपोर्ट्स
            </h2>
            <p className="mt-1 font-source text-xs md:text-sm uppercase tracking-[0.12em] text-charcoal/50">
              Special Reports / Ground Reports
            </p>
          </div>
          <Link
            href="/category/ground-reports"
            className="font-source text-sm font-bold text-maroon hover:text-gold transition-colors"
          >
            सभी देखें →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {displayed.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
