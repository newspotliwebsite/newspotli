import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutHero from './components/AboutHero'
import OrganizationSection from './components/OrganizationSection'
import FounderSection from './components/FounderSection'
import StatsStrip from './components/StatsStrip'
import AboutCTA from './components/AboutCTA'

export const metadata: Metadata = {
  title: 'हमारे बारे में — News Potli',
  description:
    'News Potli भारत के गाँवों और किसानों की आवाज़ है। Pulitzer Grantee Arvind Shukla द्वारा स्थापित — 20+ वर्षों की ग्रामीण पत्रकारिता।',
  openGraph: {
    title: 'हमारे बारे में — News Potli',
    description: 'भारत के गाँवों की आवाज़। Independent media house focused on Rural India.',
    siteName: 'News Potli',
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <OrganizationSection />
        <FounderSection />
        <StatsStrip />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
