'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import SearchBar from '@/components/ui/SearchBar'

const CATEGORIES = [
  { title: 'खेती किसानी', slug: 'kheti-kisani' },
  { title: 'पशु पालन', slug: 'pashu-palan' },
  { title: 'मौसम-बेमौसम', slug: 'mausam-bemausam' },
  { title: 'सरकारी योजना', slug: 'sarkari-yojana' },
  { title: 'कमाई की बात', slug: 'kamai-ki-baat' },
  { title: 'तकनीक से तरक्की', slug: 'takneek-se-tarakki' },
  { title: 'गांव की कहानियां', slug: 'gaon-ki-kahaniyan' },
  { title: 'बाजार', slug: 'bazaar' },
]

// SVG Icons
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const ThermometerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" y1="8" x2="21" y2="8"/>
    <line x1="3" y1="16" x2="21" y2="16"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSlug, setActiveSlug] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.25)]' : ''}`}>

      {/* ── Top Utility Bar ── */}
      <div className="bg-[#0f0f0f] text-cream/80 text-xs py-2 px-4 md:px-10 lg:px-20 flex justify-between items-center border-b border-white/5">
        <div className="flex gap-5 items-center font-source">
          <span className="font-noto hidden sm:inline">{currentDate}</span>
          <span className="hidden sm:flex items-center gap-1.5 text-cream/60 border-l border-white/10 pl-5">
            <ThermometerIcon />
            28°C लखनऊ
          </span>
        </div>
        <div className="flex items-center gap-3 font-source">
          <button className="hover:text-gold transition-colors font-bold text-cream">हिंदी</button>
          <span className="text-white/20">|</span>
          <button className="hover:text-gold transition-colors text-cream/60">EN</button>
        </div>
      </div>

      {/* ── Main Header Row ── */}
      <div className="bg-maroon text-white py-4 md:py-5 px-4 md:px-10 lg:px-20 flex justify-between items-center">

        {/* Left: YouTube Stats */}
        <div className="hidden lg:flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-[#FF0000] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-wider">
              <YouTubeIcon />
              YouTube
            </span>
            <span className="font-bold text-white text-sm">266K</span>
            <span className="text-cream/70 text-xs">Subscribers</span>
          </div>
          <div className="text-xs text-cream/60 font-source flex items-center gap-1.5">
            <span>73M+ Views</span>
            <span className="text-white/20">·</span>
            <span>1,666 Videos</span>
          </div>
        </div>

        {/* Center: Brand */}
        <div className="text-center flex-1 lg:flex-none">
          <Link href="/" className="inline-block group">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight text-white group-hover:text-gold transition-colors duration-300">
              News Potli<span className="text-gold">.</span>
            </h1>
            <p className="font-noto text-cream/80 text-sm mt-1 font-medium tracking-wide">
              भारत के गाँवों और किसानों की आवाज़
            </p>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <SearchBar />
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold py-2 px-5 rounded-sm text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,134,10,0.4)]"
          >
            <BellIcon />
            Subscribe
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-cream rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className={`bg-white border-b-2 border-maroon-dark/10 shadow-sm transition-all duration-300
        ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col md:flex-row justify-center items-center py-2 px-4 md:px-8 font-noto font-semibold md:text-sm lg:text-[15px] overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug} className="w-full md:w-auto text-center border-b md:border-none border-gray-50 last:border-none">
              <Link
                href={`/category/${cat.slug}`}
                onClick={() => { setActiveSlug(cat.slug); setIsMobileMenuOpen(false) }}
                className={`relative block md:inline-block py-3 md:py-3 px-3 lg:px-5 transition-colors duration-200 group whitespace-nowrap
                  ${activeSlug === cat.slug ? 'text-maroon' : 'text-charcoal hover:text-maroon'}`}
              >
                {cat.title}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 hidden md:block
                    ${activeSlug === cat.slug ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
