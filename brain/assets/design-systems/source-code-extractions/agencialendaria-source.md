# Agencia Lendaria -- Source Code Extraction

Last updated: 2026-03-17
Source: https://agencialendaria.com.br
Framework: WordPress + Elementor
Extraction limitations: Most visual styles managed by Elementor's compiled CSS, not directly in page source

---

## 1. Site Architecture

### Framework Details

- **CMS**: WordPress
- **Page Builder**: Elementor (frontend config confirms)
- **Analytics**: Google Analytics GA4 (`GT-578BXKCQ`), Google Ads (`AW-987730703`), GTM (`GTM-PCKT39N9`)
- **Auth**: Google Sign-in via Site Kit
- **Language**: Portuguese (Brazil)

### Meta Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Elementor breakpoints -->
xs: 0px
sm: 480px
md: 768px
lg: 1025px
xl: 1440px
xxl: 1600px
```

---

## 2. Page Structure

```
Header / Navigation
  -- Logo: agencia_lendaria_menu.webp
  -- Nav: Home, Guia Instagram 2026, Fale Conosco (WhatsApp)

Hero Section
  -- Image: marketing_inteligente_para_negocios_lendarios_-scaled.webp
  -- Headline: "O ano e 2025 e as inteligencias artificiais dominam o mercado"
  -- Subheading: about strategic marketing and tangible results

Services Grid (6 sections)
  -- Gestao de Trafego
  -- Social Media
  -- Criativos e Videos
  -- Automacoes e CRM
  -- Websites
  -- Lancamentos
  -- Each: title + description (4-5 bullets) + image

Delivery Models Section (4 options)
  -- Time Compartilhado
  -- Os Lendarios (Equipe Exclusiva)
  -- Agentes de I.A.
  -- Projetos Pontuais On Demand
  -- Each: features + ideal client profiles

Testimonials Section
  -- 4 client testimonial images

Contact Form
  -- Fields: Nome, E-mail, Whatsapp

WhatsApp CTA
  -- Phone: +55 41 3063-1963

Footer
  -- Instagram: @agencia.lendaria
  -- Address: Av. Candido de Abreu, 526 -- Curitiba PR
```

---

## 3. CSS Design Tokens

### WordPress Global Variables

```css
/* Aspect Ratios */
--wp--preset--aspect-ratio--square: 1;
--wp--preset--aspect-ratio--4-3: 4/3;
--wp--preset--aspect-ratio--3-4: 3/4;
--wp--preset--aspect-ratio--3-2: 3/2;
--wp--preset--aspect-ratio--2-3: 2/3;
--wp--preset--aspect-ratio--16-9: 16/9;
--wp--preset--aspect-ratio--9-16: 9/16;

/* Color Palette */
--wp--preset--color--black: #000000;
--wp--preset--color--white: #ffffff;
--wp--preset--color--cyan-bluish-gray: #abb8c3;
--wp--preset--color--pale-pink: /* pale-pink */;
--wp--preset--color--vivid-red: #cf2e2e;
--wp--preset--color--luminous-vivid-orange: #ff6900;
--wp--preset--color--luminous-vivid-amber: #fcb900;
--wp--preset--color--light-green-cyan: /* light-green */;
--wp--preset--color--vivid-green-cyan: #00d084;
--wp--preset--color--vivid-cyan-blue: #0693e3;
--wp--preset--color--vivid-purple: #9b51e0;

/* Font Sizes */
--wp--preset--font-size--small: 13px;
--wp--preset--font-size--medium: 20px;
--wp--preset--font-size--large: 36px;
--wp--preset--font-size--x-large: 42px;

/* Spacing Scale (rem-based) */
--wp--preset--spacing--20: 0.44rem;   /* ~7px */
--wp--preset--spacing--30: 0.67rem;   /* ~11px */
--wp--preset--spacing--40: 1rem;      /* 16px */
--wp--preset--spacing--50: 1.5rem;    /* 24px */
--wp--preset--spacing--60: 2.25rem;   /* 36px */
--wp--preset--spacing--70: 3.38rem;   /* 54px */
--wp--preset--spacing--80: 5.06rem;   /* 81px */
```

### Layout Tokens

```css
--wp--style--global--content-size: 800px;
--wp--style--global--wide-size: 1200px;
--wp--style--block-gap: 24px;
```

### Shadow Presets

```css
--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--outlined: 6px 6px 0px -3px rgb(255, 255, 255), 6px 6px rgb(0, 0, 0);
--wp--preset--shadow--crisp: 6px 6px 0px rgb(0, 0, 0);
```

### Gradient Presets

```css
/* Named gradients */
vivid-cyan-blue-to-vivid-purple
light-green-cyan-to-vivid-green-cyan
luminous-vivid-amber-to-luminous-vivid-orange
cool-to-warm-spectrum
midnight: linear-gradient(135deg, rgb(2,3,129) 0%, rgb(40,116,252) 100%)
```

---

## 4. Layout System

### Core Layout Patterns

```css
/* Flow layout (default) */
.is-layout-flow > * + * {
  margin-block-start: 24px;
  margin-block-end: 0;
}

/* Constrained layout */
.is-layout-constrained > * {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.is-layout-constrained > .alignwide {
  max-width: 1200px;
}

/* Flex layout */
.is-layout-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

/* Grid layout */
.is-layout-grid {
  display: grid;
  gap: 24px;
}
```

### Alignment Utilities

```css
.alignleft { float: left; margin-right: 2em; }
.alignright { float: right; margin-left: 2em; }
.aligncenter {
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
```

### Responsive Breakpoints (Elementor)

```css
/* 6-tier breakpoint system */
@media (max-width: 1600px) { /* xxl */ }
@media (max-width: 1440px) { /* xl */ }
@media (max-width: 1025px) { /* lg -- tablet landscape */ }
@media (max-width: 768px)  { /* md -- tablet portrait */ }
@media (max-width: 480px)  { /* sm -- mobile landscape */ }
/* xs: 0px -- default mobile */
```

---

## 5. Button Styling

```css
.wp-element-button,
.wp-block-button__link {
  background-color: #32373c;
  color: #fff;
  padding: calc(0.667em + 2px) calc(1.333em + 2px);
  border-width: 0;
  text-decoration: none;
}
```

---

## 6. JavaScript Patterns

### Elementor Lazy Loading Observer

```javascript
const lazyloadRunObserver = () => {
  const lazyloadBackgrounds = document.querySelectorAll(
    `.e-con.e-parent:not(.e-lazyloaded)`
  );
  const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyloadBackground = entry.target;
        if (lazyloadBackground) {
          lazyloadBackground.classList.add('e-lazyloaded');
        }
        lazyloadBackgroundObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px 0px 200px 0px' });

  lazyloadBackgrounds.forEach((lazyloadBackground) => {
    lazyloadBackgroundObserver.observe(lazyloadBackground);
  });
};

const events = ['DOMContentLoaded', 'elementor/lazyload/observe'];
events.forEach((event) => {
  document.addEventListener(event, lazyloadRunObserver);
});
```

### Prefetch Configuration (Speculative Loading)

```json
{
  "prefetch": [{
    "source": "document",
    "where": {
      "and": [
        { "href_matches": "/*" },
        { "not": { "href_matches": [
          "/wp-*.php", "/wp-admin/*", "/wp-content/uploads/*",
          "/wp-content/*", "/wp-content/plugins/*",
          "/wp-content/themes/hello-elementor/*", "/*\\?(.+)"
        ]}},
        { "not": { "selector_matches": "a[rel~=\"nofollow\"]" }},
        { "not": { "selector_matches": ".no-prefetch, .no-prefetch a" }}
      ]
    },
    "eagerness": "conservative"
  }]
}
```

### Google Consent Configuration

```javascript
window._googlesitekitConsentCategoryMap = {
  "statistics": ["analytics_storage"],
  "marketing": ["ad_storage", "ad_user_data", "ad_personalization"],
  "functional": ["functionality_storage", "security_storage"],
  "preferences": ["personalization_storage"]
};
```

---

## 7. Image/Asset Optimization

```css
/* Lazy-loaded images with intrinsic size hints */
img[sizes=auto i],
img[sizes^="auto," i] {
  contain-intrinsic-size: 3000px 1500px;
}
```

### Image Assets Referenced

```
-- Hero: marketing_inteligente_para_negocios_lendarios_-scaled.webp
-- Menu logo: agencia_lendaria_menu.webp
-- Service images: 1.webp through 9.webp
-- Testimonials: CONTRASs.jpg, gi.jpg, gui.jpg, mentos.jpg
```

---

## 8. Unique Techniques

### For Reis IA Consideration

| Technique | Value | Priority |
|-----------|-------|----------|
| 6-tier Elementor breakpoint system | 0/480/768/1025/1440/1600 | LOW -- Reis IA uses Tailwind breakpoints |
| IntersectionObserver lazy loading | rootMargin: 200px for early trigger | MEDIUM -- performance pattern |
| Speculative prefetch rules | conservative eagerness | LOW -- Astro handles this |
| WordPress shadow presets | 5 shadow levels | LOW -- values are basic |

### Limitations

This site is a standard WordPress/Elementor build with no custom animations, no scroll-triggered effects, and no unique visual techniques beyond Elementor's default capabilities. The visual styling is primarily managed through Elementor's visual editor, meaning:

- No custom CSS keyframes
- No custom JavaScript animations
- No design tokens beyond WordPress defaults
- No hover micro-interactions beyond Elementor defaults
- No custom easing curves

The site serves as a functional marketing page but lacks the technical sophistication of the other reference sites in the catalog.

---

## 9. Contact Information

- **WhatsApp**: +55 41 3063-1963
- **Location**: Av. Candido de Abreu, 526 -- Curitiba PR -- Brasil
- **Social**: Instagram @agencia.lendaria
