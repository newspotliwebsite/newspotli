const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// ─── Category mapping (WordPress nicename → Sanity slug) ────────────────────
const SKIP_CATEGORY = '__SKIP__';

const CATEGORY_MAP = {
  // ── Exact nicename matches (from actual XML data) ──────────────────────
  'news': 'agri-bulletin',
  'farmer-news': 'agri-bulletin',
  'interview': 'sakshatkar',
  'agro-hero': 'taknik-se-tarakki',
  'social-hero': 'gaon-ki-kahaniyan',
  'media-gallery': SKIP_CATEGORY,
  'gallery': SKIP_CATEGORY,
  'spela-gratis-casino-utan-insattning': SKIP_CATEGORY,

  // Original user-specified nicenames (keep for safety)
  'kheti-kisani': 'kheti-kisani',
  'mausam-bemausam': 'mausam-bemaum',
  'kamai-vali-bat': 'kamai-ki-baat',
  'samaj-ke-sitare': 'gaon-ki-kahaniyan',
  'pashu-palan': 'pashu-palan',
  'taknik-se-tarakki': 'taknik-se-tarakki',
  'lekh': 'ground-reports',
  'solar-se-samriddhi': 'taknik-se-tarakki',
  'gaon-potli': 'gaon-ki-kahaniyan',

  // Hindi text nicenames (decoded)
  'इंटरव्यू': 'sakshatkar',
  'लेख': 'ground-reports',
};

// Partial/substring match patterns — checked against both raw and decoded nicenames
const CATEGORY_PARTIAL_MAP = [
  // Actual nicenames from XML that contain these substrings:
  // "agriculture-news-%e0%a4%96%e0%a5%87%e0%a4%a4%e0%a5%80-%e0%a4%95%e0%a4%bf%e0%a4%b8%e0%a4%be%e0%a4%a8%e0%a5%80"
  { match: 'agriculture-news', slug: 'kheti-kisani' },
  { match: 'खेती', slug: 'kheti-kisani' },
  { match: 'किसानी', slug: 'kheti-kisani' },

  // "kamai-wali-baat-business-ideas"
  { match: 'kamai-wali-baat', slug: 'kamai-ki-baat' },
  { match: 'कमाई', slug: 'kamai-ki-baat' },

  // "%e0%a4%ae%e0%a5%8c%e0%a4%b8%e0%a4%ae-%e0%a4%ac%e0%a5%87%e0%a4%ae%e0%a5%8c%e0%a4%b8%e0%a4%ae-climate-change"
  { match: 'मौसम', slug: 'mausam-bemaum' },
  { match: 'बेमौसम', slug: 'mausam-bemaum' },
  { match: 'climate-change', slug: 'mausam-bemaum' },

  // "live-stock-and-dairy"
  { match: 'live-stock', slug: 'pashu-palan' },
  { match: 'dairy', slug: 'pashu-palan' },
  { match: 'पशु', slug: 'pashu-palan' },
  { match: 'पालन', slug: 'pashu-palan' },

  // "agro-tech-taknik-se-tarraki"
  { match: 'agro-tech', slug: 'taknik-se-tarakki' },
  { match: 'taknik', slug: 'taknik-se-tarakki' },
  { match: 'तकनीक', slug: 'taknik-se-tarakki' },
  { match: 'तरक्की', slug: 'taknik-se-tarakki' },

  // "%e0%a4%b2%e0%a5%87%e0%a4%96" → decoded = "लेख"
  { match: 'लेख', slug: 'ground-reports' },

  // "solar-se-samriddhi-..." 
  { match: 'solar', slug: 'taknik-se-tarakki' },
  { match: 'सोलर', slug: 'taknik-se-tarakki' },
  { match: 'समृद्धि', slug: 'taknik-se-tarakki' },

  // Social/community
  { match: 'समाज', slug: 'gaon-ki-kahaniyan' },
  { match: 'सितारे', slug: 'gaon-ki-kahaniyan' },
  { match: 'गांव', slug: 'gaon-ki-kahaniyan' },

  // Interview
  { match: 'इंटरव्यू', slug: 'sakshatkar' },

  // Gallery/skip
  { match: 'गैलरी', slug: SKIP_CATEGORY },
  { match: 'gallery', slug: SKIP_CATEGORY },
];

// ─── HTML entity decoding ───────────────────────────────────────────────────
function decodeHtmlEntities(str) {
  if (!str) return '';
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&#39;': "'",
    '&nbsp;': ' ',
    '&ndash;': '–',
    '&mdash;': '—',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&ldquo;': '\u201C',
    '&rdquo;': '\u201D',
    '&hellip;': '…',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
  };

  let result = str;
  for (const [entity, char] of Object.entries(entities)) {
    result = result.split(entity).join(char);
  }
  // Handle numeric entities: &#8217; &#x2019; etc.
  result = result.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  return result;
}

// ─── Clean body text ────────────────────────────────────────────────────────
function cleanBody(html) {
  if (!html) return '';

  let text = html;

  // Remove WordPress block comments <!-- wp:xxx --> and <!-- /wp:xxx -->
  text = text.replace(/<!--\s*\/?wp:[^>]*-->/g, '');

  // Remove WordPress shortcodes [caption ...], [gallery ...], [embed ...] etc
  text = text.replace(/\[(?:caption|gallery|embed|video|audio|playlist|wp_caption)[^\]]*\][\s\S]*?\[\/(?:caption|gallery|embed|video|audio|playlist|wp_caption)\]/gi, '');
  text = text.replace(/\[(?:caption|gallery|embed|video|audio|playlist|wp_caption)[^\]]*\]/gi, '');
  text = text.replace(/\[\/(?:caption|gallery|embed|video|audio|playlist|wp_caption)\]/gi, '');

  // Remove all remaining shortcodes like [su_heading ...] etc
  text = text.replace(/\[[^\]]{1,100}\]/g, '');

  // Replace <br>, <br/>, <br /> with newline
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Replace block-level closing tags with double newline to preserve paragraph breaks
  text = text.replace(/<\/(?:p|div|h[1-6]|li|blockquote|figure|figcaption|section|article|header|footer|tr)>/gi, '\n\n');

  // Strip ALL remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  text = decodeHtmlEntities(text);

  // Remove URLs that are just sitting on their own line (embedded video URLs etc.)
  text = text.replace(/^\s*https?:\/\/\S+\s*$/gm, '');

  // Remove excessive whitespace within lines
  text = text.replace(/[^\S\n]+/g, ' ');

  // Normalize newlines: collapse 3+ newlines to 2
  text = text.replace(/\n{3,}/g, '\n\n');

  // Trim each paragraph
  text = text
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .join('\n\n');

  return text.trim();
}

// ─── Safe text extraction from xml2js nodes ─────────────────────────────────
function getText(node) {
  if (!node) return '';
  if (Array.isArray(node)) node = node[0];
  if (typeof node === 'string') return node.trim();
  if (typeof node === 'object' && node._) return node._.trim();
  if (typeof node === 'object' && node['_']) return node['_'].trim();
  return '';
}

// ─── Resolve category nicename to Sanity slug ───────────────────────────────
function resolveCategory(nicename) {
  if (!nicename) return 'agri-bulletin';

  // Try URL-decoding
  let decoded = nicename;
  try {
    decoded = decodeURIComponent(nicename);
  } catch (e) {
    // If decoding fails, use as-is
  }

  // Exact match on original nicename
  if (CATEGORY_MAP[nicename]) return CATEGORY_MAP[nicename];

  // Exact match on decoded nicename
  if (CATEGORY_MAP[decoded]) return CATEGORY_MAP[decoded];

  // Check if decoded nicename contains any ASCII key (e.g., "mausam-bemausam-climate-change")
  for (const key of Object.keys(CATEGORY_MAP)) {
    if (decoded.includes(key) || nicename.includes(key)) {
      return CATEGORY_MAP[key];
    }
  }

  // Partial match on decoded Hindi text
  for (const { match, slug } of CATEGORY_PARTIAL_MAP) {
    if (decoded.includes(match)) {
      return slug;
    }
  }

  // Default
  return 'agri-bulletin';
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const xmlPath = path.join(__dirname, 'wp-export.xml');
  const outputPath = path.join(__dirname, 'articles.json');

  console.log('📖 Reading XML file...');
  const xml = fs.readFileSync(xmlPath, 'utf-8');

  console.log('🔍 Parsing XML (this may take a moment for ~42MB)...');
  const parser = new xml2js.Parser({
    explicitArray: true,
    trim: true,
    // Handle namespaced tags
    tagNameProcessors: [],
  });

  const result = await parser.parseStringPromise(xml);
  const channel = result.rss.channel[0];
  const items = channel.item || [];

  console.log(`📦 Total items in XML: ${items.length}`);

  // ─── Build attachment lookup (post_id → attachment_url) ─────────────────
  console.log('🖼️  Building attachment ID → URL lookup...');
  const attachmentMap = {};
  for (const item of items) {
    const postType = getText(item['wp:post_type']);
    if (postType === 'attachment') {
      const postId = getText(item['wp:post_id']);
      const attachUrl = getText(item['wp:attachment_url']);
      if (postId && attachUrl) {
        attachmentMap[postId] = attachUrl;
      }
    }
  }
  console.log(`   Found ${Object.keys(attachmentMap).length} attachments`);

  // ─── Process posts ─────────────────────────────────────────────────────
  const articles = [];
  const stats = {
    total: items.length,
    processed: 0,
    skippedNotPost: 0,
    skippedNotPublished: 0,
    skippedCategory: 0,
    skippedEmpty: 0,
    categories: {},
  };

  for (const item of items) {
    const postType = getText(item['wp:post_type']);
    if (postType !== 'post') {
      stats.skippedNotPost++;
      continue;
    }

    const status = getText(item['wp:status']);
    if (status !== 'publish') {
      stats.skippedNotPublished++;
      continue;
    }

    // ─── Extract category ────────────────────────────────────────────────
    const categories = item.category || [];
    let categorySlug = 'agri-bulletin';
    let shouldSkip = false;

    // Collect all resolved categories — prefer specific over generic "agri-bulletin"
    const resolvedCategories = [];
    for (const cat of categories) {
      const domain = cat.$ && cat.$.domain;
      if (domain === 'category') {
        const nicename = cat.$ && cat.$.nicename;
        const resolved = resolveCategory(nicename);
        if (resolved === SKIP_CATEGORY) {
          shouldSkip = true;
          break;
        }
        resolvedCategories.push(resolved);
      }
    }

    if (shouldSkip) {
      stats.skippedCategory++;
      continue;
    }

    // Prefer a specific category over the default 'agri-bulletin'
    const specificCat = resolvedCategories.find(c => c !== 'agri-bulletin');
    categorySlug = specificCat || resolvedCategories[0] || 'agri-bulletin';


    // ─── Extract title ──────────────────────────────────────────────────
    const title = getText(item.title);
    if (!title) {
      stats.skippedEmpty++;
      continue;
    }

    // ─── Extract & clean body ───────────────────────────────────────────
    const rawContent = getText(item['content:encoded']);
    const body = cleanBody(rawContent);

    if (!body || body.length < 50) {
      stats.skippedEmpty++;
      continue;
    }

    // ─── Extract excerpt ────────────────────────────────────────────────
    const rawExcerpt = getText(item['excerpt:encoded']);
    const excerpt = rawExcerpt
      ? cleanBody(rawExcerpt).substring(0, 200)
      : body.substring(0, 200);

    // ─── Extract author ─────────────────────────────────────────────────
    const authorName = getText(item['dc:creator']) || 'News Potli';

    // ─── Extract date ───────────────────────────────────────────────────
    const dateStr = getText(item['wp:post_date_gmt']);
    let publishedAt = '';
    if (dateStr && dateStr !== '0000-00-00 00:00:00') {
      // Convert "2024-06-15 10:00:00" → ISO format
      publishedAt = new Date(dateStr.replace(' ', 'T') + 'Z').toISOString();
    } else {
      // Fallback to local post_date
      const localDate = getText(item['wp:post_date']);
      if (localDate && localDate !== '0000-00-00 00:00:00') {
        publishedAt = new Date(localDate.replace(' ', 'T') + 'Z').toISOString();
      } else {
        publishedAt = new Date().toISOString();
      }
    }

    // ─── Extract image URL via _thumbnail_id → attachment lookup ────────
    let imageUrl = '';
    const postMetas = item['wp:postmeta'] || [];
    for (const meta of postMetas) {
      const metaKey = getText(meta['wp:meta_key']);
      if (metaKey === '_thumbnail_id') {
        const thumbnailId = getText(meta['wp:meta_value']);
        if (thumbnailId && attachmentMap[thumbnailId]) {
          imageUrl = attachmentMap[thumbnailId];
        }
        break;
      }
    }

    // ─── Extract tags ───────────────────────────────────────────────────
    const tags = [];
    for (const cat of categories) {
      const domain = cat.$ && cat.$.domain;
      if (domain === 'post_tag') {
        const tagName = getText(cat);
        if (tagName) tags.push(tagName);
      }
    }

    // ─── Build article object ───────────────────────────────────────────
    articles.push({
      title: decodeHtmlEntities(title),
      body,
      excerpt,
      category: categorySlug,
      authorName,
      publishedAt,
      imageUrl,
      tags,
    });

    stats.processed++;
    stats.categories[categorySlug] = (stats.categories[categorySlug] || 0) + 1;
  }

  // ─── Write output ────────────────────────────────────────────────────────
  console.log('\n💾 Writing articles.json...');
  const jsonOutput = JSON.stringify(articles, null, 2);
  fs.writeFileSync(outputPath, jsonOutput, 'utf-8');

  const fileSizeBytes = fs.statSync(outputPath).size;
  const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(60));
  console.log('📊 MIGRATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`  Total items in XML:        ${stats.total}`);
  console.log(`  Posts processed:           ${stats.processed}`);
  console.log(`  Skipped (not post):        ${stats.skippedNotPost}`);
  console.log(`  Skipped (not published):   ${stats.skippedNotPublished}`);
  console.log(`  Skipped (gallery/spam):    ${stats.skippedCategory}`);
  console.log(`  Skipped (empty/short):     ${stats.skippedEmpty}`);
  console.log('─'.repeat(60));
  console.log('  Per-category counts:');
  const sortedCats = Object.entries(stats.categories).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCats) {
    console.log(`    ${cat.padEnd(25)} ${count}`);
  }
  console.log('─'.repeat(60));
  console.log(`  Output file:               ${outputPath}`);
  console.log(`  File size:                 ${fileSizeMB} MB (${fileSizeBytes.toLocaleString()} bytes)`);
  console.log(`  Total articles:            ${articles.length}`);
  console.log('═'.repeat(60));
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
