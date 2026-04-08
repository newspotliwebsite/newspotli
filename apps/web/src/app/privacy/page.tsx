import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'गोपनीयता नीति — News Potli',
  description: 'News Potli की गोपनीयता नीति। हम आपकी जानकारी की सुरक्षा को गंभीरता से लेते हैं।',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-3">Legal</span>
          <h1 className="font-noto text-4xl md:text-5xl font-black text-charcoal mb-8">
            गोपनीयता <span className="text-maroon">नीति.</span>
          </h1>

          <div className="prose prose-lg font-noto text-charcoal/80 space-y-6">
            <p className="text-lg leading-relaxed">
              News Potli (newspotli.com) पर आपकी गोपनीयता हमारी प्राथमिकता है। यह नीति बताती है कि हम आपकी जानकारी कैसे एकत्र करते हैं, उपयोग करते हैं और सुरक्षित रखते हैं।
            </p>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              हम कौन सी जानकारी एकत्र करते हैं
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>ईमेल पता — जब आप न्यूज़लेटर के लिए सब्सक्राइब करते हैं</li>
              <li>ब्राउज़िंग डेटा — Google Analytics के माध्यम से (अनाम)</li>
              <li>खोज क्वेरी — Algolia सर्च के माध्यम से (अनाम)</li>
              <li>संपर्क फ़ॉर्म — नाम, ईमेल और संदेश जब आप हमसे संपर्क करते हैं</li>
            </ul>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              हम जानकारी का उपयोग कैसे करते हैं
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>आपको दैनिक न्यूज़लेटर भेजने के लिए</li>
              <li>वेबसाइट के अनुभव को बेहतर बनाने के लिए</li>
              <li>आपके सवालों और प्रतिक्रिया का जवाब देने के लिए</li>
            </ul>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              तृतीय-पक्ष सेवाएँ
            </h2>
            <p className="text-base leading-relaxed">
              हम Google Analytics, Algolia, Resend और Sanity.io जैसी सेवाओं का उपयोग करते हैं। इन सेवाओं की अपनी गोपनीयता नीतियाँ हैं।
            </p>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              संपर्क करें
            </h2>
            <p className="text-base leading-relaxed">
              गोपनीयता संबंधित किसी भी प्रश्न के लिए हमसे{' '}
              <Link href="/contact" className="text-maroon font-bold hover:text-gold transition-colors">
                संपर्क करें
              </Link>।
            </p>

            <p className="text-sm text-charcoal/50 mt-10 pt-6 border-t border-charcoal/10">
              अंतिम अपडेट: मार्च 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
