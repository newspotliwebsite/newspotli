import { getLatestVideos } from '@/lib/youtube'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import VideoGrid from './VideoGrid'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

export default async function VideosPage() {
  const videos = await getLatestVideos()

  // JSON-LD: VideoGallery structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'News Potli — वीडियो लाइब्रेरी',
    description:
      'ग्रामीण भारत की सच्ची कहानियाँ वीडियो में। खेती, किसान, मौसम, सरकारी योजना और बाजार।',
    url: `${SITE_URL}/videos`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'News Potli',
      url: SITE_URL,
    },
    provider: {
      '@type': 'Organization',
      name: 'News Potli',
      url: SITE_URL,
      sameAs: ['https://youtube.com/@newspotli'],
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: videos.length,
      itemListElement: videos.map((video, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VideoObject',
          name: video.title,
          thumbnailUrl: video.thumbnailUrl,
          uploadDate: video.publishedAt,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
          contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
          ...(video.viewCount
            ? {
                interactionStatistic: {
                  '@type': 'InteractionCounter',
                  interactionType: 'https://schema.org/WatchAction',
                  userInteractionCount: video.viewCount,
                },
              }
            : {}),
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-cream pb-20 md:pb-0">
        <VideoGrid videos={videos} />
      </main>

      {/* Mobile Sticky YouTube CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-red-600 border-t border-red-700 shadow-2xl">
        <a
          href="https://youtube.com/@newspotli"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-4 text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="font-source font-black text-sm tracking-wide">
            YouTube पर Subscribe करें
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-4 h-4"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <Footer />
    </>
  )
}
