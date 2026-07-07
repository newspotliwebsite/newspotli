import type { Metadata } from "next";
import Script from "next/script";
import { Tiro_Devanagari_Hindi, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/layout/Preloader";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  variable: "--font-noto",
  weight: ["400"],
  style: ["normal"],
});

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://newspotli.com'),
  title: { default: 'News Potli', template: '%s — News Potli' },
  description: "India's leading rural agricultural journalism platform.",
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'News Potli',
    locale: 'hi_IN',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: 'News Potli',
  alternateName: 'न्यूज़ पोटली',
  url: 'https://newspotli.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://newspotli.com/images/logos/logo-hindi.png',
    width: 200,
    height: 200,
  },
  description:
    'भारत के किसानों और गाँवों की आवाज़ — India\'s fastest-growing multi-digital platform focused on rural India, agriculture, climate change, and grassroots journalism.',
  foundingDate: '2018',
  founder: {
    '@type': 'Person',
    name: 'Arvind Shukla',
    jobTitle: 'Founder & Editor-in-Chief',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.youtube.com/@newspotli',
    'https://www.instagram.com/newspotli/',
    'https://x.com/PotliNews',
    'https://www.facebook.com/Potlinews/',
    'https://www.linkedin.com/in/potlinews/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'newspotlioffice@gmail.com',
    contactType: 'editorial',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'News Potli',
  alternateName: 'न्यूज़ पोटली',
  url: 'https://newspotli.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://newspotli.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
      <body
        className={`${tiro.variable} ${source.variable} font-source antialiased bg-white text-foreground`}
      >
        <Preloader />
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function() {});
}`}
        </Script>
      </body>
    </html>
  );
}
