const PILLARS = [
  {
    icon: '🌾',
    title: 'ज़मीनी पत्रकारिता',
    desc: 'हम न्यूज़रूम से नहीं, खेतों और गाँवों से रिपोर्ट करते हैं।',
  },
  {
    icon: '👥',
    title: 'हाशिये की आवाज़ें',
    desc: 'किसान, महिलाएं, और आदिवासी समुदाय — जिनकी कहानियां मुख्यधारा में नहीं आतीं।',
  },
  {
    icon: '🌍',
    title: 'जलवायु और कृषि',
    desc: 'सूखा, बाढ़, और बदलते मौसम का असर — सीधे प्रभावित लोगों की ज़ुबानी।',
  },
]

export default function MissionStatement() {
  return (
    <section className="bg-cream py-20 md:py-28 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/40 block mb-3">
            Our Mission
          </span>
          <h2 className="font-noto text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            हम क्या करते हैं<span className="text-gold">.</span>
          </h2>
          <p className="font-noto text-charcoal/55 text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            तीन सिद्धांत जिन पर News Potli खड़ा है — ज़मीन से, लोगों के लिए, और सच्चाई के साथ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 hover:-translate-y-1"
            >
              <span className="text-4xl block mb-5" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="font-noto text-xl font-bold text-charcoal mb-3 leading-tight">
                {p.title}
              </h3>
              <p className="font-noto text-charcoal/60 text-[15px] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
