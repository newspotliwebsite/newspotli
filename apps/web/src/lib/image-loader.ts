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
    // No layout on this site renders an image wider than 1200px — cap it so a
    // wide/high-DPR viewport doesn't push Next's deviceSizes up to 3840.
    const cappedWidth = Math.min(width, 1200)
    const url = new URL(src)
    url.searchParams.set('w', cappedWidth.toString())
    url.searchParams.set('q', (quality || 65).toString())
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
