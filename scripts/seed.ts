import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ── Load .env.local ──
function loadEnv() {
  const envPaths = [
    resolve(process.cwd(), '.env.local'),
    resolve(__dirname, '../.env.local'),
  ]
  for (const p of envPaths) {
    if (existsSync(p)) {
      const content = readFileSync(p, 'utf-8')
      for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx === -1) continue
        const key = trimmed.slice(0, eqIdx).trim()
        const value = trimmed.slice(eqIdx + 1).trim()
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
      break
    }
  }
}

loadEnv()

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a86sthtc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ── STEP 1: Create Author ──
async function createAuthor() {
  console.log('📝 Creating author...')
  const author = await writeClient.createOrReplace({
    _id: 'author-arvind-shukla',
    _type: 'author',
    name: 'Arvind Shukla',
    slug: { _type: 'slug', current: 'arvind-shukla' },
    role: 'Founder & Senior Journalist',
    bio: 'Pulitzer Center Grantee. 18+ years of rural journalism across India. भारत के गाँवों और किसानों की आवाज़।',
  })
  console.log(`✅ Author created: ${author.name} (${author._id})`)
  return author._id
}

// ── STEP 2: Create Categories ──
const CATEGORIES = [
  { title: 'खेती किसानी', titleEn: 'Farming', slug: 'kheti-kisani', icon: '🌾', color: '#2D5016' },
  { title: 'पशु पालन', titleEn: 'Livestock', slug: 'pashu-palan', icon: '🐄', color: '#5C2D00' },
  { title: 'मौसम-बेमौसम', titleEn: 'Weather', slug: 'mausam-bemaum', icon: '🌤️', color: '#1a3a5c' },
  { title: 'सरकारी योजना', titleEn: 'Govt Schemes', slug: 'sarkari-yojana', icon: '📋', color: '#3d1a00' },
  { title: 'कमाई की बात', titleEn: 'Agri Business', slug: 'kamai-ki-baat', icon: '💰', color: '#1a3a1a' },
  { title: 'तकनीक से तरक्की', titleEn: 'Agro-Tech', slug: 'taknik-se-tarakki', icon: '🔬', color: '#1a1a3d' },
  { title: 'गांव की कहानियां', titleEn: 'Village Stories', slug: 'gaon-ki-kahaniyan', icon: '🏘️', color: '#3d2a1a' },
  { title: 'बाजार', titleEn: 'Market', slug: 'bazar', icon: '📊', color: '#8B1A1A' },
]

async function createCategories() {
  console.log('\n📂 Creating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    const doc = await writeClient.createOrReplace({
      _id: `category-${cat.slug}`,
      _type: 'category',
      title: cat.title,
      titleEn: cat.titleEn,
      slug: { _type: 'slug', current: cat.slug },
      icon: cat.icon,
      color: cat.color,
    })
    categoryMap[cat.slug] = doc._id
    console.log(`  ✅ ${cat.icon} ${cat.title} (${cat.titleEn})`)
  }

  return categoryMap
}

// ── STEP 3: Create Articles ──
async function createArticles(authorId: string, categoryMap: Record<string, string>) {
  console.log('\n📰 Creating articles...')

  const articles = [
    {
      _id: 'article-dhan-ki-kheti',
      title: 'धान की खेती में नई तकनीक से किसानों को मिल रहा है दोगुना फायदा',
      slug: 'dhan-ki-kheti-nayi-taknik-2026',
      excerpt: 'उत्तर प्रदेश के किसानों ने आधुनिक कृषि तकनीक अपनाकर अपनी उपज दोगुनी कर ली है। ड्रोन से खेत की निगरानी और स्मार्ट सिंचाई प्रणाली ने खेती का चेहरा बदल दिया है।',
      body: [
        { _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'उत्तर प्रदेश के लखनऊ जिले में रहने वाले किसान राम प्रसाद यादव ने पिछले साल से ड्रोन तकनीक का उपयोग शुरू किया। आज उनकी फसल की पैदावार 40 प्रतिशत बढ़ गई है। यह कहानी सिर्फ उनकी नहीं है — पूरे UP में हजारों किसान इस बदलाव को अपना रहे हैं।' }] },
        { _type: 'block', style: 'normal', _key: 'b2', markDefs: [], children: [{ _type: 'span', _key: 's2', marks: [], text: 'कृषि विशेषज्ञों का कहना है कि स्मार्ट सिंचाई और सटीक खाद प्रबंधन से न केवल उत्पादन बढ़ता है बल्कि लागत भी कम होती है। सरकार की प्रधानमंत्री कृषि सिंचाई योजना इस बदलाव में अहम भूमिका निभा रही है।' }] },
        { _type: 'block', style: 'normal', _key: 'b3', markDefs: [], children: [{ _type: 'span', _key: 's3', marks: [], text: 'न्यूज़ पोटली ने पिछले तीन महीनों में 50 से अधिक किसानों से बात की। इनमें से 80 प्रतिशत किसानों ने कहा कि नई तकनीक ने उनकी आय में सुधार किया है। यह आंकड़ा उम्मीद की एक बड़ी किरण है।' }] },
      ],
      category: 'kheti-kisani',
      featured: true,
      breakingNews: true,
      readTime: 5,
      tags: ['धान', 'तकनीक', 'UP', 'किसान', 'ड्रोन'],
      publishedAt: new Date().toISOString(),
    },
    {
      _id: 'article-monsoon-2026',
      title: 'मानसून 2026: UP और MP के किसानों के लिए क्या है मौसम विभाग का पूर्वानुमान?',
      slug: 'monsoon-2026-up-mp-purvanuman',
      excerpt: 'इस साल मानसून सामान्य से 10 दिन पहले आने की संभावना है। मौसम विभाग ने UP, MP और राजस्थान के किसानों को खेती की तैयारी पहले करने की सलाह दी है।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'भारत मौसम विज्ञान विभाग के अनुसार इस वर्ष मानसून केरल में 25 मई तक पहुंच सकता है। यह सामान्य तारीख 1 जून से 10 दिन पहले है। उत्तर भारत में जून के दूसरे सप्ताह में मानसून की बारिश शुरू होने की संभावना है।' }] }],
      category: 'mausam-bemaum',
      featured: false,
      breakingNews: true,
      readTime: 4,
      tags: ['मानसून', 'मौसम', '2026', 'UP', 'MP'],
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'article-gay-palan-bihar',
      title: 'गाय पालन से हर महीने ₹35,000 कमा रहे हैं बिहार के ये किसान',
      slug: 'gay-palan-bihar-35000-monthly',
      excerpt: 'बिहार के मुजफ्फरपुर के रहने वाले रमेश यादव ने 5 गायों से शुरुआत की थी। आज उनके पास 25 गायें हैं और वे हर महीने 35 हजार रुपये कमाते हैं।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'रमेश यादव की कहानी बिहार के हजारों युवाओं के लिए प्रेरणा बन गई है। महज 6 साल पहले वे शहर में नौकरी की तलाश में थे। आज अपने गांव में ही डेयरी फार्म चलाकर परिवार का भरण-पोषण कर रहे हैं।' }] }],
      category: 'pashu-palan',
      featured: false,
      breakingNews: false,
      readTime: 6,
      tags: ['पशु पालन', 'गाय', 'बिहार', 'डेयरी', 'कमाई'],
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'article-pm-kisan-18',
      title: 'PM किसान योजना: 18वीं किस्त कब आएगी? जानें पूरी जानकारी',
      slug: 'pm-kisan-yojana-18vi-kist-2026',
      excerpt: 'प्रधानमंत्री किसान सम्मान निधि योजना की 18वीं किस्त अप्रैल 2026 में जारी होने की उम्मीद है। इस बार 9.5 करोड़ से अधिक किसानों को लाभ मिलेगा।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'केंद्र सरकार की पीएम किसान योजना के तहत हर साल तीन किस्तों में 6000 रुपये किसानों के खाते में सीधे भेजे जाते हैं। 18वीं किस्त अप्रैल 2026 में आने की संभावना है।' }] }],
      category: 'sarkari-yojana',
      featured: false,
      breakingNews: false,
      readTime: 3,
      tags: ['PM किसान', 'सरकारी योजना', 'किस्त', '2026'],
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'article-mandi-bhav',
      title: 'मंडी भाव: आज गेहूं, सरसों और चने के ताजा भाव',
      slug: 'mandi-bhav-gehu-sarson-chana-aaj',
      excerpt: 'आज की प्रमुख मंडियों में गेहूं 2,200-2,350 रुपये प्रति क्विंटल, सरसों 5,100-5,400 रुपये और चना 4,800-5,100 रुपये प्रति क्विंटल बिक रहा है।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'देशभर की प्रमुख कृषि मंडियों में आज अनाज और तिलहन के भावों में मिला-जुला रुझान देखने को मिला। उत्तर प्रदेश की मंडियों में गेहूं के दाम MSP के करीब बने हुए हैं।' }] }],
      category: 'bazar',
      featured: false,
      breakingNews: true,
      readTime: 2,
      tags: ['मंडी भाव', 'गेहूं', 'सरसों', 'चना', 'आज'],
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'article-krishi-drone',
      title: 'कृषि ड्रोन से खेती: सरकार दे रही है 50% सब्सिडी, ऐसे उठाएं फायदा',
      slug: 'krishi-drone-50-percent-subsidy-kaise-le',
      excerpt: 'केंद्र सरकार की नमो ड्रोन दीदी और कृषि ड्रोन सब्सिडी योजना के तहत किसानों को ड्रोन खरीद पर 50 प्रतिशत तक की सब्सिडी मिल रही है।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'भारत सरकार ने कृषि में ड्रोन तकनीक को बढ़ावा देने के लिए कई योजनाएं शुरू की हैं। इन योजनाओं के तहत एससी/एसटी किसानों और महिलाओं को 50 प्रतिशत जबकि अन्य किसानों को 40 प्रतिशत सब्सिडी मिलती है।' }] }],
      category: 'taknik-se-tarakki',
      featured: false,
      breakingNews: false,
      readTime: 5,
      tags: ['ड्रोन', 'सब्सिडी', 'तकनीक', 'सरकार'],
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'article-rajasthan-mahila',
      title: 'राजस्थान के इस गांव में महिलाओं ने बदल दी खेती की तस्वीर',
      slug: 'rajasthan-mahilao-ne-badli-kheti-tasveer',
      excerpt: 'राजस्थान के बाड़मेर जिले के एक छोटे से गांव में महिला किसानों के एक समूह ने मिलकर न केवल अपनी खेती सुधारी बल्कि पूरे गांव की अर्थव्यवस्था बदल दी।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'यह कहानी है हिम्मत, एकता और बदलाव की। राजस्थान के बाड़मेर जिले में 40 महिलाओं ने एक किसान उत्पादक संगठन बनाया और आज वे सामूहिक खेती से लाखों रुपये कमा रही हैं।' }] }],
      category: 'gaon-ki-kahaniyan',
      featured: false,
      breakingNews: false,
      readTime: 7,
      tags: ['महिला किसान', 'राजस्थान', 'गांव', 'बदलाव'],
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'article-mushroom-farming',
      title: 'एग्री-बिजनेस: मशरूम की खेती से सालाना 5 लाख कमाएं, जानें कैसे',
      slug: 'mushroom-farming-business-5-lakh-yearly',
      excerpt: 'मशरूम की खेती कम जगह में, कम लागत में शुरू होती है और मुनाफा बहुत अच्छा है। झारखंड के एक किसान ने घर के पिछवाड़े से शुरुआत की और आज 5 लाख सालाना कमाते हैं।',
      body: [{ _type: 'block', style: 'normal', _key: 'b1', markDefs: [], children: [{ _type: 'span', _key: 's1', marks: [], text: 'मशरूम की खेती भारत में तेजी से लोकप्रिय हो रही है। इसे शुरू करने के लिए न बड़ी जमीन चाहिए, न बड़ी पूंजी। झारखंड के रांची जिले के सुनील महतो ने 2022 में सिर्फ 20,000 रुपये की लागत से यह व्यवसाय शुरू किया था।' }] }],
      category: 'kamai-ki-baat',
      featured: false,
      breakingNews: false,
      readTime: 6,
      tags: ['मशरूम', 'एग्री बिजनेस', 'कमाई', 'झारखंड'],
      publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    },
  ]

  for (const article of articles) {
    const categoryId = categoryMap[article.category]
    if (!categoryId) {
      console.error(`  ❌ Category not found: ${article.category}`)
      continue
    }

    const doc = await writeClient.createOrReplace({
      _id: article._id,
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      excerpt: article.excerpt,
      body: article.body,
      category: { _type: 'reference', _ref: categoryId },
      author: { _type: 'reference', _ref: authorId },
      featured: article.featured,
      breakingNews: article.breakingNews,
      readTime: article.readTime,
      tags: article.tags,
      publishedAt: article.publishedAt,
    })
    console.log(`  ✅ ${article.featured ? '⭐ ' : ''}${doc.title.slice(0, 50)}...`)
  }
}

// ── STEP 7: Verify ──
async function verify() {
  console.log('\n🔍 Verifying...')
  const articles = await writeClient.fetch(`count(*[_type == "article"])`)
  const categories = await writeClient.fetch(`count(*[_type == "category"])`)
  const authors = await writeClient.fetch(`count(*[_type == "author"])`)
  console.log(`  Articles: ${articles}`)
  console.log(`  Categories: ${categories}`)
  console.log(`  Authors: ${authors}`)

  if (articles >= 8 && categories >= 8 && authors >= 1) {
    console.log('\n🎉 Seed complete! All data created successfully.')
  } else {
    console.error('\n⚠️  Some data may be missing. Check Sanity Studio.')
  }
}

// ── Main ──
async function main() {
  console.log('🌱 News Potli — Seeding Sanity CMS\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN not found. Check .env.local')
    process.exit(1)
  }

  const authorId = await createAuthor()
  const categoryMap = await createCategories()
  await createArticles(authorId, categoryMap)
  await verify()
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
