'use client'
// ── About Page CTA ────────────────────────────────────────────────
import Link from 'next/link'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function AboutCTA() {
  return (
    <section className="bg-maroon py-16 md:py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative large text watermark */}
      <span className="absolute right-8 top-1/2 -translate-y-1/2 font-playfair text-[180px] font-black text-white/[0.03] select-none pointer-events-none leading-none hidden lg:block">
        Mission
      </span>

      <div className="max-w-3xl mx-auto text-center relative">
        <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">
          Join the Mission
        </span>
        <h2 className="font-playfair text-3xl md:text-5xl font-black text-white leading-tight mb-4">
          हमारे मिशन का हिस्सा बनें<span className="text-gold">.</span>
        </h2>
        <p className="font-noto text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          हर सप्ताह खेती, मौसम, सरकारी योजना और मंडी भाव की ज़रूरी खबरें सीधे आपके inbox में।
          1 लाख+ किसानों के साथ जुड़ें।
        </p>

        {/* Newsletter form */}
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
              <MailIcon />
            </span>
            <input
              type="email"
              placeholder="आपका Email पता..."
              className="w-full bg-white/10 border border-white/15 focus:border-gold text-white placeholder:text-white/30 font-noto pl-11 pr-4 py-3.5 rounded-sm outline-none transition-all text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-gold hover:bg-gold-light text-white font-source font-black px-6 py-3.5 rounded-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
          >
            सब्सक्राइब <ArrowIcon />
          </button>
        </form>

        {/* Secondary links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm font-source">
          <Link href="https://youtube.com" className="hover:text-gold transition-colors flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.75 12.44 12.44 0 0 0-1.82-.17h-.81c-.34 0-.67.01-1 .03a5.31 5.31 0 0 0-3.31 1.51A9.77 9.77 0 0 0 7 9.54C6.38 13.37 8.48 17.62 12 19.69a13.47 13.47 0 0 0 2.51-2.5A8.49 8.49 0 0 0 16 11.89a4.49 4.49 0 0 1-1.9-1.23 4.55 4.55 0 0 1 5.49-3.97z"/></svg>
            YouTube Subscribe
          </Link>
          <span className="text-white/20">·</span>
          <Link href="/team" className="hover:text-gold transition-colors">
            हमारी टीम देखें
          </Link>
          <span className="text-white/20">·</span>
          <Link href="/contact" className="hover:text-gold transition-colors">
            संपर्क करें
          </Link>
        </div>
      </div>
    </section>
  )
}
