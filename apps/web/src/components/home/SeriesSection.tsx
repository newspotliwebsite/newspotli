'use client'

import Link from 'next/link'
import Image from 'next/image'

const SERIES = [
  {
    title: 'तकनीक से तरक्की',
    slug: 'takneek-se-tarakki',
    image: '/images/series/takneek-se-tarakki.jpg',
    color: '#1a1a3d',
  },
  {
    title: 'एग्रो हीरो',
    slug: 'agro-hero',
    image: '/images/series/agro-hero.jpg',
    color: '#2D5016',
  },
  {
    title: 'सोशल हीरोज',
    slug: 'social-heroes',
    image: '/images/series/social-heroes.jpg',
    color: '#8B1A1A',
  },
  {
    title: 'सोलर से समृद्धि',
    slug: 'solar-se-samriddhi',
    image: '/images/series/solar-se-samriddhi.jpg',
    color: '#C8860A',
  },
  {
    title: 'एग्रो पाठशाला',
    slug: 'agro-pathshala',
    image: '/images/series/agro-pathshala.jpg',
    color: '#5C2D00',
  },
]

export default function SeriesSection() {
  return (
    <section className="bg-cream py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-charcoal/10 pb-5 mb-10">
          <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1.5">
            Our Series
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-black text-charcoal">
            हमारी <span className="text-maroon">सीरीज़.</span>
          </h2>
        </div>

        {/* Circular Cards */}
        <div className="flex justify-center gap-6 md:gap-10 lg:gap-14 flex-wrap">
          {SERIES.map((series) => (
            <Link
              key={series.slug}
              href={`/series/${series.slug}`}
              className="group flex flex-col items-center gap-3 w-28 md:w-32"
            >
              <div
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-charcoal/10 group-hover:border-gold transition-colors duration-300 shadow-md group-hover:shadow-xl"
                style={{ borderWidth: '3px' }}
              >
                <Image
                  src={series.image}
                  alt={series.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="112px"
                />
                {/* Fallback overlay if image missing */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-white font-playfair font-black text-lg"
                  style={{ background: `${series.color}cc` }}
                >
                  {series.title[0]}
                </div>
              </div>
              <span className="font-noto font-bold text-sm text-charcoal text-center leading-tight group-hover:text-maroon transition-colors duration-200">
                {series.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
