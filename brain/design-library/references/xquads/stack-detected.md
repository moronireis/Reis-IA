# Xquads — Stack Detection
## Source: https://raxo.com.br/xquads
## Extracted: 2026-04-22

---

## Framework

| Check | Detected | Evidence |
|-------|----------|----------|
| Next.js | NO | No `__next`, no `_next/`, no `__NEXT_DATA__` |
| Astro | NO | No `astro-` prefixes, no `<astro-island>` |
| React | NO | No `data-reactroot`, no React bundles |
| Vue | NO | No `v-` directives, no Vue bundles |
| Svelte | NO | No svelte markers |
| Plain HTML | **YES** | Single `<!DOCTYPE html>` file, no framework markers, no build fingerprints |

**Verdict: Static single-page HTML with inline CSS and vanilla JS.** No framework, no build step.

---

## CSS Approach

| Check | Detected | Evidence |
|-------|----------|----------|
| Tailwind | NO | No `class="bg-gray-900 text-white"` utility patterns |
| CSS Modules | NO | No hashed class names |
| CSS-in-JS | NO | No `styled-components`, no `emotion` |
| Inline `<style>` | **YES** | ~1,324 lines of CSS in a single `<style>` block in `<head>` |
| CSS Custom Properties | **YES** | 15 custom properties on `:root` |
| BEM | NO | Class naming is descriptive but not BEM (e.g., `.hero-title`, `.dor-card`, `.module-list`) |

**Verdict: Single inline `<style>` block with CSS custom properties. Naming convention is component-prefix (`.hero-*`, `.dor-*`, `.module-*`, `.price-*`). Clean and readable.**

---

## JavaScript Libraries

| Library | Detected | Evidence |
|---------|----------|----------|
| GSAP | NO | No `gsap.`, no ScrollTrigger |
| Three.js | NO | No `THREE.`, no WebGL context |
| Framer Motion | NO | No `motion.`, no `framer-motion` |
| Lenis | NO | No `@studio-freight/lenis` |
| Spline | NO | No `spline-viewer` |
| jQuery | NO | No `$()` or `jQuery` |
| Anime.js | NO | — |
| AOS | NO | — |
| Swiper | NO | — |

**Verdict: 100% vanilla JavaScript.** ~130 lines of JS total.

---

## JS Features Used

1. **Canvas 2D API** — Animated grid background (`getContext('2d')`, `requestAnimationFrame`)
2. **IntersectionObserver** — Scroll-triggered reveal animations
3. **setTimeout chains** — Typewriter effect
4. **URLSearchParams** — UTM passthrough to checkout links
5. **querySelectorAll + forEach** — Smooth scroll, stagger delays
6. **Smooth scroll** — `scrollIntoView({ behavior: 'smooth' })`

---

## Fonts

| Font | Source | Weights |
|------|--------|---------|
| Inter | Google Fonts (`fonts.googleapis.com`) | 300, 400, 500, 600, 700, 800, 900 |
| JetBrains Mono | Google Fonts | 400, 500, 700 |

With `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`.

---

## Third-Party Scripts

| Service | Purpose | Evidence |
|---------|---------|----------|
| Meta Pixel | Facebook tracking | Pixel ID: `1290652196087643`, tracks `PageView` + `ViewContent` (value: R$67) |
| Converteai / VTurb | Video player | `scripts.converteai.net`, `vturb-smartplayer` custom element |
| Kiwify | Payment | Checkout link: `pay.kiwify.com.br/TcQ5eM1` |

---

## Hosting / CDN

| Signal | Value |
|--------|-------|
| Domain | `raxo.com.br` |
| Subpath | `/xquads` |
| Image assets | Self-hosted at `/xquads/logo-xquads.png`, `/xquads/foto-rafael.jpeg` |
| Video hosting | Converteai CDN (`cdn.converteai.net`) |

**Likely hosted on a standard web server or static hosting. No evidence of Vercel/Netlify/Cloudflare Pages headers.**

---

## Performance Notes

- **Single HTML file** with all CSS inline — no external stylesheets to block rendering
- **No JS framework overhead** — minimal JS payload (~130 lines)
- **Canvas animation runs continuously** — `requestAnimationFrame` loop with grid iteration (potential CPU cost on large screens)
- **Font loading**: preconnect + display=swap — good practice
- **Images**: Only 2 images (logo + author photo), both self-hosted
- **Video**: Lazy-loaded via Converteai player script

---

## SEO / Meta

- `lang="pt-BR"`
- Open Graph: title, description, image, url, type
- Twitter Card: `summary_large_image`
- Meta description present
- Semantic sections: `<nav>`, `<section>`, `<footer>`, `<h1>`, `<h2>`, `<h3>`
