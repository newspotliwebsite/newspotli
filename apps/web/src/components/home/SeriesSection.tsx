'use client'

import Link from 'next/link'
import Image from 'next/image'

const SERIES = [
  { name: 'तकनीक से तरक्की', slug: 'taknik-se-tarakki', image: '/images/series/series-tech-tarakki.png', episodes: 24 },
  { name: 'एग्रो हीरो', slug: 'agro-hero', image: '/images/series/series-agro-hero.png', episodes: 18 },
  { name: 'सोशल हीरोज', slug: 'social-heroes', image: '/images/series/series-social-heroes.png', episodes: 15 },
  { name: 'सोलर से समृद्धि', slug: 'solar-samriddhi', image: '/images/series/series-solar-samriddhi.png', episodes: 12 },
  { name: 'एग्रो पाठशाला', slug: 'agro-pathshala', image: '/images/series/series-agro-pathshala.png', episodes: 30 },
]

export default function SeriesSection() {
  return (
    <section className="bg-white py-20 text-center">
      <div className="max-w-site mx-auto px-5">
        {/* Title with gold underline */}
        <h2 className="font-noto text-[28px] font-bold text-charcoal inline-block relative">
          हमारी सीरीज़
          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gold" />
        </h2>

        {/* Series Cards */}
        <div className="flex justify-center gap-10 lg:gap-12 mt-16 flex-wrap md:flex-nowrap overflow-x-auto scrollbar-none pb-4">
          {SERIES.map((series) => (
            <Link
              key={series.slug}
              href={`/category/${series.slug}`}
              className="group flex-shrink-0 w-[160px] transition-all duration-250"
            >
              {/* Circular Image */}
              <div className="w-[140px] h-[140px] rounded-full border-[3px] border-gold mx-auto mb-4 overflow-hidden bg-cream-dark flex items-center justify-center transition-all duration-250 group-hover:border-maroon group-hover:shadow-card-hover">
                <Image
                  src={series.image}
                  alt={series.name}
                  width={140}
                  height={140}
                  className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-300"
                  sizes="140px"
                />
              </div>
              {/* Name */}
              <p className="font-noto text-base font-bold text-charcoal mb-1">
                {series.name}
              </p>
              {/* Episode count */}
              <p className="font-source text-xs text-charcoal/70">
                {series.episodes} एपिसोड
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
