// ── Sahyog Hero ───────────────────────────────────────────────────
export default function SahyogHero() {
  return (
    <section className="relative bg-gradient-to-br from-maroon via-maroon-dark to-[#3a0808] py-20 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[12rem] sm:text-[18rem] md:text-[24rem] font-black text-white/[0.03] leading-none select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        सहयोग
      </span>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="inline-block font-source text-[11px] font-black tracking-[0.3em] uppercase text-gold mb-6 border border-gold/30 px-3 py-1">
          Reader Supported
        </span>

        {/* Main headline */}
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 text-balance">
          आपकी पत्रकारिता,{' '}
          <span className="relative inline-block">
            आपका सहयोग
            <span
              className="absolute left-0 -bottom-2 h-1.5 w-full bg-gold rounded-full"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Subtext */}
        <p className="font-noto text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mt-6">
          News Potli बिना विज्ञापन, बिना मालिक, बिना पार्टी — सिर्फ़ आपके भरोसे
          चलता है। हम पेवॉल नहीं लगाएँगे — लेकिन आपके सहयोग के बिना ये
          पत्रकारिता संभव नहीं।
        </p>

        {/* Gold CTA */}
        <a
          href="#donate"
          className="inline-block btn-gold-shimmer text-white font-noto font-bold py-3.5 px-8 mt-10 text-base"
        >
          सहयोग करें ₹199 से
        </a>
      </div>
    </section>
  )
}
