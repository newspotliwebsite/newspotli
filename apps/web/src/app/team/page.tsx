import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { TEAM_MEMBERS, teamSlug, type TeamMember } from '@/lib/team'

export const metadata: Metadata = {
  title: 'हमारी टीम — News Potli',
  description:
    'News Potli की टीम — ग्रामीण भारत की कहानियां ज़मीन से उठाकर राष्ट्रीय मंच तक पहुंचाने वाले पत्रकार, वीडियोग्राफर और डिजिटल क्रिएटर्स।',
  openGraph: {
    title: 'हमारी टीम — News Potli',
    description: 'मिलिए News Potli की टीम से।',
    siteName: 'News Potli',
  },
}

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

// ── Social icons ───────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65z" />
    </svg>
  )
}

// Renders a row of social links for the members who have them. Rendered as a
// sibling of the card's main Link (never nested inside it) to keep valid HTML.
function SocialLinks({ member }: { member: TeamMember }) {
  if (!member.linkedin && !member.twitter) return null
  return (
    <div className="flex items-center gap-2 mt-4">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.nameEn} on LinkedIn`}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal/5 text-charcoal/50 hover:bg-maroon hover:text-white transition-colors"
        >
          <LinkedInIcon />
        </a>
      )}
      {member.twitter && (
        <a
          href={member.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.nameEn} on X`}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal/5 text-charcoal/50 hover:bg-maroon hover:text-white transition-colors"
        >
          <XIcon />
        </a>
      )}
    </div>
  )
}

// ── Card with photo ────────────────────────────────────────────────
function PhotoCard({ member, priority }: { member: TeamMember; priority: boolean }) {
  const authorHref = `/author/${teamSlug(member.nameEn)}`
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={authorHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
          {member.photo && (
            <Image
              src={member.photo}
              alt={member.nameEn}
              fill
              priority={priority}
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
      </Link>

      <div className="p-6">
        <Link href={authorHref} className="block group/link">
          <h4 className="font-noto text-xl font-bold text-charcoal leading-tight group-hover/link:text-maroon transition-colors">
            {member.name}
          </h4>
          <p className="font-source text-[11px] font-bold text-maroon uppercase tracking-wider mt-1.5">
            {member.role}
          </p>
          <p className="font-noto text-sm text-charcoal/60 mt-3 leading-relaxed line-clamp-4">
            {member.bio}
          </p>
        </Link>
        <SocialLinks member={member} />
      </div>
    </div>
  )
}

// ── Card without photo (initials) ──────────────────────────────────
function InitialsCard({ member }: { member: TeamMember }) {
  const parts = member.nameEn.trim().split(/\s+/)
  const initials = ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase()
  const authorHref = `/author/${teamSlug(member.nameEn)}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={authorHref} className="block">
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
      </Link>

      <div className="p-6">
        <Link href={authorHref} className="block group/link">
          <h4 className="font-noto text-xl font-bold text-charcoal leading-tight group-hover/link:text-maroon transition-colors">
            {member.name}
          </h4>
          <p className="font-source text-[11px] font-bold text-maroon uppercase tracking-wider mt-1.5">
            {member.role}
          </p>
          <p className="font-noto text-sm text-charcoal/30 mt-3 leading-relaxed italic">
            Bio coming soon
          </p>
        </Link>
        <SocialLinks member={member} />
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────
export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        {/* ── Hero ── */}
        <section className="bg-cream border-b border-charcoal/8 py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-source text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              OUR TEAM
            </h1>
            <div className="mx-auto mt-6 h-[2px] w-16 bg-gold/70" />
          </div>
        </section>

        {/* ── Team Grid ── */}
        <section className="py-16 md:py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {TEAM_MEMBERS.map((m, i) =>
                m.photo ? (
                  <PhotoCard key={m.nameEn} member={m} priority={i < 3} />
                ) : (
                  <InitialsCard key={m.nameEn} member={m} />
                )
              )}
            </div>
          </div>
        </section>

        {/* ── Join CTA ── */}
        <section className="bg-cream py-20 md:py-24 px-4 md:px-12 lg:px-24 border-t border-charcoal/8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-maroon block mb-4">
              Join Our Team
            </span>
            <h2 className="font-noto text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-5 leading-tight">
              हमारे साथ जुड़ें
            </h2>
            <p className="font-noto text-charcoal/65 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              क्या आप ग्रामीण पत्रकारिता में काम करना चाहते हैं? हम हमेशा प्रतिभाशाली रिपोर्टर्स, वीडियोग्राफर्स और डिजिटल क्रिएटर्स की तलाश में रहते हैं।
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
