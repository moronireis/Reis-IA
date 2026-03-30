---
name: Brand rename — Time Builders → Builders, Z7 removed
description: "Time Builders" was renamed to "Builders". Z7 philosophy and all Z7 branding permanently removed from the project.
type: project
---

"Time Builders" is now "Builders" across all UI. The /builder route is unchanged — only the label changed.

Z7 is permanently removed. No Z7 icons, labels, or references should appear in any new code.

**Why:** Brand simplification decision. Z7 added friction and the Time Builders name was redundant with the brand philosophy.

**How to apply:**
- Nav label: "Builders" (href /builder)
- Footer label: "Builders" (href /builder)
- MockupZ7Journey stage 2: icon shows "B", label is "Builders"
- MockupZ7Timeline header: "Programa Builders — Timeline"
- MockupTransformation header: "Transformação IA"
- Z7Icon.astro is dead code — do not import or use it in new pages
- Never write "Z7 Days", "Z7 Hours", "Z7 Months", or "Time Builders" in any new UI copy or component
