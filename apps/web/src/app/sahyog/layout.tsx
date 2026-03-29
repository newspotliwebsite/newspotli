import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'सहयोग करें',
  description:
    'News Potli को चलाने में सहयोग दें। बिना विज्ञापन, बिना पेवॉल — सिर्फ़ आपके सहयोग से।',
  alternates: { canonical: '/sahyog' },
  openGraph: {
    title: 'सहयोग करें — News Potli',
    description:
      'बिना विज्ञापन, बिना पेवॉल — सिर्फ़ आपके सहयोग से चलता है भारत का सबसे बड़ा ग्रामीण पत्रकारिता मंच।',
    url: '/sahyog',
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सहयोग करें — News Potli',
    description:
      'बिना विज्ञापन, बिना पेवॉल — सिर्फ़ आपके सहयोग से चलता है भारत का सबसे बड़ा ग्रामीण पत्रकारिता मंच।',
  },
}

export default function SahyogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
