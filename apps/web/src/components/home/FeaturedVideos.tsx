import { getLatestVideos, YouTubeVideo } from '@/lib/youtube'
import Image from 'next/image'

export default async function FeaturedVideos() {
  const videos = await getLatestVideos()

  if (!videos || videos.length === 0) return null

  const mainVideo = videos[0]
  const listVideos = videos.slice(1, 5)

  return (
    <section className="bg-charcoal text-white py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-4">
          <div>
            <span className="flex items-center gap-2 font-source text-xs font-bold tracking-widest text-[#FF0000] uppercase mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
              </svg>
              News Potli Video
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-black text-white flex items-center gap-3">
              पोटली <span className="text-gold">Prime.</span>
            </h2>
          </div>
          <a
            href={`https://youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-sm font-bold text-cream hover:text-white transition-colors items-center gap-2 bg-white/10 hover:bg-[#FF0000] px-4 py-2 rounded-sm"
          >
            Subscribe
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Video Player (Left 2/3) */}
          <div className="lg:w-2/3 flex flex-col">
            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-black shadow-lg mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${mainVideo.id}`}
                title={mainVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <h3 className="font-noto font-bold text-xl md:text-2xl leading-tight mb-2">
              {mainVideo.title}
            </h3>
            <div className="flex items-center gap-4 text-xs font-source text-cream/70">
              <span className="bg-gold/20 text-gold px-2 py-1 uppercase tracking-wider font-bold rounded-sm text-[10px]">Featured</span>
              <span>{mainVideo.viewCount} Views</span>
              <span>•</span>
              <span>{new Date(mainVideo.publishedAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Video List (Right 1/3) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <div className="hidden lg:block font-source text-xs font-bold tracking-widest text-cream/50 uppercase mb-2">
              Up Next
            </div>
            <div className="flex flex-col gap-4">
              {listVideos.map((video: YouTubeVideo) => (
                <a
                  key={video.id}
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 items-start hover:bg-white/5 p-2 -mx-2 rounded transition-colors"
                >
                  <div className="relative w-32 md:w-40 aspect-video rounded-sm overflow-hidden flex-shrink-0 bg-gray-800 border border-white/10">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="160px"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col min-w-0">
                    <h4 className="font-noto font-bold text-sm leading-snug line-clamp-2 text-cream group-hover:text-white mb-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-source text-cream/50 mt-auto">
                      <span>{video.viewCount} Views</span>
                      <span>•</span>
                      <span>{new Date(video.publishedAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <a
              href={`https://youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden mt-4 w-full text-center bg-white/10 hover:bg-[#FF0000] text-white py-3 text-sm font-bold transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
