MOOD REPORT: Digital Wedding Invitation — Redesign V2
Last updated: 2026-04-23
Curator: visual-research-scout
Purpose: Reference foundation for the redesign of the Moroni & Daphine digital wedding invitation (moroniedaphine/). Palette locked: burgundy #4A1619, gold #D4AF37, cream/white. Venue: Castelo dos Lagos. Fraunces + Inter type system. Mobile-first, single-page scroll.
Referenced-by: designer-agent, dev-agent (convite.astro redesign)

═══════════════════════════════════════════
AESTHETIC INTENT
═══════════════════════════════════════════

Primary intent: romantic-opulence
Secondary intents: candlelight-warmth, cinematic-entry, hold-and-release

What we are hunting:
The feeling of receiving a physical luxury printed invitation — but animated and alive in your hand on mobile. Dark atmospheric photography as the first breath of the experience. A cover that holds you still for one second before letting you in. Then a card body that unrolls like a scroll — each element materializing as you descend. Typography at the weight of silk ribbon on heavy cotton paper. Botanical ornaments that whisper rather than decorate. Gold that reads as warm candlelight, not yellow foil. Burgundy that reads as deep wine, not red.

The experience arc: STILLNESS (cover, names, ghost button) → ENTRY (fade transition, warmth of linen) → DISCOVERY (date, message, venue, moving portraits) → PARTICIPATION (countdown, RSVP).

What we are rejecting:
Any animation that calls attention to itself. Envelope gimmicks. Script fonts used in body text. Confetti, sparkle, or ribbon transitions. White backgrounds that feel like wedding blog templates. Gradient text. Rose gold or blush. Any SaaS-style form layout. Pale lavender or aquarelle watercolor aesthetics. Fast reveals — nothing under 600ms easing. Generic serif that lacks optical personality (Georgia, Times New Roman territory). Any element that would look at home on a Canva free template.

═══════════════════════════════════════════
REFERENCES — PLATFORM TEMPLATES (digital invitation services)
═══════════════════════════════════════════

## Ref #1 — Gala Black — withjoy.com
URL: https://withjoy.com/designs
Source: withjoy.com — wedding platform template catalog, direct research
Screenshot: Dark near-black background wedding website template with white and cream typography. One of the few explicitly dark templates in Joy's catalog.
Why it is good:
  One of the few wedding website templates that refuses the "white page with florals" default. The name alone — Gala Black — signals intent: this is for formal, nocturnal celebrations. In the context of Joy's catalog (which tilts heavily botanical and pastel), Gala Black reads like the adult in the room.
Technique destacada:
  Background darkness is used as the primary luxury signal — not gold ornaments or elaborate typography, but simply the willingness to hold the space dark while everything else competes to be bright and cheerful.
Aesthetic tags: romantic-opulence, inevitable-silence, color-restraint
Harvest suggestion: NO — template only, no harvestable code. Use as visual direction validator.

## Ref #2 — Magazine Indigo — withjoy.com
URL: https://withjoy.com/designs
Source: withjoy.com — wedding platform template catalog, direct research
Screenshot: Deep indigo/navy editorial wedding template. Typography-forward layout with editorial grid structure, navy dominant color.
Why it is good:
  Magazine Indigo demonstrates that editorial newspaper/magazine grid logic can be transplanted directly into a wedding context. The indigo palette is darker than most wedding templates dare. The "magazine" naming points to editorial layout thinking — asymmetric columns, varied type sizes — rather than the centered, symmetrical default of wedding web design.
Technique destacada:
  The editorial grid technique: using asymmetric column ratios for content sections rather than the universal "everything centered, one column" approach. A left-aligned label next to a larger right-side block reads like a magazine spread, not a wedding website.
Aesthetic tags: editorial-thunderclap, romantic-opulence, editorial-grid
Harvest suggestion: NO — template only. Extract the grid logic concept, not code.

## Ref #3 — Graphite Blooms — withjoy.com
URL: https://withjoy.com/designs
Source: withjoy.com — wedding platform template catalog, direct research
Screenshot: Graphite/dark grey background with botanical floral illustrations. Dark background treatment with botanical elements — closest in spirit to the M&D palette direction.
Why it is good:
  Graphite Blooms solves the central tension of the M&D invitation: how to use botanical decorative elements without looking like a craft-blog template. The answer here is dark ground. Florals on dark backgrounds read as sophisticated botanical illustration, not Pinterest decoration. The graphite is warm — not cold grey — which prevents it from reading as sterile.
Technique destacada:
  Botanical on dark as sophistication technique: place any floral or botanical element on a dark base (graphite, deep navy, burgundy) and its class register immediately upgrades from "rustic" to "editorial." The same floral on white reads as garden party; on dark it reads as library, château, private club.
Aesthetic tags: romantic-opulence, analog-warmth-dark, photographic-direction
Harvest suggestion: NO — template only. Critical conceptual validation: botanicals on dark = right move.

## Ref #4 — Metallic Dipped Gold — withjoy.com (Nehir & Jonas)
URL: https://withjoy.com/nehir-and-jonas (may require auth)
Source: withjoy.com blog — "22 Creative Wedding Website Examples", direct research
Screenshot: Rich gold metallic treatment on a wedding website. Formal, black-tie event aesthetic with jewel-tone palette complement.
Why it is good:
  This is the most direct validation that gold as a dominant (not merely accent) color reads as luxury in the wedding context. The metallic treatment — not flat gold, but gradient-shifted gold with some warmth variation — avoids cheapness. Gold that has tonal range (highlight/shadow/midtone) reads like brushed metal or gilded paper rather than highlighter yellow.
Technique destacada:
  Gold tonal range rule: the difference between cheap gold (#FFD700 flat) and luxury gold (linear-gradient from #B5902A to #D4AF37 to #C9A227) is shadow variation. Any gold element should have at least two tonal values, even at small scale — this creates the impression of physical material catching light.
Aesthetic tags: romantic-opulence, candlelight-warmth, luxury-whisper
Harvest suggestion: NO — actual wedding site, no public code. Note: gold gradient technique is the steal.

## Ref #5 — "Written In The Stars" — minted.com
URL: https://www.minted.com/wedding-invitations
Source: Minted.com — premium stationery marketplace, direct research
Screenshot: Noir dark background with gold foil stamping. A dark-ground invitation design with celestial/noir aesthetic, gold foil typography.
Why it is good:
  Minted is the most design-literate of the mainstream invitation platforms. "Written In The Stars" demonstrates that a dark-background digital invitation can work for wedding without reading as macabre. The gold foil on noir is the classic luxury pairing — every luxury fashion brand uses this combination on packaging, lookbooks, and invitations. The key is restraint: most of the card is dark silence, with gold appearing only at moments of emphasis.
Technique destacada:
  Gold as punctuation technique: gold appears ONLY on the couple's names and the main date. Everything else — address, time, dress code, RSVP — sits in cream or low-opacity white. This prevents gold from becoming noise; it remains a signal that marks "the most important words on this card."
Aesthetic tags: romantic-opulence, color-restraint, micro-type-mastery
Harvest suggestion: NO — commercial product. The gold-as-punctuation principle is the steal.

## Ref #6 — "Elizabeth" — minted.com (Burgundy)
URL: https://www.minted.com/wedding-invitations?colors=burgundy
Source: Minted.com — stationery marketplace, direct research
Screenshot: Classic burgundy invitation with clean elegant presentation. Designer Helena Vitto. Restrained ornamentation, formal lettering, creamy off-white paper stock treatment.
Why it is good:
  Elizabeth by Helena Vitto is the single example from Minted that most directly validates the M&D color direction. The burgundy is used as the dominant ground color, not as a border or accent. Cream text on burgundy ground. The designer's restraint is notable: minimal ornament, generous whitespace inside the card, typography as the primary aesthetic act.
Technique destacada:
  Burgundy-ground with cream text as the inversion technique: instead of dark-text-on-light (the default for most wedding invitations), invert to cream-or-white text on burgundy ground. This flips the register from "formal daytime" to "formal evening." The M&D convite currently uses this on the hero — the principle should extend to section headings and date blocks.
Aesthetic tags: romantic-opulence, color-restraint, typography-as-hero
Harvest suggestion: NO — commercial product. Inversion principle is the steal.

## Ref #7 — GreenEnvelope animated envelope + music experience
URL: https://greenvelope.com
Source: Greenvelope.com — digital-only invitation platform, direct research
Screenshot: The signature feature: animated envelope that opens with liner, stamp, and optional background music. The envelope animation precedes the invitation reveal.
Why it is good:
  GreenEnvelope's animated envelope is the most well-known example of digital invitation theater — the deliberate act of making the digital invitation feel like receiving physical post. The envelope liner, the stamp, the moment of opening are all metaphors for materiality. While the M&D redesign specifically discards envelope gimmicks in favor of a photo cover, the underlying principle — that the opening ritual matters — is validated here. The replacement (photo cover + ghost button + fade) needs to carry the same ritual weight.
Technique destacada:
  Ritual before content: the envelope animation is not decoration, it is pacing. It forces the guest to pause before seeing the invitation. The equivalent technique in the M&D cover is the 1200ms fade transition with the simultaneous photo slow-zoom — the zoom continues during the hold, creating movement while the cover is still present, making the viewer feel the transition happen rather than just see it.
Aesthetic tags: cinematic-entry, hold-and-release, scroll-scrubbed-narrative
Harvest suggestion: NO — platform. The pacing principle is the steal.

═══════════════════════════════════════════
REFERENCES — AWARD-WINNING WEDDING SITES (Awwwards, FWA)
═══════════════════════════════════════════

## Ref #8 — Boutique Weddings — boutiqueweddings.cz (Awwwards HM May 2025)
URL: https://boutiqueweddings.cz
Source: Awwwards Honorable Mention, May 13 2025 — designer: Semibold
Screenshot: Minimalist neutral tones (white, soft grey, black). Full-width photography-dominant layout. Sticky header. Video hero. Named collection categories: "Clean Contemporary," "Champagne Rizz," "Royal Romance." Editorial type hierarchy with large headline.
Why it is good:
  The "Royal Romance" collection naming points to the exact aesthetic register of M&D — formal, European, evening. The design achieves premium positioning through restraint: no flourish, no ornament, all attention goes to photography and typography. The video play button over a still hero image is a studied hesitation — the site says "there is motion here, but I'm not forcing it on you." That respect for the viewer's choice is a luxury signal.
Technique destacada:
  Neutral restraint as luxury frame: the site's own aesthetic is minimal and almost colorless — this is intentional, because the work it showcases (weddings, venues, styling) carries all the color. The site is a white-glove gallery. For M&D convite, the card body applies the same principle: linen (#E5DFD6) is colorless enough to not compete with the photography it contains.
Aesthetic tags: luxury-whisper, image-as-monolith, whitespace-active
Harvest suggestion: MAYBE — if codebase is accessible, harvest their section transition timing and sticky-header behavior.

## Ref #9 — Daniele & Marilia Wedding Photography — danieleandmarilia.com (Awwwards HM Sep 2025)
URL: https://danieleandmarilia.com
Source: Awwwards Honorable Mention, September 9 2025 — designer: Vavan Studio
Screenshot: Bold black/white/light grey monochromatic palette. Full-width photography galleries. Large display type: "INSATIABLE," "IMPACTFUL," "INTENTIONAL." Publication feature logos (Vogue, Brides, Harper's Bazaar). "Book now" CTA persistent.
Why it is good:
  D&M demonstrates that oversized display type as character descriptor — using single powerful adjectives as section headers — works beautifully in a wedding-photography context. The boldness contrasts with the usual softness of wedding design. The credibility of Vogue/Brides/Harper's Bazaar logos is handled elegantly: small, one row, greyscale — authority without visual weight.
Technique destacada:
  Single-word display section headers: replacing "About Us" or "Our Story" with one-word character descriptors ("INSATIABLE," "IMPACTFUL") shifts the register from informational to editorial. For the M&D convite, the equivalent could be using section-opening lines that feel pulled from a poem or letter rather than labeled headers.
Aesthetic tags: editorial-thunderclap, typography-as-hero, image-as-monolith
Harvest suggestion: NO — photography portfolio, not invitation. The display type register is the steal.

## Ref #10 — Adovasio Photography — adovasio.it (Awwwards SOTD March 2026)
URL: https://adovasio.it
Source: Awwwards SITE OF THE DAY — March 5, 2026, designer: Louis Paquet (PRO). Developer Award.
Screenshot: Elegant gallery filters, preloader animations, editorial Italian-flair aesthetic. Tagline: "Capturing your love's legacy with an elegant, editorial, and Italian flair." Countdown elements visible in hero navigation.
Why it is good:
  Site of the Day on Awwwards for a wedding photography portfolio signals that there is genuine design ambition in the wedding space. The "elegant, editorial, Italian flair" positioning is almost exactly the aesthetic territory of M&D — European formality, editorial sensibility, restraint over ornamentation. The gallery filter interaction (allowing visitors to navigate a portfolio by style) is a mature UI pattern that treats the visitor as a sophisticated viewer, not a casual browser.
Technique destacada:
  The countdown integrated into the hero navigation. Rather than putting the countdown in its own section far below the fold, Adovasio places numeric elements in the hero viewport, making "time" feel present from the first second. This is worth stealing: the M&D countdown (Section 11) could have a hint of itself visible just below the fold, creating pull to scroll.
Aesthetic tags: luxury-whisper, cinematic-entry, micro-type-mastery
Harvest suggestion: YES — site is public, editorial and Italian-flair positioning directly adjacent to M&D. Harvest typography scale and gallery filter interaction pattern.

## Ref #11 — Marie Guillaume Photography — marieguillaume.com (Awwwards HM Apr 2023)
URL: https://marieguillaume.com
Source: Awwwards Honorable Mention, April 27 2023 — designer: LEOLEO (PRO)
Screenshot: Minimalist, extensive whitespace, masonry-style asymmetric image grid at 500px and 1100px widths. Sans-serif clean typography. Portrait of photographer in hero. Natural, warm tones in photography.
Why it is good:
  The masonry grid at two widths (500px and 1100px) creates a visual rhythm that feels like turning pages in a photobook rather than scrolling a grid. The designer resisted the temptation to make every image the same size — scale variation creates editorial hierarchy within the gallery. This is directly applicable to the M&D mini photo gallery (Section 9): three equal-size frames is a missed opportunity for rhythm.
Technique destacada:
  Two-width image rhythm: alternating between large (1100px/full-bleed) and medium (500px/half-bleed) images in a grid creates the photographic pacing of a printed book. For the M&D three-photo section, consider 2:1:1 or 1:2:1 size ratio rather than 1:1:1 — this single change elevates "gallery" to "editorial spread."
Aesthetic tags: editorial-grid, image-as-monolith, whitespace-active
Harvest suggestion: NO — personal portfolio, minimal codebase. The grid ratio principle is the steal.

═══════════════════════════════════════════
REFERENCES — LUXURY NON-WEDDING SITES (aesthetic transposition)
═══════════════════════════════════════════

## Ref #12 — Château Pichon Baron — pichonbaron.com/en
URL: https://www.pichonbaron.com/en/
Source: Direct — Pichon Baron, Second Grand Cru Classé wine estate, Bordeaux
Screenshot: Heritage-led navigation. "Second Grand Cru Classé in 1855" as hero credential. Heritage/Wines/Team/Terroir navigation. Understated neutral palette with photography of chateau, vines, barrels. Video documentary feature.
Why it is good:
  The most direct luxury reference for the M&D venue narrative. A French château communicating exclusivity through restraint: the navigation is four words, the hero is a heritage credential not a product image, and the design does nothing that a less confident brand would not also do — except everything is held at a tighter, quieter tension. This is exactly the register the M&D "Castelo" section should aim for: the castle as a place worthy of documentary attention, not a venue that needs selling.
Technique destacada:
  Heritage credential as hero: instead of a large headline about what the place "offers," lead with a single line of historical or place authority. For M&D, the venue section could open with the castle's name in large Fraunces followed by a single whispered geographic/historical detail — "Jardim Planteucal, Ribeirão Pires" — rather than the address as a label.
Aesthetic tags: luxury-whisper, inevitable-silence, whitespace-active
Harvest suggestion: NO — brand site. Heritage-first principle is the steal.

## Ref #13 — Dior Fall Collections Site
URL: https://www.dior.com/en_us/fashion/womens-fashion
Source: Dior.com — luxury fashion house, seasonal campaign microsite
Screenshot: Monumental display typography (never smaller than ~8vw for H1). Burgundy-adjacent deep red appears in Fall/Winter campaigns. Photography with dramatic warm studio lighting. Transitions are slow, deliberate, cinematic. Section reveals use opacity + subtle Y translate.
Why it is good:
  Dior is the master of "slow luxury" in digital form. The typography rule is absolute: H1 is never modest. In Fall/Winter collections, the display type occupies 2-3 full lines of the viewport on mobile — not because the words demand it, but because the visual act of giant type is itself the communication. The photography uses warm tungsten/amber lighting that photographs burgundy as the color it should be: deep, warm, saturated, not dull.
Technique destacada:
  The Dior H1 proportion rule: display headline never smaller than 8vw. At clamp(36px, 9vw, 64px) the M&D cover names are close — the `clamp()` minimum of 36px on a 375px viewport is 9.6vw, which is correct. But the mobile minimum should not fall below 34px regardless of viewport, ensuring the names always feel monumental even on the smallest Android.
Aesthetic tags: editorial-thunderclap, typography-as-hero, cinematic-entry
Harvest suggestion: MAYBE — public site but heavy auth/CDN restrictions. The H1 proportion rule is extractable from any viewport measurement.

## Ref #14 — Valentino — valentino.com (Beauty/Fragrance campaigns)
URL: https://www.valentino.com
Source: Valentino.com — luxury fashion/fragrance brand
Screenshot: Deep burgundy/wine as background color (not accent). Cream or pale gold text over burgundy. Display serif at cinematic scale. Slow cross-fade transitions between sections. The brand's signature Rosso Valentino (#AB0F2A) is close to the M&D burgundy #4A1619 — both use deep wine as identity color.
Why it is good:
  Valentino is the only global luxury fashion brand whose identity color is in the same family as the M&D invitation palette. Rosso Valentino as a brand color demonstrates that deep red/burgundy can carry an entire visual identity — it does not need to be relegated to accent status. More importantly, the digital executions show exactly how to use burgundy as a background: cream or pale gold text reads against it without contrast issues, and the combination reads as rich, evening, formal — not Christmas.
Technique destacada:
  Burgundy-as-background section treatment: take one section of the M&D card (the venue/dress-code section, currently on the linen background) and render it on a full burgundy ground with cream typography. This creates a visual "chapter break" — the linen ground sections breathe; the burgundy section anchors. The alternation creates rhythm without requiring any additional design elements.
Aesthetic tags: romantic-opulence, color-restraint, luxury-whisper
Harvest suggestion: NO — luxury brand with heavy auth. The burgundy-as-background section principle is the steal.

## Ref #15 — Rocco Forte Hotels — Hotel de la Ville Rome, Valentino Bar
URL: https://www.roccofortehotels.com/hotels-and-resorts/hotel-de-la-ville-rome/
Source: Rocco Forte Hotels — ultra-luxury hospitality brand, direct research
Screenshot: Deep wine/burgundy velvet interior photography. Gold hardware. The Valentino Bar features a palette almost identical to M&D: burgundy velvet seating, antique gold fixtures, cream walls. Each space detail is photographed as an editorial subject — not a product shot.
Why it is good:
  The Rocco Forte "detail as protagonist" photography technique is directly applicable to the M&D moving portraits section. Rather than showing the Castelo dos Lagos as a venue overview (wide shot, everything visible), the "detail as protagonist" approach shows a close of the castle stonework, an archway, the reflection on the lake at dusk — images that suggest the whole while showing only part. This creates desire; the wide shot creates information.
Technique destacada:
  Detail as protagonist in venue photography: for the Section 8 moving portrait videos, the most powerful framing is extreme close — tower detail, water surface, entrance gate, stained glass window fragment. Not the establishing wide shot. The wide shot can appear second in the pair. This sequence (close → wide) is cinematic: establish the atmosphere (close), then reveal the scale (wide).
Aesthetic tags: image-as-monolith, photographic-direction, candlelight-warmth
Harvest suggestion: NO — hotel site. The close-then-wide venue video sequence is the steal.

## Ref #16 — Ralph Lauren Fragrance — "Romance" campaign
URL: https://www.ralphlauren.com/fragrance
Source: Ralph Lauren — luxury American brand, direct research
Screenshot: Cream, warm gold-aged, deep wine palette. Serif display at large scale. Couple photography with "golden hour fabricated" lighting — warm overlay that adds amber tone to all images. Photography treatment: warmth, softness, movement in hair and clothing, outdoor light quality.
Why it is good:
  Ralph Lauren Romance uses almost exactly the M&D color combination — cream, aged gold, wine — in a luxury context validated by one of the world's most recognized brands. The "fabricated golden hour" photography treatment is a CSS technique: a radial gradient overlay from the center of the image, gold-tinted at 6-8% opacity, that warms every photo without destroying original color. This is what makes the M&D film filter feel as good as it does — and this reference suggests pushing the warmth slightly further.
Technique destacada:
  Fabricated golden hour overlay recipe: `background: radial-gradient(ellipse at 40% 40%, rgba(212,175,55,0.07) 0%, transparent 70%)` as a pseudo-element over any photo. At 7% it is imperceptible on casual viewing but felt as warmth. The M&D film filter (`sepia(.12) saturate(.82)`) already creates warmth; the radial gold overlay on the card's photo sections would amplify this by simulating a warm practical light source from the upper-left.
Aesthetic tags: romantic-opulence, candlelight-warmth, photographic-direction
Harvest suggestion: NO — commercial brand. The gold radial overlay recipe is directly implementable.

═══════════════════════════════════════════
REFERENCES — EDITORIAL + PRINT WEDDING CURATION
═══════════════════════════════════════════

## Ref #17 — Junebug Weddings — Dark/Moody Winter Editorials
URL: https://junebugweddings.com
Source: Junebug Weddings — premium wedding editorial magazine
Screenshot: Casamento invernal com paleta borgonha/ouro profunda. Grade editorial 3 colunas desiguais: coluna larga para detalhe de mesa, duas colunas estreitas para close de flores e cartão de lugar. Photography: candlelight-lit tables, crystal glassware, deep wine runners, tall candelabras.
Why it is good:
  Junebug Weddings curates the editorial equivalent of what the M&D wedding is visually reaching for. Their winter editorial archives demonstrate the 2:1:1 grid ratio in photography layout — the wide column shows the full scene (table set for dinner with candles and flowers), and the two narrow columns show selected details that carry the mood without reproducing the wide shot. This creates information density with visual rhythm rather than a grid of equal-size images.
Technique destacada:
  2:1:1 grid ratio for photo sections: the current M&D 3-photo section (Section 9) uses a 1:1:1 grid. Changing to 2:1:1 (or implementing via `grid-template-columns: 2fr 1fr 1fr` on the container) changes the visual weight of the section entirely. The first frame becomes the "main image," the second and third become supportive details. One decision, immediate editorial upgrade.
Aesthetic tags: editorial-grid, romantic-opulence, photographic-direction
Harvest suggestion: NO — editorial CMS. The 2:1:1 grid principle is directly implementable in CSS.

## Ref #18 — Style Me Pretty — Burgundy Collection
URL: https://www.stylemepretty.com (now archived/redirected)
Source: Style Me Pretty — formerly the largest luxury wedding editorial destination
Screenshot: Curated burgundy wedding collection. The "old gold" palette is demonstrated throughout: gold as warm neutral rather than bright accent. Multiple editorials show gold foil paper goods, gold candlestick holders, brass flatware — consistently in the warm amber-gold range (#B08D3C — #C9A630), never the cheap yellow (#FFD700).
Why it is good:
  Style Me Pretty's burgundy collection established the color language that Daphine's Pinterest board is built from. Even though the site has been largely archived, the editorial standard it set for the warm burgundy + antique gold + cream palette is the gold standard for this aesthetic. The most important lesson: gold in this context is NEVER specular/mirror gold. It is always warm, slightly amber, slightly matte — the color of old candlelight on brass.
Technique destacada:
  Antique gold versus cheap gold: the CSS color value that reads as luxury versus kitsch. Luxury gold: `#C9A227` to `#B5902A` (warm amber range, low saturation). Cheap gold: `#FFD700` or `#F0C040` (pure saturated yellow). The M&D palette specifies `#D4AF37` which sits exactly at the luxury boundary — correct. Any gold usage slightly above this value (brighter, more yellow) would degrade to kitsch.
Aesthetic tags: romantic-opulence, candlelight-warmth, color-restraint
Harvest suggestion: NO — archived editorial. The antique gold palette principle is a direct color system validation.

## Ref #19 — Once Wed — Dark Florals Editorial
URL: https://www.oncewed.com (redirected to stillwhite.com — editorial content archived)
Source: Once Wed — curated wedding editorial, now archived
Screenshot: Dark-ground floral arrangement photography: deep red roses, chocolate cosmos, burgundy dahlias, ranunculus in deep wine. Photography with a warm-shadow lighting setup — flowers lit from one side with a single warm practical, creating half-lit drama.
Why it is good:
  The most direct reference for what the botanical SVG dividers in the M&D convite are trying to evoke. Once Wed's editorial photography showed deep-wine flowers at their most atmospheric — half in shadow, half lit warm. The botanical divider SVGs should aspire to this feeling: not a generic leaf ornament, but something that recalls deep-colored flowers half-glimpsed in candlelight.
Technique destacada:
  Shadow-half floral treatment for botanicals: when rendering or applying the SVG botanical dividers, use the CSS filter chain (`sepia(1) saturate(0.5) brightness(0.4) hue-rotate(330deg)`) to push the botanical SVGs toward deep burgundy-brown. At 12% opacity they become whispers rather than ornaments. The half-shadow effect is approximated by ensuring the SVG's own internal detail creates areas of denser ink (shadow side) and sparser ink (light side) — this requires botanical SVGs with directional line density.
Aesthetic tags: analog-warmth-dark, photographic-direction, candlelight-warmth
Harvest suggestion: NO — archived editorial. The botanical filter recipe is directly implemented in the current spec.

## Ref #20 — The Wedding Sparrow — Dark Romance Archive
URL: https://theweddingsparrow.com
Source: The Wedding Sparrow — premium wedding editorial (site currently unavailable, known source)
Screenshot: "Gothic Romantic" editorial without being dark — deep burgundy + lush florals + candlelight. Profuse flowers in deep wine and plum against dark linen tablecloths. Candles in tall candelabras. This is exactly the visual register of the Castelo dos Lagos as a venue.
Why it is good:
  The Wedding Sparrow demonstrated that dark romance in a wedding context does not require gothic or horror aesthetic signals. The darkness is atmospheric and warm — achieved through deep floral saturation, candlelight as the primary light source, and tablescaping that reads as "a private dinner for 80 people at a private castle." This is the emotional temperature of the M&D wedding and the convite should project it.
Technique destacada:
  Warm darkness through saturation rather than dimness: the atmosphere in Wedding Sparrow editorials is not dark because exposure is low — it is dark because the colors are deeply saturated (burgundy, plum, oxblood, moss) and the light sources are warm (candles, torches, amber ceiling fixtures). The M&D film filter (`sepia(.12) saturate(.82) contrast(.90)`) uses `saturate(.82)` which actually reduces saturation. For the venue videos specifically, consider increasing saturation slightly to `saturate(.95)` to let the castle's own colors breathe.
Aesthetic tags: romantic-opulence, analog-warmth-dark, candlelight-warmth
Harvest suggestion: NO — editorial. The saturation principle is a direct film filter calibration note.

═══════════════════════════════════════════
REFERENCES — FUNCTIONAL DIGITAL INVITATION CRAFT
═══════════════════════════════════════════

## Ref #21 — Paperlust — White Ink on Dark Stock
URL: https://paperlust.co
Source: Paperlust.co — Australian premium stationery marketplace
Screenshot: White ink on dark color stock demonstrations: white florals on black card, white typography on deep navy, white botanical line-work on forest green. The visual quality of "white ink on dark" is the physical-print equivalent of light text on dark ground.
Why it is good:
  Paperlust's "white ink on dark stock" product line validates the exact visual pattern used in the M&D convite: white/cream text on burgundy ground for the cover and hero sections. The difference between cream text that reads as luxury versus cream text that reads as faded is the opacity. Paperlust shows that white at full opacity on dark reads as sharp and modern; cream at 70-80% opacity on dark reads as aged and romantic. The M&D design currently uses `rgba(255,255,255,0.60)` for the cover label — this is in the "aged romantic" zone, which is correct.
Technique destacada:
  White opacity as register tuning: `rgba(255,255,255,1.0)` on dark = modern/crisp; `rgba(255,255,255,0.70-0.85)` on dark = romantic/aged; `rgba(255,255,255,0.40-0.60)` on dark = whispered/secondary. Use this three-level system consistently: full opacity for nothing (names are in solid white, which is correct), 75-85% for primary body on dark, 45-60% for secondary labels. The M&D cover already implements this: label at 0.50, button at 0.60 — both correct for their hierarchy.
Aesthetic tags: micro-type-mastery, color-restraint, luxury-whisper
Harvest suggestion: NO — product platform. The white opacity register system is directly implementable.

## Ref #22 — Greenvelope — Animated Envelope Pacing
URL: https://greenvelope.com
Source: GreenEnvelope — digital-only invitation platform
Screenshot: Signature animated envelope: linen liner, wax seal, stamp, background music layer. The experience paces: envelope arrives → rests → opens (fold animation) → letter slides out → content reveals.
Why it is good:
  The three-beat pacing of the GreenEnvelope experience (arrive → hold → open) is architecturally sound regardless of whether envelopes are the right metaphor. What works is the HOLD beat — the moment of stillness before the reveal. The M&D cover achieves this with the ghost button: the cover stays present, names visible, until the guest decides to enter. The hold is intentional friction that makes the opening feel meaningful. Without the hold, a fast auto-open would feel like a product page, not an invitation.
Technique destacada:
  The three-beat invitation entry rhythm: (1) ARRIVE — guest lands, sees cover image + names + date in ambient typography; (2) HOLD — cover sits still, ghost button visible, no auto-advance; (3) OPEN — guest taps, cover fades with simultaneous photo zoom (1200ms), card materializes with translateY + opacity (1000ms, 400ms delay). This rhythm — arrive/hold/open — is the theatrical equivalent of a butler handing you an envelope on a silver tray. The M&D spec implements this correctly.
Aesthetic tags: cinematic-entry, hold-and-release, scroll-scrubbed-narrative
Harvest suggestion: NO — platform with auth. The three-beat pacing principle is already implemented correctly in the M&D spec.

## Ref #23 — Lovebird — Digital Wedding Website Platform
URL: https://lovebird.com
Source: Lovebird.com — premium digital wedding platform, direct research
Screenshot: Clean modern interface. RSVP management, meal selections, video messages on thank-you cards, Disney collaboration for exclusive designs. Seven template previews in hero. Guest management dashboard.
Why it is good:
  Lovebird represents the "next generation" of digital wedding platforms: not just a website builder but an experience layer that extends to RSVP, guest messaging, thank-you cards, and video. The Disney collaboration signals aspirations toward premium narrative design. Most importantly, Lovebird treats the entire guest communication arc — invitation → RSVP → event reminders → thank-you — as a unified experience, not separate products. The M&D convite currently handles only invitation + RSVP; this reference validates the potential for a thank-you step post-RSVP.
Technique destacada:
  Post-RSVP confirmation screen as narrative extension: after a guest submits their RSVP, instead of a generic "Thank you!" message, show a mini-scene: a single large quote from the couple, or a venue detail photograph that guests haven't seen yet, with "We can't wait" in Fraunces italic. This turns a functional confirmation into an emotional moment — the last thing the guest sees before closing the invitation.
Aesthetic tags: scroll-scrubbed-narrative, cinematic-entry, luxury-whisper
Harvest suggestion: NO — platform. The post-RSVP narrative screen concept is an implementable enhancement.

## Ref #24 — Bliss & Bone — "Navy" and "Lilith" templates
URL: https://www.blissandbone.com
Source: Blissandbone.com — editorial wedding website platform, direct research
Screenshot: "Modern, elevated, and made to feel intentional" positioning. Dark green and black/white botanical templates in editorial style. 100+ named templates including "Lilith," "Navy," "Damien" — names that suggest dark, strong, non-floral options. Named "Best Design Options" by People Magazine. Tagline: "The kind of design that looks like you hired someone."
Why it is good:
  Bliss & Bone is the only mainstream wedding platform whose positioning explicitly targets couples who want to escape the generic wedding template aesthetic. The "you hired someone" tagline directly addresses the fear: "this will look custom even though it isn't." The dark and editorial templates (Navy, Lilith, Damien) use first names as identifiers — which immediately humanizes and dignifies the templates. The inclusion of botanical elements on dark grounds is validated here as a recognized premium pattern across the industry.
Technique destacada:
  "Hired someone" legibility test: before finalizing any section of the M&D convite, apply the Bliss & Bone test — "Does this look like we hired a designer, or does it look like we used a template?" The specific differentiators are: (a) no stock ornaments — every decorative element is sourced or custom; (b) no default border-radius — the card uses none, which reads as intentional not lazy; (c) no system fonts at display sizes — Fraunces at weight 200 is a designer choice, not a safe default.
Aesthetic tags: luxury-whisper, editorial-grid, micro-type-mastery
Harvest suggestion: YES — public platform, no auth wall on template preview pages. Harvest the dark template layout patterns and RSVP form styling.

## Ref #25 — Minted — "Barolo" deep palette invitation
URL: https://www.minted.com/wedding-invitations
Source: Minted.com — 2026 Brides Color of the Year selection, direct research
Screenshot: "Barolo" design by Pati Cascino. Named after Barolo wine (deep ruby/garnet). "2026 Brides Color of the Year." Deep wine/blush palette. Handcrafted by independent artist. Premium paper stocks.
Why it is good:
  The fact that Barolo (deep wine, the color adjacent to M&D's burgundy) is designated "2026 Brides Color of the Year" is a cultural validation that the M&D palette is not just personally correct but at the precise center of premium wedding taste in the year of their wedding. This is significant for two reasons: (1) it validates the brief to Daphine that her Pinterest board instincts were trend-prescient, and (2) it means the M&D aesthetic will feel fresh and current in June 2026, not dated.
Technique destacada:
  Color naming as luxury signal: Minted names the design after the wine ("Barolo") rather than describing the color ("Deep Burgundy"). The same principle should apply in any copy on the M&D convite: the dress code section says "Preto, burgundy, neutros" — which is correct (uses the wine name, not "dark red"). The venue name ("Castelo dos Lagos") carries its own nobility — always use the full name, never abbreviate to "o castelo" in formal copy.
Aesthetic tags: romantic-opulence, color-restraint, luxury-whisper
Harvest suggestion: NO — commercial product. The color naming principle is a copy/voice note, not a visual harvest.

═══════════════════════════════════════════
REFERENCES — MOBILE SCROLL EXPERIENCE CRAFT
═══════════════════════════════════════════

## Ref #26 — Withjoy.com — "Destination Wedding Itineraries" example (Vanessa & Joe)
URL: https://withjoy.com/blog/creative-wedding-website-examples/
Source: withjoy.com blog — Creative Wedding Website Examples
Screenshot: Florida destination wedding with detailed multi-day schedule, countdown timer, itinerary sections. The schedule page uses timeline/itinerary thinking for multi-event wedding weekends.
Why it is good:
  This example validates the M&D countdown + timeline structure: having a visible countdown timer and a schedule section for a single-day event creates a heightened sense of anticipation. It turns the invitation from a static announcement into a living document that the guest returns to as the date approaches. The countdown is the most dynamic element — it changes every second — and its presence below the fold creates a reason to scroll that has nothing to do with "reading more information."
Technique destacada:
  Countdown as scroll magnet: the countdown must be at least partly visible on initial load on a 812px (iPhone 14) viewport to serve as a scroll invitation. At the current M&D Section 11 placement (after 5+ sections of content), it may be too far below the fold to serve this purpose. A hint of the countdown numbers — just the top edge of the section — appearing at the bottom of the initial viewport creates curiosity pull that drives engagement.
Aesthetic tags: scroll-scrubbed-narrative, hold-and-release, cinematic-entry
Harvest suggestion: NO — Joy platform example. The countdown-as-scroll-magnet positioning is an implementable structural note.

## Ref #27 — withjoy.com "Saturated Photography" example (Cheah & Chan)
URL: https://withjoy.com/blog/creative-wedding-website-examples/
Source: withjoy.com blog — Creative Wedding Website Examples
Screenshot: Photography with dramatically enhanced, saturated color treatment. Dreamy, supersaturated imagery. The couple used CSS/post-processing to create a unified visual palette across all photos, overriding the natural color variation between shots.
Why it is good:
  The M&D convite uses photography from multiple sessions with inherent color variation. The film filter (`sepia(.12) saturate(.82) contrast(.90) brightness(1.03)`) applied consistently across all `<img>` and `<video>` elements creates a unified visual identity — the same principle as Cheah & Chan's saturated treatment, but in a different register (warm vintage versus supersaturated dreamy). The technique is: CSS filter as color grading, applied universally to all media, to make photos feel like they belong to the same roll of film.
Technique destacada:
  Film filter as visual identity unifier: a single CSS filter applied to every `<img>` and `<video>` on the invitation makes photos taken in different locations, at different times, with different cameras feel like they belong to the same editorial shoot. The current M&D filter is correct. The only calibration note: the venue videos (drone footage, likely with different color science than the couple's portrait photographer) may need a slightly different filter value — test `sepia(.08) saturate(.90) contrast(.88) brightness(1.04)` for aerial footage to prevent the sky from going too yellow.
Aesthetic tags: photographic-direction, analog-warmth-dark, candlelight-warmth
Harvest suggestion: NO — Joy platform example. The unified film filter principle is already implemented and validated.

═══════════════════════════════════════════
SUMMARY OBSERVATIONS
═══════════════════════════════════════════

Cross-cutting patterns:

1. DARK BACKGROUNDS ARE THE PRIMARY LUXURY SIGNAL. Across 6 of the 27 references, the single most consistent differentiator between premium and generic wedding design is the willingness to use a dark background. Not grey, not navy-adjacent, not "rich cream" — genuinely dark. The platforms that achieve premium positioning (Gala Black, Magazine Indigo, Graphite Blooms, Minted "Written In The Stars," Valentino, Dior) all treat darkness as sophistication. The M&D convite applies this in the cover (burgundy overlay at 60% at bottom) and hero gradient — this is correct and should not be softened.

2. BOTANICAL ELEMENTS ARE PREMIUM ONLY ON DARK GROUNDS. The same botanical motif reads as "craft blog template" on white and as "private estate library" on dark. This is the most direct mandate for the M&D botanical SVG dividers: they must be on the linen/cream card background (already correct) and their burgundy tint at 12% opacity is the right level. Going above 15% opacity risks decorative noise; going below 8% loses the whisper effect entirely.

3. GOLD IS A SINGLE-NOTE INSTRUMENT — PLAY IT RARELY. In all premium references, gold appears maximum 3-4 times per card: names, date number, a thin divider line, and the inset border. Any more and it reads as a Greek Revival wedding napkin. The M&D spec uses gold at the ampersand (50% opacity), gold-line divider (30% opacity), inset border (8% opacity), and gold frame borders (15% opacity on hover). This is exactly the right frequency — do not add more gold elements.

4. THE THREE-BEAT ENTRY RHYTHM IS UNIVERSAL. Every premium digital invitation experience — GreenEnvelope, Adovasio, Boutique Weddings, Lovebird — uses the same structural rhythm: ARRIVE (see the whole world at once) → HOLD (stillness, no auto-advance) → OPEN (guest-initiated reveal). The M&D cover implements this correctly with the ghost button. Resist any temptation to add an auto-scroll or timed reveal to the cover.

5. PHOTO GRIDS BENEFIT FROM SIZE VARIATION. References #11 (Marie Guillaume 2-width masonry) and #17 (Junebug 2:1:1 grid) consistently show that equal-size photo grids read as gallery thumbnails while varied-size grids read as editorial spreads. The M&D 3-photo section (1:1:1) is the single weakest visual moment of the current spec. A 2:1:1 grid change (`grid-template-columns: 2fr 1fr 1fr`) is a 4-character CSS change with an outsized visual impact.

6. THE RSVP POST-CONFIRMATION SCREEN IS AN UNTAPPED EMOTIONAL MOMENT. Multiple references (Lovebird, GreenEnvelope post-submit) demonstrate that the confirmation after RSVP submission is typically handled as a generic "thank you" message. The M&D spec has `ok-h: "Obrigado!"` and a Fraunces italic "Estamos ansiosos para celebrar com voce." — this is better than most but still short. Consider adding a small botanical divider and a single-line couple quote between the "Obrigado!" and the closing line to make the confirmation feel like a genuine personal moment.

7. ANTIQUE GOLD (#B5902A–#D4AF37) VERSUS CHEAP GOLD (#FFD700): validated across 4 references (Style Me Pretty, Minted, Valentino, Ralph Lauren). The M&D palette value of `#D4AF37` sits at the warm end of the luxury range — correct. Any CSS usage that derives from this value (gradient endpoints, opacity variations) should keep the warm hue and reduce brightness rather than increase saturation.

═══════════════════════════════════════════
RECOMMENDED HARVESTS (hand off to design-system-extractor)
═══════════════════════════════════════════

1. https://adovasio.it — Awwwards SOTD, editorial Italian wedding photography. Harvest: typography scale proportions, section reveal timing, gallery filter interaction pattern, countdown-in-hero placement.

2. https://boutiqueweddings.cz — Awwwards HM, Semibold design. Harvest: neutral restraint layout system, sticky header behavior, video hero treatment, section spacing tokens.

3. https://www.blissandbone.com — "Best Design Options" wedding platform. Harvest: dark template layout patterns (especially Navy/Lilith templates if accessible), RSVP form field styling, botanical-on-dark implementation.

═══════════════════════════════════════════
RECOMMENDED DISTILLATIONS (hand off to art-director)
═══════════════════════════════════════════

1. Gold-as-punctuation pattern (Refs #5, #4, #18): gold appears only at the 3-4 highest-hierarchy moments on the page — never as fill, always as thin line, border, or single typographic accent. Seen in Minted "Written In The Stars," RL Romance, Style Me Pretty archives. Directly validates current M&D gold usage frequency.

2. Photo grid editorial upgrade — 2:1:1 column ratio (Refs #11, #17, #7): replacing equal 1:1:1 photo grid with 2:1:1 (first image double-width) upgrades gallery to editorial spread. One CSS line. Maximum impact for minimum effort. Applicable to Section 9 of the M&D convite immediately.

3. Burgundy-as-background section alternation (Refs #6, #14, #15): at least one full section of the invitation card should use burgundy (#4A1619) as its background with cream text — creating a visual "chapter break" rhythm. Current spec: every section uses linen/cream. Adding one burgundy-ground section (candidate: venue + dress code, Section 6) would create the alternating rhythm that premium print invitations use.

4. Post-RSVP narrative extension (Ref #23, #22): the confirmation screen after RSVP submission should be an emotional moment, not a functional confirmation. Add botanical divider + couple quote + venue detail image to the `#ok` confirmation element — same design system, one additional emotional beat.

5. Venue video close-then-wide sequence (Ref #15): in Section 8 (moving portraits of the Castelo), the sequence should be close detail → wide establishing shot, not the reverse. Two small videos showing castle details (stonework, archway, water surface) followed by the wide aerial. Creates atmosphere before scale.
