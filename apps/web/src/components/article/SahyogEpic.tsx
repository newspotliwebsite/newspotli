'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'np_reads'

interface ReadEntry {
  slug: string
  ts: number
}

function getMonthlyReads(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const entries: ReadEntry[] = JSON.parse(raw)
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    return entries.filter((e) => e.ts >= monthStart).length
  } catch {
    return 0
  }
}

function trackRead(slug: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const entries: ReadEntry[] = raw ? JSON.parse(raw) : []

    // Don't double-count
    if (entries.some((e) => e.slug === slug)) return

    // Add new entry
    entries.push({ slug, ts: Date.now() })

    // Prune entries older than 60 days
    const cutoff = Date.now() - 60 * 24 * 60 * 60 * 1000
    const pruned = entries.filter((e) => e.ts >= cutoff)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned))
  } catch {
    // localStorage unavailable
  }
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function SahyogEpic() {
  const [readCount, setReadCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Track current article
    const slug = window.location.pathname.replace('/article/', '')
    trackRead(slug)
    setReadCount(getMonthlyReads())
  }, [])

  if (!mounted) return null

  return (
    <div className="border-t border-charcoal/8 pt-8 mt-12">
      <div className="bg-cream-dark border border-charcoal/6 p-5 md:p-7 rounded-sm">
        {/* Eyebrow */}
        <p className="font-source text-[10px] font-black tracking-[0.2em] uppercase text-maroon mb-3">
          Independent Journalism
        </p>

        {/* Message */}
        <p className="font-noto text-base md:text-lg text-charcoal/80 leading-relaxed mb-4">
          {readCount > 1
            ? `आपने इस महीने ${readCount} खबरें पढ़ीं।`
            : 'आपने यह खबर पढ़ी।'
          }
          {' '}News Potli बिना विज्ञापन, बिना पेवॉल — सिर्फ़ आपके सहयोग से चलता है।
          अगर गाँव की खबरें मायने रखती हैं, तो{' '}
          <span className="font-bold text-charcoal">₹199 का सहयोग</span> करें।
        </p>

        {/* CTA */}
        <Link
          href="/sahyog"
          className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-bold text-sm px-6 py-3 rounded-sm transition-all hover:-translate-y-0.5 shadow-sm shadow-maroon/20 group"
        >
          सहयोग करें
          <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}
