# COMPONENT_PATTERNS.md
# Reference for building any new component in News Potli
# Claude Code: read this before creating any new .tsx file

## ═══ ARTICLE CARD PATTERN ═══
Always use the existing ArticleCard.tsx from components/shared/
Import: import ArticleCard from '@/components/shared/ArticleCard'
Props it accepts: { article: Article, variant?: 'featured' | 'regular' | 'compact' }

Never create a new article card from scratch — extend the existing one.

## ═══ PAGE TEMPLATE PATTERN ═══
Every new page.tsx must follow this structure:

```tsx
import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { YOUR_QUERY } from '@/lib/queries'

// 1. ALWAYS add metadata
export const metadata: Metadata = {
  title: 'Page Title | News Potli',
  description: 'Page description in Hindi or English',
}

// 2. For dynamic pages: generateMetadata instead
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await client.fetch(QUERY, { slug: params.slug })
  return {
    title: `${data.title} | News Potli`,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [urlFor(data.heroImage).width(1200).height(630).url()],
    },
  }
}

// 3. ALWAYS server component (no 'use client' at top)
export default async function PageName({ params }) {
  // Fetch in parallel
  const [primary, secondary] = await Promise.all([
    client.fetch(QUERY_1, {}, { next: { revalidate: 60 } }),
    client.fetch(QUERY_2, {}, { next: { revalidate: 60 } }),
  ])

  // Always handle empty state
  if (!primary) return <div>Content not found</div>

  return (
    <main>
      {/* sections */}
    </main>
  )
}

// 4. For SSG pages: always add generateStaticParams
export async function generateStaticParams() {
  const slugs = await client.fetch(ALL_SLUGS_QUERY)
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}
```

## ═══ SECTION WRAPPER PATTERN ═══
Every homepage section should use this wrapper:
```tsx
<section className="py-12 md:py-16 px-4 md:px-8 lg:px-24">
  <div className="max-w-7xl mx-auto">
    {/* section header */}
    <div className="flex items-center justify-between mb-8">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-charcoal">
        Hindi Title <span className="text-maroon">/ English Subtitle</span>
      </h2>
      <a href="/link" className="text-sm font-semibold text-maroon hover:underline">
        सभी देखें →
      </a>
    </div>
    {/* content */}
  </div>
</section>
```

## ═══ DARK SECTION PATTERN ═══
For dark sections (credibility strip, featured videos, newsletter):
```tsx
<section className="bg-charcoal py-12 md:py-16 px-4 md:px-8 lg:px-24">
  <div className="max-w-7xl mx-auto">
    {/* white/cream text on dark background */}
  </div>
</section>
```

## ═══ API ROUTE PATTERN ═══
Every API route must:
1. Validate HTTP method
2. Validate required fields
3. Return consistent JSON structure
4. Use proper HTTP status codes
5. Never expose error details in production

```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate
    if (!body.email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }
    
    // Do the work
    // ...
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[API Error]:', error) // Log for debugging
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## ═══ IMAGE PATTERN ═══
ALWAYS use next/image. Never use <img>.

For Sanity images:
```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// Hero image (above fold) — eager load
<Image
  src={urlFor(article.heroImage).width(1200).height(675).format('webp').url()}
  alt={article.heroImage.alt || article.title}
  width={1200}
  height={675}
  priority // Use on hero/above-fold images only
  className="object-cover w-full h-full"
/>

// Card thumbnail (below fold) — lazy load (default)
<Image
  src={urlFor(article.heroImage).width(400).height(225).format('webp').url()}
  alt={article.heroImage.alt || article.title}
  width={400}
  height={225}
  className="object-cover"
/>
```

## ═══ WHATSAPP SHARE PATTERN ═══
Must be on every article page. This is the #1 share method for rural users.
```tsx
const shareOnWhatsApp = () => {
  const text = `${article.title}\n\nपढ़ें: ${process.env.NEXT_PUBLIC_SITE_URL}/article/${article.slug}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
}

<button
  onClick={shareOnWhatsApp}
  className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded font-semibold text-sm hover:opacity-90"
>
  <svg>/* WhatsApp icon */</svg>
  WhatsApp पर शेयर करें
</button>
```

## ═══ LOADING SKELETON PATTERN ═══
For loading.tsx files:
```tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Mirror the actual page layout with grey boxes */}
      <div className="h-8 bg-charcoal/10 rounded w-3/4 mb-4" />
      <div className="h-4 bg-charcoal/10 rounded w-1/2 mb-2" />
      <div className="grid grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-48 bg-charcoal/10 rounded" />
            <div className="h-4 bg-charcoal/10 rounded" />
            <div className="h-3 bg-charcoal/10 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## ═══ ERROR BOUNDARY PATTERN ═══
```tsx
'use client'
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="font-playfair text-2xl font-bold text-charcoal mb-4">
          कुछ गलत हो गया
        </h2>
        <p className="text-charcoal/60 mb-6">Something went wrong. Please try again.</p>
        <button
          onClick={reset}
          className="bg-maroon text-white px-6 py-3 font-bold hover:bg-maroon-dark"
        >
          दोबारा कोशिश करें
        </button>
      </div>
    </div>
  )
}
```

## ═══ GROQ QUERY NAMING CONVENTION ═══
All queries in lib/queries.ts named as:
  HERO_ARTICLE_QUERY
  LATEST_ARTICLES_QUERY
  ARTICLES_BY_CATEGORY_QUERY
  ARTICLE_BY_SLUG_QUERY
  ALL_ARTICLE_SLUGS_QUERY
  RELATED_ARTICLES_BY_CATEGORY_QUERY
  CATEGORY_LIST_QUERY
  CATEGORY_BY_SLUG_QUERY
  CATEGORY_ARTICLES_QUERY
  ALL_CATEGORY_SLUGS_QUERY
  DEEP_STORIES_QUERY
  AUTHOR_BY_SLUG_QUERY
  ALL_AUTHOR_SLUGS_QUERY
  AUTHOR_ARTICLES_QUERY
  BREAKING_NEWS_QUERY

## ═══ TYPESCRIPT TYPES ═══
Add these types to lib/types.ts (create if not exists):

```tsx
export interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  heroImage: { asset: { _ref: string }, alt: string }
  category: Category
  author: Author
  publishedAt: string
  readTime: number
  featured: boolean
  breakingNews: boolean
  body: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
  youtubeId?: string
}

export interface Category {
  _id: string
  title: string
  titleEn: string
  slug: { current: string }
  description: string
  icon: string
  color: string
  coverImage?: { asset: { _ref: string } }
}

export interface Author {
  _id: string
  name: string
  slug: { current: string }
  bio: string
  photo: { asset: { _ref: string } }
  role: string
  email?: string
}
```
