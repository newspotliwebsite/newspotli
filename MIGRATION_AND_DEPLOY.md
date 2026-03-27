# MIGRATION_AND_DEPLOY.md
# Claude Code: read this for content migration, deployment, and DevOps tasks
# News Potli — 1500 articles need migrating. Deployment must be zero-downtime.

## ═══ CONTENT MIGRATION OVERVIEW ═══
Goal: Migrate 1500+ existing News Potli articles into Sanity CMS
Source: JSON file at scripts/articles.json
Tool: scripts/migrate.ts (Node.js, TypeScript, tsx runner)
Client: writeClient from lib/sanity.ts (uses SANITY_API_TOKEN)

## ═══ MIGRATION SCRIPT SPEC ═══
File: WEBSITE1/scripts/migrate.ts

Full working script:
```tsx
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import https from 'https'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

interface RawArticle {
  title: string
  body: string          // HTML or plain text
  excerpt: string
  category: string      // Hindi slug e.g. "kheti-kisani"
  authorName: string
  publishedAt: string   // ISO date string
  imageUrl?: string     // Remote image URL (optional)
  tags?: string[]
}

const isDryRun = process.argv.includes('--dry-run')
const limitArg = process.argv.find(a => a.startsWith('--limit='))
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity

async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks: Buffer[] = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function getOrCreateAuthor(name: string): Promise<string> {
  const existing = await client.fetch(
    `*[_type == "author" && name == $name][0]._id`,
    { name }
  )
  if (existing) return existing

  const author = await client.create({
    _type: 'author',
    name,
    slug: { current: name.toLowerCase().replace(/\s+/g, '-') },
    bio: '',
    role: 'Journalist',
  })
  return author._id
}

async function getOrCreateCategory(slug: string): Promise<string> {
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]._id`,
    { slug }
  )
  if (existing) return existing

  // Map known categories
  const categoryMap: Record<string, { title: string; titleEn: string; icon: string }> = {
    'kheti-kisani': { title: 'खेती किसानी', titleEn: 'Farming', icon: '🌾' },
    'pashu-palan': { title: 'पशु पालन', titleEn: 'Livestock', icon: '🐄' },
    'mausam-bemaum': { title: 'मौसम-बेमौसम', titleEn: 'Weather', icon: '🌤️' },
    'sarkari-yojana': { title: 'सरकारी योजना', titleEn: 'Govt Schemes', icon: '📋' },
    'kamai-ki-baat': { title: 'कमाई की बात', titleEn: 'Agri Business', icon: '💰' },
    'taknik-se-tarakki': { title: 'तकनीक से तरक्की', titleEn: 'Agro-Tech', icon: '🔬' },
    'gaon-ki-kahaniyan': { title: 'गांव की कहानियां', titleEn: 'Village Stories', icon: '🏘️' },
    'bazar': { title: 'बाजार', titleEn: 'Market', icon: '📊' },
  }

  const cat = categoryMap[slug] || { title: slug, titleEn: slug, icon: '📰' }

  const category = await client.create({
    _type: 'category',
    ...cat,
    slug: { current: slug },
    description: '',
  })
  return category._id
}

async function migrateArticle(raw: RawArticle, index: number, total: number): Promise<boolean> {
  const label = `${index + 1}/${total} — ${raw.title.substring(0, 50)}`
  
  try {
    if (isDryRun) {
      console.log(`🔍 DRY RUN ${label}`)
      return true
    }

    // 1. Get/create author and category
    const [authorId, categoryId] = await Promise.all([
      getOrCreateAuthor(raw.authorName),
      getOrCreateCategory(raw.category),
    ])

    // 2. Upload image if provided
    let heroImageAsset = null
    if (raw.imageUrl) {
      try {
        const imageBuffer = await downloadImage(raw.imageUrl)
        const imageAsset = await client.assets.upload('image', imageBuffer, {
          filename: `article-${index}.jpg`,
          contentType: 'image/jpeg',
        })
        heroImageAsset = {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAsset._id },
          alt: raw.title,
        }
      } catch (imgErr) {
        console.warn(`⚠️  Image failed for ${label}, skipping image`)
      }
    }

    // 3. Convert body to simple portable text blocks
    const bodyBlocks = raw.body.split('\n\n').filter(Boolean).map((para, i) => ({
      _key: `block${i}`,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _key: `span${i}`, _type: 'span', marks: [], text: para.trim() }],
    }))

    // 4. Create article
    const slug = raw.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 96)

    await client.create({
      _type: 'article',
      title: raw.title,
      slug: { current: slug },
      excerpt: raw.excerpt || raw.body.substring(0, 200),
      body: bodyBlocks,
      ...(heroImageAsset ? { heroImage: heroImageAsset } : {}),
      author: { _type: 'reference', _ref: authorId },
      category: { _type: 'reference', _ref: categoryId },
      tags: raw.tags || [],
      publishedAt: raw.publishedAt,
      featured: false,
      breakingNews: false,
    })

    console.log(`✅ ${label}`)
    return true
  } catch (err: any) {
    console.error(`❌ ${label} — ${err.message}`)
    return false
  }
}

async function main() {
  const articlesPath = path.join(__dirname, 'articles.json')
  
  if (!fs.existsSync(articlesPath)) {
    console.error('❌ scripts/articles.json not found!')
    process.exit(1)
  }

  const rawArticles: RawArticle[] = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))
  const articles = rawArticles.slice(0, limit)
  const total = articles.length

  console.log(`\n📦 News Potli Migration`)
  console.log(`   Total: ${total} articles`)
  console.log(`   Mode: ${isDryRun ? 'DRY RUN (no writes)' : 'LIVE'}`)
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}\n`)

  let success = 0
  let failed = 0

  for (let i = 0; i < articles.length; i++) {
    const ok = await migrateArticle(articles[i], i, total)
    ok ? success++ : failed++
    await new Promise(r => setTimeout(r, 200)) // Rate limit: 200ms between requests
  }

  console.log(`\n═══ Migration Complete ═══`)
  console.log(`✅ Success: ${success}`)
  console.log(`❌ Failed:  ${failed}`)
  console.log(`📊 Total:   ${total}`)
}

main().catch(console.error)
```

## ═══ SAMPLE ARTICLES.JSON FORMAT ═══
Create scripts/articles.json with this structure:
```json
[
  {
    "title": "धान की फसल में लगने वाले प्रमुख रोग और उनका उपचार",
    "body": "धान की फसल में कई प्रकार के रोग लग सकते हैं जो उत्पादन को प्रभावित करते हैं।\n\nब्लास्ट रोग सबसे आम है जो फंगस के कारण होता है।",
    "excerpt": "धान की फसल में लगने वाले प्रमुख रोगों की पहचान और उनके उपचार के तरीके।",
    "category": "kheti-kisani",
    "authorName": "Pooja Rai",
    "publishedAt": "2026-01-15T10:00:00Z",
    "imageUrl": "https://example.com/image.jpg",
    "tags": ["धान", "फसल रोग", "कीटनाशक"]
  }
]
```

## ═══ MIGRATION COMMANDS ═══
Add to apps/web/package.json scripts section:
```json
"migrate:dry": "cd ../../ && npx tsx scripts/migrate.ts --dry-run --limit=3",
"migrate:test": "cd ../../ && npx tsx scripts/migrate.ts --limit=5",
"migrate:full": "cd ../../ && npx tsx scripts/migrate.ts"
```

Run order:
1. npm run migrate:dry      ← Always first. See what would happen.
2. npm run migrate:test     ← Import 5 articles. Check in Sanity studio.
3. npm run migrate:full     ← Only after test passes. Full 1500.

## ═══ VERCEL DEPLOYMENT ═══

### vercel.json (root of WEBSITE1/):
```json
{
  "buildCommand": "cd apps/web && npm install && npm run build",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs",
  "regions": ["bom1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Environment Variables to add in Vercel Dashboard:
(Settings → Environment Variables → Add all from .env.local)
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN
- SANITY_REVALIDATE_SECRET
- NEXT_PUBLIC_ALGOLIA_APP_ID
- NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
- ALGOLIA_ADMIN_KEY
- YOUTUBE_API_KEY
- YOUTUBE_CHANNEL_ID
- RESEND_API_KEY
- RESEND_AUDIENCE_ID
- NEXT_PUBLIC_GA_MEASUREMENT_ID
- NEXT_PUBLIC_SITE_URL=https://newspotli.com

### Deploy commands:
```bash
git init
echo "node_modules/\n.next/\n.env.local\n.env\n.DS_Store\n*.log" > .gitignore
git add .
git commit -m "feat: News Potli v1.0 — world-class rural journalism platform"
git branch -M main
git remote add origin https://github.com/buildrocketlabs/newspotli.git
git push -u origin main
# Then connect repo in vercel.com dashboard → Import Project
```

## ═══ SANITY WEBHOOK SETUP ═══
After Vercel is live:
1. Go to manage.sanity.io → Project a86sthtc → API → Webhooks
2. Click "Create webhook"
3. Name: "Revalidate Website"
4. URL: https://newspotli.com/api/revalidate
5. Dataset: production
6. Trigger on: Create, Update, Delete
7. Filter: _type == "article" || _type == "category"
8. HTTP method: POST
9. Secret: [value of SANITY_REVALIDATE_SECRET from .env.local]
10. HTTP Headers: Authorization: Bearer [same secret]
11. Save

Test it: publish an article in Sanity → check newspotli.com within 60 seconds.

## ═══ SANITY STUDIO DEPLOYMENT ═══
Deploy Sanity Studio to studio.newspotli.com:
```bash
cd apps/studio
npx sanity deploy
# Choose hostname: newspotli
# Studio will be live at: https://newspotli.sanity.studio
```
Then add custom domain in Sanity dashboard if needed.

## ═══ DNS CONFIGURATION ═══
In domain registrar (wherever newspotli.com was bought):
1. Add CNAME: www → cname.vercel-dns.com
2. Add A record: @ → 76.76.21.21 (Vercel IP)
3. Wait 10-30 minutes for propagation
4. Vercel auto-provisions SSL certificate

## ═══ POST-LAUNCH CHECKLIST ═══
Day of launch — do in this order:
- [ ] npm run build — passes clean
- [ ] Lighthouse on live URL — 90+ performance
- [ ] Test article publish in Sanity → verify live on site in 60s
- [ ] Test newsletter signup → verify email received
- [ ] Test search — type "किसान" → results appear
- [ ] Test on actual Android phone (375px)
- [ ] Google Search Console → verify property
- [ ] Submit sitemap.xml
- [ ] Submit news-sitemap via API
- [ ] Request indexing of homepage
- [ ] Send preview URL to Jayant sir for approval
- [ ] Message Arvind sir personally on launch day
