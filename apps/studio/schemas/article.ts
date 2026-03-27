import { defineField, defineType } from 'sanity'

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
      of: [{ type: 'block' }, { type: 'image' }],
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
