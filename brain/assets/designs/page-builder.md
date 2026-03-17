# Page Design Specification -- Builder Sales Page (Reis IA)

Last updated: March 2026

> **Owner**: designer-agent
> **Status**: Complete
> **Consumed by**: dev-agent
> **Copy source**: `brain/assets/copy/sales-page-builder.md`
> **Brand reference**: `brain/assets/brand-identity.md`

---

## TABLE OF CONTENTS

1. [Page Overview](#1-page-overview)
2. [Navigation](#2-navigation)
3. [Section 1 -- Hero](#3-section-1----hero)
4. [Section 2 -- Problem / Agitation](#4-section-2----problem--agitation)
5. [Section 3 -- Solution Reveal](#5-section-3----solution-reveal)
6. [Section 4 -- Program Detail](#6-section-4----program-detail)
7. [Section 5 -- Who It's For / Not For](#7-section-5----who-its-for--not-for)
8. [Section 6 -- Objection Handling](#8-section-6----objection-handling)
9. [Section 7 -- Social Proof](#9-section-7----social-proof)
10. [Section 8 -- Guarantee](#10-section-8----guarantee)
11. [Section 9 -- Pricing and Application](#11-section-9----pricing-and-application)
12. [Section 10 -- Final CTA](#12-section-10----final-cta)
13. [Section 11 -- P.S.](#13-section-11----ps)
14. [Footer](#14-footer)
15. [Sticky CTA Bar](#15-sticky-cta-bar)
16. [Hourglass / Chess Placement Map](#16-hourglass--chess-placement-map)
17. [CTA Strategy](#17-cta-strategy)
18. [Mobile-First Notes](#18-mobile-first-notes)

---

## 1. PAGE OVERVIEW

**Page purpose**: Long-form sales page for the Reis IA Builder mentorship program. Converts solution-aware agency owners who know they need AI but don't know how to package, price, or deliver it. Framework: PAS (Problem-Agitation-Solution) into Proof, Offer, Objection Handling, and Close.

**Estimated section count**: 11 content sections + navigation + footer + sticky CTA = 14 total blocks.

**Page flow narrative (psychological sequence)**:
1. **Hero** -- Identify the reader. "This is for you. We know your situation."
2. **Problem** -- Agitate the pain. "Your competitors are already selling AI."
3. **Solution** -- Reveal the mechanism. "Builder is not a course. Here's the difference."
4. **Program Detail** -- Show exactly what they get. Build clarity and confidence.
5. **Who It's For** -- Self-selection filter. Increases perceived value through exclusivity.
6. **Objection Handling** -- Preemptively answer the 5 biggest objections.
7. **Social Proof** -- Third-party validation through testimonials and case study.
8. **Guarantee** -- Remove risk. "You can't lose."
9. **Pricing** -- Make the decision concrete. Three tiers, clear differentiation.
10. **Final CTA** -- Maximum urgency close.
11. **P.S.** -- Secondary urgency hook for the skimmers.

**Background layer strategy**:
- Hero: `bg-black`
- Problem: `bg-neutral-950`
- Solution: `bg-black`
- Program Detail: `bg-neutral-950`
- Who It's For: `bg-black`
- Objections: `bg-neutral-950`
- Social Proof: `bg-black`
- Guarantee: `bg-neutral-950`
- Pricing: `bg-black`
- Final CTA: `bg-neutral-950`
- P.S.: `bg-black`

---

## 2. NAVIGATION

Same as home page navigation. See `page-home.md` Section 2.

**One addition**: The "Builder" nav link should show as active (white text with 2px accent gold underline).

---

## 3. SECTION 1 -- HERO

### Purpose
Above-the-fold impact. Headline, subheadline, and CTA must all be visible without scrolling on desktop. Identify the reader immediately through the pre-headline qualifier.

### Layout
- **Type**: Full-width, left-aligned content (not centered -- sales pages read better left-aligned).
- **Background**: `bg-black` (#000000).
- **Decorative**: Chess knight silhouette, 200px, 5-8% opacity, right side. Chess grid texture at 2-3% opacity behind the entire hero section.

### Content and Placement

**Desktop (1280px+)**:

```
[128px top padding]

[PRE-HEADLINE -- Label: 13px, uppercase, tracking-widest, accent gold]
Using chess pre-headline variation (ADDED 2026-03-11):
"FOR AGENCY OWNERS READY TO STOP REACTING TO AI -- AND START POSITIONING AHEAD OF IT"

[16px gap]

[HEADLINE -- Display: 72px, 700, white, -0.03em tracking, max-width 900px]
Using chess headline variation B (ADDED 2026-03-11):
"AI without strategy is guessing.
 12 weeks from now, you could be playing a completely different game."

[24px gap]

[SUBHEADLINE -- Body Large: 20px, 400, neutral-400, max-width 640px]
"The Reis IA Builder program gives you a sellable AI offer, a client
 acquisition system, and your first project delivered -- in 12 weeks.
 With direct support from someone who has built this from scratch."

[40px gap]

[PRIMARY CTA -- Hero variant]
"Apply for the Next Cohort -->"
[Microcopy below: "Spots are limited. Next cohort: [DATE]" -- 13px, neutral-500]

[96px bottom padding]

                                    [CHESS KNIGHT: 250px, 5% opacity,
                                     absolute right 5%, top 50%,
                                     -translate-y-1/2, pointer-events-none]
```

**Copy decision**: Using chess headline variation B because it (a) aligns with the chess knight decorative element, (b) immediately communicates transformation timeline ("12 weeks"), and (c) the "playing a completely different game" metaphor lands the chess theme without being heavy-handed. The pre-headline chess variation adds strategic positioning language.

### Typography Specs

| Element | Size | Weight | Color | Tailwind |
|---------|------|--------|-------|----------|
| Pre-headline | 13px | 600 | accent `#C9A84C` | `text-[13px] font-semibold tracking-widest uppercase text-accent` |
| Headline | 72px | 700 | white | `text-7xl font-bold leading-none tracking-tighter text-white` |
| Subheadline | 20px | 400 | neutral-400 | `text-xl font-normal leading-relaxed text-neutral-400` |
| CTA | 18px | 600 | black on accent | Hero CTA variant per brand identity |
| Microcopy | 13px | 400 | neutral-500 | `text-[13px] text-neutral-500` |

### Responsive Behavior
- Mobile (375px): Pre-headline 12px. Headline 40px, left-aligned. Subheadline 18px. CTA full-width. Chess knight hidden. Chess grid hidden. Padding: 96px top, 64px bottom.
- Tablet (768px): Headline 56px. Chess knight hidden.
- Desktop: Full spec as above.

---

## 4. SECTION 2 -- PROBLEM / AGITATION

### Purpose
Agitate the pain. Make the reader feel the cost of inaction. Use competitor threat and market data to create genuine urgency.

### Layout
- **Type**: Contained (1200px), single-column text block. Max-width 720px for readability.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, max-width 720px]
"Your Competitors Are Already Selling AI. Here's What That Means for You."

[32px gap]

[BODY TEXT -- 17px, 400, neutral-300, line-height 1.7, max-width 720px]
[Full problem/agitation copy from sales-page-builder.md Section 1]
[Bold text rendered as white with font-weight 600]
[Paragraphs separated by 24px]

[Bullet list -- styled as pain points]:
- 15px, neutral-400
- Custom bullet: small dash (--) in neutral-500, not filled circle
- Left padding: 24px
- Spacing between items: 12px

[32px gap]

[MARKET DATA CALLOUT BOX]
+----------------------------------------------------------+
| bg-neutral-900, border border-neutral-800, rounded-lg,    |
| p-8                                                        |
|                                                            |
| [Body, 17px, neutral-300]                                  |
| "The bottom 60-70% of digital agencies will face a race    |
|  to the bottom within 2-3 years..."                        |
|                                                            |
| [Bold stat: "AI projects sell for $5,000-$20,000" --       |
|  20px, 600, white]                                         |
+----------------------------------------------------------+

[32px gap]

[HOURGLASS MOTIF CLOSER -- using variation ADDED 2026-03-11]
[Body, 17px, neutral-300]
"Time doesn't just pass. It compounds -- in their favor."

[BOLD STATEMENT -- 20px, 600, white]
"The real cost of waiting isn't money. It's the time you can't get back."

[96px bottom padding]
```

**Copy decision**: Using the hourglass agitation paragraph variation (ADDED 2026-03-11) as the section closer. This creates a natural emotional crescendo: competitor threat (logical) --> time cost (emotional).

### Decorative Elements
- **Hourglass icon**: Small (20px), accent gold, positioned inline before "Time doesn't just pass." at the hourglass motif closer.

### Responsive Behavior
- Mobile: Headline 28px. Body 16px. Market data callout box full-width with 24px padding. Padding: 64px top and bottom.

---

## 5. SECTION 3 -- SOLUTION REVEAL

### Purpose
Transition from pain to hope. Position Builder as the answer. The comparison table is the key conversion element -- it crystallizes the difference between Builder and "just another course."

### Layout
- **Type**: Contained (1200px). Text block + comparison table.
- **Background**: `bg-black` (#000000).
- **Decorative**: Subtle chess grid texture (2-3% opacity) behind the comparison table only.

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, max-width 720px]
"This Is What the Reis IA Builder Program Was Built For."

[32px gap]

[OPENING -- using chess variation ADDED 2026-03-11]
[Body, 17px, neutral-300, max-width 720px]
"Think of it this way.

 A course gives you pieces. Builder teaches you to play the game.

 Every week, you're not just learning AI -- you're positioning..."

[BOLD STATEMENT -- 20px, 600, white]
"We don't build AI. We position the right pieces before moving."

[48px gap]

[COMPARISON TABLE -- max-width 800px, centered]
See Comparison Table spec from brand identity Section 6J.

| Course | Builder |
|--------|---------|
| Information | Application |
| Passive watching | Weekly working sessions |
| Generic templates | Your specific offer, priced, packaged, ready |
| Solo implementation | Direct support on your first 1-2 client projects |
| You figure out clients | Client acquisition system built during the program |
| Credential, no revenue | Revenue before you finish |

[32px gap]

[CLOSING -- 17px, 400, neutral-300, max-width 720px]
"Builder is built for people who are serious about adding AI
 as a real revenue stream..."

[96px bottom padding]
```

**Copy decision**: Using the chess motif solution opening variation (ADDED 2026-03-11) because the "pieces vs. game" metaphor directly sets up the comparison table and reinforces the chess brand element.

### Comparison Table Specifications

Per brand identity Section 6J:

| Property | Spec | Tailwind |
|----------|------|----------|
| Container | `bg-neutral-900`, `border border-neutral-800 rounded-lg` | |
| Header row | `bg-neutral-850` | `bg-neutral-850` |
| Header text | 13px, uppercase, neutral-400, tracking-widest | `text-[13px] uppercase tracking-widest text-neutral-400` |
| "Builder" column header | Accent gold text | `text-accent` |
| Cell padding | 16px 20px | `px-5 py-4` |
| Row divider | 1px solid `#1A1A1A` | `border-b border-neutral-850` |
| "Course" column text | 15px, neutral-500 (muted) | `text-[15px] text-neutral-500` |
| "Builder" column text | 15px, white (emphasized) | `text-[15px] text-white` |

### Responsive Behavior
- Mobile: Table scrolls horizontally if needed, or converts to stacked card format (each row becomes a card: "Course says X, Builder gives you Y"). Chess grid hidden.

---

## 6. SECTION 4 -- PROGRAM DETAIL

### Purpose
Show the methodology. Four modules, each building on the last. The reader should see a clear, structured path from "I have nothing" to "I have a revenue-generating AI practice."

### Layout
- **Type**: Contained (1200px). Section intro + 4 module blocks in Process/Steps layout + deliverables list + pricing tier preview.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500]
"THE PROGRAM"

[16px gap]

[HEADLINE -- H2: 42px, 600, white]
"The Builder Program: 12 Weeks, Four Modules, One Goal -- Revenue."

[16px gap]

[INTRO -- using chess variation ADDED 2026-03-12]
[Body Large, 20px, 400, neutral-400, max-width 720px]
"Think of the 12 weeks as a game played in four moves..."

[48px gap]

[4 MODULE BLOCKS -- Process/Steps component, brand identity Section 6K]

+--MODULE 1--------------------------------------------------+
| [Step number: "01" -- 48px, 700, accent gold, left column]  |
| [Chess knight icon -- 24px, accent gold, beside number]     |
|                                                              |
| [Title -- H4: 24px, 600, white] "AI Offer Architecture"     |
| [Subtitle -- 14px, 500, accent-muted, italic]               |
|  "The opening move. You can't win a game you haven't set up."|
| [Timeline badge -- "WEEKS 1-2"]                              |
|                                                              |
| [Body -- 16px, 400, neutral-400, max-width 600px]           |
| "Before you can sell AI, you need to know what you're        |
|  selling..."                                                 |
|                                                              |
| [Bullet list -- 4 items, 15px, neutral-400, accent bullets]  |
|                                                              |
| [Connector line -- 1px solid #262626, vertical]              |
+-------------------------------------------------------------+

[Same pattern for Modules 2, 3, 4]
Module 2: "Client Acquisition" -- "Position before you advance."
Module 3: "Implementation Framework" -- "Execute with precision."
Module 4: "Scale and Systemize" -- "Endgame. Turn one win into a system."

[48px gap]

[DELIVERABLES BLOCK -- bg-neutral-900, p-8, rounded-lg, border neutral-800]

[H3: 24px, 600, white] "Everything That Comes With the Program"

[Two-column grid: Core Deliverables + Bonuses]

[Core items: checkmark icon (green-500) + 15px, neutral-300]
[Bonus items: gift/star icon (accent) + 15px, neutral-300]

[96px bottom padding]
```

**Copy decision**: Using the chess motif module framing variation (ADDED 2026-03-12) for the section intro and the alternative module subheadlines. Each module gets a chess-derived subtitle that reinforces the "four strategic moves" narrative. A small chess knight icon appears beside the step number on Module 1 only (the others use the step number alone) to avoid visual overload.

### Module Block Specifications

Per brand identity Section 6K:

| Property | Spec | Tailwind |
|----------|------|----------|
| Step number | 48px, 700, accent gold | `text-[48px] font-bold text-accent` |
| Title | 24px, 600, white | `text-2xl font-semibold text-white` |
| Module subtitle | 14px, 500, accent-muted, italic | `text-sm font-medium text-accent-muted italic` |
| Timeline badge | 12px, uppercase, accent/10 bg | Badge spec (Section 6F) |
| Description | 16px, 400, neutral-400 | `text-base text-neutral-400 leading-relaxed` |
| Connector line | 1px solid #262626, vertical | `border-l border-neutral-800` |
| Layout desktop | Number left column (80px), content right | `grid grid-cols-[80px_1fr] gap-6` |
| Layout mobile | Number above, content below | Single column |

### Responsive Behavior
- Mobile: Module blocks stacked, number above content. Deliverables single column. Timeline badges inline. Padding: 64px top and bottom.

---

## 7. SECTION 5 -- WHO IT'S FOR / NOT FOR

### Purpose
Self-selection filter. Increases perceived value through exclusivity. Reassures qualified readers. Disqualifies time-wasters.

### Layout
- **Type**: Contained (1200px). Two-column split: "For You" left, "Not For You" right.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, centered]
"Is Builder Right for You?"

[48px gap]

[TWO-COLUMN GRID -- grid grid-cols-1 lg:grid-cols-2 gap-8]

+---FOR YOU (LEFT)-------------------+  +---NOT FOR YOU (RIGHT)--------------+
| bg-neutral-900, border-neutral-800, |  | bg-neutral-900, border-neutral-800, |
| rounded-lg, p-8                     |  | rounded-lg, p-8                     |
|                                     |  |                                     |
| [H3: 24px, 600, white]             |  | [H3: 24px, 600, white]              |
| "This Program Is For You If:"       |  | "This Program Is NOT For You If:"   |
|                                     |  |                                     |
| [Checklist -- 5 items]              |  | [X-list -- 5 items]                 |
| Checkmark icon: text-green-500      |  | X icon: text-red-500/50 (muted red) |
| Text: 15px, neutral-300             |  | Text: 15px, neutral-400             |
| Item spacing: 16px                  |  | Item spacing: 16px                  |
|                                     |  |                                     |
+-------------------------------------+  +-------------------------------------+

[96px bottom padding]
```

### Responsive Behavior
- Mobile: Cards stacked, "For You" on top.

---

## 8. SECTION 6 -- OBJECTION HANDLING

### Purpose
Preemptively answer the 5 biggest buying objections. Each answer should feel like a direct conversation -- not FAQ format, but "I hear you, here's the truth" format.

### Layout
- **Type**: Contained (1200px). Alternating question-answer blocks (not accordion -- this is a sales page, objections should be visible without interaction).
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500]
"COMMON QUESTIONS"

[16px gap]

[HEADLINE -- H2: 42px, 600, white]
"Let's Address What You're Really Thinking."

[48px gap]

[OBJECTION BLOCKS -- max-width 800px, left-aligned]

For each of the 5 objections:

+---OBJECTION BLOCK----------------------------------------------+
| [Question -- H3: 24px, 600, white]                             |
| "Can I really sell AI if I'm not technical?"                     |
|                                                                  |
| [16px gap]                                                      |
|                                                                  |
| [Answer -- 17px, 400, neutral-300, line-height 1.7]             |
| [Full answer copy from sales-page-builder.md]                    |
| [Bold text in white, font-weight 600]                            |
|                                                                  |
| [Gradient fade divider at bottom -- divider-fade class]          |
+------------------------------------------------------------------+

[40px between blocks]

Objections in order:
1. "Can I really sell AI if I'm not technical?" -- original
2. "What if I don't get clients during the program?" -- original
3. "Is $4,000-$15,000 too much to invest right now?" -- original
4. "What if I don't have time while running my agency?" -- using hourglass variation closer (ADDED 2026-03-12)
5. "I've invested in programs before and didn't get results." -- using chess variation closer (ADDED 2026-03-12)

[96px bottom padding]
```

**Copy decisions**:
- Objection 4 (time): Using the hourglass closing variation because the "what does the next 12 months look like" reframe is powerful and reinforces the time-cost narrative.
- Objection 5 (past failures): Using the chess closing variation because "most programs hand you pieces and call it chess" ties directly to the Builder chess positioning established in the Solution section.

### Decorative Elements
- **Hourglass icon**: Small (20px), accent gold, inline before the time-objection question text.
- **Chess icon**: Small (20px), accent gold, inline before the past-failures question text.

### Responsive Behavior
- Mobile: Same layout, full-width. Headline 28px. Questions 20px. Answers 16px. Padding: 64px top and bottom.

---

## 9. SECTION 7 -- SOCIAL PROOF

### Purpose
Third-party validation. Testimonials and case study provide evidence that the methodology works for real people in real situations.

### Layout
- **Type**: Contained (1200px). Testimonial blocks + case study block.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500]
"RESULTS"

[16px gap]

[HEADLINE -- H2: 42px, 600, white]
"What Builder Clients Say"

[48px gap]

[TESTIMONIAL GRID -- grid grid-cols-1 lg:grid-cols-3 gap-8]

+---TESTIMONIAL 1---+  +---TESTIMONIAL 2---+  +---TESTIMONIAL 3---+
| [Blockquote with   |  | [Blockquote with   |  | [Blockquote with   |
|  left accent       |  |  left accent       |  |  left accent       |
|  border per brand  |  |  border per brand  |  |  border per brand  |
|  identity 6H]      |  |  identity 6H]      |  |  identity 6H]      |
|                    |  |                    |  |                    |
| "[TESTIMONIAL 1    |  | "[TESTIMONIAL 2    |  | "[TESTIMONIAL 3    |
|  placeholder       |  |  placeholder       |  |  placeholder       |
|  text]"            |  |  text]"            |  |  text]"            |
|                    |  |                    |  |                    |
| [Name, Agency]     |  | [Name, Type]       |  | [Name]             |
+--------------------+  +--------------------+  +--------------------+

[48px gap]

[CASE STUDY BLOCK -- bg-neutral-900, border-neutral-800, rounded-lg, p-8 lg:p-12]

[PLACEHOLDER: Case Study -- Builder Graduate Agency]
[H3] Agency: "[PLACEHOLDER]"
[Type, Location]
[Before/After structure]
[Metric in large accent gold type: "[METRIC]"]

[96px bottom padding]
```

### Testimonial Specifications

Per brand identity Section 6H:

| Property | Spec | Tailwind |
|----------|------|----------|
| Left border | 2px solid accent | `border-l-2 border-accent` |
| Padding left | 24px | `pl-6` |
| Quote text | 18px, italic, neutral-300, line-height 1.7 | `text-lg italic text-neutral-300 leading-relaxed` |
| Name | 15px, 600, white | `text-[15px] font-semibold text-white` |
| Role/agency | 14px, 400, neutral-500 | `text-sm text-neutral-500` |

All testimonials are placeholders. Developer should build the component to accept dynamic content.

### Responsive Behavior
- Mobile: Testimonials stacked, full-width. Case study block full-width. Padding: 64px top and bottom.

---

## 10. SECTION 8 -- GUARANTEE

### Purpose
Remove risk. Make the reader feel they cannot lose. The guarantee structure is simple: do the work, get results or get your money back.

### Layout
- **Type**: Contained (1200px). Centered text block with visual emphasis.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[CENTERED CONTENT -- max-width 720px]

[GUARANTEE BADGE -- large, centered]
[Shield/checkmark icon, 48px, accent gold]

[24px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"The Builder Guarantee: Build Your Offer or Your Money Back"

[24px gap]

[BODY -- 17px, 400, neutral-300, centered, line-height 1.7]
[Full guarantee copy from sales-page-builder.md Section 7]

[24px gap]

[HOURGLASS CLOSER -- using variation ADDED 2026-03-11]
[Body, 17px, neutral-300, centered]
"There's only one thing the guarantee doesn't cover."

[BOLD: 20px, 600, white, centered]
"Time."

[Body, 17px, neutral-300, centered]
"If you wait three more months before applying, no refund policy gives
 those months back..."

[BOLD CLOSER: 17px, 600, white, centered]
"Do the work. Get the offer. Or get your money back.
 But don't let the guarantee be the reason you wait."

[96px bottom padding]
```

**Copy decision**: Using the hourglass guarantee closing variation (ADDED 2026-03-11) because it brilliantly turns the guarantee into an urgency device. The one-word "Time." line is powerful visual typography.

### Typography Note
The word "Time." standing alone on a line should be styled larger for impact: 30px, 700, white. It is the emotional pivot of the section.

### Decorative Elements
- **Hourglass**: Small inline icon (20px, accent gold) before the word "Time." on its standalone line.

### Responsive Behavior
- Mobile: Same centered layout. Headline 28px. "Time." at 24px. Padding: 64px.

---

## 11. SECTION 9 -- PRICING AND APPLICATION

### Purpose
Make the decision concrete. Three pricing tiers side by side, clear differentiation, and a transparent application process. No hidden costs, no ambiguity.

### Layout
- **Type**: Contained (1200px). Pricing tiers in 3-column grid + application steps below.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"INVESTMENT"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"Join the Next Cohort"

[16px gap]

[COHORT INFO -- 16px, 500, neutral-400, centered]
"Cohort start date: [DATE] | Spots available: Limited to 12 clients"

[48px gap]

[3-COLUMN PRICING GRID -- grid grid-cols-1 md:grid-cols-3 gap-8]

+---GROUP TIER------+  +--PREMIUM TIER-----+  +---VIP TIER--------+
| bg-neutral-900     |  | bg-neutral-900     |  | bg-neutral-900     |
| border-neutral-800 |  | border-accent/20   |  | border-neutral-800 |
| rounded-lg, p-8    |  | bg-accent/[0.03]   |  | rounded-lg, p-8    |
|                    |  | rounded-lg, p-8    |  |                    |
|                    |  | [RECOMMENDED badge]|  |                    |
| [Label: "GROUP"]   |  | [Label: "PREMIUM"] |  | [Label: "VIP"]     |
|                    |  |                    |  |                    |
| [Price:]           |  | [Price:]           |  | [Price:]           |
| "From $4,000"      |  | "From $8,000"      |  | "From $12,000"     |
| [42px, 700, white] |  | [42px, 700, white] |  | [42px, 700, white] |
|                    |  |                    |  |                    |
| [Feature list:]    |  | [Feature list:]    |  | [Feature list:]    |
| - Group coaching   |  | - Everything in    |  | - Everything in    |
| - Full templates   |  |   Group            |  |   Premium          |
| - Community        |  | - Weekly 1:1       |  | - Done-with-you    |
| - Implementation   |  | - Priority access  |  | - Immediate        |
|   support          |  | - Direct review    |  |   Partners access  |
| - Network          |  | - Fast-track       |  | - First-mover      |
|   (lifetime)       |  |   Partners         |  |   advantage        |
|                    |  |                    |  |                    |
| [Best for: text]   |  | [Best for: text]   |  | [Best for: text]   |
|                    |  |                    |  |                    |
| [SECONDARY CTA:    |  | [PRIMARY CTA:      |  | [SECONDARY CTA:    |
|  "Apply Now -->"]  |  |  "Apply Now -->"]  |  |  "Apply Now -->"]  |
+--------------------+  +--------------------+  +--------------------+

[48px gap]

[PAYMENT NOTE -- 14px, neutral-500, centered]
"Full investment upfront (recommended). 2-payment option available
 for Group and Premium tiers."

[64px gap]

[APPLICATION PROCESS -- max-width 800px]

[H3: 24px, 600, white]
"The Application Process"

[32px gap]

[5 STEPS -- horizontal timeline on desktop, vertical on mobile]
Step 1: "Complete the application form (10 minutes)"
Step 2: "Application reviewed within 48 hours"
Step 3: "If approved, book a 20-minute call with Moroni"
Step 4: "Call --> decision --> if it's a fit, secure your spot"
Step 5: "Onboarding within 48 hours of enrollment"

[24px gap]

[Note -- 15px, neutral-400, italic]
"We review every application personally. We don't accept everyone --
 this keeps the cohort quality high and your results consistent."

[32px gap]

[PRIMARY CTA -- centered]
"Apply Now -->"

[96px bottom padding]
```

### Pricing Card Specifications

Per brand identity Section 6B (Pricing Tier Card):

| Property | Standard | Highlighted (Premium) |
|----------|----------|----------------------|
| Background | `bg-neutral-900` | `bg-neutral-900 bg-accent/[0.03]` |
| Border | `border-neutral-800` | `border-accent/20` |
| Tier label | Badge spec, neutral variant | Badge spec, accent variant with "RECOMMENDED" |
| Price | 42px, 700, white | 42px, 700, white |
| Feature list | Checkmarks in green-500, 15px, neutral-300 | Same |
| Best for | 14px, italic, neutral-500 | Same |
| CTA | Secondary button | Primary button (accent gold) |

### Application Steps Specifications

| Property | Spec | Tailwind |
|----------|------|----------|
| Step number | 32px, 700, accent gold, inline circle | `w-10 h-10 rounded-full border border-accent text-accent flex items-center justify-center font-bold` |
| Step text | 15px, 400, neutral-300 | `text-[15px] text-neutral-300` |
| Connector | Horizontal line (desktop), vertical (mobile), 1px #262626 | `border-b border-neutral-800` |

### Responsive Behavior
- Mobile: Pricing cards stacked (Group, Premium, VIP order). Application steps vertical. CTA full-width. Padding: 64px.
- Tablet: Pricing cards stacked or 2+1 if space allows.

---

## 12. SECTION 10 -- FINAL CTA

### Purpose
Maximum urgency close. This is the "last call" before the page ends. Combine logical urgency (cohort dates, limited spots) with emotional urgency (competitor momentum, time cost).

### Layout
- **Type**: Full-width, centered text block.
- **Background**: `bg-neutral-950` (#0A0A0A).
- **Decorative**: Subtle radial gradient glow behind CTA (accent gold, 3-5% opacity).

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, centered, max-width 720px]
Using combined chess/hourglass variation (ADDED 2026-03-11):
"The Agencies That Move Now Will Own This Market."

[24px gap]

[BODY -- 17px, 400, neutral-300, centered, max-width 640px]
[Combined variation copy:]
"The agencies that move now are not luckier than you. They're not more
 technical. They're not more funded.

 They made a decision earlier.

 AI is not complicated. Positioning your agency ahead of the market --
 before the window closes -- that's strategy. That's the chess move.
 And right now, most of your competitors are still looking at the board."

[BOLD: 20px, 600, white, centered]
"12 weeks from now, you could have a sold AI offer and a client in delivery."

[17px, neutral-400, centered]
"Or you could still be watching."

[40px gap]

[COHORT INFO -- 14px, 500, neutral-400, centered]
"The next cohort starts [DATE]. Applications close [DATE] or when
 spots are filled -- whichever comes first."

[24px gap]

[PRIMARY CTA -- Hero variant, centered]
"Apply for Cohort [X] -->"

[96px bottom padding]
```

**Copy decision**: Using the combined chess/hourglass final CTA variation (ADDED 2026-03-11). The "chess move" language lands the chess theme one final time. The "still watching" line creates the urgency through contrast.

### Responsive Behavior
- Mobile: Headline 28px. Body 16px. CTA full-width. Padding: 64px.

---

## 13. SECTION 11 -- P.S.

### Purpose
Catch the skimmers. Many readers scroll to the bottom first -- the P.S. gives them a reason to go back up and apply.

### Layout
- **Type**: Contained (1200px). Single-column text, left-aligned. Short.
- **Background**: `bg-black` (#000000).

### Content and Placement

```
[64px top padding]

[LABEL -- 17px, 600, neutral-400]
"P.S."

[16px gap]

[Using hourglass P.S. variation (ADDED 2026-03-11)]
[Body, 17px, 400, neutral-300, max-width 640px]
"The most common thing Builder clients tell me after they finish:
 'I should have done this six months ago.'

 Not because the program was easy. Because the time they spent waiting
 was the real cost -- not the investment.

 Every month without an AI revenue stream is a month your competitors used.

 The application takes 10 minutes. The decision is whether you're ready
 to stop watching and start building."

[24px gap]

[GHOST CTA -- "Apply now -->"]

[64px bottom padding]
```

**Copy decision**: Using the hourglass P.S. variation because "I should have done this six months ago" is the most powerful testimonial-style closer and reinforces the time-cost narrative one final time.

### Responsive Behavior
- Mobile: Same layout, full-width. Padding: 48px top and bottom (compact section).

---

## 14. FOOTER

Same as home page footer. See `page-home.md` Section 11.

---

## 15. STICKY CTA BAR

### Purpose
Persistent conversion opportunity. As the user scrolls through this long sales page, the "Apply Now" button should always be accessible.

### Behavior
- **Desktop only** (hidden on mobile to preserve screen real estate).
- Appears after the user scrolls past the hero section CTA (approximately 600px scroll depth).
- Fixed to bottom of viewport.
- Slides up on appear, slides down on hide (300ms ease-out).

### Specifications

| Property | Spec | Tailwind |
|----------|------|----------|
| Container | Full width, fixed bottom, z-40 | `fixed bottom-0 left-0 right-0 z-40` |
| Background | `#0A0A0A` with 90% opacity, backdrop blur | `bg-neutral-950/90 backdrop-blur-md` |
| Border top | 1px solid `#1A1A1A` | `border-t border-neutral-850` |
| Height | 72px | `h-[72px]` |
| Content | Centered, max-width 1200px | `max-w-[1200px] mx-auto flex items-center justify-between px-8` |
| Left text | "Next cohort: [DATE] | [X] spots remaining" -- 14px, neutral-400 | |
| Right CTA | Primary button, standard size | "Apply Now -->" |

### Hide Conditions
- Hidden on mobile/tablet (below 1024px).
- Hidden when user is in the hero section (top of page).
- Hidden when user reaches the footer (avoid doubling up on footer CTA).

---

## 16. HOURGLASS / CHESS PLACEMENT MAP

### Chess Placements (5 instances)
1. **Hero**: Pre-headline chess variation copy. Chess knight silhouette 250px, 5% opacity, right side. Chess grid texture 2-3% behind hero.
2. **Solution Reveal**: Chess motif opening copy ("A course gives you pieces. Builder teaches you to play the game."). Chess grid texture behind comparison table.
3. **Program Detail**: Chess motif module intro and subheadlines. Chess knight icon (24px) beside Module 1 step number.
4. **Objection 5**: Chess icon (20px) inline. Chess variation closer copy.
5. **Final CTA**: "That's the chess move" in combined variation copy.

### Hourglass Placements (5 instances)
1. **Problem/Agitation**: Hourglass icon (20px) inline. Hourglass variation closer ("Time doesn't just pass. It compounds.").
2. **Objection 4**: Hourglass icon (20px) inline. Hourglass variation closer about time investment.
3. **Guarantee**: Hourglass variation closer ("There's only one thing the guarantee doesn't cover. Time."). Hourglass icon (20px) inline.
4. **Final CTA**: Combined variation copy references time.
5. **P.S.**: Hourglass variation ("I should have done this six months ago.").

### Balance Assessment
Chess dominates the top half (Hero, Solution, Program) -- establishing the strategic positioning narrative. Hourglass dominates the bottom half (Problem closer, Objections, Guarantee, P.S.) -- creating urgency through the time-cost narrative. The Final CTA combines both, creating convergence at the decision point.

---

## 17. CTA STRATEGY

### Primary CTA
"Apply for the Next Cohort -->" / "Apply Now -->" -- appears in Hero, Pricing section, Final CTA, P.S., and sticky bar. Always primary button style (accent gold). Destination: application form.

### CTA Frequency
This is a long-form sales page. The primary CTA appears approximately every 2-3 scroll screens. The reader should never need to scroll more than 2 sections to find a way to apply.

### No Secondary Pathway
Unlike the home page, this sales page has a single conversion goal: application. There is no "See How It Works" or "Learn More" secondary CTA. Every CTA points to the application form.

---

## 18. MOBILE-FIRST NOTES

1. **Hero must show headline + subheadline + CTA above the fold on mobile at 375px**. The chess headline variation B at 40px fits within 2-3 lines on mobile. Subheadline at 18px fits in 3 lines. CTA button is below -- may require minimal scroll. Acceptable.

2. **Sticky CTA bar hidden on mobile**. Mobile users have the hero CTA, pricing CTA, final CTA, and P.S. CTA as touchpoints.

3. **Comparison table**: Must not require horizontal scroll on mobile. Convert to stacked card format: each row becomes "Course: X / Builder: Y" with visual differentiation (muted vs emphasized).

4. **Pricing cards stacked**: Group > Premium > VIP, in that order. Premium card should have visual prominence even when stacked (accent border + subtle background tint).

5. **Objection blocks**: Full-width, no need for interaction (not accordion). All objections visible on mobile scroll.

6. **Touch targets**: All CTA buttons minimum 48px height on mobile.

7. **Section padding**: 64px vertical on mobile (vs 96px desktop).

---

## DEVELOPER NOTES

### Astro Component Structure (Suggested Additions)

```
src/
  components/
    StickyCtaBar.astro       -- Desktop-only sticky CTA
    ComparisonTable.astro    -- Course vs Builder table
    ModuleBlock.astro        -- Program module step component
    PricingCard.astro        -- Pricing tier card (extends Card)
    TestimonialBlock.astro   -- Blockquote testimonial
    QualifierGrid.astro      -- For/Not For two-column layout
    ObjectionBlock.astro     -- Question + answer block
    ApplicationSteps.astro   -- Numbered process steps
  pages/
    builder.astro            -- Builder sales page (this spec)
```

### Dynamic Content
- `[DATE]` placeholders: These should be configurable via a constants file or CMS. Never hardcoded into component markup.
- `[TESTIMONIAL]` placeholders: Build components to accept dynamic content. Use placeholder text with clear visual markers (dotted border, "Placeholder" badge) until real testimonials are available.
- Cohort spots: If implementing a counter, it must be real-time accurate. Never show "3 spots left" if that is not true. Stale urgency destroys credibility.

### Intersection Observer Usage
- Sticky CTA bar visibility: Use Intersection Observer on the hero CTA to detect when it exits viewport (show bar) and on the footer to detect when it enters viewport (hide bar).
- Scroll reveal animations: Same as home page. Progressive enhancement, server-rendered content visible without JS.

---

*Produced by: designer-agent*
*Copy source: brain/assets/copy/sales-page-builder.md (read-only)*
*Brand reference: brain/assets/brand-identity.md*
*Context: brain/context/phase1-context-summary.md*
