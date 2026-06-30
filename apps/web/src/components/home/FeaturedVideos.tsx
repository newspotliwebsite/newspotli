import Link from 'next/link'
import Image from 'next/image'
import { getLatestVideos, YouTubeVideo } from '@/lib/youtube'
import { formatArticleDate } from '@/lib/utils'

export default async function FeaturedVideos() {
  const videos = await getLatestVideos()
  if (!videos || videos.length === 0) return null

  const mainVideo = videos[0]
  const listVideos = videos.slice(1, 4)

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-site mx-auto">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
            वीडियो
          </h2>
          <Link
            href="/videos"
            className="font-source text-sm font-bold text-maroon hover:text-gold transition-colors"
          >
            सभी देखें →
          </Link>
        </div>

        {/* 1 large + 3 small layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 lg:gap-8">
          {/* Featured large video */}
          <div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-cream-dark">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <h3 className="mt-4 font-noto text-lg md:text-xl font-bold text-charcoal leading-snug">
              {mainVideo.title}
            </h3>
            <p className="mt-1.5 font-source text-xs text-charcoal/60">
              News Potli
              <span className="mx-1.5">•</span>
              {formatArticleDate(mainVideo.publishedAt)}
            </p>
          </div>

          {/* 3 small videos: stacked on desktop, horizontal scroll on mobile */}
          {listVideos.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 lg:flex-col lg:gap-5 lg:overflow-visible lg:pb-0 scrollbar-thin">
              {listVideos.map((video: YouTubeVideo) => (
                <a
                  key={video.id}
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 w-[240px] lg:w-auto lg:flex lg:gap-4 lg:items-start"
                >
                  <div className="relative aspect-video w-full lg:w-[160px] lg:flex-shrink-0 rounded-lg overflow-hidden bg-cream-dark">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 1024px) 240px, 160px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center">
                        <svg className="w-4 h-4 text-maroon ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 lg:pt-0 lg:flex-1 lg:min-w-0">
                    <h4 className="font-noto text-sm font-bold leading-snug text-charcoal line-clamp-2 group-hover:text-maroon transition-colors">
                      {video.title}
                    </h4>
                    <p className="mt-1.5 font-source text-xs text-charcoal/60">
                      News Potli
                      <span className="mx-1.5">•</span>
                      {formatArticleDate(video.publishedAt)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
