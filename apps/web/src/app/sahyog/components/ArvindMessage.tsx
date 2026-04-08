// ── Founder's Message ─────────────────────────────────────────────
export default function ArvindMessage() {
  return (
    <section className="bg-cream py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <span className="font-source text-[11px] font-black tracking-[0.25em] text-charcoal/40 uppercase block mb-10">
          संस्थापक का संदेश
        </span>

        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start">
          {/* ── Left: Avatar ── */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-maroon to-maroon-dark flex items-center justify-center shadow-lg shadow-maroon/20">
              <span className="font-noto text-4xl md:text-5xl font-bold text-white select-none">
                अश
              </span>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="flex-1">
            {/* Name */}
            <h2 className="font-noto text-2xl md:text-3xl font-black text-charcoal mb-4">
              अरविंद शुक्ला
            </h2>

            {/* Achievement pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                'Pulitzer Grantee',
                '18+ वर्ष पत्रकारिता',
                '266K+ YouTube',
              ].map((badge) => (
                <span
                  key={badge}
                  className="font-source text-[10px] font-bold tracking-wider text-maroon bg-maroon/8 border border-maroon/15 px-2.5 py-1 uppercase"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-gold pl-5 md:pl-6">
              <p className="font-noto text-base md:text-lg text-charcoal/75 leading-relaxed">
                &ldquo;मैंने 18 साल पहले एक कैमरा और एक सवाल के साथ शुरुआत की
                थी — &lsquo;गाँव की खबर क्यों नहीं आती?&rsquo; आज 266K लोग
                हमारे साथ हैं, लेकिन अच्छी पत्रकारिता मुफ़्त नहीं होती। आपका
                ₹199 का सहयोग एक और किसान की कहानी देश तक पहुँचा सकता
                है।&rdquo;
              </p>
            </blockquote>

            {/* Signature */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-8 h-0.5 bg-gold" />
              <span className="font-source text-xs font-bold text-charcoal/50 uppercase tracking-wider">
                Arvind Shukla, Founder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
