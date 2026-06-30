import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

export const metadata: Metadata = {
  title: 'संपर्क करें — Contact Us | News Potli',
  description: 'News Potli की टीम से सीधे संपर्क करें। सवाल, सुझाव या प्रतिक्रिया — हम आपकी मदद के लिए तैयार हैं।',
  alternates: {
    canonical: `${SITE_URL}/contact-us`,
  },
  openGraph: {
    title: 'संपर्क करें — Contact Us | News Potli',
    description: 'News Potli की टीम से सीधे संपर्क करें। सवाल, सुझाव या प्रतिक्रिया — हम आपकी मदद के लिए तैयार हैं।',
    url: `${SITE_URL}/contact-us`,
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'संपर्क करें — Contact Us | News Potli',
    description: 'News Potli की टीम से सीधे संपर्क करें।',
    site: '@PotliNews',
  },
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return children
}
