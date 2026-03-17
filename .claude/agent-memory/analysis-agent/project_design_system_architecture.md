---
name: Design System Architecture Knowledge
description: Key architectural patterns and gaps between Reis IA and AIOX design systems, confirmed via comprehensive gap analysis (2026-03-16)
type: project
---

Reis IA Design System v1.0 strengths: 12-token fluid typography (superior to AIOX), 5-curve easing library, 5-tier shadow system, 5-tier surface system, fluid clamp() spacing.

Key gaps identified (HIGH priority): accent opacity ladder (scattered inline rgba values), signal/semantic colors (no error/warning/success tokens), icon system (none defined), KPI Card + Form Input components (missing).

**Why:** These gaps block dev-agent implementation of forms, case studies, and data display pages.

**How to apply:** When asked about design system completeness or implementation readiness, reference these gaps. When briefing dev-agent or designer-agent, highlight that the blue opacity ladder and signal colors are prerequisites for form/component work.

File paths:
- Reis IA Design System: brain/assets/design-systems/reis-ia-design-system.md
- Reis IA Implementation Guide: brain/assets/design-systems/reis-ia-implementation-guide.md
- AIOX Reference: brain/assets/design-systems/reference-aiox.md
- Gap Analysis: brain/assets/design-systems/aiox-gap-analysis.md
- AIOX Full Extraction: brain/assets/design-systems/aiox-full-extraction/ (45 files)
