'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { getArticleImage, timeAgo } from '@/lib/utils'
import SocialCube from '@/components/home/SocialCube'
import HeroWeatherCard from '@/components/home/HeroWeatherCard'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  heroImage?: { alt?: string; asset?: { _ref: string } }
  publishedAt: string
  readTime?: number
  category?: { title: string; slug?: { current: string }; color?: string }
  author?: { name: string; photo?: { asset?: { _ref: string } } }
}

interface HeroSectionProps {
  featuredArticles: Article[]
  leftArticles: Article[]
}

function SideList({ heading, articles }: { heading: string; articles: Article[] }) {
  return (
    <aside aria-labelledby={`side-${heading}`}>
      <div className="flex items-center gap-2 mb-5 border-b border-[#e8e0d0] pb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
        <h2
          id={`side-${heading}`}
          className="font-noto text-lg font-bold text-maroon leading-tight"
        >
          {heading}
        </h2>
      </div>

      <ul className="space-y-5 max-h-[560px] overflow-y-auto pr-1 scrollbar-thin">
        {articles.filter((a) => a?.slug?.current).map((article, i) => {
          const thumb = getArticleImage(article, { width: 240, height: 160 })
          return (
            <li key={article._id}>
              <Link
                href={`/article/${article.slug.current}`}
                className="group flex gap-3 items-start"
              >
                <div className="relative w-[80px] h-[60px] rounded-md overflow-hidden bg-cream-dark flex-shrink-0">
                  <Image
                    src={thumb}
                    alt={article.heroImage?.alt || article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-noto text-sm font-bold leading-snug text-charcoal line-clamp-2 group-hover:text-maroon transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1 font-source text-[11px] text-charcoal/60">
                    {timeAgo(article.publishedAt)}
                  </p>
                </div>
              </Link>
              {i < articles.length - 1 && (
                <div className="mt-5 border-b border-[#eee5d2]" />
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function HeroSection({
  featuredArticles,
  leftArticles,
}: HeroSectionProps) {
  const slides = (featuredArticles || []).filter((a) => a?.slug?.current).slice(0, 4)
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (slides.length === 0 ? 0 : (c + 1) % slides.length))
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent((c) => (slides.length === 0 ? 0 : (c - 1 + slides.length) % slides.length))
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, slides.length])

  if (slides.length === 0) return null

  return (
    <section className="bg-white py-10 md:py-14 px-4 md:px-8 lg:px-12">
      <div className="max-w-site mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_50%_25%] gap-6 lg:gap-8">

          {/* LEFT — ताज़ा खबरें */}
          <div className="hidden lg:block order-2 lg:order-1">
            <SideList heading="ताज़ा खबरें" articles={leftArticles.slice(0, 5)} />
          </div>

          {/* CENTER — Carousel */}
          <div className="order-1 lg:order-2">
            <p className="font-source text-sm uppercase tracking-widest text-charcoal/40 mb-4">
              मुख्य खबरें
            </p>
            <div className="relative">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-cream-dark">
                <div
                  className="flex w-full h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {slides.map((article, idx) => {
                    const img = getArticleImage(article, { width: 1200, height: 800, quality: 85 })
                    return (
                      <Link
                        key={article._id}
                        href={`/article/${article.slug.current}`}
                        className="relative w-full h-full flex-shrink-0 block"
                      >
                        <Image
                          src={img}
                          alt={article.heroImage?.alt || article.title}
                          fill
                          priority={idx === 0}
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
                          {article.category && (
                            <span className="inline-block rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-3">
                              {article.category.title}
                            </span>
                          )}
                          <h3 className="font-noto text-2xl md:text-3xl lg:text-[28px] font-bold leading-[1.4]">
                            {article.title}
                          </h3>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Arrows */}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous slide"
                      className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full bg-white/95 text-charcoal shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next slide"
                      className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full bg-white/95 text-charcoal shadow-lg flex items-center justify-center hover:bg-white hover:scale-105 transition-all"
                    >
                      <ChevronRightIcon />
                    </button>
                  </>
                )}
              </div>

              {/* Author/date below image */}
              <p className="mt-3 font-source text-xs md:text-sm text-charcoal/60">
                {slides[current].author?.name || 'News Potli'}
                <span className="mx-2">•</span>
                {timeAgo(slides[current].publishedAt)}
              </p>

              {/* Dot indicators */}
              {slides.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === current ? 'w-6 bg-maroon' : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Weather + social cube */}
          <div className="hidden lg:block order-3">
            <div className="space-y-4">
              <HeroWeatherCard />
              <SocialCube />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
