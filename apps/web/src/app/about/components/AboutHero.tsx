import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5C0F0F] to-[#8B1A1A] py-24 md:py-32 px-4 md:px-12 lg:px-24">
      {/* Optional bg illustration */}
      <Image
        src="/images/illustrations/about-journalism-field.png"
        alt=""
        fill
        className="object-cover opacity-[0.10] pointer-events-none mix-blend-soft-light"
        aria-hidden="true"
      />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <span className="font-source text-sm font-black tracking-[0.3em] uppercase text-gold block mb-6">
          Our Story
        </span>

        <h1 className="font-noto text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-7 text-balance">
          भारत के गाँवों की आवाज़<span className="text-gold">.</span>
        </h1>

        <p className="font-noto text-lg md:text-xl text-white/85 leading-[1.75] max-w-3xl">
          18 साल से हम उन खबरों को सामने ला रहे हैं जो मुख्यधारा मीडिया नजरअंदाज करता है —
          मौसम, खेतीबाड़ी, पानी, और हर उस किसान की कहानी जो देश का पेट भरता है।
        </p>

        <div className="mt-10 flex gap-4 items-start max-w-2xl border-l-2 border-gold/50 pl-5">
          <p className="font-source italic text-base md:text-lg text-white/60 leading-relaxed">
            &ldquo;We do not just report the news — we give voice to the voiceless 700 million.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
