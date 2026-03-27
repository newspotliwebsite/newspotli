import { urlFor } from './sanity'

// Category slug → placeholder image mapping
const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  'kheti-kisani': '/images/placeholders/farming.jpg',
  'pashu-palan': '/images/placeholders/livestock.jpg',
  'mausam-bemaum': '/images/placeholders/weather.jpg',
  'bazar': '/images/placeholders/market.jpg',
  'gaon-ki-kahaniyan': '/images/placeholders/village.jpg',
  'taknik-se-tarakki': '/images/placeholders/technology.jpg',
  'sarkari-yojana': '/images/placeholders/schemes.jpg',
  'kamai-ki-baat': '/images/placeholders/business.jpg',
}

const DEFAULT_PLACEHOLDER = '/images/placeholders/farming.jpg'

interface ArticleImageInput {
  heroImage?: { asset?: { _ref?: string }; alt?: string }
  youtubeId?: string | null
  category?: { slug?: { current?: string } }
}

/**
 * Returns the best available image URL for an article.
 * Fallback hierarchy:
 *   1. Sanity heroImage
 *   2. YouTube thumbnail (if youtubeId)
 *   3. Category-specific placeholder
 */
export function getArticleImage(
  article: ArticleImageInput,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  const { width = 800, height = 450, quality = 80 } = options

  // 1. Sanity heroImage
  if (article.heroImage?.asset?._ref) {
    return urlFor(article.heroImage).width(width).height(height).quality(quality).url()
  }

  // 2. YouTube thumbnail
  if (article.youtubeId) {
    return `https://img.youtube.com/vi/${article.youtubeId}/maxresdefault.jpg`
  }

  // 3. Category placeholder
  const catSlug = article.category?.slug?.current
  if (catSlug && CATEGORY_PLACEHOLDERS[catSlug]) {
    return CATEGORY_PLACEHOLDERS[catSlug]
  }

  return DEFAULT_PLACEHOLDER
}

/**
 * Returns a Hindi "time ago" string.
 * e.g. "2 घंटे पहले", "3 दिन पहले", "अभी"
 */
export function timeAgo(dateString: string): string {
  if (!dateString) return ''
  const now = Date.now()
  const then = new Date(dateString).getTime()
  if (isNaN(then)) return ''

  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)

  if (diffSec < 60) return 'अभी'
  if (diffMin < 60) return `${diffMin} मिनट पहले`
  if (diffHr < 24) return `${diffHr} घंटे पहले`
  if (diffDay < 7) return `${diffDay} दिन पहले`
  if (diffWeek < 5) return `${diffWeek} सप्ताह पहले`
  if (diffMonth < 12) return `${diffMonth} महीने पहले`
  return new Date(dateString).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
