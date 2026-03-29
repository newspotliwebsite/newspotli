'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

// ── Types ──
interface PortableTextBlock {
  _type: string
  _key?: string
  children?: { _type: string; text?: string }[]
}

interface ArticleAudioPlayerProps {
  body: PortableTextBlock[]
}

type PlayState = 'idle' | 'playing' | 'paused'
const SPEEDS = [0.75, 1, 1.25, 1.5] as const

// ── SVG Icons ──
const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Helpers ──
function extractParagraphs(body: PortableTextBlock[]): string[] {
  if (!body) return []
  return body
    .filter((block) => block._type === 'block' && block.children)
    .map((block) =>
      (block.children || [])
        .filter((child) => child._type === 'span' && child.text)
        .map((child) => child.text)
        .join('')
    )
    .filter((text) => text.trim().length > 0)
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Estimate reading duration (Hindi ~130 words/minute at 1x)
function estimateDuration(paragraphs: string[], speed: number): number {
  const totalChars = paragraphs.reduce((sum, p) => sum + p.length, 0)
  // Rough estimate: ~5 chars per word for Hindi, ~130 wpm base
  const words = totalChars / 5
  return (words / 130) * 60 / speed
}

// ── Component ──
export default function ArticleAudioPlayer({ body }: ArticleAudioPlayerProps) {
  const [playState, setPlayState] = useState<PlayState>('idle')
  const [speed, setSpeed] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)
  const [supported, setSupported] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const synthRef = useRef<SpeechSynthesis | null>(null)
  const currentIndexRef = useRef(0)
  const speedRef = useRef(1)
  const startTimeRef = useRef(0)
  const elapsedBeforePauseRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const paragraphs = useMemo(() => extractParagraphs(body), [body])
  const totalDuration = useMemo(() => estimateDuration(paragraphs, speed), [paragraphs, speed])

  // Check support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
      setSupported(true)
    }
  }, [])

  // Elapsed time ticker
  useEffect(() => {
    if (playState === 'playing') {
      startTimeRef.current = Date.now()
      timerRef.current = setInterval(() => {
        const delta = (Date.now() - startTimeRef.current) / 1000
        setElapsed(elapsedBeforePauseRef.current + delta)
      }, 250)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      if (playState === 'paused') {
        elapsedBeforePauseRef.current = elapsed
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playState])

  // Highlight current paragraph in DOM
  useEffect(() => {
    const container = document.querySelector('[data-article-body]')
    if (!container) return

    // Get all block-level text elements rendered by PortableText
    const elements = container.querySelectorAll(':scope > p, :scope > h2, :scope > h3, :scope > h4, :scope > blockquote, :scope > ul, :scope > ol, :scope > div > p')

    // Map paragraphs to DOM elements - filter to only real text blocks
    const textElements = Array.from(elements).filter(
      (el) => el.textContent && el.textContent.trim().length > 0
    )

    // Remove all highlights
    textElements.forEach((el) => el.classList.remove('audio-highlight'))

    // Add highlight to current
    if (showPlayer && playState !== 'idle' && textElements[currentIndex]) {
      textElements[currentIndex].classList.add('audio-highlight')
      // Scroll into view if not visible
      if (playState === 'playing') {
        textElements[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    return () => {
      textElements.forEach((el) => el.classList.remove('audio-highlight'))
    }
  }, [currentIndex, showPlayer, playState])

  // ── Speech controls ──
  const speakParagraph = useCallback((index: number) => {
    const synth = synthRef.current
    if (!synth || index >= paragraphs.length) {
      // Done reading
      setPlayState('idle')
      setCurrentIndex(0)
      currentIndexRef.current = 0
      setElapsed(0)
      elapsedBeforePauseRef.current = 0
      return
    }

    const utterance = new SpeechSynthesisUtterance(paragraphs[index])
    utterance.lang = 'hi-IN'
    utterance.rate = speedRef.current

    utterance.onend = () => {
      const nextIndex = currentIndexRef.current + 1
      currentIndexRef.current = nextIndex
      setCurrentIndex(nextIndex)
      speakParagraph(nextIndex)
    }

    utterance.onerror = (e) => {
      // 'interrupted' and 'canceled' are expected when we cancel manually
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.error('Speech error:', e.error)
        const nextIndex = currentIndexRef.current + 1
        currentIndexRef.current = nextIndex
        setCurrentIndex(nextIndex)
        speakParagraph(nextIndex)
      }
    }

    synth.speak(utterance)
  }, [paragraphs])

  const handlePlay = useCallback(() => {
    const synth = synthRef.current
    if (!synth) return

    if (playState === 'paused') {
      synth.resume()
      setPlayState('playing')
      return
    }

    // Start fresh
    synth.cancel()
    currentIndexRef.current = 0
    setCurrentIndex(0)
    setElapsed(0)
    elapsedBeforePauseRef.current = 0
    setShowPlayer(true)
    setPlayState('playing')
    speakParagraph(0)
  }, [playState, speakParagraph])

  const handlePause = useCallback(() => {
    const synth = synthRef.current
    if (!synth) return
    synth.pause()
    setPlayState('paused')
  }, [])

  const handleToggle = useCallback(() => {
    if (playState === 'playing') handlePause()
    else handlePlay()
  }, [playState, handlePause, handlePlay])

  const handleClose = useCallback(() => {
    const synth = synthRef.current
    if (synth) synth.cancel()
    setPlayState('idle')
    setShowPlayer(false)
    setCurrentIndex(0)
    currentIndexRef.current = 0
    setElapsed(0)
    elapsedBeforePauseRef.current = 0
  }, [])

  const handleSpeedChange = useCallback(() => {
    const currentSpeedIdx = SPEEDS.indexOf(speed as typeof SPEEDS[number])
    const nextSpeed = SPEEDS[(currentSpeedIdx + 1) % SPEEDS.length]
    setSpeed(nextSpeed)
    speedRef.current = nextSpeed

    // If currently playing, restart current paragraph with new speed
    const synth = synthRef.current
    if (synth && playState === 'playing') {
      synth.cancel()
      elapsedBeforePauseRef.current = elapsed
      speakParagraph(currentIndexRef.current)
    }
  }, [speed, playState, elapsed, speakParagraph])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const targetIndex = Math.floor(ratio * paragraphs.length)

    const synth = synthRef.current
    if (synth) synth.cancel()

    currentIndexRef.current = targetIndex
    setCurrentIndex(targetIndex)

    // Estimate elapsed time for the new position
    const charsBefore = paragraphs.slice(0, targetIndex).reduce((s, p) => s + p.length, 0)
    const totalChars = paragraphs.reduce((s, p) => s + p.length, 0)
    const newElapsed = totalChars > 0 ? (charsBefore / totalChars) * totalDuration : 0
    setElapsed(newElapsed)
    elapsedBeforePauseRef.current = newElapsed

    if (playState === 'playing' || playState === 'paused') {
      setPlayState('playing')
      speakParagraph(targetIndex)
    }
  }, [paragraphs, totalDuration, playState, speakParagraph])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      synthRef.current?.cancel()
    }
  }, [])

  if (!supported || paragraphs.length === 0) return null

  const progress = paragraphs.length > 0 ? currentIndex / paragraphs.length : 0

  return (
    <>
      {/* ── Listen Button (inline, below title) ── */}
      {!showPlayer && (
        <button
          onClick={handlePlay}
          className="inline-flex items-center gap-2 px-4 py-2 bg-maroon/8 hover:bg-maroon/15 text-maroon rounded-full font-source text-sm font-bold transition-all hover:-translate-y-0.5 group"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-maroon text-white group-hover:scale-110 transition-transform">
            <SpeakerIcon />
          </span>
          सुनें
          <span className="text-charcoal/30 font-normal">·</span>
          <span className="text-charcoal/40 font-normal">{formatTime(totalDuration)}</span>
        </button>
      )}

      {/* ── Sticky Mini Player ── */}
      {showPlayer && (
        <div className="fixed bottom-0 inset-x-0 z-[90] animate-in slide-in-from-bottom duration-300">
          {/* Progress bar (clickable) */}
          <div
            className="h-1 bg-charcoal/10 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-gold transition-all duration-300 relative"
              style={{ width: `${progress * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls */}
          <div className="bg-charcoal/95 backdrop-blur-md px-4 md:px-6 py-3">
            <div className="max-w-3xl mx-auto flex items-center gap-3 md:gap-4">

              {/* Play / Pause */}
              <button
                onClick={handleToggle}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-maroon hover:bg-maroon-light text-white flex items-center justify-center transition-colors"
                aria-label={playState === 'playing' ? 'Pause' : 'Play'}
              >
                {playState === 'playing' ? <PauseIcon /> : <PlayIcon />}
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-source text-xs text-white/50 truncate">
                  {playState === 'playing' ? 'सुन रहे हैं...' : playState === 'paused' ? 'रुका हुआ' : 'तैयार'}
                </p>
                <p className="font-source text-xs text-white/30 mt-0.5">
                  {formatTime(elapsed)}
                  <span className="text-white/15 mx-1">/</span>
                  {formatTime(totalDuration)}
                  <span className="text-white/15 mx-1.5">·</span>
                  {currentIndex + 1}/{paragraphs.length} अनुच्छेद
                </p>
              </div>

              {/* Speed */}
              <button
                onClick={handleSpeedChange}
                className="flex-shrink-0 px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white/70 hover:text-white font-source text-xs font-bold transition-colors"
                aria-label="Change speed"
              >
                {speed}x
              </button>

              {/* Close */}
              <button
                onClick={handleClose}
                className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-white/10 text-white/40 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close player"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
