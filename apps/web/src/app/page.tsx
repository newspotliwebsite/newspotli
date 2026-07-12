/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'

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
  let featuredArticles: any[] = []
  let latestArticles: any[] = []
  let deepStories: any[] = []
  let groundReports: any[] = []
  let leftSide: any[] = []
  let moreHeadlines: any[] = []
  let webStories: any[] = []

  try {
    const [featured, latest, mausam, ground, headlines, stories] = await Promise.all([
      client.fetch(groq`*[_type=="article" && featured==true] | order(publishedAt desc)[0..3]{
        _id, title, slug, excerpt, heroImage, publishedAt, readTime, breakingNews,
        "category": category->{ title, slug, color, icon },
        "author": author->{ name, photo }
      }`, {}, { next: { revalidate: 60 } }),
      client.fetch(groq`*[_type=="article"] | order(publishedAt desc)[0..19]{
        _id, title, slug, excerpt, heroImage, publishedAt, readTime,
        "category": category->{ title, slug, color, icon },
        "author": author->{ name }
      }`, {}, { next: { revalidate: 60 } }),
      // DeepStories section ("मौसम-बेमौसम") — filter to the mausam-bemaum category only
      client.fetch(groq`*[_type=="article" && category->slug.current == "mausam-bemaum"] | order(publishedAt desc)[0..5]{
        _id, title, slug, excerpt, heroImage, publishedAt, readTime,
        "category": category->{ title, slug, color },
        "author": author->{ name }
      }`, {}, { next: { revalidate: 60 } }),
      // LatestNewsGrid section ("ग्राउंड रिपोर्ट्स") — filter to the ground-reports category only
      client.fetch(groq`*[_type=="article" && category->slug.current == "ground-reports"] | order(publishedAt desc)[0..7]{
        _id, title, slug, excerpt, heroImage, publishedAt, readTime,
        "category": category->{ title, slug, color, icon },
        "author": author->{ name }
      }`, {}, { next: { revalidate: 60 } }),
      client.fetch(groq`*[_type=="article"] | order(publishedAt desc)[0..8]{
        _id, title, slug, publishedAt, heroImage,
        "category": category->{ title, slug, color },
        "author": author->{ name }
      }`, {}, { next: { revalidate: 60 } }),
      client.fetch(groq`*[_type == "article" && defined(heroImage)] | order(publishedAt desc)[0..9]{
        _id, title, slug, heroImage, publishedAt,
        "author": author->{ name }
      }`, {}, { next: { revalidate: 60 } }),
    ])

    featuredArticles = featured || []
    latestArticles = latest || []
    deepStories = mausam || []
    groundReports = ground || []
    moreHeadlines = headlines || []
    webStories = stories || []

    // Fallback: use latest if no featured
    if (featuredArticles.length === 0 && latestArticles.length > 0) {
      featuredArticles = latestArticles.slice(0, 4)
    }

    // Latest articles for the hero left sidebar (skip featured ids)
    const featuredIds = new Set(featuredArticles.map((a: any) => a._id))
    const remaining = latestArticles.filter((a: any) => !featuredIds.has(a._id))
    leftSide = remaining.slice(0, 5)
  } catch (error: any) {
    console.error('Failed to fetch Sanity data:', error.message || error)
  }

  // For LatestNewsGrid ("ग्राउंड रिपोर्ट्स"): show ground-reports articles, excluding
  // anything already in the hero carousel. Fall back to latest only if the
  // category has no articles yet, so the section never disappears.
  const usedInHero = new Set(featuredArticles.map((a: any) => a._id))
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
            featuredArticles={featuredArticles}
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
