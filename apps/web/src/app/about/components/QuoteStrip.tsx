export default function QuoteStrip() {
  return (
    <section className="bg-charcoal py-16 md:py-20 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Large decorative quote mark */}
        <span
          aria-hidden="true"
          className="font-noto text-[120px] md:text-[160px] text-gold/20 leading-none select-none block -mb-12 md:-mb-16"
        >
          &ldquo;
        </span>

        <blockquote className="font-noto italic text-2xl md:text-3xl lg:text-4xl text-cream leading-[1.5] font-medium">
          पत्रकारिता एक जिम्मेदारी है — उन लोगों की आवाज़ बनने की जो अपनी बात खुद नहीं कह सकते।
        </blockquote>

        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-10 h-px bg-gold" />
          <p className="font-source text-sm font-bold text-gold tracking-widest uppercase">
            अरविंद शुक्ला, Founder
          </p>
          <div className="w-10 h-px bg-gold" />
        </div>
      </div>
    </section>
  )
}
