import Link from 'next/link'

interface CategoryData {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  color?: string
  icon?: string
  titleEn?: string
  storyCount: number
  latestArticle?: { title: string }
}

// Fallback English titles for categories
const ENGLISH_MAP: Record<string, string> = {
  'kheti-kisani': 'Farming',
  'pashu-palan': 'Livestock',
  'mausam-bemaum': 'Weather',
  'sarkari-yojana': 'Govt Schemes',
  'kamai-ki-baat': 'Agri Business',
  'taknik-se-tarakki': 'Agro-Tech',
  'gaon-ki-kahaniyan': 'Village Stories',
  'bazar': 'Market',
}

// Fallback icons
const ICON_MAP: Record<string, string> = {
  'kheti-kisani': '🌾',
  'pashu-palan': '🐄',
  'mausam-bemaum': '🌤️',
  'sarkari-yojana': '📋',
  'kamai-ki-baat': '💰',
  'taknik-se-tarakki': '🔬',
  'gaon-ki-kahaniyan': '🏘️',
  'bazar': '📊',
}

// Fallback colors
const COLOR_MAP: Record<string, string> = {
  'kheti-kisani': '#2D5016',
  'pashu-palan': '#5C2D00',
  'mausam-bemaum': '#1a3a5c',
  'sarkari-yojana': '#3d1a00',
  'kamai-ki-baat': '#1a3a1a',
  'taknik-se-tarakki': '#1a1a3d',
  'gaon-ki-kahaniyan': '#3d2a1a',
  'bazar': '#8B1A1A',
}

export default function CategoriesGrid({ categories }: { categories: CategoryData[] }) {
  if (!categories || categories.length === 0) return null

  return (
    <section className="bg-[#faf7f0] py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-charcoal/10 pb-5 mb-10">
          <div>
            <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-1.5">Browse By Topic</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
              प्रमुख <span className="text-maroon">विषय.</span>
            </h2>
          </div>
          <Link href="/categories" className="hidden sm:flex items-center gap-2 text-sm font-bold text-maroon hover:text-gold transition-colors group font-source">
            All Topics
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((category) => {
            const slug = category.slug.current
            const baseColor = category.color || COLOR_MAP[slug] || '#374151'
            const icon = category.icon || ICON_MAP[slug] || '📰'
            const titleEn = category.titleEn || ENGLISH_MAP[slug] || ''

            return (
              <Link
                href={`/category/${slug}`}
                key={category._id}
                className="group relative overflow-hidden text-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 block rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}dd 50%, ${baseColor}99 100%)`,
                }}
              >
                {/* Decorative radial highlight */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative p-5 md:p-6 flex flex-col min-h-[180px] md:min-h-[200px]">
                  {/* Emoji Icon */}
                  <span className="text-4xl mb-3 transition-transform duration-300 group-hover:-translate-y-1 block">
                    {icon}
                  </span>

                  {/* Hindi Title */}
                  <h3 className="font-noto font-bold text-lg md:text-xl leading-tight mb-0.5 group-hover:text-gold transition-colors duration-200">
                    {category.title}
                  </h3>

                  {/* English subtitle */}
                  {titleEn && (
                    <span className="font-source text-xs text-white/60 mb-auto">
                      {titleEn}
                    </span>
                  )}

                  {/* Story Count Pill */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-source font-bold">
                      {category.storyCount} Stories
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
