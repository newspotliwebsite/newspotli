'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/ui/SearchBar'

/* ── Category navigation items ── */
const CATEGORIES = [
  { title: 'खेती किसानी', slug: 'kheti-kisani' },
  { title: 'मौसम बेमौसम', slug: 'mausam-bemausam' },
  { title: 'पशुपालन', slug: 'pashu-palan' },
  { title: 'साक्षात्कार', slug: 'sakshatkaar' },
  { title: 'बाज़ार', slug: 'bazaar' },
  { title: 'ग्राउन्ड रिपोर्ट्स', slug: 'ground-reports' },
  { title: 'कमाई वाली बात', slug: 'kamai-ki-baat' },
]

/* ── Inline SVG Icons ── */
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="3" y1="16" x2="21" y2="16" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const currentDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  /* Determine active category from current pathname */
  const activeSlug = CATEGORIES.find(
    (cat) => pathname === `/category/${cat.slug}`
  )?.slug ?? ''

  return (
    <>
      {/* ── Skip to Content (Accessibility) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>

      <header className="w-full sticky top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">

        {/* ═══ ROW 1: Utility Bar ═══ */}
        <div className="bg-charcoal text-white py-2">
          <div className="max-w-site mx-auto px-5 flex items-center justify-between text-[13px]">
            {/* Left: Hindi date */}
            <span className="font-noto">आज: {currentDate}</span>

            {/* Right: Social icon links */}
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com/@newspotli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://instagram.com/newspotli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://twitter.com/newspotli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ═══ ROW 2: Main Header ═══ */}
        <div className="bg-white py-5 border-b border-[#e8e0d0]">
          <div className="max-w-site mx-auto px-5">

            {/* Desktop layout: CSS Grid with 3 columns */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center">
              {/* Left: Search */}
              <div className="flex items-center">
                <SearchBar />
              </div>

              {/* Center: Logo */}
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/images/logos/logo-hindi.png"
                  alt="News Potli"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                  priority
                />
              </Link>

              {/* Right: Sahyog CTA */}
              <div className="flex items-center justify-end">
                <Link
                  href="/sahyog"
                  className="bg-gold text-white px-6 py-2.5 rounded font-bold text-sm hover:bg-[#b07509] hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(200,134,10,0.3)] transition-all"
                >
                  सहयोग करें
                </Link>
              </div>
            </div>

            {/* Mobile layout: stacked vertically, center everything */}
            <div className="flex md:hidden flex-col items-center gap-3">
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/images/logos/logo-hindi.png"
                  alt="News Potli"
                  width={80}
                  height={80}
                  className="h-14 w-auto"
                  priority
                />
              </Link>
              <div className="flex items-center gap-3 w-full justify-center">
                <SearchBar />
                <Link
                  href="/sahyog"
                  className="bg-gold text-white px-5 py-2 rounded font-bold text-sm hover:bg-[#b07509] transition-all"
                >
                  सहयोग करें
                </Link>
                <button
                  className="p-2 text-charcoal hover:text-maroon transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ═══ ROW 3: Tagline Strip ═══ */}
        <div className="bg-maroon text-cream text-center py-1 text-[14px] tracking-wider font-noto">
          भारत के गाँव और किसान की आवाज़
        </div>

        {/* ═══ ROW 4: Navigation ═══ */}
        <nav className="bg-cream py-3 border-b-2 border-maroon" aria-label="Main navigation">
          {/* Desktop: full horizontal nav */}
          <ul className="hidden md:flex max-w-site mx-auto px-5 justify-between items-center">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`font-noto font-bold text-[17px] px-2.5 py-1 transition-all whitespace-nowrap ${
                    activeSlug === cat.slug
                      ? 'text-maroon'
                      : 'text-charcoal hover:text-maroon'
                  }`}
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile: horizontal scroll nav, toggled by hamburger */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-nowrap gap-5 overflow-x-auto px-5 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug} className="flex-shrink-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-noto font-bold text-[17px] px-2.5 py-1 transition-all whitespace-nowrap ${
                      activeSlug === cat.slug
                        ? 'text-maroon'
                        : 'text-charcoal hover:text-maroon'
                    }`}
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

      </header>
    </>
  )
}
