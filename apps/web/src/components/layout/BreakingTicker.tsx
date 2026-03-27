import Link from 'next/link'
import { client, projectId } from '@/lib/sanity'
import { BREAKING_NEWS_QUERY } from '@/lib/queries'

interface BreakingNewsItem {
  _id: string;
  title: string;
  slug: { current: string };
}

// SVG live radio wave icon
const LiveRadioIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C10.34 4.06 9 7.86 9 12c0 4.14 1.34 7.94 3 10 1.66-2.06 3-5.86 3-10S13.66 4.06 12 2z" opacity="0.4"/>
    <path d="M6.34 6.34A8 8 0 0 0 4 12a8 8 0 0 0 2.34 5.66" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"/>
    <path d="M17.66 6.34A8 8 0 0 1 20 12a8 8 0 0 1-2.34 5.66" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"/>
  </svg>
)

export default async function BreakingTicker() {
  let breakingNews: BreakingNewsItem[] = []

  if (projectId !== 'yourprojectid') {
    try {
      breakingNews = await client.fetch(BREAKING_NEWS_QUERY) || []
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('Failed to fetch breaking news:', errorMessage)
    }
  }

  if (!breakingNews || breakingNews.length === 0) return null

  return (
    <div className="w-full bg-[#1a0505] border-b border-maroon/30 overflow-hidden flex items-stretch h-10 relative">
      
      {/* Label */}
      <div className="flex-shrink-0 bg-maroon text-white font-bold px-4 flex items-center z-10 relative gap-2 shadow-[6px_0_16px_rgba(0,0,0,0.3)]">
        {/* Animated live dot with ring */}
        <span className="relative flex items-center justify-center w-4 h-4">
          <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-500 animate-ping opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
        </span>

        <LiveRadioIcon />

        <span className="font-noto text-xs font-bold tracking-wider whitespace-nowrap">ताज़ा खबर</span>
        
        {/* Arrow divider */}
        <div
          className="absolute -right-3 top-0 h-full w-3 bg-maroon z-10"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}
        />
      </div>

      {/* Scrolling news */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        <div className="absolute whitespace-nowrap animate-ticker flex items-center h-full">
          {[...breakingNews, ...breakingNews].map((news, index) => (
            <span key={`${news._id}-${index}`} className="inline-flex items-center">
              <Link
                href={`/article/${news.slug?.current || ''}`}
                className="text-cream/90 hover:text-gold transition-colors font-noto text-sm px-6 inline-block"
              >
                {news.title}
              </Link>
              <span className="text-gold/40 text-xs">›</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
