// ── Mission Statement ─────────────────────────────────────────────
export default function MissionStatement() {
  return (
    <section className="bg-charcoal py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold mb-8 block">
          Our Mission
        </span>

        {/* Large quote with maroon left border */}
        <div className="border-l-4 border-maroon pl-8 md:pl-12">
          <blockquote className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black italic text-cream leading-[1.35]">
            &ldquo;भारत के हर किसान, हर ग्रामीण परिवार तक सटीक, सरल, और सशक्त पत्रकारिता पहुँचाना — यही हमारा मिशन है।&rdquo;
          </blockquote>

          <p className="font-noto text-cream/60 text-base md:text-lg mt-6 leading-relaxed">
            हम मानते हैं कि ग्रामीण भारत की खबरें उतनी ही ज़रूरी हैं जितनी शहरों की।
            हमारी पत्रकारिता बिना किसी राजनीतिक पक्षपात के, किसान और खेत मजदूर के पक्ष में खड़ी रहती है।
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 pt-12 border-t border-white/8">
          {[
            {
              num: '01',
              title: 'सटीकता',
              en: 'Accuracy',
              desc: 'हर खबर को तीन स्रोतों से सत्यापित करने के बाद ही प्रकाशित किया जाता है।',
            },
            {
              num: '02',
              title: 'स्वतंत्रता',
              en: 'Independence',
              desc: 'हम किसी भी राजनीतिक दल या कॉर्पोरेट के प्रभाव से मुक्त हैं।',
            },
            {
              num: '03',
              title: 'पहुँच',
              en: 'Accessibility',
              desc: 'सरल हिंदी में, ताकि हर किसान समझ सके — पढ़ा-लिखा हो या नहीं।',
            },
          ].map((pillar) => (
            <div key={pillar.num}>
              <span className="font-playfair text-4xl font-black italic text-white/10 block mb-3">
                {pillar.num}
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="font-noto font-bold text-cream text-lg">{pillar.title}</h3>
                <span className="font-source text-[11px] text-cream/30 tracking-widest uppercase">{pillar.en}</span>
              </div>
              <p className="font-noto text-cream/55 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
