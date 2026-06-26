import Link from 'next/link'
import Image from 'next/image'

const SERIES = [
  { name: 'तकनीक से तरक्की', slug: 'taknik-se-tarakki', image: '/images/series/series-tech-tarakki.png' },
  { name: 'एग्रो हीरो', slug: 'agro-hero', image: '/images/series/series-agro-hero.png' },
  { name: 'सोशल हीरोज', slug: 'social-heroes', image: '/images/series/series-social-heroes.png' },
  { name: 'सोलर से समृद्धि', slug: 'solar-samriddhi', image: '/images/series/series-solar-samriddhi.png' },
  { name: 'एग्रो पाठशाला', slug: 'agro-pathshala', image: '/images/series/series-agro-pathshala.png' },
]

export default function SeriesSection() {
  return (
    <section className="bg-cream py-10 md:py-14 text-center">
      <div className="max-w-site mx-auto px-5">
        <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal">
          हमारी सीरीज़
        </h2>
        <p className="mt-2 font-source text-xs md:text-sm uppercase tracking-[0.12em] text-charcoal/50">
          Our Series
        </p>

        <div className="flex justify-center gap-6 lg:gap-10 mt-8 flex-wrap md:flex-nowrap overflow-x-auto scrollbar-none pb-4">
          {SERIES.map((series) => (
            <Link
              key={series.slug}
              href={`/category/${series.slug}`}
              className="group flex-shrink-0 w-[130px] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-[120px] h-[120px] rounded-full mx-auto mb-4 overflow-hidden bg-cream-dark flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-shadow duration-300">
                <Image
                  src={series.image}
                  alt={series.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  sizes="120px"
                />
              </div>
              <p className="font-noto text-base font-bold text-charcoal group-hover:text-maroon transition-colors">
                {series.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
