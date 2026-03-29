'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { fadeInUp, VIEWPORT_ONCE, DURATION_FAST, EASE_OUT } from '@/lib/motion'
import type { MandiPrice } from '@/lib/mandi'

interface Props {
  prices: MandiPrice[]
}

/** Format price with Indian rupee style: 2,510 */
function formatPrice(n: number): string {
  return n.toLocaleString('en-IN')
}

/** Derive a pseudo-random trend direction from the price itself (deterministic per commodity) */
function getTrend(price: MandiPrice): 'up' | 'down' | 'flat' {
  const diff = price.maxPrice - price.minPrice
  const ratio = price.modalPrice / ((price.maxPrice + price.minPrice) / 2)
  if (ratio > 1.01) return 'up'
  if (ratio < 0.99) return 'down'
  if (diff > price.modalPrice * 0.15) return 'up'
  return 'flat'
}

function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') {
    return <span className="text-green-light text-xs font-bold ml-1">↑</span>
  }
  if (trend === 'down') {
    return <span className="text-red-500 text-xs font-bold ml-1">↓</span>
  }
  return <span className="text-charcoal-100 text-xs ml-1">—</span>
}

export default function MandiPriceTickerClient({ prices }: Props) {
  const [expanded, setExpanded] = useState(false)

  // Duplicate prices array for seamless infinite scroll
  const tickerItems = [...prices, ...prices]

  return (
    <section className="w-full" aria-label="मंडी भाव">
      {/* ── Scrolling Ticker Bar ── */}
      <div className="bg-charcoal border-b border-gold/20 overflow-hidden">
        <div className="flex items-center h-11">
          {/* Label */}
          <div className="flex-shrink-0 bg-gold text-charcoal font-bold px-3 md:px-4 flex items-center gap-2 h-full z-10 relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="font-noto text-xs font-bold tracking-wider whitespace-nowrap">
              मंडी भाव
            </span>
          </div>

          {/* Scrolling prices */}
          <div className="flex-1 overflow-hidden relative flex items-center">
            <div className="absolute whitespace-nowrap animate-ticker flex items-center h-full">
              {tickerItems.map((price, i) => {
                const trend = getTrend(price)
                return (
                  <span
                    key={`${price.commodity}-${price.market}-${i}`}
                    className="inline-flex items-center px-4 md:px-5"
                  >
                    <span className="font-noto text-sm text-cream/90">
                      {price.commodityHindi}
                    </span>
                    <span className="font-source text-sm font-bold text-gold ml-2">
                      ₹{formatPrice(price.modalPrice)}
                    </span>
                    <TrendIndicator trend={trend} />
                    <span className="text-charcoal-100/40 text-xs ml-3">|</span>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Expand / Collapse Toggle ── */}
      <div className="bg-cream-dark border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-24">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="w-full flex items-center justify-center gap-2 py-2.5 group"
            aria-expanded={expanded}
            aria-controls="mandi-price-table"
          >
            <span className="font-noto text-sm font-semibold text-charcoal group-hover:text-maroon transition-colors">
              {expanded ? 'भाव तालिका छुपाएँ' : 'सभी भाव देखें'}
            </span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 text-maroon transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Expandable Price Table ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="mandi-price-table"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION_FAST, ease: [...EASE_OUT] as [number, number, number, number] }}
            className="overflow-hidden bg-cream"
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              viewport={VIEWPORT_ONCE}
              className="max-w-7xl mx-auto px-4 md:px-8 lg:px-24 py-6 md:py-8"
            >
              {/* Section header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-charcoal">
                  आज के <span className="text-maroon">मंडी भाव</span>
                </h3>
                <span className="font-source text-xs text-charcoal/50">
                  {prices[0]?.date || ''}
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b-2 border-maroon/20">
                      <th className="font-noto text-xs font-bold text-maroon uppercase tracking-wider pb-3 pr-4">
                        फसल
                      </th>
                      <th className="font-noto text-xs font-bold text-maroon uppercase tracking-wider pb-3 pr-4">
                        मंडी
                      </th>
                      <th className="font-noto text-xs font-bold text-maroon uppercase tracking-wider pb-3 pr-4 text-right">
                        न्यूनतम (₹)
                      </th>
                      <th className="font-noto text-xs font-bold text-maroon uppercase tracking-wider pb-3 pr-4 text-right">
                        अधिकतम (₹)
                      </th>
                      <th className="font-noto text-xs font-bold text-maroon uppercase tracking-wider pb-3 text-right">
                        मॉडल भाव (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price, idx) => {
                      const trend = getTrend(price)
                      return (
                        <tr
                          key={`${price.commodity}-${price.market}-table-${idx}`}
                          className={`border-b border-charcoal/5 ${
                            idx % 2 === 0 ? 'bg-white/40' : 'bg-cream'
                          }`}
                        >
                          <td className="font-noto text-sm font-medium text-charcoal py-3 pr-4">
                            {price.commodityHindi}
                          </td>
                          <td className="font-noto text-sm text-charcoal/70 py-3 pr-4">
                            {price.market}
                          </td>
                          <td className="font-source text-sm text-charcoal/70 py-3 pr-4 text-right tabular-nums">
                            ₹{formatPrice(price.minPrice)}
                          </td>
                          <td className="font-source text-sm text-charcoal/70 py-3 pr-4 text-right tabular-nums">
                            ₹{formatPrice(price.maxPrice)}
                          </td>
                          <td className="py-3 text-right">
                            <span
                              className={`font-source text-sm font-bold tabular-nums ${
                                trend === 'up'
                                  ? 'text-green'
                                  : trend === 'down'
                                    ? 'text-red-500'
                                    : 'text-charcoal'
                              }`}
                            >
                              ₹{formatPrice(price.modalPrice)}
                            </span>
                            <TrendIndicator trend={trend} />
                            <span className="font-noto text-[10px] text-charcoal/40 ml-1">
                              /{price.unit}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Disclaimer */}
              <p className="font-noto text-[11px] text-charcoal/40 mt-4">
                * भाव data.gov.in से प्राप्त। प्रति क्विंटल, उत्तर प्रदेश मंडी समिति।
                वास्तविक भाव स्थानीय मंडी में भिन्न हो सकते हैं।
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
