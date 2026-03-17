# Agencia Lendaria Design System Reference (Minimal)

Last updated: 2026-03-17

Extracted from agencialendaria.com.br. This is a **minimal reference document**. Agencia Lendaria is a standard WordPress/Elementor marketing site for a Brazilian digital marketing agency. It lacks the technical sophistication of other references in this catalog (no custom animations, no scroll-triggered effects, no unique visual techniques beyond Elementor defaults). Documented primarily for completeness.

---

## 1. Site Architecture

- **CMS:** WordPress
- **Page Builder:** Elementor
- **Analytics:** Google Analytics GA4 (`GT-578BXKCQ`), Google Ads (`AW-987730703`), GTM (`GTM-PCKT39N9`)
- **Auth:** Google Sign-in via Site Kit
- **Language:** Portuguese (Brazil)

---

## 2. Page Structure

```
Header / Navigation
  -- Logo: agencia_lendaria_menu.webp
  -- Nav: Home, Guia Instagram 2026, Fale Conosco (WhatsApp)

Hero Section
  -- Background image + headline about AI dominating the market

Services Grid (6 sections)
  -- Gestao de Trafego, Social Media, Criativos e Videos
  -- Automacoes e CRM, Websites, Lancamentos

Delivery Models Section (4 options)
  -- Time Compartilhado, Os Lendarios, Agentes de I.A., Projetos Pontuais

Testimonials (4 client images)

Contact Form (Nome, E-mail, Whatsapp)

WhatsApp CTA (+55 41 3063-1963)

Footer (Instagram @agencia.lendaria, Curitiba PR)
```

---

## 3. CSS Design Tokens (WordPress + Elementor Defaults)

### Color Palette

```css
--wp--preset--color--black: #000000;
--wp--preset--color--white: #ffffff;
--wp--preset--color--cyan-bluish-gray: #abb8c3;
--wp--preset--color--vivid-red: #cf2e2e;
--wp--preset--color--luminous-vivid-orange: #ff6900;
--wp--preset--color--luminous-vivid-amber: #fcb900;
--wp--preset--color--vivid-green-cyan: #00d084;
--wp--preset--color--vivid-cyan-blue: #0693e3;
--wp--preset--color--vivid-purple: #9b51e0;
```

### Font Sizes

```css
--wp--preset--font-size--small: 13px;
--wp--preset--font-size--medium: 20px;
--wp--preset--font-size--large: 36px;
--wp--preset--font-size--x-large: 42px;
```

### Spacing Scale

```css
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

---

## 4. Layout System

```css
/* Flow layout */
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
```

### Responsive Breakpoints (Elementor)

```css
@media (max-width: 1600px) { /* xxl */ }
@media (max-width: 1440px) { /* xl */ }
@media (max-width: 1025px) { /* lg -- tablet landscape */ }
@media (max-width: 768px)  { /* md -- tablet portrait */ }
@media (max-width: 480px)  { /* sm -- mobile landscape */ }
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
```

### Speculative Prefetch Configuration

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

---

## 7. Reis IA Relevance Assessment

### Applicable Patterns

| Technique | Priority | Notes |
|-----------|----------|-------|
| IntersectionObserver lazy loading with 200px rootMargin | LOW | Performance pattern, Astro handles this natively |
| Speculative prefetch rules | LOW | Astro handles this |
| 6-tier breakpoint system | LOW | Reis IA uses Tailwind breakpoints |

### Limitations

This site has:
- No custom CSS keyframes
- No custom JavaScript animations
- No design tokens beyond WordPress defaults
- No hover micro-interactions beyond Elementor defaults
- No custom easing curves

The site serves as a functional marketing page but lacks the technical sophistication of the other reference sites in the catalog. It is documented primarily as a baseline/floor for Brazilian agency sites.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-17 | Initial reference created from source code extraction. Standard WordPress/Elementor site with minimal custom design patterns. |
