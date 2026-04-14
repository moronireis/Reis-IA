# Hero Prompts — REIS [IA] Cinematic Image Library

Last updated: 2026-04-14

Prompts for Gemini 2.5 / Flux / Midjourney that produce hero imagery aligned with the REIS [IA] visual DNA. Written by `cinematic-art-director`, consumed by the designer/dev pipeline (or by Moroni manually).

OSS-first: the prompt IS the deliverable. Actual image generation happens in whichever tool is available at the time.

---

## REIS [IA] Prompt Skeleton

Every prompt must anchor these DNA markers or it will drift toward stock cliché:

```
[subject + action], [composition], [lighting], [color palette], [texture/material], [mood], [technical specs], [style anchors], [negative prompt]
```

### Required anchors (always present)

- **Palette**: "deep black background (#000), high-contrast, single accent of electric blue (#4A90FF) used sparingly"
- **Lighting**: "cinematic studio lighting, single key light from upper left, deep shadow falloff, rim light on subject edges, volumetric haze"
- **Style anchors**: "in the visual style of Apple product photography meets Porsche brand film meets Stripe editorial. Dark minimalist. Architectural. 8k resolution."
- **Technical**: "shot on ARRI Alexa 65, 85mm prime lens, f/2.8, shallow depth of field, subtle film grain"
- **Negative prompt**: "no stock photography cliches, no happy people in office, no fake diversity poses, no rainbow gradients, no gold/amber/orange tones, no chess pieces, no crowns, no cartoon, no illustration, no 3D render that looks gamified"

### Optional modulators

- **Mood**: cold / warm-within-cold / silent / tense / contemplative
- **Material**: brushed aluminum / glass / carbon fiber / obsidian / liquid mercury
- **Scale**: macro / human / architectural / aerial

---

## Prompt Templates

### Template A — 3D Product Hero (Apple-style)

```
Hero product shot of [PRODUCT], floating in negative space, slowly rotating.
Composition: centered, product occupies 40% of frame, massive negative space above.
Lighting: cinematic studio rim lighting, single key light upper-left, deep shadow falloff, soft volumetric haze in background.
Palette: pure black background (#000000), product in brushed [MATERIAL], single electric blue (#4A90FF) highlight on [DETAIL].
Texture: subtle film grain, slight chromatic aberration on specular highlights.
Mood: silent, premium, deliberate.
Technical: 8k, shot on ARRI Alexa 65, 85mm prime, f/2.8, shallow depth of field.
Style: Apple product photography meets Porsche brand film. Dark minimalist. Architectural precision.
Negative: no stock photography, no lifestyle context, no office environment, no people, no gold/amber, no rainbow, no cartoon, no gamified 3D.
```

### Template B — Architectural Render Hero (CONCRETE DREAMS style)

```
Architectural render of [STRUCTURE] at golden hour inverted to blue hour, headline text "[HEADLINE]" embossed into the concrete facade.
Composition: wide shot, structure fills lower 60% of frame, infinite sky above, extreme leading lines.
Lighting: single low-angle rim light from horizon, deep shadow falloff, atmospheric haze, no bounce.
Palette: pure black sky, matte concrete in cool grey, electric blue (#4A90FF) only in reflected highlights on edges.
Texture: film grain, slight lens distortion on edges, shot-on-celluloid imperfection.
Mood: monolithic, quiet, inevitable.
Technical: 8k, architectural photography, tilt-shift lens, f/8, deep focus on structure.
Style: Tadao Ando meets Blade Runner 2049 color grading. Editorial. Architectural.
Negative: no people, no cars, no decorative elements, no warm tones, no sunset colors, no clutter, no signage.
```

### Template C — 3D Avatar / Figure Hero

```
Hero portrait of [FIGURE] in three-quarter view, wearing [ITEM], looking slightly off-camera.
Composition: bust shot, figure occupies right third of frame, negative space on left for headline placement.
Lighting: cinematic single key light from upper right, deep shadow on far side of face, rim light separating figure from background, subtle volumetric haze.
Palette: pure black background (#000000), skin in cool desaturated tones, single electric blue (#4A90FF) accent on [ITEM DETAIL, e.g. lens reflection].
Texture: film grain, subsurface scattering on skin, realistic micro-detail.
Mood: focused, grounded, executive presence.
Technical: 8k, shot on ARRI Alexa 65, 85mm prime, f/1.8, extreme shallow depth of field.
Style: Annie Leibovitz meets Apple portrait photography. Editorial. No influencer gloss.
Negative: no fake smile, no corporate headshot, no white background, no stock pose, no cartoon, no cgi plastic skin, no makeup sheen, no rainbow.
```

---

## Examples

See `brain/design-library/hero-prompts/examples/` for filled-in prompts by category:
- `product-shot.md` — template A filled for a specific REIS [IA] product concept
- `architectural-render.md` — template B for a headline reveal
- `3d-avatar.md` — template C for founder portraits

## How to contribute

When `cinematic-art-director` produces a new hero brief, the final prompt goes into `examples/` with the filename pattern `{page-or-section}-{variant}.md`. Always include:
1. The complete prompt (copy-pasteable into Gemini/Flux/Midjourney)
2. The intended context (which page, which section, which headline)
3. The selected template (A/B/C or custom)
4. Notes on what to regenerate if the first output misses

## PROHIBITED in hero prompts

- Gold, amber, orange, terracotta tones
- Chess pieces, knights, crowns, royalty imagery
- Happy office people, fake diversity, stock cliches
- Rainbow gradients, pastel palettes, Y2K revival
- Cartoon, illustration, anime, gamified 3D looks
- Azure Whisper / shimmer text effects
