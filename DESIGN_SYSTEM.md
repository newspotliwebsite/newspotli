# News Potli Design System

## Color Tokens (use in tailwind.config.ts)
maroon: { DEFAULT: '#8B1A1A', dark: '#5C0F0F', light: '#B22222' }
green: { DEFAULT: '#2D5016', mid: '#3A6B1A', light: '#5A8A32' }
gold: { DEFAULT: '#C8860A', light: '#E8A020' }
cream: { DEFAULT: '#FAF6EE', dark: '#F0EAD6' }

## Typography Scale
- Display: Playfair Display, 36-48px, weight 900, italic for hero headlines
- H1: Playfair Display, 28-36px, weight 700
- H2: Source Sans 3, 22px, weight 700
- Body: Source Sans 3, 15-16px, weight 400, line-height 1.7
- Hindi Body: Noto Sans Devanagari, 15px, weight 400
- Caption: Source Sans 3, 11-12px, weight 600, letter-spacing 0.5px
- Category Tag: 9-10px, weight 700, letter-spacing 2px, UPPERCASE

## Component Patterns
Article Card:
  - Image: 16:9 aspect ratio, rounded-sm, object-cover
  - Category tag: absolute bottom-left on image, bg-maroon text-white
  - Title: Noto Devanagari, font-bold, line-clamp-3
  - Meta: author + date + read time, text-grey-500, text-xs
  - Hover: translateY(-3px) + shadow-lg transition

Hero Section:
  - Full bleed dark background (charcoal to maroon gradient)
  - White italic Playfair Display headline
  - Gold CTA button
  - Right sidebar: numbered top stories list

Buttons:
  - Primary: bg-maroon text-white px-6 py-3 font-bold hover:bg-maroon-dark
  - Secondary: border border-maroon text-maroon px-4 py-2 hover:bg-maroon/10
  - Gold CTA: bg-gold text-white px-6 py-3 font-bold hover:bg-gold/90

## Spacing
- Section padding: py-12 md:py-16 px-4 md:px-12 lg:px-24
- Card gap: gap-4 md:gap-6
- Component internal: p-4 md:p-6

## Breakpoints (Tailwind defaults)
sm: 640px | md: 768px | lg: 1024px | xl: 1280px
Mobile-first always. Most users: 375px phones.

## Image Fallback Hierarchy
1. article.heroImage (Sanity upload)
2. YouTube thumbnail (if youtubeId exists)
3. Category placeholder from /public/images/placeholders/
4. Category gradient with SVG icon (last resort — never blank)

## Logo Usage
- Light backgrounds → NP logo Full.png (red on white)
- Dark backgrounds → White version (if available) OR CSS filter: brightness(0) invert(1) on NP logo
- Favicon → NP logo Main.png cropped to square

## Partner Display Priority
1. Partner logo PNG/SVG (if provided)
2. Styled text pill → font-bold uppercase letter-spacing-wide
3. Never show a broken image or empty space

## Photo Placeholders
- Team member without photo → initials circle bg-maroon text-white rounded-full font-playfair
- Article without image → category gradient + SVG icon
- About page without Arvind photo → stats-hero layout (numbers as visual anchors)

## Color Blocking Rule
When lacking photos, use COLOR as the visual hero:
- Dark maroon sections with large white Playfair text
- Cream sections with maroon typography
- Gold accents as eye-catching anchors
- Green as secondary accent for agriculture content
