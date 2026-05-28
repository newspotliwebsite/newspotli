'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 266, display: '2,66,000+', label: 'YouTube Subscribers', format: 'thousands' },
  { value: 73, display: '7.3 करोड़+', label: 'Total Views', format: 'crore' },
  { value: 1666, display: '1,666+', label: 'Video Reports', format: 'number' },
  { value: 20, display: '20+', label: 'Years of Journalism', format: 'plain' },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1400, active)
  const display = (() => {
    if (!active) return '0'
    switch (stat.format) {
      case 'thousands':
        return `${(count * 1000).toLocaleString('en-IN')}+`
      case 'crore':
        return `${(count / 10).toFixed(1)} करोड़+`
      case 'plain':
        return `${count}+`
      default:
        return `${count.toLocaleString('en-IN')}+`
    }
  })()

  return (
    <div className="text-center px-6 py-10">
      <div className="font-noto text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-2 tabular-nums leading-none">
        {display}
      </div>
      <div className="font-source text-[11px] font-black tracking-[0.2em] uppercase text-white/55 mt-3">
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
    <section ref={ref} className="bg-charcoal py-10 md:py-12 px-4 md:px-12 lg:px-24">
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
