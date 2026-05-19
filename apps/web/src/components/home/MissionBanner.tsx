import Link from 'next/link'

export default function MissionBanner() {
  return (
    <section className="bg-cream-dark py-12 md:py-16 px-5">
      <div className="max-w-site mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
        <p className="font-noto text-xl md:text-2xl lg:text-[26px] font-bold text-charcoal leading-snug max-w-3xl">
          भारत के गाँवों और किसानों की सच्ची कहानियां — बिना किसी फ़िल्टर के
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 bg-charcoal text-white px-5 py-2.5 rounded-full font-source font-semibold text-sm hover:bg-maroon transition-colors flex-shrink-0"
        >
          और पढ़ें
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
