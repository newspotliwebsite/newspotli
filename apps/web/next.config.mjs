/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async redirects() {
    return [
      // Old WordPress tag pages → homepage
      {
        source: '/tag/:slug*',
        destination: '/',
        permanent: true,
      },
      // Old WordPress category pages (English slugs) → homepage.
      // Explicit allowlist instead of excluding current slugs — safer as
      // categories are renamed/added since a negative-lookahead exclusion
      // silently breaks new/renamed live category slugs.
      {
        source: '/category/:slug(agriculture|farming|climate-change|rural-india|technology|government-schemes|weather|livestock|market|interviews|uncategorized)',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
