import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

export const metadata: Metadata = {
  title: 'न्यूज़लेटर — News Potli',
  description: 'हर सुबह एक potli भर जानकारी — खेती, मौसम, मंडी भाव और सरकारी योजनाएं सीधे आपके inbox में। मुफ़्त सब्सक्राइब करें।',
  openGraph: {
    title: 'Daily Potli Newsletter — News Potli',
    description: 'रोज़ की ज़रूरी खबरें सीधे inbox में। 50,000+ किसान पहले से जुड़े हैं।',
    url: `${SITE_URL}/newsletter`,
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Daily Potli Newsletter — News Potli',
    description: 'रोज़ की ज़रूरी खबरें सीधे inbox में।',
  },
  alternates: {
    canonical: `${SITE_URL}/newsletter`,
  },
}

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children
}
