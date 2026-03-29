import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

export const metadata: Metadata = {
  title: 'संपर्क करें — News Potli',
  description: 'News Potli से संपर्क करें। विज्ञापन, साझेदारी, या कोई सवाल — हम आपकी मदद के लिए तैयार हैं।',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'संपर्क करें — News Potli',
    description: 'News Potli से संपर्क करें। विज्ञापन, साझेदारी, या कोई सवाल — हम आपकी मदद के लिए तैयार हैं।',
    url: `${SITE_URL}/contact`,
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'संपर्क करें — News Potli',
    description: 'News Potli से संपर्क करें। विज्ञापन, साझेदारी, या कोई सवाल — हम आपकी मदद के लिए तैयार हैं।',
    site: '@newspotli',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
