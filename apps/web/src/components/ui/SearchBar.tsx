'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { liteClient as algoliasearch } from 'algoliasearch/lite'

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
}

// SVG icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<SearchHit[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setHits([])
    }
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim() || !client) {
      setHits([])
      return
    }
    setIsSearching(true)
    try {
      const { results } = await client.search<SearchHit>({
        requests: [{ indexName: INDEX_NAME, query: q, hitsPerPage: 8 }],
      })
      const firstResult = results[0]
      if ('hits' in firstResult) {
        setHits(firstResult.hits)
      }
    } catch (err) {
      console.error('Algolia search error:', err)
      setHits([])
    }
    setIsSearching(false)
  }, [])

  const handleInputChange = (val: string) => {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(val), 300)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:flex items-center justify-center"
        aria-label="Search"
      >
        <SearchIcon />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Modal */}
          <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden animate-[fadeUp_0.2s_ease-out]">
            {/* Input Row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-charcoal/10">
              <span className="text-charcoal/40"><SearchIcon /></span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="खोजें... किसान, खेती, मौसम"
                className="flex-1 bg-transparent font-noto text-lg text-charcoal placeholder:text-charcoal/35 outline-none"
              />
              <button onClick={() => setIsOpen(false)} className="text-charcoal/40 hover:text-charcoal transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {isSearching && (
                <div className="px-5 py-8 text-center font-noto text-charcoal/50">
                  <div className="inline-block w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              )}

              {!isSearching && query && hits.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <p className="font-noto text-charcoal/60 text-base mb-1">कोई परिणाम नहीं मिला</p>
                  <p className="font-source text-charcoal/40 text-sm">Try different keywords</p>
                </div>
              )}

              {hits.length > 0 && (
                <ul className="py-2">
                  {hits.map((hit) => (
                    <li key={hit.objectID}>
                      <Link
                        href={`/article/${hit.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start gap-3 px-5 py-3.5 hover:bg-cream transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          {hit.category && (
                            <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-maroon font-source mb-1">
                              {hit.category}
                            </span>
                          )}
                          <h4 className="font-noto font-bold text-charcoal text-[15px] leading-snug group-hover:text-maroon transition-colors line-clamp-2">
                            {hit.title}
                          </h4>
                          {hit.excerpt && (
                            <p className="font-noto text-xs text-charcoal/50 mt-1 line-clamp-1">
                              {hit.excerpt}
                            </p>
                          )}
                        </div>
                        <span className="text-charcoal/20 group-hover:text-maroon transition-colors mt-1">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer hint */}
              {!query && (
                <div className="px-5 py-8 text-center">
                  <p className="font-noto text-charcoal/40 text-sm">
                    किसानों, खेती, मौसम, योजना... कुछ भी खोजें
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3 text-charcoal/30 text-xs font-source">
                    <kbd className="px-1.5 py-0.5 bg-charcoal/5 rounded text-[10px] font-bold">⌘K</kbd>
                    <span>to open search</span>
                    <kbd className="px-1.5 py-0.5 bg-charcoal/5 rounded text-[10px] font-bold">ESC</kbd>
                    <span>to close</span>
                  </div>
                </div>
              )}
            </div>

            {/* View all results link */}
            {query && hits.length > 0 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 border-t border-charcoal/10 bg-cream-dark/50 font-source text-sm font-bold text-maroon hover:text-gold transition-colors"
              >
                सभी परिणाम देखें
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
