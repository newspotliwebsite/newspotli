'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ── Partner logos (text pills per DESIGN_SYSTEM.md Partner Display Priority) ────
const PARTNERS = [
  { name: 'World Bank', category: 'Development Finance' },
  { name: 'BCG', category: 'Global Consulting' },
  { name: 'Jain Irrigation', category: 'AgriTech' },
  { name: 'Escorts Kubota', category: 'Farm Machinery' },
  { name: '2030 Water Resources Group', category: 'Water Security' },
  { name: 'SESI', category: 'Rural Education' },
  { name: 'Amal Farms', category: 'Organic Agriculture' },
  { name: 'Vikas Samvad', category: 'Rural Development' },
]

const STATS = [
  { value: '50,000+', label: 'Newsletter Readers', sub: 'Direct inbox reach weekly', icon: '📧' },
  { value: '73M+', label: 'YouTube Views', sub: 'High-retention rural audience', icon: '▶' },
  { value: '2,66,000+', label: 'Subscribers', sub: 'Most trusted rural journalism channel', icon: '★' },
  { value: '82%', label: 'Rural Demographics', sub: 'Primary farmers & agri-workers', icon: '🌾' },
]

const AD_TIERS = [
  {
    tier: 'Bronze',
    hindi: 'कांस्य',
    color: '#CD7F32',
    bg: 'from-[#3d2000] to-[#2a1600]',
    features: [
      'Newsletter banner ad (1 issue)',
      'Website sidebar placement',
      'Category page mention',
      '1 week campaign duration',
      'Basic analytics report',
    ],
  },
  {
    tier: 'Silver',
    hindi: 'रजत',
    color: '#C8860A',
    bg: 'from-maroon-dark to-[#3a0a0a]',
    featured: true,
    features: [
      'Newsletter feature article (2 issues)',
      'YouTube mid-roll mention',
      'Homepage banner placement',
      'Social media story posts',
      '1 month campaign duration',
      'Detailed analytics + audience report',
      'Dedicated account manager',
    ],
  },
  {
    tier: 'Gold',
    hindi: 'स्वर्ण',
    color: '#E8A020',
    bg: 'from-charcoal to-[#111111]',
    features: [
      'Branded content series (4 episodes)',
      'Sponsored YouTube video',
      'Newsletter full-page feature',
      'All placement types included',
      'Custom campaign strategy',
      '3 month partnership duration',
      'Full analytics + ROI dashboard',
      'Priority support & review',
    ],
  },
]

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0 text-gold">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

// Contact form — needs 'use client', so embedded inline
function PartnerContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green/10 border border-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon />
        </div>
        <h3 className="font-playfair text-2xl font-black italic text-white mb-2">Message Sent!</h3>
        <p className="font-noto text-white/60">Our partnerships team will reach out within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-source text-[11px] font-black tracking-wider text-white/40 uppercase block mb-1.5">Name *</label>
          <input required type="text" placeholder="Your full name"
            className="w-full bg-white/5 border border-white/10 focus:border-gold text-white placeholder:text-white/25 font-source px-4 py-3 rounded-sm outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="font-source text-[11px] font-black tracking-wider text-white/40 uppercase block mb-1.5">Organisation *</label>
          <input required type="text" placeholder="Company / NGO name"
            className="w-full bg-white/5 border border-white/10 focus:border-gold text-white placeholder:text-white/25 font-source px-4 py-3 rounded-sm outline-none transition-all text-sm" />
        </div>
      </div>
      <div>
        <label className="font-source text-[11px] font-black tracking-wider text-white/40 uppercase block mb-1.5">Email *</label>
        <input required type="email" placeholder="your@email.com"
          className="w-full bg-white/5 border border-white/10 focus:border-gold text-white placeholder:text-white/25 font-source px-4 py-3 rounded-sm outline-none transition-all text-sm" />
      </div>
      <div>
        <label className="font-source text-[11px] font-black tracking-wider text-white/40 uppercase block mb-1.5">Budget Range</label>
        <select className="w-full bg-white/5 border border-white/10 focus:border-gold text-white font-source px-4 py-3 rounded-sm outline-none transition-all text-sm appearance-none cursor-pointer">
          <option value="" className="bg-charcoal">Select budget range</option>
          <option value="under-25k" className="bg-charcoal">Under ₹25,000</option>
          <option value="25k-1l" className="bg-charcoal">₹25,000 – ₹1,00,000</option>
          <option value="1l-5l" className="bg-charcoal">₹1,00,000 – ₹5,00,000</option>
          <option value="5l-plus" className="bg-charcoal">₹5,00,000+</option>
          <option value="discuss" className="bg-charcoal">Let&apos;s discuss</option>
        </select>
      </div>
      <div>
        <label className="font-source text-[11px] font-black tracking-wider text-white/40 uppercase block mb-1.5">Message</label>
        <textarea rows={4} placeholder="Tell us about your campaign goals..."
          className="w-full bg-white/5 border border-white/10 focus:border-gold text-white placeholder:text-white/25 font-source px-4 py-3 rounded-sm outline-none transition-all text-sm resize-none" />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-gold hover:bg-gold-light text-white font-source font-black py-3.5 rounded-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
        ) : (
          <>Send Enquiry <ArrowIcon /></>
        )}
      </button>
    </form>
  )
}

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-maroon-dark via-maroon to-[#6b1010] py-20 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden">
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* large decorative text */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 font-playfair text-[220px] font-black italic text-white/[0.03] select-none pointer-events-none hidden lg:block leading-none">
            Partner
          </span>

          <div className="max-w-5xl mx-auto relative">
            <span className="inline-block font-source text-[11px] font-black tracking-[0.3em] uppercase text-gold border border-gold/30 px-3 py-1 mb-6">
              Advertising &amp; Partnerships
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic text-white leading-[1.05] mb-6 max-w-3xl">
              Partner With India&apos;s Rural Voice<span className="text-gold">.</span>
            </h1>
            <p className="font-noto text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              266K YouTube subscribers, 73M+ views, 50K newsletter readers — all from India&apos;s most underserved and fastest-growing rural market. Your message, their lives, our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact-form"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-source font-black px-8 py-3.5 rounded-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/20">
                Start a Partnership <ArrowIcon />
              </a>
              <a href="/media-kit.pdf" download
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-source font-bold px-8 py-3.5 rounded-sm transition-all border border-white/15">
                <DownloadIcon /> Download Media Kit
              </a>
            </div>
          </div>
        </section>

        {/* ── Our Partners ── */}
        <section className="bg-cream-dark py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">Trusted By</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
                Our Partners<span className="text-gold">.</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {PARTNERS.map((p) => (
                <div key={p.name}
                  className="group bg-white border border-charcoal/8 hover:border-maroon/25 rounded-sm px-6 py-4 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default min-w-[180px] text-center">
                  <p className="font-source font-black text-sm text-charcoal/75 group-hover:text-maroon transition-colors tracking-wide uppercase">{p.name}</p>
                  <p className="font-source text-[10px] text-charcoal/35 tracking-wider mt-0.5">{p.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Advertise ── */}
        <section className="bg-charcoal py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-2">Why News Potli</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-white">
                Why Advertise With Us<span className="text-gold">.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/8 hover:border-gold/30 rounded-sm p-6 text-center transition-all hover:-translate-y-1 group">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="font-playfair text-3xl md:text-4xl font-black italic text-gold mb-2">{s.value}</div>
                  <div className="font-source text-[11px] font-black tracking-wider text-white/70 uppercase mb-1">{s.label}</div>
                  <div className="font-noto text-xs text-white/35 leading-snug">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Advertising Tiers ── */}
        <section className="bg-cream py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">Packages</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
                Advertising Tiers<span className="text-gold">.</span>
              </h2>
              <p className="font-noto text-charcoal/50 mt-3 max-w-md mx-auto text-base">
                All pricing on request — custom packages built for your goals and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AD_TIERS.map((tier) => (
                <div key={tier.tier}
                  className={`relative bg-gradient-to-b ${tier.bg} rounded-sm overflow-hidden border ${tier.featured ? 'border-gold/40 shadow-2xl shadow-gold/10 scale-[1.02]' : 'border-white/10'} transition-all`}>
                  {tier.featured && (
                    <div className="bg-gold text-white text-[10px] font-black tracking-widest uppercase text-center py-1.5">
                      Most Popular
                    </div>
                  )}
                  <div className="p-7">
                    {/* Tier badge */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-playfair text-3xl font-black italic" style={{ color: tier.color }}>{tier.tier}</span>
                    </div>
                    <p className="font-noto text-white/40 text-sm mb-2">{tier.hindi} पैकेज</p>
                    <div className="border-t border-white/10 my-5" />
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckIcon />
                          <span className="font-source text-sm text-white/75 leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact-form"
                      className="w-full flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-black py-3 rounded-sm transition-all hover:-translate-y-0.5 text-sm">
                      Price on Request <ArrowIcon />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Download media kit */}
            <div className="mt-10 text-center">
              <a href="/media-kit.pdf" download
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white font-source font-black px-10 py-4 rounded-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/20 text-base">
                <DownloadIcon />
                Download Full Media Kit (PDF)
              </a>
              <p className="font-source text-xs text-charcoal/35 mt-3">Includes audience data, rate card, case studies &amp; reach metrics</p>
            </div>
          </div>
        </section>

        {/* ── Contact / Partnership Form ── */}
        <section id="contact-form" className="bg-charcoal py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-2">Get In Touch</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-white mb-3">
                Start a Conversation<span className="text-gold">.</span>
              </h2>
              <p className="font-noto text-white/50 text-base">
                Our partnerships team replies within 2 business days.
              </p>
            </div>
            <PartnerContactForm />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
