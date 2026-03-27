import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'हमारी टीम — News Potli',
  description: 'News Potli की पूरी टीम से मिलें — पत्रकार, वीडियो एडिटर, और ग्रामीण रिपोर्टर जो भारत के गाँवों की आवाज़ बनते हैं।',
  openGraph: {
    title: 'हमारी टीम — News Potli',
    description: 'Meet the team behind India\'s leading rural journalism platform.',
    siteName: 'News Potli',
  },
}

// ── Team data ──────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  {
    name: 'Arvind Shukla',
    hindiName: 'अरविंद शुक्ला',
    role: 'Founder & Editor-in-Chief',
    hindiRole: 'संस्थापक एवं प्रधान संपादक',
    bio: 'Pulitzer Grantee। 18+ वर्षों की ग्रामीण पत्रकारिता। UP, MP, Rajasthan के गाँवों से।',
    photo: 'https://placehold.co/480x600/3a0a0a/FFFFFF/webp?text=AS',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    badge: 'Pulitzer Grantee',
  },
  {
    name: 'Ashish Yadav',
    hindiName: 'आशीष यादव',
    role: 'Senior Correspondent',
    hindiRole: 'वरिष्ठ संवाददाता',
    bio: 'UP और Bihar के खेत-खलिहान से ताज़ी रिपोर्टिंग। 8 वर्षों का अनुभव।',
    photo: 'https://placehold.co/480x600/1a3a1a/FFFFFF/webp?text=AY',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    badge: null,
  },
  {
    name: 'Sadhana Shukla',
    hindiName: 'साधना शुक्ला',
    role: 'Women & Rural Affairs Reporter',
    hindiRole: 'महिला एवं ग्रामीण मामले संवाददाता',
    bio: 'महिला किसानों और स्वयं सहायता समूहों पर विशेष रिपोर्टिंग। Award-winning journalist।',
    photo: 'https://placehold.co/480x600/8B1A1A/FFFFFF/webp?text=SS',
    linkedin: 'https://linkedin.com',
    twitter: null,
    badge: null,
  },
  {
    name: 'Pooja Rai',
    hindiName: 'पूजा राय',
    role: 'Digital Producer',
    hindiRole: 'डिजिटल प्रोड्यूसर',
    bio: 'सभी Social Media प्लेटफॉर्म की प्रमुख। वायरल ग्रामीण कंटेंट स्ट्रेटेजी।',
    photo: 'https://placehold.co/480x600/c8860a/FFFFFF/webp?text=PR',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    badge: null,
  },
  {
    name: 'Jayant Mishra',
    hindiName: 'जयंत मिश्रा',
    role: 'Multimedia Journalist',
    hindiRole: 'मल्टीमीडिया पत्रकार',
    bio: 'फील्ड वीडियोग्राफी, ड्रोन शूटिंग और documentary production में विशेषज्ञ।',
    photo: 'https://placehold.co/480x600/1a2a3a/FFFFFF/webp?text=JM',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    badge: null,
  },
]

const CONTRIBUTORS = [
  { name: 'Ramesh Patel', role: 'Gujarat Correspondent' },
  { name: 'Anita Devi', role: 'Bihar Field Reporter' },
  { name: 'Vikram Singh', role: 'MP Agriculture Reporter' },
  { name: 'Meena Kumari', role: 'Rajasthan Correspondent' },
  { name: 'Suresh Rao', role: 'Telangana Reporter' },
  { name: 'Lakshmi Nair', role: 'Kerala Correspondent' },
]

// ── SVG icons ──────────────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

// ── Team card ──────────────────────────────────────────────────────
function TeamCard({ member }: { member: typeof TEAM_MEMBERS[0] }) {
  return (
    <div className="group bg-white border border-charcoal/8 rounded-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />

        {/* Badge overlay (if applicable) */}
        {member.badge && (
          <div className="absolute top-3 right-3 bg-gold text-white text-[9px] font-black font-source tracking-wider uppercase px-2.5 py-1 rounded-full">
            {member.badge}
          </div>
        )}

        {/* Social links — visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <div /> {/* spacer */}
          <div className="flex gap-2">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 bg-white/10 backdrop-blur-sm hover:bg-white text-white hover:text-charcoal rounded-sm flex items-center justify-center transition-all">
                <LinkedInIcon />
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 bg-white/10 backdrop-blur-sm hover:bg-white text-white hover:text-charcoal rounded-sm flex items-center justify-center transition-all">
                <TwitterIcon />
              </a>
            )}
          </div>
        </div>
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
    </div>
  )
}

// ── Contributor card ───────────────────────────────────────────────
function ContributorCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-charcoal/8 hover:border-maroon/20 hover:bg-cream transition-all group rounded-sm">
      {/* Avatar initial */}
      <div className="w-10 h-10 rounded-full bg-charcoal/8 group-hover:bg-maroon/10 flex items-center justify-center flex-shrink-0 transition-colors">
        <span className="font-playfair font-black italic text-charcoal/40 group-hover:text-maroon text-lg leading-none transition-colors">
          {name.charAt(0)}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-source font-bold text-sm text-charcoal truncate">{name}</p>
        <p className="font-source text-[11px] text-charcoal/40 uppercase tracking-wide truncate">{role}</p>
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

        {/* ── Page Header ── */}
        <section className="bg-white border-b border-charcoal/8 py-16 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-4">
              The People Behind News Potli
            </span>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
              <h1 className="font-playfair text-5xl md:text-6xl font-black italic text-charcoal leading-tight">
                हमारी टीम<span className="text-gold">.</span>
              </h1>
              <div className="md:pb-2">
                <p className="font-source text-2xl md:text-3xl font-bold text-charcoal/25 italic">
                  Our People
                </p>
              </div>
            </div>
            <p className="font-noto text-charcoal/55 text-lg leading-relaxed max-w-2xl mt-5">
              ये वो लोग हैं जो रोज़ खेतों और गाँवों से सच्ची खबरें लाते हैं —
              कैमरे के सामने और पर्दे के पीछे भी।
            </p>
          </div>
        </section>

        {/* ── Core Team Grid ── */}
        <section className="py-14 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-8">
              Core Team
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Contributors ── */}
        <section className="bg-cream-dark py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/35 block mb-2">
                  Freelance Network
                </span>
                <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-charcoal">
                  योगदानकर्ता<span className="text-gold">.</span>
                </h2>
              </div>
              <p className="font-noto text-charcoal/45 text-sm max-w-xs leading-relaxed">
                देशभर से हमारे स्वतंत्र पत्रकार जो ज़मीनी खबरें लाते हैं।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CONTRIBUTORS.map((c) => (
                <ContributorCard key={c.name} name={c.name} role={c.role} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Join Team CTA ── */}
        <section className="bg-maroon py-16 md:py-20 px-4 md:px-12 lg:px-24 relative overflow-hidden">
          {/* Watermark */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 font-playfair text-[200px] text-white/[0.03] font-black italic select-none pointer-events-none hidden lg:block leading-none">
            Join
          </span>

          <div className="max-w-3xl mx-auto text-center relative">
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-gold block mb-4">
              Join Our Team
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-black italic text-white mb-4">
              हमारे साथ जुड़ें<span className="text-gold">.</span>
            </h2>
            <p className="font-noto text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              क्या आप ग्रामीण पत्रकारिता में काम करना चाहते हैं?
              हम हमेशा प्रतिभाशाली रिपोर्टर्स, वीडियोग्राफर्स और डिजिटल क्रिएटर्स की तलाश में रहते हैं।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
