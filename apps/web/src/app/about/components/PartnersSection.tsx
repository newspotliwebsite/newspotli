const PARTNERS = [
  // Existing brand partners
  'Escorts Kubota',
  'IFFCO',
  'World Bank',
  'BCG',
  'Jain Irrigation',
  '2030 Water Resource Group',
  'SESI',
  // Editorial collaborations / outlets
  'BBC Hindi',
  'The Wire',
  'NDTV',
  'Pulitzer Center',
  'P. Sainath Foundation',
  'Gaon Connection',
  'Outlook India',
  'ICAR',
  'Mongabay',
  'IndiaSpend',
  'Down to Earth',
  'Climate Home News',
]

export default function PartnersSection() {
  return (
    <section className="bg-cream-dark py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-3">
            Partners &amp; Collaborations
          </span>
          <h2 className="font-noto text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            जिनके साथ काम किया<span className="text-gold">.</span>
          </h2>
          <p className="font-source text-base md:text-lg text-charcoal/50 mt-4">
            Partners &amp; Collaborations
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {PARTNERS.map((name) => (
            <div
              key={name}
              className="group bg-white border border-charcoal/10 hover:border-maroon/30 hover:bg-maroon/[0.03] px-5 py-3 rounded-xl transition-all cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="font-source font-bold text-sm text-charcoal/65 group-hover:text-maroon transition-colors tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center font-source text-xs text-charcoal/35 mt-10 tracking-wide">
          Brand partners, editorial collaborations, and publications featuring News Potli&apos;s work
        </p>
      </div>
    </section>
  )
}
