# News Potli — Claude Code Master Context
# This file is READ AUTOMATICALLY by Claude Code at every session start.
# DO NOT DELETE. DO NOT MOVE FROM ROOT.

## ═══ WHO WE ARE ═══
News Potli is India's #1 rural agricultural journalism platform.
- Founder: Arvind Shukla — Pulitzer Grantee, 18+ years journalism, Lucknow UP
- YouTube: 266K+ subscribers, 73M+ views, 1,666 videos
- Built by: BuildRocket Labs (Prajwal) | Client contact: Jayant Mishra
- Live URL (target): https://newspotli.com
- Local path: /Users/prajwal/Desktop/buildrocket-labs/newspotli/WEBSITE1

## ═══ PROJECT STRUCTURE ═══
WEBSITE1/
├── apps/web/          ← Next.js 14 frontend (YOUR MAIN WORKSPACE)
│   └── src/
│       ├── app/       ← App Router pages
│       ├── components/← UI components (Header, Footer, etc.)
│       └── lib/       ← sanity.ts, queries.ts, algolia.ts, youtube.ts
├── apps/studio/       ← Sanity CMS studio
├── scripts/           ← Migration scripts
├── CLAUDE.md          ← This file (auto-loaded)
├── DESIGN_SYSTEM.md   ← Colors, fonts, spacing (always reference this)
├── SANITY_SCHEMA.md   ← All CMS schemas and GROQ patterns
└── .env.local         ← All API keys (never commit, never log)

## ═══ TECH STACK ═══
- Framework: Next.js 14.2.35 (App Router, TypeScript strict)
- Styling: Tailwind CSS ONLY — no inline styles, no CSS modules ever
- CMS: Sanity.io (project: a86sthtc, dataset: production)
- Search: Algolia (algoliasearch v5)
- Newsletter: Resend API
- Images: next/image + @sanity/image-url (urlFor)
- Hosting: Vercel (region: bom1 Mumbai)
- Analytics: GA4

## ═══ ABSOLUTE CODING RULES ═══
These are non-negotiable. Follow every single one on every file you touch:

1. TypeScript STRICT — no `any`, no `as unknown`, no `// @ts-ignore`
2. Tailwind ONLY — zero inline styles, zero CSS modules, zero styled-components
3. Server Components by default — only add 'use client' when you actually need it
4. next/image for EVERY image — never <img> tags, ever
5. All data from Sanity — zero hardcoded article/author/category content
6. ISR on all data pages — revalidate: 60 (articles refresh every 60 seconds)
7. Mobile first — write sm: before md: before lg: in every Tailwind class
8. Hindi font = Noto Sans Devanagari class, headline = Playfair Display class
9. Error boundaries on every page — graceful empty states, never crash
10. Never log API keys, tokens, or secrets to console
11. GROQ queries live in lib/queries.ts ONLY — never inline in components
12. Always use Promise.all() for parallel Sanity fetches — never sequential awaits
13. All API routes: validate input, return proper HTTP status codes
14. generateMetadata on every dynamic page — SEO is not optional

## ═══ DESIGN SYSTEM (QUICK REF) ═══
Colors (defined in tailwind.config.ts):
  maroon:  #8B1A1A (primary — journalism authority)
  green:   #2D5016 (agriculture)
  gold:    #C8860A (CTAs, accents, highlights)
  cream:   #FAF6EE (backgrounds)
  charcoal:#1A1A1A (text, dark sections)

Fonts:
  font-playfair   → Playfair Display (headlines, hero text)
  font-devanagari → Noto Sans Devanagari (all Hindi body text)
  font-sans       → Source Sans 3 (English body, UI)

Key patterns:
  Section padding: py-12 md:py-16 px-4 md:px-8 lg:px-24
  Card gap: gap-4 md:gap-6
  Primary button: bg-maroon text-white px-6 py-3 font-bold hover:bg-maroon-dark
  Gold CTA: bg-gold text-white px-6 py-3 font-bold hover:opacity-90

## ═══ SANITY PATTERNS ═══
Import client:    import { client } from '@/lib/sanity'
Import urlFor:    import { urlFor } from '@/lib/sanity'
Import queries:   import { QUERY_NAME } from '@/lib/queries'
Write client:     import { writeClient } from '@/lib/sanity'

Standard fetch pattern (server component):
  const data = await client.fetch(QUERY, params, { next: { revalidate: 60 } })

Parallel fetch pattern (use this always when fetching 2+ things):
  const [hero, latest, categories] = await Promise.all([
    client.fetch(HERO_ARTICLE_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(LATEST_ARTICLES_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(CATEGORY_LIST_QUERY, {}, { next: { revalidate: 60 } }),
  ])

Image pattern:
  <Image src={urlFor(image).width(800).format('webp').url()} ... />

## ═══ VISUAL ASSET STATUS (March 2026) ═══
HAVE: NP logo (3 variants PNG), Escorts Kubota logo, IFFCO logo, Taqniki Se Taraqqi illustration
PENDING: Team photos, Arvind photo, SVG logos, 7 partner logos, field journalism photos

## ═══ IMAGE UTILITY FUNCTION ═══
Always use getArticleImage(article) from lib/utils.ts
NEVER use article.heroImage directly in components.
This function handles all fallbacks automatically.

## ═══ PLACEHOLDER FOLDER STRUCTURE ═══
public/images/
  placeholders/
    farming.jpg       ← खेती किसानी
    livestock.jpg     ← पशु पालन
    weather.jpg       ← मौसम
    market.jpg        ← बाजार
    village.jpg       ← गांव की कहानियां
    technology.jpg    ← तकनीक
    schemes.jpg       ← सरकारी योजना
    business.jpg      ← कमाई की बात
  team/
    arvind-shukla.jpg   (PENDING)
    jayant-mishra.jpg   (PENDING)
  partners/
    escorts-kubota.png  ✅
    iffco.png           ✅
    [others pending — use text pills]
  og-default.jpg      ← Generate from NP logo

## ═══ WHAT'S ALREADY BUILT (DON'T REBUILD) ═══
✅ Header.tsx — sticky, nav, search, mobile menu
✅ Footer.tsx — 4 column, social links, newsletter
✅ BreakingTicker.tsx — animated marquee
✅ HeroSection.tsx — full-bleed hero (needs Sanity wiring)
✅ LatestNewsGrid.tsx — article grid (needs Sanity wiring)
✅ FeaturedVideos.tsx — YouTube section (needs real API key)
✅ CategoriesGrid.tsx — 8 category cards
✅ NewsletterBanner.tsx — email capture
✅ DeepStories.tsx — long-form stories section
✅ ArticleCard.tsx — reusable card
✅ PortableTextComponents.tsx — rich text renderer
✅ SocialShareBar.tsx — WhatsApp + social share
✅ SearchBar.tsx — ⌘K Algolia overlay
✅ app/article/[slug]/page.tsx — article detail (SSG)
✅ app/category/[slug]/page.tsx — category hub
✅ app/search/page.tsx — search results
✅ api/newsletter/route.ts — Resend integration
✅ api/algolia-sync/route.ts — Algolia indexing
✅ lib/sanity.ts, lib/queries.ts, lib/algolia.ts, lib/youtube.ts

## ═══ WHAT NEEDS TO BE BUILT (YOUR TODO) ═══
✅ DONE: Wire all Sanity GROQ queries to homepage page.tsx
✅ DONE: Add charcoal to tailwind.config.ts colors
✅ DONE: api/revalidate/route.ts — Sanity webhook handler
✅ DONE: app/sitemap.ts — dynamic XML sitemap
✅ DONE: app/robots.ts — robots.txt
✅ DONE: api/news-sitemap/route.ts — Google News XML
✅ DONE: GA4 in app/layout.tsx
✅ DONE: generateMetadata on article + category pages
✅ DONE: writeClient in lib/sanity.ts
✅ DONE: newsletter audienceId wired to RESEND_AUDIENCE_ID
✅ DONE: @sanity/image-url → createImageUrlBuilder
✅ DONE: react-instantsearch removed
🟡 app/author/[slug]/page.tsx — author profile
🟡 scripts/migrate.ts — bulk content migration
🟡 app/not-found.tsx — custom 404
🟡 app/loading.tsx — global skeleton
🟡 lib/utils.ts — getArticleImage() fallback utility

## ═══ ENVIRONMENT VARIABLES ═══
NEXT_PUBLIC_SANITY_PROJECT_ID = a86sthtc
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = [in .env.local — use for writeClient]
SANITY_REVALIDATE_SECRET = [in .env.local — validate in /api/revalidate]
NEXT_PUBLIC_ALGOLIA_APP_ID = HRU4MZSZBK
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY = [in .env.local]
ALGOLIA_ADMIN_KEY = [in .env.local — server only, never NEXT_PUBLIC_]
YOUTUBE_API_KEY = [PENDING — not yet obtained]
YOUTUBE_CHANNEL_ID = [PENDING — News Potli channel ID]
RESEND_API_KEY = [in .env.local]
RESEND_AUDIENCE_ID = [PENDING — create in Resend dashboard]
NEXT_PUBLIC_GA_MEASUREMENT_ID = [PENDING — create GA4 property]
NEXT_PUBLIC_SITE_URL = https://newspotli.com

## ═══ PERFORMANCE TARGETS ═══
These must pass before deployment:
- Lighthouse Performance: 90+ (especially on mobile 3G simulation)
- Lighthouse SEO: 100
- Lighthouse Accessibility: 90+
- LCP (Largest Contentful Paint): under 2.5s
- CLS (Cumulative Layout Shift): under 0.1
- Hero image: priority={true}, no lazy load
- All below-fold images: lazy={true} (default)
- Preconnect: fonts.googleapis.com, fonts.gstatic.com

## ═══ DEPLOYMENT ═══
Platform: Vercel
Region: bom1 (Mumbai — closest to Indian users)
GitHub: push to main branch = auto-deploy
Preview URLs: every branch gets newspotli-[hash].vercel.app
Domain: newspotli.com → point to Vercel after client approval

vercel.json:
{
  "buildCommand": "cd apps/web && npm run build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "cd apps/web && npm install",
  "framework": "nextjs",
  "regions": ["bom1"]
}

## ═══ SANITY WEBHOOK ═══
When article published in Sanity → POST to /api/revalidate
Header: Authorization: Bearer [SANITY_REVALIDATE_SECRET]
This triggers ISR revalidation → article live on site in 60 seconds

## ═══ CONTENT CATEGORIES ═══
Hindi slug → English name:
  kheti-kisani      → Farming & Agriculture
  pashu-palan       → Livestock & Dairy  
  mausam-bemaum     → Weather & Climate
  sarkari-yojana    → Government Schemes
  kamai-ki-baat     → Agri Business
  taknik-se-tarakki → Agro-Technology
  gaon-ki-kahaniyan → Village Stories
  bazar             → Market Prices

## ═══ BUSINESS CONTEXT (FOR SMART DECISIONS) ═══
- Primary audience: farmers in rural UP, Maharashtra, MP — on Android phones, 3G
- Secondary: policy makers, NGOs, journalists, sponsors
- Revenue: sponsored content, partnerships (World Bank, BCG, Jain Irrigation etc.)
- Most important feature for audience: WhatsApp share on every article
- Most important feature for revenue: partner/advertise page
- Build for: farmer on ₹6000 phone, 3G connection, Hindi as first language

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
