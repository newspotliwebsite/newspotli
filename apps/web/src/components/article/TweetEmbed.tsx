'use client'

import { useEffect, useRef } from 'react'

const WIDGETS_SRC = 'https://platform.twitter.com/widgets.js'

interface TwitterWidgets {
  widgets: { load: (el?: HTMLElement) => void }
}

declare global {
  interface Window {
    twttr?: TwitterWidgets
  }
}

// Loads widgets.js once per page, resolving when it's ready. A bare
// <script async> in JSX only executes in server-rendered HTML — on client-side
// navigation React inserts the node without running it, so the tweet would
// stay an unstyled blockquote forever.
function loadWidgets(): Promise<void> {
  return new Promise((resolve) => {
    if (window.twttr?.widgets) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGETS_SRC}"]`
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = WIDGETS_SRC
    script.async = true
    script.addEventListener('load', () => resolve(), { once: true })
    document.body.appendChild(script)
  })
}

export default function TweetEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    loadWidgets().then(() => {
      if (cancelled || !containerRef.current) return
      window.twttr?.widgets.load(containerRef.current)
    })
    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <div ref={containerRef} className="my-8 flex justify-center">
      <blockquote className="twitter-tweet" data-dnt="true">
        <a href={url}>Loading tweet…</a>
      </blockquote>
    </div>
  )
}
