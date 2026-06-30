'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
  </svg>
)

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', number: '', question: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: 'Contact Us Page' }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', email: '', number: '', question: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white border border-[#e8e0d0] rounded-lg px-4 py-3 text-charcoal text-sm font-source placeholder:text-charcoal/40 outline-none focus:border-gold transition-colors'

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="bg-cream border-b border-[#e8e0d0] py-16 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-noto text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              संपर्क करें
            </h1>
            <p className="font-source text-sm md:text-base uppercase tracking-[0.12em] text-charcoal/50 mt-3">
              Contact Us
            </p>
            <p className="font-noto text-charcoal/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6">
              कोई सवाल, सुझाव या प्रतिक्रिया? नीचे दिए फ़ॉर्म से हमें लिखें या सीधे ईमेल करें — हम जल्द जवाब देंगे।
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left — Contact info */}
            <div>
              <h2 className="font-noto text-2xl font-bold text-charcoal mb-6">
                सीधे संपर्क
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                    <MailIcon />
                  </span>
                  <div>
                    <p className="font-source text-xs uppercase tracking-wider text-charcoal/50">Email</p>
                    <a
                      href="mailto:newspotlioffice@gmail.com"
                      className="font-source text-base font-bold text-charcoal hover:text-maroon transition-colors break-all"
                    >
                      newspotlioffice@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                    <PinIcon />
                  </span>
                  <div>
                    <p className="font-source text-xs uppercase tracking-wider text-charcoal/50">कार्यालय</p>
                    <p className="font-noto text-base font-bold text-charcoal">
                      Lucknow, Uttar Pradesh, India
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right — Form */}
            <div className="bg-white border border-[#e8e0d0] rounded-xl shadow-sm p-6 md:p-8">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="नाम / Name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={inputClass}
                  required
                />
                <input
                  type="email"
                  placeholder="ईमेल / Email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={inputClass}
                  required
                />
                <input
                  type="tel"
                  placeholder="फ़ोन / Phone"
                  value={form.number}
                  onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))}
                  className={inputClass}
                />
                <textarea
                  placeholder="आपका संदेश / Message"
                  value={form.question}
                  onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                  rows={5}
                  className={`${inputClass} resize-none min-h-[120px]`}
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full rounded-lg py-3 font-source font-bold text-sm transition-all
                    ${status === 'success'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-maroon text-white hover:bg-maroon-dark'}
                  `}
                >
                  {status === 'loading' ? '...' : status === 'success' ? 'भेज दिया!' : 'भेजें / Send'}
                </button>
                {status === 'success' && (
                  <p className="text-emerald-600 text-sm font-source font-bold">धन्यवाद! हम जल्द संपर्क करेंगे।</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-xs font-source">कुछ गड़बड़ हुई, फिर कोशिश करें।</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
