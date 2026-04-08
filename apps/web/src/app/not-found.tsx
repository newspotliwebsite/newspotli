import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'पृष्ठ नहीं मिला — News Potli',
  robots: { index: false },
}

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[75vh] bg-cream flex flex-col items-center justify-center px-4 py-16 text-center">

        {/* Logo wordmark accent */}
        <div className="mb-8">
          <span className="font-noto text-2xl font-black text-charcoal/20 tracking-tight select-none">
            News Potli
          </span>
        </div>

        {/* Decorative 404 */}
        <div className="relative mb-2 select-none pointer-events-none">
          <span className="block font-noto text-[clamp(120px,20vw,200px)] font-black leading-none text-maroon/10">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center font-noto text-[clamp(120px,20vw,200px)] font-black leading-none text-maroon/90">
            404
          </span>
        </div>

        {/* Maroon rule accent */}
        <div className="w-16 h-1 bg-maroon rounded-full mb-8" />

        {/* Hindi headline */}
        <h1 className="font-noto text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-snug">
          यह पृष्ठ नहीं मिला&nbsp;😔
        </h1>

        {/* Subtext */}
        <p className="font-noto text-charcoal/50 text-base md:text-lg max-w-sm leading-relaxed mb-10">
          शायद यह खबर हटा दी गई या लिंक बदल गया।<br/>
          <span className="font-source text-sm text-charcoal/35">
            The page you&apos;re looking for doesn&apos;t exist.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-black px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5 shadow-md shadow-maroon/20">
            <HomeIcon />
            होमपेज पर जाएं
          </Link>
          <Link href="/search"
            className="inline-flex items-center justify-center gap-2 border-2 border-maroon text-maroon hover:bg-maroon/5 font-source font-bold px-7 py-3.5 rounded-sm transition-all">
            <SearchIcon />
            खोजें
          </Link>
        </div>

        {/* Decorative links */}
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {[['/', 'होमपेज'], ['/videos', 'वीडियो'], ['/category/kheti-kisani', 'खेती किसानी'], ['/contact', 'संपर्क']].map(([href, label]) => (
            <Link key={href} href={href}
              className="font-noto text-sm text-charcoal/35 hover:text-maroon transition-colors underline-offset-4 hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
