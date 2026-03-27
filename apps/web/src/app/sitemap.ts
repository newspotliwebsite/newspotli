import { MetadataRoute } from 'next'
import { client, projectId } from '@/lib/sanity'
import { ALL_CATEGORY_SLUGS_QUERY } from '@/lib/queries'
import { groq } from 'next-sanity'

const ARTICLES_WITH_DATES_QUERY = groq`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://newspotli.com'

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
  ]

  if (projectId === 'yourprojectid') return entries

  try {
    const [articles, categorySlugs] = await Promise.all([
      client.fetch<{ slug: string; publishedAt: string }[]>(ARTICLES_WITH_DATES_QUERY),
      client.fetch<string[]>(ALL_CATEGORY_SLUGS_QUERY),
    ])

    for (const slug of categorySlugs || []) {
      entries.push({
        url: `${siteUrl}/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      })
    }

    for (const article of articles || []) {
      entries.push({
        url: `${siteUrl}/article/${article.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  } catch (error) {
    console.error('Sitemap generation failed:', error)
  }

  return entries
}
