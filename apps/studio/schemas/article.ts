import { defineField, defineType, type Rule } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Hindi)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (2-3 sentences, Hindi)',
      type: 'text',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab' },
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
        },
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
        {
          name: 'youtube',
          type: 'object',
          title: 'YouTube Video',
          fields: [
            { name: 'url', type: 'url', title: 'YouTube Video URL' },
          ],
          preview: {
            select: { url: 'url' },
            prepare({ url }: { url?: string }) {
              return { title: 'YouTube Video', subtitle: url || 'No URL set' }
            },
          },
        },
        {
          name: 'twitterEmbed',
          type: 'object',
          title: 'Twitter/X Post',
          icon: () => '𝕏',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Tweet URL',
              description:
                'Paste the full tweet URL (e.g., https://x.com/PotliNews/status/...)',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { url: 'url' },
            prepare({ url }: { url?: string }) {
              return { title: 'Twitter/X Post', subtitle: url || 'No URL set' }
            },
          },
        },
        {
          name: 'facebookEmbed',
          type: 'object',
          title: 'Facebook Post',
          icon: () => 'f',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Facebook Post URL',
              description: 'Paste the full Facebook post URL',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { url: 'url' },
            prepare({ url }: { url?: string }) {
              return { title: 'Facebook Post', subtitle: url || 'No URL set' }
            },
          },
        },
        {
          name: 'instagramEmbed',
          type: 'object',
          title: 'Instagram Post',
          icon: () => '📷',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Instagram Post URL',
              description: 'Paste the full Instagram post URL',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { url: 'url' },
            prepare({ url }: { url?: string }) {
              return { title: 'Instagram Post', subtitle: url || 'No URL set' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      // Defaults to "now" at document creation so the field is never blank —
      // homepage ordering and the sitemap both depend on it. Authors can still
      // override it (e.g. backdating an import).
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: 'DD MMM YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      description:
        'Automatically set to the current date/time. You can change it if needed.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Homepage Hero)',
      type: 'boolean',
    }),
    defineField({
      name: 'breakingNews',
      title: 'Breaking News (Ticker)',
      type: 'boolean',
    }),
    defineField({
      name: 'deepStory',
      title: 'Deep Story / Long Read',
      type: 'boolean',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (Minutes)',
      type: 'number',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID',
      type: 'string',
    }),
  ],
})
