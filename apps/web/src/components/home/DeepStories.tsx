import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

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
  const displayStories = stories.slice(0, 3)

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-site mx-auto">
        {/* Title with gold underline */}
        <div className="text-center mb-10">
          <h2 className="font-noto text-[28px] font-bold text-charcoal inline-block relative">
            गहरी खबरें
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gold" />
          </h2>
          <p className="text-charcoal/70 text-sm mt-3 font-source">In-Depth Analysis</p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayStories.map((story) => {
            const imageUrl = story.heroImage?.asset
              ? urlFor(story.heroImage).width(600).height(340).quality(85).url()
              : null

            return (
              <Link
                key={story._id}
                href={`/article/${story.slug.current}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-card border-t-4 border-maroon hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250"
              >
                {/* Image */}
                <div className="relative aspect-video bg-cream-dark flex items-center justify-center text-[50px]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={story.heroImage?.alt || story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <span>📰</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {story.category && (
                    <span className="inline-block rounded-[6px] bg-charcoal px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                      {story.category.title}
                    </span>
                  )}
                  <h3 className="font-noto text-lg font-bold text-charcoal leading-snug mb-2.5 group-hover:text-maroon transition-colors">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="font-source text-sm text-charcoal/70 line-clamp-3 mb-5">
                      {story.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-charcoal/70 font-source">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">
                      {story.author?.name?.[0] || 'N'}
                    </span>
                    <span>{story.author?.name || 'News Potli'}</span>
                    {story.readTime && (
                      <>
                        <span>•</span>
                        <span>{story.readTime} मिनट में पढ़ें</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
