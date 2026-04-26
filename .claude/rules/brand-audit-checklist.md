# Brand Audit Checklist — Reis IA

> Used by: designer-agent, reviewer (Phase 10 of Protocolo Branding)
> Purpose: Systematic audit of all brand touchpoints for consistency

---

## 1. Visual Identity Audit

### Color System
- [ ] Primary palette (#000000, #FFFFFF, #4A90FF) used correctly across all pages
- [ ] Sub-brand colors applied only in their layer (Builders: #2D7AFF/#00B4FF, Systems: minimal blue, Moroni: #6AADFF)
- [ ] No prohibited colors present (gold, amber, terracotta)
- [ ] Dark mode default on all pages — no light mode, no theme toggle
- [ ] Blue accent opacity consistent (not random rgba values)

### Typography
- [ ] Inter font loaded and rendering correctly (all weights: 300-700)
- [ ] Heading hierarchy consistent (H1 > H2 > H3, no skipped levels)
- [ ] "REIS" in white, "[IA]" in accent blue, font-weight 300 (light) in all wordmark instances
- [ ] Reading level 8th-10th grade for customer-facing content
- [ ] No competing fonts or unexpected font-weight usage

### Spacing & Layout
- [ ] Consistent section padding follows design system tokens
- [ ] 12-column grid on desktop, 4-column on mobile
- [ ] Max content width 1200px
- [ ] Generous whitespace — premium feel maintained
- [ ] Mobile-first responsive working correctly (375px → 1280px+)

### Brand Elements
- [ ] H1-B Hourglass present at least once per page (optional decorative)
- [ ] Z7 Symbol present in Builders/methodology content
- [ ] No chess pieces, crowns, knights, or any chess imagery
- [ ] No emojis in UI or formal content
- [ ] Minimal geometric aesthetic maintained (no ornate or decorative elements)

### Logo & Marks
- [ ] Favicon: blue bg + black H1-B mark, stroke-width correctly set
- [ ] Wordmark renders correctly at all sizes
- [ ] No distortion, incorrect colors, or unauthorized mark variations

---

## 2. Voice & Tone Audit

### Brand Voice Compliance
- [ ] Consultivo premium tone — reads like strategic partner, not salesperson
- [ ] C-level appropriate — speaks to business decision-makers, not tech teams
- [ ] Zero academicism — no "outrossim", "destarte", "no que tange"
- [ ] No unnecessary anglicisms
- [ ] Passes identity test: "Would I know this is Reis IA if the name were hidden?"

### Humanization Check
- [ ] No prohibited words from humanization-rules.md
- [ ] Rhythm variety — short/long/fragment mix
- [ ] No 5+ items starting with same grammatical structure
- [ ] No generic AI openings ("No mundo atual de...")
- [ ] Reads naturally aloud (Brazilian executive would say this)

### Voice Profile Alignment
- [ ] Content matches loaded voice profile (personal/company/builders)
- [ ] Signature phrases used where appropriate
- [ ] Anti-patterns absent
- [ ] Tone spectrum matches the channel (LinkedIn ≠ sales page ≠ email)

---

## 3. CTA & Conversion Audit

- [ ] All CTAs route to /agendar or /aplicar ONLY
- [ ] No pricing tables, tier cards, or SaaS pricing patterns
- [ ] No self-serve checkout or subscription flows
- [ ] CTAs clear and actionable
- [ ] "O Tempo e Rei" used decoratively only (footer/watermarks), never as headline

---

## 4. Motion & Interaction Audit

- [ ] Animations respect prefers-reduced-motion
- [ ] 60fps performance on target devices
- [ ] Hardware-adaptive rendering (full/reduced/minimal tiers)
- [ ] No janky scroll-triggered animations
- [ ] Micro-interactions reinforce brand (not decorative noise)
- [ ] Easing curves match design system (base, out, in, dramatic, card)

---

## 5. Design System Compliance

- [ ] All tokens reference the master design system (no magic numbers)
- [ ] Component variants follow spec (buttons, cards, forms)
- [ ] Shadow system correct (ambient glow, grain where specified)
- [ ] Container/layout matches design system rules
- [ ] No inline styles that should be tokens

---

## 6. Cross-Platform Consistency

- [ ] Website matches brandbook specifications
- [ ] Hub platform follows same visual language
- [ ] Social media templates aligned with brand
- [ ] Email templates (if any) use brand tokens
- [ ] All sub-projects share the same foundational tokens

---

## Scoring

Each section scores PASS / BLOCK / N/A:
- **PASS**: All items checked, no violations
- **BLOCK**: Any unchecked item = specific fix required
- **N/A**: Section not applicable to this touchpoint

**Overall Verdict**:
- ALL sections PASS → Brand Audit APPROVED
- Any section BLOCK → Remediation required, re-audit after fix
