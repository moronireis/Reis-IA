# Hero Prompt Skeleton — Casamento Moroni & Daphine

Last updated: 2026-04-15
Owner: art-director
Scope: Casamento Moroni & Daphine (personal wedding site). **NOT REIS [IA].** Do NOT apply the REIS dark/architectural/electric-blue skeleton to this project.

This skeleton is the mandatory template for every hero image prompt produced for the wedding site. It adapts the REIS prompt discipline to a warm, candlelit, burgundy + antique gold + cream romantic-luxury aesthetic.

---

## The Skeleton

Every prompt MUST contain the following 9 sections in order:

### 1. Subject + Action
A single detail as protagonist (per Magnolia Rouge ref #02 — never start with the couple). Close or medium-close. What is it doing? What is happening to it — candlelight flicker, gentle bloom, steam, dust, petals settling?

### 2. Composition
- Framing: close-up / medium-close / editorial still-life
- Subject occupies 50-70% of frame (not 20% — this project is warmth, not austerity)
- Rule of thirds or centered-symmetrical (centered is permitted here; the REIS no-centered rule does not apply)
- Negative space filled by burgundy velvet, cream linen, dark floral bokeh — never empty black

### 3. Lighting
- **Key light**: single warm candle or warm tungsten at 2700-3000K, upper-left or directly above subject at 30-45°
- **Fill**: soft warm bounce from cream linen or gold surface, NOT cool, NOT absent
- **Rim**: warm amber rim if subject is against burgundy (separates without coldness)
- **Practicals**: actual candles visible or implied in bokeh (warm orange-gold blobs out of focus)
- **Atmosphere**: soft warm haze, dust motes catching the key light, no hard shadows
- **Never**: cool daylight, blue hour, fluorescent, hard flash, high-key white

### 4. Palette (explicit hex)
Must include at least three of:
- `#4A1619` burgundy deep
- `#6B1F2A` burgundy wine
- `#B08D3C` antique gold (NOT #FFD700 bright gold — forbidden)
- `#D4AF37` gold leaf (detail only)
- `#F4ECDC` cream candle
- `#1A1312` warm charcoal (not pure black)
- `#E8C9BE` blush dust (rare detail)

State the palette as color balance: "warm tungsten white balance, +15 warm, -10 cyan, subtle gold overlay at 8% opacity (Ralph Lauren Romance treatment)."

### 5. Texture & Materials
- Film grain always (35mm color negative grain, not digital noise)
- Optional: shallow depth of field, warm bokeh, slight halation around candlelight highlights
- Materials to name when present: burgundy velvet, cream linen, aged brass, antique gold leaf, hand-calligraphed paper, heavy card stock, beeswax candle, bordeaux rose petals, eucalyptus, calla lily, silk ribbon

### 6. Mood
One sentence. Example: "intimate, silent, reverent — the moment before the ceremony begins, when the room is empty and the candles have just been lit."

### 7. Technical Specs
- Camera: medium-format film aesthetic (Pentax 67, Contax 645, Hasselblad) OR full-frame with 85mm/105mm
- Lens: 85mm f/1.4, 105mm f/2, or 100mm macro f/2.8
- Aperture: f/1.8 to f/2.8 (shallow, dreamy) — never f/8 sharp
- Shutter: implied slow enough for warm natural handshake
- Film stock reference: Kodak Portra 400 or Fuji 400H pushed +1 for warmth

### 8. Style Anchors
Name 2-3 of:
- Magnolia Rouge editorial
- Once Wed winter gallery
- Ralph Lauren Romance campaign
- Valentino Beauty Fall/Winter
- Junebug Weddings fine-art feature
- Dior Fall campaign still-life
- Chateau Pichon Baron institutional
- Tom Ford Beauty
- Dutch still-life painting (Rachel Ruysch, Willem van Aelst) — for florals specifically

### 9. Negative Prompt
Always include this block verbatim (add project-specific negatives on top):

```
Negative:
- no pastel pink, no millennial rose, no lavender, no lilac
- no bright yellow gold, no chrome, no metallic gradient
- no cool lighting, no blue hour, no daylight white balance, no fluorescent
- no pure black (#000000) — always warm charcoal or burgundy
- no electric blue, no teal, no cyan, no REIS [IA] palette
- no chess imagery, no crown, no H1-B hourglass, no Z7
- no dark architectural brutalism, no cinematic sci-fi, no Blade Runner
- no happy stock couple, no laughing groom, no fake candid, no posed Pinterest generic
- no hearts, no confetti, no watercolor florals, no clip-art ornaments
- no Canva wedding template, no Minted default, no Zola default
- no Playfair Display tattoo clichés on text if text appears
- no HDR, no oversharp, no overexposed highlights, no crushed shadows
- no sans-serif labels if text appears (Cormorant Garamond or Great Vibes only)
```

---

## Output format

Every prompt file under `hero-prompts/examples/moroni-daphine-*.md` must use this structure:

```markdown
# {Variant title}

Section: {hero | nossa-historia | galeria | mensagem-final}
Intent: {one line}
Tools tested on: Gemini 2.5 Flash Image / Flux 1.1 Pro / Midjourney v7

## Prompt

{Full prompt in prose, combining sections 1-8 of the skeleton into 3-5 flowing paragraphs. Do NOT output bullet points — image models respond better to prose.}

## Negative

{The negative block from section 9, plus any variant-specific negatives.}

## Post-processing (if applicable)

- Warm overlay: `radial-gradient(circle at center, rgba(212,175,55,0.08), transparent 70%)` (Ralph Lauren Romance treatment)
- Film grain: 35mm color negative, opacity 0.12, blend mode overlay
- Vignette: warm charcoal (#1A1312) at 15% toward edges
```

---

## Rules of engagement

1. Never use the REIS skeleton for this project. Never mix.
2. Always lead with a detail, never with the couple.
3. Always warm-within-warm — no cold accents, no cool shadows.
4. Always film grain. Digital cleanliness is forbidden here.
5. Centered composition is PERMITTED (the REIS anti-centered rule does not apply to romantic editorial).
6. No people in the hero prompts unless explicitly requested — details tell the story better.
