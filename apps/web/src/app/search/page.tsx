'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
const client = appId && searchKey ? algoliasearch(appId, searchKey) : null
const INDEX_NAME = 'articles'

interface SearchHit {
  objectID: string
  title: string
  excerpt?: string
  slug: string
  category?: string
  author?: string
  publishedAt?: string
  readTime?: number
}

// SVG icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [hits, setHits] = useState<SearchHit[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = async (q: string) => {
    if (!q.trim() || !client) {
      setHits([])
      setSearched(true)
      return
    }
    setIsSearching(true)
    try {
      const { results } = await client.search<SearchHit>({
        requests: [{ indexName: INDEX_NAME, query: q, hitsPerPage: 20 }],
      })
      const firstResult = results[0]
      if ('hits' in firstResult) {
        setHits(firstResult.hits)
      }
    } catch (err) {
      console.error('Search error:', err)
      setHits([])
    }
    setIsSearching(false)
    setSearched(true)
  }

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    doSearch(query)
  }

  return (
    <main className="bg-[#faf7f0] min-h-screen">

      {/* Search Header */}
      <div className="bg-white border-b border-charcoal/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-3">
            Search
          </span>
          <h1 className="font-noto text-3xl md:text-4xl font-black text-charcoal mb-6">
            खोज परिणाम<span className="text-gold">.</span>
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="खोजें... किसान, खेती, मौसम"
                className="w-full bg-cream border border-charcoal/10 focus:border-gold rounded-sm pl-12 pr-4 py-3.5 text-charcoal font-noto text-base placeholder:text-charcoal/30 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-maroon hover:bg-maroon-dark text-white px-6 py-3.5 font-source font-bold text-sm rounded-sm transition-colors"
            >
              खोजें
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        {isSearching && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-3 border-gold/30 border-t-gold rounded-full animate-spin" />
            <p className="font-noto text-charcoal/50 mt-4">खोज रहे हैं...</p>
          </div>
        )}

        {!isSearching && searched && hits.length === 0 && (
          <div className="text-center py-16">
            <p className="font-noto text-2xl text-charcoal/60 mb-2">कोई परिणाम नहीं मिला</p>
            <p className="font-source text-charcoal/40">Try different keywords or browse categories</p>
          </div>
        )}

        {!isSearching && hits.length > 0 && (
          <>
            <p className="font-source text-sm text-charcoal/50 mb-6">
              <span className="font-bold text-charcoal">{hits.length}</span> results for &ldquo;<span className="font-bold text-maroon">{initialQuery || query}</span>&rdquo;
            </p>

            <div className="space-y-0">
              {hits.map((hit, index) => (
                <Link
                  key={hit.objectID}
                  href={`/article/${hit.slug}`}
                  className="group flex items-start gap-5 py-6 border-b border-charcoal/8 hover:bg-white px-4 -mx-4 transition-colors"
                >
                  {/* Number */}
                  <span className="hidden sm:block font-noto text-3xl font-black text-charcoal/10 w-8 flex-shrink-0 group-hover:text-maroon/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {hit.category && (
                      <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-maroon font-source mb-1.5">
                        {hit.category}
                      </span>
                    )}
                    <h2 className="font-noto font-bold text-lg md:text-xl text-charcoal leading-snug group-hover:text-maroon transition-colors mb-2 line-clamp-2">
                      {hit.title}
                    </h2>
                    {hit.excerpt && (
                      <p className="font-noto text-sm text-charcoal/55 line-clamp-2 mb-2">
                        {hit.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs font-source text-charcoal/40">
                      {hit.author && <span>{hit.author}</span>}
                      {hit.publishedAt && (
                        <>
                          <span className="text-charcoal/15">·</span>
                          <span>{formatDate(hit.publishedAt)}</span>
                        </>
                      )}
                      {hit.readTime && (
                        <>
                          <span className="text-charcoal/15">·</span>
                          <span className="flex items-center gap-1"><ClockIcon /> {hit.readTime} min</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-charcoal/15 group-hover:text-maroon transition-all mt-2 flex-shrink-0 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="bg-[#faf7f0] min-h-screen flex items-center justify-center">
          <div className="inline-block w-8 h-8 border-3 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </>
  )
}
