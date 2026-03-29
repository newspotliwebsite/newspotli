/**
 * Weather data fetching layer for News Potli.
 *
 * Uses OpenWeatherMap API with Hindi language support.
 * Falls back to mock data when API key is not configured.
 * Client-side in-memory cache: 30 minutes.
 */

// ── Types ──

export interface WeatherData {
  temp: number
  feelsLike: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
}

export interface ForecastDay {
  date: string
  dayName: string
  tempMin: number
  tempMax: number
  condition: string
  icon: string
}

// ── Hindi day names (Sun–Sat) ──

const HINDI_DAYS = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'] as const

// ── In-memory cache ──

const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

interface CacheEntry<T> {
  data: T
  timestamp: number
}

let weatherCache: CacheEntry<WeatherData> | null = null
let forecastCache: CacheEntry<ForecastDay[]> | null = null

function isCacheValid<T>(entry: CacheEntry<T> | null): entry is CacheEntry<T> {
  if (!entry) return false
  return Date.now() - entry.timestamp < CACHE_TTL_MS
}

// ── Mock fallback data ──

const MOCK_WEATHER: WeatherData = {
  temp: 28,
  feelsLike: 30,
  condition: 'साफ आसमान',
  humidity: 45,
  windSpeed: 12,
  icon: '01d',
}

const MOCK_FORECAST: ForecastDay[] = [
  { date: '2026-03-29', dayName: 'रवि', tempMin: 22, tempMax: 34, condition: 'साफ आसमान', icon: '01d' },
  { date: '2026-03-30', dayName: 'सोम', tempMin: 23, tempMax: 33, condition: 'हल्के बादल', icon: '02d' },
  { date: '2026-03-31', dayName: 'मंगल', tempMin: 21, tempMax: 31, condition: 'बारिश', icon: '10d' },
]

// ── API helpers ──

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ?? ''
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const CITY = 'Lucknow,IN'

function buildUrl(endpoint: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({
    q: CITY,
    appid: API_KEY,
    units: 'metric',
    lang: 'hi',
    ...extra,
  })
  return `${BASE_URL}/${endpoint}?${params.toString()}`
}

// ── Fetch current weather ──

export async function getCurrentWeather(): Promise<WeatherData> {
  if (isCacheValid(weatherCache)) return weatherCache.data

  if (!API_KEY) return MOCK_WEATHER

  try {
    const res = await fetch(buildUrl('weather'), { cache: 'no-store' })
    if (!res.ok) return MOCK_WEATHER

    const json = await res.json()
    const data: WeatherData = {
      temp: Math.round(json.main.temp),
      feelsLike: Math.round(json.main.feels_like),
      condition: json.weather[0].description,
      humidity: json.main.humidity,
      windSpeed: Math.round(json.wind.speed * 3.6), // m/s to km/h
      icon: json.weather[0].icon,
    }

    weatherCache = { data, timestamp: Date.now() }
    return data
  } catch {
    return MOCK_WEATHER
  }
}

// ── Fetch 3-day forecast ──

export async function getForecast(): Promise<ForecastDay[]> {
  if (isCacheValid(forecastCache)) return forecastCache.data

  if (!API_KEY) return MOCK_FORECAST

  try {
    const res = await fetch(buildUrl('forecast', { cnt: '24' }), { cache: 'no-store' })
    if (!res.ok) return MOCK_FORECAST

    const json = await res.json()

    // Group forecast entries by day and pick min/max per day
    const dayMap = new Map<string, { temps: number[]; condition: string; icon: string; date: Date }>()

    for (const entry of json.list) {
      const dt = new Date(entry.dt * 1000)
      const dateKey = dt.toISOString().slice(0, 10)

      if (!dayMap.has(dateKey)) {
        dayMap.set(dateKey, {
          temps: [],
          condition: entry.weather[0].description,
          icon: entry.weather[0].icon,
          date: dt,
        })
      }
      const day = dayMap.get(dateKey)!
      day.temps.push(entry.main.temp_min, entry.main.temp_max)
    }

    // Skip today, take next 3 days
    const today = new Date().toISOString().slice(0, 10)
    const days: ForecastDay[] = []
    const dateKeys = Array.from(dayMap.keys())

    for (const dateKey of dateKeys) {
      if (dateKey === today) continue
      if (days.length >= 3) break

      const info = dayMap.get(dateKey)!
      days.push({
        date: dateKey,
        dayName: HINDI_DAYS[info.date.getDay()],
        tempMin: Math.round(Math.min(...info.temps)),
        tempMax: Math.round(Math.max(...info.temps)),
        condition: info.condition,
        icon: info.icon,
      })
    }

    // If we have fewer than 3 days, pad from mock
    while (days.length < 3) {
      days.push(MOCK_FORECAST[days.length])
    }

    forecastCache = { data: days, timestamp: Date.now() }
    return days
  } catch {
    return MOCK_FORECAST
  }
}
