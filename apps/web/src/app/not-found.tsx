import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'पृष्ठ नहीं मिला — News Potli',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[75vh] bg-cream flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Illustration */}
        <Image
          src="/images/illustrations/404-lost-farmer.png"
          alt="Page not found"
          width={256}
          height={256}
          className="w-64 h-64 object-contain mb-8"
        />

        {/* Hindi headline */}
        <h1 className="font-noto text-2xl font-bold text-charcoal mb-3">
          यह पृष्ठ नहीं मिला
        </h1>

        {/* English subtext */}
        <p className="font-source text-base text-charcoal/60 mb-10">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-bold px-7 py-3 rounded transition-all hover:-translate-y-0.5"
        >
          होम पेज पर जाएं →
        </Link>
      </main>
      <Footer />
    </>
  )
}
