# Brandbook Structure Template — Reis IA

> Template for the unified brandbook document. Used by brand-site-builder to organize documentation.
> Each section maps to a page (or page group) in the interactive brandbook site.
> Source material comes from brain/assets/branding/ + brain/assets/design-systems/

---

## PART I: BRAND SOUL (Strategy Layer)

### 1. Brand Story
- Origin narrative (why Reis IA exists)
- The problem we saw (AI Prototype Graveyard, time waste)
- The philosophy ("O Tempo e Rei")
- Where we're going
- Source: `brain/assets/branding/company-reis-ia-concept.md`

### 2. Brand Architecture
- Master brand: Reis IA
- Sub-brands: Builders (community), Systems (services), Moroni Reis (personal)
- How they relate (endorsed brand model)
- When to use which brand
- Visual hierarchy rules
- Source: `brain/assets/branding/company-reis-ia-concept.md` (Section 7)

### 3. Positioning
- Category: "AI Revenue Ecosystem"
- Unique mechanism: Revenue-First AI Framework
- Competitive positioning map
- The enemy: AI Prototype Graveyard
- Big idea: "AI is not a technology project. It is a revenue strategy."
- Source: `brain/strategy/positioning.md`

### 4. Brand Values & Personality
- Core values with behavioral definitions
- Brand personality traits
- Kapferer's Brand Identity Prism (6 facets)
- Source: `brain/assets/branding/company-reis-ia-concept.md` (Sections 3-6)

### 5. Voice & Tone
- Voice identity (5 adjectives)
- Tone spectrum per channel (table)
- Vocabulary: USE / NEVER USE lists
- PT-BR specific rules
- The identity test
- Voice profiles system (how agents load context-specific voice)
- Source: `brain/messaging/brand-voice.md` + `.claude/rules/brand-voice.md` + `.claude/voice-profiles/`

### 6. Audience
- ICP definitions (who we serve)
- Awareness levels
- Pain/desire/objection mapping
- How we speak to each segment
- Source: `brain/strategy/icp.md` + `brain/research/audience/`

---

## PART II: VISUAL IDENTITY (Design Layer)

### 7. Logo & Brand Marks
- Wordmark: "REIS [IA]" — "REIS" white, "[IA]" blue, weight 300
- H1-B Hourglass (primary symbol — TIME)
- Z7 Symbol (secondary symbol — TRANSFORMATION)
- Favicon specifications
- Clear space rules
- Prohibited uses
- Size minimums
- Source: Brand mark assets + `brain/assets/design-systems/reis-ia-design-system.md`

### 8. Color System
- Primary palette: Black (#000000), White (#FFFFFF), Blue (#4A90FF)
- Sub-brand color layers:
  - Builders: Electric Blue (#2D7AFF) + Cyan (#00B4FF)
  - Systems: Black/White dominant + minimal blue
  - Moroni Reis: Soft Blue (#6AADFF)
- Surface tiers (5 levels: ground → peak)
- Blue accent opacity ladder
- Prohibited colors (gold, amber, terracotta)
- Dark mode only — no light mode
- Source: `brain/assets/design-systems/reis-ia-design-system.md` (Color System section)

### 9. Typography
- Primary: Inter (all weights 300-700)
- Type scale (H1 48-72px → microcopy 12-13px)
- Fluid sizing with clamp()
- Line heights and letter spacing
- Heading hierarchy
- Source: `brain/assets/design-systems/reis-ia-design-system.md` (Typography section)

### 10. Spacing & Layout
- Section spacing scale (8 fluid tokens)
- Component spacing scale (numeric: 12-40px)
- Grid: 12-col desktop, 4-col mobile
- Max content width: 1200px
- Container padding rules
- Responsive breakpoints (375px → 1280px+)
- Source: `brain/assets/design-systems/reis-ia-design-system.md` (Spacing + Layout sections)

### 11. Surfaces & Elevation
- 5-tier surface system (ground → peak)
- Shadow system (ambient glow, grain)
- Border treatments (gradient borders, glow)
- Glass/blur effects
- Card elevation patterns
- Source: `brain/assets/design-systems/reis-ia-design-system.md` (Surfaces section)

### 12. Iconography
- 32-icon system (minimal geometric line art)
- Agent-specific icons
- H1-B Hourglass variations
- Z7 Symbol variations
- Icon sizing and spacing rules
- No emojis — ever
- Source: Logo brand mark designer outputs

---

## PART III: MOTION & INTERACTION (Experience Layer)

### 13. Motion Principles
- Design system easing curves (base, out, in, dramatic, card, spring)
- Duration scale
- Scroll-triggered animation patterns
- Page transition patterns
- Loading states
- Source: `brain/assets/design-systems/reis-ia-design-system.md` (Motion section)

### 14. Micro-Interactions
- Button hover/active states
- Card hover effects
- Link transitions
- Form input feedback
- CTA attention patterns
- Source: `.claude/skills/interactive-ui.md` + creative-direction-brief.md

### 15. VFX & Background Effects
- Particle systems
- Gradient backgrounds (mesh, aurora, ambient pool)
- Grain/noise textures
- Parallax patterns
- Hardware-adaptive rendering tiers
- Source: `.claude/skills/visual-backgrounds.md` + creative-direction-brief.md

### 16. Accessibility & Performance
- prefers-reduced-motion compliance
- WCAG 2.1 AA compliance
- 60fps performance targets
- Hardware-adaptive degradation (full → reduced → minimal)
- Semantic HTML requirements
- Source: Design system + VFX agent specs

---

## PART IV: COMPONENTS (Implementation Layer)

### 17. Buttons
- Primary, secondary, ghost, text variants
- Size scale (sm, md, lg)
- States (default, hover, active, disabled, loading)
- CTA variants (/agendar, /aplicar)
- Source: Design system component specs

### 18. Cards
- Content cards, feature cards, testimonial cards
- Elevation and hover behavior
- Responsive behavior
- Source: Design system component specs

### 19. Forms & Inputs
- Text inputs, textareas, selects
- Validation states
- Label and helper text patterns
- Source: Design system component specs

### 20. Navigation
- Header/navbar patterns
- Mobile navigation
- Footer structure
- Breadcrumbs and section navigation
- Source: Design system component specs

### 21. Sections & Layouts
- Hero section patterns
- Feature grid layouts
- CTA section patterns
- Testimonial layouts
- Footer variations
- Source: Design system component specs

---

## PART V: APPLICATION (Usage Layer)

### 22. Page Templates
- Home page layout
- Sales page layout
- Service page layout
- About/bio page layout
- Landing page layout
- Source: Design specs + implemented pages

### 23. Social Media Templates
- LinkedIn post formatting
- Instagram visual direction
- YouTube thumbnail direction
- Source: Brand voice + visual identity specs

### 24. Email Templates
- Welcome sequence visual direction
- Newsletter formatting
- Transactional email styling
- Source: TBD (Phase 2)

### 25. Do's and Don'ts
- Visual do's and don'ts with examples
- Copy do's and don'ts with before/after
- Common mistakes and how to avoid them
- Source: All brand rules consolidated

---

## PART VI: BRAND LAYERS (Sub-Brand Specifics)

### 26. Builders / Time Builders
- Layer-specific design system tokens
- Movement visual language
- Community content patterns
- Z7 program branding
- Source: `brain/assets/design-systems/ds-time-builders.md` + movement concept

### 27. Systems
- Layer-specific design system tokens
- Enterprise/service visual language
- Case study templates
- Proposal visual direction
- Source: `brain/assets/design-systems/ds-systems.md` + company concept

### 28. Moroni Reis (Personal Brand)
- Layer-specific design system tokens
- Personal content visual direction
- Photography and video direction
- Source: `brain/assets/design-systems/ds-moroni-reis.md` + personal concept

---

## PART VII: GOVERNANCE (Maintenance Layer)

### 29. Brand Audit Methodology
- 6-section audit checklist
- PASS/BLOCK scoring
- Remediation workflow
- Source: `.claude/rules/brand-audit-checklist.md`

### 30. Version History & Changelog
- Design system version tracking
- Brand concept revision history
- Token change log
