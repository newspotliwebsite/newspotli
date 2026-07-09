interface SanityImageLoaderParams {
  src: string
  width: number
  quality?: number
}

// Custom next/image loader — uses Sanity's CDN transform params instead of
// Vercel's image optimizer, since Sanity already serves resized/compressed
// images and paying for both would be redundant.
export default function sanityImageLoader({ src, width, quality }: SanityImageLoaderParams) {
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', (quality || 75).toString())
    url.searchParams.set('fit', 'max')
    url.searchParams.set('auto', 'format')
    return url.toString()
  }

  // YouTube thumbnails are already served at a fixed, optimized size.
  if (src.includes('ytimg.com') || src.includes('youtube.com')) {
    return src
  }

  // External/local sources with no CDN-side resizing available.
  return src
}
