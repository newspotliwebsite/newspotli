/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from 'next/cache'

export interface YouTubeVideo {
  id: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  viewCount?: string
}

// Ensure you have these defined in .env.local
const API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

async function fetchLatestVideosFromYT(): Promise<YouTubeVideo[]> {
  if (!API_KEY || !CHANNEL_ID || API_KEY === 'your_youtube_data_api_key') {
    console.warn('YouTube API credentials missing or using placeholder. Returning mock videos.')
    return generateMockVideos()
  }

  try {
    // 1. Fetch latest videos from channel (fetch 25 to have enough after filtering Shorts)
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=25&type=video`
    const searchRes = await fetch(searchUrl)

    if (!searchRes.ok) {
      throw new Error(`YouTube API returned ${searchRes.status}`)
    }

    const searchData = await searchRes.json()
    const rawVideos = searchData.items || []

    if (rawVideos.length === 0) return []

    // Extract video IDs for duration + stats lookup
    const videoIds = rawVideos.map((item: any) => item.id.videoId).join(',')

    // 2. Fetch contentDetails (duration) + statistics in one call
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,statistics`
    const detailsRes = await fetch(detailsUrl)
    let detailsMap: Record<string, { viewCount: string; duration: string }> = {}

    if (detailsRes.ok) {
      const detailsData = await detailsRes.json()
      detailsMap = (detailsData.items || []).reduce((acc: Record<string, { viewCount: string; duration: string }>, item: any) => {
        acc[item.id] = {
          viewCount: item.statistics?.viewCount || '0',
          duration: item.contentDetails?.duration || 'PT0S',
        }
        return acc
      }, {})
    }

    // 3. Filter out Shorts (duration < 3 minutes) — YT Shorts can be up to 3 min
    return rawVideos
      .filter((item: any) => {
        const duration = detailsMap[item.id.videoId]?.duration || 'PT0S'
        return parseDurationSeconds(duration) >= 180
      })
      .slice(0, 5)
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        publishedAt: item.snippet.publishedAt,
        viewCount: formatViewCount(detailsMap[item.id.videoId]?.viewCount || '0'),
      }))

  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return generateMockVideos()
  }
}

// Parse ISO 8601 duration (PT1H2M3S) to total seconds
function parseDurationSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const h = parseInt(match[1] || '0', 10)
  const m = parseInt(match[2] || '0', 10)
  const s = parseInt(match[3] || '0', 10)
  return h * 3600 + m * 60 + s
}

// Format numbers like 1500 -> 1.5K, 1500000 -> 1.5M
function formatViewCount(views: string | number): string {
  const num = typeof views === 'string' ? parseInt(views, 10) : views
  if (isNaN(num)) return '0'
  
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

// Fallback mock data when API is unavailable or limits exceeded
function generateMockVideos(): YouTubeVideo[] {
  return [
    {
      id: 'mock-1',
      title: 'Monsoon 2024: How El Niño will affect Indian Agriculture? | Special Report',
      thumbnailUrl: 'https://placehold.co/1280x720/3a0a0a/FFFFFF/webp?text=Monsoon+Report',
      publishedAt: new Date().toISOString(),
      viewCount: '124K'
    },
    {
      id: 'mock-2',
      title: 'MSP Guarantee Law: What Farmers Need to Know | Detailed Analysis',
      thumbnailUrl: 'https://placehold.co/1280x720/8B1A1A/FFFFFF/webp?text=MSP+Analysis',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      viewCount: '89.5K'
    },
    {
      id: 'mock-3',
      title: 'Success Story: Organic Farming in Punjab Yields Record Profits',
      thumbnailUrl: 'https://placehold.co/1280x720/004e36/FFFFFF/webp?text=Organic+Farming',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      viewCount: '210K'
    },
    {
      id: 'mock-4',
      title: 'New Drone Subsidy Scheme 2024 Launched | Step by Step Guide',
      thumbnailUrl: 'https://placehold.co/1280x720/c8860a/FFFFFF/webp?text=Drone+Subsidy',
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      viewCount: '45K'
    },
    {
      id: 'mock-5',
      title: 'Dairy Farming Business Plan: Start with Low Investment',
      thumbnailUrl: 'https://placehold.co/1280x720/2d2d2d/FFFFFF/webp?text=Dairy+Business',
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      viewCount: '512K'
    }
  ]
}

// 1 Hour cache (3600 seconds)
export const getLatestVideos = unstable_cache(
  async () => fetchLatestVideosFromYT(),
  ['youtube-latest-videos'],
  { revalidate: 3600, tags: ['youtube'] }
)
