'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'motion/react'

// ── Animated Counter (motion spring-based) ──
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')

  const spring = useSpring(0, { stiffness: 40, damping: 28, restDelta: 0.5 })
  const formatted = useTransform(spring, (v) => {
    if (v < 1) return '0'
    return Math.floor(v).toLocaleString('en-IN')
  })

  useEffect(() => {
    if (isInView) spring.set(value)
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = formatted.on('change', (v) => setDisplay(v))
    return unsubscribe
  }, [formatted])

  return (
    <span ref={ref}>
      {display}<span className="text-gold">{suffix}</span>
    </span>
  )
}

// ── Stats Data ──
const STATS = [
  { value: 266, suffix: 'K+', label: 'YouTube सब्सक्राइबर', icon: '▶' },
  { value: 73, suffix: 'M+', label: 'कुल व्यूज़', icon: '👁' },
  { value: 1666, suffix: '', label: 'वीडियो प्रकाशित', icon: '🎬' },
  { value: 18, suffix: '+', label: 'साल पत्रकारिता', icon: '📰' },
]

const PARTNERS = [
  'World Bank', 'BCG', 'Jain Irrigation', 'Escorts Kubota', '2030 Water', 'SESI'
]

export default function CredibilityStrip() {
  return (
    <section className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1010] to-[#0f0f0f] text-white py-14 md:py-16 px-4 md:px-10 lg:px-20 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-maroon/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gold/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col items-center justify-center text-center p-5 md:p-6 rounded-sm bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] hover:border-gold/20 transition-colors duration-300"
            >
              {/* Icon */}
              <span className="text-lg mb-2 opacity-60">{stat.icon}</span>

              {/* Number */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-black italic tabular-nums text-white leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="font-noto text-xs sm:text-sm text-cream/50 mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        {/* ── Partners Marquee ── */}
        <div>
          <p className="font-source text-[10px] font-bold tracking-[0.2em] text-cream/30 uppercase mb-5 text-center">
            Trusted By &amp; Featured In
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {PARTNERS.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white/[0.06] backdrop-blur-sm text-cream/70 text-sm font-source font-semibold rounded-full border border-white/10 hover:border-gold/30 hover:text-gold transition-all duration-200 cursor-default"
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
