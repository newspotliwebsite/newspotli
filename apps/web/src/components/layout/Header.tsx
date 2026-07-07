'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from '@/components/ui/SearchBar'

const CATEGORIES = [
  { title: 'खेती किसानी', slug: 'kheti-kisani' },
  { title: 'एग्री बुलेटिन', slug: 'agri-bulletin' },
  { title: 'मौसम बेमौसम', slug: 'mausam-bemausam' },
  { title: 'पशुपालन', slug: 'pashu-palan' },
  { title: 'इंटरव्यू', slug: 'sakshatkaar' },
  { title: 'बाज़ार', slug: 'bazaar' },
  { title: 'ग्राउन्ड रिपोर्ट्स', slug: 'ground-reports' },
  { title: 'कमाई वाली बात', slug: 'kamai-ki-baat' },
]

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
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

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const activeSlug = CATEGORIES.find(
    (cat) => pathname === `/category/${cat.slug}`
  )?.slug ?? ''

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white border-b border-[#e8e0d0]">
        <div className="max-w-site mx-auto px-5">
          <div className="flex items-center justify-between gap-6 py-4">
            {/* Logo + text branding */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/logos/logo-hindi.png"
                alt="News Potli"
                width={120}
                height={120}
                className="h-12 md:h-14 w-auto"
                priority
              />
              <div className="flex flex-col ml-3">
                <span className="font-noto text-2xl md:text-3xl font-bold text-charcoal leading-tight">
                  न्यूज़ पोटली
                </span>
                <span className="hidden md:block font-noto text-xs md:text-sm text-charcoal/50 tracking-wide">
                  भारत के किसानों और गाँवों की आवाज़
                </span>
              </div>
            </Link>

            {/* Desktop nav (center-right) */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-end" aria-label="Main navigation">
              <ul className="flex items-center gap-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className={`relative font-noto text-[15px] px-2.5 py-2 inline-block transition-colors duration-200 group whitespace-nowrap
                        ${activeSlug === cat.slug ? 'text-maroon font-bold' : 'text-charcoal/80 hover:text-maroon'}`}
                    >
                      {cat.title}
                      <span
                        className={`absolute -bottom-0.5 left-2.5 right-2.5 h-[2px] bg-maroon rounded-full transition-all duration-300 ease-out
                          ${activeSlug === cat.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden md:block">
                <SearchBar />
              </div>

              <button
                className="lg:hidden p-2 text-charcoal hover:text-maroon transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Full-screen overlay menu */}
        <div
          className={`lg:hidden fixed inset-0 top-0 z-[60] bg-white transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e0d0]">
            <Image src="/images/logos/logo-hindi.png" alt="News Potli" width={80} height={80} className="h-9 w-auto" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-charcoal hover:text-maroon transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="px-5 py-4 md:hidden">
            <SearchBar />
          </div>

          <ul className="px-5 py-2 space-y-1">
            {CATEGORIES.map((cat, i) => (
              <li
                key={cat.slug}
                style={{
                  animation: isMobileMenuOpen ? `fadeUpIn 0.3s ease-out ${i * 0.04}s forwards` : 'none',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-noto text-lg py-3 px-4 rounded-lg transition-all duration-200
                    ${activeSlug === cat.slug
                      ? 'text-maroon bg-maroon/5 font-bold'
                      : 'text-charcoal hover:text-maroon hover:bg-cream'}`}
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </header>
    </>
  )
}
