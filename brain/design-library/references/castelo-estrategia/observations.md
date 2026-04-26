# Observations — castelo-estrategia.vercel.app

> Extracted: 2026-04-15
> Purpose: Approved by Moroni as the **aesthetic ceiling reference** for the Castelo dos Lagos + Buffet Di Matoso branded-house redesign.
> Context: This site is itself a REIS [IA]-authored strategic document FOR the Castelo project — it is simultaneously the artifact AND the aesthetic prototype. That reflexivity is important: the document-as-site convention is part of why it reads premium.

---

## 1. Why This Reads Premium (One Paragraph)

The site commits, hard, to a single editorial idea: **this is not a website, it is a private strategic document that happens to render in a browser**. Everything reinforces that. The fixed "Documento Confidencial" bar at the top. The 1100px max-width that never tries to be full-bleed. The Cormorant Garamond numerals floating as section markers (0.1, 0.2, 0.3...). The square cards with hairline gold dividers instead of rounded shadowed cards. The 800ms slow fade-up on scroll that feels like pages turning rather than UI reacting. The warm off-white #FAFAF7 surface instead of sterile pure white. The single gold accent (#C9A96E) used with restraint — never for buttons, always for typographic emphasis. The italic serif + gold combo on the hero H1 signaling "this is the one emphasized word". The total absence of decoration: no gradients except two hero radial glows, no shadows except on two mockup frames, no animations except fade-up + nav state + one pulsing scroll line. This is Monocle magazine as a web document. It is the opposite of SaaS. For a venue that sells event experiences to high-ticket clients (weddings, corporate, intimate gatherings), this tone is exactly right.

## 2. Detected Stack Checklist

- [ ] GSAP / ScrollTrigger / SplitText
- [ ] Three.js / R3F / Drei
- [ ] Spline
- [ ] Lenis
- [ ] Framer Motion
- [ ] Custom WebGL shaders
- [ ] Canvas 2D particles
- [x] **Vanilla JS + IntersectionObserver**
- [x] **CSS transitions + cubic-bezier(0.16, 1, 0.3, 1)**
- [x] **Native `scroll-behavior: smooth`**
- [x] **Hand-written CSS custom properties**
- [x] **Google Fonts: Cormorant Garamond + Inter**

## 3. Signature Techniques (Ranked by Impact)

1. **Cormorant Garamond + warm gold + warm off-white surface** — the single most important visual decision. Everything else follows from this color/type pairing. Get this right and 70% of the aesthetic is already secured.
2. **Section numbering as Cormorant micro-caps in gold (0.1 / 0.2 / 0.3)** — transforms a scrollable page into a numbered document. Invaluable narrative device.
3. **Hairline gold borders at 20% opacity instead of shadows** — cards feel like architectural drawings, not SaaS widgets.
4. **Square zero-radius cards** — violates the 2026 rounded-card default and that's exactly the point.
5. **Italic serif + gold for hero emphasis word** — one-word visual hit that anchors the entire hero.
6. **Slow 800ms easeOutExpo fade-up on IntersectionObserver** — restrained motion that feels considered.
7. **Fixed "Confidential Document" gold bar at the top** — narrative framing device that immediately positions the reader.
8. **Fixed nav that inverts colors on scroll past hero** — white/gold over dark hero → charcoal/muted over light body. Pure CSS + one class toggle.
9. **Warm off-white `#FAFAF7` as the light-section background** — never pure white. The "paper" vs "screen" distinction is made here.
10. **1px-gap grid trick for hairline card dividers** — `gap: 1px` + colored grid background = zero-weight dividers between cards.
11. **Serif numerals for metrics (KPI targets, budget totals, hero counts, phase numbers)** — numbers become typographic rather than UI.
12. **Dark/light section alternation** — creates editorial rhythm. Dark hero → white diagnosis → dark competitors → light SWOT → light phases → dark funnel → light KPI → dark next steps. Music-like.

## 4. Patterns to Distill (Suggestions for the Orchestrator)

I am **not** creating these — I am suggesting them for the orchestrator to approve and delegate. Each is a concrete `brain/design-library/patterns/` entry:

1. `patterns/typography/editorial-serif-sans-pairing.md` — why: the Cormorant Garamond + Inter pairing is reusable across REIS IA and client brands that want "editorial-premium" instead of "tech-premium". Documents the weight discipline (headings always 300/400, never bold).
2. `patterns/layout/numbered-section-markers.md` — why: turns any long-scroll page into a "numbered document". Reusable in any strategic/editorial content (Reis IA brandbook, case studies, manifestos, academy lessons).
3. `patterns/layout/hairline-grid-dividers.md` — why: the 1px-gap trick for creating hairline borders between grid cards with zero extra markup. Reusable in any minimal card grid (pillar grids, KPI grids, feature grids).
4. `patterns/motion/fade-up-intersection-observer.md` — why: lightest possible scroll-reveal. Vanilla JS + 800ms cubic-bezier. No GSAP overhead. Should be the DEFAULT for any REIS IA marketing page before reaching for heavier stacks.
5. `patterns/components/fixed-nav-scroll-state-invert.md` — why: nav that transitions from transparent-over-dark-hero to blurred-white-over-content. Exact CSS + JS recipe. Reusable on any hero-driven marketing page.
6. `patterns/components/confidential-document-bar.md` — why: narrative framing device (fixed bar at the top declaring the document type). Strong fit for REIS IA strategic decks, client presentations, internal-memo-style long-scroll pages.
7. `patterns/typography/italic-accent-emphasis.md` — why: the single-word italic-serif-in-accent-color emphasis pattern. One-word visual hit on hero H1. Reusable pattern, easy to ship.

## 5. Non-Code Ideas Worth Stealing

- **Composition**: the site is built around a 1100px max-width that never tries to fill the viewport. Whitespace on the sides is the design. Every reference that tries "modern full-bleed" loses this.
- **Pacing**: sections alternate dark/light in a deliberate rhythm. Never two light sections in a row, never two dark. The eye re-resets between each.
- **Editorial voice**: the document uses Portuguese executive tone (non-salesperson, non-marketer) — "Documento Confidencial", "Preparado em 31 de março de 2026", "REIS [IA] • Documento Confidencial" in footer. This framing tells the reader "you are reading, not being sold to".
- **Restraint as signature**: almost everything premium sites do wrong is done by adding. This document is premium because of what it does NOT do. No hero video, no particles, no parallax, no animated counters, no floating CTAs, no exit-intent popups, no chatbot widget. The brief for the real Castelo site should preserve this restraint.
- **Numerals as typography**: every time a number appears (KPI, phase, hero meta, budget total, pillar percentage), it is rendered in Cormorant Garamond, not Inter. This is the single clearest visual signal that the document treats data as editorial, not dashboard.

## 6. What Is Mediocre or Dated (Do NOT Reuse)

- **No `prefers-reduced-motion`** — must be added in any production adaptation.
- **No lazy-loading / no image strategy** — the site has no real photography. The actual Castelo + Buffet Di Matoso sites will have gallery sections and need a proper image strategy (ratio-preserved containers, blur-up, responsive srcset). The reference gives zero guidance here.
- **Unthrottled scroll listener** — `window.addEventListener('scroll', ...)` with no rAF. Fine for a static document, wrong for a production site.
- **Google Fonts external load** — adds a third-party dependency and a FOUT flash. Self-host in production.
- **No OG / social share metadata** — zero Open Graph tags, no Twitter card, no favicon strategy. A gap for any link-shared document.
- **No accessibility audit possible from source** — most interactive elements are `<a href="#anchor">`, buttons have no ARIA labels, color contrast on rgba(255,255,255,0.5) body text on dark needs verification.
- **No analytics / no Vercel Insights** — fine for a confidential doc, wrong for marketing surface.
- **Mockups are HTML-drawn, not real screenshots** — good trick for a pitch document, but the actual Castelo sites will need real photography. This reference gives zero answers on how photography should be art-directed (lighting, composition, color grading). That gap is owned by the `art-director` consuming this harvest.

## 7. Gaps — What Is Missing to Be 10/10

- Real photography direction (the site uses zero photos; the venue sites MUST)
- A defined radius scale (only `100px` pills and `12px` mockups exist — inconsistent)
- Micro-interactions on CTAs (all "CTAs" are anchor links — no button hover states defined)
- A proper footer (current footer is one line: `REIS [IA] — Documento preparado em...`)
- Dark mode strategy for the LIGHT sections (it's a single-theme document)
- Animation for the hero-meta numerals (they beg for a counter-up)
- Subgrid / container queries — modern CSS primitives ignored
- Form components — the venue sites will need contact / booking / RSVP forms; zero guidance here
- Mobile nav (current nav hides all links at ≤768px, no hamburger)

## 8. Score: 8.3 / 10

**Breakdown:**
- **Aesthetic intent (10/10)** — crystal clear. Zero ambiguity about what it wants to be.
- **Typographic discipline (10/10)** — Cormorant + Inter pairing, weight restraint, italic-accent-word hero move, serif numerals.
- **Color discipline (9/10)** — single accent, warm palette, nothing wasted. Loses one point for not documenting the two orange/red badges (`#FCA5A5`, `#FCD34D`) in the token system — they appear once and break the monochrome promise.
- **Layout architecture (9/10)** — 1100px max-width, section rhythm, hairline dividers, zero-radius cards. Loses one point for the absence of a photography slot.
- **Motion restraint (9/10)** — fade-up + nav state + pulse. Exactly right amount. Loses one point for missing `prefers-reduced-motion`.
- **Production readiness (5/10)** — single HTML file, no build step, no SEO, no image strategy, no forms, no analytics. This is a prototype/pitch artifact, not a production template.
- **Engineering quality (7/10)** — clean hand-written CSS, readable, but would benefit from CSS layers, nesting, `:where()` specificity management, and a real media query strategy in a production rewrite.
- **Accessibility (6/10)** — basic semantic HTML, but missing skip links, ARIA labels, motion-reduction, mobile nav. Gaps that would block a real-site audit.

**Final: 8.3/10** — an exceptional aesthetic reference and a mediocre production template. Use it as a **look and feel ceiling**, not as a **code starting point**.

## 9. Extraction Limitations

- Only the homepage was fetched (no internal routes observed — this is a single-page document by design).
- Fonts served externally, not inspected for subsets.
- No `robots.txt`, `sitemap.xml`, or deployment headers captured in this extraction pass.
- Screenshots: none captured (Playwright MCP not invoked for this run — WebFetch/curl was sufficient given all CSS + JS is inline). A follow-up pass with Playwright to capture `desktop-full`, `desktop-hero`, `mobile-full`, `mobile-hero` PNGs into `screenshots/` would complete the harvest. Flagging as outstanding for orchestrator.
- No `assets/` folder created — the site has no raster images, videos, or downloadable fonts to harvest.
