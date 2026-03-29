/**
 * News Potli — Article Migration Script
 *
 * Reads articles from scripts/articles.json and creates them in Sanity.
 * Downloads remote images, uploads to Sanity Assets, and creates documents.
 *
 * Usage:
 *   npx tsx scripts/migrate.ts
 *   npx tsx scripts/migrate.ts --dry-run
 *   npx tsx scripts/migrate.ts --limit=50
 *   npx tsx scripts/migrate.ts --dry-run --limit=10
 *   npx tsx scripts/migrate.ts --force         # overwrite existing articles
 *
 * Requires env vars (from apps/web/.env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Resolve @sanity/client from apps/web/node_modules
const _require = createRequire(resolve(__dirname, '../apps/web/package.json'))
const { createClient } = _require('@sanity/client') as typeof import('@sanity/client')

// ── Types ──

interface ArticleInput {
  title: string
  body: string
  excerpt: string
  category: string
  authorName: string
  publishedAt: string
  imageUrl: string
  tags?: string[]
  youtubeId?: string
}

interface MigrationResult {
  index: number
  title: string
  status: 'success' | 'failed' | 'skipped'
  reason?: string
}

// ── Parse CLI flags ──

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const force = args.includes('--force')
const limitFlag = args.find((a) => a.startsWith('--limit='))
const limit = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity

// ── Load env from apps/web/.env.local ──

function loadEnv() {
  const envPath = resolve(__dirname, '../apps/web/.env.local')
  try {
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIndex = trimmed.indexOf('=')
      if (eqIndex === -1) continue
      const key = trimmed.slice(0, eqIndex).trim()
      const value = trimmed.slice(eqIndex + 1).trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  } catch {
    // .env.local may not exist; rely on shell env
  }
}

loadEnv()

// ── Sanity client ──

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || projectId === 'yourprojectid') {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check apps/web/.env.local')
  process.exit(1)
}

if (!token) {
  console.error('❌ SANITY_API_TOKEN is not set. Check apps/web/.env.local')
  process.exit(1)
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token,
})

// ── Helpers ──

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0900-\u097F-]/g, '') // keep Hindi chars
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

function estimateReadTime(body: string): number {
  const words = body.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} downloading ${url}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function filenameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname
    const segments = pathname.split('/')
    return segments[segments.length - 1] || 'image.jpg'
  } catch {
    return 'image.jpg'
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Resolve references ──

async function findOrCreateCategory(categoryTitle: string): Promise<string> {
  const slug = slugify(categoryTitle)

  // Check if category exists
  const existing = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "category" && slug.current == $slug][0]{ _id }`,
    { slug }
  )

  if (existing) return existing._id

  // Create it
  const doc = await writeClient.create({
    _type: 'category',
    title: categoryTitle,
    slug: { _type: 'slug', current: slug },
    color: '#8B1A1A',
  })

  console.log(`  📁 Created category: ${categoryTitle}`)
  return doc._id
}

async function findOrCreateAuthor(authorName: string): Promise<string> {
  const slug = slugify(authorName)

  const existing = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "author" && slug.current == $slug][0]{ _id }`,
    { slug }
  )

  if (existing) return existing._id

  const doc = await writeClient.create({
    _type: 'author',
    name: authorName,
    slug: { _type: 'slug', current: slug },
    role: 'Correspondent',
  })

  console.log(`  👤 Created author: ${authorName}`)
  return doc._id
}

// ── Body text to Portable Text ──

function textToPortableText(body: string) {
  return body
    .split(/\n\n+/)
    .filter((p) => p.trim())
    .map((paragraph) => ({
      _type: 'block' as const,
      _key: Math.random().toString(36).slice(2, 10),
      style: 'normal' as const,
      markDefs: [],
      children: [
        {
          _type: 'span' as const,
          _key: Math.random().toString(36).slice(2, 10),
          text: paragraph.trim(),
          marks: [],
        },
      ],
    }))
}

// ── Main migration ──

async function migrate() {
  // Load articles
  const jsonPath = resolve(__dirname, 'articles.json')
  let articles: ArticleInput[]

  try {
    const raw = readFileSync(jsonPath, 'utf-8')
    articles = JSON.parse(raw)
  } catch (err) {
    console.error(`❌ Could not read ${jsonPath}:`, err)
    process.exit(1)
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    console.error('❌ articles.json is empty or not an array')
    process.exit(1)
  }

  const total = Math.min(articles.length, limit)
  const toProcess = articles.slice(0, total)

  console.log('')
  console.log('═══════════════════════════════════════════')
  console.log(`  News Potli Migration`)
  console.log(`  Articles: ${total} of ${articles.length}`)
  console.log(`  Mode: ${dryRun ? '🏜️  DRY RUN (no writes)' : '🔴 LIVE'}`)
  console.log(`  Force: ${force ? 'YES (overwrite existing)' : 'NO (skip duplicates)'}`)
  console.log(`  Project: ${projectId} / ${dataset}`)
  console.log('═══════════════════════════════════════════')
  console.log('')

  const results: MigrationResult[] = []

  // Pre-resolve categories and authors to avoid duplicate creation
  const categoryCache = new Map<string, string>()
  const authorCache = new Map<string, string>()

  for (let i = 0; i < toProcess.length; i++) {
    const article = toProcess[i]
    const num = i + 1

    // Validate required fields
    if (!article.title || !article.body) {
      const reason = `Missing required field (title or body)`
      console.log(`❌ ${num}/${total} skipped: ${reason}`)
      results.push({ index: i, title: article.title || '(untitled)', status: 'skipped', reason })
      continue
    }

    if (dryRun) {
      console.log(`🏜️  ${num}/${total} — ${article.title}`)
      console.log(`    category: ${article.category}, author: ${article.authorName}`)
      console.log(`    image: ${article.imageUrl || '(none)'}`)
      results.push({ index: i, title: article.title, status: 'success' })
      continue
    }

    try {
      // Check for existing article (idempotency)
      const slug = slugify(article.title)
      if (!force) {
        const existing = await writeClient.fetch<{ _id: string } | null>(
          `*[_type == "article" && slug.current == $slug][0]{ _id }`,
          { slug }
        )
        if (existing) {
          console.log(`⏭️  ${num}/${total} — already exists: ${article.title}`)
          results.push({ index: i, title: article.title, status: 'skipped', reason: 'Already exists' })
          continue
        }
      }

      // Resolve category
      let categoryId = categoryCache.get(article.category)
      if (!categoryId) {
        categoryId = await findOrCreateCategory(article.category)
        categoryCache.set(article.category, categoryId)
      }

      // Resolve author
      let authorId = authorCache.get(article.authorName)
      if (!authorId) {
        authorId = await findOrCreateAuthor(article.authorName)
        authorCache.set(article.authorName, authorId)
      }

      // Upload image
      let imageAsset: { _id: string } | null = null
      if (article.imageUrl) {
        try {
          const imageBuffer = await downloadImage(article.imageUrl)
          const filename = filenameFromUrl(article.imageUrl)
          imageAsset = await writeClient.assets.upload('image', imageBuffer, { filename })
        } catch (imgErr) {
          console.log(`  ⚠️  Image upload failed, continuing without image: ${imgErr}`)
        }
      }

      // Build document
      const doc = {
        _type: 'article',
        title: article.title,
        slug: { _type: 'slug', current: slug },
        excerpt: article.excerpt || '',
        body: textToPortableText(article.body),
        publishedAt: article.publishedAt || new Date().toISOString(),
        readTime: estimateReadTime(article.body),
        tags: article.tags || [],
        featured: false,
        breakingNews: false,
        category: { _type: 'reference', _ref: categoryId },
        author: { _type: 'reference', _ref: authorId },
        ...(imageAsset && {
          heroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageAsset._id },
            alt: article.title,
          },
        }),
        ...(article.youtubeId && { youtubeId: article.youtubeId }),
      }

      await writeClient.create(doc)
      console.log(`✅ ${num}/${total} — ${article.title} published`)
      results.push({ index: i, title: article.title, status: 'success' })
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err)
      console.log(`❌ ${num}/${total} failed: ${reason}`)
      results.push({ index: i, title: article.title, status: 'failed', reason })
    }

    // Rate limit
    if (i < toProcess.length - 1) {
      await sleep(200)
    }
  }

  // ── Summary ──
  const succeeded = results.filter((r) => r.status === 'success').length
  const failed = results.filter((r) => r.status === 'failed').length
  const skipped = results.filter((r) => r.status === 'skipped').length

  console.log('')
  console.log('═══════════════════════════════════════════')
  console.log(`  Migration Complete ${dryRun ? '(DRY RUN)' : ''}`)
  console.log(`  ✅ Succeeded: ${succeeded}`)
  console.log(`  ❌ Failed:    ${failed}`)
  console.log(`  ⏭️  Skipped:   ${skipped}`)
  console.log('═══════════════════════════════════════════')

  if (failed > 0) {
    console.log('')
    console.log('Failed articles:')
    for (const r of results.filter((r) => r.status === 'failed')) {
      console.log(`  ${r.index + 1}. ${r.title} — ${r.reason}`)
    }
  }

  process.exit(failed > 0 ? 1 : 0)
}

migrate()
