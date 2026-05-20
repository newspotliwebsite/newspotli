import { getLatestVideos, YouTubeVideo } from '@/lib/youtube'
import Image from 'next/image'

export default async function FeaturedVideos() {
  const videos = await getLatestVideos()
  if (!videos || videos.length === 0) return null

  const mainVideo = videos[0]
  const listVideos = videos.slice(1, 5)

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-site mx-auto">
        <div className="mb-10">
          <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
            वीडियो
          </h2>
        </div>

        {/* Featured large video */}
        <div className="mb-10">
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
            {new Date(mainVideo.publishedAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Smaller video cards row */}
        {listVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {listVideos.map((video: YouTubeVideo) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-cream-dark">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center">
                      <svg className="w-5 h-5 text-maroon ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="font-noto text-base font-bold leading-snug text-charcoal line-clamp-3 group-hover:text-maroon transition-colors">
                    {video.title}
                  </h4>
                  <p className="mt-2 font-source text-xs text-charcoal/60">
                    News Potli
                    <span className="mx-1.5">•</span>
                    {new Date(video.publishedAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
