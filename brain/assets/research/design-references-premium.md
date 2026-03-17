# Premium Design Language Reference

Last updated: March 2026

---

## Executive Summary: What Makes a Website Feel Premium

Premium websites share one underlying principle: **intentional restraint**. Every element earns its place. The feeling of luxury is created not by adding more, but by having the discipline to remove everything that does not serve the experience.

Six concrete drivers separate premium from average:

1. **Whitespace is structural, not decorative.** Premium sites use emptiness as a layout tool — negative space creates hierarchy, focus, and a sense of exclusivity that crowded layouts cannot achieve.
2. **Typography does heavy lifting.** Size ratios are dramatic, weights are used with precision, and letter-spacing is tuned at the display scale. The typeface itself communicates brand character before a word is read.
3. **Color restraint with a single sharp accent.** Sophisticated palettes are minimal — typically a near-black, an off-white, and one precisely placed accent. The accent earns attention because it appears rarely.
4. **Motion is purposeful and measured.** Animations have easing curves, not linear timing. They reveal, guide, and reward — never distract. Every interaction has a micro-response that confirms the interface is alive.
5. **Depth without noise.** Premium dark mode sites create depth through layered semi-transparent surfaces, subtle gradients, and glow effects — not through patterns, textures, or busy backgrounds.
6. **Scroll pacing is controlled.** The best sites control the narrative through scroll. Content does not dump everything at once. Sections breathe. The user is guided through a story.

---

## 1. Visual Patterns

### 1.1 Whitespace

**What it is:** The deliberate use of empty space around and between elements — in padding, margins, and line-height — as a primary design element.

**Why it works:** Whitespace signals confidence. It says the content is good enough to stand alone. It creates hierarchy without visual noise and makes the user's eye move in a controlled direction.

**How to implement it:**

- Hero sections: minimum 120–160px top/bottom padding on desktop, 80px on mobile
- Between major sections: 120–160px vertical gap (use `clamp()` for fluid scaling)
- Porsche uses `clamp(32px, 2.75vw + 23px, 76px)` to scale spacing fluidly with the viewport
- Bang & Olufsen desktop margins: 36–88px horizontal padding, creating that gallery-wall feeling
- Inline spacing between headline and body copy: 24–32px gap minimum
- Never let content feel "boxed in" — use full-width backgrounds even when content is constrained to a narrower column

**Tailwind approach:**
```
py-32 md:py-40 lg:py-48
gap-y-24 md:gap-y-32
```

---

### 1.2 Typography Hierarchy

**What it is:** A deliberate system of type sizes, weights, and spacing that creates clear visual priority without requiring color or decoration.

**Why it works:** When typography is systematic, the eye can scan a page and immediately identify what matters most. Bold contrast between heading sizes (not subtle steps) signals authority.

**How to implement it:**

**Display / Hero headlines:**
- Size: 64–96px (desktop), 40–56px (mobile)
- Weight: 700–800 (bold to extra-bold)
- Letter-spacing: -0.03em to -0.05em (tighter at large sizes — follows optical perception)
- Line-height: 0.95–1.1 (tight, creates visual unity in multi-line headlines)
- Arc browser uses -0.05em and 0.975em line-height for dramatic impact

**Section headings (H2):**
- Size: 40–56px
- Weight: 600–700
- Letter-spacing: -0.02em
- Line-height: 1.1–1.2

**Body copy:**
- Size: 16–18px
- Weight: 400 (regular) — never bold body copy on dark backgrounds
- Line-height: 1.6–1.75
- Max-width: 60–68ch (prevents line lengths that tire the eye)

**Supporting / label text:**
- Uppercase, 11–13px, letter-spacing: +0.08em to +0.12em
- Weight: 500–600
- Used sparingly as category labels or eyebrows above headings

**Size ratio to aim for:** The jump from body to H1 should feel dramatic, not incremental. A 16px body with a 72px headline is a 4.5x ratio — that contrast is what creates the premium feel. Small ratio = amateur, large ratio = confident.

**Font choices observed:**
- Apple, Vercel, Linear: San Francisco / Inter (clean system-adjacent sans-serif)
- Arc: Marlin + Inter (custom humanist sans)
- Framer: Inter + Inter Display + Space Grotesk (variable font stack for performance)
- Bang & Olufsen: BeoSupreme (custom), Lexend Deca (fallback)

**For Reis IA:** Inter with variable font loading covers the full weight range without multiple file requests.

---

### 1.3 Color Usage in Dark Mode

**What it is:** A layered color system for dark interfaces that creates depth and hierarchy without using pure black or relying on bright saturated colors.

**Why it works:** Pure `#000000` backgrounds feel flat and harsh. Layered near-blacks (e.g., `#0a0a0a`, `#111113`, `#1a1a1e`) create a sense of depth and three-dimensionality. A single warm accent (gold, amber, copper) on a dark surface draws the eye with minimal friction.

**Dark background stack (from deepest to lightest surface):**
```
Page background:   #080808 – #0d0d0d
Card surfaces:     #111113 – #141416
Elevated surfaces: #1c1c1e – #212124
Border color:      rgba(255,255,255,0.08) – rgba(255,255,255,0.12)
Subtle border:     rgba(255,255,255,0.04)
```

**Text hierarchy in dark mode:**
```
Primary text:      #FFFFFF (100% — headlines, CTAs)
Secondary text:    rgba(255,255,255,0.75) – (body copy, descriptions)
Tertiary text:     rgba(255,255,255,0.45) – (captions, meta, labels)
Quaternary text:   rgba(255,255,255,0.25) – (disabled, decorative)
```
Linear uses exactly this four-tier text opacity system with CSS custom properties.

**Accent color placement rules:**
- Use the accent color on at most 2–3 elements per viewport — if everything is gold, nothing is gold
- Primary accent: CTA buttons, key stat numbers, important keywords in headlines
- Secondary accent: Hover states, active nav items, link underlines
- Never use accent as large background fills — reserve for small, high-contrast elements

**Gradient techniques for dark backgrounds:**

*Radial glow:*
```css
background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.15), transparent);
```
This creates a subtle upward glow from the viewport top — used by Vercel and Linear for hero sections.

*Surface gradient cards:*
```css
background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
border: 1px solid rgba(255,255,255,0.08);
```

*Mesh gradient background:*
Multiple overlapping radial gradients at different positions create a soft, organic depth without visible patterns.

---

### 1.4 Section Transitions

**What it is:** How one content section visually "ends" and the next "begins" — beyond just stacking boxes with padding.

**Why it works:** Abrupt section changes make a page feel like a brochure. Thoughtful transitions guide the eye and create narrative flow.

**Techniques observed:**

**Fade-to-background:** The ending section's background gradually matches the next section's background. Achieved with a gradient fade at the bottom edge.

**Diagonal cuts (Arc browser approach):**
```css
clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
```
Creates an angled bottom edge that breaks the grid and adds visual dynamism.

**SVG wave dividers:** Arc uses SVG mask images as pseudo-elements for organic, wavy transitions between sections.

**Overlapping sections:** The next section's content visually bleeds into the previous section's space using negative margin-top and z-index layering. Creates the sense of continuous depth.

**Background continuity:** Rather than changing background colors per section, use a single dark gradient that spans the full page height, and vary the content treatment (card surfaces, images) within it.

**Sticky background shift:** As the user scrolls, the page background itself shifts subtly using `background-attachment: fixed` or scroll-driven gradients — a cinematic effect used on Apple product pages.

---

### 1.5 Background Treatments

**What it is:** What goes behind the content — beyond flat colors.

**Techniques observed:**

**Noise/grain texture (Arc browser, Framer):**
```css
background-image: url('/noise.png');
background-repeat: repeat;
opacity: 0.03;
```
A subtle 200×200px grayscale noise PNG overlaid at 2–4% opacity. Adds analog warmth and prevents the flat-screen "digital plastic" feeling.

**Radial gradient spotlights (Vercel, Linear, Stripe):**
```css
background:
  radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212,175,55,0.12) 0%, transparent 100%),
  radial-gradient(ellipse 40% 60% at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 100%),
  #0d0d0d;
```

**Geometric pixel art (Vercel's GeistPixel system):** Custom icon fonts (Circle, Grid, Line, Square, Triangle) used as background decorations — consistent with brand identity, zero image weight.

**Dot/grid pattern backgrounds (Linear):**
```css
background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
background-size: 24px 24px;
```
Used as a subtle backdrop for hero sections or card backgrounds.

**Semi-transparent backdrop blur (glassmorphism):**
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```
Used for floating navigation bars, modal panels, and feature cards. GPU-accelerated. Use `backdrop-filter` sparingly — it has a performance cost.

---

## 2. Animation & Interaction Patterns

### 2.1 Scroll-Triggered Animations (Fade/Slide/Scale)

**What it is:** Elements that animate into view as they enter the viewport during scroll.

**Why it works:** Staged reveals create rhythm and pacing on long pages. Each new section feels intentional rather than already-there.

**CSS-only approach (modern, preferred):**
```css
/* Native CSS Scroll-Driven Animations — Chrome 115+, Safari 26+ */
@keyframes fade-up {
  from { opacity: 0; translate: 0 32px; }
  to   { opacity: 1; translate: 0 0; }
}

.animate-on-scroll {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

**JavaScript approach (broader support — Intersection Observer):**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```
```css
[data-animate] { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
[data-animate].is-visible { opacity: 1; transform: translateY(0); }
```

**Staggered reveals:**
```css
[data-animate]:nth-child(1) { transition-delay: 0ms; }
[data-animate]:nth-child(2) { transition-delay: 100ms; }
[data-animate]:nth-child(3) { transition-delay: 200ms; }
```
Or with a Tailwind `delay-[Xms]` utility.

**Performance rules:**
- Only animate `opacity` and `transform` — these are GPU-composited and do not trigger layout/paint
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding` — these cause layout reflow
- Add `will-change: transform, opacity` to elements that will animate (remove after animation completes)
- Always honor `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 1; transform: none; transition: none; }
}
```

**Timing recommendations:**
- Fade-in: 500–700ms with `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo feel)
- Slide-up: same duration, 24–40px travel distance
- Scale: 400–600ms, from `scale(0.96)` to `scale(1)` — subtle, not dramatic

---

### 2.2 Hover Micro-Interactions

**What it is:** Subtle feedback when the user hovers over interactive elements.

**Why it works:** Micro-interactions make an interface feel alive and responsive. They confirm affordance (this is clickable) without requiring UI clutter.

**Button hover (primary CTA):**
```css
.btn-primary {
  background: #D4AF37;
  color: #000;
  padding: 14px 28px;
  border-radius: 8px;
  transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
}
.btn-primary:hover {
  background: #e5c347;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}
.btn-primary:active { transform: translateY(0); }
```

**Card lift (feature/benefit cards):**
```css
.card {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease;
}
.card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
}
```

**Link underline animation:**
```css
.link {
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 300ms ease;
}
.link:hover { background-size: 100% 1px; }
```
Bang & Olufsen uses `scaleX` on a pseudo-element for the same effect:
```css
.link::after { content:''; display:block; height:1px; transform:scaleX(0); transform-origin:left; transition:transform 300ms ease; }
.link:hover::after { transform:scaleX(1); }
```

**Icon/arrow micro-interaction:**
```css
.arrow { transition: transform 200ms ease; }
.btn:hover .arrow { transform: translateX(4px); }
```

---

### 2.3 Number/Counter Animations

**What it is:** Statistics that count up from zero (or a lower value) when they scroll into view.

**Why it works:** Movement draws attention. A static number is ignored; a counting number is watched. It creates the impression of momentum and growth — ideal for social proof stats.

**Lightweight implementation:**
```javascript
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = el.dataset.prefix + Math.floor(current).toLocaleString() + el.dataset.suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

// Trigger on scroll into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); observer.unobserve(e.target); }});
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
```
```html
<span data-counter data-target="300" data-suffix="+" data-prefix="">300+</span>
```

**Easing the count:** Use `easeOutExpo` instead of linear increment for a more polished feel:
```javascript
const easeOut = t => 1 - Math.pow(1 - t, 4);
const progress = easeOut(elapsed / duration);
current = target * progress;
```

**`prefers-reduced-motion`:** Skip the animation, show the final value immediately.

---

### 2.4 Parallax Scrolling

**What it is:** Different elements move at different rates during scroll, creating a sense of depth.

**CSS variable approach (lightweight, no JS):**
```css
.hero-bg {
  transform: translateY(calc(var(--scroll-y) * 0.3px));
}
```
```javascript
// Set CSS variable on scroll
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', window.scrollY);
}, { passive: true });
```

**Native CSS scroll-driven parallax (Chrome 115+):**
```css
.parallax-element {
  animation: parallax linear;
  animation-timeline: scroll(root);
}
@keyframes parallax {
  from { transform: translateY(0); }
  to   { transform: translateY(-20vh); }
}
```

**Performance notes:**
- Parallax should only be applied to `transform` — never `top`/`background-position`
- Use `will-change: transform` on parallax elements
- Limit to 1–2 elements per section — more creates visual noise
- Porsche uses `scale3d(1.05, 1.05, 1.05)` on hover images — a restrained scale effect rather than scroll-driven parallax

**Recommendation for Reis IA:** Use subtle parallax on hero background images (0.2–0.3 speed ratio), not on text. Text parallax creates readability issues.

---

### 2.5 Page Load Animations (Staggered Entry)

**What it is:** Elements on the page that animate in on initial load, before any scrolling.

**Why it works:** A well-timed page reveal signals craft. It makes the first impression feel considered rather than abrupt.

**Pattern: staggered hero reveal**
```css
.hero-eyebrow  { animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0ms; }
.hero-headline { animation: fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 100ms; }
.hero-subhead  { animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 200ms; }
.hero-cta      { animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 300ms; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Linear's dot-grid animation:** Uses a 5×5 matrix of dots with staggered opacity keyframes (3200ms cycles) as a hero background animation — a sophisticated, lightweight effect that animates entirely in CSS.

**Keep page load animations brief:** Total stagger should complete within 600–800ms. Longer feels slow. Never block content with a loading screen unless absolutely necessary.

---

### 2.6 Sticky and Floating Elements

**What it is:** Navigation bars, CTAs, or progress indicators that remain visible as the user scrolls.

**Sticky navigation with blur (used by Linear, Vercel, Apple):**
```css
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(8, 8, 8, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 300ms ease;
}
/* Fully transparent at top of page */
.nav[data-transparent] { background: transparent; border-color: transparent; }
```

**Sticky CTA on sales pages:** A "book a call" button that becomes fixed at the bottom of the viewport after the user scrolls past the hero.

**Progress indicator on long pages:**
```css
.progress-bar {
  position: fixed; top: 0; left: 0; height: 2px;
  background: #D4AF37;
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll(root);
}
@keyframes progress { from { scaleX: 0; } to { scaleX: 1; } }
```

---

## 3. Layout Patterns

### 3.1 Hero Sections

**Full-screen centered (Apple, Tesla, Porsche):**
- 100vh height
- Content centered vertically and horizontally
- Single strong headline + one or two lines of subheadline + CTA pair
- Background: full-bleed image or video
- Text: white on dark overlay

**Split hero (Pitch, Loom, Notion):**
- Left: headline + copy + CTA
- Right: product screenshot, UI mockup, or abstract illustration
- Typically `grid-cols-2` with `gap-16` or greater

**Gradient hero with floating UI (Stripe, Vercel, Linear):**
- Dark background with radial gradient glow from top or center
- Centered content above the fold
- Below: floating mockup/screenshot that bleeds below the hero section
- Creates the sense that the product is "emerging" from the page

**For Reis IA (recommendation):**
Full-screen centered on dark background with a subtle upward gold glow, tight headline in large Inter bold, minimal subheadline, and a single primary CTA button. A floating product-style element (dashboard mockup, automation graphic) appearing below creates momentum.

---

### 3.2 Premium Card Layouts

**What separates premium cards from average:**
- Generous internal padding: 32–40px desktop, 24px mobile
- Border: `1px solid rgba(255,255,255,0.08)` — barely visible, adds structure without noise
- Background: slightly lighter than page background (1–2 levels up the surface stack)
- Border-radius: 12–16px — not too round (childish), not square (harsh)
- Subtle inner shadow or gradient to create depth

**Feature card pattern:**
```css
.feature-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  /* Optional: gradient top border */
  position: relative;
}
.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(212,175,55,0.4), transparent 50%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}
```
The `::before` pseudo-element trick creates a gradient border without a visible outer ring.

**Bento grid layout (Stripe, many modern SaaS):** Unequal-sized cards in a grid where some cards span 2 columns or 2 rows. Creates visual interest and lets key features have more prominence.

---

### 3.3 Feature/Benefit Grid Layouts

**Standard 3-column feature grid:**
```
grid-cols-1 md:grid-cols-3 gap-6 md:gap-8
```
Each cell: icon (28–32px), heading, 2–3 line description.

**Two-column alternating layout (Apple-style sections):**
- Left: large image or product visualization
- Right: icon, headline, description, link
- Alternates left/right for subsequent features
- Creates visual rhythm without repetition

**Large-small card mix:**
- One full-width statement card
- Below: 2–3 equal secondary cards
- Communicates priority (what matters most) before detail

---

### 3.4 Breaking the Grid

**Diagonal cuts (Arc browser):**
```css
.section-diagonal {
  clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%);
  margin: -5% 0;
}
```

**Overlapping elements:**
```css
.overlapping-card {
  margin-top: -80px;
  position: relative;
  z-index: 10;
}
```
Creates layered depth — the card appears to float above the previous section.

**Bleeding images:** Let product imagery or UI mockups extend beyond their container edge, bleeding into the next section. Achieved with negative margin or absolute positioning.

**Rotated/skewed decorative elements:** A slightly rotated card (-2 to -3 degrees) in the background of a testimonial section adds depth without disrupting readability.

---

### 3.5 Long-Form Sales Pages Without Monotony

**The core principle:** Vary the visual rhythm. No two adjacent sections should use the same layout pattern.

**Variation toolkit:**
1. Dark section → lighter surface section → dark section (surface color alternation)
2. Centered content → left-right split → centered content
3. Dense text + icon grid → single large statement + one supporting line
4. Small cards → one full-width immersive block
5. Stat/number section → narrative copy section
6. Social proof logos bar → detailed testimonial quote

**Section types to include in sequence for a sales page:**
1. Hero (full-width, immersive)
2. Problem/pain section (centered, dark, emotional copy)
3. Solution introduction (split layout, product visual)
4. Feature showcase (card grid or alternating rows)
5. Social proof (logo bar + 1–2 pull quotes)
6. Detailed testimonial (1 full testimonial, editorial style)
7. Stat/results section (3 large numbers with context)
8. Objection handling (FAQ or addressed concerns)
9. CTA section (centered, highest contrast, most whitespace)

**Tip from Apple's approach:** Use deliberate "empty" moments — a section that is mostly whitespace with a single strong sentence creates emphasis through contrast. After dense feature content, an empty moment resets the reader's attention.

---

## 4. Component Patterns

### 4.1 Premium Button Design

**Primary CTA button:**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #D4AF37;      /* Gold accent */
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
}
.btn-primary:hover {
  background: #e5c347;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(212,175,55,0.35);
}
.btn-primary:active { transform: translateY(0); box-shadow: none; }
```

**Secondary/ghost button:**
```css
.btn-secondary {
  background: transparent;
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.18);
  padding: 13px 27px;   /* 1px less to account for border */
  border-radius: 8px;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
}
.btn-secondary:hover {
  border-color: rgba(255,255,255,0.4);
  color: #fff;
  background: rgba(255,255,255,0.06);
}
```

**Gradient border button (premium variation):**
A ghost button where the border is a gradient (gold to transparent). Achieved using the `::before` mask technique described in card layouts above.

**Size guidance:**
- Desktop: 14px font, 14px top/bottom padding, 28px left/right padding
- Mobile: 14px font, 12px top/bottom padding, 24px left/right padding
- Minimum touch target: 44×44px (Apple HIG standard)

---

### 4.2 Stat / Metric Displays

**What it is:** Large numbers with brief context labels — typically grouped in sets of 3–4.

**Pattern (centered, 3-column):**
```html
<div class="grid grid-cols-3 gap-8 text-center">
  <div>
    <div class="text-5xl font-bold text-gold" data-counter data-target="300" data-suffix="+">300+</div>
    <div class="text-sm text-white/50 mt-2 uppercase tracking-wider">Empresas atendidas</div>
  </div>
  ...
</div>
```

**Design rules for stat sections:**
- Number: 56–72px, weight 700+, accent color (gold for Reis IA)
- Label: 12–13px, uppercase, letter-spacing +0.08em, 45–50% white opacity
- The number should dominate — don't let the label compete
- Separator lines between stats: `1px solid rgba(255,255,255,0.08)` — barely visible
- Section background: slightly different from adjacent sections to frame the stats

---

### 4.3 Testimonials — Editorial Approach

**Beyond the quote box:** The standard "photo + name + quote in a box" pattern reads as template. Premium sites treat testimonials as editorial content.

**Full testimonial pull-quote (editorial style):**
- Large quotation mark (4–5rem, gold accent) in the top-left
- The quote itself: 24–32px, weight 400–500, italic or regular, generous line-height
- Attribution: below the quote, with name (white), title and company (50% white), separated by a thin divider
- No card box — just the quote floating in generous whitespace

**Compact testimonial in a grid (3-column):**
- Each card: name + title + company, star rating (if applicable), short 2–3 sentence quote
- Card background: surface level 2 (slightly lighter than page)
- Consistent height: `align-items: stretch` in the grid

**Logo-only social proof bar:**
```
[Logo] [Logo] [Logo] [Logo] [Logo] [Logo]
```
- Grayscale logos at 30–40% opacity
- On hover: transition to 70% opacity
- Appears between hero and first feature section as a trust signal

---

### 4.4 Comparison / Before-After Components

**Side-by-side comparison:**
Two columns. Left: "Before / Without" (problem state). Right: "After / With [product]" (solution state). Use a subtle dividing line with a central badge ("vs" or the logo).

**Before-after slider:** An image comparison slider where the user drags a handle to reveal the before/after states. Requires a small JS component. Use sparingly — best for visual products.

**Contrast table:** A 3-column table comparing "DIY / Manual", "Generic solution", "Reis IA Systems". Middle column slightly different background. Rows: key criteria. Checkmarks (accent color) vs X marks (muted red/gray).

---

### 4.5 Progress Indicators on Long Pages

**Section anchor navigation (sticky sidebar):**
On very long pages (4000px+), a subtle dot navigation on the right side shows which section the user is in. Dots: 6px circles, `rgba(255,255,255,0.2)` default, accent color when active.

**Sticky top progress bar:**
2px height, accent color, animates from 0 to 100% width as the page scrolls. CSS scroll-driven animation (Chrome 115+) or JS with scroll event.

**Numbered section labels:**
Each major section has a subtle "01 / 02 / 03" counter in the top-left corner at small size. Conveys structure without adding visual weight.

---

## 5. Dark Mode Specific Techniques

### 5.1 The Surface Stack

Do not use flat dark backgrounds. Use a surface hierarchy where deeper elements are darker and elevated elements are lighter. This creates depth without color.

```css
:root {
  --surface-bg:       #080808;   /* Page base */
  --surface-1:        #111113;   /* Cards, sections */
  --surface-2:        #1c1c1e;   /* Elevated cards, dropdowns */
  --surface-3:        #242427;   /* Modals, tooltips */
  --border-subtle:    rgba(255,255,255,0.06);
  --border-default:   rgba(255,255,255,0.10);
  --border-strong:    rgba(255,255,255,0.18);
}
```

### 5.2 Glow Effects

A gold glow on dark creates the premium "lit from within" effect. Achieved via `box-shadow` (for elements) or `radial-gradient` (for page backgrounds).

**Button glow:**
```css
box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.15);
```

**Section background glow:**
```css
background:
  radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%),
  var(--surface-bg);
```

**Text glow (use sparingly — only on display headlines):**
```css
text-shadow: 0 0 40px rgba(212,175,55,0.3);
```

### 5.3 Avoiding Common Dark Mode Mistakes

| Mistake | Fix |
|---------|-----|
| Pure `#000000` background | Use `#080808` – `#0d0d0d` |
| Pure `#FFFFFF` body text | Use `rgba(255,255,255,0.9)` |
| High-saturation accent colors | Desaturate slightly — neon feels cheap |
| Images with white backgrounds | Use PNG with transparency or add dark overlay |
| Dark gray borders on dark backgrounds | Use white at 6–10% opacity instead |
| Identical card and page backgrounds | Maintain at least 3–4% luminosity difference |

### 5.4 CSS Custom Property System

Implement dark mode through CSS variables, not class overrides:
```css
:root {
  --color-text-primary:    rgba(255,255,255,1.0);
  --color-text-secondary:  rgba(255,255,255,0.75);
  --color-text-tertiary:   rgba(255,255,255,0.45);
  --color-text-quaternary: rgba(255,255,255,0.25);
  --color-accent:          #D4AF37;
  --color-accent-hover:    #E5C347;
  --color-accent-glow:     rgba(212,175,55,0.25);
}
```

### 5.5 Image Treatment in Dark Mode

- Product images: use PNG with transparent backgrounds — they sit naturally on dark surfaces
- Photography: add a subtle dark overlay or vignette to integrate with the dark background
- UI screenshots: capture in dark mode matching the site's surface color
- Avoid pure-white interface screenshots on dark pages — use a dark-mode equivalent

---

## 6. Performance & Accessibility Guidelines

### 6.1 Animation Performance Rules

1. **Only animate GPU-composited properties:** `transform` (translate, scale, rotate) and `opacity`. These run on the compositor thread without triggering layout or paint.
2. **Avoid animating:** `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `border-width` — all cause layout reflow.
3. **`backdrop-filter` is expensive:** Use on at most 1–2 elements per viewport. Avoid animating it.
4. **`will-change: transform`:** Add before animations begin, remove after completion. Overuse wastes GPU memory.
5. **`requestAnimationFrame`:** All JS-driven animations should use rAF for 60fps synchronization with the display.
6. **Passive event listeners:** `window.addEventListener('scroll', handler, { passive: true })` — critical for preventing scroll jank.

### 6.2 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
This is not optional — it is a legal accessibility requirement in many markets and expected behavior.

### 6.3 Contrast Requirements

- **WCAG AA minimum:** 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold)
- `#FFFFFF` on `#080808`: contrast ratio ~21:1 — passes
- `rgba(255,255,255,0.45)` on `#080808`: ~4.3:1 — marginal (use for non-critical tertiary text only, not body)
- Gold `#D4AF37` on `#000000`: ~8.2:1 — passes

### 6.4 Font Loading Performance

- Use variable fonts where available — one file serves all weights
- Preload the primary font: `<link rel="preload" as="font" href="inter-var.woff2" crossorigin>`
- `font-display: swap` prevents invisible text during font load
- Self-host Inter for Reis IA rather than using Google Fonts (eliminates external DNS lookup, improves privacy)

### 6.5 Image Optimization

- Use `<picture>` with WebP/AVIF for hero images
- Apply lazy loading: `<img loading="lazy">` for below-fold content
- Set explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)
- Porsche loads images up to 3840px wide — use `srcset` to serve the right size per device

### 6.6 Library Recommendations

| Need | Library | Weight | Notes |
|------|---------|--------|-------|
| Scroll animations | Intersection Observer (native) | 0kb | Sufficient for fade/slide |
| Complex scroll storytelling | GSAP ScrollTrigger | ~25kb gzip | Industry standard, used by Apple, Awwwards sites |
| React animations | Motion (formerly Framer Motion) | ~30kb gzip | Best-in-class for React |
| Counter animations | Custom 20-line JS | ~0.5kb | No library needed |
| Page transitions | Astro View Transitions | 0kb (built-in) | Native to Astro |

---

## 7. Specific Recommendations for Reis IA

Given the project parameters — **dark mode, gold accent, minimal aesthetic, long-form sales pages, Astro + Tailwind + Vercel stack** — the following patterns are the highest-priority implementations:

### Priority 1: Foundation (Apply to Every Page)

1. **Surface stack:** Implement the 4-level surface system (`#080808` → `#111113` → `#1c1c1e` → `#242427`) as CSS custom properties in the global stylesheet. This single decision elevates the entire visual quality.

2. **Gold glow in the hero:** A `radial-gradient` at the top of every page hero — subtle (10–15% opacity) upward gold light. This is Reis IA's signature moment. The hourglass or chess motif can be the source point of the glow.

3. **Inter with variable weights:** Self-host Inter variable font. Use weight 800 for display headlines, 400 for body, 600 for CTAs and labels. The typographic contrast is the backbone of the premium feel.

4. **Sticky frosted nav:** `backdrop-filter: blur(16px)` nav with `rgba(8,8,8,0.75)` background. Transparent at the top of the page, frosted on scroll. Add the hourglass or chess motif as the brand mark in the nav.

5. **Text hierarchy enforcement:** Ensure the 4-tier opacity system is used consistently. Never use `color: white` — always use CSS variables.

### Priority 2: Scroll Animations

6. **Staggered section reveals:** Every `<section>` fades and slides up 24px on enter viewport (Intersection Observer). Start with hero element stagger on page load (200ms between each line). This creates immediate polish.

7. **Counter animations on stats:** Reis IA's social proof numbers (number of clients served, hours saved, etc.) should animate up when the stats section enters view. Gold numbers, uppercase label below.

8. **Sticky progress bar:** A 2px gold line at the top of the viewport on long sales pages. Shows the user where they are in the page and subtly reinforces the gold accent throughout the read.

### Priority 3: Premium Components

9. **Editorial testimonials:** At least one full-screen testimonial block with a large gold quotation mark, 28–32px quote text, and generous whitespace. This single component transforms the credibility perception of the page.

10. **Gradient border CTA button:** The primary "book a call" button should use the gradient border technique with a gold-to-transparent sweep. On hover: the border brightens and a subtle gold glow appears below the button.

11. **Bento feature grid:** For showcasing Reis IA Builder, Systems, and Partners pillars — a 3-card bento where the primary pillar card spans 2 rows or uses a larger visual, signaling hierarchy.

### Priority 4: Brand Motifs Integration

12. **Hourglass + Chess in every hero:** These are Reis IA's brand differentiators. They should appear as minimal geometric SVG elements in hero sections — either as subtle background decorations (low opacity, large scale) or as accent icons in feature cards. Never as clipart — always as geometric/architectural forms.

13. **Section transition with motifs:** Use the hourglass shape as a section divider SVG — a clip-path that creates an hourglass-shaped cut between sections. This is unconventional, brand-specific, and memorable.

14. **Gold gradient text for key phrases:** Select 2–3 key phrases per sales page (e.g., "tempo é o ativo mais escasso") and apply:
```css
.highlight {
  background: linear-gradient(90deg, #D4AF37, #F5E27A, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Astro-Specific Implementation Notes

- Use Astro's built-in **View Transitions API** for page-to-page transitions — zero JS overhead, native browser support
- Keep scroll animation logic in a single `animations.ts` utility file that initializes all Intersection Observers on `DOMContentLoaded`
- Counter animations and scroll triggers can live in Astro's `<script>` tags directly in the component — no framework overhead needed
- For complex animations on interactive islands (e.g., a comparison slider), use Motion for React within an `<Island>` component

---

*Document produced by Analysis Agent. Research sources: direct site analysis of Apple, Stripe, Linear, Vercel, Arc, Bang & Olufsen, Porsche, Framer, Pitch, Loom; MDN scroll-driven animations specification; GSAP ScrollTrigger documentation; Chrome Developer documentation; Awwwards dark mode patterns. All technical recommendations validated against current browser support as of March 2026.*
