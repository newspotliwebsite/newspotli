'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const PLATFORM_LINKS = [
  { title: 'About Us', href: '/about' },
  { title: 'Our Team', href: '/team' },
  { title: 'Pitch Your Story', href: '/contact' },
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms of Service', href: '/terms' },
]

// SVG Social Icons
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

const SOCIALS = [
  { label: 'YouTube', href: 'https://youtube.com/@newspotli', icon: <YouTubeIcon />, hoverColor: 'hover:bg-red-600' },
  { label: 'Instagram', href: 'https://instagram.com/newspotli', icon: <InstagramIcon />, hoverColor: 'hover:bg-pink-600' },
  { label: 'X / Twitter', href: 'https://twitter.com/newspotli', icon: <XIcon />, hoverColor: 'hover:bg-neutral-800' },
  { label: 'Facebook', href: 'https://facebook.com/newspotli', icon: <FacebookIcon />, hoverColor: 'hover:bg-blue-700' },
]

export default function Footer() {
  const [contactForm, setContactForm] = useState({ name: '', number: '', email: '', question: '' })
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })
      if (!res.ok) throw new Error('Failed')
      setContactStatus('success')
      setContactForm({ name: '', number: '', email: '', question: '' })
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <footer className="bg-[#111111] text-cream pt-16 pb-8 px-4 md:px-10 lg:px-20 relative overflow-hidden">
      {/* Top gold accent */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-maroon via-gold to-maroon" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Left: Logo + Tagline + Social Icons */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <Image
                src="/images/logos/logo-hindi.png"
                alt="News Potli"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-gold transition-colors"
              />
              <span className="font-playfair text-2xl font-black tracking-tight text-white group-hover:text-gold transition-colors">
                News Potli<span className="text-gold group-hover:text-white">.</span>
              </span>
            </Link>
            <p className="font-noto text-cream/70 text-sm mb-6 leading-relaxed">
              भारत के गाँवों और किसानों की आवाज़। ग्रामीण भारत की हर उस खबर का पता, जो आपके लिए जानना ज़रूरी है।
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-10 h-10 bg-white/8 border border-white/10 flex items-center justify-center text-cream/70 hover:text-white ${s.hoverColor} hover:border-transparent transition-all duration-200 rounded-sm`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Middle: Platform Links */}
          <div>
            <h3 className="font-source text-[11px] font-black tracking-[0.18em] uppercase text-gold mb-5 pb-3 border-b border-gold/25">
              Platform
            </h3>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-source text-cream/65 hover:text-gold transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-white/20 rounded-full flex-shrink-0 group-hover:bg-gold transition-colors" />
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact Us Form */}
          <div>
            <h3 className="font-source text-[11px] font-black tracking-[0.18em] uppercase text-maroon mb-5 pb-3 border-b border-maroon/30">
              Contact Us
            </h3>
            <form className="space-y-3" onSubmit={handleContactSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-white/8 border border-white/12 focus:border-gold rounded-sm px-4 py-2.5 text-cream text-sm placeholder-cream/30 font-source outline-none transition-all"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={contactForm.number}
                onChange={(e) => setContactForm((p) => ({ ...p, number: e.target.value }))}
                className="w-full bg-white/8 border border-white/12 focus:border-gold rounded-sm px-4 py-2.5 text-cream text-sm placeholder-cream/30 font-source outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-white/8 border border-white/12 focus:border-gold rounded-sm px-4 py-2.5 text-cream text-sm placeholder-cream/30 font-source outline-none transition-all"
                required
              />
              <textarea
                placeholder="Your Question"
                value={contactForm.question}
                onChange={(e) => setContactForm((p) => ({ ...p, question: e.target.value }))}
                rows={3}
                className="w-full bg-white/8 border border-white/12 focus:border-gold rounded-sm px-4 py-2.5 text-cream text-sm placeholder-cream/30 font-source outline-none transition-all resize-none"
                required
              />
              <button
                type="submit"
                disabled={contactStatus === 'loading' || contactStatus === 'success'}
                className={`w-full font-source font-bold py-2.5 text-sm rounded-sm transition-all
                  ${contactStatus === 'success'
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-gold hover:bg-gold-light text-white hover:-translate-y-0.5'}
                `}
              >
                {contactStatus === 'loading' ? '...' : contactStatus === 'success' ? 'Sent!' : 'Send Message'}
              </button>
              {contactStatus === 'error' && (
                <p className="text-red-300 text-xs font-source">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-source text-cream/40 text-xs">
            © 2026 News Potli. All rights reserved. Powered by{' '}
            <a href="https://buildrocketlabs.com" className="text-gold hover:text-gold-light transition-colors font-bold">
              BuildRocket Labs
            </a>
          </p>
          <div className="flex items-center gap-3 text-cream/30 font-source text-xs">
            <span>Supported by Pulitzer Center</span>
            <span className="text-white/15">·</span>
            <span>SEBI Registered</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
