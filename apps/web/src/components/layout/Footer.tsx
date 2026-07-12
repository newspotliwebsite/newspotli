'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const PLATFORM_LINKS = [
  { title: 'About Us', href: '/about' },
  { title: 'Our Team', href: '/team' },
  { title: 'Pitch Your Story', href: '/contact' },
  { title: 'Contact Us', href: '/contact-us' },
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

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        setStatus('success')
        formEl.reset()
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        console.error('Web3Forms error:', result)
        setStatus('error')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-source placeholder:text-white/40 outline-none focus:border-gold transition-colors'

  return (
    <footer className="bg-charcoal text-white pt-20 pb-6 px-5 relative overflow-hidden">
      <div className="max-w-site mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">

          {/* Column 1: Brand + NP Logo */}
          <div>
            {/* Logo + Brand row: logo and Hindi title vertically aligned */}
            <Link href="/" className="flex items-center gap-4 mb-3 group">
              <Image
                src="/images/logos/logo-hindi.webp"
                alt="News Potli"
                width={80}
                height={80}
                className="w-14 h-14 rounded-full border-2 border-white/10 group-hover:border-gold transition-colors flex-shrink-0"
                style={{ animation: 'footerLogoTilt 4s ease-in-out infinite' }}
              />
              <h2 className="font-noto text-[26px] font-bold text-white leading-none">
                न्यूज़ पोटली
              </h2>
            </Link>
            <p className="font-source text-sm text-white/50 mb-8">
              भारत के गाँव और किसान की आवाज़
            </p>
            <div className="flex gap-4">
              {[
                { icon: <YouTubeIcon />, href: 'https://www.youtube.com/@newspotli', label: 'YouTube' },
                { icon: <InstagramIcon />, href: 'https://www.instagram.com/newspotli/', label: 'Instagram' },
                { icon: <XIcon />, href: 'https://x.com/PotliNews', label: 'X' },
                { icon: <FacebookIcon />, href: 'https://www.facebook.com/Potlinews/', label: 'Facebook' },
                { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/potlinews/', label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
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
                    className="font-source text-sm text-white/70 hover:text-gold hover:translate-x-1 inline-block transition-all duration-200"
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
              <input type="hidden" name="access_key" value="2ffed434-a555-4b06-b5c9-184f4f2150f2" />
              <input type="hidden" name="subject" value="News Potli — Footer Contact Form" />
              <input type="hidden" name="from_name" value="News Potli Website" />
              <input
                type="text"
                name="name"
                placeholder="नाम"
                className={inputClass}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="संपर्क नंबर"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="ईमेल"
                className={inputClass}
                required
              />
              <textarea
                name="message"
                placeholder="आपका संदेश"
                rows={4}
                className={`${inputClass} resize-none min-h-[96px]`}
                required
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full rounded-lg py-3 font-source font-bold text-sm mt-2 transition-all
                  ${status === 'success'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gold text-charcoal hover:opacity-90'}
                `}
              >
                {status === 'sending' ? 'भेज रहे हैं...' : status === 'success' ? 'भेज दिया!' : 'भेजें'}
              </button>
              {status === 'success' && (
                <p className="text-emerald-400 text-sm font-source font-bold">✓ धन्यवाद! हम जल्द संपर्क करेंगे।</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs font-source">कुछ गड़बड़ हुई, फिर कोशिश करें।</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-source text-xs text-cream/40">
            © 2026 News Potli. All rights reserved.
          </p>
          <a
            href="https://buildrocketlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-cream/40 hover:text-gold transition-colors duration-300"
          >
            <span className="font-source text-xs">Crafted by</span>
            <Image
              src="/images/logos/buildrocket.png"
              alt="BuildRocket Labs"
              width={24}
              height={24}
              className="w-5 h-5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="font-source text-xs font-bold group-hover:text-gold transition-colors">
              BuildRocket Labs
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
