# Moroni & Daphine — Cinematic Art Direction
**Wedding: 12 June 2026 · Brasília**
Last updated: 2026-04-14

---

## 1. Cinematic Vision Statement

A candlelit Bridgerton ball invitation unfolding in slow motion — burgundy velvet, rose gold foil, wax and breath. We are not making a website; we are making the private film that plays inside the envelope before the guest opens it.

---

## 2. Mood Boards (Film Frames)

**Hero Frame.** Extreme close-up, shallow focus: a hand in soft candlelight lifting a thick cotton-rag card from a burgundy velvet tray. The card edge catches a thin rose-gold gilt line. Behind it, out of focus, two beeswax tapers flicker, and a dried burgundy rose lies on dark velvet. 85mm, f/1.4, ISO 800 grain. Vermeer meets Dior couture invitation.

**Mid-section Frame (their story).** Medium shot: a marble tabletop at night, half-drunk crystal coupes, melted wax pooling around a brass candelabra, an open fountain pen on a handwritten letter in faded burgundy ink. Everything warm-within-dark. The frame breathes — 60% negative shadow. Portrait of a Lady on Fire interior.

**Dark Velvet Frame (already working — validated).** A pitch-black void with a single soft radial bloom of candle warmth at center, as if one flame is lighting an entire cathedral. The giant "12" rises out of the dark in Cormorant italic, filled with a brushed rose-gold gradient; "Junho" trails beneath in Great Vibes like smoke. Noise grain over everything. This is correct — the whole site should feel like this frame is the membrane the other frames pass through.

---

## 3. Lighting Principles

- **One flame, one frame.** Every hero composition is lit by a single warm practical (candle, taper, oil lamp) at 2200K. No daylight. No fill. Let 70% of the frame fall into crushed shadow.
- **Chiaroscuro on the web:** simulate with large soft radial gradients (800–1200px) anchored off-center, layered over pure near-black (#0A0305). Pulse the radial at 6–8s ease-in-out to mimic flame breath — never faster, never linear.
- **Velvet depth:** never use flat `#000`. Always a subtle burgundy-black radial so the eye feels *fabric*, not screen. Noise texture at 0.06–0.10 opacity, mix-blend-mode overlay, is mandatory.
- **Rim of gold:** every hero element (numeral, card edge, rose) earns a thin rose-gold highlight on one side only — the side the flame is on. Never symmetric.

---

## 4. Color Palette

| Token | Hex | Usage |
|---|---|---|
| Velvet Void | `#0A0305` | Base black, page background |
| Burgundy Deep | `#2E0810` | Radial outer |
| Burgundy Core | `#4A0E1C` | Radial inner, velvet fabric |
| Marsala | `#6B1A2C` | Rose petals, ribbon shadow |
| Wine Bloom | `#8B2439` | Accent hover, link underline |
| Rose Gold | `#D4B996` | Primary accent, gilt edges |
| Rose Gold Light | `#E8CDB0` | Script type, highlights |
| Rose Gold Shadow | `#9A7F63` | Gradient depth on gold fills |
| Candle Glow | `rgba(212,185,150,0.18)` | Radial light washes |
| Ivory Wax | `#F4E9D8` | Body text on dark, card stock |
| Noir (Tier 2) | `#050505` | Noir & Or tier base |
| Or Royal (Tier 2) | `#C9A227` | Yellow gold for black-tie moments |

Rose gold is primary. Yellow gold appears **only** in the Noir & Or tier (black-tie RSVP, dress code, reception details).

---

## 5. References

1. **Portrait of a Lady on Fire (Sciamma, 2019)** — candlelit interiors; how a single flame sculpts a face out of black.
2. **Dior Haute Couture Fall 2019 invitation suite** — wax seal, burgundy velvet pouch, gilt script; our exact tactile target.
3. **Bridgerton Season 2 ballroom (ep. 4)** — ornate romanticism without kitsch; saturation restraint.
4. **Caravaggio, *Judith Beheading Holofernes*** — chiaroscuro grammar: 70% shadow, 30% light, never middle gray.
5. **Aman Venice press campaign (2022)** — how velvet, brass, and candle photograph as *atmosphere*, not props.

---

## 6. Hero Image Prompts

1. *Extreme macro, hand lifting thick ivory cotton-rag invitation card from burgundy velvet tray, thin rose-gold gilt edge catching candlelight, two beeswax tapers flickering out of focus behind, shallow depth of field, 85mm f/1.4, warm 2200K single-source light, crushed black shadows, heavy film grain, Dior couture invitation still life, cinematic.*

2. *Overhead flat lay on dark burgundy velvet: dried opulent burgundy roses, melted rose-gold wax pooling around a pressed wax seal, antique brass candelabra with lit taper, fountain pen on handwritten letter, single warm practical light from top-left, 60% frame in shadow, film grain, Caravaggio chiaroscuro, wedding invitation editorial.*

3. *Close-up of burgundy velvet ribbon tied in a loose bow, rose-gold thread glinting at the knot, candle flame reflected as a single warm highlight, pure black background, macro lens, f/2, 35mm film aesthetic, tactile luxury, Bridgerton couture detail.*

4. *Cinematic wide of a marble table at night: crystal coupes half-full, a tall brass candelabra with three lit tapers, burgundy rose petals scattered, everything framed in pure black negative space, single warm key light from a single flame, volumetric haze, 50mm anamorphic, Aman Venice editorial, painterly.*

5. *Single burgundy garden rose on black velvet, rose-gold water droplets on petals, one candle flame out of frame lighting only the right side of the bloom, left side crushed into shadow, 100mm macro, f/2.8, heavy grain, Dutch still life painting aesthetic.*

**Negative for all:** no daylight, no sunset, no yellow gold (unless Tier 2), no chess, no crowns, no geometric florals, no line-art, no watercolor blobs, no spa aesthetic, no ALL CAPS editorial minimalism, no stock photography, no happy couples, no rings on pillows, no Pinterest clichés.

---

## 7. Three Signature Moments

1. **The Envelope Breathes.** On first load, a full-bleed dark velvet frame with a single candle-glow radial pulsing at 6s. A closed burgundy envelope sits center, rose-gold wax seal embossed with intertwined "M & D". On scroll, the seal cracks — the envelope opens in a slow 2s reveal and the site pours out from inside it. The envelope is literally the site's front door.

2. **The Candlelit Countdown.** The working "12 Junho" frame becomes a recurring motif: every section transition passes through the dark velvet membrane, with the date numerals ghosting through as rose-gold smoke. Pacing beat, not decoration. It reminds the guest why they're here between every story.

3. **Handwritten Letter Section.** The couple's story is presented as a handwritten letter in burgundy ink on ivory cotton-rag, lit by one candle in the corner. Text reveals line by line as if being written in real time (scroll-scrubbed), with the pen's shadow moving across the page. No UI chrome. Just a letter on a table in a dark room.
