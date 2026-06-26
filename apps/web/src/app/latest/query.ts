import { groq } from 'next-sanity'

export const PAGE_SIZE = 20

export const LATEST_PAGE_QUERY = groq`*[_type=="article" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{
  _id, title, slug, heroImage, publishedAt, readTime,
  "category": category->{ title, color, slug },
  "author": author->{ name }
}`
