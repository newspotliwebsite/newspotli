import Image from 'next/image'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

export default function FounderSection() {
  return (
    <section className="bg-cream py-20 md:py-28 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* ── Photo ── */}
          <div className="flex-shrink-0 w-full max-w-[320px] mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
              <Image
                src="/images/founder/arvind-shukla.jpg"
                alt="Arvind Shukla — Founder of News Potli"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 320px, 360px"
              />
            </div>
          </div>

          {/* ── Bio ── */}
          <div className="flex-1 min-w-0">
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-maroon block mb-4">
              Founder &amp; Editor-in-Chief
            </span>

            <h2 className="font-source text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              Arvind Shukla
            </h2>

            <div className="space-y-5 mt-7 font-noto text-[16px] leading-[1.85] text-charcoal/80">
              <p>
                Arvind Shukla is a rural journalist, Pulitzer grantee, a JTRC – IIT Kanpur fellow and the founder of News Potli, a multi-digital platform dedicated to telling the stories of farmers, women, and tribal communities. With over two decades of experience across print, television, radio, and digital media, he has built a career centered on grassroots reporting and social impact.
              </p>
              <p>
                He started his journalism career with <em>Hindustan</em> followed by <em>Amar Ujala</em>, <em>Total TV</em> and <em>Samachar Plus</em>. He served as an Associate Editor at <em>Gaon Connection</em>.
              </p>
              <p>
                Raised in a farming community and based in Lucknow, Uttar Pradesh, Arvind brings lived experience to his reporting. He has extensively documented the effects of climate challenges — droughts, floods, and water scarcity — on rural livelihoods and economies. His work consistently highlights farmers&apos; resilience, innovation, and progress.
              </p>
              <p>
                Through News Potli, he is reshaping how rural India is seen and heard. He has created a powerful storytelling platform that centers marginalized voices. His contributions have been published in <em>Climate Home</em> (London), <em>Mongabay</em>, <em>IndiaSpend</em>, <em>Down to Earth</em>, and other leading outlets.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-charcoal/10">
              <span className="font-source text-[11px] font-bold tracking-wider text-charcoal/40 uppercase mr-1">
                Connect
              </span>
              <a
                href="https://www.facebook.com/ArvindShuklaGC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-charcoal/5 hover:bg-maroon hover:text-white text-charcoal/60 transition-all"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://twitter.com/AShukkla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-charcoal/5 hover:bg-charcoal hover:text-white text-charcoal/60 transition-all"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://in.linkedin.com/in/arvind-shukla-b76640a1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-charcoal/5 hover:bg-[#0A66C2] hover:text-white text-charcoal/60 transition-all"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:ashukla282@gmail.com"
                aria-label="Email"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-charcoal/5 hover:bg-gold hover:text-white text-charcoal/60 transition-all"
              >
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
