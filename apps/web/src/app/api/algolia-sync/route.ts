import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import { getAdminClient, ALGOLIA_INDEX } from '@/lib/algolia'
import { groq } from 'next-sanity'

const ARTICLES_FOR_ALGOLIA = groq`
  *[_type == "article" && defined(slug.current)] {
    "objectID": _id,
    title,
    excerpt,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    "author": author->name,
    publishedAt,
    readTime,
    tags
  }
`

export async function POST(request: Request) {
  // Verify secret (from Sanity webhook)
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET && process.env.SANITY_REVALIDATE_SECRET !== 'your_random_secret_string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const articles = await client.fetch(ARTICLES_FOR_ALGOLIA)

    if (!articles || articles.length === 0) {
      return NextResponse.json({ message: 'No articles found to sync', count: 0 })
    }

    const adminClient = getAdminClient()
    if (!adminClient) {
      return NextResponse.json({ error: 'Algolia admin credentials not configured' }, { status: 500 })
    }

    // Save objects to Algolia
    await adminClient.saveObjects({
      indexName: ALGOLIA_INDEX,
      objects: articles,
    })

    return NextResponse.json({
      message: `Successfully synced ${articles.length} articles to Algolia`,
      count: articles.length,
    })
  } catch (error) {
    console.error('Algolia sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync articles', details: String(error) },
      { status: 500 }
    )
  }
}

// Also support GET for easy testing
export async function GET() {
  return NextResponse.json({
    message: 'Algolia sync endpoint. Send POST request to sync articles.',
    usage: 'POST /api/algolia-sync?secret=YOUR_SECRET',
  })
}
