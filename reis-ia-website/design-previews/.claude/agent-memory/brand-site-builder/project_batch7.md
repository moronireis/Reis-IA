---
name: Batch 7 Meta Pages
description: Patterns and decisions from Batch 7 meta pages (templates, SEO) with interactive template previews
type: project
---

Batch 7 meta pages (templates, seo) were enhanced on 2026-03-17.

**Why:** Both pages already existed from earlier batches but needed significant enhancement per Batch 7 requirements — interactive previews, page-type templates, image optimization, performance targets, accessibility checklist.

**How to apply:**
- New component: TemplatePreview.tsx — React island with breakpoint toggle (mobile/tablet/desktop) showing scaled mini-previews of page layouts
- Templates page now has 10 sections: page-type templates (hero, sales, booking, application) with interactive previews, structural templates (A/B/C), section composition rules, grid systems, responsive behavior, Do/Don't
- SEO page now has 11 sections: meta tags, title/description patterns, OG/Twitter cards with visual preview, structured data (brand + consulting schemas), image optimization specs, performance targets (Lighthouse 90+ / Core Web Vitals), semantic HTML, accessibility checklist (WCAG 2.1 AA), sitemap/robots, full URL map, Do/Don't
- Both pages existed from earlier batches — required reading existing files first before writing
- Build: 22 pages, 1.50s, zero errors
- Backups at `reis-ia-brand/backups/batch-7/`
