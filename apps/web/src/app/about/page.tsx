import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutHero from './components/AboutHero'
import FounderSection from './components/FounderSection'
import MissionStatement from './components/MissionStatement'
import JourneyTimeline from './components/JourneyTimeline'
import StatsStrip from './components/StatsStrip'
import PartnersSection from './components/PartnersSection'
import AboutCTA from './components/AboutCTA'

export const metadata: Metadata = {
  title: 'हमारे बारे में — News Potli',
  description: 'News Potli भारत के गाँवों और किसानों की आवाज़ है। Pulitzer Grantee Arvind Shukla द्वारा स्थापित, 18+ वर्षों की ग्रामीण पत्रकारिता।',
  openGraph: {
    title: 'हमारे बारे में — News Potli',
    description: 'भारत के गाँवों की आवाज़। 266K+ Subscribers, 73M+ Views.',
    siteName: 'News Potli',
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <FounderSection />
        <MissionStatement />
        <JourneyTimeline />
        <StatsStrip />
        <PartnersSection />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
