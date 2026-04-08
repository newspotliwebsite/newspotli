import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'सेवा की शर्तें — News Potli',
  description: 'News Potli की सेवा की शर्तें। वेबसाइट का उपयोग करके आप इन शर्तों से सहमत होते हैं।',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <span className="font-source text-[11px] font-black tracking-[0.2em] text-maroon uppercase block mb-3">Legal</span>
          <h1 className="font-noto text-4xl md:text-5xl font-black text-charcoal mb-8">
            सेवा की <span className="text-maroon">शर्तें.</span>
          </h1>

          <div className="prose prose-lg font-noto text-charcoal/80 space-y-6">
            <p className="text-lg leading-relaxed">
              News Potli (newspotli.com) का उपयोग करके, आप इन सेवा की शर्तों से सहमत होते हैं।
            </p>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              सामग्री का उपयोग
            </h2>
            <p className="text-base leading-relaxed">
              News Potli पर प्रकाशित सभी लेख, वीडियो और अन्य सामग्री कॉपीराइट सुरक्षित हैं। आप व्यक्तिगत उपयोग के लिए सामग्री पढ़ और साझा कर सकते हैं, लेकिन व्यावसायिक उपयोग के लिए अनुमति आवश्यक है।
            </p>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              सटीकता
            </h2>
            <p className="text-base leading-relaxed">
              हम सटीक और विश्वसनीय पत्रकारिता के लिए प्रतिबद्ध हैं। किसी भी त्रुटि की सूचना हमें तुरंत दें और हम सुधार करेंगे।
            </p>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              विज्ञापन और प्रायोजित सामग्री
            </h2>
            <p className="text-base leading-relaxed">
              प्रायोजित सामग्री को हमेशा स्पष्ट रूप से चिह्नित किया जाता है। संपादकीय सामग्री विज्ञापनदाताओं से स्वतंत्र है।
            </p>

            <h2 className="font-noto text-2xl font-black text-charcoal mt-10 border-l-4 border-gold pl-5">
              संपर्क
            </h2>
            <p className="text-base leading-relaxed">
              इन शर्तों के बारे में किसी भी प्रश्न के लिए{' '}
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
