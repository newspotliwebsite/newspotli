/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from 'next/cache'

export interface YouTubeVideo {
  id: string
  title: string
  /** ~480px wide. For the small card grid. */
  thumbnailUrl: string
  /** Up to 1280x720. For the full-width featured player. */
  thumbnailHqUrl: string
  publishedAt: string
  viewCount?: string
}

// Only ever return a thumbnail size the API actually listed for this video.
// Deriving one by hand (i.ytimg.com/vi/<id>/maxresdefault.jpg) 404s on any
// video not uploaded in HD, which is most of the older catalogue.
function pickThumbnail(thumbnails: any, preference: string[]): string {
  for (const key of preference) {
    const url = thumbnails?.[key]?.url
    if (url) return url
  }
  return ''
}

// Ensure you have these defined in .env.local
const API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

async function fetchLatestVideosFromYT(): Promise<YouTubeVideo[]> {
  if (!API_KEY || !CHANNEL_ID || API_KEY === 'your_youtube_data_api_key') {
    console.warn('YouTube API credentials missing — hiding the video section.')
    return []
  }

  try {
    // Deliberately NOT search.list: that endpoint costs 100 quota units per
    // call against a 10,000/day budget, so a handful of cold caches and deploy
    // rebuilds exhausted the daily quota and every later request 429'd. Reading
    // the channel's "uploads" playlist returns the same newest-first list for
    // 1 unit per call — the whole function now costs 3 units instead of 101.
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=contentDetails`
    const channelRes = await fetch(channelUrl)
    if (!channelRes.ok) {
      throw new Error(`YouTube channels.list returned ${channelRes.status}`)
    }

    const channelData = await channelRes.json()
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
    if (!uploadsPlaylistId) {
      throw new Error(`No uploads playlist for channel ${CHANNEL_ID}`)
    }

    // 1. Latest uploads, newest first (25 to leave enough after Shorts drop out)
    const listUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=25`
    const listRes = await fetch(listUrl)

    if (!listRes.ok) {
      throw new Error(`YouTube playlistItems.list returned ${listRes.status}`)
    }

    const listData = await listRes.json()
    const rawVideos = listData.items || []

    if (rawVideos.length === 0) return []

    // Extract video IDs for duration + stats lookup
    const videoIds = rawVideos.map((item: any) => item.contentDetails.videoId).join(',')

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
        const duration = detailsMap[item.contentDetails.videoId]?.duration || 'PT0S'
        return parseDurationSeconds(duration) >= 180
      })
      .slice(0, 5)
      .map((item: any) => {
        const videoId = item.contentDetails.videoId
        const thumbs = item.snippet.thumbnails
        return {
          id: videoId,
          title: item.snippet.title,
          thumbnailUrl: pickThumbnail(thumbs, ['high', 'medium', 'default']),
          // maxres/standard first: the featured player is full-bleed, and `high`
          // is a 480x360 letterboxed 4:3 that looks soft blown up to 16:9.
          thumbnailHqUrl: pickThumbnail(thumbs, ['maxres', 'standard', 'high', 'medium', 'default']),
          // snippet.publishedAt on a playlist item is when it was added to the
          // playlist, not when the video went live.
          publishedAt: item.contentDetails.videoPublishedAt || item.snippet.publishedAt,
          viewCount: formatViewCount(detailsMap[videoId]?.viewCount || '0'),
        }
      })

  } catch (error) {
    // Returning fabricated videos here was the black box: the mock ids are the
    // literal strings "mock-1".."mock-5", so the featured embed pointed at
    // youtube.com/embed/mock-1 and rendered YouTube's error page. An empty list
    // hides the section instead, which is honest and recoverable.
    console.error('Error fetching YouTube videos:', error)
    return []
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

// 1 Hour cache (3600 seconds)
export const getLatestVideos = unstable_cache(
  async () => fetchLatestVideosFromYT(),
  ['youtube-latest-videos'],
  { revalidate: 3600, tags: ['youtube'] }
)
