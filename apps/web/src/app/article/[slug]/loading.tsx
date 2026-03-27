// Article page loading skeleton — shown while article data is fetching from Sanity
export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-[#faf7f0]" aria-hidden="true">

      {/* Header skeleton */}
      <div className="bg-charcoal h-[52px] w-full" />
      <div className="bg-white border-b border-charcoal/8 h-[56px] w-full" />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-2 flex gap-2 items-center">
        <div className="h-2.5 w-10 bg-charcoal/10 rounded-full" />
        <div className="h-2.5 w-2 bg-charcoal/8 rounded-full" />
        <div className="h-2.5 w-20 bg-charcoal/10 rounded-full" />
        <div className="h-2.5 w-2 bg-charcoal/8 rounded-full" />
        <div className="h-2.5 w-40 bg-charcoal/10 rounded-full" />
      </div>

      {/* Article header area */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mb-8 space-y-5">
        {/* Category tag */}
        <div className="h-6 w-28 bg-maroon/15 rounded-sm" />

        {/* Title — 3 lines */}
        <div className="space-y-3">
          <div className="h-9 bg-charcoal/10 rounded-sm w-full shimmer-el" />
          <div className="h-9 bg-charcoal/10 rounded-sm w-11/12 shimmer-el" />
          <div className="h-9 bg-charcoal/10 rounded-sm w-3/4 shimmer-el" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-charcoal/8 rounded-full w-full shimmer-el" />
          <div className="h-4 bg-charcoal/8 rounded-full w-5/6 shimmer-el" />
        </div>

        {/* Author row */}
        <div className="flex items-center gap-4 py-4 border-y border-charcoal/8">
          <div className="w-12 h-12 rounded-full bg-charcoal/10 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-charcoal/10 rounded-full w-36 shimmer-el" />
            <div className="h-2.5 bg-charcoal/8 rounded-full w-48 shimmer-el" />
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12">
        <div className="relative w-full aspect-video bg-charcoal/8 rounded-sm overflow-hidden shimmer-el" />
      </div>

      {/* Article body — paragraph skeletons */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-8">
        {/* Para 1 */}
        <div className="space-y-2.5">
          {[100, 95, 90, 85, 60].map((w, i) => (
            <div key={i} className={`h-4 bg-charcoal/8 rounded-full shimmer-el`} style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Pull-quote skeleton */}
        <div className="border-l-4 border-maroon/25 pl-6 py-2 space-y-2">
          <div className="h-5 bg-charcoal/8 rounded-full w-full shimmer-el" />
          <div className="h-5 bg-charcoal/8 rounded-full w-4/5 shimmer-el" />
        </div>

        {/* Para 2 */}
        <div className="space-y-2.5">
          {[100, 88, 92, 70].map((w, i) => (
            <div key={i} className="h-4 bg-charcoal/8 rounded-full shimmer-el" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* H2 skeleton */}
        <div className="h-7 bg-charcoal/10 rounded-sm w-2/3 shimmer-el" />

        {/* Para 3 */}
        <div className="space-y-2.5">
          {[100, 95, 80, 55].map((w, i) => (
            <div key={i} className="h-4 bg-charcoal/8 rounded-full shimmer-el" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Author box skeleton */}
        <div className="mt-16 bg-white border border-charcoal/8 p-6 flex gap-5 rounded-sm">
          <div className="w-20 h-20 rounded-full bg-charcoal/10 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-3 bg-charcoal/8 rounded-full w-32 shimmer-el" />
            <div className="h-5 bg-charcoal/12 rounded-sm w-44 shimmer-el" />
            <div className="space-y-1.5">
              <div className="h-3 bg-charcoal/8 rounded-full w-full shimmer-el" />
              <div className="h-3 bg-charcoal/8 rounded-full w-5/6 shimmer-el" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shimmer-el {
          background: linear-gradient(
            90deg,
            rgba(26,26,26,0.07) 0%,
            rgba(26,26,26,0.04) 40%,
            rgba(255,255,255,0.5) 55%,
            rgba(26,26,26,0.04) 70%,
            rgba(26,26,26,0.07) 100%
          );
          background-size: 300% 100%;
          animation: shimmer-anim 1.8s ease-in-out infinite;
        }
        @keyframes shimmer-anim {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  )
}
