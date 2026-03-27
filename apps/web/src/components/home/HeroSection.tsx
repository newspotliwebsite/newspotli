'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { urlFor } from '@/lib/sanity'
import { timeAgo } from '@/lib/utils'

interface ArticleType {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  heroImage?: { alt?: string; asset?: { _ref: string } }
  category?: { title: string; color?: string }
  author?: { name: string; photo?: { asset?: { _ref: string } } }
  publishedAt: string
  readTime?: number
}

interface SidebarArticleType {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  category?: { title: string; color?: string }
}

interface HeroSectionProps {
  featuredArticle: ArticleType | null
  sidebarArticles: SidebarArticleType[]
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover/btn:translate-x-1">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function isLive(publishedAt: string): boolean {
  return Date.now() - new Date(publishedAt).getTime() < 86400000
}

export default function HeroSection({ featuredArticle, sidebarArticles }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!featuredArticle) return null

  const heroImageUrl = featuredArticle.heroImage?.asset
    ? urlFor(featuredArticle.heroImage).width(1400).height(900).quality(90).url()
    : null

  const articleUrl = `/article/${featuredArticle.slug?.current}`
  const shareText = encodeURIComponent(`पढ़िए: ${featuredArticle.title} - https://newspotli.com${articleUrl}`)
  const live = isLive(featuredArticle.publishedAt)

  return (
    <section
      className="w-full relative"
      style={{
        backgroundImage: 'radial-gradient(circle, #DDD5C0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        backgroundColor: '#FAF6EE',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── LEFT: Dark Editorial Card (60%) ── */}
          <div
            className={`lg:w-[60%] relative overflow-hidden rounded-sm min-h-[420px] md:min-h-[500px] flex flex-col justify-end transition-all duration-700 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
            }`}
          >
            {/* Background: image or gradient */}
            <div className="absolute inset-0 z-0">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={featuredArticle.heroImage?.alt || featuredArticle.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : null}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #3d1515 100%)' }}
              />
              {heroImageUrl && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0000] via-[#0d0000]/75 to-[#0d0000]/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d0000]/50 via-transparent to-transparent" />
                </>
              )}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-10 lg:p-12">
              {/* Tags row */}
              <div className="flex items-center gap-3 mb-4">
                {featuredArticle.category && (
                  <span className="category-stamp bg-maroon text-white text-[10px]">
                    {featuredArticle.category.title}
                  </span>
                )}
                {live && (
                  <span className="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    LIVE
                  </span>
                )}
              </div>

              {/* Headline */}
              <Link href={articleUrl} className="group block">
                <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-black italic text-white leading-[1.1] mb-4 group-hover:text-gold transition-colors duration-300 text-balance">
                  {featuredArticle.title}
                </h2>
              </Link>

              {featuredArticle.excerpt && (
                <p className="font-noto text-cream/75 text-sm md:text-base leading-relaxed line-clamp-2 mb-6 max-w-lg">
                  {featuredArticle.excerpt}
                </p>
              )}

              {/* Author row */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon to-maroon-dark border-2 border-gold/30 flex items-center justify-center text-white font-black text-xs font-playfair italic flex-shrink-0">
                  {featuredArticle.author?.name?.[0] || 'A'}
                </div>
                <div>
                  <p className="text-white text-sm font-bold font-source">{featuredArticle.author?.name || 'News Potli'}</p>
                  <p className="text-cream/50 text-xs font-source flex items-center gap-1.5">
                    {timeAgo(featuredArticle.publishedAt)}
                    {featuredArticle.readTime && (
                      <>
                        <span className="text-white/20">·</span>
                        <ClockIcon />
                        {featuredArticle.readTime} min
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href={articleUrl}
                  className="group/btn btn-gold-shimmer text-white font-noto font-bold py-3 px-6 text-sm flex items-center gap-2"
                >
                  पूरी खबर पढ़ें
                  <ArrowRight />
                </Link>
                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/30 text-white px-4 py-3 text-sm font-bold font-source hover:bg-white/10 transition-colors"
                >
                  <WhatsAppIcon />
                  शेयर
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Top Stories Sidebar (40%) ── */}
          <div className="lg:w-[40%] bg-white rounded-sm shadow-md flex flex-col">
            {/* Sidebar Header */}
            <div className="px-6 py-4 border-b-2 border-maroon/10">
              <h3 className="font-playfair text-xl font-black italic text-charcoal flex items-center gap-2">
                Top Stories
                <span className="inline-block w-2 h-2 rounded-full bg-maroon ml-1"></span>
              </h3>
            </div>

            {/* Story list */}
            <div className="flex-1 divide-y divide-charcoal/5">
              {sidebarArticles.slice(0, 4).map((article, index) => (
                <Link
                  key={article._id}
                  href={`/article/${article.slug?.current}`}
                  className={`group flex gap-4 px-6 py-4 hover:bg-maroon/[0.03] transition-all duration-300 ${
                    mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{
                    transitionDelay: mounted ? `${(index + 1) * 100}ms` : '0ms',
                  }}
                >
                  {/* Large number */}
                  <span className="font-playfair font-black italic text-4xl text-maroon/20 leading-none select-none flex-shrink-0 w-8 group-hover:text-maroon/40 transition-colors duration-300">
                    {index + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    {article.category && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: article.category.color || '#8B1A1A' }}
                        />
                        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-charcoal/50 font-source">
                          {article.category.title}
                        </span>
                      </div>
                    )}
                    <h4 className="font-noto font-bold text-charcoal text-[15px] leading-snug line-clamp-2 group-hover:text-maroon transition-colors duration-200">
                      {article.title}
                    </h4>
                    <p className="text-charcoal/40 text-[11px] font-source mt-1 flex items-center gap-1">
                      <ClockIcon />
                      {timeAgo(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer link */}
            <div className="px-6 py-4 border-t border-charcoal/5 bg-cream/50">
              <Link
                href="/latest"
                className="text-sm font-bold text-maroon hover:text-gold transition-colors flex items-center gap-2 group font-source"
              >
                सभी खबरें देखें
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
