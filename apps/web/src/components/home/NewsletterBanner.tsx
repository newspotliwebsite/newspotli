'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-maroon py-8 md:py-10 px-4 md:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-playfair text-2xl md:text-3xl font-black text-white leading-tight mb-1">
            किसानों की आवाज़, सीधे आपके <span className="text-gold">inbox</span> में
          </h2>
          <p className="font-noto text-cream/70 text-sm">
            हर सुबह — खेती, मौसम, मंडी और सरकारी योजनाएं।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
          <input
            type="email"
            placeholder="आपका ईमेल पता..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="bg-white/10 border border-white/20 focus:border-gold focus:bg-white/15 rounded-sm px-5 py-3 text-white placeholder-white/40 font-noto text-sm outline-none transition-all min-w-[240px]"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`font-noto font-bold py-3 px-6 rounded-sm transition-all text-sm whitespace-nowrap
              ${status === 'success'
                ? 'bg-emerald-500 text-white cursor-default'
                : 'bg-gold hover:bg-gold-light text-white hover:-translate-y-0.5'}
            `}
          >
            {status === 'loading' ? '...' : status === 'success' ? 'सब्सक्राइब्ड!' : 'Subscribe करें'}
          </button>
        </form>

        {status === 'error' && (
          <p className="text-red-300 text-sm font-source">दोबारा कोशिश करें।</p>
        )}
      </div>
    </section>
  )
}
