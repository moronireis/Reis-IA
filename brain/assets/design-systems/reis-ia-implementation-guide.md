# Reis IA Design System -- Implementation Guide

Last updated: 2026-03-17 (v1.1 -- Technique Enrichment)

> **Owner**: designer-agent
> **Status**: Complete -- Implementation Reference v1.0
> **Consumed by**: dev-agent (primary), designer-agent (component specs)
> **Companion to**: `brain/assets/design-systems/reis-ia-design-system.md`

---

## TABLE OF CONTENTS

1. [CSS Custom Properties](#1-css-custom-properties)
2. [Tailwind Configuration](#2-tailwind-configuration)
3. [Reusable Animation Classes](#3-reusable-animation-classes)
4. [Component Structure Templates](#4-component-structure-templates)
5. [Utility Classes](#5-utility-classes)
6. [JavaScript Patterns](#6-javascript-patterns)
7. [Dos and Donts with Visual Examples](#7-dos-and-donts-with-visual-examples)

---

## 1. CSS CUSTOM PROPERTIES

Place in a global stylesheet (e.g., `src/styles/design-system.css`) loaded before all component styles.

```css
/* ==========================================================================
   REIS IA DESIGN SYSTEM -- CSS Custom Properties
   ========================================================================== */

:root {
  /* ---- BRAND COLORS ---- */
  --accent-blue: #4A90FF;
  --accent-blue-hover: #6AADFF;
  --accent-blue-muted: #3570CC;
  --accent-blue-bright: #8DC4FF;
  --accent-blue-rgb: 74, 144, 255;  /* For rgba() usage */

  /* ---- SURFACE LAYERING ---- */
  --surface-0: #000000;  /* Void -- page background */
  --surface-1: #0A0A0A;  /* Base -- alternating section bg */
  --surface-2: #111111;  /* Raised -- card backgrounds */
  --surface-3: #161616;  /* Elevated -- card hover, inputs */
  --surface-4: #1A1A1A;  /* Float -- dropdowns, tooltips */

  /* ---- TEXT (OPACITY-BASED) ---- */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.70);
  --text-tertiary: rgba(255, 255, 255, 0.50);
  --text-quaternary: rgba(255, 255, 255, 0.35);
  --text-muted: rgba(255, 255, 255, 0.20);

  /* ---- BORDERS (OPACITY-BASED) ---- */
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-visible: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.20);
  --border-accent: rgba(74, 144, 255, 0.30);

  /* ---- SHADOWS ---- */
  --shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-default: 0 4px 16px rgba(0, 0, 0, 0.25);
  --shadow-elevated: 0 8px 30px rgba(0, 0, 0, 0.4);
  --shadow-dramatic: 0 16px 70px rgba(0, 0, 0, 0.5);
  --shadow-blue-glow: 0 0 50px rgba(74, 144, 255, 0.12);

  /* ---- TYPOGRAPHY (FLUID) ---- */
  --text-display: clamp(2.5rem, 1.5rem + 3.5vw, 4.5rem);
  --text-h1: clamp(2.25rem, 1.5rem + 2.75vw, 3.5rem);
  --text-h2: clamp(1.875rem, 1.25rem + 2.25vw, 3rem);
  --text-h3: clamp(1.625rem, 1.25rem + 1.25vw, 2.25rem);
  --text-h4: clamp(1.375rem, 1.125rem + 0.75vw, 1.75rem);
  --text-h5: clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem);
  --text-body-lg: clamp(1.125rem, 1rem + 0.25vw, 1.25rem);
  --text-body: 1rem;
  --text-body-sm: 0.875rem;
  --text-caption: clamp(0.75rem, 0.75rem + 0.1vw, 0.8125rem);
  --text-micro: 0.6875rem;
  --text-label: 0.75rem;

  /* ---- SPACING (FLUID) ---- */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: clamp(24px, 1vw + 20px, 32px);
  --space-xl: clamp(32px, 2vw + 24px, 48px);
  --space-2xl: clamp(48px, 4vw + 32px, 80px);
  --space-3xl: clamp(64px, 7vw + 36px, 120px);
  --space-4xl: clamp(80px, 10vw + 40px, 160px);

  /* ---- CONTAINERS ---- */
  --container-wide: 1280px;
  --container-standard: 1200px;
  --container-narrow: 800px;
  --container-text: 680px;
  --container-headline: 900px;
  --container-padding: clamp(20px, 5vw, 48px);

  /* ---- EASING CURVES ---- */
  --ease-base: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.4, 0, 0.5, 1);
  --ease-dramatic: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-card: cubic-bezier(0.7, 0, 0, 1);

  /* ---- DURATIONS ---- */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-moderate: 500ms;
  --duration-slow: 800ms;
  --duration-dramatic: 1200ms;
  --duration-ambient: 13000ms;

  /* ---- Z-INDEX SCALE ---- */
  --z-bg: -1;
  --z-base: 0;
  --z-raised: 10;
  --z-nav: 50;
  --z-dropdown: 60;
  --z-modal-overlay: 90;
  --z-modal: 100;
  --z-toast: 200;

  /* ---- GRADIENTS ---- */
  --gradient-blue-ambient: radial-gradient(ellipse at center, rgba(74, 144, 255, 0.06) 0%, transparent 70%);
  --gradient-blue-sweep: linear-gradient(90deg, #4A90FF 0%, #3570CC 100%);
  --gradient-surface-fade: linear-gradient(180deg, var(--surface-0) 0%, var(--surface-1) 100%);
  --gradient-marquee-edge: linear-gradient(90deg, var(--surface-0) 0%, transparent 10%, transparent 90%, var(--surface-0) 100%);
  --gradient-divider: linear-gradient(to right, transparent, var(--border-default) 20%, var(--border-default) 80%, transparent);
}

/* ---- FONT RENDERING ---- */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  isolation: isolate;
}

/* ---- REDUCED MOTION ---- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ---- SELECTION ---- */
::selection {
  background: rgba(74, 144, 255, 0.30);
  color: white;
}
```

---

## 2. TAILWIND CONFIGURATION

### 2A. Complete Theme Extension

```js
// tailwind.config.mjs
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      /* ---- COLORS ---- */
      colors: {
        accent: {
          DEFAULT: '#4A90FF',
          hover: '#6AADFF',
          muted: '#3570CC',
          bright: '#8DC4FF',
        },
        surface: {
          0: '#000000',
          1: '#0A0A0A',
          2: '#111111',
          3: '#161616',
          4: '#1A1A1A',
        },
      },

      /* ---- TEXT COLORS ---- */
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        quaternary: 'var(--text-quaternary)',
        muted: 'var(--text-muted)',
      },

      /* ---- BORDER COLORS ---- */
      borderColor: {
        subtle: 'var(--border-subtle)',
        default: 'var(--border-default)',
        visible: 'var(--border-visible)',
        strong: 'var(--border-strong)',
        accent: 'var(--border-accent)',
      },

      /* ---- BACKGROUND COLORS ---- */
      backgroundColor: {
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
        },
      },

      /* ---- FONTS ---- */
      fontFamily: {
        sans: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
      },

      /* ---- FONT SIZES (FLUID) ---- */
      fontSize: {
        'display': ['var(--text-display)', {
          lineHeight: '1.05',
          letterSpacing: '-0.03em',
          fontWeight: '700',
        }],
        'h1': ['var(--text-h1)', {
          lineHeight: '1.08',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        }],
        'h2': ['var(--text-h2)', {
          lineHeight: '1.10',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        }],
        'h3': ['var(--text-h3)', {
          lineHeight: '1.15',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        }],
        'h4': ['var(--text-h4)', {
          lineHeight: '1.20',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        }],
        'h5': ['var(--text-h5)', {
          lineHeight: '1.25',
          letterSpacing: '-0.005em',
          fontWeight: '600',
        }],
        'body-lg': ['var(--text-body-lg)', {
          lineHeight: '1.60',
          letterSpacing: '0',
          fontWeight: '400',
        }],
        'body': ['var(--text-body)', {
          lineHeight: '1.65',
          letterSpacing: '0',
          fontWeight: '400',
        }],
        'body-sm': ['var(--text-body-sm)', {
          lineHeight: '1.55',
          letterSpacing: '0',
          fontWeight: '400',
        }],
        'caption': ['var(--text-caption)', {
          lineHeight: '1.45',
          letterSpacing: '0.01em',
          fontWeight: '500',
        }],
        'micro': ['var(--text-micro)', {
          lineHeight: '1.35',
          letterSpacing: '0.02em',
          fontWeight: '500',
        }],
        'label': ['var(--text-label)', {
          lineHeight: '1.40',
          letterSpacing: '0.05em',
          fontWeight: '600',
        }],
      },

      /* ---- SPACING (FLUID) ---- */
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },

      /* ---- MAX WIDTHS ---- */
      maxWidth: {
        'container-wide': 'var(--container-wide)',
        'container': 'var(--container-standard)',
        'container-narrow': 'var(--container-narrow)',
        'container-text': 'var(--container-text)',
        'container-headline': 'var(--container-headline)',
      },

      /* ---- BORDER RADIUS ---- */
      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
        'button': '8px',
        'button-lg': '10px',
        'badge': '6px',
        'input': '8px',
      },

      /* ---- BOX SHADOW ---- */
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'default': 'var(--shadow-default)',
        'elevated': 'var(--shadow-elevated)',
        'dramatic': 'var(--shadow-dramatic)',
        'blue-glow': 'var(--shadow-blue-glow)',
        'blue-glow-sm': '0 0 30px rgba(74, 144, 255, 0.08)',
      },

      /* ---- TRANSITIONS ---- */
      transitionTimingFunction: {
        'base': 'var(--ease-base)',
        'out': 'var(--ease-out)',
        'in': 'var(--ease-in)',
        'dramatic': 'var(--ease-dramatic)',
        'card': 'var(--ease-card)',
      },
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'moderate': 'var(--duration-moderate)',
        'slow': 'var(--duration-slow)',
        'dramatic': 'var(--duration-dramatic)',
      },

      /* ---- Z-INDEX ---- */
      zIndex: {
        'bg': '-1',
        'raised': '10',
        'nav': '50',
        'dropdown': '60',
        'modal-overlay': '90',
        'modal': '100',
        'toast': '200',
      },

      /* ---- KEYFRAMES ---- */
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-reveal': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'perspective-up': {
          from: { opacity: '0', transform: 'translateY(80px) rotateX(8deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotateX(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s var(--ease-out) forwards',
        'fade-in': 'fade-in 0.6s var(--ease-out) forwards',
        'scale-reveal': 'scale-reveal 0.8s var(--ease-out) forwards',
        'perspective-up': 'perspective-up 1.2s var(--ease-dramatic) forwards',
        'marquee': 'marquee 40s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

### 2B. Tailwind Plugin for Design System Utilities

Create a custom plugin for utilities not covered by Tailwind defaults:

```js
// tailwind-plugins/reis-ia.js
import plugin from 'tailwindcss/plugin';

export default plugin(function({ addUtilities, addComponents }) {
  /* ---- CUSTOM UTILITIES ---- */
  addUtilities({
    '.text-balance': {
      'text-wrap': 'balance',
    },
    '.text-pretty': {
      'text-wrap': 'pretty',
    },
    '.tabular-nums': {
      'font-variant-numeric': 'tabular-nums',
    },
    '.grain': {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        opacity: '0.03',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        zIndex: '1',
      },
    },
    '.gradient-divider': {
      height: '1px',
      background: 'var(--gradient-divider)',
    },
  });

  /* ---- COMPONENT CLASSES ---- */
  addComponents({
    '.container-standard': {
      maxWidth: 'var(--container-standard)',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'var(--container-padding)',
      paddingRight: 'var(--container-padding)',
    },
    '.container-narrow': {
      maxWidth: 'var(--container-narrow)',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'var(--container-padding)',
      paddingRight: 'var(--container-padding)',
    },
    '.container-text': {
      maxWidth: 'var(--container-text)',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'var(--container-padding)',
      paddingRight: 'var(--container-padding)',
    },
    '.container-wide': {
      maxWidth: 'var(--container-wide)',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'var(--container-padding)',
      paddingRight: 'var(--container-padding)',
    },
  });
});
```

Register in Tailwind config:
```js
import reisIaPlugin from './tailwind-plugins/reis-ia.js';

export default {
  // ... theme config above
  plugins: [reisIaPlugin],
};
```

---

## 3. REUSABLE ANIMATION CLASSES

Place in `src/styles/animations.css`:

```css
/* ==========================================================================
   REIS IA -- Animation Classes
   ========================================================================== */

/* ---- ENTRANCE ANIMATIONS ---- */

/* Fade up (default entrance) */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.animate-stagger > .animate-on-scroll:nth-child(1) { transition-delay: 200ms; }
.animate-stagger > .animate-on-scroll:nth-child(2) { transition-delay: 350ms; }
.animate-stagger > .animate-on-scroll:nth-child(3) { transition-delay: 500ms; }
.animate-stagger > .animate-on-scroll:nth-child(4) { transition-delay: 650ms; }
.animate-stagger > .animate-on-scroll:nth-child(5) { transition-delay: 800ms; }
.animate-stagger > .animate-on-scroll:nth-child(6) { transition-delay: 950ms; }

/* Fade in (opacity only, no transform) */
.animate-fade-in {
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
}
.animate-fade-in.is-visible {
  opacity: 1;
}

/* Scale reveal (for images) */
.animate-scale-reveal {
  opacity: 0;
  transform: scale(0.96);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}
.animate-scale-reveal.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* 3D perspective entrance (hero only) */
.animate-perspective-parent {
  perspective: 1200px;
}
.animate-perspective-up {
  opacity: 0;
  transform: translateY(80px) rotateX(8deg);
  transform-origin: bottom center;
  transform-style: preserve-3d;
  transition:
    opacity var(--duration-dramatic) var(--ease-dramatic),
    transform var(--duration-dramatic) var(--ease-dramatic);
}
.animate-perspective-up.is-visible {
  opacity: 1;
  transform: translateY(0) rotateX(0);
}


/* ---- SIGNATURE ANIMATIONS ---- */

/* Rotating blue border */
@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.card-rotating-border {
  background:
    linear-gradient(135deg, var(--surface-2), var(--surface-3)) padding-box,
    conic-gradient(
      from var(--border-angle),
      rgba(255,255,255,0.08) 0%,
      rgba(255,255,255,0.08) 75%,
      rgba(74,144,255,0.5) 85%,
      rgba(74,144,255,0.8) 90%,
      rgba(74,144,255,0.5) 95%,
      rgba(255,255,255,0.08) 100%
    ) border-box;
  border: 1px solid transparent;
  border-radius: 12px;
  animation: rotateBorder 8s linear infinite;
}

@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}

/* Gradient border (static) */
.card-gradient-border {
  background:
    linear-gradient(135deg, var(--surface-2), var(--surface-3)) padding-box,
    linear-gradient(
      90deg,
      rgba(74,144,255,0.4) 0%,
      rgba(74,144,255,0) 50%,
      rgba(74,144,255,0.4) 100%
    ) border-box;
  border: 1px solid transparent;
  border-radius: 12px;
}


/* ---- CONTINUOUS ANIMATIONS ---- */

/* Logo marquee */
.marquee-track {
  display: flex;
  animation: marquee 40s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Scroll indicator bounce */
.scroll-indicator {
  animation: scroll-bounce 2s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* Skeleton loading shimmer */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-2) 25%,
    var(--surface-3) 37%,
    var(--surface-2) 63%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease infinite;
  border-radius: 4px;
}
@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}


/* ---- HOVER INTERACTIONS ---- */

/* Card image scale on hover */
.card-image-hover {
  overflow: hidden;
  border-radius: inherit;
}
.card-image-hover img {
  transition: transform var(--duration-moderate) var(--ease-card);
}
.card-image-hover:hover img {
  transform: scale(1.03);
}

/* Arrow shift on hover */
.arrow-hover .arrow-icon {
  transition: transform var(--duration-fast) var(--ease-base);
}
.arrow-hover:hover .arrow-icon {
  transform: translateX(4px);
}

/* Button press feedback */
.btn-press:active {
  transform: scale(0.98);
  transition: transform 50ms;
}


/* ---- AMBIENT EFFECTS ---- */

/* Blue ambient glow (section background) */
.ambient-blue {
  position: relative;
}
.ambient-blue::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-blue-ambient);
  pointer-events: none;
  z-index: 0;
}

/* Light pool variants */
.light-pool-bl::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(35% 50% at 0% 100%, rgba(255,255,255,0.03) 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}
.light-pool-tr::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(35% 50% at 100% 0%, rgba(255,255,255,0.03) 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}
.light-pool-blue-bl::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(35% 50% at 0% 100%, rgba(74,144,255,0.04) 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}
.light-pool-blue-center::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(74,144,255,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* Marquee edge fade mask */
.marquee-mask {
  mask-image: var(--gradient-marquee-edge);
  -webkit-mask-image: var(--gradient-marquee-edge);
}


/* === AURORA BACKGROUND === */
.aurora-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(74, 144, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(141, 196, 255, 0.05) 0%, transparent 60%),
    radial-gradient(ellipse 50% 60% at 50% 80%, rgba(53, 112, 204, 0.06) 0%, transparent 60%);
  animation: aurora-shift 20s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes aurora-shift {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  33% { transform: translate(-5%, 3%) scale(1.05); opacity: 0.8; }
  66% { transform: translate(3%, -2%) scale(0.98); opacity: 1; }
  100% { transform: translate(-2%, 5%) scale(1.02); opacity: 0.9; }
}

/* === GRADIENT TEXT REVEAL === */
.text-reveal {
  background: linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 100% 200%;
  background-position: 0 0;
  transition: background-position 1.2s var(--ease-dramatic);
}
.text-reveal.in-view {
  background-position: 0 -100%;
}

/* === MESH GRADIENT BACKGROUND === */
.mesh-gradient {
  background:
    radial-gradient(at 40% 20%, rgba(74, 144, 255, 0.07) 0%, transparent 50%),
    radial-gradient(at 80% 0%, rgba(53, 112, 204, 0.05) 0%, transparent 50%),
    radial-gradient(at 0% 50%, rgba(141, 196, 255, 0.04) 0%, transparent 50%),
    radial-gradient(at 60% 100%, rgba(74, 144, 255, 0.06) 0%, transparent 50%),
    var(--surface-0);
}

/* === STAGGERED GRID REVEAL === */
.grid-stagger > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.grid-stagger.in-view > *:nth-child(1) { transition-delay: 0ms; }
.grid-stagger.in-view > *:nth-child(2) { transition-delay: 100ms; }
.grid-stagger.in-view > *:nth-child(3) { transition-delay: 200ms; }
.grid-stagger.in-view > *:nth-child(4) { transition-delay: 300ms; }
.grid-stagger.in-view > * { opacity: 1; transform: translateY(0); }
```

---

## 4. COMPONENT STRUCTURE TEMPLATES

### 4A. Page Container

```astro
---
// src/layouts/BaseLayout.astro
---
<html lang="en" class="bg-surface-0 text-primary font-sans">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
  <slot name="head" />
</head>
<body class="min-h-screen grain">
  <slot name="nav" />
  <main>
    <slot />
  </main>
  <slot name="footer" />
  <script src="/scripts/scroll-animations.js" />
</body>
</html>
```

### 4B. Section Wrapper

```astro
---
// src/components/Section.astro
interface Props {
  background?: 'surface-0' | 'surface-1';
  padding?: 'standard' | 'compact' | 'hero';
  container?: 'standard' | 'narrow' | 'text' | 'wide';
  lightPool?: 'none' | 'bl' | 'tr' | 'br' | 'blue-bl' | 'blue-center';
  id?: string;
}

const {
  background = 'surface-0',
  padding = 'standard',
  container = 'standard',
  lightPool = 'none',
  id
} = Astro.props;

const bgClass = `bg-${background}`;
const paddingMap = {
  standard: 'py-3xl',
  compact: 'py-2xl',
  hero: 'pt-4xl pb-3xl',
};
const containerMap = {
  standard: 'container-standard',
  narrow: 'container-narrow',
  text: 'container-text',
  wide: 'container-wide',
};
const lightPoolMap = {
  none: '',
  bl: 'light-pool-bl',
  tr: 'light-pool-tr',
  br: 'light-pool-br',
  'blue-bl': 'light-pool-blue-bl',
  'blue-center': 'light-pool-blue-center',
};
---
<section
  class:list={[bgClass, paddingMap[padding], 'relative overflow-hidden', lightPoolMap[lightPool]]}
  id={id}
>
  <div class:list={[containerMap[container], 'relative z-10']}>
    <slot />
  </div>
</section>
```

### 4C. Navigation Bar

```astro
---
// src/components/Nav.astro
const links = [
  { label: 'Home', href: '/' },
  { label: 'Builder', href: '/builder' },
  { label: 'Systems', href: '/systems' },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
];
---
<header
  id="site-nav"
  class="fixed top-0 left-0 right-0 z-nav transition-all duration-normal ease-base"
>
  <nav class="container-wide flex items-center justify-between h-[72px] md:h-16">
    <!-- Brand -->
    <a href="/" class="text-lg font-bold text-primary">Reis IA</a>

    <!-- Desktop links -->
    <div class="hidden lg:flex items-center gap-8">
      {links.map(link => (
        <a
          href={link.href}
          class="text-body-sm font-normal text-tertiary hover:text-primary transition-colors duration-fast ease-base"
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- CTA -->
    <div class="hidden lg:block">
      <a href="/agendar" class="btn-primary-sm">Book a Call</a>
    </div>

    <!-- Mobile hamburger -->
    <button
      id="mobile-menu-toggle"
      class="lg:hidden w-10 h-10 flex items-center justify-center"
      aria-label="Toggle menu"
      aria-expanded="false"
    >
      <span class="hamburger-icon"></span>
    </button>
  </nav>
</header>

<!-- Mobile menu overlay -->
<div
  id="mobile-menu"
  class="fixed inset-0 z-modal bg-black/95 backdrop-blur-lg hidden"
  aria-hidden="true"
>
  <div class="flex flex-col items-center justify-center h-full gap-6">
    {links.map(link => (
      <a
        href={link.href}
        class="text-h5 font-semibold text-primary"
      >
        {link.label}
      </a>
    ))}
    <a href="/agendar" class="btn-primary mt-8 w-64 text-center">Book a Call</a>
  </div>
  <button
    class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-primary"
    aria-label="Close menu"
  >
    <!-- X icon -->
  </button>
</div>
```

### 4D. Buttons

```astro
---
// src/components/Button.astro
interface Props {
  variant?: 'primary' | 'primary-hero' | 'secondary' | 'ghost';
  href: string;
  class?: string;
}

const { variant = 'primary', href, class: className } = Astro.props;

const variants = {
  'primary': 'bg-accent text-white text-body font-semibold tracking-[0.01em] px-8 py-[13px] pb-[15px] rounded-button hover:bg-accent-hover hover:-translate-y-0.5 active:bg-accent-muted active:translate-y-0 transition-all duration-fast ease-base min-w-[200px] text-center inline-flex items-center justify-center btn-press',
  'primary-hero': 'bg-accent text-white text-body-lg font-semibold tracking-[0.01em] px-10 py-[17px] pb-[19px] rounded-button-lg hover:bg-accent-hover hover:-translate-y-0.5 active:bg-accent-muted active:translate-y-0 transition-all duration-fast ease-base min-w-[220px] text-center inline-flex items-center justify-center btn-press',
  'secondary': 'bg-transparent text-primary text-body font-semibold px-8 py-[14px] rounded-button border border-visible hover:border-strong hover:bg-white/[0.03] transition-all duration-fast ease-base min-w-[200px] text-center inline-flex items-center justify-center',
  'ghost': 'bg-transparent text-secondary text-body font-medium py-2 px-0 hover:text-primary transition-colors duration-fast ease-base inline-flex items-center gap-2 arrow-hover',
};
---
<a href={href} class:list={[variants[variant], className]}>
  <slot />
  {variant === 'ghost' && <span class="arrow-icon">--&gt;</span>}
</a>
```

### 4E. Standard Card

```astro
---
// src/components/Card.astro
interface Props {
  variant?: 'standard' | 'accented' | 'glass' | 'gradient-border' | 'rotating-border';
  icon?: 'hourglass' | 'none';
}

const { variant = 'standard', icon = 'none' } = Astro.props;

const variantClasses = {
  standard: 'bg-surface-2 border border-default rounded-card p-8 md:p-6 hover:border-visible hover:bg-surface-3 transition-all duration-normal ease-base',
  accented: 'bg-surface-2 border border-default border-t-2 border-t-accent rounded-card p-8 md:p-6 hover:border-visible hover:bg-surface-3 transition-all duration-normal ease-base',
  glass: 'bg-white/5 border border-subtle rounded-card-lg p-8 md:p-6 backdrop-blur-[16px] [backdrop-filter:saturate(180%)_blur(16px)]',
  'gradient-border': 'card-gradient-border p-8 md:p-6',
  'rotating-border': 'card-rotating-border p-8 md:p-6',
};
---
<div class={variantClasses[variant]}>
  {icon !== 'none' && (
    <div class="mb-6">
      <!-- Icon component, 32-40px, accent blue -->
    </div>
  )}
  <slot />
</div>
```

### 4F. Badge / Label

```astro
---
// src/components/Badge.astro
---
<span class="inline-block bg-accent/10 text-accent text-label uppercase tracking-[0.05em] px-3.5 py-1.5 rounded-badge border border-accent/20">
  <slot />
</span>
```

### 4G. Stats Block

```astro
---
// src/components/StatBlock.astro
interface Props {
  value: string;
  label: string;
  context?: string;
  color?: 'blue' | 'white';
}

const { value, label, context, color = 'blue' } = Astro.props;
const valueColor = color === 'blue' ? 'text-accent' : 'text-primary';
---
<div class="text-center md:text-left">
  <div class:list={['text-[56px] md:text-[40px] font-bold tabular-nums', valueColor]}>
    {value}
  </div>
  <div class="text-caption uppercase tracking-[0.05em] text-tertiary mt-2">
    {label}
  </div>
  {context && (
    <div class="text-body-sm text-secondary mt-1">
      {context}
    </div>
  )}
</div>
```

### 4H. Testimonial Block

```astro
---
// src/components/Testimonial.astro
interface Props {
  quote: string;
  name: string;
  role: string;
}

const { quote, name, role } = Astro.props;
---
<blockquote class="border-l-2 border-accent pl-6 relative">
  <div class="absolute -top-4 -left-2 text-[48px] text-accent/20 font-serif leading-none select-none" aria-hidden="true">
    &ldquo;
  </div>
  <p class="text-body-lg italic text-secondary leading-[1.70] mb-4">
    &ldquo;{quote}&rdquo;
  </p>
  <footer>
    <cite class="not-italic">
      <span class="text-[15px] font-semibold text-primary block">{name}</span>
      <span class="text-body-sm text-tertiary">{role}</span>
    </cite>
  </footer>
</blockquote>
```

### 4I. FAQ Accordion Item

```astro
---
// src/components/FaqItem.astro
interface Props {
  question: string;
  answer: string;
}

const { question, answer } = Astro.props;
---
<div class="faq-item border-b border-default">
  <button
    class="w-full flex items-center justify-between py-6 text-left text-h5 font-semibold text-primary hover:text-secondary transition-colors duration-fast"
    aria-expanded="false"
  >
    <span>{question}</span>
    <span class="faq-icon text-tertiary text-xl transition-transform duration-normal flex-shrink-0 ml-4">+</span>
  </button>
  <div class="faq-answer overflow-hidden max-h-0 transition-[max-height] duration-normal ease-out">
    <div class="pb-6 text-body text-secondary leading-[1.65] max-w-container-text">
      {answer}
    </div>
  </div>
</div>
```

### 4J. Logo Marquee

```astro
---
// src/components/LogoMarquee.astro
interface Props {
  logos: Array<{ src: string; alt: string; }>;
}

const { logos } = Astro.props;
---
<div class="relative overflow-hidden py-2xl" aria-label="Trusted by leading companies">
  <div class="marquee-mask">
    <div class="marquee-track" style="width: max-content;">
      <!-- Repeat logos 3x for seamless loop -->
      {[...logos, ...logos, ...logos].map(logo => (
        <div class="flex-shrink-0 mx-[40px] md:mx-[30px]">
          <img
            src={logo.src}
            alt={logo.alt}
            class="h-8 w-auto opacity-50 hover:opacity-100 transition-opacity duration-normal grayscale brightness-0 invert"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
</div>
```

### 4K. Process Step

```astro
---
// src/components/ProcessStep.astro
interface Props {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const { number, title, description, isLast = false } = Astro.props;
---
<div class="flex gap-8 md:gap-6">
  <!-- Number column -->
  <div class="flex flex-col items-center flex-shrink-0 w-16">
    <span class="text-[48px] font-bold text-accent tabular-nums leading-none">
      {number}
    </span>
    {!isLast && (
      <div class="w-px flex-1 bg-[var(--border-default)] mt-4"></div>
    )}
  </div>

  <!-- Content -->
  <div class="pb-xl">
    <h4 class="text-h4 font-semibold text-primary mb-3">{title}</h4>
    <p class="text-body text-secondary leading-[1.65] max-w-[600px]">{description}</p>
  </div>
</div>
```

### 4L. Footer

```astro
---
// src/components/Footer.astro
const columns = [
  {
    title: 'Ecosystem',
    links: [
      { label: 'Builder', href: '/builder' },
      { label: 'Systems', href: '/systems' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/agendar' },
    ],
  },
];
---
<footer class="bg-surface-1 border-t border-default">
  <div class="container-standard pt-3xl pb-2xl">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-xl">
      <!-- Brand -->
      <div class="md:col-span-2">
        <span class="text-[20px] font-bold text-primary">Reis IA</span>
        <p class="text-body-sm text-tertiary mt-2 max-w-[320px]">
          AI implementation that generates revenue -- not prototypes that collect dust.
        </p>
      </div>

      <!-- Link columns -->
      {columns.map(col => (
        <div>
          <h4 class="text-label uppercase tracking-[0.05em] text-tertiary font-semibold mb-4">
            {col.title}
          </h4>
          <ul class="space-y-3">
            {col.links.map(link => (
              <li>
                <a
                  href={link.href}
                  class="text-body-sm text-tertiary hover:text-primary transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <!-- Bottom bar -->
    <div class="gradient-divider mt-xl"></div>
    <div class="flex flex-col md:flex-row justify-between items-center mt-lg gap-4">
      <span class="text-caption text-quaternary">
        &copy; {new Date().getFullYear()} Reis IA. All rights reserved.
      </span>
      <div class="flex gap-6">
        <a href="/privacy" class="text-caption text-quaternary hover:text-primary transition-colors duration-fast">Privacy</a>
        <a href="/terms" class="text-caption text-quaternary hover:text-primary transition-colors duration-fast">Terms</a>
      </div>
    </div>
  </div>
</footer>
```

---

## 5. UTILITY CLASSES

### 5A. Custom Utilities Not Covered by Tailwind

These are provided by the `reis-ia` Tailwind plugin (Section 2B) or in the global CSS:

| Class | Purpose |
|-------|---------|
| `.text-balance` | Applies `text-wrap: balance` for even line distribution on headings |
| `.text-pretty` | Applies `text-wrap: pretty` to prevent orphans/widows on body text |
| `.tabular-nums` | Applies `font-variant-numeric: tabular-nums` for aligned numbers |
| `.grain` | Adds SVG noise texture overlay at 3% opacity |
| `.gradient-divider` | 1px-height gradient fade divider (transparent at edges) |
| `.container-standard` | Max-width 1200px with fluid horizontal padding |
| `.container-narrow` | Max-width 800px with fluid horizontal padding |
| `.container-text` | Max-width 680px with fluid horizontal padding |
| `.container-wide` | Max-width 1280px with fluid horizontal padding |

### 5B. Component-Level Utilities (CSS Classes)

| Class | Purpose |
|-------|---------|
| `.animate-on-scroll` | Initial hidden state for scroll-triggered entrance |
| `.is-visible` | Added by JS when element enters viewport |
| `.animate-stagger` | Parent class for staggered child entrance delays |
| `.animate-fade-in` | Opacity-only entrance animation |
| `.animate-scale-reveal` | Scale + opacity entrance for images |
| `.animate-perspective-parent` | Sets perspective: 1200px for 3D children |
| `.animate-perspective-up` | 3D perspective entrance (translateY + rotateX) |
| `.card-rotating-border` | Rotating conic gradient blue border |
| `.card-gradient-border` | Static gradient blue border (background-clip technique) |
| `.card-image-hover` | Image scale(1.03) on parent hover |
| `.arrow-hover` | Arrow translateX(4px) on parent hover |
| `.btn-press` | Scale(0.98) on active/pressed state |
| `.ambient-blue` | Blue radial gradient ambient glow background |
| `.light-pool-bl` | Neutral light pool at bottom-left |
| `.light-pool-tr` | Neutral light pool at top-right |
| `.light-pool-blue-bl` | Blue light pool at bottom-left |
| `.light-pool-blue-center` | Blue ambient centered |
| `.marquee-track` | Continuous horizontal scroll animation |
| `.marquee-mask` | Edge fade mask for marquee containers |
| `.scroll-indicator` | Bouncing scroll chevron animation |
| `.skeleton` | Loading skeleton shimmer |
| `.faq-item` | FAQ accordion container |
| `.faq-answer` | FAQ collapsible answer region |

### 5C. Quick Reference -- Common Tailwind Combinations

**Hero headline**:
```html
<h1 class="text-display text-primary text-balance">
```

**Body paragraph**:
```html
<p class="text-body text-secondary text-pretty max-w-container-text">
```

**Section with alternating background**:
```html
<section class="bg-surface-0 py-3xl relative light-pool-tr">
<!-- or -->
<section class="bg-surface-1 py-3xl relative light-pool-bl">
```

**Card grid (3 columns)**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg animate-stagger">
```

**Primary CTA with microcopy**:
```html
<div class="flex flex-col items-center">
  <a href="/agendar" class="btn-primary-hero">Book AI Revenue Audit</a>
  <p class="text-micro text-quaternary mt-3">Free 60-minute session. No commitment.</p>
</div>
```

**Stat block row**:
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
  <StatBlock value="3.2x" label="Revenue Multiple" color="blue" />
  <StatBlock value="47%" label="Time Saved" color="blue" />
  <StatBlock value="12" label="Weeks to First Revenue" color="white" />
</div>
```

---

## 6. JAVASCRIPT PATTERNS

### 6A. IntersectionObserver for Scroll Animations

```js
// src/scripts/scroll-animations.js

/**
 * Scroll-triggered entrance animations.
 * Elements with .animate-on-scroll start hidden and animate in
 * when they enter the viewport.
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-scale-reveal, .animate-perspective-up');

  if (!elements.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate once, don't reverse
        }
      });
    },
    {
      threshold: 0.15,      // Trigger when 15% visible
      rootMargin: '0px 0px -50px 0px', // Slight offset from bottom
    }
  );

  elements.forEach(el => observer.observe(el));
}

// Run on DOM ready and after Astro page transitions
document.addEventListener('DOMContentLoaded', initScrollAnimations);
document.addEventListener('astro:page-load', initScrollAnimations);
```

### 6B. Navigation Scroll Behavior

```js
// src/scripts/nav-scroll.js

/**
 * Navigation glassmorphism on scroll.
 * Starts transparent, adds blur + background when user scrolls past threshold.
 */
function initNavScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 50; // px
  let isScrolled = false;

  function handleScroll() {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > SCROLL_THRESHOLD;

    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;

      if (isScrolled) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        nav.style.backdropFilter = 'saturate(180%) blur(20px)';
        nav.style.webkitBackdropFilter = 'saturate(180%) blur(20px)';
        nav.style.borderBottom = '1px solid var(--border-subtle)';
      } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.webkitBackdropFilter = 'none';
        nav.style.borderBottom = '1px solid transparent';
      }
    }
  }

  // Use passive listener for scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
}

document.addEventListener('DOMContentLoaded', initNavScroll);
document.addEventListener('astro:page-load', initNavScroll);
```

### 6C. Mobile Menu Toggle

```js
// src/scripts/mobile-menu.js

function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    menu.classList.remove('hidden');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    // Animate in
    requestAnimationFrame(() => {
      menu.style.opacity = '1';
    });
  }

  function closeMenu() {
    isOpen = false;
    menu.style.opacity = '0';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Wait for transition before hiding
    setTimeout(() => {
      menu.classList.add('hidden');
      menu.setAttribute('aria-hidden', 'true');
    }, 300);
  }

  toggle.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on menu link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', initMobileMenu);
document.addEventListener('astro:page-load', initMobileMenu);
```

### 6D. FAQ Accordion

```js
// src/scripts/faq-accordion.js

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const button = item.querySelector('button');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Close
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        if (icon) {
          icon.style.transform = 'rotate(0deg)';
          icon.textContent = '+';
          icon.style.color = '';
        }
      } else {
        // Open
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) {
          icon.style.transform = 'rotate(45deg)';
          icon.textContent = '+';
          icon.style.color = 'var(--accent-blue)';
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initFaqAccordion);
document.addEventListener('astro:page-load', initFaqAccordion);
```

### 6E. Counter Animation (for Stats)

```js
// src/scripts/counter-animation.js

/**
 * Animates stat numbers from 0 to their target value.
 * Triggered on scroll intersection.
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.counter);
  const suffix = element.dataset.counterSuffix || '';
  const prefix = element.dataset.counterPrefix || '';
  const decimals = (target % 1 !== 0) ? 1 : 0;
  const duration = 1500; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out curve
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easedProgress;

    element.textContent = prefix + currentValue.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', initCounterAnimations);
document.addEventListener('astro:page-load', initCounterAnimations);
```

Usage in HTML:
```html
<span data-counter="3.2" data-counter-suffix="x" class="text-[56px] font-bold text-accent tabular-nums">0x</span>
```

### 6F. Astro View Transitions Integration

```astro
---
// In BaseLayout.astro head
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

Navigation bar should persist across transitions:
```astro
<header transition:persist id="site-nav">
```

---

## 7. DOS AND DONTS WITH VISUAL EXAMPLES

### 7A. Color Usage

**CORRECT -- Blue accent on CTA only (max 2 per viewport)**:
```
+-----------------------------------------------+
|  Black background (#000)                       |
|                                                |
|  [White headline text -- no blue]              |
|  [70% white body text -- no blue]              |
|                                                |
|  [BLUE CTA BUTTON]   [White outline button]   |  <-- 1 blue element
|                                                |
|  [Blue stat number: 3.2x]                      |  <-- 2 blue elements max
|  [White description text]                      |
+-----------------------------------------------+
```

**INCORRECT -- Blue scattered across section (more than 2)**:
```
+-----------------------------------------------+
|  [Blue badge]                                  |  <-- 1
|  [Blue underlined headline]                    |  <-- 2
|  [Blue highlighted words in body]              |  <-- 3 (too many)
|  [BLUE CTA BUTTON]                             |  <-- 4 (diluted)
|  [Blue border card] [Blue border card]         |  <-- 5, 6 (way too many)
+-----------------------------------------------+
```

### 7B. Typography Hierarchy

**CORRECT -- Clear hierarchy with proper weights and opacity**:
```
[Badge: 12px, uppercase, 0.05em tracking, blue on blue/10 bg]

[Headline: 72px, weight 700, 100% white, -0.03em tracking]
max-width: 900px

[Body: 16px, weight 400, 70% white, line-height 1.65]
max-width: 680px

[Label: 12px, uppercase, 50% white]
```

**INCORRECT -- Inconsistent weights, hex grays instead of opacity**:
```
[Badge: 14px, lowercase, no tracking, random gray #888]

[Headline: 72px, weight 400 (too light), #CCCCCC (not 100% white)]
width: 100% (too wide, hard to read)

[Body: 18px, weight 600 (too heavy), #AAAAAA (hex gray, not opacity)]
width: 100% (too wide)

[Label: 16px, sentence case (should be uppercase), same size as body]
```

### 7C. Card Design

**CORRECT -- Subtle elevation through surface tiers and borders**:
```
+-- Card (bg: #111111, border: 8% white, radius: 12px) ------+
|  padding: 32px                                               |
|                                                              |
|  [Blue icon, 32px]                                           |
|  [Title: 28px, 600, 100% white]                              |
|  [Body: 16px, 400, 70% white]                                |
|  [Ghost CTA: "Learn more -->"]                               |
+--------------------------------------------------------------+

Hover: bg shifts to #161616, border to 12% white
```

**INCORRECT -- Shadows for elevation, busy borders, too many blue elements**:
```
+-- Card (bg: #222, box-shadow: 0 10px 40px black) -----------+
|  padding: 16px (too tight)                                   |
|  border: 2px solid blue (too heavy, blue border on card)     |
|                                                              |
|  [Blue icon] [Blue title] [Blue accent line]                 |
|  [Body: same weight and size as title]                       |
|  [Blue primary button inside card]                           |
+--------------------------------------------------------------+

Hover: drops heavier shadow (wrong approach for dark mode)
```

### 7D. Section Spacing

**CORRECT -- Generous breathing room, alternating backgrounds**:
```
+-- Section 1 (bg: #000, py: 120px) --------------------------+
|                                                              |
|              [Content -- centered, max-width]                |
|                                                              |
+--------------------------------------------------------------+
+-- Section 2 (bg: #0A0A0A, py: 120px) -----------------------+
|                                                              |
|              [Content -- centered, max-width]                |
|                                                              |
+--------------------------------------------------------------+
```

**INCORRECT -- Tight spacing, no background variation, visible dividers**:
```
+-- Section 1 (bg: #000, py: 40px) ---+
|  [Content]                           |
+--------------------------------------+
--- visible HR line (1px solid #444) ---  <-- Bad: use spacing not dividers
+-- Section 2 (bg: #000, py: 40px) ---+
|  [Content]                           |
+--------------------------------------+
```

### 7E. Animation

**CORRECT -- Subtle, purposeful, single easing curve per context**:
```
Entrance: opacity 0 + translateY(24px) -> visible
Duration: 800ms
Easing: ease-out (0.16, 1, 0.3, 1)
Stagger: 150ms between siblings
Trigger: 15% intersection

Card hover: border color shift + bg shift
Duration: 300ms
Easing: ease-base (0.25, 0.1, 0.25, 1)
```

**INCORRECT -- Multiple effects, bounce, wrong easing**:
```
Entrance: opacity + translateY + scale + rotateZ + blur
Duration: 200ms (too fast for entrance, looks jarring)
Easing: ease-in-out (wrong: elements should decelerate INTO view, not ease in)
Bounce: spring overshoot at end (not appropriate for premium consulting)

Card hover: scale(1.1) + rotateZ(2deg) + color shift + shadow appear
Duration: 100ms (too fast, looks jumpy)
Easing: linear (mechanical, no personality)
```

### 7F. Brand Motif Placement

**CORRECT -- Hourglass placed in narrative territory, anchoring the section**:
```
+-- Urgency Section (bg: #0A0A0A) -----------------------------+
|                                                              |
|  [Hourglass watermark, 250px, 4% opacity, right side]       |
|                                                              |
|  [Revenue-First Framework headline]                          |
|  [Methodology content]                                       |
+--------------------------------------------------------------+

+-- Efficiency Section (bg: #000) -----------------------------+
|                                                              |
|  [Hourglass watermark, 200px, 4% opacity, left side]        |
|                                                              |
|  [Time savings stats]                                        |
|  ["Every week without the right system..." copy]             |
+--------------------------------------------------------------+
```

**INCORRECT -- Wrong size, animated, or used as a UI icon**:
```
+-- Section -------------------------------------------------+
|                                                            |
|  [Hourglass, 50px, spinning animation] <-- Never spin      |
|  [Hourglass, 50px, too small to read as watermark]         |
|                                                            |
|  [Hourglass used as a bullet icon in body text] <-- Wrong  |
+------------------------------------------------------------+
```

---

---

## 8. GAP ANALYSIS ADDITIONS [ADDED -- 2026-03-16]

### 8A. Accent Opacity Ladder -- CSS Custom Properties

Add to the `:root` block in `src/styles/design-system.css`, after the existing `--accent-blue-rgb` line:

```css
  /* ---- BLUE ACCENT OPACITY LADDER ---- */
  --blue-02: rgba(74, 144, 255, 0.02);   /* Row/cell hover tint */
  --blue-04: rgba(74, 144, 255, 0.04);   /* Ambient light pools */
  --blue-06: rgba(74, 144, 255, 0.06);   /* Section ambient glow */
  --blue-08: rgba(74, 144, 255, 0.08);   /* Subtle glow shadow */
  --blue-10: rgba(74, 144, 255, 0.10);   /* Badge/tag background */
  --blue-12: rgba(74, 144, 255, 0.12);   /* Blue glow shadow */
  --blue-15: rgba(74, 144, 255, 0.15);   /* Card hover inset */
  --blue-20: rgba(74, 144, 255, 0.20);   /* Badge border, accent border */
  --blue-30: rgba(74, 144, 255, 0.30);   /* Border accent */
  --blue-40: rgba(74, 144, 255, 0.40);   /* Strong accent fill, focus ring */
  --blue-50: rgba(74, 144, 255, 0.50);   /* Rotating border highlight peak */
  --blue-80: rgba(74, 144, 255, 0.80);   /* Near-solid accent */
```

**Tailwind config addition** (inside `theme.extend.colors.accent`):

```js
accent: {
  DEFAULT: '#4A90FF',
  hover: '#6AADFF',
  muted: '#3570CC',
  bright: '#8DC4FF',
  // Opacity ladder
  '2': 'var(--blue-02)',
  '4': 'var(--blue-04)',
  '6': 'var(--blue-06)',
  '8': 'var(--blue-08)',
  '10': 'var(--blue-10)',
  '12': 'var(--blue-12)',
  '15': 'var(--blue-15)',
  '20': 'var(--blue-20)',
  '30': 'var(--blue-30)',
  '40': 'var(--blue-40)',
  '50': 'var(--blue-50)',
  '80': 'var(--blue-80)',
},
```

Usage: `bg-accent-10`, `border-accent-20`, `shadow-[0_0_50px_var(--blue-12)]`

---

### 8B. Signal / Semantic Colors -- CSS Custom Properties

Add to `:root` block, after the shadow definitions:

```css
  /* ---- SIGNAL COLORS ---- */
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-success: #22C55E;
  --color-info: var(--accent-blue);

  --color-error-bg: rgba(239, 68, 68, 0.10);
  --color-error-border: rgba(239, 68, 68, 0.25);
  --color-warning-bg: rgba(245, 158, 11, 0.10);
  --color-warning-border: rgba(245, 158, 11, 0.25);
  --color-success-bg: rgba(34, 197, 94, 0.10);
  --color-success-border: rgba(34, 197, 94, 0.25);
  --color-info-bg: rgba(74, 144, 255, 0.10);
  --color-info-border: rgba(74, 144, 255, 0.25);

  /* ---- INTERACTIVE STATES ---- */
  --focus-ring: var(--blue-40);
  --selection-bg: var(--blue-30);
  --selection-fg: #FFFFFF;
```

**Tailwind config addition** (inside `theme.extend.colors`):

```js
signal: {
  error: {
    DEFAULT: 'var(--color-error)',
    bg: 'var(--color-error-bg)',
    border: 'var(--color-error-border)',
  },
  warning: {
    DEFAULT: 'var(--color-warning)',
    bg: 'var(--color-warning-bg)',
    border: 'var(--color-warning-border)',
  },
  success: {
    DEFAULT: 'var(--color-success)',
    bg: 'var(--color-success-bg)',
    border: 'var(--color-success-border)',
  },
  info: {
    DEFAULT: 'var(--color-info)',
    bg: 'var(--color-info-bg)',
    border: 'var(--color-info-border)',
  },
},
```

Usage: `text-signal-error`, `bg-signal-success-bg`, `border-signal-warning-border`

---

### 8C. Numeric Spacing Scale -- CSS Custom Properties

Add to `:root` block, after the existing `--space-4xl` line:

```css
  /* ---- COMPONENT SPACING (STATIC) ---- */
  --gap-0:  0px;
  --gap-1:  4px;
  --gap-2:  8px;
  --gap-3:  12px;
  --gap-4:  16px;
  --gap-5:  20px;
  --gap-6:  24px;
  --gap-7:  32px;
  --gap-8:  40px;
  --gap-9:  48px;
  --gap-10: 64px;
```

**Tailwind config addition** (extend the `spacing` object):

```js
spacing: {
  'xs': 'var(--space-xs)',
  'sm': 'var(--space-sm)',
  'md': 'var(--space-md)',
  'lg': 'var(--space-lg)',
  'xl': 'var(--space-xl)',
  '2xl': 'var(--space-2xl)',
  '3xl': 'var(--space-3xl)',
  '4xl': 'var(--space-4xl)',
  // Numeric component-level scale
  'gap-0':  'var(--gap-0)',
  'gap-1':  'var(--gap-1)',
  'gap-2':  'var(--gap-2)',
  'gap-3':  'var(--gap-3)',
  'gap-4':  'var(--gap-4)',
  'gap-5':  'var(--gap-5)',
  'gap-6':  'var(--gap-6)',
  'gap-7':  'var(--gap-7)',
  'gap-8':  'var(--gap-8)',
  'gap-9':  'var(--gap-9)',
  'gap-10': 'var(--gap-10)',
},
```

Usage: `p-gap-3` (12px padding), `gap-gap-5` (20px grid gap), `mb-gap-6` (24px margin-bottom)

---

### 8D. Border Radius Scale -- CSS Custom Properties

Add to `:root` block:

```css
  /* ---- BORDER RADIUS SCALE ---- */
  --radius-none: 0px;
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius:      8px;
  --radius-lg:   10px;
  --radius-xl:   12px;
  --radius-2xl:  16px;
  --radius-full: 9999px;
```

**Tailwind config update** (extend `borderRadius`):

```js
borderRadius: {
  // Generic scale
  'none-r': 'var(--radius-none)',
  'sm-r':   'var(--radius-sm)',
  'md-r':   'var(--radius-md)',
  'r':      'var(--radius)',
  'lg-r':   'var(--radius-lg)',
  'xl-r':   'var(--radius-xl)',
  '2xl-r':  'var(--radius-2xl)',
  'pill':   'var(--radius-full)',
  // Semantic aliases (existing)
  'card':      '12px',
  'card-lg':   '16px',
  'button':    '8px',
  'button-lg': '10px',
  'badge':     '6px',
  'input':     '8px',
},
```

Usage: `rounded-pill` (9999px), `rounded-sm-r` (4px), `rounded-none-r` (0px)

---

### 8E. Icon System -- CSS Classes and Usage

Add to the global CSS or Tailwind plugin:

```css
/* ==========================================================================
   ICON SYSTEM -- Lucide Icons Integration
   [ADDED -- 2026-03-16]
   ========================================================================== */

/* Icon sizes */
.icon-xs  { width: 12px; height: 12px; }
.icon-sm  { width: 16px; height: 16px; }
.icon-md  { width: 20px; height: 20px; }
.icon-lg  { width: 24px; height: 24px; }
.icon-xl  { width: 32px; height: 32px; }

/* Icon colors */
.icon-default { color: var(--text-secondary); }
.icon-primary { color: var(--text-primary); }
.icon-accent  { color: var(--accent-blue); }
.icon-muted   { color: var(--text-quaternary); }
.icon-error   { color: var(--color-error); }

/* Icon alignment helper (aligns to text x-height) */
.icon-inline {
  display: inline-flex;
  align-items: center;
  vertical-align: -0.125em;
}
```

**Astro usage pattern**:

```astro
---
// Option 1: With astro-icon package
import { Icon } from 'astro-icon/components';
---
<Icon name="lucide:check" class="icon-sm icon-accent" />
<Icon name="lucide:arrow-right" class="icon-md icon-default" />

<!-- Option 2: Inline SVG -->
<svg class="icon-lg icon-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12" />
</svg>
```

**CSS custom properties** for icon sizes (add to `:root`):

```css
  /* ---- ICON SIZES ---- */
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-md: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;
```

---

### 8F. Multi-Variant Badge System -- CSS Classes

Add to global CSS or Tailwind plugin:

```css
/* ==========================================================================
   BADGE VARIANTS
   [ADDED -- 2026-03-16]
   ========================================================================== */

/* Base badge (shared properties) */
.badge,
.badge-accent,
.badge-success,
.badge-warning,
.badge-error,
.badge-neutral {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: var(--radius-md, 6px);
  border-width: 1px;
  border-style: solid;
}

/* Accent (default) */
.badge,
.badge-accent {
  background: var(--blue-10, rgba(74, 144, 255, 0.10));
  border-color: var(--blue-20, rgba(74, 144, 255, 0.20));
  color: var(--accent-blue, #4A90FF);
}

/* Success */
.badge-success {
  background: var(--color-success-bg, rgba(34, 197, 94, 0.10));
  border-color: rgba(34, 197, 94, 0.20);
  color: var(--color-success, #22C55E);
}

/* Warning */
.badge-warning {
  background: var(--color-warning-bg, rgba(245, 158, 11, 0.10));
  border-color: rgba(245, 158, 11, 0.20);
  color: var(--color-warning, #F59E0B);
}

/* Error */
.badge-error {
  background: var(--color-error-bg, rgba(239, 68, 68, 0.10));
  border-color: rgba(239, 68, 68, 0.20);
  color: var(--color-error, #EF4444);
}

/* Neutral */
.badge-neutral {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--border-visible, rgba(255, 255, 255, 0.12));
  color: var(--text-secondary);
}
```

---

### 8G. Form Input States -- CSS Classes

Add to global CSS or Tailwind plugin:

```css
/* ==========================================================================
   FORM INPUTS
   [ADDED -- 2026-03-16]
   ========================================================================== */

/* Base input */
.input {
  display: block;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--surface-3);
  border: 1px solid var(--border-default);
  border-radius: var(--radius, 8px);
  transition: border-color 200ms var(--ease-base),
              box-shadow 200ms var(--ease-base);
  outline: none;
}

.input::placeholder {
  color: var(--text-quaternary);
}

/* Hover */
.input:hover:not(:focus):not(:disabled):not(.input-error) {
  border-color: var(--border-visible);
}

/* Focus */
.input:focus {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px var(--blue-15, rgba(74, 144, 255, 0.15));
}

/* Error state */
.input-error,
.input.is-error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* Success state */
.input-success,
.input.is-success {
  border-color: var(--color-success);
}

/* Disabled state */
.input:disabled,
.input.is-disabled {
  background: var(--surface-2);
  border-color: var(--border-subtle);
  color: var(--text-quaternary);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Textarea variant */
.input-textarea {
  height: auto;
  min-height: 120px;
  resize: vertical;
}

/* Select variant */
.input-select {
  appearance: none;
  padding-right: 40px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
}

/* Field label */
.input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

/* Helper text */
.input-helper {
  display: block;
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 6px;
}

/* Error text */
.input-error-text {
  display: block;
  font-size: 13px;
  color: var(--color-error);
  margin-top: 6px;
}
```

---

### 8H. Hairline Grid -- CSS Class

Add to global CSS or Tailwind plugin:

```css
/* ==========================================================================
   HAIRLINE GRID
   [ADDED -- 2026-03-16]
   ========================================================================== */

.grid-hairline {
  display: grid;
  gap: 1px;
  background: var(--border-default);
  border: 1px solid var(--border-default);
}

.grid-hairline > * {
  background: var(--surface-0);
}

/* Variant on Surface-1 section */
.grid-hairline-s1 > * {
  background: var(--surface-1);
}

/* Common column patterns */
.grid-hairline-2 { grid-template-columns: repeat(2, 1fr); }
.grid-hairline-3 { grid-template-columns: repeat(3, 1fr); }
.grid-hairline-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive collapse */
@media (max-width: 767px) {
  .grid-hairline-2,
  .grid-hairline-3,
  .grid-hairline-4 {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .grid-hairline-3,
  .grid-hairline-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

### 8I. KPI Card -- CSS Class

Add to global CSS or Tailwind plugin:

```css
/* ==========================================================================
   KPI CARD
   [ADDED -- 2026-03-16]
   ========================================================================== */

.kpi-card {
  background: var(--surface-2);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl, 12px);
  padding: 24px;
  transition: border-color 200ms var(--ease-base),
              background-color 200ms var(--ease-base);
}

.kpi-card:hover {
  border-color: var(--border-visible);
  background: var(--surface-3);
}

.kpi-card__label {
  font-size: var(--text-label, 12px);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.kpi-card__value {
  font-size: var(--text-h2);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.kpi-card__value--accent {
  color: var(--accent-blue);
}

.kpi-card__trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
}

.kpi-card__trend--up {
  color: var(--color-success, #22C55E);
}

.kpi-card__trend--down {
  color: var(--color-error, #EF4444);
}

.kpi-card__context {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
  line-height: 1.5;
}
```

**Astro component usage**:

```html
<div class="kpi-card">
  <div class="kpi-card__label">Revenue Growth</div>
  <div class="kpi-card__value kpi-card__value--accent">3.2x</div>
  <div class="kpi-card__trend kpi-card__trend--up">
    <svg class="icon-sm" ...><!-- trending-up --></svg>
    +42% vs previous quarter
  </div>
</div>
```

---

### 8J. Tabs Component -- CSS Classes

Add to global CSS:

```css
/* ==========================================================================
   TABS
   [ADDED -- 2026-03-16]
   ========================================================================== */

.tabs {}

.tab-list {
  display: flex;
  border-bottom: 1px solid var(--border-default);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;  /* Firefox */
}

.tab-list::-webkit-scrollbar {
  display: none;  /* Chrome/Safari */
}

.tab-trigger {
  flex-shrink: 0;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 200ms var(--ease-base),
              border-color 200ms var(--ease-base);
  white-space: nowrap;
}

.tab-trigger:hover {
  color: var(--text-secondary);
}

.tab-trigger[aria-selected="true"],
.tab-trigger.is-active {
  color: var(--text-primary);
  font-weight: 600;
  border-bottom-color: var(--accent-blue);
}

.tab-panel {
  padding-top: 24px;
  min-height: 100px;
}

.tab-panel[hidden] {
  display: none;
}

.tab-panel:not([hidden]) {
  animation: fade-in 200ms var(--ease-base);
}

@keyframes tab-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**JavaScript pattern** (add to `src/scripts/tabs.js`):

```js
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const triggers = tabGroup.querySelectorAll('.tab-trigger');
    const panels = tabGroup.querySelectorAll('.tab-panel');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.tab;

        // Deactivate all
        triggers.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => p.setAttribute('hidden', ''));

        // Activate target
        trigger.classList.add('is-active');
        trigger.setAttribute('aria-selected', 'true');
        const panel = tabGroup.querySelector(`[data-tab-panel="${targetId}"]`);
        if (panel) panel.removeAttribute('hidden');
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initTabs);
document.addEventListener('astro:page-load', initTabs);
```

**HTML structure**:

```html
<div class="tabs">
  <div class="tab-list" role="tablist">
    <button class="tab-trigger is-active" data-tab="tab1" role="tab" aria-selected="true">Tab 1</button>
    <button class="tab-trigger" data-tab="tab2" role="tab" aria-selected="false">Tab 2</button>
    <button class="tab-trigger" data-tab="tab3" role="tab" aria-selected="false">Tab 3</button>
  </div>
  <div class="tab-panel" data-tab-panel="tab1" role="tabpanel">Content 1</div>
  <div class="tab-panel" data-tab-panel="tab2" role="tabpanel" hidden>Content 2</div>
  <div class="tab-panel" data-tab-panel="tab3" role="tabpanel" hidden>Content 3</div>
</div>
```

---

---

## 9. TECHNIQUE ENRICHMENT -- REFERENCE ADOPTIONS [ADDED -- 2026-03-17]

Implementations for the 8 techniques adopted from the master techniques catalog. Each includes production-ready CSS and/or JavaScript.

---

### 9A. Sticky Section Scroll Pattern (from Apple)

**CSS** -- Add to `src/styles/animations.css`:

```css
/* ==========================================================================
   STICKY SECTION SCROLL
   [ADDED -- 2026-03-17]
   Source: Apple product pages. Used for methodology/process showcases.
   ========================================================================== */

.sticky-section {
  position: relative;
  /* Height set via data attribute or inline: min 300vh for 3 steps, 400vh for 4 */
}

.sticky-section[data-steps="3"] { height: 300vh; }
.sticky-section[data-steps="4"] { height: 400vh; }

.sticky-section__frame {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sticky-section__step {
  position: absolute;
  opacity: 0;
  transform: translateY(40px);
  will-change: opacity, transform;
  max-width: var(--container-narrow, 800px);
  padding: 0 var(--container-padding);
  /* No CSS transition -- controlled entirely by JS for scroll-linked smoothness */
}

.sticky-section__step.is-active {
  opacity: 1;
  transform: translateY(0);
}

/* Progress bar (optional) */
.sticky-section__progress {
  position: absolute;
  top: 50%;
  right: var(--container-padding);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sticky-section__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-default);
  transition: background 300ms var(--ease-base), transform 300ms var(--ease-base);
}

.sticky-section__dot.is-active {
  background: var(--accent-blue);
  transform: scale(1.5);
}

/* Mobile fallback -- disable sticky, stack content */
@media (max-width: 767px) {
  .sticky-section {
    height: auto !important;
  }
  .sticky-section__frame {
    position: relative;
    height: auto;
  }
  .sticky-section__step {
    position: relative;
    opacity: 1;
    transform: none;
    padding-bottom: var(--space-xl);
  }
}
```

**JavaScript** -- Add to `src/scripts/sticky-scroll.js`:

```js
// ==========================================================================
// STICKY SECTION SCROLL
// [ADDED -- 2026-03-17]
// ==========================================================================

function initStickyScroll() {
  const sections = document.querySelectorAll('.sticky-section');
  if (!sections.length) return;

  // Skip on mobile
  if (window.innerWidth < 768) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach(section => {
      section.querySelectorAll('.sticky-section__step').forEach(step => {
        step.style.opacity = '1';
        step.style.transform = 'none';
      });
    });
    return;
  }

  sections.forEach(section => {
    const steps = section.querySelectorAll('.sticky-section__step');
    const dots = section.querySelectorAll('.sticky-section__dot');
    const stepCount = steps.length;
    if (!stepCount) return;

    let ticking = false;

    function update() {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const scrollableHeight = rect.height - window.innerHeight;

      // Progress: 0 at section start, 1 at section end
      const progress = Math.max(0, Math.min(1, -sectionTop / scrollableHeight));

      steps.forEach((step, index) => {
        const stepStart = index / stepCount;
        const stepEnd = (index + 1) / stepCount;
        const stepMiddle = (stepStart + stepEnd) / 2;

        // Each step fades in during first half of its range, out during second half
        // Last step stays visible
        let stepOpacity = 0;
        let stepTranslateY = 40;

        if (progress >= stepStart && progress < stepEnd) {
          // Active step
          const localProgress = (progress - stepStart) / (stepEnd - stepStart);
          if (index === stepCount - 1) {
            // Last step: fade in, stay visible
            stepOpacity = Math.min(1, localProgress * 3);
            stepTranslateY = 40 * (1 - Math.min(1, localProgress * 3));
          } else if (localProgress < 0.5) {
            // First half: fade in
            const fadeIn = localProgress * 2;
            stepOpacity = fadeIn;
            stepTranslateY = 40 * (1 - fadeIn);
          } else {
            // Second half: fade out
            const fadeOut = (localProgress - 0.5) * 2;
            stepOpacity = 1 - fadeOut;
            stepTranslateY = -20 * fadeOut;
          }
        } else if (progress >= stepEnd && index === stepCount - 1) {
          // Last step after completion: stay visible
          stepOpacity = 1;
          stepTranslateY = 0;
        }

        step.style.opacity = stepOpacity;
        step.style.transform = `translateY(${stepTranslateY}px)`;

        // Update dots
        if (dots[index]) {
          const isActive = progress >= stepStart && progress < stepEnd;
          dots[index].classList.toggle('is-active', isActive);
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update(); // Initial state
  });
}

document.addEventListener('DOMContentLoaded', initStickyScroll);
document.addEventListener('astro:page-load', initStickyScroll);
```

**Astro component usage**:

```html
<div class="sticky-section" data-steps="3">
  <div class="sticky-section__frame">
    <div class="sticky-section__step">
      <span class="badge">Step 01</span>
      <h3 class="text-h3 text-primary mt-4 mb-3">Discovery</h3>
      <p class="text-body text-secondary max-w-container-text">We audit your current revenue operations...</p>
    </div>
    <div class="sticky-section__step">
      <span class="badge">Step 02</span>
      <h3 class="text-h3 text-primary mt-4 mb-3">Strategy</h3>
      <p class="text-body text-secondary max-w-container-text">We design the AI implementation roadmap...</p>
    </div>
    <div class="sticky-section__step">
      <span class="badge">Step 03</span>
      <h3 class="text-h3 text-primary mt-4 mb-3">Implementation</h3>
      <p class="text-body text-secondary max-w-container-text">We build and deploy revenue-generating AI systems...</p>
    </div>

    <div class="sticky-section__progress">
      <div class="sticky-section__dot is-active"></div>
      <div class="sticky-section__dot"></div>
      <div class="sticky-section__dot"></div>
    </div>
  </div>
</div>
```

---

### 9B. Word-by-Word Text Reveal (from Apple)

**JavaScript** -- Add to `src/scripts/word-reveal.js`:

```js
// ==========================================================================
// WORD-BY-WORD TEXT REVEAL
// [ADDED -- 2026-03-17]
// Source: Apple product pages. Used for hero taglines.
// ==========================================================================

function initWordReveal() {
  const elements = document.querySelectorAll('[data-word-reveal]');
  if (!elements.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => {
      el.style.opacity = '1';
    });
    return;
  }

  elements.forEach(element => {
    const text = element.textContent.trim();
    const words = text.split(/\s+/);

    // Wrap each word in a span
    element.innerHTML = words.map((word, i) =>
      `<span class="word-reveal__word" style="
        opacity: 0.15;
        transition: opacity 0.4s var(--ease-base, cubic-bezier(0.25, 0.1, 0.25, 1)) ${i * 50}ms;
        display: inline;
      ">${word}</span>`
    ).join(' ');

    const wordSpans = element.querySelectorAll('.word-reveal__word');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wordSpans.forEach(span => {
            span.style.opacity = '1';
          });
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', initWordReveal);
document.addEventListener('astro:page-load', initWordReveal);
```

**CSS** -- Add to `src/styles/animations.css`:

```css
/* ==========================================================================
   WORD-BY-WORD TEXT REVEAL
   [ADDED -- 2026-03-17]
   ========================================================================== */

[data-word-reveal] {
  /* Prevent layout shift -- text is always present, just dimmed */
}

.word-reveal__word {
  will-change: opacity;
}
```

**HTML usage**:

```html
<h1 class="text-display text-primary text-balance" data-word-reveal>
  AI implementation that generates revenue not prototypes that collect dust
</h1>
```

---

### 9C. Floating CTA Component (from Porsche)

**CSS** -- Add to `src/styles/components.css`:

```css
/* ==========================================================================
   FLOATING CTA
   [ADDED -- 2026-03-17]
   Source: Porsche FloatingCta. Used on sales pages for persistent conversion.
   ========================================================================== */

.floating-cta {
  position: fixed;
  bottom: 24px;
  left: 50%;
  z-index: 40;
  pointer-events: none; /* Container doesn't block clicks */
}

.floating-cta__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Hidden state (default) */
  opacity: 0;
  transform: translateX(-50%) translateY(40%) scale(0.9);
  transform-origin: center bottom;
  pointer-events: none;

  /* Appearance */
  background: var(--accent-blue);
  color: #FFFFFF;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  padding: 14px 32px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;

  /* Multi-property transition */
  transition:
    opacity var(--duration-moderate, 500ms) ease-in-out,
    transform var(--duration-slow, 800ms) ease-in-out,
    background-color 250ms ease,
    backdrop-filter 300ms ease;
}

/* Shadow pseudo-element */
.floating-cta__button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
  opacity: 0;
  transition: opacity var(--duration-moderate, 500ms) ease-in-out;
  pointer-events: none;
}

/* Active state -- visible */
.floating-cta.is-active .floating-cta__button {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
  pointer-events: auto;
}

.floating-cta.is-active .floating-cta__button::before {
  opacity: 1;
}

/* Hover */
@media (hover: hover) {
  .floating-cta__button:hover {
    background: var(--accent-blue-hover, #6AADFF);
  }
}

/* Stuck / Frosted state (near footer) */
.floating-cta.is-stuck .floating-cta__button {
  background: rgba(10, 10, 26, 0.5);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
}

@media (hover: hover) {
  .floating-cta.is-stuck .floating-cta__button:hover {
    background: rgba(10, 10, 26, 0.65);
  }
}

/* Focus */
.floating-cta__button:focus-visible {
  outline: 2px solid #4D65FF;
  outline-offset: 2px;
}

/* Mobile: full-width with side margins */
@media (max-width: 767px) {
  .floating-cta {
    left: 16px;
    right: 16px;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  }
  .floating-cta__button {
    width: 100%;
    transform: translateX(0) translateY(40%) scale(0.9);
  }
  .floating-cta.is-active .floating-cta__button {
    transform: translateX(0) translateY(0) scale(1);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .floating-cta__button {
    transition: none;
  }
  .floating-cta.is-active .floating-cta__button {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  @media (max-width: 767px) {
    .floating-cta.is-active .floating-cta__button {
      transform: translateX(0) translateY(0) scale(1);
    }
  }
}
```

**JavaScript** -- Add to `src/scripts/floating-cta.js`:

```js
// ==========================================================================
// FLOATING CTA
// [ADDED -- 2026-03-17]
// ==========================================================================

function initFloatingCta() {
  const container = document.querySelector('.floating-cta');
  if (!container) return;

  const SHOW_THRESHOLD = 300;   // px scrolled before showing
  const FOOTER_PROXIMITY = 300; // px from bottom to trigger stuck state

  let isActive = false;
  let isStuck = false;

  function update() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Show/hide
    const shouldShow = scrollY > SHOW_THRESHOLD;
    if (shouldShow !== isActive) {
      isActive = shouldShow;
      container.classList.toggle('is-active', isActive);
    }

    // Stuck/frosted state near footer
    const nearBottom = scrollY > docHeight - winHeight - FOOTER_PROXIMITY;
    if (nearBottom !== isStuck) {
      isStuck = nearBottom;
      container.classList.toggle('is-stuck', isStuck);
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // Check initial state
}

document.addEventListener('DOMContentLoaded', initFloatingCta);
document.addEventListener('astro:page-load', initFloatingCta);
```

**HTML usage** (in sales page layout):

```html
<div class="floating-cta">
  <a href="/agendar" class="floating-cta__button">
    Book AI Revenue Audit
  </a>
</div>
```

---

### 9D. FAQ Exclusive-Open Behavior (from Morningside)

**JavaScript** -- Replace the existing `initFaqAccordion` in `src/scripts/faq-accordion.js`:

```js
// ==========================================================================
// FAQ ACCORDION WITH EXCLUSIVE-OPEN
// [ADDED -- 2026-03-17]
// Source: Morningside's closeAllAccordions pattern.
// Enhancement: Adds data-exclusive attribute for opt-in exclusive behavior.
// ==========================================================================

function initFaqAccordion() {
  const groups = document.querySelectorAll('.faq-group');

  groups.forEach(group => {
    const isExclusive = group.hasAttribute('data-exclusive');
    const items = group.querySelectorAll('.faq-item');

    items.forEach(item => {
      const button = item.querySelector('button');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      if (!button || !answer) return;

      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';

        // If exclusive mode, close all siblings first
        if (isExclusive && !isOpen) {
          items.forEach(sibling => {
            if (sibling === item) return;
            const sibButton = sibling.querySelector('button');
            const sibAnswer = sibling.querySelector('.faq-answer');
            const sibIcon = sibling.querySelector('.faq-icon');
            if (sibButton && sibButton.getAttribute('aria-expanded') === 'true') {
              sibButton.setAttribute('aria-expanded', 'false');
              if (sibAnswer) sibAnswer.style.maxHeight = '0';
              if (sibIcon) {
                sibIcon.style.transform = 'rotate(0deg)';
                sibIcon.style.color = '';
              }
            }
          });
        }

        if (isOpen) {
          // Close
          button.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = '0';
          if (icon) {
            icon.style.transform = 'rotate(0deg)';
            icon.style.color = '';
          }
        } else {
          // Open
          button.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          if (icon) {
            icon.style.transform = 'rotate(45deg)';
            icon.style.color = 'var(--accent-blue)';
          }
        }
      });
    });
  });

  // Also handle standalone .faq-item elements not in a group (backwards compat)
  const standaloneItems = document.querySelectorAll('.faq-item:not(.faq-group .faq-item)');
  standaloneItems.forEach(item => {
    const button = item.querySelector('button');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        if (icon) { icon.style.transform = 'rotate(0deg)'; icon.style.color = ''; }
      } else {
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) { icon.style.transform = 'rotate(45deg)'; icon.style.color = 'var(--accent-blue)'; }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initFaqAccordion);
document.addEventListener('astro:page-load', initFaqAccordion);
```

**HTML usage**:

```html
<!-- Exclusive-open FAQ (only one open at a time) -->
<div class="faq-group" data-exclusive>
  <div class="faq-item border-b border-default"><!-- ... --></div>
  <div class="faq-item border-b border-default"><!-- ... --></div>
  <div class="faq-item border-b border-default"><!-- ... --></div>
</div>

<!-- Non-exclusive FAQ (multiple can be open) -->
<div class="faq-group">
  <div class="faq-item border-b border-default"><!-- ... --></div>
  <div class="faq-item border-b border-default"><!-- ... --></div>
</div>
```

---

### 9E. Stagger System with CSS Custom Property Tokens (from Linear)

**CSS** -- Add to `:root` in `src/styles/design-system.css`:

```css
  /* ---- STAGGER SYSTEM TOKENS ---- */
  /* [ADDED -- 2026-03-17] */
  --entry-duration: 800ms;
  --entry-stagger: 120ms;
  --entry-delay: 200ms;
  --entry-offset: 24px;
```

**CSS** -- Add to `src/styles/animations.css`:

```css
/* ==========================================================================
   TOKEN-BASED STAGGER SYSTEM
   [ADDED -- 2026-03-17]
   Source: Linear's --entry-duration/stagger/delay architecture.
   ========================================================================== */

/* Token-based stagger: children set --stagger-index via inline style or JS */
.stagger-group > * {
  opacity: 0;
  transform: translateY(var(--entry-offset, 24px));
  transition:
    opacity var(--entry-duration, 800ms) var(--ease-out),
    transform var(--entry-duration, 800ms) var(--ease-out);
  transition-delay: calc(var(--stagger-index, 0) * var(--entry-stagger, 120ms) + var(--entry-delay, 200ms));
}

.stagger-group.in-view > * {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  .stagger-group > * {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**HTML usage**:

```html
<div class="stagger-group grid grid-cols-1 md:grid-cols-3 gap-lg">
  <div style="--stagger-index: 0;"><!-- Card 1 --></div>
  <div style="--stagger-index: 1;"><!-- Card 2 --></div>
  <div style="--stagger-index: 2;"><!-- Card 3 --></div>
  <div style="--stagger-index: 3;"><!-- Card 4 --></div>
  <div style="--stagger-index: 4;"><!-- Card 5 --></div>
  <div style="--stagger-index: 5;"><!-- Card 6 --></div>
</div>
```

**JavaScript** -- Auto-assign stagger indices (add to `src/scripts/scroll-animations.js`):

```js
// Auto-assign --stagger-index to children of .stagger-group
function initStaggerGroups() {
  document.querySelectorAll('.stagger-group').forEach(group => {
    Array.from(group.children).forEach((child, index) => {
      child.style.setProperty('--stagger-index', index);
    });
  });
}

// Call alongside initScrollAnimations
document.addEventListener('DOMContentLoaded', initStaggerGroups);
document.addEventListener('astro:page-load', initStaggerGroups);
```

**IntersectionObserver integration** -- Add `.stagger-group` to the existing observer in `scroll-animations.js`:

```js
// In the existing initScrollAnimations function, add to the selector:
const elements = document.querySelectorAll(
  '.animate-on-scroll, .animate-fade-in, .animate-scale-reveal, .animate-perspective-up, .stagger-group'
);
// The observer adds 'in-view' class (for stagger-group) or 'is-visible' (for others)
// Update the callback:
if (entry.isIntersecting) {
  entry.target.classList.add('is-visible');
  entry.target.classList.add('in-view'); // For stagger-group
  observer.unobserve(entry.target);
}
```

---

### 9F. Hardware-Adaptive Rendering (from Linear)

**JavaScript** -- Add to `src/scripts/performance-check.js`:

```js
// ==========================================================================
// HARDWARE-ADAPTIVE RENDERING
// [ADDED -- 2026-03-17]
// Source: Linear's navigator.hardwareConcurrency check.
// Must run BEFORE other animation scripts (load in <head> or early <body>).
// ==========================================================================

(function initPerformanceTier() {
  const cores = navigator.hardwareConcurrency || 4; // Default to mid-tier
  const memory = navigator.deviceMemory || 4;       // Default to mid-tier (Chrome/Edge only)

  let tier = 'full';

  if (cores < 2 || memory < 2) {
    tier = 'minimal';
  } else if (cores < 4 || memory < 4) {
    tier = 'reduced';
  }

  // prefers-reduced-motion always wins
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tier = 'minimal';
  }

  document.documentElement.setAttribute('data-perf', tier);
})();
```

**CSS** -- Add to `src/styles/animations.css`:

```css
/* ==========================================================================
   HARDWARE-ADAPTIVE RENDERING -- CSS Overrides
   [ADDED -- 2026-03-17]
   ========================================================================== */

/* Reduced tier: disable heavy animations */
[data-perf="reduced"] .aurora-bg,
[data-perf="minimal"] .aurora-bg {
  display: none;
}

[data-perf="reduced"] .card-rotating-border,
[data-perf="minimal"] .card-rotating-border {
  animation: none;
}

[data-perf="reduced"] .parallax-slow,
[data-perf="reduced"] .parallax-medium,
[data-perf="reduced"] .parallax-fast,
[data-perf="minimal"] .parallax-slow,
[data-perf="minimal"] .parallax-medium,
[data-perf="minimal"] .parallax-fast {
  transform: none !important;
}

/* Minimal tier: instant all entrances */
[data-perf="minimal"] .animate-on-scroll,
[data-perf="minimal"] .animate-fade-in,
[data-perf="minimal"] .animate-scale-reveal,
[data-perf="minimal"] .animate-perspective-up,
[data-perf="minimal"] .stagger-group > * {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

/* Minimal tier: disable word reveal animation */
[data-perf="minimal"] .word-reveal__word {
  opacity: 1 !important;
  transition: none !important;
}

/* Minimal tier: disable sticky scroll (show all steps) */
[data-perf="minimal"] .sticky-section {
  height: auto !important;
}
[data-perf="minimal"] .sticky-section__frame {
  position: relative;
  height: auto;
}
[data-perf="minimal"] .sticky-section__step {
  position: relative;
  opacity: 1;
  transform: none;
  padding-bottom: var(--space-xl);
}
```

**Astro integration** -- Load the performance check script early:

```html
<!-- In BaseLayout.astro <head>, BEFORE other scripts -->
<script src="/scripts/performance-check.js" is:inline></script>
```

---

### 9G. Micro-Interaction Timing -- New Duration Token

**CSS** -- Add to `:root` in `src/styles/design-system.css`, after `--duration-instant`:

```css
  --duration-micro: 150ms;   /* Single-property micro-interactions (color, opacity) */
```

**Tailwind config** -- Add to `transitionDuration`:

```js
transitionDuration: {
  'instant': 'var(--duration-instant)',
  'micro': 'var(--duration-micro)',  // NEW
  'fast': 'var(--duration-fast)',
  'normal': 'var(--duration-normal)',
  'moderate': 'var(--duration-moderate)',
  'slow': 'var(--duration-slow)',
  'dramatic': 'var(--duration-dramatic)',
},
```

**Usage guidance** -- Update existing patterns:

```css
/* Nav link hover: single color change -> use micro (150ms) instead of fast (200ms) */
.nav-link {
  transition: color var(--duration-micro) var(--ease-base);
}

/* Link hover: single color change -> micro */
a {
  transition: color var(--duration-micro) var(--ease-base);
}

/* Card hover: multi-property -> keep fast (200ms) or normal (300ms) */
.card {
  transition: border-color var(--duration-fast) var(--ease-base),
              background-color var(--duration-fast) var(--ease-base);
}
```

---

### 9H. Tab Sliding Indicator (from Morningside)

**CSS** -- Add to the existing tabs section in `src/styles/components.css`:

```css
/* ==========================================================================
   TAB SLIDING INDICATOR
   [ADDED -- 2026-03-17]
   Source: Morningside service tab navigation.
   Enhancement to existing .tab-list component.
   ========================================================================== */

.tab-list--sliding {
  position: relative;
}

/* Remove the per-trigger bottom border when using sliding indicator */
.tab-list--sliding .tab-trigger {
  border-bottom: 2px solid transparent;
}
.tab-list--sliding .tab-trigger[aria-selected="true"],
.tab-list--sliding .tab-trigger.is-active {
  border-bottom-color: transparent; /* Indicator handles this */
}

/* Sliding indicator bar */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--accent-blue);
  border-radius: 1px;
  transition: left 300ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
              width 300ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
  pointer-events: none;
}
```

**JavaScript** -- Enhanced tabs script (add to `src/scripts/tabs.js`):

```js
// ==========================================================================
// TABS WITH SLIDING INDICATOR
// [ADDED -- 2026-03-17]
// ==========================================================================

function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const tabList = tabGroup.querySelector('.tab-list');
    const triggers = tabGroup.querySelectorAll('.tab-trigger');
    const panels = tabGroup.querySelectorAll('.tab-panel');
    const indicator = tabGroup.querySelector('.tab-indicator');

    // Position indicator on active tab
    function updateIndicator() {
      if (!indicator) return;
      const activeTab = tabList.querySelector('.tab-trigger.is-active, .tab-trigger[aria-selected="true"]');
      if (!activeTab) return;

      const tabListRect = tabList.getBoundingClientRect();
      const activeRect = activeTab.getBoundingClientRect();

      indicator.style.left = (activeRect.left - tabListRect.left + tabList.scrollLeft) + 'px';
      indicator.style.width = activeRect.width + 'px';
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.tab;

        // Deactivate all
        triggers.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => p.setAttribute('hidden', ''));

        // Activate target
        trigger.classList.add('is-active');
        trigger.setAttribute('aria-selected', 'true');
        const panel = tabGroup.querySelector(`[data-tab-panel="${targetId}"]`);
        if (panel) panel.removeAttribute('hidden');

        // Slide indicator
        updateIndicator();
      });
    });

    // Set initial indicator position
    updateIndicator();

    // Update on window resize (tab widths may change)
    window.addEventListener('resize', updateIndicator);
  });
}

document.addEventListener('DOMContentLoaded', initTabs);
document.addEventListener('astro:page-load', initTabs);
```

**HTML usage** (enhanced tab list):

```html
<div class="tabs">
  <div class="tab-list tab-list--sliding" role="tablist">
    <button class="tab-trigger is-active" data-tab="discovery" role="tab" aria-selected="true">Discovery</button>
    <button class="tab-trigger" data-tab="strategy" role="tab" aria-selected="false">Strategy</button>
    <button class="tab-trigger" data-tab="implementation" role="tab" aria-selected="false">Implementation</button>
    <div class="tab-indicator"></div>
  </div>
  <div class="tab-panel" data-tab-panel="discovery" role="tabpanel">...</div>
  <div class="tab-panel" data-tab-panel="strategy" role="tabpanel" hidden>...</div>
  <div class="tab-panel" data-tab-panel="implementation" role="tabpanel" hidden>...</div>
</div>
```

---

## Changelog

- 2026-03-16: Implementation Guide v1.0 published
- 2026-03-17: Gap analysis additions (Section 8):
  - 8A: Accent opacity ladder CSS custom properties + Tailwind config
  - 8B: Signal/semantic colors CSS custom properties + Tailwind config
  - 8C: Numeric spacing scale --gap-0 through --gap-10 + Tailwind config
  - 8D: Border radius scale CSS custom properties + Tailwind config
  - 8E: Icon system CSS classes and Astro usage patterns
  - 8F: Multi-variant badge system CSS classes
  - 8G: Form input states CSS classes (default, hover, focus, error, success, disabled)
  - 8H: Hairline grid CSS class with responsive collapse
  - 8I: KPI card CSS class with BEM structure
- 2026-03-17: Removed Azure Whisper / Blue Shimmer Text effect (permanently discarded)
  - Removed --gradient-blue-shimmer CSS variable
- 2026-03-17: Technique enrichment from 9 reference sources (Section 9):
  - 9A: Sticky Section Scroll Pattern -- CSS + JS (from Apple)
  - 9B: Word-by-Word Text Reveal -- JS + CSS (from Apple)
  - 9C: Floating CTA Component -- CSS + JS (from Porsche)
  - 9D: FAQ Exclusive-Open Behavior -- JS enhancement (from Morningside)
  - 9E: Stagger System with CSS Custom Property Tokens -- CSS + JS (from Linear)
  - 9F: Hardware-Adaptive Rendering -- JS + CSS (from Linear)
  - 9G: Micro-Interaction Timing -- new --duration-micro token (from Stripe)
  - 9H: Tab Sliding Indicator -- CSS + JS (from Morningside)
  - Removed .text-shimmer CSS class and @keyframes shimmer
  - Removed .text-shimmer from utility class table
  - Removed text-shimmer from hero HTML example
  - 8J: Tabs component CSS + JavaScript + HTML structure

---

*Produced by: designer-agent*
*Companion to: reis-ia-design-system.md*
*For use by: dev-agent when implementing the Reis IA website*
