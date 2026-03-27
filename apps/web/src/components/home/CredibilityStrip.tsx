'use client'

import { useEffect, useRef, useState } from 'react'

function formatIndian(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)} करोड़+`
  return num.toLocaleString('en-IN') + '+'
}

function useCountUp(target: number, shouldStart: boolean, duration = 1500) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    const startTime = performance.now()
    let rafId: number

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [shouldStart, target, duration])

  return count
}

const PARTNERS = [
  'World Bank', 'BCG', 'Jain Irrigation', 'Escorts Kubota', '2030 Water', 'SESI'
]

export default function CredibilityStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const subsCount = useCountUp(266000, inView)
  const viewsCount = useCountUp(73000000, inView)
  const newsletterCount = useCountUp(50000, inView)

  return (
    <section ref={ref} className="bg-[#111111] text-white py-14 px-4 md:px-10 lg:px-20 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-maroon/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">
              {formatIndian(inView ? subsCount : 0)}
            </div>
            <div className="text-sm text-white/60 mt-1">YouTube Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">
              {formatIndian(inView ? viewsCount : 0)}
            </div>
            <div className="text-sm text-white/60 mt-1">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">
              {formatIndian(inView ? newsletterCount : 0)}
            </div>
            <div className="text-sm text-white/60 mt-1">Newsletter Readers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold">Pulitzer</div>
            <div className="text-sm text-white/60 mt-1">Center Grantee</div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-10" />

        {/* Partners */}
        <div>
          <p className="font-source text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase mb-5 text-center">
            Trusted By &amp; Worked With
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
