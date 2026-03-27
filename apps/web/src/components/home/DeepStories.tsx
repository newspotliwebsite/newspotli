import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { timeAgo } from '@/lib/utils'

interface DeepStory {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  category?: { title: string; slug?: { current: string } }
  heroImage?: { asset?: { _ref: string }; alt?: string }
}

// SVG Icons
const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

export default function DeepStories({ stories }: { stories: DeepStory[] }) {
  if (!stories || stories.length === 0) return null
  const displayStories = stories
  const featured = displayStories[0]
  const listStories = displayStories.slice(1, 5)

  if (!featured) return null

  const featImageUrl = featured.heroImage?.asset
    ? urlFor(featured.heroImage).width(900).height(600).quality(90).url()
    : null

  return (
    <section className="bg-[#f5f0e8] py-16 px-4 md:px-10 lg:px-20 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-charcoal/10 pb-5 mb-10">
          <div>
            <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1.5">In-depth Reporting</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
              गहरी <span className="text-maroon">खबरें.</span>
            </h2>
          </div>
          <Link href="/deep-stories" className="hidden sm:flex items-center gap-2 text-sm font-bold text-maroon hover:text-gold transition-colors group font-source">
            All Long-reads
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Featured Long Read */}
          <Link href={`/article/${featured.slug.current}`} className="group block">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-charcoal mb-5 shadow-xl">
              {featImageUrl ? (
                <Image
                  src={featImageUrl}
                  alt={featured.heroImage?.alt || featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark via-maroon to-[#3a0a0a]" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0000]/70 via-transparent to-transparent" />

              {/* Category + badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {featured.category && (
                  <span className="category-stamp bg-gold text-white">
                    {featured.category.title}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-charcoal/80 backdrop-blur-sm text-cream text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10">
                  <BookOpenIcon />
                  Deep Story
                </span>
              </div>
            </div>

            {/* Decorative quote mark */}
            <div className="relative">
              <span className="absolute -top-4 -left-2 font-playfair text-8xl text-gold/15 leading-none select-none pointer-events-none">&ldquo;</span>
              <h3 className="font-noto font-bold text-2xl md:text-3xl leading-snug text-charcoal group-hover:text-maroon transition-colors duration-300 mb-3 text-balance">
                {featured.title}
              </h3>
            </div>

            {featured.excerpt && (
              <p className="font-noto text-charcoal/65 text-base leading-relaxed line-clamp-2 mb-4">
                {featured.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 font-source text-xs text-charcoal/50">
              <ClockIcon />
              <span>{timeAgo(featured.publishedAt)}</span>
              <span className="text-gold font-black text-sm">→</span>
              <span className="text-maroon font-bold group-hover:underline">पूरी खबर पढ़ें</span>
            </div>
          </Link>

          {/* Story List */}
          <div className="flex flex-col divide-y divide-charcoal/8">
            {listStories.map((story, i) => (
              <Link
                key={story._id}
                href={`/article/${story.slug.current}`}
                className="group flex items-start gap-5 py-6 first:pt-0 last:pb-0 hover:bg-maroon/[0.03] transition-colors -mx-4 px-4 rounded"
              >
                {/* Giant number */}
                <span className="font-playfair text-6xl font-black italic text-charcoal/8 leading-none flex-shrink-0 w-12 text-right group-hover:text-gold/20 transition-colors duration-300 select-none">
                  {String(i + 2).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  {story.category && (
                    <span className="font-source text-[10px] font-bold tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-0.5 inline-block mb-2">
                      {story.category.title}
                    </span>
                  )}
                  <h4 className="font-noto font-bold text-[17px] leading-snug line-clamp-2 text-charcoal group-hover:text-maroon transition-colors duration-200 mb-1.5">
                    {story.title}
                  </h4>
                  <p className="font-source text-xs text-charcoal/45 flex items-center gap-1">
                    <ClockIcon />
                    {timeAgo(story.publishedAt)}
                  </p>
                </div>

                {/* Arrow */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="w-4 h-4 text-charcoal/20 flex-shrink-0 mt-1 group-hover:text-maroon group-hover:translate-x-1 transition-all duration-200">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
