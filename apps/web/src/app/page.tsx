/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import {
  HOMEPAGE_HERO_QUERY,
  HOMEPAGE_LATEST_QUERY,
  HOMEPAGE_SECTION_BY_CATEGORY_QUERY,
  HOMEPAGE_MORE_HEADLINES_QUERY,
  HOMEPAGE_WEB_STORIES_QUERY,
} from '@/lib/queries'

// ── SEO Metadata ──
export const metadata: Metadata = {
  title: 'News Potli — भारत के गाँवों की आवाज़ | Rural Agricultural Journalism',
  description: 'ग्रामीण भारत की सबसे भरोसेमंद खबरें — खेती, मौसम, मंडी भाव, सरकारी योजना। 266K+ YouTube subscribers, Pulitzer Grantee journalism.',
  openGraph: {
    title: 'News Potli — भारत के गाँवों की आवाज़',
    description: 'India\'s #1 rural agricultural journalism platform. 266K+ YouTube subscribers.',
    siteName: 'News Potli',
    locale: 'hi_IN',
    type: 'website',
    url: 'https://newspotli.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News Potli — भारत के गाँवों की आवाज़',
    description: 'India\'s #1 rural agricultural journalism platform.',
  },
  alternates: {
    canonical: 'https://newspotli.com',
  },
}

import Header from '@/components/layout/Header'
import BreakingTicker from '@/components/layout/BreakingTicker'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import SeriesSection from '@/components/home/SeriesSection'
import LatestNewsGrid from '@/components/home/LatestNewsGrid'
import FeaturedVideos from '@/components/home/FeaturedVideos'
import DeepStories from '@/components/home/DeepStories'
import WebStories from '@/components/home/WebStories'
import MoreHeadlines from '@/components/home/MoreHeadlines'
import TrustedBy from '@/components/home/TrustedBy'

export const revalidate = 60

export default async function HomePage() {
  let heroArticles: any[] = []
  let latestArticles: any[] = []
  let deepStories: any[] = []
  let groundReports: any[] = []
  let leftSide: any[] = []
  let moreHeadlines: any[] = []
  let webStories: any[] = []

  try {
    const [hero, latest, mausam, ground, headlines, stories] = await Promise.all([
      client.fetch(HOMEPAGE_HERO_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(HOMEPAGE_LATEST_QUERY, {}, { next: { revalidate: 60 } }),
      // DeepStories section ("मौसम-बेमौसम")
      client.fetch(
        HOMEPAGE_SECTION_BY_CATEGORY_QUERY,
        { categorySlug: 'mausam-bemaum', limit: 5 },
        { next: { revalidate: 60 } }
      ),
      // LatestNewsGrid section ("ग्राउंड रिपोर्ट्स")
      client.fetch(
        HOMEPAGE_SECTION_BY_CATEGORY_QUERY,
        { categorySlug: 'ground-reports', limit: 7 },
        { next: { revalidate: 60 } }
      ),
      client.fetch(HOMEPAGE_MORE_HEADLINES_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(HOMEPAGE_WEB_STORIES_QUERY, {}, { next: { revalidate: 60 } }),
    ])

    heroArticles = hero || []
    latestArticles = latest || []
    deepStories = mausam || []
    groundReports = ground || []
    moreHeadlines = headlines || []
    webStories = stories || []

    // If no article has a hero image yet, fall back to plain latest so the
    // carousel still renders rather than vanishing.
    if (heroArticles.length === 0 && latestArticles.length > 0) {
      heroArticles = latestArticles.slice(0, 4)
    }

    // Sidebar shows the newest articles that aren't already in the carousel —
    // running the same 4 stories twice side by side reads as a bug.
    const heroIds = new Set(heroArticles.map((a: any) => a._id))
    leftSide = latestArticles.filter((a: any) => !heroIds.has(a._id)).slice(0, 5)
  } catch (error: any) {
    console.error('Failed to fetch Sanity data:', error.message || error)
  }

  // For LatestNewsGrid ("ग्राउंड रिपोर्ट्स"): show ground-reports articles, excluding
  // anything already in the hero carousel. Fall back to latest only if the
  // category has no articles yet, so the section never disappears.
  const usedInHero = new Set(heroArticles.map((a: any) => a._id))
  const groundFiltered = groundReports.filter((a: any) => !usedInHero.has(a._id))
  const latestFallback = latestArticles.filter((a: any) => !usedInHero.has(a._id))
  const specialReports = groundFiltered.length > 0 ? groundFiltered : latestFallback

  // Organization JSON-LD
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'News Potli',
    alternateName: 'न्यूज़ पोटली',
    url: 'https://newspotli.com',
    logo: { '@type': 'ImageObject', url: 'https://newspotli.com/logo.png' },
    sameAs: [
      'https://www.youtube.com/@newspotli',
      'https://www.instagram.com/newspotli/',
      'https://x.com/PotliNews',
      'https://www.facebook.com/Potlinews/',
      'https://www.linkedin.com/in/potlinews/',
    ],
    founder: { '@type': 'Person', name: 'Arvind Shukla' },
    foundingDate: '2008',
    description: 'India\'s #1 rural agricultural journalism platform',
  }

  return (
    <div className="min-h-screen flex flex-col font-source bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Header />

      <main id="main-content" className="flex-1">
        <BreakingTicker />
        <div id="latest">
          <HeroSection
            featuredArticles={heroArticles}
            leftArticles={leftSide}
          />
        </div>
        <FeaturedVideos />
        <SeriesSection />
        <LatestNewsGrid articles={specialReports} />
        <WebStories stories={webStories} />
        <DeepStories stories={deepStories} />
        <MoreHeadlines articles={moreHeadlines} />
        <TrustedBy />
      </main>

      <Footer />
    </div>
  )
}
