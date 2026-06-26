'use client'

import { useEffect } from 'react'

export default function TwitterFeed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      try {
        document.body.removeChild(script)
      } catch {
        /* script already removed */
      }
    }
  }, [])

  return (
    <div className="max-h-[500px] overflow-y-auto scrollbar-none">
      <a
        className="twitter-timeline"
        href="https://twitter.com/PotliNews"
        data-tweet-limit="5"
        data-chrome="noheader nofooter noborders transparent"
        data-dnt="true"
      >
        Loading tweets...
      </a>
    </div>
  )
}
