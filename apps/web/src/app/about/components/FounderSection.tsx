// Award SVG
const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

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

export default function FounderSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <span className="font-source text-[11px] font-black tracking-[0.25em] text-charcoal/40 uppercase block mb-12">
          Founder &amp; Editor-in-Chief
        </span>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start bg-cream rounded-2xl p-8 shadow-sm">

          {/* ── Left: Photo ── */}
          <div className="relative flex-shrink-0 w-72 mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center shadow-xl">
              <span className="font-noto text-[120px] font-bold text-white/20 select-none">अ</span>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="font-noto text-xl font-black text-white leading-tight">
                  Arvind Shukla
                </h2>
                <p className="font-source text-xs text-white/70 mt-1">Founder &amp; Editor-in-Chief</p>
              </div>
            </div>

            {/* Gold Pulitzer badge — overlapping corner */}
            <div className="absolute -top-4 -right-4 bg-gold text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg shadow-gold/30 border-2 border-white z-10">
              <AwardIcon />
              <span className="font-source text-[9px] font-black tracking-wider text-center leading-tight mt-0.5">
                PULITZER<br/>GRANTEE
              </span>
            </div>

            {/* Social links below photo */}
            <div className="flex items-center gap-3 mt-4 justify-center lg:justify-start">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center bg-charcoal/5 hover:bg-maroon hover:text-white text-charcoal/50 rounded-xl transition-all">
                <LinkedInIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center bg-charcoal/5 hover:bg-charcoal hover:text-white text-charcoal/50 rounded-xl transition-all">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* ── Right: Bio ── */}
          <div className="flex-1">
            {/* Large decorative quote */}
            <span className="font-noto text-8xl text-maroon/10 leading-none select-none block -mb-8">&ldquo;</span>

            <div className="space-y-5 font-noto text-[17px] leading-[1.85] text-charcoal/80">
              <p>
                <strong className="text-charcoal font-bold">अरविंद शुक्ला</strong> भारत के सबसे प्रतिष्ठित ग्रामीण पत्रकारों में से एक हैं।
                18 से अधिक वर्षों के अनुभव के साथ, उन्होंने देश के दूरदराज के गाँवों से उन कहानियों को दुनिया तक पहुँचाया
                जो कभी सुर्खियाँ नहीं बन पाती थीं।
              </p>
              <p>
                उनकी रिपोर्टिंग ने <strong className="text-charcoal">Pulitzer Center for Crisis Reporting</strong> का ध्यान खींचा,
                जिसने उन्हें ग्रामीण कृषि संकट पर गहन रिपोर्टिंग के लिए Grant से सम्मानित किया।
                उनका काम BBC, NDTV, और The Wire जैसे प्रतिष्ठित माध्यमों में प्रकाशित हो चुका है।
              </p>
              <p>
                2018 में, अरविंद ने <em className="text-maroon">News Potli</em> की नींव रखी — एक ऐसा डिजिटल मंच
                जो किसानों, पशुपालकों और ग्रामीण उद्यमियों की आवाज़ बन सके।
                आज यह मंच <strong className="text-charcoal">2.66 लाख से अधिक</strong> सब्सक्राइबर्स के साथ
                भारत का सबसे बड़ा ग्रामीण पत्रकारिता YouTube चैनल है।
              </p>
            </div>

            {/* Achievement pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                'Pulitzer Center Grantee',
                '18+ Years Rural Journalism',
                'BBC Featured',
                '73M+ YouTube Views',
                'NDTV Award 2022',
              ].map((badge) => (
                <span key={badge} className="font-source text-[11px] font-bold tracking-wider text-maroon bg-maroon/8 border border-maroon/15 px-3 py-1.5 uppercase">
                  {badge}
                </span>
              ))}
            </div>

            {/* Quote signature */}
            <div className="mt-10 pt-8 border-t border-charcoal/8">
              <p className="font-noto text-lg md:text-xl text-charcoal/70 mb-3">
                &ldquo;पत्रकारिता एक ज़िम्मेदारी है — उन लोगों की आवाज़ बनने की जो अपनी बात खुद नहीं कह सकते।&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gold" />
                <span className="font-source text-xs font-bold text-charcoal/50 uppercase tracking-wider">Arvind Shukla, Founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
