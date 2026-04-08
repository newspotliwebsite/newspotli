'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 266, display: '2,66,000+', label: 'YouTube Subscribers', format: 'lakh' },
  { value: 73, display: '7.3 करोड़+', label: 'Total Views', format: 'crore' },
  { value: 1666, display: '1,666+', label: 'Videos Published', format: 'number' },
  { value: 50, display: '50,000+', label: 'Newsletter Readers', format: 'thousand' },
]

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1200, active)
  const display = (() => {
    if (!active) return '0'
    switch (stat.format) {
      case 'lakh': return `${count.toLocaleString('en-IN')}K+`
      case 'crore': return `${(count / 10).toFixed(1)} करोड़+`
      case 'thousand': return `${count}K+`
      default: return count.toLocaleString('en-IN') + '+'
    }
  })()

  return (
    <div className="text-center px-6 py-8 group">
      <div className="font-noto text-4xl md:text-5xl font-black text-gold mb-2 tabular-nums">
        {display}
      </div>
      <div className="font-source text-[11px] font-black tracking-[0.2em] uppercase text-white/50">
        {stat.label}
      </div>
    </div>
  )
}

export default function StatsStrip() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-charcoal py-12 md:py-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x divide-white/10">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
