# Page Design Specification -- Systems Service Page (Reis IA)

Last updated: March 2026

> **Owner**: designer-agent
> **Status**: Complete
> **Consumed by**: dev-agent
> **Copy source**: `brain/assets/copy/sales-page-systems.md`
> **Brand reference**: `brain/assets/brand-identity.md`

---

## TABLE OF CONTENTS

1. [Page Overview](#1-page-overview)
2. [Navigation](#2-navigation)
3. [Section 1 -- Hero](#3-section-1----hero)
4. [Section 2 -- Problem](#4-section-2----problem)
5. [Section 3 -- Agitation](#5-section-3----agitation)
6. [Section 4 -- Solution](#6-section-4----solution)
7. [Section 5 -- Service Offerings](#7-section-5----service-offerings)
8. [Section 6 -- Process](#8-section-6----process)
9. [Section 7 -- Results / Proof](#9-section-7----results--proof)
10. [Section 8 -- Qualifier](#10-section-8----qualifier)
11. [Section 9 -- Pricing](#11-section-9----pricing)
12. [Section 10 -- Guarantee](#12-section-10----guarantee)
13. [Section 11 -- FAQ](#13-section-11----faq)
14. [Section 12 -- Final CTA](#14-section-12----final-cta)
15. [Footer](#15-footer)
16. [Hourglass / Chess Placement Map](#16-hourglass--chess-placement-map)
17. [CTA Strategy](#17-cta-strategy)
18. [Mobile-First Notes](#18-mobile-first-notes)

---

## 1. PAGE OVERVIEW

**Page purpose**: Service page for Reis IA Systems -- the done-for-you AI implementation arm. Converts problem-aware to solution-aware B2B decision-makers who have likely tried AI before, failed or stalled, and are now evaluating a new approach. The page leads with the enemy (Prototype Graveyard) to validate their past experience, then positions the Revenue-First Framework as the solution.

**Estimated section count**: 12 content sections + navigation + footer = 14 total blocks.

**Page flow narrative (psychological sequence)**:
1. **Hero** -- Name the enemy. "Your AI project didn't fail because of the technology."
2. **Problem** -- Validate their experience. "The Prototype Graveyard is real."
3. **Agitation** -- Quantify the cost. "Every month without the right system..."
4. **Solution** -- Introduce the mechanism. "Revenue-First Framework."
5. **Service Offerings** -- Show what we build. Tangible, specific services.
6. **Process** -- Show how we work. 7-step transparency.
7. **Proof** -- Case studies and market data. "Here's what happens when it's done right."
8. **Qualifier** -- For/Not For self-selection.
9. **Pricing** -- Three packages with price ranges. Lower friction than exact pricing.
10. **Guarantee** -- Remove risk.
11. **FAQ** -- Answer the analytical buyer's remaining objections in writing.
12. **Final CTA** -- Lowest-friction close: the AI Revenue Audit.

**Critical ICP context**: This audience is analytical, skeptical, and has likely been burned by AI vendors before. The page must lead with validation of their past experience, provide abundant proof, answer objections in writing (FAQ is critical), and keep the primary CTA low-friction (a 60-minute audit, not a purchase commitment).

**Background layer strategy**:
- Hero: `bg-black`
- Problem: `bg-neutral-950`
- Agitation: `bg-black`
- Solution: `bg-neutral-950`
- Service Offerings: `bg-black`
- Process: `bg-neutral-950`
- Proof: `bg-black`
- Qualifier: `bg-neutral-950`
- Pricing: `bg-black`
- Guarantee: `bg-neutral-950`
- FAQ: `bg-black`
- Final CTA: `bg-neutral-950`

---

## 2. NAVIGATION

Same as home page navigation. See `page-home.md` Section 2.

**One addition**: The "Systems" nav link should show as active (white text with 2px accent gold underline).

---

## 3. SECTION 1 -- HERO

### Purpose
Immediately validate the visitor's past AI experience. Name the enemy (wrong question, wrong approach) in a way that makes them think "finally, someone who gets it." Position the AI Revenue Audit as the low-friction entry point.

### Layout
- **Type**: Full-width, left-aligned content.
- **Background**: `bg-black` (#000000).
- **Decorative**: Hourglass icon as featured element (80px, accent gold, positioned right of headline area). Subtle radial gradient glow (accent gold, 3% opacity, centered on headline).

### Content and Placement

**Desktop (1280px+)**:

```
[128px top padding]

[PRE-HEADLINE -- Label: 13px, uppercase, tracking-widest, neutral-500]
"FOR GROWTH-STAGE COMPANIES READY TO MOVE FROM 'WE SHOULD IMPLEMENT AI'
 TO 'OUR AI IS GENERATING RESULTS'"

[16px gap]

[HEADLINE -- Display: 72px, 700, white, -0.03em tracking, max-width 900px]
Using original recommended headline (Option A):
"Your AI project didn't fail because the technology doesn't work.
 It failed because nobody asked the right question first."

[24px gap]

[SUBHEADLINE -- Body Large: 20px, 400, neutral-400, max-width 640px]
"Reis IA Systems builds AI agents and automations that connect directly
 to revenue-generating processes -- starting with where the money is,
 not with what's technically interesting."

[40px gap]

[CTA CLUSTER]
[PRIMARY CTA -- Hero variant: "Book a Free AI Revenue Assessment -->"]
[12px gap]
[MICROCOPY -- 13px, neutral-500]
"30 minutes. We identify where AI generates the highest-leverage
 revenue impact in your business -- before you spend a dollar."

[96px bottom padding]

                              [HOURGLASS ICON: 80px, accent gold,
                               absolute right 8%, top 40%,
                               pointer-events-none]
```

**Copy decision**: Using the original recommended headline (Option A -- enemy angle) over the chess variation D. The original is more direct and names the specific failure point ("nobody asked the right question first") which resonates most with this ICP's past experience. The chess metaphor is better deployed in the Solution section where strategy positioning is more contextual.

The hourglass appears as the featured decorative element (not chess) because this page is about systems, efficiency, and time savings -- the hourglass narrative. The chess appears later in the Solution section.

### Typography Specs

| Element | Size | Weight | Color | Tailwind |
|---------|------|--------|-------|----------|
| Pre-headline | 13px | 600 | neutral-500 | `text-[13px] font-semibold tracking-widest uppercase text-neutral-500` |
| Headline | 72px | 700 | white | `text-7xl font-bold leading-none tracking-tighter text-white` |
| Subheadline | 20px | 400 | neutral-400 | `text-xl font-normal leading-relaxed text-neutral-400` |
| CTA | 18px | 600 | black on accent | Hero CTA variant |
| Microcopy | 13px | 400 | neutral-500 | `text-[13px] text-neutral-500` |

### Responsive Behavior
- Mobile (375px): Pre-headline 12px, max 2 lines. Headline 40px. Subheadline 18px. CTA full-width. Hourglass icon hidden. Padding: 96px top, 64px bottom.
- Tablet: Headline 56px. Hourglass icon hidden.
- Desktop: Full spec as above.

---

## 4. SECTION 2 -- PROBLEM

### Purpose
Validate the reader's past experience with AI. Name the Prototype Graveyard. Make them feel understood -- not sold to. Build credibility through empathy.

### Layout
- **Type**: Contained (1200px). Single-column text block + symptom bullet list.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, max-width 720px]
"You've Seen What AI Can Do. You've Also Seen What Happens
 When It Doesn't Work."

[32px gap]

[BODY TEXT -- 17px, 400, neutral-300, line-height 1.7, max-width 720px]
[Full problem copy from sales-page-systems.md Section 1]

[STAT CALLOUT -- inline, large]
"42%" in 48px, 700, accent gold, inline with surrounding text flow.
"of companies abandoned AI projects in 2025."
[This stat should visually pop -- either as a pull-quote style callout
 or bold inline with surrounding body text]

[32px gap]

[BOLD STATEMENT -- 20px, 600, white, max-width 720px]
"That's the Prototype Graveyard. And it's where most AI investment ends up."

[32px gap]

[SYMPTOM LIST -- bg-neutral-900, border-neutral-800, rounded-lg, p-8]
[H3: 20px, 600, white] "The symptoms look like this:"
[16px gap]
[Bullet list -- 5 items]
- Custom bullet: small dash or warning icon in neutral-500
- Text: 15px, neutral-400
- Spacing: 12px between items

[96px bottom padding]
```

### Stat Callout Specification

| Property | Spec | Tailwind |
|----------|------|----------|
| Layout | Centered, standalone block between body paragraphs | `text-center py-8` |
| Value | 48px, 700, accent gold | `text-[48px] font-bold text-accent` |
| Context | 17px, 400, neutral-300, below value | `text-[17px] text-neutral-300 mt-2` |

### Responsive Behavior
- Mobile: Headline 28px. Body 16px. Stat callout 40px. Symptom list full-width. Padding: 64px.

---

## 5. SECTION 3 -- AGITATION

### Purpose
Quantify the cost of inaction. Move from "I've seen this happen" (Problem) to "this is what it's costing me right now" (Agitation). The Klarna example provides concrete proof that the right approach works.

### Layout
- **Type**: Contained (1200px). Text block + bullet list of ongoing costs.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, max-width 720px]
"The Cost of Getting This Wrong"

[32px gap]

[BODY -- 17px, 400, neutral-300, max-width 720px]
"Every month without the right AI implementation is a month where:"

[16px gap]

[COST BULLET LIST -- 4 items]
- Bullets styled as accent gold dashes
- Text: 17px, neutral-300
- Spacing: 16px between items
[Full cost bullets from sales-page-systems.md Section 2]

[32px gap]

[KLARNA EXAMPLE BLOCK -- bg-neutral-900, border-neutral-800, rounded-lg, p-8, max-width 720px]
[Body, 17px, neutral-300]
"Klarna's AI handles 2.3 million customer service conversations..."
[Bold key phrase in white]

[32px gap]

[BOLD STATEMENTS -- 20px, 600, white, max-width 720px]
"The gap isn't between companies that have AI and companies that don't.
 The gap is between companies that implemented it right and companies that didn't."

[32px gap]

[HOURGLASS CLOSER -- using variation ADDED 2026-03-11]
[Body, 17px, neutral-300, max-width 720px]
"And that gap is not static. It widens every month..."
"AI doesn't just save time. It compounds time into competitive distance."

[BOLD: 20px, 600, white]
"Every week without the right system is a week that doesn't come back."

[96px bottom padding]
```

**Copy decision**: Using the hourglass agitation variation (ADDED 2026-03-11) as the section closer. The "compounds time into competitive distance" language is perfect for B2B decision-makers who think in competitive terms.

### Decorative Elements
- **Hourglass icon**: Small (24px), accent gold, positioned inline before "Every week without the right system..." bold statement.

### Responsive Behavior
- Mobile: Headline 28px. Body 16px. Klarna block full-width. Padding: 64px.

---

## 6. SECTION 4 -- SOLUTION

### Purpose
Transition from pain to mechanism. Introduce the Revenue-First Framework and the AI Revenue Audit as the structured starting point. This is where the chess narrative enters -- the framework is a strategic architecture.

### Layout
- **Type**: Contained (1200px). Text block + three-question framework display.
- **Background**: `bg-neutral-950` (#0A0A0A).
- **Decorative**: Chess grid texture at 2-3% opacity behind the entire section.

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500]
"THE APPROACH"

[16px gap]

[HEADLINE -- H2: 42px, 600, white]
"We Build AI Systems Using the Revenue-First Framework."

[32px gap]

[OPENING -- using chess variation ADDED 2026-03-11]
[Body, 17px, neutral-300, max-width 720px]
"The Revenue-First Framework is not a checklist. It's a strategic architecture.

 A skilled chess player doesn't move pieces randomly and hope for a win.
 Every piece has a role. Every move builds toward a position...

 That's exactly how we approach AI implementation."

[BOLD: 20px, 600, white]
"We don't just build AI. We architect revenue."

[48px gap]

[FRAMEWORK QUESTIONS -- 3-column card grid]
[grid grid-cols-1 md:grid-cols-3 gap-6]

+--QUESTION 1--------+  +--QUESTION 2--------+  +--QUESTION 3--------+
| bg-neutral-900      |  | bg-neutral-900      |  | bg-neutral-900      |
| border-neutral-800  |  | border-neutral-800  |  | border-neutral-800  |
| rounded-lg, p-6     |  | rounded-lg, p-6     |  | rounded-lg, p-6     |
|                     |  |                     |  |                     |
| [Number: "01"       |  | [Number: "02"       |  | [Number: "03"       |
|  32px, 700, accent] |  |  32px, 700, accent] |  |  32px, 700, accent] |
|                     |  |                     |  |                     |
| [Question:          |  | [Question:          |  | [Question:          |
|  17px, 600, white]  |  |  17px, 600, white]  |  |  17px, 600, white]  |
| "Where does AI      |  | "What's the         |  | "What gets built    |
|  create the         |  |  expected ROI of    |  |  first to generate  |
|  highest-leverage   |  |  each implementa-   |  |  the fastest        |
|  revenue impact?"   |  |  tion?"             |  |  return?"           |
+---------------------+  +---------------------+  +---------------------+

[32px gap]

[CLOSING -- 17px, 400, neutral-300, max-width 720px]
"We don't write a line of code until that map exists.

 This is the Revenue-First AI Framework. It's what separates implementations
 that generate measurable results from implementations that become expensive
 technical projects with nothing to show for them."

[96px bottom padding]
```

**Copy decision**: Using the chess variation solution opening (ADDED 2026-03-11). The chess player metaphor works powerfully here because it establishes the framework as intentional, strategic architecture -- exactly what this ICP needs to hear after experiencing chaotic, unstructured AI implementations.

### Decorative Elements
- **Chess knight icon**: Small (32px), accent gold, positioned above or beside the section label "THE APPROACH".
- **Chess grid texture**: 2-3% opacity behind entire section. Gradient mask fading at top and bottom edges.

### Responsive Behavior
- Mobile: Framework questions stacked vertically, numbered (01, 02, 03). Chess grid texture hidden. Padding: 64px.

---

## 7. SECTION 5 -- SERVICE OFFERINGS

### Purpose
Show what we actually build. Make it tangible and specific. Each service type should feel like a real product, not a vague capability.

### Layout
- **Type**: Contained (1200px). Two-column grid of service cards.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"WHAT WE BUILD"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"AI Systems That Connect to Revenue"

[48px gap]

[SERVICE GRID -- grid grid-cols-1 md:grid-cols-2 gap-6, max-width 1000px, centered]

+---AI SALES AGENT--------+  +---AI SUPPORT SYSTEM------+
| bg-neutral-900            |  | bg-neutral-900            |
| border-neutral-800        |  | border-neutral-800        |
| rounded-lg, p-8           |  | rounded-lg, p-8           |
|                           |  |                           |
| [Hourglass icon, 32px,    |  | [Hourglass icon, 32px,    |
|  accent gold]             |  |  accent gold]             |
|                           |  |                           |
| [H4: "AI Sales Agent"     |  | [H4: "AI Customer         |
|  20px, 600, white]        |  |  Support System"           |
|                           |  |  20px, 600, white]        |
| [Body: 15px, neutral-400] |  | [Body: 15px, neutral-400] |
| [Description from copy]   |  | [Description from copy]   |
|                           |  |                           |
| [Metric line, 13px,       |  | [Metric line, 13px,       |
|  accent-muted, italic]    |  |  accent-muted, italic]    |
| "Typical results:         |  | "Typical results:         |
|  [METRIC]..."             |  |  [METRIC]..."             |
+---------------------------+  +---------------------------+

+---LEAD QUALIFICATION-----+  +---OPERATIONAL AUTOMATION--+
| [Same card structure]     |  | [Same card structure]     |
+---------------------------+  +---------------------------+

+---KNOWLEDGE BASE AI------+  +---CUSTOM INTEGRATIONS-----+
| [Same card structure]     |  | [Same card structure]     |
+---------------------------+  +---------------------------+

[96px bottom padding]
```

**Copy decision**: Using the hourglass "time returned" frames (ADDED 2026-03-12) as supplementary descriptions within each service card. The original service descriptions remain as the primary text, with the time-returned framing added as a secondary value line below the metrics. This reinforces the hourglass theme without replacing the clear, specific service descriptions.

### Service Card Specifications

| Property | Spec | Tailwind |
|----------|------|----------|
| Background | `#141414` | `bg-neutral-900` |
| Border | `#262626` | `border border-neutral-800 rounded-lg` |
| Padding | 32px | `p-8` |
| Hover | Border lightens, bg shifts | `hover:border-neutral-700 hover:bg-neutral-850 transition-colors duration-200` |
| Icon | Hourglass, 32px, accent gold | `h-8 text-accent mb-4` |
| Title | 20px, 600, white | `text-xl font-semibold text-white mb-3` |
| Description | 15px, 400, neutral-400 | `text-[15px] text-neutral-400 leading-relaxed mb-4` |
| Metric line | 13px, 500, accent-muted, italic | `text-[13px] font-medium text-accent-muted italic` |

### Decorative Elements
- **Hourglass icon**: Each service card uses a small hourglass icon (32px, accent gold) as its card icon. This creates visual consistency and reinforces the time-return value proposition across all services.

### Responsive Behavior
- Mobile: Single column, stacked. Full-width cards. Padding: 64px.
- Tablet: 2-column grid maintained.

---

## 8. SECTION 6 -- PROCESS

### Purpose
Transparency builds trust. Show the exact 7-step process from audit to 60-day performance window. This ICP is analytical -- they want to know exactly how it works before committing.

### Layout
- **Type**: Contained (1200px). 7-step Process/Steps component.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500]
"HOW IT WORKS"

[16px gap]

[HEADLINE -- H2: 42px, 600, white]
"How a Reis IA Systems Project Works"

[48px gap]

[7-STEP PROCESS -- Process/Steps component, brand identity Section 6K]

Step 1: "AI Revenue Audit (Week 1)"
  -- Using hourglass variation (ADDED 2026-03-11):
     "Before a single system is built, we do something most AI vendors
      skip entirely: we figure out where the money is..."
     "the most expensive thing in any AI project is not the technology.
      It's the time lost building the wrong thing."
  -- Hourglass icon (24px, accent gold) beside step number

Step 2: "Implementation Plan (Week 1-2)"
Step 3: "Build (Weeks 2-6)"
Step 4: "Integration and Testing (Weeks 4-7)"
Step 5: "Launch and Optimization (Weeks 6-8+)"
Step 6: "Team Training and Handoff"
Step 7: "60-Day Performance Window"

Each step uses the Process/Steps layout:
+--STEP BLOCK---------------------------------------------------+
| [Step number: "01" -- 48px, 700, accent gold, left column]    |
|                                                                |
| [Title -- H4: 24px, 600, white] "AI Revenue Audit"            |
| [Timeline badge -- "WEEK 1"]                                   |
|                                                                |
| [Body -- 16px, 400, neutral-400, max-width 600px]             |
| [Step description from copy]                                   |
|                                                                |
| [Bullet list if applicable]                                    |
|                                                                |
| [Connector line -- 1px solid #262626, vertical to next step]   |
+----------------------------------------------------------------+

[96px bottom padding]
```

**Copy decision**: Using the hourglass variation for Step 1 (ADDED 2026-03-11). The line "the most expensive thing in any AI project is not the technology. It's the time lost building the wrong thing." is a powerful reframe for this ICP and positions the audit as protecting their most valuable resource. Original copy for Steps 2-7.

### Step Block Specifications

Per brand identity Section 6K:

| Property | Spec | Tailwind |
|----------|------|----------|
| Step number | 48px, 700, accent gold | `text-[48px] font-bold text-accent` |
| Step title | 24px, 600, white | `text-2xl font-semibold text-white` |
| Timeline badge | Badge spec, neutral-500 background | 12px, uppercase, `bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded text-xs` |
| Description | 16px, 400, neutral-400, max-width 600px | `text-base text-neutral-400 leading-relaxed max-w-[600px]` |
| Connector line | 1px solid #262626 | `border-l border-neutral-800` |
| Layout desktop | Number left (80px column), content right | `grid grid-cols-[80px_1fr] gap-6` |

### Responsive Behavior
- Mobile: Steps stacked vertically, number above content. Connector line on left side. Padding: 64px.

---

## 9. SECTION 7 -- RESULTS / PROOF

### Purpose
This is the highest-priority section for this ICP. They buy on proof, not promises. Case studies and market validation stats must be immediately credible and metric-specific.

### Layout
- **Type**: Contained (1200px). Two case study blocks + market validation stats.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"RESULTS"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"What Happens When AI Is Implemented Right"

[48px gap]

[CASE STUDY 1 -- Lead Qualification]
[Two-column split: metrics left (5 cols), story right (7 cols)]

+-METRICS COLUMN---------+  +-STORY COLUMN---------------------------+
| bg-neutral-900          |  | [Company: "B2B Company Placeholder"    |
| border-neutral-800      |  |  -- 13px, uppercase, neutral-500]       |
| rounded-l-lg, p-8       |  | [Industry -- 14px, neutral-400]        |
|                         |  |                                         |
| [METRIC 1]              |  | [H3: "The situation:" 20px, 600, white]|
| "[METRIC]%"             |  | [Body: 16px, neutral-300, story text]  |
| 48px, 700, accent gold  |  |                                         |
| "improvement in         |  | [H3: "What we built:" 20px, 600, white]|
|  sales-ready leads"     |  | [Body: 16px, neutral-300]               |
| 13px, neutral-500       |  |                                         |
|                         |  | [H3: "Result:" 20px, 600, white]       |
| [METRIC 2]              |  | [Bullet list with metrics in white]    |
| "[METRIC]"              |  |                                         |
| 48px, 700, white        |  | [TESTIMONIAL -- blockquote style]      |
| "hours/week returned"   |  | [Per brand identity Section 6H]        |
| 13px, neutral-500       |  |                                         |
+-------------------------+  +-----------------------------------------+

[32px gap]

[CASE STUDY 2 -- Customer Support]
[Same structure, reversed: story left, metrics right]

[48px gap]

[MARKET VALIDATION STATS -- 3-column stat block]
[Per brand identity Section 6L]

+---------+---------+---------+
|  91%    |  67%    |  74%    |
| of SMBs | success | achieve |
| report  | rate    | ROI     |
| revenue | for     | within  |
| boosts  | special-| year    |
|         | ists    | one     |
+---------+---------+---------+

[96px bottom padding]
```

All case study content is placeholder. Display with clear "[PLACEHOLDER]" indicators.

### Case Study Block Specifications

| Property | Spec |
|----------|------|
| Container | `bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden` |
| Layout | Two-column grid: `grid grid-cols-1 lg:grid-cols-12` |
| Metrics column | `lg:col-span-5 p-8 lg:p-12` |
| Story column | `lg:col-span-7 p-8 lg:p-12 border-l border-neutral-800` |
| Metric value | 48px, 700, accent gold or white |
| Metric label | 13px, uppercase, neutral-500, tracking-widest |
| Story headings | 20px, 600, white |
| Story body | 16px, 400, neutral-300 |

### Responsive Behavior
- Mobile: Case study blocks stacked -- metrics on top, story below. Stats 3-column maintained (values at 32px on mobile). Padding: 64px.

---

## 10. SECTION 8 -- QUALIFIER

### Purpose
Self-selection filter. This ICP appreciates being told "this is for companies like yours" and "this is NOT for companies like these." Increases trust through honesty.

### Layout
- **Type**: Contained (1200px). Two-column split: For / Not For.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

Same structure as Builder qualifier section. See `page-builder.md` Section 7.

**Differences**:
- Title: "Is Reis IA Systems the Right Fit?"
- "For" list: 6 items (from systems copy Section 7)
- "Not For" list: 5 items (from systems copy Section 7)

### Responsive Behavior
- Mobile: Stacked, "For" on top.

---

## 11. SECTION 9 -- PRICING

### Purpose
Make investment concrete with price ranges. Frame ranges as a feature ("exact scoping happens after the audit"), not a weakness. Three packages from entry-level to ongoing relationship.

### Layout
- **Type**: Contained (1200px). 3-column pricing grid.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"INVESTMENT"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"Choose Your Starting Point"

[48px gap]

[3-COLUMN PRICING GRID -- grid grid-cols-1 md:grid-cols-3 gap-8]

+---STARTER---------+  +--FULL IMPLEMENT---+  +---RETAINER--------+
| bg-neutral-900     |  | bg-neutral-900     |  | bg-neutral-900     |
| border-neutral-800 |  | border-accent/20   |  | border-neutral-800 |
| rounded-lg, p-8    |  | bg-accent/[0.03]   |  | rounded-lg, p-8    |
|                    |  | rounded-lg, p-8    |  |                    |
|                    |  | [RECOMMENDED badge]|  |                    |
| [Label: "STARTER"] |  | [Label: "FULL      |  | [Label: "RETAINER"]|
|                    |  |  IMPLEMENTATION"]  |  |                    |
| [Price:]           |  | [Price:]           |  | [Price:]           |
| "$2,000-$5,000"    |  | "$5,000-$20,000"   |  | "$1,000-$3,000"    |
| [42px, 700, white] |  | [42px, 700, white] |  | [42px, 700, white] |
| [per project]      |  | [per project]      |  | [/month]           |
|                    |  |                    |  |                    |
| [Feature list:]    |  | [Feature list:]    |  | [Feature list:]    |
| - AI Revenue Audit |  | - Full AI Revenue  |  | - Ongoing          |
|   (included)       |  |   Audit (included) |  |   optimization     |
| - Single AI agent  |  | - 2-5 AI agents    |  | - Monitoring       |
| - 2 weeks post-    |  | - Full integration |  | - Maintenance      |
|   launch           |  | - Custom prompt    |  | - New additions    |
| - Team training    |  |   engineering      |  |                    |
| - 30-day support   |  | - 4 weeks post-    |  |                    |
| - "Works or We     |  |   launch           |  |                    |
|   Fix It"          |  | - Team training    |  |                    |
|   guarantee        |  | - 60-day priority  |  |                    |
|                    |  |   support          |  |                    |
|                    |  | - Monthly reports  |  |                    |
|                    |  | - Network access   |  |                    |
|                    |  | - 60-day guarantee |  |                    |
|                    |  |                    |  |                    |
| [Best for: text]   |  | [Best for: text]   |  | [Post-project      |
|                    |  |                    |  |  continuity]       |
| [SECONDARY CTA:    |  | [PRIMARY CTA:      |  | [GHOST CTA:        |
|  "Book Your AI     |  |  "Book Your AI     |  |  "Discuss After    |
|   Revenue          |  |   Revenue          |  |   Implementation   |
|   Assessment -->"] |  |   Assessment -->"] |  |   -->"]            |
+--------------------+  +--------------------+  +--------------------+

[32px gap]

[PRICING NOTE -- 15px, 600, white, centered]
"Pricing Is Fixed -- Not Hourly"

[12px gap]

[Body -- 15px, 400, neutral-400, centered, max-width 600px]
"We price by outcome, not by time. You know the investment upfront.
 No surprises, no scope creep that inflates your bill."

[96px bottom padding]
```

### Pricing Card Specifications

Same as Builder pricing cards (see `page-builder.md` Section 11). The "Full Implementation" card is highlighted with accent border and subtle background tint.

**Key difference from Builder**: All CTAs on this page lead to the AI Revenue Audit booking, not an application form. The audit is the entry point for all pricing tiers.

### Responsive Behavior
- Mobile: Cards stacked in order: Starter, Full Implementation, Retainer. Padding: 64px.

---

## 12. SECTION 10 -- GUARANTEE

### Purpose
Remove risk. Two separate guarantees for the two main packages. Clean, straightforward, no fine print.

### Layout
- **Type**: Contained (1200px). Two-column guarantee cards.
- **Background**: `bg-neutral-950` (#0A0A0A).

### Content and Placement

**Desktop**:

```
[96px top padding]

[HEADLINE -- H2: 42px, 600, white, centered]
"We Back Every Implementation with a Performance Guarantee"

[48px gap]

[TWO-COLUMN GRID -- grid grid-cols-1 md:grid-cols-2 gap-8]

+---STARTER GUARANTEE--------+  +---FULL IMPLEMENTATION------+
| bg-neutral-900              |  | bg-neutral-900              |
| border-neutral-800          |  | border-accent/20            |
| rounded-lg, p-8             |  | rounded-lg, p-8             |
|                             |  |                             |
| [Shield icon, 32px,         |  | [Shield icon, 32px,         |
|  green-500]                 |  |  accent gold]               |
|                             |  |                             |
| [H3: "Works or We Fix It"   |  | [H3: "60-Day Optimization   |
|  24px, 600, white]          |  |  Window" 24px, 600, white]  |
|                             |  |                             |
| [Body: 16px, neutral-300]   |  | [Body: 16px, neutral-300]   |
| [Starter guarantee copy]    |  | [Full guarantee copy]       |
+-----------------------------+  +-----------------------------+

[32px gap]

[CLOSING -- 17px, 400, neutral-300, centered, max-width 640px]
"We offer these guarantees because we start every implementation with
 a clear definition of what success looks like. The Revenue-First Audit
 eliminates the ambiguity that kills most AI projects."

[96px bottom padding]
```

### Responsive Behavior
- Mobile: Guarantee cards stacked. Padding: 64px.

---

## 13. SECTION 11 -- FAQ

### Purpose
Critical for this ICP. Analytical decision-makers need objections answered in writing before they will book a call. This section is not optional -- it is a conversion requirement.

### Layout
- **Type**: Contained (1200px). FAQ accordion component. Max-width 800px, centered.
- **Background**: `bg-black` (#000000).

### Content and Placement

**Desktop**:

```
[96px top padding]

[SECTION LABEL -- 13px, uppercase, tracking-widest, neutral-500, centered]
"FAQ"

[16px gap]

[HEADLINE -- H2: 42px, 600, white, centered]
"Common Questions About AI Implementation"

[48px gap]

[FAQ ACCORDION -- max-width 800px, centered]
Per brand identity Section 6I.

7 questions from sales-page-systems.md Section 10:

1. "What if we tried AI before and it didn't work?"
2. "Will this integrate with our existing systems?"
3. "How long before we see results?" -- Using hourglass variation (ADDED 2026-03-12)
4. "What happens to our data? Is it secure?"
5. "What if something breaks after handoff?"
6. "Do we need clean data to start?"
7. "Can we scale after the initial implementation?"

[96px bottom padding]
```

**Copy decision**: Using the hourglass FAQ variation for question 3 "How long before we see results?" (ADDED 2026-03-12). This variation reframes the time question from "when do I get results" to "every week without the right system is costing you" -- a more powerful answer for this analytical ICP. Original answers for all other questions.

### FAQ Accordion Specifications

Per brand identity Section 6I:

| Property | Spec | Tailwind |
|----------|------|----------|
| Container | No border, separated by 1px #262626 lines | |
| Question row | 18px, 600, white, py-6, cursor pointer | `text-lg font-semibold text-white py-6 cursor-pointer` |
| Expand icon | Plus/minus, 20px, neutral-500, right-aligned | `text-neutral-500 text-xl` |
| Answer | 16px, neutral-400, line-height 1.7, pb-6 | `text-base text-neutral-400 leading-relaxed pb-6` |
| Animation | 300ms ease-out, slide down + opacity fade | `transition-all duration-300 ease-out` |
| Divider | 1px solid #262626 between items | `border-b border-neutral-800` |

**First question should be open by default** to show that answers exist and are substantive.

### Responsive Behavior
- Mobile: Same layout, full-width. Question text 16px. Padding: 64px.

---

## 14. SECTION 12 -- FINAL CTA

### Purpose
Lowest-friction close. The AI Revenue Audit is positioned as valuable regardless of next steps -- the visitor gets a written report even if they don't proceed. This removes the "will I be pressured to buy" objection.

### Layout
- **Type**: Full-width, centered text block.
- **Background**: `bg-neutral-950` (#0A0A0A).
- **Decorative**: Combined hourglass (background watermark, 300px, 3% opacity) and subtle chess grid texture (2% opacity) behind the content.

### Content and Placement

**Desktop**:

```
[96px top padding]

                    [HOURGLASS: 300px, 3% opacity, absolute centered,
                     pointer-events-none, z-0]
                    [Chess grid texture: 2% opacity, gradient-masked edges]

[CONTENT z-10, relative, max-width 720px, centered]

[Using combined chess/hourglass variation (ADDED 2026-03-11)]

[HEADLINE -- H2: 42px, 600, white, centered]
"Start With the Move That Changes Everything."

[24px gap]

[BODY -- 17px, 400, neutral-300, centered]
"Every chess game has a first move that sets the position for everything
 that follows.

 In AI implementation, that move is the Revenue Audit.

 It takes 60 minutes. It maps the opportunity before you spend a dollar.
 And it gives you something no AI vendor demo can give you: a clear
 picture of what to build, what it costs, and what it returns.

 The companies that implement AI right don't move faster. They move
 smarter. They ask the right question first. They build what generates
 revenue, not what looks impressive."

[BOLD: 20px, 600, white, centered]
"That's where this starts."

[40px gap]

[PRIMARY CTA -- Hero variant, centered]
"Book Your Free AI Revenue Assessment -->"

[12px gap]

[MICROCOPY -- 13px, neutral-500, centered]
"60 minutes. A written report. A clear first move."

[32px gap]

[SECONDARY CTA -- Ghost button, centered]
"Or, if you're ready to talk about a specific implementation:
 Schedule a Systems Consultation -->"

[96px bottom padding]
```

**Copy decision**: Using the combined chess/hourglass final CTA variation (ADDED 2026-03-11). The "first move" chess metaphor perfectly frames the audit as the strategic starting point. The "60 minutes. A written report. A clear first move." microcopy is a triple-beat that communicates low effort, high value, and strategic framing in nine words.

### Decorative Elements
- **Hourglass watermark**: 300px, accent gold, 3% opacity, centered behind content. `pointer-events-none`. Hidden on mobile.
- **Chess grid texture**: 2% opacity, gradient-masked at edges. Visible behind the entire section. Hidden on mobile.
- **Radial glow**: Subtle accent gold (3% opacity, 400px radius) centered on the CTA button.

### Responsive Behavior
- Mobile: Headline 28px. Body 16px. CTAs stacked, full-width, primary on top. Hourglass and chess grid hidden. Padding: 64px.

---

## 15. FOOTER

Same as home page footer. See `page-home.md` Section 11.

---

## 16. HOURGLASS / CHESS PLACEMENT MAP

### Hourglass Placements (7 instances -- this is the hourglass-dominant page)
1. **Hero**: Hourglass icon (80px, accent gold) as featured decorative element, right side.
2. **Agitation**: Hourglass icon (24px) inline. Hourglass variation closer ("compounds time into competitive distance").
3. **Service Offerings**: Hourglass icon (32px, accent gold) as icon for each of the 6 service cards.
4. **Process Step 1**: Hourglass icon (24px) beside step number. Hourglass variation copy ("the most expensive thing... is the time lost building the wrong thing").
5. **FAQ Q3**: Hourglass variation answer about time cost.
6. **Final CTA**: Hourglass watermark (300px, 3% opacity, background). "60 minutes" microcopy.
7. **Footer CTA area** (if applicable): Continues from Final CTA section.

### Chess Placements (3 instances)
1. **Solution**: Chess knight icon (32px) beside section label. Chess variation opening copy ("A skilled chess player doesn't move pieces randomly..."). Chess grid texture behind section.
2. **Final CTA**: Chess metaphor in copy ("Every chess game has a first move..."). Chess grid texture behind section.
3. **Solution framework questions**: Numbered cards (01, 02, 03) echo the structured "moves" chess metaphor.

### Balance Assessment
This page is intentionally hourglass-heavy. The Systems pillar is about time savings, operational efficiency, and implementation -- all hourglass territory. Chess appears strategically in the Solution section (introducing the framework) and Final CTA (positioning the audit as the first move). The ratio is approximately 7:3 hourglass-to-chess, which matches the pillar's narrative emphasis.

---

## 17. CTA STRATEGY

### Primary CTA
"Book Your Free AI Revenue Assessment -->" / "Book a Free AI Revenue Assessment -->" -- appears in Hero, Pricing section, and Final CTA. Always primary button style (accent gold). Destination: Cal.com booking link.

This is a fundamentally different CTA strategy from the Builder page. Builder asks for an application (higher commitment, gated). Systems asks for a booking (lower commitment, open). The audit IS the sales conversation for Systems -- it demonstrates the methodology and qualifies the lead simultaneously.

### Secondary CTA
"Schedule a Systems Consultation -->" -- appears only in the Final CTA section as a ghost button. For prospects who already know what they want built and don't need the audit framing.

### CTA Frequency
The primary CTA appears in the hero, pricing section, and final CTA. Given the analytical nature of this ICP, fewer but more strategically placed CTAs are better than persistent repetition. This audience does not respond well to aggressive CTA frequency -- it triggers their "being sold to" alarm.

---

## 18. MOBILE-FIRST NOTES

1. **Hero headline must work at 40px on 375px width**. The recommended headline ("Your AI project didn't fail because the technology doesn't work. / It failed because nobody asked the right question first.") will span 3-4 lines at 40px mobile. This is acceptable for this ICP -- they will read longer headlines.

2. **FAQ is critical on mobile**. All 7 questions must be accessible and the accordion must work cleanly on touch devices. First question open by default.

3. **Service cards**: Single column on mobile, full-width. All 6 cards stack. Consider adding a horizontal scroll option for tablet to reduce page length.

4. **Process steps**: Vertical layout with connector line on left. Step numbers above content.

5. **Case study blocks**: Stacked -- metric block on top, story below. Metrics should be clearly visible as the first thing the user sees for each case study.

6. **Pricing cards**: Stacked in priority order: Starter > Full Implementation > Retainer. Full Implementation gets visual prominence even when stacked.

7. **Touch targets**: All interactive elements (FAQ accordion, CTA buttons) minimum 44px height.

8. **Section padding**: 64px vertical on mobile (vs 96px desktop).

---

## DEVELOPER NOTES

### Astro Component Structure (Suggested Additions)

```
src/
  components/
    FaqAccordion.astro       -- FAQ accordion with open/close animation
    ServiceCard.astro        -- Service offering card
    CaseStudyBlock.astro     -- Two-column case study (shared with home page)
    ProcessStep.astro        -- 7-step process block (shared structure with Builder modules)
    GuaranteeCard.astro      -- Guarantee display card
    FrameworkQuestion.astro  -- Numbered question card (Solution section)
  pages/
    systems.astro            -- Systems service page (this spec)
```

### Reusable Components
Several components are shared between pages:
- `StatBlock` -- used on home and systems
- `CaseStudyBlock` -- used on home and systems
- `QualifierGrid` -- used on builder and systems
- `PricingCard` -- used on builder and systems (different content, same component)
- `ProcessStep` -- systems process and builder modules share the same visual pattern

### FAQ Implementation
The FAQ accordion requires client-side JavaScript. Implement as a React island in Astro:
- Default first item open
- Smooth height animation (300ms ease-out)
- Plus/minus icon rotation (45deg to form X)
- Accessible: use `<details>` and `<summary>` HTML elements as the base, enhanced with JS animation

### Placeholder Management
This page has more placeholders than the Builder page:
- 2 full case study blocks with metrics, company names, testimonials
- 6 service cards with "[METRIC]" result lines
- All are marked as `[PLACEHOLDER]` in the copy

Build components to accept dynamic content. Consider a data file (JSON or YAML) that holds all placeholder content, making it easy to swap in real data when available.

### Performance Notes
- FAQ accordion: Use `<details>/<summary>` for no-JS fallback. Enhance with animation.
- Service cards: Consider lazy-loading the bottom 4 cards if page length becomes a concern.
- Chess grid texture: Use CSS-only implementation (see brand identity Section 5G) -- no image files.
- Hourglass watermark in final CTA: Inline SVG, not an image file.

---

*Produced by: designer-agent*
*Copy source: brain/assets/copy/sales-page-systems.md (read-only)*
*Brand reference: brain/assets/brand-identity.md*
*Context: brain/context/phase1-context-summary.md*
