# Academia Lendaria -- Source Code Extraction

Last updated: 2026-03-17
Source: https://academialendaria.ai (primary), https://academialendaria.com (redirects to /lander, 403)
Framework: Next.js with React Server Components (RSC)
Extraction limitations: CSS compiled into chunked files, JS split across async bundles, React serialization obscures raw source

---

## 1. Site Architecture

### Framework Details

- **Next.js** with React Server Components
- **Font system**: Geist (variable) + Geist Mono (variable) -- loaded via Next.js font optimization
- **CSS**: Compiled chunks (`/chunks/*.css`) -- not directly accessible via fetch
- **Deployment**: Vercel (indicated by `dpl=dpl_*` query params on assets)
- **Analytics**: Google Tag Manager (`GTM-TMZVDFS6`)
- **CRM**: ConvertKit for newsletter/lead capture with UTM parameter mapping

### Meta Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Ecossistema de Educacao & Inovacao com IA">
<link rel="icon" href="/FAV-Academia.png">
```

---

## 2. Page Structure

```
Header (Logo + Navigation)
  -- /logo.svg
  -- Nav: Home, Programas, Eventos, Hubs, Parcerias, Conteudos, Depoimentos, Login

Hero Section (Main Value Proposition)
  -- Claims: 15K+ students, 40+ countries, 50+ regional hubs

Programs Section
  -- Comunidade Lendar[IA] (networking/mentorship)
  -- Cohort Fundamentals (4-week AI agent training)
  -- Cohort Advanced (9-agent AI automation system)

Company Logos Carousel
  -- Globo, RedBull, BTG, Amazon, Meta, Caixa, Banco do Brasil, AllFluence
  -- 8 logos rotating

Success Cases Section

Events Section (Immersion events)

Entrepreneurs Section
  -- 13 profile images (Ellipse 1-20.png)

Alan Nicolas Bio Section
  -- Founder spotlight
  -- Claims: R$200M+ personal revenue

Media Features Section

Newsletter Signup Form
  -- Fields: Nome, E-mail (required), WhatsApp (required)
  -- ConvertKit integration

Footer
  -- Site map, Social links, Legal text
  -- Social: YouTube, Instagram, X (Twitter), TikTok, LinkedIn
```

---

## 3. Design Tokens (from reference-academia-lendaria.md + new extraction)

### Color System

```css
/* Primary */
--bg-primary: #000000;
--bg-card-surface: #111111;
--bg-surface-dark: #161616;
--bg-surface-mid: #1a1a1a;
--bg-surface-elevated: #141414cc;  /* 80% opacity */

/* Text */
--text-primary: #ffffff;
--text-secondary: #ffffffb3;       /* 70% white */
--text-muted: #ffffff80;            /* 50% white */
--text-faint: #ffffff3d;            /* 24% white */

/* Accent */
--accent-gold: #ffd44a;
--accent-gold-hover: #ffcc00;
--accent-blue: #0055ff;
--accent-blue-hover: #0044cc;
--accent-green: #30d158;
--accent-red: #ff3b3b;
--accent-purple: #5e5ce6;

/* Borders */
--border-primary: #242424;
--border-subtle: #ffffff1a;         /* 10% white */
--border-faint: #ffffff14;          /* 8% white */
--border-ghost: #ffffff0d;          /* 5% white */

/* Overlays */
--overlay-dark: #24242466;          /* 40% */
--overlay-input: #ffffff0d;

/* Glass */
--glass-bg: rgba(255, 255, 255, 0.08);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur: blur(12px);
```

### Typography

```css
/* Font families */
font-family: Inter, sans-serif;   /* primary */
/* Also loads: Geist (variable), Geist Mono (variable) */

/* Type scale */
--hero-display: 72px;              /* weight: 800, lh: 1.1, ls: -0.04em */
--h1: clamp(40px, 5vw, 64px);     /* weight: 600, lh: 1.1, ls: -0.02em */
--h2: clamp(32px, 4vw, 48px);     /* weight: 600, lh: 1.2, ls: -0.02em */
--h3: 24px-30px;                   /* weight: 600, lh: 1.2 */
--stat-large: 40px;                /* weight: 600, lh: 1.1 */
--body-large: 18px;                /* weight: 500, lh: 1.6 */
--body: 16px;                      /* weight: 400-500, lh: 1.6 */
--button: 16px;                    /* weight: 600, lh: 1 */
--small: 13px;                     /* weight: 500, lh: 1.4 */
--caption: 12px;                   /* weight: 500, lh: 1.4 */
--micro: 10px;                     /* weight: 500, lh: 1, ls: 0.1em */

/* Font rendering */
-webkit-font-smoothing: antialiased;
```

### Gradients

```css
/* Gold accent */
background: linear-gradient(135deg, gold 0%, orange 100%);

/* Card surfaces */
background: linear-gradient(45deg, #161616, #1a1a1a 50%, #161616);  /* padding-box */
background: linear-gradient(45deg, #000, #0a0a0a 50%, #000);         /* visual cards */

/* Rotating border -- SIGNATURE TECHNIQUE */
background: conic-gradient(from var(--border-angle), #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424);

/* Text shimmer */
background: linear-gradient(110deg, #fff 0% 40%, #b8b8b8 50%, #fff 60% 100%);

/* Marquee edge fades */
background: linear-gradient(90deg, #000 0%, transparent 100%);   /* left */
background: linear-gradient(270deg, #000 0%, transparent 100%);  /* right */

/* Hero overlay */
background: linear-gradient(to top, #000 0%, transparent 60%);
```

---

## 4. Animation System

### Keyframe Animations

```css
/* 1. Text Shimmer -- SIGNATURE EFFECT */
@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  30% { background-position: -200% 0; }
}
/* Duration: 13s, ease-in-out, infinite */
/* Applied via background-clip: text on gradient */

/* 2. 3D Perspective Entrance -- SIGNATURE SCROLL REVEAL */
/* Initial state */
opacity: 0;
transform: translateY(150px) rotateX(15deg);
transform-origin: bottom;
transform-style: preserve-3d;
perspective: 1200px;  /* on parent */

/* Visible state */
opacity: 1;
transform: translateY(0) rotateX(0);
transition: 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* 3. Rotating Conic Gradient Border -- SIGNATURE EFFECT */
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}
/* Duration: 6.4s, linear, infinite */

/* 4. Logo Marquee */
@keyframes marquee {
  0% { transform: translate(0); }
  100% { transform: translate(-50%); }
}
/* Duration: 40s, linear, infinite */
/* Pauses on hover: animation-play-state: paused */

/* 5. Hero Entrance */
@keyframes slideUpHero {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 6. Pulse */
@keyframes pulse {
  /* 2s infinite -- radial scale effect */
}

/* 7. Fade In Scale */
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
/* Duration: 0.6s, cubic-bezier timing */
```

### Transition Defaults

```css
/* Buttons */
transition: all 0.3s ease;

/* Cards / hover */
transition: all 0.3s ease;

/* Logo items */
transition: opacity 0.3s ease, filter 0.3s ease;

/* Hub buttons */
transition: all 0.2s ease;

/* Form focus */
transition: border-color 0.3s ease, background 0.3s ease;

/* 3D entrance */
transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Menu items stagger */
transition: transform 0.4s-0.8s cubic-bezier(...), opacity 0.4s-0.8s cubic-bezier(...);
```

### Hover Effects

```css
/* Primary CTA: lift up */
transform: translateY(-4px);

/* Hub buttons: subtle lift + darken */
transform: translateY(-2px);

/* Logo items: opacity reveal */
opacity: 0.5 -> 1.0;

/* Marquee: pause on hover */
animation-play-state: paused;
```

---

## 5. Component Patterns

### Buttons

```css
/* Primary CTA (Gold) */
.btn-primary {
  background: #ffd44a;
  color: #504015;
  border-radius: 100px;
  padding: 24px 48px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-primary:hover {
  transform: translateY(-4px);
}

/* Secondary CTA (Transparent) */
.btn-secondary {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-radius: 8px;
  padding: 12px-20px 16px-40px;
  transition: all 0.3s;
}

/* Hub/Link Button (Blue) */
.btn-hub {
  background: #0066ff;
  color: #fff;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
}
.btn-hub:hover {
  background: #0052cc;
  transform: translateY(-2px);
}
```

### Cards

```css
/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
}

/* Animated Border Card -- SIGNATURE */
.animated-border-card {
  background:
    linear-gradient(45deg, #161616, #1a1a1a 50%, #161616) padding-box,
    conic-gradient(from var(--border-angle), #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424) border-box;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 48px;
  animation: rotateBorder 6.4s linear infinite;
}

/* Stats Overlay Card */
.stats-card {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid #242424;
  border-radius: 8px;
  padding: 32px;
  position: absolute;
}
```

### Trust Logos Marquee

```css
/* Infinite scroll: 40s duration */
.marquee-track {
  animation: marquee 40s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}

/* Logos rendered in white */
.logo-item {
  filter: grayscale(100%) brightness(0) invert(1);
  opacity: 0.5;
  transition: opacity 0.3s ease, filter 0.3s ease;
}
.logo-item:hover {
  opacity: 1.0;
}

/* Edge fades */
.marquee::before {
  background: linear-gradient(90deg, #000 0%, transparent 100%);
  width: 100px;  /* 50px on mobile */
}
.marquee::after {
  background: linear-gradient(270deg, #000 0%, transparent 100%);
  width: 100px;
}

/* Trust label */
.trust-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffffff3d;
}
```

### Text Shimmer Implementation

```css
.shimmer-text {
  background: linear-gradient(110deg, #fff 0% 40%, #b8b8b8 50%, #fff 60% 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 13s ease-in-out infinite;
}
```

---

## 6. Layout System

### Container

```css
max-width: 1280px;
margin: 0 auto;
padding: 0 24px;

/* Tablet (1024px) */
max-width: 100%;
padding: 0 48px;

/* Mobile (768px) */
max-width: 100%;
padding: 0 24px;
```

### Section Padding

```css
/* Desktop */
padding: 100px 0;

/* Tablet (1024px) */
padding: 80px 0;

/* Mobile (768px) */
padding: 64px 0;
```

### Border Radius Scale

```css
--radius-card-large: 24px;
--radius-card-medium: 20px;
--radius-card-standard: 16px;
--radius-stats-input: 8px;
--radius-button-pill: 100px;
--radius-scrollbar: 20px;
```

### Breakpoints

```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
```

### Backdrop Filters

```css
/* Light */
backdrop-filter: blur(8px);

/* Standard */
backdrop-filter: blur(12px) saturate(180%);

/* Heavy */
backdrop-filter: blur(20px);

/* Maximum */
backdrop-filter: blur(24px) saturate(220%);
```

### Custom Scrollbar

```css
scrollbar-width: thin;
scrollbar-color: #242424 #000;

::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #000; width: 4px; }
::-webkit-scrollbar-thumb {
  background-color: #242424;
  border: 4px solid #000;
  border-radius: 20px;
}
```

---

## 7. Hero Section Pattern

```
+--------------------------------------------------+
| padding: 8px 8px 0 (outer wrapper)               |
| +----------------------------------------------+ |
| | border-radius: 16px                          | |
| | min-height: 100vh (desktop) / 648px          | |
| | background-image + dark overlay              | |
| | Centered content, max-width constrained      | |
| +----------------------------------------------+ |
+--------------------------------------------------+
```

The hero uses an inset pattern: `padding: 8px 8px 0` on the outer wrapper, then a rounded container inside. This creates a subtle "framed" effect.

---

## 8. Unique Techniques for Reis IA

### HIGH Priority

| Technique | Value | Adaptation |
|-----------|-------|------------|
| Rotating conic gradient borders | 6.4s linear infinite | Replace #646464 with gold tones for Reis IA cards |
| 3D perspective scroll entrance | 1.2s, perspective: 1200px, rotateX(15deg) | Use selectively on hero + 1 key section |
| Text shimmer on gradient headlines | 13s ease-in-out, white-to-gray gradient | Apply to hero headline, keep long duration |
| Glass stats overlay on imagery | blur(8px), #141414cc, positioned absolute | For case study metrics floating over visuals |
| 70% white body text | #ffffffb3 instead of #ffffff | Reduces eye strain on dark backgrounds |

### MEDIUM Priority

| Technique | Value | Adaptation |
|-----------|-------|------------|
| Monochrome logo parade | grayscale(100%) brightness(0) invert(1), opacity 0.5 | Direct fit for social proof section |
| Marquee with hover pause | 40s linear infinite, animation-play-state: paused | For technology/partner logos |
| Pill-shaped CTAs | border-radius: 100px | For primary "Book Call" CTA |
| Layered dark surfaces | #000 > #111 > #141414 > #161616 > #1a1a1a | Creates depth without lightening |

### SKIP for Reis IA

| Technique | Reason |
|-----------|--------|
| Bright gold #ffd44a | Too saturated for Reis IA premium; use muted #C9A84C |
| Blue accent #0055ff | Not in Reis IA brand palette |
| Hub/cohort CTA patterns | Education ecosystem, not consultancy |
| 800 font weight hero | Too bold for consultancy restraint; cap at 700 |

---

## 9. Extraction Notes

- **academialendaria.com** redirects via `window.onload` to `/lander` which returns 403
- **academialendaria.ai** is the active domain, built with Next.js RSC
- CSS is compiled into chunk files not directly accessible via WebFetch
- Most design token values were derived from the previously completed reference-academia-lendaria.md analysis
- The Geist font system (same as Vercel) suggests design system lineage
- ConvertKit handles lead capture with UTM parameter mapping
