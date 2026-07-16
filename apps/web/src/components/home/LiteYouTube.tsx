'use client'

import { useState } from 'react'
import Image from 'next/image'

interface LiteYouTubeProps {
  videoId: string
  title: string
  thumbnailUrl: string
}

// A YouTube embed costs ~450KB of player JS before the visitor has decided they
// want to watch anything. On the 3G Android this site targets, that competed
// with the article content for bandwidth. Show the poster frame instead and
// only mount the iframe once someone actually asks to play.
export default function LiteYouTube({ videoId, title, thumbnailUrl }: LiteYouTubeProps) {
  const [activated, setActivated] = useState(false)

  if (activated) {
    return (
      <iframe
        // autoplay=1 because reaching this state required a click — without it
        // the visitor would have to press play a second time.
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`चलाएं: ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          // Decorative: the button's aria-label already announces the title, and
          // the same title is repeated as a heading directly below.
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      )}

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#FF0000] shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:bg-[#CC0000]">
          <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="ml-1 h-8 w-8">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
