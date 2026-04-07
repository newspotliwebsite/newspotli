'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import SearchBar from '@/components/ui/SearchBar'
import WeatherWidget from '@/components/layout/WeatherWidget'
import FontSizeControl from '@/components/layout/FontSizeControl'

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

const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@newspotli',
    hoverClass: 'hover:text-red-500',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/newspotli',
    hoverClass: 'hover:text-pink-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://twitter.com/newspotli',
    hoverClass: 'hover:text-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/newspotli',
    hoverClass: 'hover:text-blue-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

// SVG Icons
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSlug, setActiveSlug] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* ── Skip to Content (Accessibility) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>

      <header className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.25)]' : ''}`}>

        {/* ── Top Utility Bar ── */}
        <div className="bg-[#0f0f0f] text-cream/70 text-xs py-1.5 px-4 md:px-10 lg:px-20 flex justify-between items-center border-b border-white/5">
          {/* Left: Date + Weather */}
          <div className="flex items-center gap-4 font-source">
            <span className="font-noto hidden sm:inline text-cream/50">{currentDate}</span>
            <span className="hidden sm:inline-flex">
              <WeatherWidget />
            </span>
          </div>

          {/* Right: Font Size + Social Icons */}
          <div className="flex items-center gap-2">
            <FontSizeControl />
            <span className="w-px h-3.5 bg-white/10 mx-1 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`text-cream/40 ${s.hoverClass} transition-colors p-1`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Header Row ── */}
        <div className="bg-maroon text-white py-3 md:py-4 px-4 md:px-10 lg:px-20">
          <div className="flex items-center justify-between gap-4">

            {/* Left: Logo + Brand */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* Circular Logo Placeholder — swap with real logo later */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0 border-2 border-white/20 group-hover:border-white/40 transition-colors shadow-lg">
                <span className="font-playfair font-black text-maroon text-sm md:text-base leading-none">
                  NP
                </span>
              </div>
              {/* Wordmark */}
              <div className="min-w-0">
                <span className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white group-hover:text-gold transition-colors duration-300 block leading-none">
                  News Potli<span className="text-gold group-hover:text-white transition-colors duration-300">.</span>
                </span>
                <span className="font-noto text-cream/60 text-[10px] sm:text-xs mt-0.5 block leading-tight">
                  भारत के गाँवों और किसानों की आवाज़
                </span>
              </div>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <SearchBar />

              {/* CTA: सहयोग करें — the most strategic button on the site */}
              <Link
                href="/sahyog"
                className="hidden md:inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-noto font-bold py-2 px-5 rounded-sm text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(200,134,10,0.4)]"
              >
                <HeartIcon />
                सहयोग करें
              </Link>

              {/* Mobile: compact support icon */}
              <Link
                href="/sahyog"
                className="md:hidden p-2 text-gold hover:text-gold-light transition-colors"
                aria-label="सहयोग करें"
              >
                <HeartIcon />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-cream rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav
          className={`bg-white border-b-2 border-maroon-dark/10 shadow-sm transition-all duration-300
            ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}
          aria-label="Main navigation"
        >
          <ul className="flex flex-col md:flex-row justify-center items-center py-1 md:py-0 px-4 md:px-8 font-noto font-semibold md:text-sm lg:text-[15px] overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug} className="w-full md:w-auto text-center border-b md:border-none border-charcoal/5 last:border-none">
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

          {/* Mobile-only: Social links + Support CTA at bottom of menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-charcoal/8 px-4 py-4 space-y-4">
              {/* Social icons row */}
              <div className="flex items-center justify-center gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal/50 hover:text-maroon transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              {/* Support CTA */}
              <Link
                href="/sahyog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-noto font-bold py-3 rounded-sm text-sm transition-all w-full"
              >
                <HeartIcon />
                सहयोग करें
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
