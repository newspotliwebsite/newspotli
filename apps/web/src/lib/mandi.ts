import { unstable_cache } from 'next/cache'

export interface MandiPrice {
  commodity: string
  commodityHindi: string
  market: string
  minPrice: number
  maxPrice: number
  modalPrice: number
  unit: string
  date: string
}

const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY

/** Map English commodity names from the API to Hindi + emoji */
const COMMODITY_HINDI_MAP: Record<string, { hindi: string; emoji: string }> = {
  wheat: { hindi: 'गेहूँ', emoji: '🌾' },
  rice: { hindi: 'धान', emoji: '🌾' },
  paddy: { hindi: 'धान', emoji: '🌾' },
  'paddy(dhan)': { hindi: 'धान', emoji: '🌾' },
  'paddy(dhan)(common)': { hindi: 'धान', emoji: '🌾' },
  onion: { hindi: 'प्याज', emoji: '🧅' },
  potato: { hindi: 'आलू', emoji: '🥔' },
  'potato (red)': { hindi: 'आलू', emoji: '🥔' },
  tomato: { hindi: 'टमाटर', emoji: '🍅' },
  gram: { hindi: 'चना', emoji: '🫘' },
  'gram(chana whole)': { hindi: 'चना', emoji: '🫘' },
  'bengal gram(gram)(whole)': { hindi: 'चना', emoji: '🫘' },
  mustard: { hindi: 'सरसों', emoji: '🌻' },
  'mustard oil': { hindi: 'सरसों', emoji: '🌻' },
  'rape & mustard seed': { hindi: 'सरसों', emoji: '🌻' },
  maize: { hindi: 'मक्का', emoji: '🌽' },
  bajra: { hindi: 'बाजरा', emoji: '🌾' },
  'bajra(pearl millet/cumbu)': { hindi: 'बाजरा', emoji: '🌾' },
  sugarcane: { hindi: 'गन्ना', emoji: '🎋' },
  soyabean: { hindi: 'सोयाबीन', emoji: '🫘' },
  'soyabean green': { hindi: 'सोयाबीन', emoji: '🫘' },
  'green chilli': { hindi: 'हरी मिर्च', emoji: '🌶️' },
  brinjal: { hindi: 'बैंगन', emoji: '🍆' },
  garlic: { hindi: 'लहसुन', emoji: '🧄' },
  lemon: { hindi: 'नींबू', emoji: '🍋' },
}

function lookupHindi(commodityRaw: string): { hindi: string; emoji: string } | null {
  const key = commodityRaw.toLowerCase().trim()
  if (COMMODITY_HINDI_MAP[key]) return COMMODITY_HINDI_MAP[key]

  // Partial match — try to find a key that starts with the same word
  for (const [mapKey, val] of Object.entries(COMMODITY_HINDI_MAP)) {
    if (key.includes(mapKey) || mapKey.includes(key)) return val
  }
  return null
}

interface DataGovRecord {
  state: string
  district: string
  market: string
  commodity: string
  variety: string
  arrival_date: string
  min_price: string
  max_price: string
  modal_price: string
}

async function fetchMandiPricesFromGov(): Promise<MandiPrice[]> {
  if (!DATA_GOV_API_KEY) {
    console.warn('DATA_GOV_API_KEY missing. Returning mock mandi prices.')
    return getMockMandiPrices()
  }

  try {
    const url = new URL(
      'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
    )
    url.searchParams.set('api-key', DATA_GOV_API_KEY)
    url.searchParams.set('format', 'json')
    url.searchParams.set('limit', '50')
    url.searchParams.set('filters[state]', 'Uttar Pradesh')

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })

    if (!res.ok) {
      throw new Error(`data.gov.in API returned ${res.status}`)
    }

    const json = await res.json()
    const records: DataGovRecord[] = json.records ?? []

    if (records.length === 0) {
      console.warn('data.gov.in returned 0 records. Using mock data.')
      return getMockMandiPrices()
    }

    const prices: MandiPrice[] = []

    for (const r of records) {
      const match = lookupHindi(r.commodity)
      if (!match) continue

      prices.push({
        commodity: r.commodity,
        commodityHindi: `${match.emoji} ${match.hindi}`,
        market: r.market,
        minPrice: parseInt(r.min_price, 10) || 0,
        maxPrice: parseInt(r.max_price, 10) || 0,
        modalPrice: parseInt(r.modal_price, 10) || 0,
        unit: 'क्विंटल',
        date: r.arrival_date,
      })
    }

    // If filtering left us with nothing useful, fall back
    if (prices.length === 0) {
      console.warn('No recognized commodities in API response. Using mock data.')
      return getMockMandiPrices()
    }

    return prices
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Mandi price fetch failed:', msg)
    return getMockMandiPrices()
  }
}

/** Realistic mock data based on UP mandi prices (March 2026 levels) */
function getMockMandiPrices(): MandiPrice[] {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return [
    {
      commodity: 'Wheat',
      commodityHindi: '🌾 गेहूँ',
      market: 'लखनऊ',
      minPrice: 2350,
      maxPrice: 2680,
      modalPrice: 2510,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Paddy(Dhan)',
      commodityHindi: '🌾 धान',
      market: 'बाराबंकी',
      minPrice: 2180,
      maxPrice: 2420,
      modalPrice: 2310,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Onion',
      commodityHindi: '🧅 प्याज',
      market: 'आगरा',
      minPrice: 1200,
      maxPrice: 1800,
      modalPrice: 1520,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Potato',
      commodityHindi: '🥔 आलू',
      market: 'कानपुर',
      minPrice: 680,
      maxPrice: 1050,
      modalPrice: 860,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Tomato',
      commodityHindi: '🍅 टमाटर',
      market: 'लखनऊ',
      minPrice: 1600,
      maxPrice: 2400,
      modalPrice: 2050,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Gram',
      commodityHindi: '🫘 चना',
      market: 'इलाहाबाद',
      minPrice: 5200,
      maxPrice: 5800,
      modalPrice: 5520,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Mustard',
      commodityHindi: '🌻 सरसों',
      market: 'मथुरा',
      minPrice: 5400,
      maxPrice: 6100,
      modalPrice: 5780,
      unit: 'क्विंटल',
      date: today,
    },
    {
      commodity: 'Maize',
      commodityHindi: '🌽 मक्का',
      market: 'गोरखपुर',
      minPrice: 1950,
      maxPrice: 2280,
      modalPrice: 2140,
      unit: 'क्विंटल',
      date: today,
    },
  ]
}

// 1 hour cache (3600 seconds) — same pattern as youtube.ts
export const getMandiPrices = unstable_cache(
  async () => fetchMandiPricesFromGov(),
  ['mandi-prices-up'],
  { revalidate: 3600, tags: ['mandi'] }
)
