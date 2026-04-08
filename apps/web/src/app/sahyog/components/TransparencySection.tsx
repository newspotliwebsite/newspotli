// ── Transparency Section ──────────────────────────────────────────

const BREAKDOWN = [
  {
    label: 'रिपोर्टिंग और फ़ील्ड पत्रकारिता',
    percent: 60,
    color: 'bg-gold',
  },
  {
    label: 'टेक्नोलॉजी और होस्टिंग',
    percent: 20,
    color: 'bg-maroon',
  },
  {
    label: 'टीम',
    percent: 15,
    color: 'bg-green',
  },
  {
    label: 'प्रशासन',
    percent: 5,
    color: 'bg-cream-dark',
  },
]

export default function TransparencySection() {
  return (
    <section className="bg-[#111111] py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-3">
          पारदर्शिता
        </span>

        <h2 className="font-noto text-3xl md:text-4xl font-black text-white mb-10 md:mb-14">
          आपका पैसा कहाँ जाता है
        </h2>

        {/* Breakdown bars */}
        <div className="space-y-6 md:space-y-8">
          {BREAKDOWN.map((item) => (
            <div key={item.label}>
              {/* Label row */}
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-noto text-sm md:text-base text-white/80">
                  {item.label}
                </span>
                <span className="font-source text-sm font-bold text-white/60">
                  {item.percent}%
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p className="font-noto text-base text-white/40 mt-10 md:mt-14 text-center">
          हम पर भरोसा करने के लिए शुक्रिया।
        </p>
      </div>
    </section>
  )
}
