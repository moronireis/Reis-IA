# Suggested Patterns — castelo-estrategia.vercel.app

> Extracted: 2026-04-15
> Purpose: Concrete pattern files the orchestrator should approve and delegate into `brain/design-library/patterns/`. This harvest produces 7 distillable patterns.
> Rule: I do NOT create these myself. I propose; the orchestrator approves.

---

## Pattern 1 — Editorial Serif + Sans Pairing (Cormorant Garamond + Inter)

- **Target path**: `brain/design-library/patterns/typography/editorial-serif-sans-pairing.md`
- **Category**: typography
- **Reusability**: HIGH — any REIS IA or client brand that wants "editorial-premium" (venues, hospitality, luxury services, long-form strategic docs) instead of "tech-premium"
- **Dependencies**: Google Fonts OR self-hosted woff2 for Cormorant Garamond (weights 300/400/500 + italic 300/400) and Inter (weights 300/400/500/600/700)
- **Key rules to document**:
  - Headings ALWAYS Cormorant, ALWAYS `font-weight: 300` or `400` (never bold)
  - `letter-spacing: -0.02em` on headings
  - Body ALWAYS Inter with `line-height: 1.7`
  - Italic serif + accent-color = reserved for one-word emphasis in hero H1
  - All numerals (KPIs, metrics, section numbers) use Cormorant, not Inter — numbers as typography, not UI
- **Copy-paste-ready snippets**: Google Fonts `<link>`, CSS base rules, clamp() hero sizing

---

## Pattern 2 — Numbered Section Markers (Document Mode)

- **Target path**: `brain/design-library/patterns/layout/numbered-section-markers.md`
- **Category**: layout / composition
- **Reusability**: HIGH — any long-scroll strategic or editorial page (brandbook sections, case studies, manifestos, academy lessons, Reis IA product pages, client pitch docs)
- **Dependencies**: Cormorant Garamond font, CSS custom property for gold/accent color
- **Key rules**:
  - Section header = `[Cormorant gold micro-cap 0.875rem 0.15em tracking] + [Cormorant 300 section title 2–3rem] + [Inter 300 body subtitle]`
  - Numbering scheme: `0.1 INTRODUÇÃO`, `0.2 DIAGNÓSTICO`, `0.3 CONCORRÊNCIA`, `1.0 ESTRATÉGIA`, `2.0 EXECUÇÃO`, etc.
  - 4rem bottom margin desktop / 2.5rem mobile
  - Markers ONLY in gold — never in body color
- **Why it matters**: transforms a scrollable page into a "numbered document", which immediately signals editorial intent and makes the reader feel like they are consuming an artifact rather than browsing a site

---

## Pattern 3 — Hairline Grid Dividers (1px-Gap Trick)

- **Target path**: `brain/design-library/patterns/layout/hairline-grid-dividers.md`
- **Category**: layout
- **Reusability**: HIGH — any minimal card grid where you want borders between cells but no outer shadow (pillar grids, KPI grids, feature grids, SWOT quadrants, pricing matrices)
- **Dependencies**: CSS Grid
- **Key recipe**:
  ```css
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);       /* the "divider color" */
    border: 1px solid var(--border); /* outer frame */
  }
  .grid > .card {
    background: var(--white);        /* opaque cells reveal gap as divider */
    padding: 2.5rem;
  }
  ```
- **Why it matters**: zero extra markup (no pseudo-elements, no separator divs), hairline crisp on retina, responsive-friendly, works on both light and dark themes by flipping the two color variables

---

## Pattern 4 — Fade-Up on IntersectionObserver (Restrained Scroll Reveal)

- **Target path**: `brain/design-library/patterns/motion/fade-up-intersection-observer.md`
- **Category**: motion
- **Reusability**: VERY HIGH — should be the DEFAULT scroll-reveal pattern for all REIS IA marketing pages before reaching for GSAP or Framer Motion
- **Dependencies**: vanilla JS only (no GSAP, no Framer, no Lenis)
- **Key config**:
  - `opacity: 0` + `transform: translateY(20px)` initial state
  - `transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1)` (slow easeOutExpo-adjacent swoop — 800ms is part of the premium feel, do not shorten)
  - IntersectionObserver `threshold: 0.1`, `rootMargin: '0px 0px -50px 0px'`
  - One-shot: once visible, stays visible
  - 20px distance only — subtle
  - Must include `@media (prefers-reduced-motion: reduce)` fallback
- **Total weight**: under 1KB of JS. No library.
- **Why it matters**: 90% of "premium scroll reveals" we see in competitive refs are just this pattern with a slower easing. GSAP/Framer are overkill for this use case.

---

## Pattern 5 — Fixed Nav with Scroll-State Invert

- **Target path**: `brain/design-library/patterns/components/fixed-nav-scroll-state-invert.md`
- **Category**: component / navigation
- **Reusability**: VERY HIGH — any hero-driven marketing or editorial page where the nav must read as "transparent over dark hero" then "blurred white card over body content"
- **Dependencies**: vanilla JS (one `scroll` listener + class toggle), CSS `backdrop-filter: blur(20px)`
- **Key recipe**:
  ```css
  .nav { position: fixed; top: 1.6rem; transition: all 0.4s ease; }
  .nav.scrolled {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 0;
  }
  .nav.scrolled .nav-brand { color: var(--charcoal); }
  .nav.scrolled .nav-links a { color: var(--text-muted); }
  ```
  ```js
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  });
  ```
- **Threshold: 100px** — just past the hero fold. Syncs with background transition.
- **Production note**: wrap the scroll listener in rAF for a real site

---

## Pattern 6 — Confidential Document Bar (Narrative Framing Device)

- **Target path**: `brain/design-library/patterns/components/confidential-document-bar.md`
- **Category**: component / narrative UI
- **Reusability**: MEDIUM — specific to strategic presentations, client pitch documents, internal memos, NDA-adjacent artifacts, Reis IA consultoria deliverables
- **Dependencies**: none
- **Key recipe**:
  - Fixed at top, z-index above nav
  - Accent-color background (gold), charcoal text
  - 0.6rem font-size, 0.2em letter-spacing, uppercase, weight 600
  - 0.4rem vertical padding — extremely thin, almost a frame
  - Content: "DOCUMENTO CONFIDENCIAL — [project name]"
- **Why it matters**: single-line typographic element that immediately positions the reader ("you are being trusted with this"). Strong fit for Reis IA strategy decks, client-facing memos, Builder member-only content, high-ticket sales documents.

---

## Pattern 7 — Italic Accent Emphasis (One-Word Hero Move)

- **Target path**: `brain/design-library/patterns/typography/italic-accent-emphasis.md`
- **Category**: typography / microtype
- **Reusability**: HIGH — any hero headline that needs one word to carry visual weight
- **Dependencies**: Cormorant Garamond (italic 400) OR any serif with italic weight + an accent color
- **Key rule**:
  ```html
  <h1>29 anos de gastronomia. <em>Está na hora</em> do mundo saber disso.</h1>
  ```
  ```css
  .hero h1 { font-family: 'Cormorant Garamond', serif; font-weight: 300; color: var(--white); }
  .hero h1 em { font-style: italic; color: var(--gold); font-weight: 400; }
  ```
- **Rules of the move**:
  - ONE phrase italicized, never more
  - The italicized phrase MUST be the strategic emphasis, not decoration
  - The italic weight is 100 higher than the surrounding roman (400 vs 300)
  - Color shifts to accent, not just italic
- **Why it matters**: zero-cost, zero-JS, pure typographic tool that makes a hero H1 feel art-directed. Easy to ship on ANY page.

---

## Distillation Priority (Recommendation for Orchestrator)

**Distill first (biggest reuse, lowest effort):**
1. Pattern 4 — Fade-Up IntersectionObserver (replaces GSAP reach-for on 90% of pages)
2. Pattern 1 — Editorial Serif+Sans pairing (immediately usable in the Reis IA brandbook variant and Castelo branding)
3. Pattern 3 — Hairline Grid Dividers (unlocks a cleaner card system project-wide)

**Distill second (strategic but narrower):**
4. Pattern 2 — Numbered Section Markers
5. Pattern 5 — Fixed Nav Scroll Invert

**Distill third (specialized):**
6. Pattern 7 — Italic Accent Emphasis
7. Pattern 6 — Confidential Document Bar
