# Moroni & Daphine — Hero Variant A: Alianças sobre veludo borgonha

Section: hero
Intent: Abertura silenciosa e íntima. Duas alianças de ouro fosco sobre veludo borgonha escuro, iluminadas por uma única vela fora de quadro à esquerda. A imagem sugere compromisso antes de qualquer palavra.
Tools tested on: Gemini 2.5 Flash Image / Flux 1.1 Pro / Midjourney v7

## Prompt

An extreme close-up fine-art still life of two antique gold wedding bands resting on a bed of deep burgundy silk velvet, the rings slightly touching but not overlapping, photographed from a 30-degree high angle. The metal is warm antique gold (#B08D3C), matte and brushed, catching a single soft highlight from a candle positioned upper-left just outside the frame. The velvet is deep bordeaux (#4A1619 to #6B1F2A), its nap visible in the soft raking light, slight folds pooling in the lower right of the composition.

Lighting is single-source warm tungsten at 2800K, coming from upper-left at 40 degrees, with a gentle warm cream bounce on the right filling the shadows just enough to keep them readable. A warm amber rim kisses the upper edge of the rings. The background dissolves into dark burgundy bokeh where out-of-focus candle flames appear as golden orbs, barely visible. Soft warm haze and a few dust motes catch the key light.

Shot on a Hasselblad 100mm macro f/2.8, aperture wide open, film stock Kodak Portra 400 pushed +1 stop for warmth. Extremely shallow depth of field — only the front edge of the rings is in crisp focus, the back edge already falling into dreamy blur. 35mm color negative grain visible throughout. Color balance warm tungsten, +15 warm, -10 cyan, with an 8% gold radial overlay from center to transparent (Ralph Lauren Romance treatment). Subtle halation glow around the brightest highlight on the metal.

Mood: intimate, reverent, silent — the hour before guests arrive, when the rings are resting alone on the velvet and the room is breathing candlelight. Style anchors: Magnolia Rouge bordeaux feature, Ralph Lauren Romance campaign, Dutch still-life painters (Willem van Aelst), Tom Ford Beauty close-up.

## Negative

- no pastel pink, no millennial rose, no lavender, no lilac
- no bright yellow gold, no chrome, no metallic gradient, no #FFD700
- no cool lighting, no blue hour, no daylight white balance, no fluorescent
- no pure black (#000000) — always warm charcoal or burgundy
- no electric blue, no teal, no cyan, no REIS [IA] palette
- no chess imagery, no crown, no H1-B hourglass, no Z7
- no dark architectural brutalism, no sci-fi, no Blade Runner grading
- no happy stock couple, no hands in frame, no fingers
- no hearts, no confetti, no watercolor florals, no clip-art ornaments
- no Canva wedding template, no Minted, no Zola default
- no HDR, no oversharp digital, no overexposed highlights, no crushed shadows
- no text overlays, no watermarks, no borders
- no three rings, no engagement ring, no diamonds in extreme close-up (single subtle stone maximum or none)

## Post-processing

- Warm overlay: `radial-gradient(circle at 50% 45%, rgba(212,175,55,0.08), transparent 70%)`
- Film grain: 35mm color negative, opacity 0.12, blend mode overlay
- Vignette: warm charcoal (#1A1312) at 18% toward edges
- Optional slight halation around the brightest metal highlight (Gaussian blur 2px at 25% opacity, screen blend)
