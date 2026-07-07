import Link from 'next/link'
import Image from 'next/image'
import { getLatestVideos, YouTubeVideo } from '@/lib/youtube'
import { formatArticleDate } from '@/lib/utils'

// YouTube API titles can carry HTML entities (&#39;, &amp;, ...) — DOMParser
// isn't available server-side, so decode the handful of entities that
// actually show up in practice.
function decodeHtml(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&#34;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
}

export default async function FeaturedVideos() {
  const videos = await getLatestVideos()
  if (!videos || videos.length === 0) return null

  const mainVideo = videos[0]
  const listVideos = videos.slice(1, 5)

  return (
    <section className="bg-white py-10 md:py-14 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <h2 className="font-noto text-2xl font-bold text-charcoal leading-tight">
            वीडियो
          </h2>
          <Link
            href="/videos"
            className="font-source text-sm font-bold text-maroon hover:text-gold transition-colors"
          >
            सभी देखें →
          </Link>
        </div>

        {/* Featured video */}
        <div className="mb-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-cream-dark">
            <iframe
              src={`https://www.youtube.com/embed/${mainVideo.id}`}
              title={decodeHtml(mainVideo.title)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <h3 className="font-noto text-lg font-bold text-charcoal leading-snug mt-4">
            {decodeHtml(mainVideo.title)}
          </h3>
          <p className="font-source text-sm text-charcoal/50 mt-2">
            News Potli
            <span className="mx-1.5">·</span>
            {formatArticleDate(mainVideo.publishedAt)}
          </p>
        </div>

        {/* 4 video cards row */}
        {listVideos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {listVideos.map((video: YouTubeVideo) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-cream-dark">
                  <Image
                    src={video.thumbnailUrl}
                    alt={decodeHtml(video.title)}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-maroon ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h4 className="font-noto text-sm font-medium leading-snug text-charcoal line-clamp-2 mt-2 group-hover:text-maroon transition-colors">
                  {decodeHtml(video.title)}
                </h4>
                <p className="font-source text-xs text-charcoal/40 mt-1">
                  {formatArticleDate(video.publishedAt)}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
