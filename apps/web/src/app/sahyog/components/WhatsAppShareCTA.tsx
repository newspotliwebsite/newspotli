// ── WhatsApp Share CTA ────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const SHARE_TEXT = encodeURIComponent(
  'News Potli \u2014 \u092D\u093E\u0930\u0924 \u0915\u0947 \u0917\u093E\u0901\u0935\u094B\u0902 \u0915\u0940 \u0906\u0935\u093E\u0937\u093C\u0964 \u092C\u093F\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928, \u092C\u093F\u0928\u093E \u092A\u0947\u0935\u0949\u0932 \u2014 \u0938\u093F\u0930\u094D\u092B\u093C \u0906\u092A\u0915\u0947 \u0938\u0939\u092F\u094B\u0917 \u0938\u0947 \u091A\u0932\u0924\u093E \u0939\u0948\u0964\n\n\u0938\u0939\u092F\u094B\u0917 \u0915\u0930\u0947\u0902: https://newspotli.com/sahyog'
)
const SHARE_URL = `https://api.whatsapp.com/send?text=${SHARE_TEXT}`

export default function WhatsAppShareCTA() {
  return (
    <section className="bg-green/5 py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* WhatsApp icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#25D366]/10 rounded-full mb-6">
          <span className="text-[#25D366]">
            <WhatsAppIcon />
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-playfair text-3xl md:text-4xl font-black text-charcoal mb-4">
          इस मिशन को आगे बढ़ाएँ
        </h2>

        {/* Subtext */}
        <p className="font-noto text-base md:text-lg text-charcoal/55 leading-relaxed mb-8">
          अपने दोस्तों और परिवार को भी बताएँ
        </p>

        {/* Share button */}
        <a
          href={SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-noto font-bold px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/20 text-base"
        >
          <WhatsAppIcon />
          WhatsApp पर शेयर करें
        </a>
      </div>
    </section>
  )
}
