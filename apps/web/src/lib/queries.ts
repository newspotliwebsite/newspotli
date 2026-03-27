import { groq } from 'next-sanity'

export const LATEST_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) [0..9] {
    _id,
    title,
    slug,
    excerpt,
    heroImage { alt, asset },
    category-> { _id, title, slug, color },
    author-> { _id, name, slug },
    publishedAt,
    readTime,
    featured,
    breakingNews
  }
`

export const ARTICLES_BY_CATEGORY_QUERY = groq`
  *[_type == "article" && category->slug.current == $slug]
`

export const FEATURED_ARTICLE_QUERY = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    excerpt,
    heroImage { alt, asset },
    category-> { _id, title, slug, color },
    author-> { _id, name, slug, role, photo { asset } },
    publishedAt,
    readTime,
    featured,
    breakingNews,
    tags
  }
`

// Alias used by homepage HeroSection
export const HERO_ARTICLE_QUERY = FEATURED_ARTICLE_QUERY

export const SIDEBAR_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) [0..3] {
    _id,
    title,
    slug,
    publishedAt,
    "category": category->{ title, color }
  }
`

export const BREAKING_NEWS_QUERY = groq`
  *[_type == "article" && breakingNews == true] | order(publishedAt desc) [0..4]
`

export const RELATED_ARTICLES_QUERY = groq`
  *[_type == "article" && category._ref == $catId && _id != $currentId] [0..3]
`

export const HOMEPAGE_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    titleEn,
    slug,
    description,
    color,
    icon,
    "storyCount": count(*[_type == "article" && references(^._id)]),
    "latestArticle": *[_type == "article" && references(^._id)] | order(publishedAt desc)[0] {
      title
    }
  }[0..7]
`

// Alias used by homepage CategoriesGrid
export const CATEGORY_LIST_QUERY = HOMEPAGE_CATEGORIES_QUERY

// ── Article Detail Page ──
export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    heroImage { alt, asset },
    category-> { _id, title, slug, color },
    author-> { _id, name, slug, bio, role, photo { asset } },
    tags,
    publishedAt,
    readTime,
    seoTitle,
    seoDescription,
    youtubeId,
    featured,
    deepStory
  }
`

export const ALL_ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current)].slug.current
`

export const RELATED_ARTICLES_BY_CATEGORY_QUERY = groq`
  *[_type == "article" && category._ref == $catId && _id != $currentId] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    excerpt,
    heroImage { alt, asset },
    category-> { title, color },
    author-> { name },
    publishedAt,
    readTime
  }
`

export const DEEP_STORIES_QUERY = groq`
  *[_type == "article" && deepStory == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category-> { title, slug },
    heroImage { alt, asset }
  }[0..4]
`

// ── Category Hub Page ──
export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color,
    "storyCount": count(*[_type == "article" && references(^._id)])
  }
`

export const CATEGORY_ARTICLES_QUERY = groq`
  *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) [$start..$end] {
    _id,
    title,
    slug,
    excerpt,
    heroImage { alt, asset },
    category-> { title, slug, color },
    author-> { name },
    publishedAt,
    readTime
  }
`

export const ALL_CATEGORY_SLUGS_QUERY = groq`
  *[_type == "category" && defined(slug.current)].slug.current
`
