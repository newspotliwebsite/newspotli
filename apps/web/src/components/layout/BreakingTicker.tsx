import Link from 'next/link'
import { client } from '@/lib/sanity'
import { BREAKING_NEWS_QUERY } from '@/lib/queries'

interface BreakingNewsItem {
  _id: string;
  title: string;
  slug: { current: string };
}

async function getTickerHeadlines(): Promise<BreakingNewsItem[]> {
  try {
    return (await client.fetch(
      BREAKING_NEWS_QUERY,
      {},
      { next: { revalidate: 60 } }
    )) || []
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Failed to fetch breaking news:', errorMessage)
    return []
  }
}

// All styles are inline and the keyframes ship as a <style> tag in this
// component's own HTML output, so the scroll animation starts the instant
// the browser parses this markup — it never waits on globals.css to load.
export default async function BreakingTicker() {
  const breakingNews = await getTickerHeadlines()

  if (!breakingNews || breakingNews.length === 0) return null

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#1a0505',
        borderBottom: '1px solid rgba(139,26,26,0.3)',
        height: '40px',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          backgroundColor: '#8B1A1A',
          color: 'white',
          fontWeight: 'bold',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          position: 'relative',
          boxShadow: '6px 0 16px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{ fontSize: '12px' }}>🔴</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          ताज़ा खबर
        </span>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            animation: 'newspotli-ticker-scroll 60s linear infinite',
          }}
        >
          {[...breakingNews, ...breakingNews].map((news, index) => (
            <span key={`${news._id}-${index}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Link
                href={`/article/${news.slug?.current || ''}`}
                style={{ color: 'rgba(250,246,238,0.9)', fontSize: '14px', padding: '0 24px', display: 'inline-block' }}
              >
                {news.title}
              </Link>
              <span style={{ color: 'rgba(200,134,10,0.4)', fontSize: '12px' }}>›</span>
            </span>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes newspotli-ticker-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `,
        }}
      />
    </div>
  )
}
