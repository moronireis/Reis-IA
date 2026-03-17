# AIOX — Home / Index Page
URL: https://brand.aioxsquad.ai/

## Page Purpose
Main landing page for the AIOX Design System & Brandbook. Introduces the system, its 4 pillars, key stats, and navigation entry points.

## Content Structure
1. **Hero Section [00]** — Full-screen hero with massive AIOX watermark, section label "[00] Design System & Brand Identity", headline "The [AIOX] brand design system.", description, and CTA button "Abrir Guidelines"
2. **4 Pillars Section** — Grid of 4 interactive cards: Guidelines, Foundations, Components, Patterns
3. **System Overview [02]** — Bento grid with stats: 60+ components, 27 pages, 100% dark cockpit coverage
4. **Explore Section [03]** — Data visualization component (AioxDataViz) with 4 categories
5. **FAQ Section [05]** — 5 accordion questions about the design system
6. **Footer [06]** — Full sitemap footer with all brandbook, design system, showcase, and social links

## HTML Structure
```html
<html lang="en" class="dark">
<body class="__variable_245d8d __variable_97c177 antialiased dark">
  <main class="flex min-h-screen flex-col w-full bg-bg-surface">
    <header variant="brandbook"></header>

    <!-- Hero: full-screen, relative positioning -->
    <section class="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-bb-surface text-bb-cream pt-[80px] sm:pt-[60px]">
      <!-- Giant AIOX watermark -->
      <div class="absolute top-[45%] md:top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(60px,20vw,388px)] font-extrabold tracking-[-0.05em] leading-[0.68] text-gray-charcoal opacity-20 z-0 pointer-events-none whitespace-nowrap">AIOX</div>

      <!-- 4-column grid overlay (desktop only) -->
      <div class="absolute top-0 left-0 w-full h-full hidden sm:grid grid-cols-4 pointer-events-none z-elevated">
        <div class="border-l border-bb-border h-full"></div>
        <div class="border-l border-bb-border h-full"></div>
        <div class="border-l border-bb-border h-full"></div>
        <div class="border-l border-r border-bb-border h-full"></div>
      </div>

      <!-- Content container -->
      <div class="relative z-10 flex flex-col max-w-[1200px] w-full px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-24 mx-auto mt-4 sm:mt-8 md:mt-16">
        <!-- Section label -->
        <div class="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[-0.05em]">
          <span class="text-bb-cream">[00]</span>
          <span class="text-bb-lime">Design System & Brand Identity</span>
          <span class="text-bb-cream ml-1 sm:ml-2 animate-pulse">_</span>
        </div>

        <!-- Headline -->
        <h1 class="font-display text-[clamp(2rem,8vw,6.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] mb-6 md:mb-8 max-w-[1000px] text-bb-cream">
          The <span class="text-bb-lime">[AIOX]</span> brand<br>design system.
        </h1>

        <!-- Description -->
        <p class="font-mono text-[clamp(0.9rem,1.5vw,1.25rem)] leading-relaxed text-bb-muted max-w-[600px] mb-8 md:mb-12">
          <strong class="text-bb-cream font-medium">Single source of truth</strong> para identidade visual, componentes UI, padroes de design, motion e a voz do movimento AIOX.
        </p>

        <!-- CTA Button -->
        <a href="/brandbook/guidelines" class="inline-flex items-center bg-bb-ink border border-bb-border-strong px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-bb-cream font-mono text-sm md:text-base font-medium relative overflow-hidden hover:bg-bb-cream hover:text-bb-surface hover:border-bb-cream transition-all duration-300 w-fit cursor-pointer group">
          Abrir Guidelines
          <!-- Dot grid icon -->
        </a>
      </div>
    </section>

    <!-- 4 Pillars: grid of interactive reveal cards -->
    <section class="w-full bg-bb-surface text-bb-cream py-8 sm:py-12 px-4 sm:px-6 md:py-16 flex flex-col items-center border-b border-bb-border">
      <div class="w-full max-w-[1200px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 border-r border-bb-border">
        <!-- Each card: dual-state reveal on hover using translate-y and opacity -->
      </div>
    </section>

    <!-- System Overview: 12-column bento grid -->
    <section class="w-full min-h-screen bg-bb-surface text-bb-cream py-10 px-4 sm:px-6 md:px-8 md:py-16 flex items-center justify-center overflow-hidden">
      <div class="max-w-[1200px] w-full mx-auto">
        <div class="grid grid-cols-12 auto-rows-[minmax(240px,auto)] sm:auto-rows-[minmax(300px,auto)] gap-[1px] bg-bb-border border border-bb-border">
          <!-- Card: 60+ components (col-span-12 md:col-span-6 lg:col-span-4) -->
          <!-- Card: 27 pages -->
          <!-- Card: 100% dark cockpit -->
        </div>
      </div>
    </section>
  </main>
</body>
</html>
```

## CSS Patterns
- **Max content width**: 1200px
- **Container padding**: px-4 sm:px-6 md:px-8 lg:px-16
- **Section padding**: py-8 sm:py-12 md:py-16
- **Typography**: clamp() for fluid sizing, font-display for headlines, font-mono for labels
- **Color tokens**: bb-surface (bg), bb-cream (text), bb-lime (accent), bb-muted (secondary text)
- **Hover animation**: cubic-bezier(0.16, 1, 0.3, 1) for pillar card reveals
- **Bento grid**: 12-column with 1px gap (bg-bb-border creates hairline dividers)
- **Watermark pattern**: Oversized text at 20% opacity, centered with translate

## JavaScript Interactions
- **animate-pulse** on cursor indicator (CSS animation)
- **group-hover** states for dual-panel card reveal (translate-y + opacity)
- **scale-x-0 to scale-x-100** on hover for bottom accent line on bento cards
- **React components**: Header, AioxDataViz, FAQSection, Footer (all server-rendered)
- **Framework**: Next.js 14+ with React Server Components

## Components Used
- `<Header variant="brandbook">` — site header
- `<AioxDataViz>` — data visualization component
- `<FAQSection>` — accordion FAQ
- `<Footer variant="brandbook">` — full sitemap footer

## Navigation Context
- This is the root page at `/`
- Links to: `/brandbook/guidelines` (primary CTA), `/brandbook/foundations`, `/brandbook/components`, `/brandbook/patterns`
- Footer contains complete sitemap linking all 40+ pages

## Key Design Decisions
- Full-screen hero with architectural grid overlay (4-column vertical lines)
- Giant watermark text creates depth layering
- Bento grid for stats uses 1px gap technique (bg-bb-border on parent, bg-bb-surface on children)
- All typography fluid via clamp() — no hard breakpoint jumps
- Cards use dual-panel reveal: content slides up, hover state slides in from below
- Bottom accent line animates on hover (scale-x from left origin)
- Dark cockpit aesthetic: near-black backgrounds, lime (#D1FF00) accent, cream text
