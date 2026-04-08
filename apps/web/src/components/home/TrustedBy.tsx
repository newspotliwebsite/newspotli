const PARTNERS = [
  'World Bank', 'BCG', 'Jain Irrigation', 'Escorts Kubota',
  'IFFCO', '2030 Water Resource Group', 'SESI', 'Amal Farms',
]

export default function TrustedBy() {
  return (
    <section className="bg-white py-10 border-y border-border-warm overflow-hidden">
      <p className="text-center font-source text-xs uppercase tracking-[2px] text-charcoal/40 mb-8">
        Trusted By &amp; Featured In
      </p>

      {/* Marquee container */}
      <div className="relative">
        <div className="flex gap-[50px] animate-marquee-trusted w-max">
          {/* Double the list for seamless loop */}
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-source text-lg font-bold text-charcoal/50 whitespace-nowrap hover:text-maroon hover:scale-110 transition-all duration-200 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
