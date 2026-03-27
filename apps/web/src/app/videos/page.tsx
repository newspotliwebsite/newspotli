'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── Mock video data (replace with YouTube API) ─────────────────────
const MOCK_VIDEOS = [
  {
    id: 'v1',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Monsoon 2026: मराठवाड़ा में El Niño का असर — Special Ground Report',
    thumbnail: 'https://placehold.co/640x360/3a0a0a/FFFFFF/webp?text=Monsoon+Report',
    category: 'मौसम',
    viewCount: '1.24L',
    duration: '18:42',
    publishedAt: '2026-03-18',
  },
  {
    id: 'v2',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'MSP Guarantee Law 2026: किसानों को क्या मिलेगा? पूरी जानकारी',
    thumbnail: 'https://placehold.co/640x360/8B1A1A/FFFFFF/webp?text=MSP+Analysis',
    category: 'सरकारी योजना',
    viewCount: '89.5K',
    duration: '24:15',
    publishedAt: '2026-03-15',
  },
  {
    id: 'v3',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Organic Farming Success: Punjab के इस किसान ने बदल दी पूरे गाँव की तकदीर',
    thumbnail: 'https://placehold.co/640x360/2D5016/FFFFFF/webp?text=Organic+Success',
    category: 'खेती किसानी',
    viewCount: '2.10L',
    duration: '32:08',
    publishedAt: '2026-03-12',
  },
  {
    id: 'v4',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Drone Subsidy Scheme 2026: आवेदन कैसे करें? Step by Step Guide',
    thumbnail: 'https://placehold.co/640x360/C8860A/ffffff/webp?text=Drone+Guide',
    category: 'तकनीक से तरक्की',
    viewCount: '45.1K',
    duration: '12:30',
    publishedAt: '2026-03-10',
  },
  {
    id: 'v5',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'डेयरी फार्मिंग Business Plan 2026: ₹50K से शुरू करें, लाखों कमाएँ',
    thumbnail: 'https://placehold.co/640x360/1a2a3a/FFFFFF/webp?text=Dairy+Business',
    category: 'पशु पालन',
    viewCount: '5.12L',
    duration: '28:55',
    publishedAt: '2026-03-08',
  },
  {
    id: 'v6',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Bihar में मंडी बंद: किसानों की बात — Ground Report',
    thumbnail: 'https://placehold.co/640x360/1a1a1a/FFFFFF/webp?text=Mandi+Report',
    category: 'बाजार',
    viewCount: '78.3K',
    duration: '21:44',
    publishedAt: '2026-03-06',
  },
  {
    id: 'v7',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'UP के बुंदेलखंड में पानी संकट: रिपोर्ट',
    thumbnail: 'https://placehold.co/640x360/0a2a4a/FFFFFF/webp?text=Water+Crisis',
    category: 'मौसम',
    viewCount: '1.03L',
    duration: '15:22',
    publishedAt: '2026-03-04',
  },
  {
    id: 'v8',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'गाँव की कहानी: MP की इस बेटी ने खेती में क्रांति ला दी',
    thumbnail: 'https://placehold.co/640x360/3a1a5a/FFFFFF/webp?text=Village+Story',
    category: 'गांव की कहानियां',
    viewCount: '3.40L',
    duration: '38:12',
    publishedAt: '2026-03-02',
  },
  {
    id: 'v9',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'कमाई की बात: सब्जी बेचकर कैसे बने करोड़पति — Real Story',
    thumbnail: 'https://placehold.co/640x360/1a3a2a/FFFFFF/webp?text=Income+Story',
    category: 'कमाई की बात',
    viewCount: '6.87L',
    duration: '44:20',
    publishedAt: '2026-02-28',
  },
]

const CATEGORIES = ['All', 'खेती किसानी', 'पशु पालन', 'मौसम', 'सरकारी योजना', 'कमाई की बात', 'तकनीक से तरक्की', 'गांव की कहानियां', 'बाजार']

const CATEGORY_COLORS: Record<string, string> = {
  'खेती किसानी': '#2D5016',
  'पशु पालन': '#8B1A1A',
  'मौसम': '#1a3a6a',
  'सरकारी योजना': '#4a2a6a',
  'कमाई की बात': '#5a3a00',
  'तकनीक से तरक्की': '#1a4a4a',
  'गांव की कहानियां': '#3a1a5a',
  'बाजार': '#4a1a1a',
}

// ── SVG Icons ──────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-lg">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long' })
}

// ── Video Card ─────────────────────────────────────────────────────
function VideoCard({ video }: { video: typeof MOCK_VIDEOS[0] }) {
  const catColor = CATEGORY_COLORS[video.category] || '#8B1A1A'

  return (
    <article className="group bg-white border border-charcoal/8 rounded-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-charcoal/10 cursor-pointer">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark overlay + play button */}
        <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 bg-maroon/90 hover:bg-maroon rounded-full flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all pl-1">
            <PlayIcon />
          </div>
        </div>

        {/* Category tag — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          <span
            className="font-source text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 text-white rounded-sm"
            style={{ backgroundColor: catColor }}
          >
            {video.category}
          </span>
          {/* Duration badge — bottom right */}
          <span className="bg-charcoal/85 text-white font-source text-[10px] font-bold px-2 py-0.5 rounded-sm">
            {video.duration}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-noto font-bold text-[15px] text-charcoal leading-[1.55] line-clamp-2 mb-3 group-hover:text-maroon transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-source text-xs text-charcoal/40">{formatDate(video.publishedAt)}</span>
          <span className="font-source text-xs font-bold text-charcoal/55">
            👁 {video.viewCount} views
          </span>
        </div>
      </div>
    </article>
  )
}

// ── Page ───────────────────────────────────────────────────────────
export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter(v => v.category === activeCategory)

  return (
    <>
      <Header />
      <main className="bg-cream pb-20 md:pb-0">

        {/* ── Hero Strip ── */}
        <section className="bg-gradient-to-r from-charcoal via-[#1a0505] to-maroon-dark py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-3">Video Library</span>
              <h1 className="font-playfair text-5xl md:text-6xl font-black italic text-white leading-tight">
                वीडियो<span className="text-gold">.</span>
              </h1>
              <p className="font-noto text-white/55 mt-2 text-base">
                ग्रामीण भारत की सच्ची कहानियाँ — वीडियो में।
              </p>
            </div>

            {/* YouTube Subscriber Badge */}
            <a href="https://youtube.com/@newspotli" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/8 border border-white/12 hover:border-gold/40 rounded-sm px-6 py-4 transition-all group self-start md:self-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <YouTubeIcon />
              </div>
              <div>
                <p className="font-playfair text-2xl font-black italic text-white">266K+</p>
                <p className="font-source text-[10px] font-black tracking-widest uppercase text-white/40">Subscribers on YouTube</p>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white/30 group-hover:text-gold transition-colors ml-2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </section>

        {/* ── Category Filter Tabs ── */}
        <div className="sticky top-0 z-30 bg-white border-b border-charcoal/8 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 md:px-12 lg:px-24">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 font-source font-bold text-xs tracking-wide px-4 py-2 rounded-sm transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-maroon text-white shadow-sm'
                      : 'bg-charcoal/5 text-charcoal/55 hover:bg-charcoal/10 hover:text-charcoal'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Video Grid ── */}
        <section className="py-10 md:py-14 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">

            {/* Result count */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-source text-sm text-charcoal/45">
                <span className="font-bold text-charcoal">{filtered.length}</span> वीडियो {activeCategory !== 'All' && `— ${activeCategory}`}
              </p>
              <a href="https://youtube.com/@newspotli" target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 font-source text-xs font-bold text-maroon hover:text-gold transition-colors">
                <YouTubeIcon /> View on YouTube
              </a>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-noto text-charcoal/40 text-lg">इस श्रेणी में कोई वीडियो नहीं मिला।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}

            {/* Load more placeholder */}
            {filtered.length > 6 && (
              <div className="text-center mt-10">
                <Link href="https://youtube.com/@newspotli" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-black px-8 py-3.5 rounded-sm transition-all hover:-translate-y-0.5">
                  <YouTubeIcon /> और वीडियो देखें — YouTube पर
                </Link>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* ── Mobile Sticky YouTube CTA Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-red-600 border-t border-red-700 shadow-2xl">
        <a href="https://youtube.com/@newspotli" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-4 text-white">
          <YouTubeIcon />
          <span className="font-source font-black text-sm tracking-wide">YouTube पर Subscribe करें</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>

      <Footer />
    </>
  )
}
