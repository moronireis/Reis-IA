# Reference Extraction — asimov.academy

**Date**: 2026-04-14
**URL**: https://asimov.academy (HTTP 200, 533KB static HTML)
**Extractor**: design-system-extractor (Track B — source harvest)

---

## TL;DR — Honest Assessment

**Asimov Academy is NOT a cinematic premium reference.** It is a pragmatic, high-converting WordPress + Elementor edtech landing page. The design is functional, not refined.

It succeeds on social proof, clear curriculum architecture, and conversion flow — not on visual craft, motion design, or cinematic storytelling. Anything extracted here should be treated as *structural / conversion / information-architecture patterns*, not as a visual language to emulate.

For the REIS [IA] hero brief, Asimov should be used as a **counter-reference**: "what high-conversion edtech does well (clarity, social proof, curriculum map) that we should absorb — while completely rejecting its visual language (flat Elementor, stock photography, no motion system)."

---

## Stack Detected (confirmed from HTML)

| Layer | Technology |
|-------|-----------|
| CMS | WordPress |
| Theme | Hello Elementor v3.0.1 (minimal WP starter theme) |
| Page builder | Elementor + Elementor Pro v4.0.1 |
| JS runtime | jQuery 3.7.1 + jquery-migrate |
| Carousel | Swiper v8.4.5 (Elementor-wrapped) |
| Fonts | Google Fonts: Roboto, Poppins, DM Sans, Source Code Pro, Rethink Sans, Voltaire |
| Animations | Elementor built-in CSS animations only: fadeIn, fadeInUp, fadeInRight, e-animation-grow |
| Icons | Elementor icon library |
| Checkout | Hotmart (external links) |

**What is NOT present (verified by grep):** GSAP, ScrollTrigger, Three.js, Lenis, Framer Motion, WebGL, custom shaders, canvas elements, video backgrounds, IntersectionObserver-driven scroll scenes, SplitText, Matter.js, custom easing curves. Zero cinematic motion infrastructure.

---

## What the page does well (worth absorbing — structural, not visual)

1. **Curriculum map as hero value prop.** The entire page is built around "Formações > Trilhas > Cursos > Projetos". Numbers are concrete: +18k alunos, 275h aulas, 61 cursos, 79 projetos. The offer is legible in 3 seconds.
2. **Hierarchy of commitment.** Free trilhas on top of the funnel, paid Formações below. Clear progression from explorer to student.
3. **Social proof stacked early.** Student count, course count, project count appear before the first fold scroll. Trust before persuasion.
4. **Team photography, not stock AI imagery.** Real faces (`Equipe.png`, `Equipe-2.png`). The site refuses to use Midjourney cyborgs — a good instinct we should keep for REIS [IA] (though we'll elevate it far beyond team snapshots).
5. **Multiple entry paths, one checkout.** Nav offers IA / Dados / AI Designer formacoes, but every CTA funnels to Hotmart. Focused conversion despite broad catalog.

## What the page does poorly (DO NOT emulate)

1. **No visual hierarchy beyond Elementor defaults.** Headings, cards, spacing all feel template-shaped. There is no designer fingerprint — it could be any of 10,000 Elementor sites.
2. **Typographic chaos.** Six Google Font families loaded simultaneously (Roboto, Poppins, DM Sans, Source Code Pro, Rethink Sans, Voltaire). This is the opposite of premium restraint.
3. **No motion language.** Everything is static or fadeIn. The page has no sense of time, cinematography, or guided reveal.
4. **Color bloat.** The page contains 22+ distinct hex codes (see design-tokens.md), most of them from WordPress block defaults, never harmonized into a real palette.
5. **Hero is a headline + button + team photo.** Zero cinematic composition. It's an information panel, not a scene.

---

## Verbatim Hero Copy (PT-BR)

**H1:** "A maior escola de Python e IA do Brasil"

**Subcopy (reconstructed from nearby blocks):** "Saia do zero e aprenda a criar sistemas com Inteligência Artificial, dashboards, web apps, realizar análise de dados, automações de sistemas e muito mais."

**Primary CTA:** "Matricule-se agora" → Elementor popup

**Social proof bar below the fold:** +18 mil alunos · 275h aulas · 61 cursos · 79 projetos

---

## What to extract for REIS [IA]

**Structural patterns (yes):**
- Social-proof stat bar directly under the headline (adapt: swap student counts for revenue/outcome counts).
- Curriculum-as-map architecture (adapt: pillars-as-map — Builders, Systems, Marketing).
- Single-funnel convergence (yes — every CTA to /agendar or /aplicar).

**Visual / motion patterns (no):** Nothing. Our cinematic reference library should come from the existing SEED.md patterns and sites like Stripe, Linear, Apple, Porsche — not from Asimov.

---

## Gaps in this extraction

- The HTML is server-rendered but Elementor defers CSS variables into per-post CSS files (`post-2472.css`, `post-5.css`) which we did not fetch. Specific Elementor kit colors and custom properties are therefore not captured — only the generic WordPress block palette (22 hex codes in `design-tokens.md`).
- No runtime JS was executed. Any swiper configurations, lazy-loaded images, or above-the-fold hero composition details that depend on JS execution are not captured.
- Hero image asset visual (`Equipe-2.png`) was referenced but not fetched.
- This is enough to confirm the stack and the honest assessment above. Fetching per-post CSS would only refine token values — it would not change the conclusion.
