import { NextResponse } from 'next/server'

// Proxies OpenWeatherMap so the API key stays server-side. A NEXT_PUBLIC_ key
// would ship to every visitor's browser, where anyone can lift it and burn the
// quota against our account.
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// News Potli HQ — used when the caller sends no coordinates.
const LUCKNOW = { lat: 26.8467, lon: 80.9462 }

const CACHE_SECONDS = 30 * 60

/**
 * Reject anything that isn't a real coordinate. Unvalidated values would be
 * interpolated straight into the upstream URL.
 */
function parseCoord(raw: string | null, max: number): number | null {
  if (raw === null) return null
  const n = Number(raw)
  if (!Number.isFinite(n) || Math.abs(n) > max) return null
  return n
}

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Weather is not configured' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const lat = parseCoord(searchParams.get('lat'), 90)
  const lon = parseCoord(searchParams.get('lon'), 180)

  // Partial or malformed coordinates fall back to Lucknow rather than 400 —
  // a farmer who denied location access should still see the weather.
  const coords = lat !== null && lon !== null ? { lat, lon } : LUCKNOW

  const params = new URLSearchParams({
    lat: String(coords.lat),
    lon: String(coords.lon),
    appid: apiKey,
    units: 'metric',
    lang: 'hi',
  })

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?${params.toString()}`, {
        next: { revalidate: CACHE_SECONDS },
      }),
      fetch(`${BASE_URL}/forecast?${params.toString()}&cnt=24`, {
        next: { revalidate: CACHE_SECONDS },
      }),
    ])

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json({ error: 'Weather upstream failed' }, { status: 502 })
    }

    const [current, forecast] = await Promise.all([
      currentRes.json(),
      forecastRes.json(),
    ])

    return NextResponse.json({ current, forecast })
  } catch {
    return NextResponse.json({ error: 'Weather upstream failed' }, { status: 502 })
  }
}
