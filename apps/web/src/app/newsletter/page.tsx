'use client'

import { useState } from 'react'


import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── Benefit cards data ─────────────────────────────────────────────
const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
      </svg>
    ),
    title: 'मौसम अलर्ट',
    englishTitle: 'Weather Alerts',
    desc: 'हर सप्ताह फसल के अनुकूल मौसम की भविष्यवाणी सीधे आपके inbox में।',
    color: 'text-[#1a3a6a]',
    bg: 'bg-[#e8f0ff]',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'मंडी भाव',
    englishTitle: 'Mandi Prices',
    desc: 'ताज़ा फसल बाज़ार मूल्य, MSP अपडेट और भाव तुलना साप्ताहिक।',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'सरकारी योजनाएं',
    englishTitle: 'Govt Schemes',
    desc: 'PM-Kisan, फसल बीमा, सब्सिडी — हर नई घोषणा, सरल भाषा में।',
    color: 'text-maroon',
    bg: 'bg-maroon/8',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'फसल सुझाव',
    englishTitle: 'Crop Tips',
    desc: 'कौन सी फसल कब लगाएं, कीट-प्रबंधन, और उत्पादन बढ़ाने के आसान तरीके।',
    color: 'text-green',
    bg: 'bg-green/8',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: 'बिल्कुल नि:शुल्क',
    englishTitle: 'Completely Free',
    desc: 'कोई सब्सक्रिप्शन फीस नहीं। हमेशा के लिए मुफ़्त। जब चाहें Unsubscribe करें।',
    color: 'text-charcoal',
    bg: 'bg-charcoal/5',
  },
]

const PAST_ISSUES = [
  {
    date: '18 मार्च 2026',
    headline: 'मराठवाड़ा रिपोर्ट: 3 ज़िलों में बारिश की उम्मीद',
    preview: 'IMD का अलर्ट, MSP बढ़ोतरी की मांग, और यूपी में गेहूँ की बंपर पैदावार।',
  },
  {
    date: '11 मार्च 2026',
    headline: 'PM Drone Subsidy: 50% तक मिलेगी सब्सिडी — कैसे करें आवेदन',
    preview: 'Drone Didis योजना, नई फसल बीमा पोर्टल, और Rabi फसलों के ताज़ा भाव।',
  },
  {
    date: '4 मार्च 2026',
    headline: 'कपास संकट: Gujarat और Telangana के किसान परेशान',
    preview: 'Cotton prices crash, organic farming incentives, और budget में कृषि आवंटन।',
  },
  {
    date: '25 फरवरी 2026',
    headline: 'Agri Budget 2026: किसानों को क्या मिला?',
    preview: 'कृषि बजट विश्लेषण, PM-Kisan 20th installment, और जैविक खेती पर नया प्रोत्साहन।',
  },
]

// ── Icons ──────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

// ── Signup Form ────────────────────────────────────────────────────
function NewsletterForm({ variant = 'hero' }: { variant?: 'hero' | 'inline' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const isHero = variant === 'hero'

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
      if (res.ok) {
        setStatus('success')
      } else {
        const d = await res.json().catch(() => ({}))
        setErrorMsg(d?.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center gap-3 ${isHero ? 'text-center' : ''}`}>
        <div className="w-12 h-12 rounded-full bg-green/20 border border-green/30 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-green">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <p className={`font-noto font-bold text-lg ${isHero ? 'text-white' : 'text-charcoal'}`}>
            स्वागत है! 🌾
          </p>
          <p className={`font-noto text-sm ${isHero ? 'text-white/60' : 'text-charcoal/50'}`}>
            आपका पहला Daily Potli जल्द ही आएगा।
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col sm:flex-row gap-3 ${isHero ? 'max-w-lg mx-auto' : ''}`}>
        <div className="relative flex-1">
          <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isHero ? 'text-white/35' : 'text-charcoal/30'}`}>
            <MailIcon />
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="आपका Email पता..."
            className={`w-full pl-11 pr-4 py-3.5 rounded-sm outline-none transition-all font-noto text-sm
              ${isHero
                ? 'bg-white/12 border border-white/20 focus:border-white/50 text-white placeholder:text-white/35'
                : 'bg-white border border-charcoal/15 focus:border-maroon text-charcoal placeholder:text-charcoal/30'
              }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`font-source font-black px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70
            ${isHero
              ? 'bg-gold hover:bg-gold-light text-white shadow-lg shadow-gold/25'
              : 'bg-maroon hover:bg-maroon-dark text-white'
            }`}
        >
          {status === 'loading' ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> कृपया रुकें...</>
          ) : (
            <>Subscribe <ArrowIcon /></>
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className={`text-xs mt-2 font-source ${isHero ? 'text-red-300' : 'text-red-600'}`}>{errorMsg}</p>
      )}
      <p className={`font-source text-[11px] mt-3 ${isHero ? 'text-white/40 text-center' : 'text-charcoal/35'}`}>
        नि:शुल्क · Spam नहीं · कभी भी Unsubscribe करें
      </p>
    </form>
  )
}

// ── Page ───────────────────────────────────────────────────────────
export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-maroon-dark via-maroon to-green-dark overflow-hidden py-20 md:py-28 px-4 md:px-12 lg:px-24">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          {/* Large decorative emoji */}
          <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-[220px] opacity-10 select-none pointer-events-none hidden lg:block leading-none">
            🌾
          </span>

          <div className="max-w-3xl mx-auto text-center relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-light animate-pulse" />
              <span className="font-source text-[11px] font-black tracking-[0.2em] uppercase text-white/80">
                Daily Potli Newsletter
              </span>
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] mb-2">
              Daily Potli में<br />स्वागत है&nbsp;🌾
            </h1>

            <p className="font-noto text-white/65 text-lg md:text-xl leading-relaxed mt-5 mb-4">
              भारत के किसानों के लिए हर सप्ताह — मौसम, मंडी, योजना, और खेती के ज़रूरी अपडेट।
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {['#8B1A1A', '#2D5016', '#C8860A', '#1a3a6a'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-maroon-dark flex items-center justify-center text-white font-playfair font-black text-xs" style={{ backgroundColor: c }}>
                    {['क', 'रा', 'स', 'प'][i]}
                  </div>
                ))}
              </div>
              <p className="font-noto text-white/75 text-sm">
                <span className="font-bold text-white text-base">50,247 किसान</span> पहले से पढ़ते हैं
              </p>
            </div>

            <NewsletterForm variant="hero" />
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">What You Get</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-black text-charcoal">
                हर Potli में क्या होगा<span className="text-gold">?</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title}
                  className="group bg-white border border-charcoal/8 rounded-sm p-5 hover:shadow-md hover:-translate-y-1 transition-all text-center">
                  <div className={`w-14 h-14 ${b.bg} ${b.color} rounded-sm flex items-center justify-center mx-auto mb-4 transition-colors`}>
                    {b.icon}
                  </div>
                  <h3 className="font-noto font-bold text-base text-charcoal mb-1">{b.title}</h3>
                  <p className="font-source text-[10px] font-bold tracking-wider text-charcoal/35 uppercase mb-2">{b.englishTitle}</p>
                  <p className="font-noto text-xs text-charcoal/50 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Past Issues ── */}
        <section className="bg-cream-dark py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">Archive</span>
                <h2 className="font-playfair text-3xl md:text-4xl font-black text-charcoal">
                  पिछले अंक<span className="text-gold">.</span>
                </h2>
              </div>
              <p className="font-noto text-charcoal/40 text-sm max-w-xs">
                जो छूट गया, वो यहाँ देखें।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PAST_ISSUES.map((issue, i) => (
                <div key={i}
                  className="group bg-white border border-charcoal/8 rounded-sm p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer relative overflow-hidden">
                  {/* Issue number watermark */}
                  <span className="absolute -right-2 -top-2 font-playfair text-8xl font-black text-charcoal/[0.04] select-none leading-none">
                    {String(PAST_ISSUES.length - i).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <span className="font-source text-[10px] font-black tracking-wider text-charcoal/35 uppercase block mb-2">
                      {issue.date}
                    </span>
                    <h3 className="font-noto font-bold text-base text-charcoal leading-snug mb-3 group-hover:text-maroon transition-colors line-clamp-2">
                      {issue.headline}
                    </h3>
                    <p className="font-noto text-sm text-charcoal/50 leading-relaxed line-clamp-2">
                      {issue.preview}
                    </p>
                    <div className="flex items-center gap-1 text-maroon mt-4 font-source text-xs font-bold group-hover:gap-2 transition-all">
                      <span>पढ़ें</span> <ArrowIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inline Signup ── */}
        <section className="py-14 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-black text-charcoal mb-2">
              अभी जुड़ें<span className="text-gold">.</span>
            </h2>
            <p className="font-noto text-charcoal/50 text-sm mb-6">नि:शुल्क · हर सोमवार सुबह आएगा</p>
            <NewsletterForm variant="inline" />
          </div>
        </section>

        {/* ── WhatsApp CTA ── */}
        <section className="py-10 md:py-12 px-4 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#075E54] rounded-sm overflow-hidden px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              {/* subtle radial glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#128C7E]/40 to-transparent pointer-events-none" />

              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 shadow-xl text-white relative">
                <WhatsAppIcon />
              </div>

              <div className="flex-1 text-center sm:text-left relative">
                <h3 className="font-playfair text-xl md:text-2xl font-black text-white mb-1">
                  WhatsApp Community<span className="text-[#25D366]">.</span>
                </h3>
                <p className="font-noto text-white/65 text-sm leading-relaxed">
                  10,000+ किसानों के साथ real-time खेती चर्चा, मंडी अपडेट और मौसम अलर्ट।
                </p>
              </div>

              <a href="https://wa.me/919161682122?text=Hello%2C%20I%20want%20to%20join%20News%20Potli%20WhatsApp%20community"
                target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-source font-black px-6 py-3 rounded-sm transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap relative">
                <WhatsAppIcon />
                Group Join करें
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
