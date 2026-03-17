# Lighthouse Performance Baseline — Reis IA Website

Last updated: 2026-03-16

Audited with: Lighthouse 13.0.3 | Chrome headless | Dev server (localhost:4321)
Categories: Performance, Accessibility, Best Practices, SEO
Note: Scores reflect the unoptimized **development build**. Production (Astro's built output via `npm run build`) will score significantly higher due to automatic minification and code splitting.

---

## Scores by Page

| Page | URL | Performance | Accessibility | Best Practices | SEO |
|------|-----|:-----------:|:-------------:|:--------------:|:---:|
| Home | `/` | 60 | 91 | 100 | 100 |
| Builder | `/builder` | 58 | 91 | 100 | 100 |
| Systems | `/systems` | 57 | 92 | 100 | 100 |
| Agendar | `/agendar` | 62 | 96 | 100 | 100 |
| Aplicar | `/aplicar` | 62 | 97 | 100 | 100 |

---

## Detailed Results

### Home (`/`)

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 6.3 s |
| Largest Contentful Paint (LCP) | 7.7 s |
| Total Blocking Time (TBT) | 0 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 6.3 s |

**Top 3 Opportunities:**

| Opportunity | Estimated Savings |
|-------------|:-----------------:|
| Minify JavaScript | ~2,100 ms |
| Reduce unused JavaScript | ~140 ms |
| Minify CSS | < 1 ms |

---

### Builder (`/builder`)

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 7.5 s |
| Largest Contentful Paint (LCP) | 9.3 s |
| Total Blocking Time (TBT) | 0 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 7.5 s |

**Top 3 Opportunities:**

| Opportunity | Estimated Savings |
|-------------|:-----------------:|
| Minify JavaScript | ~2,840 ms |
| Reduce unused JavaScript | ~140 ms |
| Minify CSS | < 1 ms |

---

### Systems (`/systems`)

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 8.2 s |
| Largest Contentful Paint (LCP) | 10.6 s |
| Total Blocking Time (TBT) | 10 ms |
| Cumulative Layout Shift (CLS) | 0.002 |
| Speed Index | 8.2 s |

**Top 3 Opportunities:**

| Opportunity | Estimated Savings |
|-------------|:-----------------:|
| Minify JavaScript | ~3,290 ms |
| Reduce unused JavaScript | ~440 ms |
| Minify CSS | < 1 ms |

---

### Agendar (`/agendar`)

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 5.6 s |
| Largest Contentful Paint (LCP) | 7.1 s |
| Total Blocking Time (TBT) | 0 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 5.6 s |

**Top 3 Opportunities:**

| Opportunity | Estimated Savings |
|-------------|:-----------------:|
| Minify JavaScript | ~2,100 ms |
| Reduce unused JavaScript | ~150 ms |
| Minify CSS | < 1 ms |

---

### Aplicar (`/aplicar`)

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 5.6 s |
| Largest Contentful Paint (LCP) | 7.1 s |
| Total Blocking Time (TBT) | 0 ms |
| Cumulative Layout Shift (CLS) | 0.018 |
| Speed Index | 5.6 s |

**Top 3 Opportunities:**

| Opportunity | Estimated Savings |
|-------------|:-----------------:|
| Minify JavaScript | ~1,950 ms |
| Reduce unused JavaScript | ~0 ms |
| Minify CSS | < 1 ms |

---

## Cross-Page Summary

### Score Patterns

| Category | Min | Max | Avg | Pattern |
|----------|:---:|:---:|:---:|---------|
| Performance | 57 | 62 | 59.8 | All pages in the "Needs Improvement" band (50–89) |
| Accessibility | 91 | 97 | 93.4 | Solid across the board; conversion pages (/agendar, /aplicar) score highest |
| Best Practices | 100 | 100 | 100 | Perfect across all pages |
| SEO | 100 | 100 | 100 | Perfect across all pages |

### Key Findings

**1. Performance is uniformly weak — but this is a dev build artifact.**
All FCP values are 5.6–8.2 s and LCP values are 7.1–10.6 s. In a dev server build, Astro does not minify or bundle JavaScript. The primary opportunity — "Minify JavaScript" — accounts for 1,950–3,290 ms of recoverable savings per page. Running `npm run build` and auditing the production output is expected to push performance scores into the 85–95+ range.

**2. /systems is the heaviest page.**
It has the worst FCP (8.2 s), worst LCP (10.6 s), highest unused JS (440 ms savings), and the only non-zero TBT (10 ms). This page has the most interactive or complex components and should be prioritized for review when production audits are run.

**3. /builder is second-heaviest.**
LCP of 9.3 s and JS minification savings of 2,840 ms. Likely has more inline scripts or larger component tree than the conversion pages.

**4. Conversion pages (/agendar, /aplicar) perform best.**
Both score 62 on Performance with FCP/LCP of 5.6/7.1 s — a ~1–3 s advantage over content pages. Their simpler layouts reduce JS payload. They also score highest on Accessibility (96 and 97), which is appropriate for conversion-focused pages.

**5. CLS is near-zero everywhere — layout stability is excellent.**
/aplicar has CLS of 0.018 (still "Good" threshold is < 0.1), and /systems has 0.002. All other pages are 0. No layout shift issues to fix.

**6. TBT is effectively zero across all pages.**
Main thread blocking is not a concern in the current build. This means interactivity (TTI) will not be an issue once paint times are resolved.

**7. Accessibility gap between content and conversion pages.**
Content pages (Home, Builder, Systems) score 91–92 vs. conversion pages at 96–97. This 5-point gap likely reflects missing ARIA labels, contrast issues, or form labeling differences. A dedicated accessibility pass on the content pages is warranted.

---

## Priority Action Items (for dev-agent)

| Priority | Action | Pages Affected | Expected Impact |
|----------|--------|----------------|-----------------|
| P0 | Run `npm run build` and re-audit against production build | All | Performance: +25–35 pts expected |
| P1 | Investigate /systems JS payload — reduce or defer non-critical scripts | /systems | LCP: -2–3 s |
| P2 | Audit /builder component tree for unnecessary client-side JS | /builder | LCP: -1–2 s |
| P3 | Accessibility pass on Home, Builder, Systems (target 95+) | Home, Builder, Systems | Accessibility: +4–6 pts |
| P4 | Investigate /aplicar CLS (0.018) — identify which element shifts | /aplicar | CLS: to 0 |

---

## Methodology Notes

- All audits were run against the local **development server** (`npm run dev`), not a production build.
- Lighthouse simulates a throttled mobile connection (Moto G Power) with 4x CPU slowdown by default.
- Dev server scores are expected to be 20–35 points lower on Performance compared to a production (`npm run build`) deployment on Vercel.
- Re-run this audit against the production build before treating Performance scores as representative.
- Command used per page: `npx lighthouse [URL] --output=json --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --quiet`
