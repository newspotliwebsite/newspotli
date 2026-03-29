import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { ALL_CATEGORY_SLUGS_QUERY, ALL_AUTHOR_SLUGS_QUERY } from '@/lib/queries'
import { groq } from 'next-sanity'

const ARTICLES_WITH_DATES_QUERY = groq`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt
  }
`

// Static pages that should appear in sitemap
const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/sahyog', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/newsletter', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/videos', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

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

  // Static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  }

  try {
    const [articles, categorySlugs, authorSlugs] = await Promise.all([
      client.fetch<{ slug: string; publishedAt: string }[]>(ARTICLES_WITH_DATES_QUERY),
      client.fetch<string[]>(ALL_CATEGORY_SLUGS_QUERY),
      client.fetch<string[]>(ALL_AUTHOR_SLUGS_QUERY),
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

    for (const slug of authorSlugs || []) {
      entries.push({
        url: `${siteUrl}/author/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  } catch (error) {
    console.error('Sitemap generation failed:', error)
  }

  return entries
}
