# AIOX — SEO & Digital Identity Page
URL: https://brand.aioxsquad.ai/brandbook/seo

## Page Purpose
SEO metadata patterns, OG tags, social cards, and structured data documentation.

## Content Structure
1. **Header** — "SEO & Digital Identity"
2. **01 Meta Tags** — Title (60 chars), description (155 chars), robots, canonical
3. **02 Open Graph** — og:title, og:description, og:type, og:image (1200x630)
4. **03 Twitter Cards** — summary_large_image format (1200x600)
5. **04 Structured Data** — JSON-LD Schema.org Organization markup

## Meta Tag Templates
```html
<meta name="title" content="AIOX Squad — AI Automation Agency">
<meta name="description" content="We build custom AI systems...">
<meta name="robots" content="index, follow">
<meta name="canonical" content="https://aiox.ai/">
```

## Open Graph Template
```html
og:title: AIOX Squad — AI Automation
og:description: Scale operations 10x without hiring 100 people
og:type: website
og:image: /referencias/outras/aiox_grid_final.webp (1200x630)
og:url: https://aiox.ai
```

## Twitter Card Template
```html
twitter:card: summary_large_image
twitter:image: (1200x600)
```

## JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AIOX Squad",
  "url": "https://aiox.ai",
  "logo": "https://aiox.ai/logo/AIOX-White.svg",
  "sameAs": [
    "https://twitter.com/aioxsquad",
    "https://linkedin.com/company/aioxsquad"
  ]
}
```

## Navigation Context
- Position: Design System > Meta > SEO

## Key Design Decisions
- Title max 60 chars, description max 155 chars
- OG image dimensions: 1200x630
- Twitter image: 1200x600
- JSON-LD for structured data (not microdata)
- index,follow as default robots directive
