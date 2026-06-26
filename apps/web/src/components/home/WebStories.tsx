'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { getArticleImage, timeAgo } from '@/lib/utils'

interface WebStory {
  _id: string
  title: string
  slug: { current: string }
  heroImage?: { alt?: string; asset?: { _ref: string } }
  publishedAt: string
  author?: { name: string }
  category?: { slug?: { current: string } }
}

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const StoryStackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="6" width="14" height="14" rx="2" />
    <path d="M7 2h12a2 2 0 0 1 2 2v12" />
  </svg>
)

export default function WebStories({ stories }: { stories: WebStory[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const open = useCallback((idx: number) => setOpenIdx(idx), [])
  const close = useCallback(() => setOpenIdx(null), [])

  const goNext = useCallback(() => {
    setOpenIdx((i) => {
      if (i === null) return i
      return i < stories.length - 1 ? i + 1 : i
    })
  }, [stories.length])

  const goPrev = useCallback(() => {
    setOpenIdx((i) => {
      if (i === null) return i
      return i > 0 ? i - 1 : i
    })
  }, [])

  // Lock body scroll + keyboard nav when modal open
  useEffect(() => {
    if (openIdx === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIdx, close, goNext, goPrev])

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const handleShare = async (story: WebStory) => {
    const url = `${window.location.origin}/article/${story.slug.current}`
    if (navigator.share) {
      try {
        await navigator.share({ title: story.title, url })
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url)
      } catch {}
    }
  }

  if (!stories || stories.length === 0) return null

  const active = openIdx !== null ? stories[openIdx] : null

  return (
    <section className="bg-white py-10 md:py-12 px-5">
      <div className="max-w-site mx-auto">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-noto text-2xl md:text-[28px] font-bold text-charcoal leading-tight">
            वेब स्टोरीज़
          </h2>

          {/* Scroll arrows (desktop) */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy(-460)}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full bg-white border border-[#e8e0d0] text-charcoal flex items-center justify-center hover:bg-cream hover:border-maroon hover:text-maroon transition-all"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scrollBy(460)}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full bg-white border border-[#e8e0d0] text-charcoal flex items-center justify-center hover:bg-cream hover:border-maroon hover:text-maroon transition-all"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 pb-2"
        >
          {stories.map((story, idx) => {
            const img = getArticleImage(story, { width: 600, height: 750, quality: 85 })
            return (
              <button
                key={story._id}
                onClick={() => open(idx)}
                className="group relative flex-shrink-0 w-[160px] md:w-[220px] aspect-[4/5] rounded-xl overflow-hidden snap-start bg-cream-dark text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                aria-label={`Open story: ${story.title}`}
              >
                <Image
                  src={img}
                  alt={story.heroImage?.alt || story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 160px, 220px"
                />

                {/* Top-right stack icon */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center">
                  <StoryStackIcon />
                </div>

                {/* Bottom gradient + text */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 pt-10">
                  <h3 className="font-noto text-white text-sm font-bold line-clamp-2 leading-snug">
                    {story.title}
                  </h3>
                  <p className="mt-1 font-source text-[11px] text-white/70">
                    {story.author?.name || 'News Potli'}
                    <span className="mx-1.5">•</span>
                    {timeAgo(story.publishedAt)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Fullscreen modal viewer */}
      {active && openIdx !== null && (
        <div
          className="fixed inset-0 z-[80] backdrop-blur-lg bg-black/80 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Web story viewer"
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close story"
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <CloseIcon />
          </button>

          {/* Prev */}
          {openIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              aria-label="Previous story"
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Next */}
          {openIdx < stories.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              aria-label="Next story"
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronRight />
            </button>
          )}

          {/* Card */}
          <div
            className="relative w-full max-w-[420px] max-h-[90vh] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-charcoal"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={getArticleImage(active, { width: 900, height: 1125, quality: 90 })}
              alt={active.heroImage?.alt || active.title}
              fill
              priority
              className="object-cover"
              sizes="420px"
            />

            {/* Progress bars */}
            <div className="absolute top-3 left-3 right-3 flex gap-1.5">
              {stories.map((_, i) => (
                <div key={i} className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all ${
                      i < openIdx ? 'w-full' : i === openIdx ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-6 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
              <h3 className="font-noto text-xl md:text-2xl font-bold leading-snug mb-2">
                {active.title}
              </h3>
              <p className="font-source text-xs text-white/75">
                {active.author?.name || 'News Potli'}
                <span className="mx-2">•</span>
                {timeAgo(active.publishedAt)}
              </p>
            </div>

            {/* Share */}
            <button
              onClick={(e) => { e.stopPropagation(); handleShare(active) }}
              aria-label="Share story"
              className="absolute top-12 right-3 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ShareIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
