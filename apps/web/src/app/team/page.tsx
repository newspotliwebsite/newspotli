'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  VIEWPORT_ONCE,
} from '@/lib/motion'

// ── Team data ──────────────────────────────────────────────────────
interface TeamMember {
  name: string
  hindiName: string
  role: string
  hindiRole: string
  bio: string
  initials: string
  badge: string | null
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Arvind Shukla',
    hindiName: 'अरविंद शुक्ला',
    role: 'Founder & Editor-in-Chief',
    hindiRole: 'संस्थापक एवं प्रधान संपादक',
    bio: 'Pulitzer Grantee। 18+ वर्षों की ग्रामीण पत्रकारिता। UP, MP, Rajasthan के गाँवों से।',
    initials: 'AS',
    badge: 'Pulitzer Grantee',
  },
  {
    name: 'Ashish Yadav',
    hindiName: 'आशीष यादव',
    role: 'Senior Correspondent',
    hindiRole: 'वरिष्ठ संवाददाता',
    bio: 'UP और Bihar के खेत-खलिहान से ताज़ी रिपोर्टिंग। 8 वर्षों का अनुभव।',
    initials: 'AY',
    badge: null,
  },
  {
    name: 'Sadhana Shukla',
    hindiName: 'साधना शुक्ला',
    role: 'Women & Rural Affairs Reporter',
    hindiRole: 'महिला एवं ग्रामीण मामले संवाददाता',
    bio: 'महिला किसानों और स्वयं सहायता समूहों पर विशेष रिपोर्टिंग। Award-winning journalist।',
    initials: 'SS',
    badge: null,
  },
  {
    name: 'Pooja Rai',
    hindiName: 'पूजा राय',
    role: 'Digital Producer',
    hindiRole: 'डिजिटल प्रोड्यूसर',
    bio: 'सभी Social Media प्लेटफॉर्म की प्रमुख। वायरल ग्रामीण कंटेंट स्ट्रेटेजी।',
    initials: 'PR',
    badge: null,
  },
  {
    name: 'Jayant Mishra',
    hindiName: 'जयंत मिश्रा',
    role: 'Multimedia Journalist',
    hindiRole: 'मल्टीमीडिया पत्रकार',
    bio: 'फील्ड वीडियोग्राफी, ड्रोन शूटिंग और documentary production में विशेषज्ञ।',
    initials: 'JM',
    badge: null,
  },
]

interface Contributor {
  name: string
  role: string
  initials: string
}

const CONTRIBUTORS: Contributor[] = [
  { name: 'Ramesh Patel', role: 'Gujarat Correspondent', initials: 'RP' },
  { name: 'Anita Devi', role: 'Bihar Field Reporter', initials: 'AD' },
  { name: 'Vikram Singh', role: 'MP Agriculture Reporter', initials: 'VS' },
  { name: 'Meena Kumari', role: 'Rajasthan Correspondent', initials: 'MK' },
  { name: 'Suresh Rao', role: 'Telangana Reporter', initials: 'SR' },
  { name: 'Lakshmi Nair', role: 'Kerala Correspondent', initials: 'LN' },
]

// ── SVG icon ──────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

// ── Team card ──────────────────────────────────────────────────────
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white border border-charcoal/8 rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Avatar */}
      <div className="relative aspect-[4/5] overflow-hidden flex items-center justify-center bg-gradient-to-br from-maroon to-maroon-dark">
        <span className="font-playfair font-black italic text-white text-6xl sm:text-7xl select-none leading-none">
          {member.initials}
        </span>

        {/* Badge overlay (if applicable) */}
        {member.badge && (
          <div className="absolute top-3 right-3 bg-gold text-white text-[9px] font-black font-source tracking-wider uppercase px-2.5 py-1 rounded-full">
            {member.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-noto font-bold text-lg text-charcoal leading-tight mb-0.5">
          {member.hindiName}
        </h3>
        <p className="font-source text-xs font-bold tracking-wider text-maroon uppercase mb-3">
          {member.role}
        </p>
        <p className="font-noto text-sm text-charcoal/55 leading-relaxed line-clamp-3">
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

// ── Contributor card ───────────────────────────────────────────────
function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center gap-3 p-4 bg-white border border-charcoal/8 hover:border-maroon/20 hover:bg-cream transition-all group rounded-sm"
    >
      {/* Avatar initial */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-mid flex items-center justify-center flex-shrink-0">
        <span className="font-playfair font-black italic text-white text-sm leading-none">
          {contributor.initials}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-source font-bold text-sm text-charcoal truncate">{contributor.name}</p>
        <p className="font-source text-[11px] text-charcoal/40 uppercase tracking-wide truncate">{contributor.role}</p>
      </div>
    </motion.div>
  )
}

// ── Page ───────────────────────────────────────────────────────────
export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">

        {/* ── Page Header ── */}
        <section className="bg-white border-b border-charcoal/8 py-16 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-4"
            >
              The People Behind News Potli
            </motion.span>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12"
            >
              <h1 className="font-playfair text-5xl md:text-6xl font-black italic text-charcoal leading-tight">
                हमारी टीम<span className="text-gold">.</span>
              </h1>
              <div className="md:pb-2">
                <p className="font-source text-2xl md:text-3xl font-bold text-charcoal/25 italic">
                  Our People
                </p>
              </div>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-noto text-charcoal/55 text-lg leading-relaxed max-w-2xl mt-5"
            >
              ये वो लोग हैं जो रोज़ खेतों और गाँवों से सच्ची खबरें लाते हैं —
              कैमरे के सामने और पर्दे के पीछे भी।
            </motion.p>
          </div>
        </section>

        {/* ── Core Team Grid ── */}
        <section className="py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-8"
            >
              Core Team
            </motion.span>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {TEAM_MEMBERS.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Contributors ── */}
        <section className="bg-cream-dark py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
              >
                <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">
                  Freelance Network
                </span>
                <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
                  योगदानकर्ता<span className="text-gold">.</span>
                </h2>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="font-noto text-charcoal/45 text-sm max-w-xs leading-relaxed"
              >
                देशभर से हमारे स्वतंत्र पत्रकार जो ज़मीनी खबरें लाते हैं।
              </motion.p>
            </div>

            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
              {CONTRIBUTORS.map((c) => (
                <ContributorCard key={c.name} contributor={c} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Join Team CTA ── */}
        <section className="bg-maroon py-16 md:py-20 px-4 md:px-12 lg:px-24 relative overflow-hidden">
          {/* Watermark */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 font-playfair text-[200px] text-white/[0.03] font-black italic select-none pointer-events-none hidden lg:block leading-none">
            Join
          </span>

          <div className="max-w-3xl mx-auto text-center relative">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-4"
            >
              Join Our Team
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-playfair text-3xl md:text-4xl font-black italic text-white mb-4"
            >
              हमारे साथ जुड़ें<span className="text-gold">.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-noto text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto"
            >
              क्या आप ग्रामीण पत्रकारिता में काम करना चाहते हैं?
              हम हमेशा प्रतिभाशाली रिपोर्टर्स, वीडियोग्राफर्स और डिजिटल क्रिएटर्स की तलाश में रहते हैं।
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="mailto:careers@newspotli.com"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-source font-black px-8 py-3.5 rounded-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/20"
              >
                Apply Now <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-source font-bold px-8 py-3.5 rounded-sm transition-all border border-white/15"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
