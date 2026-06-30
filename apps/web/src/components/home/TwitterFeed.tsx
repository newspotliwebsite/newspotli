import Link from 'next/link'

interface FeedArticle {
  _id: string
  title: string
  slug: { current: string }
}

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function TwitterFeed({ articles = [] }: { articles?: FeedArticle[] }) {
  const headlines = articles.filter((a) => a?.slug?.current).slice(0, 3)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 border-b border-[#e8e0d0] pb-3">
        <XLogo className="w-4 h-4 text-charcoal/60" />
        <h2 className="font-source text-sm font-bold text-charcoal">X / Twitter</h2>
        <a
          href="https://x.com/PotliNews"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto font-source text-xs text-charcoal/50 hover:text-maroon transition-colors"
        >
          @PotliNews
        </a>
      </div>

      {/* Follow card */}
      <div className="rounded-xl border border-[#e8e0d0] bg-cream/40 p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal">
          <XLogo className="h-7 w-7 text-white" />
        </div>
        <p className="font-source text-base font-bold text-charcoal">@PotliNews</p>
        <p className="mt-2 font-noto text-sm text-charcoal/60 leading-relaxed">
          ताज़ा अपडेट्स के लिए फॉलो करें
        </p>
        <a
          href="https://x.com/PotliNews"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-2.5 font-source text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Follow on X
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Latest headlines */}
      {headlines.length > 0 && (
        <div className="mt-6">
          <p className="font-source text-xs uppercase tracking-wider text-charcoal/40 mb-3">
            Also on our website:
          </p>
          <ul className="space-y-3">
            {headlines.map((article) => (
              <li key={article._id}>
                <Link
                  href={`/article/${article.slug.current}`}
                  className="group flex gap-2 items-start"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-maroon" />
                  <span className="font-noto text-sm leading-snug text-charcoal line-clamp-2 group-hover:text-maroon transition-colors">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
