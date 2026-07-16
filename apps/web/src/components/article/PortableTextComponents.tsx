/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { PortableTextComponents } from '@portabletext/react'
import TweetEmbed from '@/components/article/TweetEmbed'

// Extract an 11-char YouTube video ID from any common URL format.
function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

// Instagram's /embed/ endpoint needs the post URL with its trailing slash.
// Without this, ".../p/ABC123" + "embed/" would yield ".../p/ABC123embed/".
function instagramEmbedUrl(url: string): string | null {
  const base = url.split('?')[0].replace(/\/+$/, '')
  if (!/^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+$/.test(base)) {
    return null
  }
  return `${base}/embed/`
}

export const articleComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      const url = urlFor(value).width(1200).quality(85).url()
      const caption = value.caption || value.alt
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-lg">
            <Image
              src={url}
              alt={value.alt || value.caption || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-center font-source text-sm text-charcoal/50 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    },
    youtube: ({ value }: { value: { url?: string } }) => {
      if (!value?.url) return null
      const id = youtubeId(value.url)
      if (!id) return null
      return (
        <div className="my-10 aspect-video rounded-sm overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      )
    },
    twitterEmbed: ({ value }: { value: { url?: string } }) => {
      if (!value?.url) return null
      // widgets.js resolves the tweet from the blockquote link, but bail early
      // on URLs that clearly aren't tweets so we don't render a dead embed.
      if (!/\/status\/\d+/.test(value.url)) return null
      return <TweetEmbed url={value.url} />
    },
    facebookEmbed: ({ value }: { value: { url?: string } }) => {
      if (!value?.url) return null
      const src = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
        value.url
      )}&show_text=true&width=500`
      return (
        <div className="my-8 flex justify-center">
          <iframe
            src={src}
            title="Facebook post"
            width={500}
            height={400}
            loading="lazy"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="w-full max-w-[500px] border-0 overflow-hidden"
          />
        </div>
      )
    },
    instagramEmbed: ({ value }: { value: { url?: string } }) => {
      if (!value?.url) return null
      const src = instagramEmbedUrl(value.url)
      if (!src) return null
      return (
        <div className="my-8 flex justify-center">
          <iframe
            src={src}
            title="Instagram post"
            width={400}
            height={500}
            loading="lazy"
            allowFullScreen
            className="w-full max-w-[400px] border-0"
          />
        </div>
      )
    },
  },

  block: {
    h2: ({ children }) => (
      <h2 className="font-noto text-2xl md:text-3xl font-black text-charcoal mt-12 mb-4 leading-snug border-l-4 border-gold pl-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-noto text-xl md:text-2xl font-bold text-charcoal mt-10 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-noto text-lg font-bold text-charcoal mt-8 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-noto text-[17px] leading-[1.85] text-black mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-10 py-6 px-8 border-l-4 border-maroon bg-maroon/[0.04] italic">
        <span className="absolute -top-3 left-4 font-noto text-5xl text-maroon/20 select-none leading-none">&ldquo;</span>
        <div className="font-noto text-lg leading-relaxed text-black">
          {children}
        </div>
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-maroon/80">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    'strike-through': ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[0.9em] bg-charcoal/5 text-maroon px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({ children, value }: { children: any; value?: { href?: string; blank?: boolean } }) => {
      const openNewTab = value?.blank !== false
      return (
        <a
          href={value?.href || '#'}
          target={openNewTab ? '_blank' : undefined}
          rel={openNewTab ? 'noopener noreferrer' : undefined}
          className="text-maroon underline decoration-gold/40 underline-offset-2 hover:decoration-gold hover:text-gold transition-colors"
        >
          {children}
        </a>
      )
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-3 my-6 pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-3 my-6 pl-8 font-noto text-[17px] text-black marker:text-maroon marker:font-bold">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="font-noto text-[17px] text-black leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-gold before:rounded-full">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
}
