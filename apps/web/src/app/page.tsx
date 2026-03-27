/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/lib/sanity'
import {
  HERO_ARTICLE_QUERY,
  LATEST_ARTICLES_QUERY,
  CATEGORY_LIST_QUERY,
  DEEP_STORIES_QUERY,
  SIDEBAR_ARTICLES_QUERY,
} from '@/lib/queries'

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

// ISR Revalidation every 60 seconds
export const revalidate = 60

export default async function Home() {
  let featuredArticle: any = null
  let latestArticles: any[] = []
  let categories: any[] = []
  let deepStories: any[] = []
  let sidebarArticles: any[] = []

  try {
    const [featuredData, latestData, categoriesData, deepStoriesData, sidebarData] = await Promise.all([
      client.fetch(HERO_ARTICLE_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(LATEST_ARTICLES_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(CATEGORY_LIST_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(DEEP_STORIES_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(SIDEBAR_ARTICLES_QUERY, {}, { next: { revalidate: 60 } }),
    ])

    featuredArticle = Array.isArray(featuredData) ? featuredData[0] : featuredData
    latestArticles = Array.isArray(latestData) ? latestData : []
    categories = Array.isArray(categoriesData) ? categoriesData : []
    deepStories = Array.isArray(deepStoriesData) ? deepStoriesData : []
    sidebarArticles = Array.isArray(sidebarData) ? sidebarData : []

    // Fallback: if no featured article, use the latest one
    if (!featuredArticle && latestArticles.length > 0) {
      featuredArticle = latestArticles[0]
    }
  } catch (error: any) {
    console.error('Failed to fetch Sanity data:', error.message || error)
  }

  console.log('Featured article:', featuredArticle?.title)
  console.log('Sidebar articles:', sidebarArticles?.length)
  console.log('Categories:', categories?.length)

  // Deduplicate featured from latest
  const filteredLatest = featuredArticle
    ? latestArticles.filter((a: any) => a._id !== featuredArticle._id)
    : latestArticles

  // Sanitize article data to plain primitives (prevents circular JSON crash at build)
  const cleanArticle = (article: any) => ({
    _id: String(article._id || ''),
    title: String(article.title || ''),
    slug: { current: String(article.slug?.current || '') },
    excerpt: String(article.excerpt || ''),
    publishedAt: String(article.publishedAt || ''),
    readTime: Number(article.readTime || 5),
    category: article.category
      ? {
          title: String(article.category.title),
          color: article.category.color ? String(article.category.color) : undefined,
        }
      : undefined,
    author: article.author
      ? { name: String(article.author.name), photo: undefined as any }
      : undefined,
    heroImage: article.heroImage?.asset
      ? {
          asset: { _ref: String(article.heroImage.asset._ref) },
          alt: String(article.heroImage.alt || ''),
        }
      : undefined,
  })

  const cleanFeaturedArticle = featuredArticle ? cleanArticle(featuredArticle) : null

  if (featuredArticle?.author?.photo?.asset && cleanFeaturedArticle?.author) {
    cleanFeaturedArticle.author.photo = {
      asset: { _ref: String(featuredArticle.author.photo.asset._ref) },
    }
  }

  const cleanLatestArticles = filteredLatest.map((a: any) => cleanArticle(a))

  // Sanitize sidebar articles
  const cleanSidebarArticles = sidebarArticles.map((a: any) => ({
    _id: String(a._id || ''),
    title: String(a.title || ''),
    slug: { current: String(a.slug?.current || '') },
    publishedAt: String(a.publishedAt || ''),
    category: a.category
      ? {
          title: String(a.category.title),
          color: a.category.color ? String(a.category.color) : undefined,
        }
      : undefined,
  }))

  // Sanitize categories (already simple data from GROQ projection)
  const cleanCategories = categories.map((cat: any) => ({
    _id: String(cat._id || ''),
    title: String(cat.title || ''),
    titleEn: cat.titleEn ? String(cat.titleEn) : undefined,
    slug: { current: String(cat.slug?.current || '') },
    description: cat.description ? String(cat.description) : undefined,
    color: cat.color ? String(cat.color) : undefined,
    icon: cat.icon ? String(cat.icon) : undefined,
    storyCount: Number(cat.storyCount || 0),
    latestArticle: cat.latestArticle?.title
      ? { title: String(cat.latestArticle.title) }
      : undefined,
  }))

  // Sanitize deep stories
  const cleanDeepStories = deepStories.map((story: any) => ({
    _id: String(story._id || ''),
    title: String(story.title || ''),
    slug: { current: String(story.slug?.current || '') },
    excerpt: story.excerpt ? String(story.excerpt) : undefined,
    publishedAt: String(story.publishedAt || ''),
    category: story.category
      ? {
          title: String(story.category.title),
          slug: story.category.slug ? { current: String(story.category.slug.current) } : undefined,
        }
      : undefined,
    heroImage: story.heroImage?.asset
      ? {
          asset: { _ref: String(story.heroImage.asset._ref) },
          alt: String(story.heroImage.alt || ''),
        }
      : undefined,
  }))

  return (
    <div className="min-h-screen flex flex-col font-source bg-cream">
      <Header />
      <BreakingTicker />

      <main className="flex-1">
        <HeroSection
          featuredArticle={cleanFeaturedArticle as any}
          sidebarArticles={cleanSidebarArticles as any}
        />
        <CredibilityStrip />
        <LatestNewsGrid articles={cleanLatestArticles as any} />
        <FeaturedVideos />
        <CategoriesGrid categories={cleanCategories} />
        <NewsletterBanner />
        <DeepStories stories={cleanDeepStories} />
      </main>

      <Footer />
    </div>
  )
}
