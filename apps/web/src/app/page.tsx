/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'

import Header from '@/components/layout/Header'
import BreakingTicker from '@/components/layout/BreakingTicker'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import CredibilityStrip from '@/components/home/CredibilityStrip'
import LatestNewsGrid from '@/components/home/LatestNewsGrid'
import FeaturedVideos from '@/components/home/FeaturedVideos'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import NewsletterBanner from '@/components/home/NewsletterBanner'
import DeepStories from '@/components/home/DeepStories'

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

  return (
    <div className="min-h-screen flex flex-col font-source bg-cream">
      <Header />
      <BreakingTicker />

      <main className="flex-1">
        <HeroSection
          featuredArticle={featuredArticle}
          sidebarArticles={sidebarArticles}
        />
        <CredibilityStrip />
        <LatestNewsGrid articles={filteredLatest} />
        <FeaturedVideos />
        <CategoriesGrid categories={categories} />
        <NewsletterBanner />
        <DeepStories stories={deepStories} />
      </main>

      <Footer />
    </div>
  )
}
