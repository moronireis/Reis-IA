# Xquads — Suggested Pattern Distillations
## Source: https://raxo.com.br/xquads
## Extracted: 2026-04-22

---

These are concrete proposals for pattern files to be created in `brain/design-library/patterns/`. Each references specific source lines in `html.html` and explains why it is worth distilling.

---

## 1. `patterns/layout/1px-gap-grid.md` — Why + Source

**Source**: `html.html` lines 368-376 (`.dor-grid`), 641-650 (`.modules-grid`), 1020-1031 (`.faq-list`), 875 (`.entrega-items`)

**Why**: This is a clean, widely reusable technique for creating visible cell borders in a grid layout without managing per-card `border` properties. The container itself provides the "border" via its background color showing through the 1px gap. Overflow hidden + border-radius on the container gives rounded corners. Used 4 times on this page alone, proving its versatility. We should adapt this for our squad cards, feature grids, and FAQ sections.

**Technique**:
```css
.grid-container {
  display: grid;
  gap: 1px;
  background: var(--border-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  overflow: hidden;
}
.grid-item {
  background: var(--card-bg);
}
```

---

## 2. `patterns/motion/canvas-ambient-grid.md` — Why + Source

**Source**: `html.html` lines 1861-1897 (JS), lines 48-55 (CSS)

**Why**: The Canvas 2D animated grid creates a subtle, technical atmosphere that reinforces the "developer tool" brand without being distracting. It is more sophisticated than static CSS gradients but simpler than Three.js. For our AGENTES [IA] LP, we could adapt this with our blue (#4A90FF) instead of their green, using smaller cells and different opacity ranges. The approach is lightweight (no dependencies) and the performance characteristics are well-understood.

**Adaptation notes**: Add `prefers-reduced-motion` check (they didn't). Consider throttling to 30fps instead of full rAF. Use `will-change: transform` or offscreen canvas for better perf.

---

## 3. `patterns/components/terminal-code-card.md` — Why + Source

**Source**: `html.html` lines 582-624 (CSS), lines 1466-1489 (HTML)

**Why**: The macOS-style terminal card with colored dots (`.dot-r`, `.dot-y`, `.dot-g`), filename label, and syntax-highlighted code body is the most effective visual element on the page. It immediately communicates "this is a developer tool" and shows the product in action. For our AGENTES [IA] LP, this is a must-have — we should build a more polished version with actual working syntax highlighting and possibly a typing animation.

**Our adaptation**: Replace JetBrains Mono with our own monospace choice. Use #4A90FF for keywords instead of #D1FF02. Add subtle border glow. Consider making it interactive (click to copy commands).

---

## 4. `patterns/motion/button-shimmer.md` — Why + Source

**Source**: `html.html` lines 249-261 (CSS)

**Why**: Pure CSS button shimmer on hover — a skewed semi-transparent overlay that slides from left to right. Simple, elegant, and requires zero JS. Works as a premium micro-interaction for primary CTAs. The implementation is just a `::after` pseudo-element with `transition: left 0.5s ease`.

**Source snippet**:
```css
.btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: rgba(255,255,255,0.12);
  transform: skewX(-20deg);
  transition: left 0.5s ease;
}
.btn:hover::after { left: 120%; }
```

---

## 5. `patterns/layout/section-label-ornament.md` — Why + Source

**Source**: `html.html` lines 314-344 (CSS)

**Why**: Monospace uppercase label flanked by decorative lines using `::before`/`::after` pseudo-elements with `flex: 1` and `max-width: 60px`. Clean section introduction pattern used throughout the page. We already use section labels in our design system but this ornamental variant adds premium polish.

---

## 6. `patterns/components/sticky-price-sidebar.md` — Why + Source

**Source**: `html.html` lines 913-977 (CSS), lines 1732-1747 (HTML)

**Why**: During the "what you get" section, the price card stays visible via `position: sticky; top: 100px`. As the user scrolls through 4 deliverable items, the R$67 price and CTA button remain anchored. This is a conversion optimization pattern — reducing the distance between "I want this" and "buy now" to zero. For our AGENTES [IA] LP (R$47), this exact pattern applies.

**Mobile note**: They disable sticky on mobile (`position: static` at 768px), which is correct since sidebar layouts collapse to single column.

---

## 7. `patterns/components/marquee-social-proof.md` — Why + Source

**Source**: `html.html` lines 278-312 (CSS), lines 1402-1416 (HTML)

**Why**: CSS-only infinite horizontal marquee using `translateX(-50%)` with duplicated content. No JS. Clean implementation for social proof, partner logos, or feature callouts. The proof bar sits between hero and content as a visual break and trust signal.

**Key implementation detail**: Content is duplicated in HTML, animation translates by -50%, creating a seamless infinite loop. Gap: 64px between items, duration: 28s.

---

## What We Should Do BETTER

1. **Replace emojis with custom SVG icons** — Their emoji usage (squad icons, security badges) looks amateur. We should use minimal geometric SVG icons consistent with REIS [IA] brand.

2. **Add real product screenshots** — They show zero actual screenshots of the product working. Our LP should include terminal recordings or interactive demos.

3. **Add testimonials** — Their proof bar has feature claims, not user quotes. We should include real user results.

4. **Respect `prefers-reduced-motion`** — Their canvas animation and all CSS animations ignore this media query. Our LP must respect it.

5. **Eliminate the typewriter effect** — It's 2026, this pattern is tired. Use a more sophisticated text reveal (split text, clip-path reveal) or a static headline that just works.

6. **Stronger visual hierarchy in squad grid** — All 11 of their squad cards look identical. We should differentiate our agent categories visually (size, color accent, featured status).

7. **Premium typography** — Their type system is solid but basic. We should use our editorial typography system with tighter kerning, optical sizing, and proper typographic hierarchy.
