# Page Design Specification -- Home Page (Reis IA)

Last updated: March 2026

> **Owner**: designer-agent
> **Status**: Complete
> **Consumed by**: dev-agent
> **Copy source**: `brain/assets/copy/website-main.md`
> **Brand reference**: `brain/assets/brand-identity.md`

---

## TABLE OF CONTENTS

1. [Page Overview](#1-page-overview)
2. [Navigation](#2-navigation)
3. [Section 1 -- Hero](#3-section-1----hero)
4. [Section 2 -- Manifesto](#4-section-2----manifesto)
5. [Section 3 -- Ecosystem Pillars](#5-section-3----ecosystem-pillars)
6. [Section 4 -- Interactive Demo](#6-section-4----interactive-demo)
7. [Section 5 -- Results / Social Proof](#7-section-5----results--social-proof)
8. [Section 6 -- Founder Story](#8-section-6----founder-story)
9. [Section 7 -- Offer Paths / CTA Router](#9-section-7----offer-paths--cta-router)
10. [Section 8 -- Footer CTA](#10-section-8----footer-cta)
11. [Footer](#11-footer)
12. [Hourglass / Chess Placement Map](#12-hourglass--chess-placement-map)
13. [CTA Strategy](#13-cta-strategy)
14. [Mobile-First Notes](#14-mobile-first-notes)

---

## 1. PAGE OVERVIEW

**Page purpose**: The home page is the front door of the Reis IA ecosystem. It establishes brand authority, names the enemy (Prototype Graveyard), introduces all four pillars, provides social proof, tells the founder story, and routes visitors to the right entry point.

**Estimated section count**: 8 content sections + navigation + footer = 10 total blocks.

**Page flow narrative**:
1. **Hero** -- Bold thesis. Immediate positioning. "We are different."
2. **Manifesto** -- Deepens the belief. Creates emotional and intellectual alignment.
3. **Ecosystem Pillars** -- Shows the breadth of the ecosystem. Visitor self-identifies which path fits.
4. **Interactive Demo** -- Proof through experience. "Don't take our word -- see it."
5. **Results / Social Proof** -- Numbers and stories. Third-party validation.
6. **Founder Story** -- Human anchor. Trust through transparency and origin story.
7. **Offer Paths** -- Decision architecture. "Pick your starting point."
8. **Footer CTA** -- Final urgency push. Last chance before they leave.

**Background layer strategy**: Alternate between `bg-black` (#000000) and `bg-neutral-950` (#0A0A0A) per section to create implicit visual separation:
- Hero: `bg-black`
- Manifesto: `bg-neutral-950`
- Pillars: `bg-black`
- Demo: `bg-neutral-950`
- Results: `bg-black`
- Founder: `bg-neutral-950`
- Offer Paths: `bg-black`
- Footer CTA: `bg-neutral-950`

---

## 2. NAVIGATION

**Reference**: Brand identity Section 6D.

**Behavior**:
- Fixed to top of viewport, `z-50`.
- Background: `bg-black/80 backdrop-blur-md`.
- Height: 72px desktop, 64px mobile.
- Border bottom: `border-b border-neutral-850`.

**Content (desktop)**:
- **Left**: "Reis IA" wordmark, 20px, font-weight 700, white. No logo mark at launch -- text only.
- **Center-right**: Nav links: Builder | Systems | Partners | Network | About. Text: 14px, font-weight 500, `text-neutral-400`. Hover: `text-white`. Active: `text-white` with 2px bottom border in accent gold, offset 4px below text.
- **Far right**: Small primary CTA button: "Book a Call". 14px, padding 10px 20px, `bg-accent text-black rounded-md`.

**Content (mobile)**:
- **Left**: "Reis IA" wordmark.
- **Right**: Hamburger icon (three lines, 24px, white).
- **Menu overlay**: Full-screen `bg-black/95 backdrop-blur-lg`. Links stacked vertically, centered. Each link 24px, font-weight 600, white, 24px spacing. CTA button at bottom, full-width primary button. Close icon (X) top right, 24px.

**Scroll behavior**: Nav remains fixed. Background gains opacity as user scrolls (starts at 80% opacity, already sufficient). Border bottom provides the visual anchor.

---

## 3. SECTION 1 -- HERO

### Purpose
First impression. Communicate the core thesis in under 3 seconds. Drive to primary CTA.

### Layout
- **Type**: Full-width, centered content.
- **Background**: `bg-black` (#000000).
- **Decorative**: Chess knight silhouette positioned absolute right, 5% opacity. Subtle radial gradient glow behind headline area (accent gold at 3-5% opacity, 500px radius, centered on headline).

### Content and Placement

**Desktop (1280px+)**:

```
[128px top padding -- accounts for fixed nav]

[BADGE]                                        [CHESS KNIGHT: 200px, 5% opacity,
"THE AI REVENUE ECOSYSTEM"                      absolute right 5%, vertically centered,
                                                pointer-events-none]
[16px gap]

[HEADLINE -- Display: 72px, 700, white, -0.03em tracking]
"AI Is Not a Technology Project.
 It's a Revenue Strategy."
[max-width: 800px]

[24px gap]

[SUBHEADLINE -- Body Large: 20px, 400, neutral-400, line-height 1.7]
"Reis IA builds AI systems that generate revenue, trains agencies
 to sell AI solutions, and creates the partnerships that scale it all
 -- through one connected ecosystem."
[max-width: 600px]

[40px gap]

[CTA CLUSTER -- inline-flex, gap 16px]
[PRIMARY: "Book a Free AI Revenue Assessment" -- Hero CTA variant, bg-accent, 18px, px-10 py-5, rounded-lg]
[SECONDARY: "See How It Works -->" -- Secondary button, border border-neutral-700, 18px, px-10 py-5]

[12px gap]

[MICROCOPY -- 12px, neutral-500]
"No pitch. No fluff. 30 minutes, a clear map of where AI makes money in your business."

[96px bottom padding]
```

**Copy decision**: Using Headline Option A (recommended primary) as it best communicates the brand thesis. The chess-motif headline Option E ("AI without strategy is just noise. Revenue-First is playing chess.") is strong but better served by the visual chess knight than by putting "chess" in the first headline a visitor reads.

### Typography Specs

| Element | Size | Weight | Color | Tailwind |
|---------|------|--------|-------|----------|
| Badge | 12px | 600 | accent `#C9A84C` | `text-xs font-semibold tracking-widest uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded` |
| Headline | 72px | 700 | white | `text-7xl font-bold leading-none tracking-tighter text-white` |
| Subheadline | 20px | 400 | neutral-400 | `text-xl font-normal leading-relaxed text-neutral-400` |
| CTA Primary | 18px | 600 | black on accent | `text-lg font-semibold bg-accent text-black px-10 py-5 rounded-lg` |
| CTA Secondary | 18px | 600 | white, bordered | `text-lg font-semibold text-white border border-neutral-700 px-10 py-5 rounded-lg` |
| Microcopy | 12px | 400 | neutral-500 | `text-xs text-neutral-500` |

### Decorative Elements
- **Chess knight**: Positioned `absolute right-[5%] top-1/2 -translate-y-1/2`. Width 200px. Opacity 5-8%. Color: white. `pointer-events-none`. Hidden on mobile (`hidden lg:block`).
- **Radial glow**: `radial-gradient(ellipse at 30% 50%, rgba(201, 168, 76, 0.04) 0%, transparent 70%)` applied as a pseudo-element behind the headline area.
- **Optional scroll indicator**: Chevron-down at bottom center, 20px, neutral-500, gentle bounce animation (8px, 2s loop). Fades on scroll.

### Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| Mobile (375px) | Headline 40px, centered. Subheadline 18px, centered. CTAs stacked vertically, full width, primary on top. Badge centered. Chess knight hidden. Padding: 96px top, 64px bottom. |
| Tablet (768px) | Headline 56px, left-aligned. Subheadline 18px. CTAs side-by-side if space allows, otherwise stacked. Chess knight hidden. |
| Desktop (1280px+) | Full spec as above. |

---

## 4. SECTION 2 -- MANIFESTO

### Purpose
Deepen the brand thesis. Build emotional and intellectual alignment. This is a belief statement -- it separates "our people" from everyone else.

### Layout
- **Type**: Full-width, centered text block. Typographic section -- no images, no cards.
- **Background**: `bg-neutral-950` (#0A0A0A).
- **Content max width**: 720px (tighter than standard -- for manifesto readability, target ~60 chars per line).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- Label: 13px, uppercase, tracking-widest, neutral-500]
"WHAT WE BELIEVE"

[24px gap]

[HEADLINE -- H2: 42px, 600, white, -0.01em tracking]
"We believe most companies are failing with AI -- not because the
 technology doesn't work, but because they're asking the wrong question."

[40px gap]

[BODY TEXT -- Body: 17px, 400, neutral-300, line-height 1.7]
[Full manifesto body copy from website-main.md Section 2]
[Each paragraph separated by 24px]

[Chess motif variation -- insert after "We start differently.":
 "Winning with AI is not about moving first. It's about moving right.
  A chess player doesn't place pieces randomly and hope for checkmate..."]

[BOLD CLOSING STATEMENT -- 20px, 600, white]
"AI for the sake of AI is a science experiment.
 AI for revenue is a business strategy."

[17px, 400, neutral-400]
"That's the only kind we build."

[96px bottom padding]
```

**Copy decision**: Using the chess motif manifesto variation (ADDED 2026-03-11) inserted after "We start differently." This is the natural home for the chess narrative in the manifesto and it strengthens the belief statement without overwhelming the original.

### Typography Specs

| Element | Size | Weight | Color | Line-height | Max-width |
|---------|------|--------|-------|-------------|-----------|
| Section label | 13px | 600 | neutral-500 | 1.4 | -- |
| Headline | 42px | 600 | white | 1.2 | 720px |
| Body paragraphs | 17px | 400 | neutral-300 | 1.7 | 720px |
| Bold closing | 20px | 600 | white | 1.4 | 720px |
| Final line | 17px | 400 | neutral-400 | 1.7 | 720px |

### Decorative Elements
- **None visible**. This section is pure typography. The chess motif is embedded in the copy, not as a visual icon. The restraint is intentional -- the words carry the weight.
- **Background**: Solid `#0A0A0A`. No patterns, no gradients. Clean.

### Responsive Behavior
- Mobile: Headline drops to 28px. Body to 16px. Bold closing to 18px. All centered. Max-width natural (constrained by 20px side padding). Padding: 64px top and bottom.
- Tablet: Headline 36px. Body 17px. Centered.

---

## 5. SECTION 3 -- ECOSYSTEM PILLARS

### Purpose
Present the four pillars of the ecosystem. Allow the visitor to self-identify which path is relevant. Each card should be self-contained and lead to a CTA.

### Layout
- **Type**: Contained (1200px), 4-column grid.
- **Background**: `bg-black` (#000000).
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`.

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"THE ECOSYSTEM"

[16px gap]

[SECTION INTRO -- H2: 42px, 600, white, centered]
"One relationship. Four ways to win with AI."

[48px gap]

[4-COLUMN CARD GRID]

+---BUILDER CARD---+  +---SYSTEMS CARD---+  +--PARTNERS CARD--+  +---NETWORK CARD--+
|  [Chess Knight    |  |  [Hourglass      |  |  [Chess Knight   |  |  [No icon --     |
|   icon, 40px,     |  |   icon, 40px,    |  |   icon, 40px,    |  |   use a simple   |
|   accent gold]    |  |   accent gold]   |  |   accent gold]   |  |   grid/nodes     |
|                   |  |                  |  |                  |  |   icon, 40px,    |
|  "Build Your AI   |  |  "Deploy AI That |  |  "Sell AI Without|  |   accent gold]   |
|   Business"       |  |   Generates      |  |   Building It"   |  |                  |
|                   |  |   Revenue"       |  |                  |  |  "The AI Revenue |
|  [Body copy]      |  |  [Body copy]     |  |  [Body copy]     |  |   Community"     |
|  [4 bullets]      |  |  [4 bullets]     |  |  [3 bullets]     |  |  [Body copy]     |
|                   |  |                  |  |                  |  |  [4 bullets]     |
|  [Proof anchor]   |  |  [Proof anchor]  |  |  [Proof anchor]  |  |                  |
|                   |  |                  |  |                  |  |                  |
|  Apply to         |  |  Book an AI      |  |  Learn About     |  |  Join the        |
|  Builder -->      |  |  Revenue Audit   |  |  Partners -->    |  |  Network -->     |
|                   |  |  -->             |  |                  |  |                  |
+-------------------+  +------------------+  +------------------+  +------------------+
```

### Card Specifications

**Each card uses Standard Card from brand identity Section 6B:**
- Background: `bg-neutral-900` (#141414)
- Border: `border border-neutral-800` (#262626)
- Border radius: `rounded-lg` (8px)
- Padding: `p-8` (32px)
- Hover: `hover:border-neutral-700 hover:bg-neutral-850`
- Transition: `transition-colors duration-200`

**Internal card structure:**

| Element | Spec | Tailwind |
|---------|------|----------|
| Icon | 40px height, accent gold | `h-10 w-auto text-accent mb-6` |
| Card title | 24px, 600, white | `text-2xl font-semibold text-white mb-3` |
| Card body | 16px, 400, neutral-400 | `text-base text-neutral-400 mb-6` |
| Bullet list | 14px, 400, neutral-400, accent-colored bullets | `text-sm text-neutral-400 space-y-2 mb-6` |
| Proof anchor | 13px, 500, neutral-500 | `text-[13px] font-medium text-neutral-500 mb-6` |
| CTA | Ghost button -- neutral-400, hover white | `text-neutral-400 hover:text-white text-sm font-medium` |

**Icon assignments:**
- Builder: Chess knight (40px, accent gold). Rationale: Builder = strategy + positioning.
- Systems: Hourglass (40px, accent gold). Rationale: Systems = time savings + efficiency.
- Partners: Chess knight (40px, accent gold). Could alternatively use king for authority differentiation. Rationale: Partners = strategic partnership.
- Network: A minimal grid/nodes icon from Lucide (e.g., `Network` or `Users` icon). 40px, accent gold.

**Copy decisions:**
- Builder card: Using the chess-motif headline variation "Position Your Agency Ahead of the Market" (ADDED 2026-03-12) as it pairs naturally with the chess knight icon.
- Systems card: Using the hourglass proof anchor variation (ADDED 2026-03-11): "Fixed pricing. 60-day performance guarantee. And the one thing most vendors can't give you back: time."
- Partners card: Using the chess-motif variation "Add AI Revenue Without Adding Risk" (ADDED 2026-03-12).
- Network card: Original copy -- no motif variation needed (both motifs are covered by other cards).

### Scroll Reveal Animation
Cards should stagger in: each card fades up (`opacity 0 to 1, translateY 20px to 0`) with 100ms stagger between cards. Duration 600ms, easing `cubic-bezier(0.16, 1, 0.3, 1)`.

### Responsive Behavior
- Mobile (375px): Single column, full-width cards stacked. 16px gap between cards. Section padding: 64px top and bottom.
- Tablet (768px): 2-column grid, `md:grid-cols-2`. Cards pair: Builder/Systems top, Partners/Network bottom.
- Desktop (1280px+): 4-column grid as specified.

---

## 6. SECTION 4 -- INTERACTIVE DEMO

### Purpose
Show, don't tell. Provide tangible evidence of what Revenue-First AI looks like in production. This section bridges credibility and desire.

### Layout
- **Type**: Contained (1200px). 3-column card grid for demo cards.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"SEE IT WORKING"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"This is what Revenue-First AI looks like in production."

[16px gap]

[SUBHEADLINE -- Body Large: 20px, 400, neutral-400, centered, max-width 600px]
"Not mockups. Not demos. Real systems deployed in real businesses."

[48px gap]

[3-COLUMN DEMO CARD GRID -- grid grid-cols-1 md:grid-cols-3 gap-8]

+-----DEMO 1------+  +-----DEMO 2------+  +-----DEMO 3------+
|  [PLACEHOLDER:   |  |  [PLACEHOLDER:   |  |  [PLACEHOLDER:   |
|   Video/screen   |  |   Video/screen   |  |   Video/screen   |
|   recording      |  |   recording      |  |   recording      |
|   area, 16:9     |  |   area, 16:9     |  |   area, 16:9     |
|   ratio,         |  |   ratio,         |  |   ratio,         |
|   bg-neutral-900 |  |   bg-neutral-900 |  |   bg-neutral-900 |
|   with play      |  |   with play      |  |   with play      |
|   icon centered] |  |   icon centered] |  |   icon centered] |
|                  |  |                  |  |                  |
|  "An AI that     |  |  "A support      |  |  "From client    |
|   qualifies      |  |   agent that     |  |   brief to AI    |
|   leads before   |  |   resolves 70%   |  |   project        |
|   your sales     |  |   of tickets     |  |   proposal in    |
|   team touches   |  |   before a human |  |   under 10       |
|   them"          |  |   reads them"    |  |   minutes"       |
|                  |  |                  |  |                  |
|  [Brief desc,    |  |  [Brief desc,    |  |  [Brief desc,    |
|   14px,          |  |   14px,          |  |   14px,          |
|   neutral-500]   |  |   neutral-500]   |  |   neutral-500]   |
+------------------+  +------------------+  +------------------+

[48px gap]

[SECTION CTA -- centered]
"Want to see this built for your business?"
[PRIMARY CTA: "Book a Free AI Revenue Assessment -->" -- standard primary button]

[96px bottom padding]
```

### Demo Card Specifications

| Property | Value | Tailwind |
|----------|-------|----------|
| Card background | `#141414` | `bg-neutral-900` |
| Card border | `#262626` | `border border-neutral-800 rounded-lg` |
| Video placeholder | 16:9 aspect ratio, `bg-neutral-900` | `aspect-video bg-neutral-900 rounded-t-lg` |
| Play icon | Centered in placeholder, 48px, `#FFFFFF` at 40% opacity | `opacity-40` |
| Card title | 20px, 600, white | `text-xl font-semibold text-white p-6 pb-2` |
| Card description | 14px, 400, neutral-500, 2 lines max | `text-sm text-neutral-500 px-6 pb-6` |

**Placeholder image spec**: Each video area is a solid `#0A0A0A` rectangle with a centered triangular play icon (outline style, white at 40% opacity). Text overlay: "[PLACEHOLDER: 90-second screen recording of [specific demo name]]".

### Responsive Behavior
- Mobile: Single column, stacked. Cards full width.
- Tablet: 3-column grid maintained if space allows, otherwise 2-column with third card below.
- Desktop: 3-column as specified.

---

## 7. SECTION 5 -- RESULTS / SOCIAL PROOF

### Purpose
Third-party validation. Transform skepticism into belief through metrics, case studies, and market data. This is the "proof layer" that justifies the claims made above.

### Layout
- **Type**: Contained (1200px). Market data stats grid + alternating case study blocks.
- **Background**: `bg-black` (#000000).
- **Chess grid texture**: Applied as a very subtle background pattern (3% opacity) behind the market data stats block only. Fades at edges with gradient mask.

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"RESULTS"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
Using hourglass variation (ADDED 2026-03-12):
"Every month in the Prototype Graveyard is a month that doesn't come back.
 Here's what it looks like when companies escape it."

[48px gap]

[MARKET DATA STATS -- 4-column grid, centered]
+--------+--------+--------+--------+
|  91%   |  74%   |  67%   |  22%   |
| [stat] | [stat] | [stat] | [stat] |
+--------+--------+--------+--------+

[48px gap]

[CONTEXT LINE -- Body: 17px, neutral-400, centered, max-width 720px]
Using hourglass variation (ADDED 2026-03-12):
"The difference between those two numbers isn't technology. It's the time
 companies spend building the wrong thing first."

[64px gap]

[CASE STUDY BLOCK 1 -- alternating layout, metric-left / story-right]
[CASE STUDY BLOCK 2 -- alternating layout, story-left / metric-right]
[CASE STUDY BLOCK 3 -- alternating layout, metric-left / story-right]

[96px bottom padding]
```

### Market Data Stats Specifications

Uses the Market Data / Stats Block from brand identity Section 6L.

| Property | Spec | Tailwind |
|----------|------|----------|
| Layout | 4-column grid desktop, 2x2 tablet, stacked mobile | `grid grid-cols-2 lg:grid-cols-4 gap-8` |
| Stat value | 56px desktop, 40px mobile, 700, white | `text-[56px] lg:text-[56px] text-[40px] font-bold text-white` |
| Stat label | 14px, uppercase, tracking-widest, neutral-500 | `text-sm uppercase tracking-widest text-neutral-500 mt-2` |
| Stat context | 14px, neutral-400, 1-2 lines | `text-sm text-neutral-400 mt-1` |

**Stats to display:**
1. **91%** -- "of SMBs using AI report revenue increases"
2. **74%** -- "achieve ROI within year one"
3. **67%** -- "success rate for specialist vendors"
4. **22%** -- "success rate for generalists" (displayed in `text-neutral-500` to create contrast -- this is the "bad" number)

### Case Study Block Specifications

Uses Case Study / Proof Card from brand identity Section 6B.

**Layout**: Two-column split on desktop (7+5 grid or 6+6). Alternating sides per block.

| Property | Spec | Tailwind |
|----------|------|----------|
| Background | `bg-neutral-900` (#141414) | `bg-neutral-900 rounded-lg border border-neutral-800 p-8 lg:p-12` |
| Metric value | 48px, 700, accent gold | `text-[48px] font-bold text-accent` |
| Metric label | 13px, uppercase, neutral-500, tracking-widest | `text-[13px] uppercase tracking-widest text-neutral-500` |
| Company name | 20px, 600, white | `text-xl font-semibold text-white` |
| Story text | 16px, 400, neutral-300 | `text-base text-neutral-300 leading-relaxed` |
| Testimonial | 16px, italic, neutral-400, left accent border | See brand identity Section 6H |
| Spacing between blocks | 32px | `space-y-8` |

**All case study content is placeholder**. Display format:

```
[PLACEHOLDER: Case Study -- Agency AI Revenue Stream]
Metric: "[METRIC]" in large accent gold type
Company: "[Agency name] -- Digital Marketing Agency"
Text: "Situation / What we built / Result" structure
Testimonial: "[TESTIMONIAL -- placeholder quote text]"
```

### Decorative Elements
- **Hourglass icon**: Inline with the section headline, positioned as a small (24px) white icon at 40% opacity to the left of the word "month" in the headline. Subtle, not distracting.
- **Chess grid texture**: Very low opacity (3%) behind the market data stats block only. Applied as CSS background pattern with gradient mask fading at edges.

### Responsive Behavior
- Mobile: Stats 2x2 grid. Case study blocks stacked (metric on top, story below). Stat values 40px.
- Tablet: Stats 2x2. Case study blocks full-width stacked.
- Desktop: Stats 4-column. Case study blocks alternating split layout.

---

## 8. SECTION 6 -- FOUNDER STORY

### Purpose
Human connection. Build trust through the founder's personal narrative. Move from corporate credibility to personal authenticity. This is where the visitor connects with Moroni as a person.

### Layout
- **Type**: Contained (1200px). Two-column split: photo left, text right.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[TWO-COLUMN LAYOUT -- grid grid-cols-1 lg:grid-cols-12 gap-8]

+---PHOTO COLUMN (5 cols)---+  +---TEXT COLUMN (7 cols)------------------+
|                           |  |                                         |
|  [PLACEHOLDER: Photo of   |  |  [SECTION LABEL -- 13px, uppercase,     |
|   Moroni Reis.             |  |   tracking-widest, neutral-500]         |
|   Full-height container,   |  |  "WHY REIS IA EXISTS"                   |
|   min-height 500px.        |  |                                         |
|   bg-neutral-900.          |  |  [16px gap]                             |
|   Desaturated 30-40%,      |  |                                         |
|   slightly darkened.        |  |  [HEADLINE -- H2: 42px, 600, white]    |
|   Gradient overlay from    |  |  "I spent years watching companies      |
|   edges.                   |  |   waste money on AI that never worked." |
|   Rounded-lg.              |  |                                         |
|   Border neutral-800.]     |  |  [24px gap]                             |
|                           |  |                                         |
|                           |  |  [BODY -- 17px, 400, neutral-300,       |
|                           |  |   line-height 1.7, max-width 600px]     |
|                           |  |  [Full founder story body copy]         |
|                           |  |                                         |
|                           |  |  [Using hourglass variation closing:     |
|                           |  |   "There's one resource no AI system    |
|                           |  |   can manufacture... time."]             |
|                           |  |                                         |
|                           |  |  [32px gap]                             |
|                           |  |                                         |
|                           |  |  [SIGNATURE CTA CLUSTER]                |
|                           |  |  [PRIMARY: "Start with a free AI        |
|                           |  |   Revenue Assessment -->" -- primary btn]|
|                           |  |  [GHOST: "Or learn more about the       |
|                           |  |   Builder program -->" -- ghost btn]     |
|                           |  |                                         |
+---------------------------+  +-----------------------------------------+

[96px bottom padding]
```

**Copy decision**: Using the hourglass motif closing paragraph variation (ADDED 2026-03-11) which replaces the original "If that's you, you're in the right place" closer with the time-cost narrative. This is a natural placement for the hourglass theme and adds urgency to an otherwise reflective section.

### Photo Placeholder Spec

| Property | Spec | Tailwind |
|----------|------|----------|
| Container | 100% width of 5-col space, min-height 500px | `w-full min-h-[500px] lg:col-span-5` |
| Background | `#141414` | `bg-neutral-900 rounded-lg border border-neutral-800` |
| Placeholder text | Centered, 14px, neutral-500 | "[PLACEHOLDER: Professional photo of Moroni Reis. Dark/moody lighting. Desaturated. Gradient overlay from edges.]" |
| Image treatment (when available) | `filter grayscale(30%) brightness(0.85)` | Custom CSS filter |

### Decorative Elements
- **Hourglass icon**: Small (24px), accent gold, positioned inline at the start of the closing variation paragraph ("There's one resource no AI system can manufacture..."). Acts as a visual anchor for the time narrative.

### Responsive Behavior
- Mobile: Photo on top (full width, max-height 300px, `object-cover`), text below. All text centered. Padding: 64px top and bottom.
- Tablet: Same as mobile -- stacked layout.
- Desktop: Side-by-side as specified.

---

## 9. SECTION 7 -- OFFER PATHS / CTA ROUTER

### Purpose
Decision architecture. After the visitor has been convinced (hero + manifesto + proof + story), this section helps them choose their entry point. Three clear paths + a soft community option.

### Layout
- **Type**: Contained (1200px). 3-column card grid + community line below.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"YOUR STARTING POINT"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"One ecosystem. The right entry point for where you are right now."

[48px gap]

[3-COLUMN CARD GRID -- grid grid-cols-1 md:grid-cols-3 gap-8]

+-PATH 1: BUILDER--+  +-PATH 2: SYSTEMS--+  +-PATH 3: PARTNERS-+
|                  |  |                   |  |                   |
| [Label badge:    |  | [Label badge:     |  | [Label badge:     |
|  "FOR AGENCIES"] |  |  "FOR COMPANIES"] |  |  "FOR AGENCIES"]  |
|                  |  |                   |  |                   |
| [Chess Knight    |  | [Hourglass icon,  |  | [Chess Knight     |
|  icon, 32px,     |  |  32px, accent     |  |  icon, 32px,      |
|  accent gold]    |  |  gold]            |  |  accent gold]     |
|                  |  |                   |  |                   |
| [H3] "I want to |  | [H3] "I need AI   |  | [H3] "I want to   |
|  add AI to my    |  |  implemented in   |  |  partner with      |
|  agency"         |  |  my business"     |  |  Reis IA"          |
|                  |  |                   |  |                   |
| Reis IA Builder  |  | Reis IA Systems   |  | Reis IA Partners   |
|                  |  |                   |  |                   |
| [Description]    |  | [Description]     |  | [Description]      |
|                  |  |                   |  |                   |
| Investment:      |  | Projects from     |  | No upfront fee.    |
| $4,000-$15,000   |  | $2,000-$20,000    |  | Revenue-share.     |
|                  |  |                   |  |                   |
| [PRIMARY CTA:    |  | [PRIMARY CTA:     |  | [SECONDARY CTA:    |
|  "Apply Now -->"]|  |  "Book Your AI    |  |  "Learn About the  |
|                  |  |   Revenue Audit   |  |   Partners         |
|                  |  |   -->"]           |  |   Program -->"]    |
+------------------+  +-------------------+  +-------------------+

[32px gap]

[COMMUNITY LINE -- centered, 16px, neutral-400]
"Not ready for a program yet?"
[GHOST CTA: "Join the Reis IA Network -- free access to events, content,
 and a community of practitioners building with AI. -->"]

[96px bottom padding]
```

### Path Card Specifications

These are elevated Standard Cards with differentiation:

| Property | Spec | Tailwind |
|----------|------|----------|
| Background | `#141414` | `bg-neutral-900` |
| Border | `#262626`, hover `#404040` | `border border-neutral-800 hover:border-neutral-700` |
| Padding | 32px | `p-8` |
| Rounded | 8px | `rounded-lg` |
| Label badge | 12px, uppercase, accent/10 bg, accent text | See Section 6F badge spec |
| Icon | 32px, accent gold | `h-8 text-accent mt-4 mb-4` |
| Path title | 20px, 600, white | `text-xl font-semibold text-white mb-2` |
| Product name | 14px, 600, accent | `text-sm font-semibold text-accent mb-4` |
| Description | 15px, 400, neutral-400 | `text-[15px] text-neutral-400 mb-4` |
| Investment | 14px, 500, neutral-300 | `text-sm font-medium text-neutral-300 mb-6` |
| CTA | Primary button (Path 1 & 2), Secondary button (Path 3) | Per brand identity Section 6A |

**Differentiation**: Path 1 and Path 2 cards get a subtle accent border bottom (2px `border-b-2 border-accent/30`) to visually elevate them as the primary conversion paths.

### Responsive Behavior
- Mobile: Stacked, full-width cards. 16px gap.
- Tablet: Path 1 and Path 2 side-by-side, Path 3 centered below.
- Desktop: 3-column as specified.

---

## 10. SECTION 8 -- FOOTER CTA

### Purpose
Final urgency push. Last chance to convert before the visitor reaches the footer and leaves. Maximum urgency without manufactured pressure. Closes the page with the hourglass time-cost narrative.

### Layout
- **Type**: Full-width, centered text block.
- **Background**: `bg-neutral-950` (#0A0A0A).
- **Decorative**: Hourglass icon as a large (300px) background element at 3-5% opacity, centered behind the content.

### Content and Placement

**Desktop**:

```
[96px top padding]

                    [HOURGLASS: 300px, 3% opacity, absolute centered,
                     pointer-events-none, z-0]

[CONTENT z-10, relative]

[HEADLINE -- H2: 42px, 600, white, centered]
Using hourglass variation A (ADDED 2026-03-11):
"The real cost of waiting isn't money. It's time."

[24px gap]

[BODY -- Body Large: 20px, 400, neutral-400, centered, max-width 600px]
Using hourglass variation (ADDED 2026-03-11):
"Your competitors are compounding. Every AI system they deploy this month
 is working while you're still deciding. The window is open. Time moves
 whether you do or not."

[40px gap]

[PRIMARY CTA -- Hero variant: "Book a Free AI Revenue Assessment -->"
 bg-accent, 18px, px-10 py-5, rounded-lg, centered]

[12px gap]

[MICROCOPY -- 12px, neutral-500, centered]
Using hourglass variation (ADDED 2026-03-11):
"30 minutes now. A clear map of where AI makes money in your business.
 The one thing you can do today that your future self will thank you for."

[96px bottom padding]
```

**Copy decision**: Using hourglass headline variation A over variation B. "The real cost of waiting isn't money. It's time." is more punchy and universal. Variation B ("Every week without the right system...") is strong but better suited for the Systems page where the "system" language is more contextual.

### Decorative Elements
- **Hourglass**: 300px height, accent gold at 3-5% opacity. Absolutely positioned, centered horizontally and vertically within the section. `pointer-events-none`, `z-0`. Content sits at `z-10` above it.
- **Radial glow**: Subtle accent gold radial gradient (3% opacity, 400px radius) centered on the CTA button.

### Responsive Behavior
- Mobile: Headline 28px. Body 18px. CTA full-width. Hourglass hidden (too large for mobile viewport). Padding: 64px top and bottom.
- Tablet: Headline 36px. Hourglass at 200px, same opacity.
- Desktop: Full spec as above.

---

## 11. FOOTER

**Reference**: Brand identity Section 6E.

### Layout

```
[bg-neutral-950, border-t border-neutral-850]

[64px top padding]

[4-COLUMN LAYOUT -- grid grid-cols-1 md:grid-cols-4 gap-8, max-w-[1200px] centered]

+---BRAND COLUMN---+  +---NAV COLUMN 1---+  +---NAV COLUMN 2---+  +---SOCIAL/LEGAL---+
|                  |  |                   |  |                   |  |                   |
| Reis IA          |  | ECOSYSTEM         |  | RESOURCES         |  | CONNECT           |
| (20px, bold,     |  | (13px, uppercase,  |  | (13px, uppercase,  |  | (13px, uppercase,  |
|  white)          |  |  neutral-400)      |  |  neutral-400)      |  |  neutral-400)      |
|                  |  |                   |  |                   |  |                   |
| The AI Revenue   |  | Builder           |  | About              |  | LinkedIn           |
| Ecosystem        |  | Systems           |  | Case Studies       |  | YouTube            |
| (14px,           |  | Partners          |  | Blog               |  | Instagram          |
|  neutral-500)    |  | Network           |  | Contact            |  | Twitter/X          |
|                  |  |                   |  |                   |  |                   |
+------------------+  +-------------------+  +-------------------+  +-------------------+

[Gradient fade divider]

[32px padding]

[COPYRIGHT ROW -- flex justify-between]
"(c) 2026 Reis IA. All rights reserved."      "Privacy Policy | Terms"
[13px, neutral-500]                            [13px, neutral-500, hover white]

[32px bottom padding]
```

### Responsive Behavior
- Mobile: All columns stacked, left-aligned. 24px between column groups.

---

## 12. HOURGLASS / CHESS PLACEMENT MAP

### Chess Placements (3 instances)
1. **Hero**: Chess knight silhouette, 200px, 5-8% opacity, decorative background element (right side). Hidden on mobile.
2. **Manifesto**: Copy-based -- chess metaphor in the manifesto body text (variation). No visual icon.
3. **Ecosystem Pillars**: Chess knight icon (40px, accent gold) as the icon for Builder card and Partners card.

### Hourglass Placements (4 instances)
1. **Ecosystem Pillars**: Hourglass icon (40px, accent gold) as the icon for Systems card.
2. **Results / Social Proof**: Small hourglass (24px, white, 40% opacity) inline with headline.
3. **Founder Story**: Small hourglass (24px, accent gold) inline with closing paragraph. Copy-based hourglass theme in the closing variation.
4. **Footer CTA**: Large hourglass (300px, 3-5% opacity) as decorative background watermark. Copy-based hourglass theme throughout the section.

### Balance Assessment
Chess appears in top half of page (Hero, Manifesto, Pillars). Hourglass appears in bottom half (Pillars overlap, Results, Founder, Footer CTA). This creates a natural narrative progression: strategy first (chess -- "position before you move"), then urgency (hourglass -- "time is the cost").

---

## 13. CTA STRATEGY

### Primary CTA
"Book a Free AI Revenue Assessment" -- appears in Hero, Demo section, Founder Story, and Footer CTA. Always styled as Primary CTA button (accent gold background, black text). Destination: Cal.com booking link.

### Secondary CTAs
- "See How It Works" -- Hero only, secondary button style, smooth-scrolls to Ecosystem Pillars section.
- "Apply to Builder" / "Book an AI Revenue Audit" / "Learn About Partners" / "Join the Network" -- Pillar cards and Offer Paths, ghost button style within cards.

### CTA Placement Rules
- Maximum one primary CTA visible in any viewport at a time.
- Primary CTA is always the most visually prominent element (accent gold draws the eye).
- Secondary CTAs use bordered or ghost styles -- never compete with primary.
- Microcopy below primary CTAs always reduces friction: "No pitch. No fluff." / "30 minutes. Free."

---

## 14. MOBILE-FIRST NOTES

### Critical Mobile Considerations

1. **Hero headline must be 2 lines or fewer at 40px on 375px width**. The selected headline ("AI is not a technology project. / It's a revenue strategy.") works at this constraint.

2. **CTAs always full-width on mobile**. Stacked vertically with primary on top.

3. **Pillar cards stack in a meaningful order**: Builder > Systems > Partners > Network. This matches the value ladder priority.

4. **Touch targets**: All interactive elements minimum 44px height on mobile. Buttons already exceed this with py-4 (16px top + 16px bottom + text height).

5. **Horizontal padding**: 20px on mobile (`px-5`), preventing content from touching screen edges.

6. **Scroll reveals**: Reduced to simple opacity fade on mobile (no translateY) to avoid perceived sluggishness on lower-powered devices.

7. **Footer CTA hourglass watermark**: Hidden on mobile. The section works purely on typography at small sizes.

8. **Navigation hamburger menu**: Must be implemented for all pages. Full-screen overlay with backdrop blur.

9. **Section padding compression**: All sections use 64px vertical padding on mobile (vs 96px desktop). Hero uses 96px top (nav clearance) and 64px bottom.

10. **Image/photo in Founder section**: Displayed as a banner above text, max-height 300px, `object-cover` to prevent distortion.

---

## DEVELOPER NOTES

### Astro Component Structure (Suggested)

```
src/
  layouts/
    MainLayout.astro        -- includes Nav + Footer
  components/
    Nav.astro               -- Fixed navigation
    Footer.astro            -- Site footer
    Badge.astro             -- Reusable badge/tag
    Button.astro            -- Primary/Secondary/Ghost variants
    Card.astro              -- Standard card component
    PillarCard.astro        -- Ecosystem pillar card (extends Card)
    CaseStudyBlock.astro    -- Case study proof block
    StatBlock.astro         -- Large metric display
    DemoCard.astro          -- Video/demo placeholder card
    PathCard.astro          -- CTA router path card
    HourglassIcon.astro     -- SVG hourglass component
    ChessKnightIcon.astro   -- SVG chess knight component
  pages/
    index.astro             -- Home page (this spec)
```

### Tailwind Configuration Requirements
All custom values from brand identity appendix must be configured:
- Custom `accent` color with hover/muted/bright variants
- Custom `neutral-850` and `neutral-950` values
- Inter font family
- Custom `display` and `display-mobile` font size tokens
- Custom `reveal` transition timing function

### Performance Notes
- All content server-rendered. Scroll reveal animations are progressive enhancement only.
- Chess knight and hourglass SVGs should be inline (not external files) for instant rendering.
- Founder photo should be lazy-loaded (`loading="lazy"`) since it is below the fold.
- Video/demo placeholders should not auto-load any media. Load on interaction only.

### Accessibility Notes
- All accent gold text has been verified at 7.2:1 contrast ratio against black (passes AA and AAA).
- All interactive elements must have visible focus states (use `focus:ring-2 focus:ring-accent/20`).
- Decorative SVGs (chess knight background, hourglass watermark) must have `aria-hidden="true"`.
- Navigation must support keyboard navigation and screen readers.

---

*Produced by: designer-agent*
*Copy source: brain/assets/copy/website-main.md (read-only)*
*Brand reference: brain/assets/brand-identity.md*
*Context: brain/context/phase1-context-summary.md*
