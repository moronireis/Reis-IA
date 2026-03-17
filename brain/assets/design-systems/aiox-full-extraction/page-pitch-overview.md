# AIOX — Pitch Overview / Investor Data Room
URL: https://brand.aioxsquad.ai/pitch-deck/pitch-overview

## Page Purpose
Executive layer for presenting thesis, operation, product, and structure. Investor Data Room within the brandbook shell.

## Content Structure
1. **Header** — "AIOX SQUAD | INVESTOR DATA ROOM | V0.1 // DARK COCKPIT EDITION"
2. **Title** — "Investor Data Room"
3. **Description** — "Camada executiva para apresentar tese, operacao, produto e estrutura da Synkra AIOX"
4. **Data Room Snapshot** — Sections: 15, Access: Open, Shell: Brandbook, Status: Online
5. **Section Map (15 items)** — Executive Summary, Business Plan, Product Demo, AI Technology, Finance, Growth Strategy, Go-to-Market, Competitive Analysis, Roadmap, Team, Culture Deck, Fundraising, Cap Table, Investor Updates, Pitch Overview

## CSS Patterns
```css
/* Key classes */
.guidelines-panel
.pattern-crosshair-grid--tight
min-h-screen bg-[var(--bb-dark)] px-4 pb-16 pt-24
max-w-3xl, max-w-sm, max-w-6xl, max-w-[1440px]
grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-5
font-mono uppercase tracking-[0.1em] text-[var(--bb-lime)]
```

## Navigation Context
- Position: Pitch Deck > Pitch Overview
- Separate section from Brandbook in nav hierarchy

## Key Design Decisions
- Uses crosshair-grid-tight pattern background
- Grid layout for 15 section cards
- Responsive columns: 2 → 3 → 5
- Fluid heading: clamp(2.4rem, 7vw, 6rem)
