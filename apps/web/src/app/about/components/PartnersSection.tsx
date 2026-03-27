// ── Partners Section ──────────────────────────────────────────────
const PARTNERS = [
  { name: 'BBC Hindi', short: 'BBC' },
  { name: 'The Wire', short: 'Wire' },
  { name: 'NDTV', short: 'NDTV' },
  { name: 'Pulitzer Center', short: 'Pulitzer' },
  { name: 'P Sainath Foundation', short: 'P. Sainath' },
  { name: 'Gaon Connection', short: 'Gaon Conn.' },
  { name: 'Outlook India', short: 'Outlook' },
  { name: 'ICAR', short: 'ICAR' },
]

export default function PartnersSection() {
  return (
    <section className="bg-cream-dark py-14 md:py-20 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">
            Partners &amp; Collaborations
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
            जिनके साथ काम किया<span className="text-gold">.</span>
          </h2>
        </div>

        {/* Partner pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="group bg-white border border-charcoal/10 hover:border-maroon/30 hover:bg-maroon/3 px-5 py-3 rounded-sm transition-all cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="font-source font-black text-sm text-charcoal/60 group-hover:text-maroon transition-colors tracking-wide">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center font-source text-xs text-charcoal/30 mt-8 tracking-wide">
          Past collaborations and media partnerships
        </p>
      </div>
    </section>
  )
}
