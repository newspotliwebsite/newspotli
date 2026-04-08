'use client'

import { useState } from 'react'

export default function NewsletterStrip() {
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
    <section className="bg-maroon text-cream py-5">
      <div className="max-w-site mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-5">
        <span className="font-noto text-lg font-bold text-center md:text-left">
          किसानों की आवाज़, हर महीने आपके inbox में
        </span>
        <form onSubmit={handleSubmit} className="flex gap-2.5 w-full md:w-auto">
          <input
            type="email"
            placeholder="अपना ईमेल दर्ज करें"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="bg-white rounded px-5 py-2.5 text-charcoal text-sm font-source w-full md:w-[300px] outline-none placeholder:text-charcoal/40"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`rounded px-6 py-2.5 font-source font-semibold text-sm whitespace-nowrap transition-all duration-200
              ${status === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-gold text-white hover:bg-[#b07509] hover:-translate-y-0.5'}
            `}
          >
            {status === 'loading' ? '...' : status === 'success' ? 'Done!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}
