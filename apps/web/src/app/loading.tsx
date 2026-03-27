// Global loading skeleton — mimics homepage layout with shimmer animation
// Next.js automatically shows this while server components on / are loading

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream animate-pulse" aria-hidden="true">

      {/* ── Header Skeleton ── */}
      <div className="bg-charcoal h-[52px] w-full" />
      <div className="bg-white border-b border-charcoal/8 h-[56px] w-full" />

      {/* ── Hero Skeleton ── */}
      <div className="bg-maroon/10 relative overflow-hidden">
        {/* shimmer sweep */}
        <div className="absolute inset-0 shimmer" />
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main hero card */}
          <div className="lg:col-span-2 bg-charcoal/8 rounded-sm h-[340px] md:h-[420px] relative overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
          {/* Side stories */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 bg-charcoal/6 rounded-sm p-3 relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
                <div className="w-20 h-16 bg-charcoal/12 rounded-sm flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2.5 bg-charcoal/10 rounded-full w-3/4" />
                  <div className="h-2.5 bg-charcoal/10 rounded-full w-full" />
                  <div className="h-2.5 bg-charcoal/10 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Breaking News Ticker Skeleton ── */}
      <div className="bg-maroon h-9 w-full" />

      {/* ── Article Cards Grid Skeleton ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-6 bg-charcoal/15 rounded-full" />
          <div className="h-5 bg-charcoal/10 rounded-full w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-charcoal/8 rounded-sm overflow-hidden relative">
              <div className="absolute inset-0 shimmer" />
              {/* Thumbnail */}
              <div className="aspect-video bg-charcoal/8" />
              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="h-2 bg-charcoal/10 rounded-full w-1/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-charcoal/12 rounded-full w-full" />
                  <div className="h-3 bg-charcoal/12 rounded-full w-5/6" />
                  <div className="h-3 bg-charcoal/10 rounded-full w-3/4" />
                </div>
                <div className="flex gap-2 pt-1">
                  <div className="h-2 bg-charcoal/8 rounded-full w-16" />
                  <div className="h-2 bg-charcoal/8 rounded-full w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer keyframe inlined via style tag */}
      <style>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.45) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  )
}
