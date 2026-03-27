# Sanity Schema Reference — News Potli

## Article Schema Fields
_id, _type: 'article'
title: string (Hindi, required)
slug: { current: string } (auto-generated from title)
excerpt: text (2-3 sentences, Hindi)
body: portableText (rich text with images)
heroImage: { asset: reference, alt: string }
category: reference → Category
author: reference → Author
tags: array of strings
publishedAt: datetime
featured: boolean (for homepage hero)
breakingNews: boolean (for ticker)
readTime: number (minutes, auto-calculated)
seoTitle: string (English, for Google)
seoDescription: string (English, 150 chars)
youtubeId: string (optional, embed video in article)

## Category Schema Fields
_id, _type: 'category'
title: string (Hindi)
titleEn: string (English)
slug: { current: string }
description: text
icon: string (emoji)
color: string (hex)
coverImage: image

## Author Schema Fields
_id, _type: 'author'
name: string
slug: { current: string }
bio: text
photo: image
role: string
email: string

## GROQ Query Patterns
Latest articles: *[_type=="article"] | order(publishedAt desc) [0..9]
By category: *[_type=="article" && category->slug.current == $slug]
Featured: *[_type=="article" && featured==true] [0]
Breaking: *[_type=="article" && breakingNews==true] | order(publishedAt desc) [0..4]
Related: *[_type=="article" && category._ref == $catId && _id != $currentId] [0..3]
