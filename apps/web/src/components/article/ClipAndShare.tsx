'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'

// ── Props ──
interface ClipAndShareProps {
  children: React.ReactNode
  articleTitle: string
  articleUrl: string
}

// ── SVG Icons ──
const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
  </svg>
)

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// Social icons for share modal
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0 12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

// ── Main Component ──
export default function ClipAndShare({ children, articleTitle, articleUrl }: ClipAndShareProps) {
  const [selectedText, setSelectedText] = useState('')
  const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 })
  const [showToolbar, setShowToolbar] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${articleUrl}`
    : `https://newspotli.com${articleUrl}`

  // ── Selection handler ──
  const handleSelection = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
      setShowToolbar(false)
      return
    }

    const text = selection.toString().trim()
    if (text.length < 10) {
      setShowToolbar(false)
      return
    }

    // Check selection is inside our wrapper
    const anchorNode = selection.anchorNode
    if (!anchorNode || !wrapperRef.current?.contains(anchorNode)) {
      setShowToolbar(false)
      return
    }

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    // Position toolbar above the selection, centered
    const wrapperRect = wrapperRef.current.getBoundingClientRect()
    const x = rect.left + rect.width / 2 - wrapperRect.left
    const y = rect.top - wrapperRect.top - 12

    setSelectedText(text)
    setToolbarPos({ x, y })
    setShowToolbar(true)
  }, [])

  // ── Event listeners ──
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const onMouseUp = () => setTimeout(handleSelection, 10)
    const onTouchEnd = () => setTimeout(handleSelection, 10)
    const onScroll = () => setShowToolbar(false)
    const onClickOutside = (e: MouseEvent) => {
      if (
        toolbarRef.current && !toolbarRef.current.contains(e.target as Node) &&
        !showShareModal
      ) {
        // Small delay to let button clicks register
        setTimeout(() => {
          const selection = window.getSelection()
          if (!selection || selection.isCollapsed) {
            setShowToolbar(false)
          }
        }, 100)
      }
    }

    wrapper.addEventListener('mouseup', onMouseUp)
    wrapper.addEventListener('touchend', onTouchEnd)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mousedown', onClickOutside)

    return () => {
      wrapper.removeEventListener('mouseup', onMouseUp)
      wrapper.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [handleSelection, showShareModal])

  // ── Actions ──
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedText)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = selectedText
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setShowToolbar(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
    window.getSelection()?.removeAllRanges()
  }

  const handleShareAsText = () => {
    setShowToolbar(false)
    setShowShareModal(true)
  }

  const handleShareAsImage = async () => {
    setShowToolbar(false)
    if (!cardRef.current) return

    // Make the card visible for rendering
    cardRef.current.style.display = 'block'

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FAF6EE',
        width: 600,
        height: cardRef.current.scrollHeight,
      })

      const link = document.createElement('a')
      link.download = `newspotli-clip-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Image generation failed:', err)
    } finally {
      if (cardRef.current) {
        cardRef.current.style.display = 'none'
      }
    }

    window.getSelection()?.removeAllRanges()
  }

  const closeShareModal = () => {
    setShowShareModal(false)
    window.getSelection()?.removeAllRanges()
  }

  // Truncate for share text
  const shareText = selectedText.length > 280
    ? selectedText.slice(0, 277) + '...'
    : selectedText

  const whatsappText = encodeURIComponent(`"${shareText}"\n\npूरा पढ़ें: ${fullUrl}\n— News Potli`)
  const twitterText = encodeURIComponent(`"${shareText}"`)
  const telegramText = encodeURIComponent(`"${shareText}"\n\n— News Potli`)

  return (
    <div ref={wrapperRef} className="relative">
      {children}

      {/* ── Floating Toolbar ── */}
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="absolute z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-150"
          style={{ left: toolbarPos.x, top: toolbarPos.y }}
        >
          <div className="flex items-center gap-0.5 bg-charcoal rounded-lg shadow-xl px-1 py-1">
            <button
              onClick={handleShareAsImage}
              className="flex items-center gap-1.5 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors text-xs font-source font-bold"
              title="Share as Image"
            >
              <ImageIcon />
              <span className="hidden sm:inline">Image</span>
            </button>

            <div className="w-px h-5 bg-white/15" />

            <button
              onClick={handleShareAsText}
              className="flex items-center gap-1.5 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors text-xs font-source font-bold"
              title="Share as Text"
            >
              <ShareIcon />
              <span className="hidden sm:inline">Share</span>
            </button>

            <div className="w-px h-5 bg-white/15" />

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors text-xs font-source font-bold"
              title="Copy"
            >
              <CopyIcon />
              <span className="hidden sm:inline">Copy</span>
            </button>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-charcoal rotate-45 -translate-y-1.5" />
          </div>
        </div>
      )}

      {/* ── Share as Text Modal ── */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={closeShareModal}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-maroon via-gold to-green" />

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-source text-[10px] font-black tracking-[0.2em] uppercase text-maroon">
                    Clip &amp; Share
                  </p>
                  <p className="font-playfair text-lg font-black italic text-charcoal mt-0.5">
                    चयनित पाठ शेयर करें
                  </p>
                </div>
                <button
                  onClick={closeShareModal}
                  className="text-charcoal/30 hover:text-charcoal transition-colors p-1"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Quote Card */}
              <div className="bg-cream border border-charcoal/8 p-5 mb-6 relative">
                <div className="absolute -top-3 left-5 text-gold/40 font-playfair text-5xl font-black leading-none select-none">
                  &ldquo;
                </div>
                <p className="font-noto text-base text-charcoal/80 leading-relaxed pt-3">
                  {selectedText}
                </p>
                <p className="font-source text-xs text-charcoal/40 mt-4">
                  — {articleTitle}
                </p>
              </div>

              {/* Share Buttons */}
              <p className="font-source text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-3">
                Share via
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={`https://api.whatsapp.com/send?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-sm font-source text-sm font-bold transition-colors"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-sm font-source text-sm font-bold transition-colors"
                >
                  <TwitterIcon />
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-sm font-source text-sm font-bold transition-colors"
                >
                  <FacebookIcon />
                  Facebook
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${telegramText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-sm font-source text-sm font-bold transition-colors"
                >
                  <TelegramIcon />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Branded Image Card (hidden, rendered by html2canvas) ── */}
      <div
        ref={cardRef}
        className="fixed -left-[9999px] -top-[9999px]"
        style={{ display: 'none', width: 600 }}
      >
        <div style={{ width: 600, backgroundColor: '#FAF6EE', padding: 48, fontFamily: 'sans-serif' }}>
          {/* Logo bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 16, borderBottom: '2px solid #8B1A1A' }}>
            <div style={{ fontSize: 28, fontWeight: 900, fontStyle: 'italic', color: '#8B1A1A', fontFamily: 'serif' }}>
              News Potli<span style={{ color: '#C8860A' }}>.</span>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#8B1A1A', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
              Clip &amp; Share
            </div>
          </div>

          {/* Quote */}
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <div style={{ fontSize: 64, color: 'rgba(200,134,10,0.25)', fontWeight: 900, fontFamily: 'serif', lineHeight: 1, position: 'absolute', top: -20, left: -8 }}>
              &ldquo;
            </div>
            <p style={{ fontSize: 20, lineHeight: 1.7, color: '#1A1A1A', paddingTop: 24, paddingLeft: 4, paddingRight: 4 }}>
              {selectedText}
            </p>
          </div>

          {/* Article reference */}
          <p style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)', marginBottom: 24 }}>
            — {articleTitle}
          </p>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(26,26,26,0.1)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#8B1A1A' }}>
              newspotli.com
            </span>
            <span style={{ fontSize: 10, color: 'rgba(26,26,26,0.35)' }}>
              India&apos;s #1 Rural Journalism Platform
            </span>
          </div>
        </div>
      </div>

      {/* ── Copy Toast ── */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 bg-charcoal text-white px-5 py-3 rounded-lg shadow-xl font-source text-sm font-bold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </div>
        </div>
      )}
    </div>
  )
}
