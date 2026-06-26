import Link from 'next/link'
import Image from 'next/image'
import { getArticleImage, timeAgo } from '@/lib/utils'

interface DeepStory {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  readTime?: number
  category?: { title: string; slug?: { current: string }; color?: string }
  heroImage?: { asset?: { _ref: string }; alt?: string }
  author?: { name: string }
}

export default function DeepStories({ stories }: { stories: DeepStory[] }) {
  if (!stories || stories.length === 0) return null
  const displayStories = stories.filter((s) => s?.slug?.current).slice(0, 3)

  return (
    <section className="bg-cream py-10 md:py-14 px-5">
      <div className="max-w-site mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
              मौसम-बेमौसम
            </h2>
          </div>
          <Link
            href="/latest"
            className="font-source text-sm font-bold text-maroon hover:text-gold transition-colors"
          >
            सभी देखें →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayStories.map((story) => {
            const imageUrl = getArticleImage(story, { width: 800, height: 540, quality: 85 })
            return (
              <Link
                key={story._id}
                href={`/article/${story.slug.current}`}
                className="group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-cream-dark">
                  <Image
                    src={imageUrl}
                    alt={story.heroImage?.alt || story.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-noto text-lg font-bold leading-snug text-charcoal line-clamp-3 group-hover:text-maroon transition-colors">
                    {story.title}
                  </h3>
                  <p className="mt-2 font-source text-xs text-charcoal/60">
                    {story.author?.name || 'News Potli'}
                    <span className="mx-1.5">•</span>
                    {timeAgo(story.publishedAt)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
