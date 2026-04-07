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
import LatestNewsGrid from '@/components/home/LatestNewsGrid'
import FeaturedVideos from '@/components/home/FeaturedVideos'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import NewsletterBanner from '@/components/home/NewsletterBanner'
import DeepStories from '@/components/home/DeepStories'
import MandiPriceTicker from '@/components/home/MandiPriceTicker'
import WelcomeModal from '@/components/shared/WelcomeModal'

export const revalidate = 60

export default async function HomePage() {
  let featuredArticle: any = null
  let latestArticles: any[] = []
  let categories: any[] = []
  let deepStories: any[] = []
  let sidebarArticles: any[] = []

  try {
    const [featured, latest, cats, deep, sidebar] = await Promise.all([
      client.fetch(groq`*[_type=="article" && featured==true] | order(publishedAt desc)[0]{
        _id, title, slug, excerpt, heroImage, publishedAt, readTime, breakingNews,
        "category": category->{ title, slug, color, icon },
        "author": author->{ name, photo }
      }`, {}, { next: { revalidate: 60 } }),
      client.fetch(groq`*[_type=="article"] | order(publishedAt desc)[0..5]{
        _id, title, slug, excerpt, heroImage, publishedAt, readTime,
        "category": category->{ title, slug, color, icon },
        "author": author->{ name }
      }`, {}, { next: { revalidate: 60 } }),
      client.fetch(groq`*[_type=="category"]{
        _id, title, titleEn, slug, icon, color, description,
        "storyCount": count(*[_type == "article" && references(^._id)])
      }`, {}, { next: { revalidate: 3600 } }),
      client.fetch(groq`*[_type=="article"] | order(publishedAt desc)[0..4]{
        _id, title, slug, excerpt, heroImage, publishedAt,
        "category": category->{ title, slug, color }
      }`, {}, { next: { revalidate: 60 } }),
      client.fetch(groq`*[_type=="article"] | order(publishedAt desc)[0..3]{
        _id, title, slug, publishedAt,
        "category": category->{ title, color }
      }`, {}, { next: { revalidate: 60 } }),
    ])

    featuredArticle = featured
    latestArticles = latest || []
    categories = cats || []
    deepStories = deep || []
    sidebarArticles = sidebar || []

    if (!featuredArticle && latestArticles.length > 0) {
      featuredArticle = latestArticles[0]
    }
  } catch (error: any) {
    console.error('Failed to fetch Sanity data:', error.message || error)
  }

  // Deduplicate featured from latest
  const filteredLatest = featuredArticle
    ? latestArticles.filter((a: any) => a._id !== featuredArticle._id)
    : latestArticles

  // Organization JSON-LD
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'News Potli',
    alternateName: 'न्यूज़ पोटली',
    url: 'https://newspotli.com',
    logo: { '@type': 'ImageObject', url: 'https://newspotli.com/logo.png' },
    sameAs: [
      'https://youtube.com/@newspotli',
      'https://instagram.com/newspotli',
      'https://twitter.com/newspotli',
      'https://facebook.com/newspotli',
    ],
    founder: { '@type': 'Person', name: 'Arvind Shukla' },
    foundingDate: '2008',
    description: 'India\'s #1 rural agricultural journalism platform',
  }

  return (
    <div className="min-h-screen flex flex-col font-source bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Header />
      <BreakingTicker />
      <MandiPriceTicker />

      <main className="flex-1">
        <HeroSection
          featuredArticle={featuredArticle}
          sidebarArticles={sidebarArticles}
        />
        <LatestNewsGrid articles={filteredLatest} />
        <FeaturedVideos />
        <CategoriesGrid categories={categories} />
        <NewsletterBanner />
        <DeepStories stories={deepStories} />
      </main>

      <Footer />
      <WelcomeModal />
    </div>
  )
}
