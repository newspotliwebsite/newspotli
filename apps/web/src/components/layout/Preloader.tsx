'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Preloader() {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-cream flex items-center justify-center"
      style={{ animation: 'preloaderFade 1s ease-out forwards' }}
      onAnimationEnd={() => setHidden(true)}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/logos/logo-hindi.png"
          alt=""
          width={80}
          height={80}
          priority
          className="w-20 h-20 object-contain"
        />
        <div className="relative h-[2px] w-32 overflow-hidden rounded-full bg-maroon/15">
          <div
            className="absolute inset-y-0 left-0 bg-maroon"
            style={{ animation: 'preloaderBar 0.8s ease-out forwards' }}
          />
        </div>
      </div>
    </div>
  )
}
