import { client, projectId } from '@/lib/sanity'
import { groq } from 'next-sanity'

const RECENT_ARTICLES_QUERY = groq`
  *[_type == "article" && publishedAt > $since] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt
  }
`

export async function GET() {
  let articles: { title: string; slug: string; publishedAt: string }[] = []

  if (projectId !== 'yourprojectid') {
    try {
      const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      articles = (await client.fetch(RECENT_ARTICLES_QUERY, { since })) || []
    } catch (error) {
      console.error('News sitemap fetch failed:', error)
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles
  .map(
    (a) => `  <url>
    <loc>${siteUrl}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>News Potli</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:genres>Blog</news:genres>
      <news:publication_date>${a.publishedAt}</news:publication_date>
      <news:title>${escapeXml(a.title)}</news:title>
    </news:news>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
