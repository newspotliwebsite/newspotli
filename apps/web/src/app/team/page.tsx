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

// ── Card with photo ────────────────────────────────────────────────
function PhotoCard({ member, priority }: { member: TeamMember; priority: boolean }) {
  return (
    <Link
      href={`/author/${teamSlug(member.nameEn)}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
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
    </Link>
  )
}

// ── Card without photo (initials) ──────────────────────────────────
function InitialsCard({ member }: { member: TeamMember }) {
  const parts = member.nameEn.trim().split(/\s+/)
  const initials = ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase()

  return (
    <Link
      href={`/author/${teamSlug(member.nameEn)}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
          Bio coming soon
        </p>
      </div>
    </Link>
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
