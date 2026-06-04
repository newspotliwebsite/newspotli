'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/lib/motion'

// ── Types ──────────────────────────────────────────────────────────
interface TeamMember {
  name: string         // Hindi name
  nameEn: string       // English name
  role: string         // English role (uppercase)
  photo: string | null
  bio: string
  badge?: string
}

// ── Team (single ordered list) ─────────────────────────────────────
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'अरविंद शुक्ला',
    nameEn: 'Arvind Shukla',
    role: 'FOUNDER & EDITOR-IN-CHIEF',
    photo: '/images/team/arvind-shukla.jpg',
    bio: 'Pulitzer Center Grantee. 20+ years of rural journalism across print, TV, radio, and digital. Founded News Potli to amplify the voices of farmers, women, and tribal communities.',
    badge: 'Pulitzer Grantee',
  },
  {
    name: 'साधना शुक्ला',
    nameEn: 'Sadhana Shukla',
    role: 'CO-FOUNDER & HEAD OF OPERATIONS',
    photo: '/images/team/sadhana-shukla.jpg',
    bio: "Business graduate and former project manager at Gaursons India. Freelance reporter and content writer for the Urban Development Department, Government of UP. Key role in shaping News Potli's vision and field reporting network.",
  },
  {
    name: 'मोहम्मद जलीश',
    nameEn: 'Mohd Jalish',
    role: 'ASSOCIATE EDITOR',
    photo: '/images/team/mohd-jalish.jpg',
    bio: '13+ years in journalism with India TV, News18 India, TV9 Bharatvarsh, and India News. Handles scripting, packaging, and editorial operations at News Potli.',
  },
  {
    name: 'मिथिलेश धर दुबे',
    nameEn: 'Mithilesh Dhar Dubey',
    role: 'ASSOCIATE EDITOR (CONTENT)',
    photo: '/images/team/mithilesh-dubey.jpg',
    bio: 'Principal correspondent for IndiaSpend Hindi. Previously at Gaon Connection, Nav Bharat Times, Prabhat Khabar, and Dainik Bhaskar. Expertise in agriculture, education, and climate change.',
  },
  {
    name: 'परितोष चार्ल्स',
    nameEn: 'Paritosh Charles',
    role: 'HEAD OF PRODUCTION',
    photo: null,
    bio: 'Bio coming soon.',
  },
  {
    name: 'जयंत मिश्रा',
    nameEn: 'Jayant Mishra',
    role: 'MULTIMEDIA JOURNALIST',
    photo: '/images/team/jayant-mishra.jpg',
    bio: 'Has reported from Alirajpur, Nashik, Bihar, and Lakhimpur covering tribal communities, farmer suicides, floods, and climate change impact on agriculture.',
  },
  {
    name: 'अजय राजपूत',
    nameEn: 'Ajay Rajput',
    role: 'CINEMATOGRAPHER',
    photo: '/images/team/ajay-kumar.jpg',
    bio: '10+ years in camera operations, drone cinematography, and documentary filmmaking. Captures the ground realities of rural India through powerful visuals and immersive storytelling.',
  },
  {
    name: 'हस्साम ताजुब',
    nameEn: 'Hassam Tajub',
    role: 'VIDEO EDITOR',
    photo: '/images/team/hassam-tajub.jpg',
    bio: '3+ years in video production specializing in cinematic storytelling, motion graphics, and visual content. Trained in motion graphics from Mumbai. Deep passion for writing, reading, and poetry.',
  },
  {
    name: 'मयंक श्रीवास्तव',
    nameEn: 'Mayank Srivastava',
    role: 'VIDEO EDITOR & MOTION GRAPHICS DESIGNER',
    photo: '/images/team/mayank-srivastava.jpg',
    bio: '14 years in motion graphics, video editing, and visual storytelling. Work spans commercials, social media content, corporate films, and digital campaigns. Also a faculty trainer in animation.',
  },
  {
    name: 'शिवानी बाजपेयी',
    nameEn: 'Shivani Bajpai',
    role: 'COMMUNICATION MANAGER',
    photo: '/images/team/shivani-bajpai.jpg',
    bio: '10+ years across marketing, sales, and customer engagement. Creates impactful content around agriculture, rural communities, women, and climate issues.',
  },
]

// ── Icons ──────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

// ── Card with photo ────────────────────────────────────────────────
function PhotoCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
        {member.photo && (
          <Image
            src={member.photo}
            alt={member.nameEn}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Name overlaid bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-noto text-lg font-bold text-white leading-tight drop-shadow">
            {member.nameEn}
          </h3>
        </div>

        {/* Badge */}
        {member.badge && (
          <span className="absolute top-3 right-3 bg-gold text-white text-[9px] font-black font-source tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
            {member.badge}
          </span>
        )}
      </div>

      <div className="p-6">
        <h4 className="font-noto text-xl font-bold text-charcoal leading-tight">
          {member.name}
        </h4>
        <p className="font-source text-[11px] font-bold text-maroon uppercase tracking-wider mt-1.5">
          {member.role}
        </p>
        <p className="font-noto text-sm text-charcoal/60 mt-3 leading-relaxed line-clamp-4">
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

// ── Card without photo (initials) ──────────────────────────────────
function InitialsCard({ member }: { member: TeamMember }) {
  const parts = member.nameEn.trim().split(/\s+/)
  const initials = ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase()

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/5] bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center">
        <span className="font-noto text-6xl font-bold text-white/80 select-none">
          {initials}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/40 to-transparent">
          <h3 className="font-noto text-lg font-bold text-white leading-tight">
            {member.nameEn}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-noto text-xl font-bold text-charcoal leading-tight">
          {member.name}
        </h4>
        <p className="font-source text-[11px] font-bold text-maroon uppercase tracking-wider mt-1.5">
          {member.role}
        </p>
        <p className="font-noto text-sm text-charcoal/30 mt-3 leading-relaxed italic">
          Bio coming soon.
        </p>
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
        {/* ── Hero ── */}
        <section className="bg-cream border-b border-charcoal/8 py-20 md:py-28 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/40 block mb-5"
            >
              The People Behind News Potli
            </motion.span>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="flex flex-col md:flex-row md:items-end gap-3 md:gap-12"
            >
              <h1 className="font-noto text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
                हमारी टीम<span className="text-gold">.</span>
              </h1>
              <div className="md:pb-3">
                <p className="font-source text-2xl md:text-3xl font-bold text-charcoal/25">
                  Our People
                </p>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-noto text-charcoal/60 text-lg leading-relaxed max-w-2xl mt-6"
            >
              वे लोग जो रोज़ लोगों और गाँवों से सच्ची खबरें लाते हैं — कैमरे के सामने और पर्दे के पीछे भी।
            </motion.p>
          </div>
        </section>

        {/* ── Team Grid ── */}
        <section className="py-16 md:py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {TEAM_MEMBERS.map((m) =>
                m.photo ? (
                  <PhotoCard key={m.nameEn} member={m} />
                ) : (
                  <InitialsCard key={m.nameEn} member={m} />
                )
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Join CTA ── */}
        <section className="bg-cream py-20 md:py-24 px-4 md:px-12 lg:px-24 border-t border-charcoal/8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-maroon block mb-4"
            >
              Join Our Team
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-noto text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-5 leading-tight"
            >
              हमारे साथ जुड़ें<span className="text-gold">.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-noto text-charcoal/65 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            >
              क्या आप ग्रामीण पत्रकारिता में काम करना चाहते हैं? हम हमेशा प्रतिभाशाली रिपोर्टर्स, वीडियोग्राफर्स और डिजिटल क्रिएटर्स की तलाश में रहते हैं।
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href="mailto:careers@newspotli.com"
                className="inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-black px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-maroon/20"
              >
                Apply Now <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal/85 text-white font-source font-bold px-8 py-4 rounded-xl transition-all"
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
