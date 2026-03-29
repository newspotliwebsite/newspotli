'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  VIEWPORT_ONCE,
} from '@/lib/motion'
import type { YouTubeVideo } from '@/lib/youtube'

// ── Helpers ───────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long' })
}

// ── SVG Icons ─────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 drop-shadow-lg"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="w-6 h-6"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ── Video Card ────────────────────────────────────────────────────

function VideoCard({
  video,
  onPlay,
}: {
  video: YouTubeVideo
  onPlay: (video: YouTubeVideo) => void
}) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white border border-charcoal/8 rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onPlay(video)}
        className="relative aspect-video w-full overflow-hidden bg-charcoal/10 cursor-pointer block"
        aria-label={`Play: ${video.title}`}
      >
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark overlay + play button */}
        <span className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors flex items-center justify-center">
          <span className="w-14 h-14 bg-maroon/90 group-hover:bg-maroon rounded-full flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all pl-1">
            <PlayIcon />
          </span>
        </span>
      </button>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-noto font-bold text-[15px] text-charcoal leading-[1.55] line-clamp-2 mb-3 group-hover:text-maroon transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-source text-xs text-charcoal/40">
            {formatDate(video.publishedAt)}
          </span>
          {video.viewCount && (
            <span className="font-source text-xs font-bold text-charcoal/55">
              {video.viewCount} views
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ── YouTube Embed Modal ───────────────────────────────────────────

function VideoModal({
  video,
  onClose,
}: {
  video: YouTubeVideo
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 sm:top-2 sm:right-2 text-white hover:text-gold transition-colors bg-charcoal/60 hover:bg-charcoal/80 rounded-full p-1.5 z-10"
          aria-label="Close video"
        >
          <CloseIcon />
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Empty State ───────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-charcoal/5 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-8 h-8 text-charcoal/25"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <p className="font-noto text-charcoal/40 text-lg mb-2">
        अभी कोई वीडियो उपलब्ध नहीं है।
      </p>
      <p className="font-source text-charcoal/30 text-sm">
        कृपया हमारे YouTube चैनल पर जाएँ।
      </p>
      <a
        href="https://youtube.com/@newspotli"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-6 bg-maroon hover:bg-maroon-dark text-white font-source font-bold px-6 py-3 rounded-sm transition-colors"
      >
        <YouTubeIcon /> YouTube पर देखें
      </a>
    </div>
  )
}

// ── Main Grid Component ───────────────────────────────────────────

export default function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null)

  const handlePlay = useCallback((video: YouTubeVideo) => {
    setActiveVideo(video)
  }, [])

  const handleClose = useCallback(() => {
    setActiveVideo(null)
  }, [])

  return (
    <>
      {/* Hero Strip */}
      <section className="bg-gradient-to-r from-charcoal via-[#1a0505] to-maroon-dark py-12 md:py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-3">
              Video Library
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-black italic text-white leading-tight">
              वीडियो<span className="text-gold">.</span>
            </h1>
            <p className="font-noto text-white/55 mt-2 text-base">
              ग्रामीण भारत की सच्ची कहानियाँ -- वीडियो में।
            </p>
          </motion.div>

          {/* YouTube Subscriber Badge */}
          <motion.a
            href="https://youtube.com/@newspotli"
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="flex items-center gap-4 bg-white/8 border border-white/12 hover:border-gold/40 rounded-sm px-6 py-4 transition-all group self-start md:self-center"
          >
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <YouTubeIcon />
            </div>
            <div>
              <p className="font-playfair text-2xl font-black italic text-white">
                266K+
              </p>
              <p className="font-source text-[10px] font-black tracking-widest uppercase text-white/40">
                Subscribers on YouTube
              </p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 text-white/30 group-hover:text-gold transition-colors ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="py-10 md:py-14 px-4 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Result count + YouTube link */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-source text-sm text-charcoal/45">
              <span className="font-bold text-charcoal">{videos.length}</span>{' '}
              वीडियो
            </p>
            <a
              href="https://youtube.com/@newspotli"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 font-source text-xs font-bold text-maroon hover:text-gold transition-colors"
            >
              <YouTubeIcon /> View on YouTube
            </a>
          </div>

          {videos.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={handlePlay}
                />
              ))}
            </motion.div>
          )}

          {/* CTA to YouTube */}
          {videos.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={fadeInUp}
              className="text-center mt-10"
            >
              <Link
                href="https://youtube.com/@newspotli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-black px-8 py-3.5 rounded-sm transition-all hover:-translate-y-0.5"
              >
                <YouTubeIcon /> और वीडियो देखें -- YouTube पर
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Embed Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  )
}
