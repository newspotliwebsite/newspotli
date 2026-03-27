import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import { CATEGORY_ARTICLES_QUERY } from '@/lib/queries'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const start = parseInt(searchParams.get('start') || '0', 10)
  const end = parseInt(searchParams.get('end') || '11', 10)

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })
  }

  try {
    const articles = await client.fetch(CATEGORY_ARTICLES_QUERY, { slug, start, end })
    return NextResponse.json({ articles: articles || [] })
  } catch (error) {
    console.error('Category articles fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
