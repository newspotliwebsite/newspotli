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
      // Old WordPress category pages → homepage (excludes current live category slugs)
      {
        source: '/category/:slug((?!kheti-kisani|pashu-palan|mausam-bemaum|sarkari-yojana|kamai-ki-baat|taknik-se-tarakki|gaon-ki-kahaniyan|bazar).+)',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
