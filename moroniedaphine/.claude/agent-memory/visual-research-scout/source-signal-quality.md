---
name: Source Signal Quality — Wedding/Invitation Research
description: Which web sources return usable content vs. fail for wedding/digital invitation curation tasks
type: feedback
---

## HIGH SIGNAL — Returns usable content

- **withjoy.com/designs** — Full template list accessible. Names: Gala Black, Magazine Indigo, Graphite Blooms, Navy and Blush confirmed. Blog posts return template descriptions.
- **minted.com/wedding-invitations** — Product names and designer credits accessible. Burgund/dark designs: Elizabeth (Helena Vitto), Written In The Stars, Barolo, Romantics.
- **awwwards.com/websites/wedding/** — Returns curated list with URLs, HM/SOTD status, designer credits. Best entry point for award-winning wedding sites.
- **awwwards.com/inspiration/search?text=wedding+invitation** — Returns same wedding site list + additional results.
- **withjoy.com/blog/creative-wedding-website-examples/** — Full 22-example list with couple names, template names, visual descriptions.
- **withjoy.com/blog/23-beautiful-wedding-invitation-websites/** — Full 18+ platform list with descriptions.
- **greenvelope.com** — Homepage loads, platform features described. Design catalog not itemized.
- **lovebird.com** — Homepage loads, platform features and positioning described.
- **blissandbone.com** — Returns full 70+ template name list, positioning copy, feature set. Individual template preview pages 404.
- **blissandbone.com/wedding-websites** — Returns full template list (names only, no visual descriptions).
- **paperlust.co** — Platform description accessible. Specific dark design catalog not itemized in HTML.
- **boutiqueweddings.cz** — Full site accessible, design description extractable.
- **marieguillaume.com** — Full site accessible.
- **danieleandmarilia.com** — Full site accessible.
- **adovasio.it** — Accessible, editorial Italian photography portfolio.
- **pichonbaron.com/en/** — Full site accessible, luxury wine estate.

## LOW SIGNAL — Partial or no content returned

- **withjoy.com/designs/{template-name}** — Individual template pages 404.
- **blissandbone.com/wedding-websites/{template-name}** — Individual template pages 404.
- **paperlust.co/wedding-invitations/dark-wedding** — Page loads but catalog not in HTML text layer (likely JS-rendered gallery).

## BLOCKED / FAIL — Do not retry without different approach

- **paperlesspost.com** (most paths) — 404 on specific collection/category URLs. Homepage and /wedding-invitations path fail. Try /paper/collections/ paths.
- **zola.com/explore/website-designs** and **/shop/** paths — 404 consistently.
- **theknot.com/wedding-websites/themes** — 404.
- **etsy.com** (search + listing pages) — 403 consistently.
- **siteinspire.com** — 429 rate limit.
- **land-book.com** — 403.
- **godly.website** — 403.
- **brides.com** — Blocked entirely ("Claude Code is unable to fetch").
- **magnoliarouge.com** — 403.
- **theweddingsparrow.com** — ECONNREFUSED (site down).
- **oncewed.com** — Redirects to stillwhite.com (domain acquired, content gone).
- **stylemepretty.com** — Redirects to /vault (auth required).
- **dior.com** — 403.
- **valentino.com** — 404 on specific collection paths.
- **roccofortehotels.com** (specific bar page) — 403.
- **canva.com** — 403.
- **vistaprint.com** — 404 on digital wedding paths.
- **junebugweddings.com/wedding-blog/dark-wedding/** — 404.
- **paperlesspost.com/paper/designs/designer/{name}** — 404.
- **obsesd.dk** — ECONNREFUSED (site down).

## Why (pattern observed):
- Large SaaS wedding platforms (Zola, The Knot, Paperless Post) gate their design catalogs behind JS rendering — the HTML layer returned by WebFetch contains only navigation/shell, not product grid content.
- Luxury brands (Dior, Valentino, Rocco Forte) use CDN/auth/CORS protection on product pages.
- Curation aggregators (Siteinspire, Land-book, Godly) rate-limit or block non-browser user agents.
- The most reliable approach for wedding design research: Awwwards search → direct URL fetch of winning sites. Awwwards returns real URLs with context.
