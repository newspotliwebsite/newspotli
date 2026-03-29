import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

export const metadata: Metadata = {
  title: 'खोजें — News Potli',
  description: 'News Potli पर खेती, किसान, मौसम, सरकारी योजना और बाजार की खबरें खोजें।',
  openGraph: {
    title: 'खोजें — News Potli',
    description: 'News Potli पर खेती, किसान, मौसम, सरकारी योजना और बाजार की खबरें खोजें।',
    url: `${SITE_URL}/search`,
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
  },
  robots: { index: false },
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
