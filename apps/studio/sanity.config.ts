import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'News Potli',

  projectId: 'a86sthtc',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // "Open Preview" enters Next.js Draft Mode so authors can see unpublished
    // edits. The secret must match SANITY_REVALIDATE_SECRET on the web app.
    //
    // It is read from the environment rather than inlined: the Studio bundle is
    // publicly served, so a literal here would be committed to git *and* handed
    // to every visitor. Env keeps it out of the repo at least.
    productionUrl: async (prev, context) => {
      const { document } = context as {
        document: { _type?: string; slug?: { current?: string } }
      }
      const slug = document?.slug?.current
      if (document?._type !== 'article' || !slug) return prev

      const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET
      const base = process.env.SANITY_STUDIO_SITE_URL || 'https://newspotli.com'

      // No secret configured — fall back to the live published URL rather than
      // sending the author to a 401.
      if (!secret) return `${base}/article/${encodeURIComponent(slug)}`

      return `${base}/api/preview?slug=${encodeURIComponent(slug)}&secret=${encodeURIComponent(secret)}`
    },
  },
})
