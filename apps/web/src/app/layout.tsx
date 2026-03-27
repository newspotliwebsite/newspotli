import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Noto_Sans_Devanagari, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const noto = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-noto",
  weight: ["400", "700"],
});

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "News Potli",
  description: "India's leading rural agricultural journalism platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
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
        className={`${playfair.variable} ${noto.variable} ${source.variable} font-source antialiased bg-cream text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
