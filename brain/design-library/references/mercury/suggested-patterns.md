# Mercury — Suggested Patterns

Source: https://mercury.com
Harvested: 2026-04-15

## Pattern 1 — `patterns/typography/serif-sans-editorial-pairing.md`

- **Category**: typography
- **Rationale**: A display serif paired with a disciplined sans for body creates the "private bank prospectus" gravity that pure-sans sites cannot reach. This would be a brand-lock amendment for REIS — currently Inter-only. The pattern file should document: when to use the serif (H1/H2 on home + case studies only), when not to (UI labels, hub interface, marketing CTAs), and candidate serifs (GT Sectra, Domaine Display, Tiempos Headline).
- **File/line hints**: N/A — this is a philosophy pattern documented against visual signature. **Requires orchestrator escalation to brand-strategist before adoption**.

## Pattern 2 — `patterns/layout/generous-vertical-rhythm.md`

- **Category**: layout
- **Rationale**: Codify section vertical padding at 160–200px desktop / 80–96px mobile as the REIS standard. This is more generous than Linear or Vercel and it is the spacing that separates "premium-feeling" from "merely-clean" pages. Tokens: `--section-padding-y-xl: 200px` etc.
- **File/line hints**: Mercury section containers carry oversized top/bottom padding visible in the harvested HTML class attributes.

## Pattern 3 — `patterns/layout/narrow-prose-column-in-wide-container.md`

- **Category**: layout
- **Rationale**: Methodology and case-study prose should be constrained to ~720px reading width even on wide desktop viewports. The container is wide; the text is narrow. This is editorial discipline that signals "written to be read, not skimmed". Directly applicable to REIS method sections and Moroni's personal essays.
- **File/line hints**: Mercury prose blocks use `max-width: ~680–720px` with `margin: 0 auto` inside wider section containers.
