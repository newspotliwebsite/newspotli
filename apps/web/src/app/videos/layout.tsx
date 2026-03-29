import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

export const metadata: Metadata = {
  title: 'वीडियो — News Potli | ग्रामीण भारत की कहानियाँ वीडियो में',
  description:
    'ग्रामीण भारत की सच्ची कहानियाँ वीडियो में। खेती, किसान, मौसम, सरकारी योजना और बाजार — News Potli YouTube चैनल। 266K+ subscribers, 73M+ views.',
  alternates: {
    canonical: `${SITE_URL}/videos`,
  },
  openGraph: {
    title: 'वीडियो — News Potli',
    description:
      'ग्रामीण भारत की सच्ची कहानियाँ वीडियो में। खेती, किसान, मौसम, सरकारी योजना और बाजार — 266K+ subscribers.',
    url: `${SITE_URL}/videos`,
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'News Potli — वीडियो लाइब्रेरी',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'वीडियो — News Potli',
    description:
      'ग्रामीण भारत की सच्ची कहानियाँ वीडियो में। खेती, किसान, मौसम, सरकारी योजना और बाजार।',
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
