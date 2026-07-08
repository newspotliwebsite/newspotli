import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/shared/ArticleCard'
import { client } from '@/lib/sanity'
import { LATEST_ARTICLES_QUERY } from '@/lib/queries'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'पृष्ठ नहीं मिला — News Potli',
  robots: { index: false },
}

interface LatestArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  heroImage?: { asset?: { _ref: string }; alt?: string }
  category?: { title: string; color?: string }
  author?: { name: string }
  readTime?: number
  publishedAt: string
}

export default async function NotFound() {
  let articles: LatestArticle[] = []
  try {
    const data = await client.fetch(
      LATEST_ARTICLES_QUERY,
      {},
      { next: { revalidate: 60 } }
    )
    articles = (data || []).slice(0, 6)
  } catch {
    articles = []
  }

  return (
    <>
      <Header />
      <main className="min-h-[75vh] bg-cream flex flex-col items-center px-4 py-16 text-center">
        <Image
          src="/images/illustrations/404-lost-farmer.png"
          alt="Page not found"
          width={256}
          height={256}
          className="w-56 h-56 object-contain mb-8"
        />

        <h1 className="font-noto text-2xl font-bold text-charcoal mb-3">
          यह पृष्ठ नहीं मिला
        </h1>

        <p className="font-noto text-base text-charcoal/60 mb-4">
          यह पेज अब उपलब्ध नहीं है। नीचे दिए गए लिंक से खबरें पढ़ें।
        </p>

        <p className="font-source text-sm text-charcoal/40 mb-10">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-white font-source font-bold px-7 py-3 rounded transition-all hover:-translate-y-0.5 mb-16"
        >
          होम पेज पर जाएं →
        </Link>

        {articles.length > 0 && (
          <div className="w-full max-w-6xl">
            <h2 className="font-noto text-xl font-bold text-charcoal mb-6">
              ताज़ा खबरें
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-left">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
