/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import ArticleCard from '@/components/shared/ArticleCard'

interface CategoryClientProps {
  slug: string
  category: any
  initialArticles: any[]
}

// SVG icons
const FireIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
)

const EnvelopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const TABS = [
  { id: 'all', label: 'All', icon: <GridIcon /> },
  { id: 'latest', label: 'Latest', icon: <ClockIcon /> },
  { id: 'popular', label: 'Most Read', icon: <FireIcon /> },
]

export default function CategoryClient({ slug, category, initialArticles }: CategoryClientProps) {
  const [activeTab, setActiveTab] = useState('all')
  const [articles, setArticles] = useState<any[]>(initialArticles)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialArticles.length >= 12)
  const [email, setEmail] = useState('')

  // Client-side filter
  const filteredArticles = (() => {
    if (activeTab === 'latest') {
      return [...articles].sort((a, b) =>
        new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      )
    }
    if (activeTab === 'popular') {
      // Sort by readTime (approximation for "most read" without actual view data)
      return [...articles].sort((a, b) => (b.readTime || 0) - (a.readTime || 0))
    }
    return articles
  })()

  // Load more
  const loadMore = async () => {
    setLoading(true)
    const start = (page) * 12
    const end = start + 11
    try {
      const res = await fetch(`/api/category-articles?slug=${slug}&start=${start}&end=${end}`)
      const data = await res.json()
      if (data.articles && data.articles.length > 0) {
        setArticles((prev) => [...prev, ...data.articles])
        setPage((p) => p + 1)
        if (data.articles.length < 12) setHasMore(false)
      } else {
        setHasMore(false)
      }
    } catch {
      setHasMore(false)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-charcoal/10 pb-4 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 font-source text-sm font-bold whitespace-nowrap rounded-sm transition-all
                  ${activeTab === tab.id
                    ? 'bg-maroon text-white shadow-sm'
                    : 'text-charcoal/60 hover:text-maroon hover:bg-maroon/5'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="flex-1" />
            <span className="font-source text-xs text-charcoal/40 hidden sm:block">
              {filteredArticles.length} articles
            </span>
          </div>

          {/* Article Grid */}
          {filteredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map((article: any) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-white border-2 border-charcoal/10 hover:border-maroon text-charcoal hover:text-maroon px-8 py-3 font-source font-bold text-sm rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-maroon/30 border-t-maroon rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        और खबरें देखें
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="font-noto text-2xl text-charcoal/60 mb-2">कोई लेख नहीं मिला</p>
              <p className="font-source text-charcoal/40 text-sm">No articles found in this category yet.</p>
            </div>
          )}
        </div>

        {/* ── Sidebar (Desktop) ── */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-36 space-y-8">

            {/* Category Stats */}
            <div className="bg-white border border-charcoal/8 p-6 rounded-sm shadow-sm">
              <h3 className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase mb-4 pb-3 border-b border-maroon/15">
                Category Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-noto text-sm text-charcoal/60">Total Articles</span>
                  <span className="font-source font-bold text-charcoal">{category?.storyCount || articles.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-noto text-sm text-charcoal/60">Category</span>
                  <span className="font-noto font-bold text-charcoal text-sm">{category?.title || slug}</span>
                </div>
              </div>
            </div>

            {/* Top 5 Most Read */}
            <div className="bg-white border border-charcoal/8 p-6 rounded-sm shadow-sm">
              <h3 className="font-source text-[11px] font-black tracking-[0.2em] text-gold uppercase mb-4 pb-3 border-b border-gold/20">
                🔥 Most Read
              </h3>
              <ol className="space-y-4">
                {filteredArticles.slice(0, 5).map((article: any, i: number) => (
                  <li key={article._id} className="flex gap-3 group">
                    <span className="font-playfair text-2xl font-black text-charcoal/10 w-6 flex-shrink-0 group-hover:text-maroon/20 transition-colors">
                      {i + 1}
                    </span>
                    <a
                      href={`/article/${article.slug?.current || article.slug}`}
                      className="flex-1 min-w-0"
                    >
                      <h4 className="font-noto font-bold text-sm text-charcoal leading-snug group-hover:text-maroon transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      {article.readTime && (
                        <span className="font-source text-[11px] text-charcoal/40 mt-1 flex items-center gap-1">
                          <ClockIcon /> {article.readTime} min
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-maroon to-maroon-dark text-white p-6 rounded-sm shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <EnvelopeIcon />
                <h3 className="font-source text-[11px] font-black tracking-[0.2em] uppercase text-gold">
                  Newsletter
                </h3>
              </div>
              <p className="font-noto text-white/80 text-sm mb-4">
                रोज़ की ज़रूरी खबरें, सीधे inbox में।
              </p>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setEmail('') }}>
                <input
                  type="email"
                  placeholder="Email पता..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 focus:border-gold rounded-sm px-4 py-2.5 text-white text-sm placeholder:text-white/30 font-noto outline-none transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-white font-noto font-bold py-2.5 text-sm transition-all hover:-translate-y-0.5 rounded-sm"
                >
                  सब्सक्राइब करें
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

