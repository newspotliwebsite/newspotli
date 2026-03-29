'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DURATION_FAST, EASE_OUT } from '@/lib/motion'
import { getCurrentWeather, getForecast } from '@/lib/weather'
import type { WeatherData, ForecastDay } from '@/lib/weather'

// ── Weather icon mapping ──

const WEATHER_ICONS: Record<string, string> = {
  '01d': '\u2600\uFE0F', // sun
  '01n': '\uD83C\uDF19', // crescent moon
  '02d': '\u26C5',       // sun behind cloud
  '02n': '\u2601\uFE0F', // cloud
  '03d': '\u2601\uFE0F',
  '03n': '\u2601\uFE0F',
  '04d': '\u2601\uFE0F',
  '04n': '\u2601\uFE0F',
  '09d': '\uD83C\uDF27\uFE0F', // cloud with rain
  '09n': '\uD83C\uDF27\uFE0F',
  '10d': '\uD83C\uDF27\uFE0F',
  '10n': '\uD83C\uDF27\uFE0F',
  '11d': '\u26C8\uFE0F', // thunder
  '11n': '\u26C8\uFE0F',
  '13d': '\u2744\uFE0F', // snowflake
  '13n': '\u2744\uFE0F',
  '50d': '\uD83C\uDF2B\uFE0F', // fog
  '50n': '\uD83C\uDF2B\uFE0F',
}

function getWeatherEmoji(icon: string): string {
  return WEATHER_ICONS[icon] ?? '\u2601\uFE0F'
}

// ── Refresh interval ──
const REFRESH_MS = 30 * 60 * 1000 // 30 minutes

// ── Animation variants (Emil: origin-aware, asymmetric exit) ──
const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION_FAST, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.1, ease: EASE_OUT }, // exit faster than enter
  },
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Fetch weather data
  const fetchData = useCallback(async () => {
    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(),
        getForecast(),
      ])
      setWeather(currentData)
      setForecast(forecastData)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch on mount + refresh every 30 minutes
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, REFRESH_MS)
    return () => clearInterval(interval)
  }, [fetchData])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <span className="flex items-center gap-1.5 text-cream/60 border-l border-white/10 pl-5">
        <span className="inline-block w-14 h-3.5 bg-cream/10 rounded animate-shimmer" />
      </span>
    )
  }

  if (!weather) return null

  return (
    <div ref={widgetRef} className="relative">
      {/* ── Compact view (header bar) ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-cream/60 border-l border-white/10 pl-5 hover:text-cream transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="मौसम की जानकारी"
      >
        <span className="text-sm leading-none" role="img" aria-label={weather.condition}>
          {getWeatherEmoji(weather.icon)}
        </span>
        <span className="font-source font-medium">{weather.temp}°C</span>
        <span className="font-noto">लखनऊ</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-2.5 h-2.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="2 4 6 8 10 4" />
        </svg>
      </button>

      {/* ── Expanded dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl rounded-sm border border-charcoal-100 z-50 overflow-hidden origin-top-left"
          >
            {/* Current weather */}
            <div className="p-4 bg-cream">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-noto text-charcoal text-xs font-medium mb-1">
                    लखनऊ, उत्तर प्रदेश
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-source text-3xl font-bold text-charcoal">
                      {weather.temp}°
                    </span>
                    <span className="font-source text-sm text-charcoal/50">C</span>
                  </div>
                  <p className="font-noto text-sm text-charcoal/70 mt-0.5 capitalize">
                    {weather.condition}
                  </p>
                </div>
                <span className="text-4xl leading-none" role="img" aria-label={weather.condition}>
                  {getWeatherEmoji(weather.icon)}
                </span>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-charcoal/10">
                <div className="text-center">
                  <p className="font-noto text-[10px] text-charcoal/50 uppercase tracking-wide">
                    महसूस
                  </p>
                  <p className="font-source text-sm font-semibold text-charcoal mt-0.5">
                    {weather.feelsLike}°C
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-noto text-[10px] text-charcoal/50 uppercase tracking-wide">
                    नमी
                  </p>
                  <p className="font-source text-sm font-semibold text-charcoal mt-0.5">
                    {weather.humidity}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-noto text-[10px] text-charcoal/50 uppercase tracking-wide">
                    हवा
                  </p>
                  <p className="font-source text-sm font-semibold text-charcoal mt-0.5">
                    {weather.windSpeed} km/h
                  </p>
                </div>
              </div>
            </div>

            {/* 3-day forecast */}
            <div className="p-3">
              <p className="font-noto text-[10px] font-bold text-charcoal/40 uppercase tracking-wider mb-2">
                3 दिन का पूर्वानुमान
              </p>
              <div className="space-y-0">
                {forecast.map((day) => (
                  <div
                    key={day.date}
                    className="flex items-center justify-between py-2 border-b border-charcoal/5 last:border-none"
                  >
                    <span className="font-noto text-sm text-charcoal/80 w-12">
                      {day.dayName}
                    </span>
                    <span className="text-base leading-none" role="img" aria-label={day.condition}>
                      {getWeatherEmoji(day.icon)}
                    </span>
                    <span className="font-noto text-xs text-charcoal/50 flex-1 mx-2 truncate text-center">
                      {day.condition}
                    </span>
                    <span className="font-source text-sm text-charcoal whitespace-nowrap">
                      <span className="font-semibold">{day.tempMax}°</span>
                      <span className="text-charcoal/40 mx-0.5">/</span>
                      <span className="text-charcoal/50">{day.tempMin}°</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attribution */}
            <div className="px-3 pb-2">
              <p className="font-source text-[9px] text-charcoal/30 text-right">
                OpenWeatherMap
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
