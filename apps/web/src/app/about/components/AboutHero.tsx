// ── About Hero ────────────────────────────────────────────────────
export default function AboutHero() {
  return (
    <section className="bg-cream py-20 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <span className="inline-block font-source text-[11px] font-black tracking-[0.25em] uppercase text-maroon mb-6 border border-maroon/30 px-3 py-1">
          Our Story
        </span>

        {/* Main headline */}
        <h1 className="font-noto text-5xl sm:text-6xl md:text-7xl font-black text-charcoal leading-[1.05] mb-6 text-balance">
          भारत के गाँवों की{' '}
          <span className="relative inline-block">
            आवाज़
            {/* Maroon underline accent */}
            <span
              className="absolute left-0 -bottom-2 h-1.5 w-full bg-maroon rounded-full"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="font-noto text-xl md:text-2xl text-charcoal/60 leading-relaxed max-w-3xl mt-6">
          18 साल से हम उन खबरों को सामने ला रहे हैं जो मुख्यधारा मीडिया नजरअंदाज करता है —
          खेत, खलिहान, मंडी, और हर उस किसान की कहानी जो देश का पेट भरता है।
        </p>

        {/* Decorative pull-quote */}
        <div className="mt-12 flex gap-4 items-start max-w-2xl">
          <div className="w-1 min-h-full bg-gold flex-shrink-0 self-stretch rounded-full" />
          <p className="font-noto text-xl md:text-2xl text-charcoal/70 leading-relaxed">
            &ldquo;We do not just report the news — we give voice to the voiceless 700 million.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
