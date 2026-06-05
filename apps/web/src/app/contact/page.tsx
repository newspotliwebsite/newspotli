'use client'

import { motion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { fadeInUp, VIEWPORT_ONCE } from '@/lib/motion'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* ── Hero ── */}
        <section className="bg-cream border-b border-[#e8e0d0] py-16 md:py-20 px-4 md:px-12 lg:px-24">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-source text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Pitch Your Story
            </h1>
            <p className="font-source text-charcoal/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6">
              We encourage submissions in Hindi, though pitches in English are also welcome. Please note that all commissioned stories will be published first in Hindi.
            </p>
            <p className="font-source text-charcoal/55 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4">
              News Potli commissions only original reporting. Submitted story ideas must not have been previously published, commissioned, or reported by any other media outlet.
            </p>
          </motion.div>
        </section>

        {/* ── JotForm ── */}
        <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="max-w-4xl mx-auto bg-white border border-[#e8e0d0] rounded-xl shadow-sm overflow-hidden"
          >
            <iframe
              src="https://form.jotform.com/261540974821056"
              title="Story Pitch Submission Form"
              className="w-full border-0 rounded-xl"
              style={{ minHeight: '1200px' }}
              allowFullScreen
            />
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
