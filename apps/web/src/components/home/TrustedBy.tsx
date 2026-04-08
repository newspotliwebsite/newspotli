import Image from 'next/image'

const PARTNERS = [
  { name: 'World Bank', logo: '/images/partners/world-bank.png' },
  { name: 'BCG', logo: '/images/partners/bcg.png' },
  { name: 'Jain Irrigation', logo: '/images/partners/jain-irrigation.png' },
  { name: 'Escorts Kubota', logo: '/images/partners/escorts-kubota.png' },
  { name: 'IFFCO', logo: '/images/partners/iffco.png' },
  { name: '2030 Water Resource Group', logo: '/images/partners/2030-water.png' },
  { name: 'SESI', logo: '/images/partners/sesi.png' },
]

export default function TrustedBy() {
  return (
    <section className="bg-white py-10 border-y border-border-warm overflow-hidden">
      <p className="text-center font-source text-xs uppercase tracking-[2px] text-charcoal/40 mb-8">
        Trusted By &amp; Featured In
      </p>

      {/* Marquee container */}
      <div className="relative">
        <div className="flex items-center gap-16 animate-marquee-trusted w-max">
          {/* Double the list for seamless loop */}
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
