import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'हमारी टीम — News Potli',
  description: 'News Potli की पूरी टीम से मिलें — पत्रकार, वीडियो एडिटर, और ग्रामीण रिपोर्टर जो भारत के गाँवों की आवाज़ बनते हैं।',
  openGraph: {
    title: 'हमारी टीम — News Potli',
    description: 'Meet the team behind India\'s leading rural journalism platform.',
    siteName: 'News Potli',
  },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
