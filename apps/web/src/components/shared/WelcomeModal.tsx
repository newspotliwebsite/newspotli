'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ── Config ──
// Replace with Arvind's actual welcome video ID when ready
const WELCOME_VIDEO_ID = 'RxW35JGfaXw'
const STORAGE_KEY = 'np_welcomed'
const SHOW_DELAY_MS = 3500
const WHATSAPP_INVITE = 'https://api.whatsapp.com/send?text=News%20Potli%20%E2%80%94%20%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%20%E0%A4%95%E0%A5%87%20%E0%A4%97%E0%A4%BE%E0%A4%81%E0%A4%B5%E0%A5%8B%E0%A4%82%20%E0%A4%95%E0%A5%80%20%E0%A4%86%E0%A4%B5%E0%A4%BE%E0%A4%9C%E0%A4%BC%20%0Ahttps%3A%2F%2Fnewspotli.com'

// ── Icons ──
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 drop-shadow-lg">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default function WelcomeModal() {
  const [show, setShow] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    // Only show on homepage, only for first-time visitors
    if (typeof window === 'undefined') return
    if (window.location.pathname !== '/') return
    if (localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setShow(false)
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
  }, [])

  const handlePlayVideo = useCallback(() => {
    setVideoPlaying(true)
    // Show CTA after estimated video viewing time (30s)
    setTimeout(() => setShowCta(true), 30000)
  }, [])

  const handleSkipToCta = useCallback(() => {
    setShowCta(true)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleDismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show, handleDismiss])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Modal — bottom sheet on mobile, centered on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="relative w-full md:max-w-lg mx-auto bg-white rounded-t-2xl md:rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-charcoal/60 hover:bg-charcoal/80 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            {/* ── Video Section ── */}
            <div className="relative aspect-video bg-charcoal flex-shrink-0">
              {!videoPlaying ? (
                // Thumbnail + play button (no iframe until tap — saves bandwidth on 3G)
                <button
                  onClick={handlePlayVideo}
                  className="w-full h-full relative group"
                  aria-label="Play welcome video"
                >
                  {/* YouTube thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${WELCOME_VIDEO_ID}/hqdefault.jpg`}
                    alt="News Potli Welcome"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold/90 group-hover:bg-gold flex items-center justify-center transition-all group-hover:scale-110 shadow-xl">
                      <PlayIcon />
                    </div>
                  </div>
                  {/* Bottom label */}
                  <div className="absolute bottom-3 left-4 right-12">
                    <p className="font-playfair text-white text-lg md:text-xl font-black italic leading-tight drop-shadow-lg">
                      अरविंद शुक्ला का संदेश
                    </p>
                    <p className="font-source text-cream/60 text-xs mt-0.5">Pulitzer Grantee · 18+ Years Journalism</p>
                  </div>
                </button>
              ) : (
                // Actual YouTube iframe (loaded only on play)
                <iframe
                  src={`https://www.youtube.com/embed/${WELCOME_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="News Potli Welcome"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* ── Content Section ── */}
            <div className="p-5 md:p-6 flex-shrink-0">
              {/* Welcome text */}
              <div className="mb-5">
                <p className="font-source text-[10px] font-black tracking-[0.2em] uppercase text-maroon mb-1">
                  Welcome to News Potli
                </p>
                <h2 className="font-playfair text-xl md:text-2xl font-black italic text-charcoal leading-tight">
                  भारत के गाँवों की <span className="text-maroon">असली खबरें</span>
                </h2>
                <p className="font-noto text-sm text-charcoal/60 mt-2 leading-relaxed">
                  मंडी भाव, मौसम, सरकारी योजना, और किसानों की कहानियाँ — बिना विज्ञापन, बिना पेवॉल।
                </p>
              </div>

              {/* CTA Buttons */}
              <AnimatePresence mode="wait">
                {!showCta ? (
                  <motion.button
                    key="skip"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleSkipToCta}
                    className="w-full text-center font-source text-xs text-charcoal/30 hover:text-charcoal/50 transition-colors py-2"
                  >
                    {videoPlaying ? 'वीडियो के बाद आगे बढ़ें →' : 'वीडियो बाद में देखें →'}
                  </motion.button>
                ) : (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {/* Primary: WhatsApp */}
                    <a
                      href={WHATSAPP_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleDismiss}
                      className="flex items-center justify-center gap-2.5 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-noto font-bold text-sm rounded-lg transition-colors"
                    >
                      <WhatsAppIcon />
                      WhatsApp पर जुड़ें
                    </a>

                    {/* Secondary: Newsletter */}
                    <a
                      href="/newsletter"
                      onClick={handleDismiss}
                      className="flex items-center justify-center gap-2.5 w-full py-3 border-2 border-maroon/15 hover:border-maroon/30 text-maroon font-noto font-bold text-sm rounded-lg transition-colors"
                    >
                      <MailIcon />
                      Newsletter सब्सक्राइब करें
                    </a>

                    {/* Dismiss */}
                    <button
                      onClick={handleDismiss}
                      className="w-full text-center font-source text-xs text-charcoal/30 hover:text-charcoal/50 transition-colors py-1"
                    >
                      बाद में · Skip
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom drag indicator (mobile) */}
            <div className="md:hidden flex justify-center pb-2">
              <div className="w-10 h-1 rounded-full bg-charcoal/10" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
