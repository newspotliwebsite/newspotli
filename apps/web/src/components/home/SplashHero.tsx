import Link from 'next/link'
import Image from 'next/image'

export default function SplashHero() {
  return (
    <section
      className="relative min-h-[auto] md:min-h-[85vh] bg-cream overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #DDD5C0 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 min-h-[auto] md:min-h-[85vh]">

        {/* ── LEFT COLUMN: Text ── */}
        <div>
          {/* Eyebrow */}
          <p
            className="text-sm uppercase tracking-[0.15em] text-maroon font-bold mb-6 opacity-0"
            style={{ animation: 'fadeUpIn 0.6s ease-out 0.1s forwards' }}
          >
            🌾 भारत का #1 कृषि पत्रकारिता मंच
          </p>

          {/* Headline */}
          <h1
            className="font-noto text-[36px] md:text-[56px] lg:text-[64px] font-bold text-charcoal leading-[1.15] opacity-0"
            style={{ animation: 'fadeUpIn 0.6s ease-out 0.25s forwards' }}
          >
            भारत के गाँव और<br />
            <span className="text-maroon">किसान</span> की आवाज़
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-charcoal/60 mt-6 max-w-lg leading-relaxed opacity-0"
            style={{ animation: 'fadeUpIn 0.6s ease-out 0.4s forwards' }}
          >
            Pulitzer Center Grantee अरविंद शुक्ला और उनकी टीम द्वारा — खेती, किसानी, मौसम, सरकारी योजना और गाँव की हर खबर।
          </p>

          {/* Buttons */}
          <div
            className="mt-8 flex flex-wrap gap-4 opacity-0"
            style={{ animation: 'fadeUpIn 0.6s ease-out 0.55s forwards' }}
          >
            <Link
              href="#latest"
              className="bg-maroon text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-maroon-dark transition-all duration-300 hover:shadow-lg hover:shadow-maroon/20"
            >
              ताज़ा खबरें पढ़ें →
            </Link>
            <a
              href="https://youtube.com/@PotliNews"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-xl font-bold text-lg hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              YouTube पर देखें
            </a>
          </div>

          {/* Stats */}
          <div
            className="mt-12 grid grid-cols-3 gap-4 md:flex md:gap-8 opacity-0"
            style={{ animation: 'fadeUpIn 0.6s ease-out 0.7s forwards' }}
          >
            <div>
              <p className="text-2xl font-bold text-charcoal">266K+</p>
              <p className="text-xs text-charcoal/40 uppercase tracking-wide">YouTube सब्सक्राइबर्स</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">7.3 करोड़+</p>
              <p className="text-xs text-charcoal/40 uppercase tracking-wide">कुल व्यूज़</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">1,666+</p>
              <p className="text-xs text-charcoal/40 uppercase tracking-wide">वीडियो रिपोर्ट्स</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Illustration ── */}
        <div className="relative flex items-center justify-center">
          {/* Gold glow */}
          <div className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full bg-gold/10 blur-3xl -z-10" />

          {/* Decorative dots */}
          <div className="absolute top-8 right-12 w-3 h-3 rounded-full bg-maroon/20" style={{ animation: 'heroFloat 3s ease-in-out infinite' }} />
          <div className="absolute bottom-16 left-8 w-3 h-3 rounded-full bg-maroon/20" style={{ animation: 'heroFloat 4s ease-in-out infinite' }} />
          <div className="absolute top-1/3 left-4 w-2.5 h-2.5 rounded-full bg-gold/30" style={{ animation: 'heroFloat 6s ease-in-out infinite' }} />
          <div className="absolute bottom-8 right-20 w-2 h-2 rounded-full bg-maroon/15" style={{ animation: 'heroFloat 5s ease-in-out infinite' }} />

          {/* Main illustration */}
          <div
            className="max-w-[300px] md:max-w-none mx-auto mt-8 lg:mt-0"
            style={{ animation: 'heroFloat 5s ease-in-out infinite' }}
          >
            <Image
              src="/images/illustrations/hero-farmer-main.png"
              alt="News Potli — भारत के गाँव और किसान की आवाज़"
              width={520}
              height={520}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex">
        <span className="text-xs text-charcoal/30 uppercase tracking-widest">स्क्रॉल करें</span>
        <div className="w-5 h-8 border-2 border-charcoal/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-charcoal/30 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
