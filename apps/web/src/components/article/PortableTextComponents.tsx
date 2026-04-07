/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { PortableTextComponents } from '@portabletext/react'

export const articleComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      const url = urlFor(value).width(1200).quality(85).url()
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-lg">
            <Image
              src={url}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-3 text-center font-source text-sm text-charcoal/50 italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },

  block: {
    h2: ({ children }) => (
      <h2 className="font-playfair text-2xl md:text-3xl font-black text-charcoal mt-12 mb-4 leading-snug border-l-4 border-gold pl-5">
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
      <p className="font-noto text-[17px] leading-[1.9] text-charcoal/85 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-10 py-6 px-8 border-l-4 border-maroon bg-maroon/[0.04] italic">
        <span className="absolute -top-3 left-4 font-playfair text-5xl text-maroon/20 select-none leading-none">&ldquo;</span>
        <div className="font-noto text-lg leading-relaxed text-charcoal/80">
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
    link: ({ children, value }: { children: any; value?: { href?: string } }) => (
      <a
        href={value?.href || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="text-maroon underline decoration-gold/40 underline-offset-2 hover:decoration-gold hover:text-gold transition-colors"
      >
        {children}
      </a>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-3 my-6 pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-3 my-6 pl-8 font-noto text-[17px] text-charcoal/85 marker:text-maroon marker:font-bold">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="font-noto text-[17px] text-charcoal/85 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-2 before:h-2 before:bg-gold before:rounded-full">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
}
