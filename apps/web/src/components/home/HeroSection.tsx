import Link from 'next/link'
import Image from 'next/image'
import { getArticleImage, timeAgo } from '@/lib/utils'

interface FeaturedArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  heroImage?: { alt?: string; asset?: { _ref: string } }
  publishedAt: string
  readTime?: number
  category?: { title: string; slug?: { current: string }; color?: string }
  author?: { name: string; photo?: { asset?: { _ref: string } } }
}

interface SidebarArticle {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  heroImage?: { alt?: string; asset?: { _ref: string } }
  category?: { title: string; color?: string; slug?: { current: string } }
  author?: { name: string }
}

interface HeroSectionProps {
  featuredArticle: FeaturedArticle | null
  sidebarArticles: SidebarArticle[]
}

export default function HeroSection({ featuredArticle, sidebarArticles }: HeroSectionProps) {
  if (!featuredArticle) return null

  const featuredUrl = `/article/${featuredArticle.slug.current}`
  const featuredImage = getArticleImage(featuredArticle, { width: 1200, height: 800, quality: 85 })

  return (
    <section className="bg-white py-10 md:py-14 px-4 md:px-8 lg:px-12">
      <div className="max-w-site mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_50%_25%] gap-6 lg:gap-8">

          {/* LEFT — ताज़ा खबरें */}
          <aside aria-labelledby="latest-label" className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-5 border-b border-[#e8e0d0] pb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
              <h2 id="latest-label" className="font-source text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                ताज़ा खबरें
              </h2>
            </div>

            <ul className="space-y-5">
              {sidebarArticles.slice(0, 4).map((article) => {
                const thumb = getArticleImage(article, { width: 240, height: 160 })
                return (
                  <li key={article._id}>
                    <Link
                      href={`/article/${article.slug.current}`}
                      className="group flex gap-3 items-start"
                    >
                      <div className="relative w-[110px] h-[74px] rounded-md overflow-hidden bg-cream-dark flex-shrink-0">
                        <Image
                          src={thumb}
                          alt={article.heroImage?.alt || article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="110px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-source text-[10px] font-bold uppercase tracking-wider text-gold mb-1">
                          फ़ीचर स्टोरी
                        </span>
                        <h3 className="font-noto text-sm font-bold leading-snug text-charcoal line-clamp-3 group-hover:text-maroon transition-colors">
                          {article.title}
                        </h3>
                        <p className="mt-1.5 font-source text-[11px] text-charcoal/60">
                          {article.author?.name || 'News Potli'}
                          <span className="mx-1.5">•</span>
                          {timeAgo(article.publishedAt)}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* CENTER — सुर्खियां (featured) */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-5 border-b border-[#e8e0d0] pb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
              <h2 className="font-source text-xs font-bold uppercase tracking-[0.15em] text-maroon">
                सुर्खियां
              </h2>
            </div>

            <Link
              href={featuredUrl}
              className="group block relative aspect-[16/10] rounded-lg overflow-hidden bg-cream-dark"
            >
              <Image
                src={featuredImage}
                alt={featuredArticle.heroImage?.alt || featuredArticle.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
                {featuredArticle.category && (
                  <span className="inline-block rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-3">
                    {featuredArticle.category.title}
                  </span>
                )}
                <h3 className="font-noto text-2xl md:text-3xl lg:text-[28px] font-bold leading-[1.25] mb-3">
                  {featuredArticle.title}
                </h3>
                <p className="font-source text-xs md:text-sm text-white/85">
                  {featuredArticle.author?.name || 'News Potli'}
                  <span className="mx-2">•</span>
                  {timeAgo(featuredArticle.publishedAt)}
                </p>
              </div>
            </Link>
          </div>

          {/* RIGHT — Subscribe + Donate */}
          <aside className="order-3 space-y-5">
            <div className="bg-charcoal text-white rounded-lg p-6">
              <h3 className="font-noto text-xl font-bold mb-3">
                सब्सक्राइब
              </h3>
              <p className="font-noto text-sm text-white/80 leading-relaxed mb-5">
                ग्रामीण भारत की सच्ची खबरें और प्रेरणादायक कहानियों से जुड़े रहें।
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-1.5 bg-white text-charcoal px-5 py-2.5 rounded-full font-source font-semibold text-sm hover:bg-cream transition-colors"
              >
                न्यूज़लेटर
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="bg-maroon text-white rounded-lg p-6">
              <h3 className="font-noto text-xl font-bold mb-3">
                हम स्वतंत्र पत्रकारिता में विश्वास करते हैं।
              </h3>
              <p className="font-noto text-sm text-white/85 leading-relaxed mb-5">
                आपका सहयोग हमें मजबूत बनाता है। News Potli को बनाए रखें।
              </p>
              <Link
                href="/sahyog"
                className="inline-flex items-center gap-1.5 bg-white text-maroon px-5 py-2.5 rounded-full font-source font-semibold text-sm hover:bg-cream transition-colors"
              >
                डोनेट
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
