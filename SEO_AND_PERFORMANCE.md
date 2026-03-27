# SEO_AND_PERFORMANCE.md
# Claude Code: read this before working on any SEO, sitemap, metadata, or performance task
# News Potli — SEO is how farmers find this site on Google. Non-negotiable.

## ═══ SEO GOALS ═══
Primary: Rank on Google India for Hindi agricultural queries
Secondary: Appear in Google News for rural/farming stories
Tertiary: Rich snippets in search results (Article schema)
Bonus: Google Discover cards (requires good OG images + fast mobile)

## ═══ METADATA STRUCTURE ═══

### Root layout (app/layout.tsx) — Default metadata:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'News Potli — भारत के गाँवों और किसानों की आवाज़',
    template: '%s | News Potli',
  },
  description: 'भारत के किसानों, गांवों और कृषि की ताज़ा खबरें। Pulitzer Grantee Arvind Shukla की टीम द्वारा।',
  keywords: ['किसान', 'खेती', 'ग्रामीण भारत', 'कृषि', 'पशु पालन', 'मौसम', 'सरकारी योजना'],
  authors: [{ name: 'News Potli', url: 'https://newspotli.com' }],
  creator: 'News Potli',
  publisher: 'News Potli',
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    url: 'https://newspotli.com',
    siteName: 'News Potli',
    title: 'News Potli — भारत के गाँवों और किसानों की आवाज़',
    description: 'भारत के किसानों, गांवों और कृषि की ताज़ा खबरें।',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'News Potli' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PotliNews',
    creator: '@PotliNews',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_ID, // add when available
  },
}
```

### Article page dynamic metadata:
```tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug })
  if (!article) return { title: 'Article Not Found | News Potli' }

  const ogImage = article.heroImage
    ? urlFor(article.heroImage).width(1200).height(630).format('webp').url()
    : '/og-default.jpg'

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author?.name],
      section: article.category?.titleEn,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `/article/${params.slug}`,
    },
  }
}
```

## ═══ JSON-LD ARTICLE SCHEMA ═══
Add to every article page — this creates rich snippets in Google:
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  description: article.excerpt,
  image: urlFor(article.heroImage).width(1200).height(675).url(),
  datePublished: article.publishedAt,
  dateModified: article._updatedAt || article.publishedAt,
  author: {
    '@type': 'Person',
    name: article.author?.name,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/author/${article.author?.slug?.current}`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'News Potli',
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/article/${article.slug?.current}`,
  },
  inLanguage: 'hi',
  articleSection: article.category?.titleEn,
}

// In the page JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## ═══ SITEMAP STRUCTURE ═══
File: apps/web/src/app/sitemap.ts
```tsx
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const [articleSlugs, categorySlugs] = await Promise.all([
    client.fetch(`*[_type == "article"] { "slug": slug.current, publishedAt }`),
    client.fetch(`*[_type == "category"] { "slug": slug.current }`),
  ])

  const articleUrls = articleSlugs.map((a: any) => ({
    url: `${baseUrl}/article/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categorySlugs.map((c: any) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...categoryUrls,
    ...articleUrls,
  ]
}
```

## ═══ GOOGLE NEWS SITEMAP ═══
File: apps/web/src/app/api/news-sitemap/route.ts
Critical: Only articles from last 48 hours. Google News IGNORES older articles.
```tsx
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  
  const articles = await client.fetch(`
    *[_type == "article" && publishedAt > $twoDaysAgo] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      "keywords": tags
    }
  `, { twoDaysAgo }, { next: { revalidate: 3600 } })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles.map((a: any) => `  <url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>News Potli</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.publishedAt).toISOString()}</news:publication_date>
      <news:title>${a.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      ${a.keywords?.length ? `<news:keywords>${a.keywords.join(', ')}</news:keywords>` : ''}
    </news:news>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
```

## ═══ GOOGLE ANALYTICS 4 ═══
Add to app/layout.tsx:
```tsx
import Script from 'next/script'

// Inside <body>, after children:
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
  </>
)}
```

## ═══ PERFORMANCE CHECKLIST ═══
Before every deployment, verify:

### Images:
- [ ] All hero images: priority={true}, width/height set
- [ ] All card images: lazy load (default), aspect ratio maintained
- [ ] All Sanity images: use urlFor().format('webp') — never raw CDN URLs
- [ ] No <img> tags anywhere in codebase

### Fonts:
- [ ] All fonts via next/font/google — self-hosted, no external requests
- [ ] display: 'swap' on all font configs
- [ ] Preconnect to Google Fonts removed (next/font handles this)

### Bundle:
- [ ] No heavy client-side libraries (no moment.js, no lodash)
- [ ] react-instantsearch removed (unused)
- [ ] 'use client' only on components that actually need browser APIs

### Network:
- [ ] Preconnect: https://cdn.sanity.io in layout.tsx <head>
- [ ] Preconnect: https://www.youtube.com for video section

### Core Web Vitals:
- [ ] No layout shift from images (always specify width/height)
- [ ] No layout shift from fonts (using next/font)
- [ ] Navbar height: fixed, never causes CLS

## ═══ ROBOTS.TS ═══
```tsx
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL,
  }
}
```

## ═══ GOOGLE SEARCH CONSOLE SUBMISSION ═══
After deployment — do these in order:
1. Go to search.google.com/search-console
2. Add property: newspotli.com (verify via DNS TXT record)
3. Submit sitemap: https://newspotli.com/sitemap.xml
4. Submit News sitemap: https://newspotli.com/api/news-sitemap
5. Request indexing of homepage manually
6. Check Core Web Vitals report after 3-4 days

## ═══ HINDI SEO NOTES ═══
Google indexes Hindi (Devanagari) content natively — treat it like English SEO:
- Use Hindi keywords naturally in article titles (not stuffed)
- Hindi meta descriptions are valid and preferred for Hindi content
- Hreflang not needed unless English edition launches
- Google Search Console shows Hindi queries separately under "India" filter
