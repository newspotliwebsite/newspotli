/**
 * Weather data fetching layer for News Potli.
 *
 * Talks to /api/weather (which holds the OpenWeatherMap key server-side)
 * rather than OpenWeatherMap directly. Client-side in-memory cache: 30 minutes.
 *
 * On failure this returns null/[] rather than mock data: a widget that hides
 * itself is honest, whereas a plausible-looking fake temperature is worse than
 * no temperature at all for farmers deciding when to irrigate or harvest.
 */

// ── Types ──

export interface WeatherData {
  temp: number
  feelsLike: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  city: string
}

export interface ForecastDay {
  date: string
  dayName: string
  tempMin: number
  tempMax: number
  condition: string
  icon: string
}

export interface Coords {
  lat: number
  lon: number
}

export interface Weather {
  current: WeatherData | null
  forecast: ForecastDay[]
}

// ── Hindi day names (Sun–Sat) ──

const HINDI_DAYS = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'] as const

// ── Weather icon mapping ──
// Emoji rather than OpenWeatherMap's PNGs: they cost no extra request on a 3G
// connection, and they can't 404 or shift layout while loading.

const WEATHER_ICONS: Record<string, string> = {
  '01d': '☀️', // sun
  '01n': '🌙', // crescent moon
  '02d': '⛅',       // sun behind cloud
  '02n': '☁️', // cloud
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️', // cloud with rain
  '09n': '🌧️',
  '10d': '🌧️',
  '10n': '🌧️',
  '11d': '⛈️', // thunder
  '11n': '⛈️',
  '13d': '❄️', // snowflake
  '13n': '❄️',
  '50d': '🌫️', // fog
  '50n': '🌫️',
}

export function getWeatherEmoji(icon: string): string {
  return WEATHER_ICONS[icon] ?? '☁️'
}

// ── In-memory cache ──

const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

interface CacheEntry {
  data: Weather
  timestamp: number
  key: string
}

let cache: CacheEntry | null = null

// Coordinates are rounded to ~11km so small GPS jitter still hits the cache.
function cacheKey(coords?: Coords): string {
  if (!coords) return 'default'
  return `${coords.lat.toFixed(1)},${coords.lon.toFixed(1)}`
}

// ── Response shapes from OpenWeatherMap (validated at the boundary) ──

interface OwmCondition {
  description: string
  icon: string
}

interface OwmCurrent {
  main: { temp: number; feels_like: number; humidity: number }
  wind: { speed: number }
  weather: OwmCondition[]
  name: string
}

interface OwmForecastEntry {
  dt: number
  main: { temp_min: number; temp_max: number }
  weather: OwmCondition[]
}

interface OwmForecast {
  list: OwmForecastEntry[]
}

function parseCurrent(json: OwmCurrent): WeatherData | null {
  const condition = json?.weather?.[0]
  if (!condition || !json?.main || !json?.wind) return null

  return {
    temp: Math.round(json.main.temp),
    feelsLike: Math.round(json.main.feels_like),
    condition: condition.description,
    humidity: json.main.humidity,
    windSpeed: Math.round(json.wind.speed * 3.6), // m/s to km/h
    icon: condition.icon,
    city: json.name,
  }
}

function parseForecast(json: OwmForecast): ForecastDay[] {
  if (!Array.isArray(json?.list)) return []

  // Group 3-hourly entries into days, tracking each day's temperature spread.
  const dayMap = new Map<
    string,
    { temps: number[]; condition: string; icon: string; date: Date }
  >()

  for (const entry of json.list) {
    const condition = entry?.weather?.[0]
    if (!condition || !entry?.main) continue

    const dt = new Date(entry.dt * 1000)
    const dateKey = dt.toISOString().slice(0, 10)

    let day = dayMap.get(dateKey)
    if (!day) {
      day = { temps: [], condition: condition.description, icon: condition.icon, date: dt }
      dayMap.set(dateKey, day)
    }
    day.temps.push(entry.main.temp_min, entry.main.temp_max)
  }

  const today = new Date().toISOString().slice(0, 10)
  const days: ForecastDay[] = []

  // Array.from rather than iterating the Map directly: the tsconfig target
  // predates downlevel Map iteration.
  for (const [dateKey, info] of Array.from(dayMap.entries())) {
    if (dateKey === today) continue
    if (days.length >= 3) break

    days.push({
      date: dateKey,
      dayName: HINDI_DAYS[info.date.getDay()],
      tempMin: Math.round(Math.min(...info.temps)),
      tempMax: Math.round(Math.max(...info.temps)),
      condition: info.condition,
      icon: info.icon,
    })
  }

  return days
}

// ── Public API ──

/**
 * Fetch current conditions and a 3-day forecast for `coords`, defaulting to
 * Lucknow when omitted. Never throws.
 */
export async function getWeather(coords?: Coords): Promise<Weather> {
  const key = cacheKey(coords)
  if (cache && cache.key === key && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return cache.data
  }

  const params = coords
    ? `?lat=${encodeURIComponent(coords.lat)}&lon=${encodeURIComponent(coords.lon)}`
    : ''

  try {
    const res = await fetch(`/api/weather${params}`)
    if (!res.ok) return { current: null, forecast: [] }

    const json: { current: OwmCurrent; forecast: OwmForecast } = await res.json()
    const data: Weather = {
      current: parseCurrent(json.current),
      forecast: parseForecast(json.forecast),
    }

    cache = { data, timestamp: Date.now(), key }
    return data
  } catch {
    return { current: null, forecast: [] }
  }
}

/**
 * Resolve the visitor's coordinates, falling back to Lucknow (News Potli HQ)
 * when geolocation is unavailable, denied, or slow. Never rejects.
 */
export function getCoords(): Promise<Coords | undefined> {
  return new Promise((resolve) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      resolve(undefined)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(undefined),
      // A stale-but-instant fix beats blocking the widget on a 3G GPS lock.
      { timeout: 5000, maximumAge: 30 * 60 * 1000 }
    )
  })
}
