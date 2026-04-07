// ── Impact Section ────────────────────────────────────────────────

const IMPACT_ITEMS = [
  {
    icon: '\uD83D\uDCF9',
    title: '1 वीडियो रिपोर्ट',
    description:
      'एक किसान की ज़मीनी कहानी को YouTube पर 73M+ दर्शकों तक पहुँचाना',
  },
  {
    icon: '\uD83D\uDCF0',
    title: '1 ग्राउंड रिपोर्ट',
    description: 'गाँव जाकर, किसानों से मिलकर, सच्चाई लिखना',
  },
  {
    icon: '\uD83D\uDCE7',
    title: '1 सप्ताह का न्यूज़लेटर',
    description: '50,000+ किसानों को रोज़ की ज़रूरी खबरें भेजना',
  },
  {
    icon: '\uD83C\uDFDB\uFE0F',
    title: '1 RTI स्टोरी',
    description: 'सरकारी योजनाओं की सच्चाई उजागर करना',
  },
]

export default function ImpactSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <span className="font-source text-[11px] font-black tracking-[0.25em] text-charcoal/40 uppercase block mb-3">
          Your Impact
        </span>

        <h2 className="font-playfair text-3xl md:text-4xl font-black text-charcoal mb-10 md:mb-14">
          आपका सहयोग क्या करता है
        </h2>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {IMPACT_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-charcoal/6 rounded-sm p-6 md:p-8"
            >
              {/* Icon */}
              <span
                className="text-3xl block mb-4"
                role="img"
                aria-hidden="true"
              >
                {item.icon}
              </span>

              {/* Title */}
              <h3 className="font-noto text-lg font-bold text-charcoal mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-noto text-sm text-charcoal/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
