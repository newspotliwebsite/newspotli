'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  fadeInUp,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/lib/motion'

// ── Tier data ─────────────────────────────────────────────────────
interface Tier {
  amount: number
  label: string
  description: string
}

const TIERS: Tier[] = [
  {
    amount: 51,
    label: 'चाय-पानी',
    description: 'एक गाँव तक खबर पहुँचती है',
  },
  {
    amount: 199,
    label: 'सहयोगी',
    description: 'एक किसान की पूरी कहानी',
  },
  {
    amount: 501,
    label: 'साथी',
    description: 'एक हफ्ते की ग्राउंड रिपोर्टिंग',
  },
  {
    amount: 1001,
    label: 'समर्थक',
    description: 'एक इन्वेस्टिगेटिव स्टोरी',
  },
]

const DEFAULT_AMOUNT = 199

// ── UPI icon ──────────────────────────────────────────────────────
const UPIIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      d="M11.5 2L6 12h5l-1 10 8.5-14H13l2-6h-3.5z"
      fill="currentColor"
    />
  </svg>
)

// ── Format amount for display ─────────────────────────────────────
function formatAmount(amount: number): string {
  return new Intl.NumberFormat('hi-IN').format(amount)
}

export default function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number>(DEFAULT_AMOUNT)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isCustom, setIsCustom] = useState(false)

  const activeAmount = isCustom
    ? parseInt(customAmount, 10) || 0
    : selectedAmount

  const upiLink = `upi://pay?pa=newspotli@ybl&pn=News%20Potli&am=${activeAmount}&cu=INR`

  const razorpayId = process.env.NEXT_PUBLIC_RAZORPAY_PAGE_ID

  function handleTierSelect(amount: number) {
    setSelectedAmount(amount)
    setIsCustom(false)
    setCustomAmount('')
  }

  function handleCustomFocus() {
    setIsCustom(true)
  }

  function handleCustomChange(value: string) {
    // Allow only digits
    const cleaned = value.replace(/\D/g, '')
    setCustomAmount(cleaned)
    setIsCustom(true)
  }

  return (
    <section
      id="donate"
      className="bg-cream py-16 md:py-24 px-4 md:px-12 lg:px-24 scroll-mt-20"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="max-w-2xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="font-source text-[11px] font-black tracking-[0.25em] text-charcoal/40 uppercase block mb-3">
            Support
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
            राशि चुनें
          </h2>
        </div>

        {/* ── Tier grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6"
        >
          {TIERS.map((tier) => {
            const isActive = !isCustom && selectedAmount === tier.amount
            return (
              <motion.button
                key={tier.amount}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleTierSelect(tier.amount)}
                className={`relative flex flex-col items-center text-center p-4 md:p-5 rounded-sm border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-gold bg-gold/5 shadow-md shadow-gold/10 scale-[1.02]'
                    : 'border-charcoal/10 bg-white hover:border-charcoal/25'
                }`}
              >
                {/* Amount */}
                <span className="font-source text-2xl md:text-3xl font-bold text-charcoal">
                  ₹{formatAmount(tier.amount)}
                </span>

                {/* Label */}
                <span className="font-noto text-xs font-bold text-maroon mt-1">
                  {tier.label}
                </span>

                {/* Description */}
                <span className="font-noto text-[11px] text-charcoal/50 mt-1.5 leading-snug">
                  {tier.description}
                </span>

                {/* Default badge */}
                {tier.amount === DEFAULT_AMOUNT && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 font-source text-[9px] font-black tracking-wider bg-gold text-white px-2 py-0.5 uppercase">
                    Popular
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Custom amount ── */}
        <div className="mb-8">
          <div
            className={`flex items-center border-2 rounded-sm overflow-hidden transition-all ${
              isCustom
                ? 'border-gold bg-gold/5'
                : 'border-charcoal/10 bg-white'
            }`}
          >
            <span className="font-source text-lg font-bold text-charcoal/40 pl-4 pr-1 select-none">
              ₹
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              placeholder="अपनी मर्ज़ी"
              value={customAmount}
              onFocus={handleCustomFocus}
              onChange={(e) => handleCustomChange(e.target.value)}
              className="flex-1 bg-transparent font-noto text-lg text-charcoal placeholder:text-charcoal/30 py-3 pr-4 outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* ── UPI button ── */}
        <a
          href={activeAmount > 0 ? upiLink : undefined}
          aria-disabled={activeAmount <= 0}
          className={`flex items-center justify-center gap-3 w-full btn-gold-shimmer text-white font-noto font-bold py-4 text-base rounded-sm ${
            activeAmount <= 0 ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <UPIIcon />
          UPI से भुगतान करें
          {activeAmount > 0 && (
            <span className="font-source text-sm font-bold opacity-80">
              — ₹{formatAmount(activeAmount)}
            </span>
          )}
        </a>

        {/* ── Razorpay button (conditional) ── */}
        {razorpayId && (
          <a
            href={`https://pages.razorpay.com/${razorpayId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border-2 border-maroon text-maroon hover:bg-maroon hover:text-white font-noto font-bold py-3.5 text-base rounded-sm mt-3 transition-all"
          >
            कार्ड / नेटबैंकिंग से
          </a>
        )}

        {/* ── UPI QR placeholder ── */}
        <div className="flex flex-col items-center mt-8">
          <div className="w-[200px] h-[200px] border-2 border-dashed border-charcoal/20 rounded-sm flex items-center justify-center bg-white/50">
            <span className="font-noto text-sm text-charcoal/40 text-center px-4 leading-relaxed">
              UPI QR Code
              <br />
              जल्द आ रहा है
            </span>
          </div>
        </div>

        {/* ── Reassurance ── */}
        <p className="font-noto text-sm text-charcoal/45 text-center mt-6">
          एकमुश्त भुगतान &middot; कोई रजिस्ट्रेशन नहीं
        </p>
      </motion.div>
    </section>
  )
}
