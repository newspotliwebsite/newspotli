import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SahyogHero from './components/SahyogHero'
import DonationSection from './components/DonationSection'
import ArvindMessage from './components/ArvindMessage'
import ImpactSection from './components/ImpactSection'
import TransparencySection from './components/TransparencySection'
import WhatsAppShareCTA from './components/WhatsAppShareCTA'

// JSON-LD DonateAction structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DonateAction',
  name: 'News Potli को सहयोग दें',
  description:
    'भारत के गाँवों की स्वतंत्र पत्रकारिता को जारी रखने में सहयोग दें।',
  recipient: {
    '@type': 'Organization',
    name: 'News Potli',
    url: 'https://newspotli.com',
    description:
      'India\'s #1 rural agricultural journalism platform.',
    founder: {
      '@type': 'Person',
      name: 'Arvind Shukla',
    },
  },
  url: 'https://newspotli.com/sahyog',
}

export default function SahyogPage() {
  return (
    <>
      <Header />
      <main>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SahyogHero />
        <DonationSection />
        <ArvindMessage />
        <ImpactSection />
        <TransparencySection />
        <WhatsAppShareCTA />
      </main>
      <Footer />
    </>
  )
}
