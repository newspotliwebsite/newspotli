# News Potli — Master AI Context

## Project
News Potli is India's leading rural agricultural journalism platform.
Founded by Pulitzer Grantee Arvind Shukla. 266K YouTube subscribers, 73M+ views.
Website: newspotli.com | Built by: BuildRocket Labs

## Stack
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- CMS: Sanity.io (project ID in .env)
- Hosting: Vercel
- Search: Algolia
- Images: Cloudinary via Sanity
- Newsletter: Resend API
- Analytics: Google Analytics 4
- YouTube: YouTube Data API v3

## Design System
- Primary: #8B1A1A (maroon/dark red) — journalism authority
- Secondary: #2D5016 (dark green) — agriculture
- Accent: #C8860A (gold) — CTAs, highlights
- Background: #FAF6EE (warm cream)
- Text: #1A1A1A (charcoal)
- Hindi Font: Noto Sans Devanagari
- Headline Font: Playfair Display (serif, editorial)
- Body Font: Source Sans 3

## Editorial Categories (Hindi)
खेती किसानी | पशु पालन | मौसम-बेमौसम | सरकारी योजना |
कमाई की बात | तकनीक से तरक्की | गांव की कहानियां | बाजार

## Rules
1. ALWAYS use TypeScript — no plain JS
2. ALWAYS use Tailwind — no inline styles, no CSS modules
3. ALL text content in Hindi unless specified
4. ALL images via next/image with proper alt text
5. ALL pages must have proper SEO metadata
6. Mobile-first — test at 375px first
7. Revalidation: ISR with revalidate = 60 (articles update every 60s)
8. Never hardcode content — everything from Sanity CMS
9. WhatsApp share must be on every article page
10. Keep bundle size minimal — no heavy libraries

## Sanity GROQ Pattern
Always use this client: import { client } from '@/lib/sanity'
Always use this image builder: import { urlFor } from '@/lib/sanity'
Queries live in: /lib/queries.ts — never inline GROQ in components

## Performance Targets
- LCP under 2.5s on 3G
- CLS under 0.1
- FID under 100ms
- All images: WebP, lazy loaded below fold, eager above fold
