'use client'

import { useState, useEffect } from 'react'
import { getWeather, getCoords, getWeatherEmoji } from '@/lib/weather'
import type { WeatherData } from '@/lib/weather'

/**
 * Weather for the hero sidebar, localised to the visitor.
 *
 * Unlike the header widget (always Lucknow), this asks for geolocation so a
 * farmer in Vidarbha sees Vidarbha weather. Denial or timeout falls back to
 * Lucknow rather than showing nothing.
 */
export default function HeroWeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      // getCoords resolves undefined (never rejects) when the visitor denies
      // or stalls; getWeather then defaults to Lucknow.
      const coords = await getCoords()
      const { current } = await getWeather(coords)
      if (cancelled) return
      setWeather(current)
      setIsLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-4">
        <div className="h-[92px] animate-shimmer rounded bg-charcoal/5" />
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-noto text-[10px] font-bold uppercase tracking-widest text-sky-700/70">
            मौसम
          </p>
          <p className="mt-1 font-source text-3xl font-bold leading-none text-charcoal">
            {weather.temp}°C
          </p>
          <p className="mt-1 font-noto text-sm capitalize text-charcoal/60">
            {weather.condition}
          </p>
          <p className="mt-1 truncate font-noto text-xs text-charcoal/40">
            {weather.city}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end gap-1">
          <span
            className="text-4xl leading-none"
            role="img"
            aria-label={weather.condition}
          >
            {getWeatherEmoji(weather.icon)}
          </span>
          <div className="font-noto text-[10px] leading-relaxed text-charcoal/40">
            <p>नमी: {weather.humidity}%</p>
            <p>हवा: {weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  )
}
