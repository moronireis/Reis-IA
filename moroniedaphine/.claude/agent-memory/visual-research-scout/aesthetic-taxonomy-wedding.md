---
name: Aesthetic Taxonomy — Wedding & Invitation Design
description: Validated aesthetic principles and tag extensions discovered across wedding mood report sessions
type: project
---

## Tags that earned their place (wedding-specific extensions)

**romantic-opulence** — The primary tag for the M&D wedding aesthetic. Not minimalism, not earthy, not gothic. Warm darkness, deep floral saturation, candlelight as light source, European formality. Validated by: Style Me Pretty burgundy collection, Valentino seasonal campaigns, Rocco Forte interiors, Junebug Weddings winter editorials.

**candlelight-warmth** — Warm tones achieved through color grading, not bright lighting. CSS equivalent: `sepia(.12) saturate(.82)` film filter + radial gold overlay at 6-8% opacity. The antique gold range (#B5902A–#D4AF37) approximates candlelight color temperature. Validated by: Ralph Lauren Romance overlay recipe, Once Wed dark florals.

**cinematic-entry** — The three-beat invitation entry: ARRIVE / HOLD / OPEN. Guest-initiated entry only — no auto-advance. Cover holds still until guest taps. Validated by: GreenEnvelope envelope ritual, Adovasio preloader.

**hold-and-release** — Intentional pacing pause before content reveal. In digital invitations: the ghost button cover that requires guest action before the card appears. The hold creates ceremony. Without it, the invitation is just a webpage. Validated by: GreenEnvelope, Boutique Weddings video hero.

## Cross-cutting principles (observed in 3+ refs, reliable)

**Dark backgrounds are the primary luxury signal in wedding design.**
The single most consistent differentiator between premium and generic wedding design. Platforms/designs that achieve premium positioning all use dark backgrounds: Gala Black, Magazine Indigo, Minted "Written In The Stars," Valentino, Dior. Darkness = sophistication when warm (burgundy, deep navy, graphite with warm undertone). Darkness = sterile when cool (pure black, blue-grey).

**Botanicals on dark = sophisticated. Botanicals on white = craft blog.**
Same botanical element changes register entirely based on background ground color. Rule: any floral/botanical ornament used on a light background reads as rustic or generic; on dark it reads as library, private estate, gothic romantic. M&D botanical SVGs on linen card body are at the warm edge of this rule — linen (#E5DFD6) is light but not white, and the 12% opacity ensures they whisper.

**Gold appears maximum 3-4 times per card (gold-as-punctuation).**
All premium references use gold rarely. Gold at couple names, gold at date numeral, gold at one thin divider line, gold at inset card border. Any more = Greek Revival napkin. M&D current spec is at the correct frequency. Do not add gold elements without removing one.

**Photo grids with size variation read as editorial; equal-size grids read as thumbnails.**
2:1:1 column ratio (`grid-template-columns: 2fr 1fr 1fr`) upgrades any 3-photo grid to editorial spread. One CSS line. Seen in Marie Guillaume masonry, Junebug editorial grids, Style Me Pretty feature layouts.

**Antique gold versus cheap gold:**
- Luxury gold: `#B5902A` to `#D4AF37` (warm amber, low saturation, slight brownish undertone)
- Cheap gold: `#FFD700` or `#F0C040` (pure saturated yellow)
- M&D palette `#D4AF37` is at the warm end of the luxury range — correct. Never derive gold values brighter than this.

**White opacity as register tuner on dark backgrounds:**
- `rgba(255,255,255,1.0)` on dark = modern/crisp
- `rgba(255,255,255,0.70–0.85)` on dark = romantic/aged
- `rgba(255,255,255,0.40–0.60)` on dark = whispered/secondary label
Apply consistently as a three-tier hierarchy system.

## Techniques that recur (steal-worthy)

**Film filter as visual identity unifier:** single CSS filter applied to all `<img>` and `<video>` makes photos from different sessions feel like one editorial roll. M&D filter: `sepia(.12) saturate(.82) contrast(.90) brightness(1.03)`. For aerial/drone footage test: `sepia(.08) saturate(.90) contrast(.88) brightness(1.04)` to prevent sky yellowing.

**Close-then-wide venue sequence:** for venue video sections, show extreme detail close (stonework, archway, water surface, window fragment) BEFORE the wide establishing shot. Sequence: atmosphere → scale. Reverse of the instinctive wide-first approach.

**Heritage credential as hero:** lead with a single line of historical or place authority rather than a large headline about what the place "offers." Château Pichon Baron: "Second Grand Cru Classé in 1855." For M&D: venue section could open with castle name + one whispered geographic detail rather than labeled address.

**Post-RSVP narrative extension:** confirmation screen after form submission is an untapped emotional moment. Replace generic "Obrigado!" with botanical divider + couple quote + venue detail image. Same design system, one additional emotional beat that guests remember.
