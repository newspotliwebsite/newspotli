'use client'

import Link from 'next/link'
import { useState } from 'react'

const PLATFORM_LINKS = [
  { title: 'About Us', href: '/about' },
  { title: 'Our Team', href: '/team' },
  { title: 'Pitch Your Story', href: '/contact' },
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms of Service', href: '/terms' },
]

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

export default function Footer() {
  const [form, setForm] = useState({ name: '', number: '', email: '', question: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', number: '', email: '', question: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-source placeholder:text-white/40 outline-none focus:border-gold transition-colors'

  return (
    <footer className="bg-charcoal text-white pt-20 pb-5 px-5">
      <div className="max-w-site mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-2.5">
              <h2 className="font-noto text-[28px] font-bold text-white">
                न्यूज़ पोटली
              </h2>
            </Link>
            <p className="font-source text-sm text-white/50 mb-8">
              भारत के गाँव और किसान की आवाज़
            </p>
            <div className="flex gap-4">
              {[
                { icon: <YouTubeIcon />, href: 'https://youtube.com/@newspotli', label: 'YouTube' },
                { icon: <InstagramIcon />, href: 'https://instagram.com/newspotli', label: 'Instagram' },
                { icon: <XIcon />, href: 'https://twitter.com/newspotli', label: 'X' },
                { icon: <FacebookIcon />, href: 'https://facebook.com/newspotli', label: 'Facebook' },
                { icon: <SpotifyIcon />, href: '#', label: 'Spotify' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="font-source text-sm uppercase tracking-[2px] text-gold mb-6">
              Platform
            </h4>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-source text-sm text-white/70 hover:text-gold hover:underline transition-colors"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-source text-sm uppercase tracking-[2px] text-gold mb-6">
              Contact Us
            </h4>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="नाम"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className={inputClass}
                required
              />
              <input
                type="tel"
                placeholder="संपर्क नंबर"
                value={form.number}
                onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="ईमेल"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className={inputClass}
                required
              />
              <textarea
                placeholder="आपका सवाल"
                value={form.question}
                onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                rows={4}
                className={`${inputClass} resize-none min-h-[96px]`}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full rounded-lg py-3 font-source font-bold text-sm mt-2 transition-all
                  ${status === 'success'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gold text-charcoal hover:opacity-90'}
                `}
              >
                {status === 'loading' ? '...' : status === 'success' ? 'भेज दिया!' : 'भेजें'}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-xs font-source">कुछ गड़बड़ हुई, फिर कोशिश करें।</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 text-center">
          <p className="font-source text-xs text-cream/40">
            © 2026 News Potli. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
