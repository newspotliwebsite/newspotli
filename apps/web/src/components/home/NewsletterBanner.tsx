'use client'

import { useState } from 'react'

const WeatherIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
)

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)

const GovernmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polygon points="12,2 2,8 22,8"/><rect x="3" y="8" width="18" height="13"/><line x1="2" y1="21" x2="22" y2="21"/><rect x="9" y="13" width="6" height="8"/>
  </svg>
)

const SeedlingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22V12"/><path d="M12 12C12 8 8 4 3 5C4 10 8 12 12 12"/><path d="M12 12C12 8 16 4 21 5C20 10 16 12 12 12"/>
  </svg>
)

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="20,12 20,22 4,22 4,12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
)

const EnvelopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)

const BENEFITS = [
  { icon: <WeatherIcon />, label: 'मौसम अपडेट' },
  { icon: <ChartIcon />, label: 'मंडी भाव' },
  { icon: <GovernmentIcon />, label: 'सरकारी योजना' },
  { icon: <SeedlingIcon />, label: 'फसल टिप्स' },
  { icon: <GiftIcon />, label: 'बिल्कुल मुफ़्त' },
]

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden w-full py-20 px-4 md:px-10 lg:px-20">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a0000] via-[#6b0000] to-[#1a3a20]" />

      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-maroon/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10">

        {/* Left: Text content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Badge */}
          <div className="glass px-5 py-2 rounded-full text-cream/90 text-sm font-bold uppercase tracking-widest shadow-sm inline-flex items-center gap-2.5 mb-8 border border-white/10">
            <EnvelopeIcon />
            Daily Potli Newsletter
          </div>

          {/* Headline */}
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black italic text-white leading-[1.1] mb-4 text-balance">
            किसानों की आवाज़, <br className="hidden md:block"/>
            सीधे आपके <span className="text-gold">inbox</span> में
          </h2>

          <p className="font-noto text-cream/70 text-lg mb-10 max-w-xl leading-relaxed">
            हर सुबह, एक potli भर जानकारी — खेती, मौसम, मंडी और सरकारी योजनाएं।
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
            {BENEFITS.map((b, i) => (
              <span key={i} className="flex items-center gap-2 glass text-white/90 font-source font-bold text-sm px-4 py-2 rounded-sm border border-white/10">
                <span className="text-gold">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="आपका ईमेल पता..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 bg-white/10 border border-white/20 focus:border-gold focus:bg-white/15 rounded-sm px-5 py-4 text-white placeholder-white/40 font-noto outline-none transition-all"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`font-noto font-bold py-4 px-7 rounded-sm transition-all flex items-center justify-center gap-2 min-w-[160px] whitespace-nowrap
                  ${status === 'success'
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'btn-gold-shimmer text-white'}
                `}
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">...</span>
                ) : status === 'success' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
                    सब्सक्राइब्ड!
                  </>
                ) : (
                  'Subscribe करें'
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-300 text-sm mt-3 font-source text-left">
                कुछ गलत हो गया। दोबारा कोशिश करें।
              </p>
            )}
          </form>

          {/* Social Proof */}
          <div className="flex items-center gap-2 text-cream/50 font-source text-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            50,247 किसान पहले से जुड़े हैं
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>

        {/* Right: Potli Illustration */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 200 260" className="w-48 h-64 drop-shadow-xl"
               style={{ animation: 'potliSway 4s ease-in-out infinite' }}>
            {/* Bag body */}
            <ellipse cx="100" cy="170" rx="75" ry="70"
              fill="#FAF6EE" fillOpacity="0.95"/>
            {/* Cloth folds */}
            <ellipse cx="80" cy="165" rx="20" ry="55"
              fill="#F0EAD6" fillOpacity="0.6"/>
            <ellipse cx="120" cy="168" rx="18" ry="52"
              fill="#F0EAD6" fillOpacity="0.5"/>
            {/* Gathered neck */}
            <ellipse cx="100" cy="105" rx="32" ry="18"
              fill="#E8D5A0"/>
            {/* Tie string */}
            <path d="M72 105 Q100 88 128 105"
              stroke="#C8860A" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* Left ear knot */}
            <ellipse cx="60" cy="88" rx="16" ry="22"
              fill="#E8A020" fillOpacity="0.9" transform="rotate(-25 60 88)"/>
            <ellipse cx="58" cy="86" rx="8" ry="11"
              fill="#C8860A" fillOpacity="0.7" transform="rotate(-25 58 86)"/>
            {/* Right ear knot */}
            <ellipse cx="140" cy="88" rx="16" ry="22"
              fill="#E8A020" fillOpacity="0.9" transform="rotate(25 140 88)"/>
            <ellipse cx="142" cy="86" rx="8" ry="11"
              fill="#C8860A" fillOpacity="0.7" transform="rotate(25 142 86)"/>
            {/* Wheat stalk peeking out */}
            <line x1="100" y1="87" x2="93" y2="40"
              stroke="#2D5016" strokeWidth="3" strokeLinecap="round"/>
            <line x1="100" y1="87" x2="108" y2="45"
              stroke="#2D5016" strokeWidth="2" strokeLinecap="round"/>
            {/* Wheat head left */}
            <ellipse cx="90" cy="36" rx="6" ry="11"
              fill="#2D5016" transform="rotate(-15 90 36)"/>
            {/* Wheat head right */}
            <ellipse cx="110" cy="40" rx="5" ry="10"
              fill="#3A6B1A" transform="rotate(15 110 40)"/>
            {/* Newspaper corner peeking */}
            <rect x="112" y="90" width="22" height="16" rx="2"
              fill="#FAF6EE" fillOpacity="0.8" transform="rotate(8 112 90)"/>
            <line x1="115" y1="95" x2="130" y2="95"
              stroke="#DDD5C0" strokeWidth="1.5"/>
            <line x1="115" y1="99" x2="128" y2="99"
              stroke="#DDD5C0" strokeWidth="1"/>
            {/* Shine highlight */}
            <ellipse cx="75" cy="140" rx="12" ry="20"
              fill="white" fillOpacity="0.15" transform="rotate(-10 75 140)"/>
          </svg>
        </div>

      </div>
    </section>
  )
}
