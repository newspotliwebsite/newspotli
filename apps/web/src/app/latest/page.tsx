/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LatestClient from './LatestClient'
import { LATEST_PAGE_QUERY, PAGE_SIZE } from './query'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'सभी खबरें — News Potli',
  description: 'News Potli की सभी ताज़ा खबरें — खेती, मौसम, मंडी भाव, सरकारी योजना और ग्रामीण भारत की कहानियां।',
  alternates: { canonical: '/latest' },
}

export default async function LatestPage() {
  let initialArticles: any[] = []
  try {
    initialArticles = await client.fetch(
      LATEST_PAGE_QUERY,
      { start: 0, end: PAGE_SIZE },
      { next: { revalidate: 60 } }
    ) || []
  } catch (error: any) {
    console.error('Failed to fetch latest articles:', error.message || error)
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-cream border-b border-[#e8e0d0] py-10 md:py-14 px-5">
          <div className="max-w-site mx-auto">
            <h1 className="font-noto text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              सभी खबरें
            </h1>
            <p className="mt-2 font-source text-xs md:text-sm uppercase tracking-[0.12em] text-charcoal/50">
              All Articles
            </p>
          </div>
        </section>

        <LatestClient initialArticles={initialArticles} pageSize={PAGE_SIZE} />
      </main>
      <Footer />
    </>
  )
}
