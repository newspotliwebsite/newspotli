import { groq } from 'next-sanity'

// ── Homepage ──
// Every homepage section orders by `publishedAt desc` so new articles surface
// automatically. The hero no longer depends on the `featured` flag: editors
// were leaving it unset, which pinned the carousel to stale stories.

// Hero carousel ("मुख्य खबरें") — latest 4 that actually have a hero image,
// since the carousel is image-led and a missing image looks broken.
export const HOMEPAGE_HERO_QUERY = groq`
  *[_type == "article"
    && defined(publishedAt)
    && defined(slug.current)
    && defined(heroImage.asset)]
    | order(publishedAt desc) [0..3] {
    _id, title, slug, excerpt, heroImage, publishedAt, readTime, breakingNews,
    "category": category->{ title, slug, color, icon },
    "author": author->{ name, photo }
  }
`

// Hero sidebar ("ताज़ा खबरें") — latest across all categories. Over-fetches so
// the page can drop anything already showing in the carousel and still fill 5.
export const HOMEPAGE_LATEST_QUERY = groq`
  *[_type == "article" && defined(publishedAt) && defined(slug.current)]
    | order(publishedAt desc) [0..19] {
    _id, title, slug, excerpt, heroImage, publishedAt, readTime,
    "category": category->{ title, slug, color, icon },
    "author": author->{ name }
  }
`

// Section queries filter by their own category slug. Slugs verified against the
// production dataset — see CLAUDE.md "CONTENT CATEGORIES".
export const HOMEPAGE_SECTION_BY_CATEGORY_QUERY = groq`
  *[_type == "article"
    && defined(publishedAt)
    && defined(slug.current)
    && category->slug.current == $categorySlug]
    | order(publishedAt desc) [0..$limit] {
    _id, title, slug, excerpt, heroImage, publishedAt, readTime,
    "category": category->{ title, slug, color, icon },
    "author": author->{ name }
  }
`

export const HOMEPAGE_MORE_HEADLINES_QUERY = groq`
  *[_type == "article" && defined(publishedAt) && defined(slug.current)]
    | order(publishedAt desc) [0..8] {
    _id, title, slug, publishedAt, heroImage,
    "category": category->{ title, slug, color },
    "author": author->{ name }
  }
`

export const HOMEPAGE_WEB_STORIES_QUERY = groq`
  *[_type == "article"
    && defined(publishedAt)
    && defined(slug.current)
    && defined(heroImage.asset)]
    | order(publishedAt desc) [0..9] {
    _id, title, slug, heroImage, publishedAt,
    "author": author->{ name }
  }
`

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

// Ticker ("ताज़ा खबर") — the latest 10 across every category.
// Previously filtered on `breakingNews == true`, which left the ticker empty
// whenever nobody remembered to tick the box.
export const BREAKING_NEWS_QUERY = groq`
  *[_type == "article" && defined(publishedAt) && defined(slug.current)]
    | order(publishedAt desc) [0..9] {
    _id,
    title,
    slug
  }
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
// Published reads go through `client`, which uses the default `published`
// perspective, so drafts are already excluded. Draft Mode swaps in
// `previewClient` (perspective: previewDrafts) and reuses this same query —
// the perspective, not the filter, decides which documents resolve.
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
    _updatedAt,
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

// ── Author Profile Page ──
export const AUTHOR_BY_SLUG_QUERY = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    role,
    email,
    photo { asset },
    "articleCount": count(*[_type == "article" && references(^._id)]),
    "categories": *[_type == "article" && references(^._id)].category->{
      _id, title, slug, color
    }
  }
`

export const ARTICLES_BY_AUTHOR_QUERY = groq`
  *[_type == "article" && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    heroImage { alt, asset },
    category-> { _id, title, slug, color },
    author-> { _id, name, slug },
    publishedAt,
    readTime,
    youtubeId,
    tags
  }
`

export const ALL_AUTHOR_SLUGS_QUERY = groq`
  *[_type == "author" && defined(slug.current)].slug.current
`
