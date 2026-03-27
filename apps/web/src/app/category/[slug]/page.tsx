/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import {
  CATEGORY_BY_SLUG_QUERY,
  CATEGORY_ARTICLES_QUERY,
  ALL_CATEGORY_SLUGS_QUERY,
} from '@/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryClient from './CategoryClient'

export const revalidate = 60

// ── Static Params ──
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(ALL_CATEGORY_SLUGS_QUERY)
    return (slugs || []).map((slug) => ({ slug }))
  } catch {
    return []
  }
}

// ── Metadata ──
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const cat = await fetchCategory(params.slug)
  const title = cat?.title || params.slug
  const description = cat?.description || `${title} — News Potli पर ${title} की सबसे ताज़ा खबरें`
  return {
    title: `${title} — News Potli`,
    description,
    openGraph: { title, description, siteName: 'News Potli' },
  }
}

// ── Data Fetching ──
async function fetchCategory(slug: string) {
  try {
    return await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug })
  } catch {
    return null
  }
}

async function fetchArticles(slug: string, start: number, end: number) {
  try {
    return (await client.fetch(CATEGORY_ARTICLES_QUERY, { slug, start, end })) || []
  } catch {
    return []
  }
}

// Category icon map
const CATEGORY_ICONS: Record<string, string> = {
  'kheti-kisani': '🌾',
  'pashu-palan': '🐄',
  'mausam-bemausam': '🌦️',
  'sarkari-yojana': '🏛️',
  'kamai-ki-baat': '💰',
  'takneek-se-tarakki': '🚜',
  'gaon-ki-kahaniyan': '🏡',
  'bazaar': '📊',
}

// Category gradient map
const CATEGORY_GRADIENTS: Record<string, string> = {
  'kheti-kisani': 'from-green via-green-mid to-emerald-700',
  'pashu-palan': 'from-amber-700 via-amber-600 to-yellow-600',
  'mausam-bemausam': 'from-sky-700 via-blue-600 to-indigo-700',
  'sarkari-yojana': 'from-maroon via-maroon-dark to-red-900',
  'kamai-ki-baat': 'from-gold via-amber-600 to-yellow-700',
  'takneek-se-tarakki': 'from-teal-700 via-emerald-600 to-green',
  'gaon-ki-kahaniyan': 'from-rose-800 via-pink-700 to-fuchsia-800',
  'bazaar': 'from-violet-700 via-purple-600 to-indigo-700',
}

// Hindi names for mock
const CATEGORY_HINDI_NAMES: Record<string, string> = {
  'kheti-kisani': 'खेती किसानी',
  'pashu-palan': 'पशु पालन',
  'mausam-bemausam': 'मौसम-बेमौसम',
  'sarkari-yojana': 'सरकारी योजना',
  'kamai-ki-baat': 'कमाई की बात',
  'takneek-se-tarakki': 'तकनीक से तरक्की',
  'gaon-ki-kahaniyan': 'गांव की कहानियां',
  'bazaar': 'बाजार',
}

// ── Page ──
export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await fetchCategory(params.slug)
  const initialArticles = await fetchArticles(params.slug, 0, 11)

  // Use mock if no Sanity data
  const cat = category || {
    _id: 'mock-cat',
    title: CATEGORY_HINDI_NAMES[params.slug] || params.slug,
    slug: { current: params.slug },
    description: 'News Potli पर इस विषय की सबसे ताज़ा और विश्वसनीय खबरें पढ़ें।',
    color: '#8B1A1A',
    storyCount: 42,
  }

  const icon = CATEGORY_ICONS[params.slug] || '📰'
  const gradient = CATEGORY_GRADIENTS[params.slug] || 'from-maroon via-maroon-dark to-red-900'

  return (
    <>
      <Header />
      <main className="bg-[#faf7f0] min-h-screen">

        {/* ── Category Hero Banner ── */}
        <section className={`relative bg-gradient-to-br ${gradient} text-white overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-[200px] leading-none select-none pointer-events-none">
              {icon}
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-14 md:py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/60 text-xs font-source mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">›</span>
              <span className="text-white font-bold">{cat.title}</span>
            </nav>

            <div className="flex items-start gap-5">
              <span className="text-6xl md:text-7xl select-none hidden sm:block" role="img">{icon}</span>
              <div className="flex-1">
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-black italic leading-tight mb-3">
                  {cat.title}<span className="text-gold">.</span>
                </h1>
                {cat.description && (
                  <p className="font-noto text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-4">
                    {cat.description}
                  </p>
                )}
                <div className="flex items-center gap-4 font-source text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    {cat.storyCount || 0} articles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Client-side Content (Filters + Grid + Sidebar) ── */}
        <CategoryClient
          slug={params.slug}
          category={cat}
          initialArticles={initialArticles}
        />

      </main>
      <Footer />
    </>
  )
}
