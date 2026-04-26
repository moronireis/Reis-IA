# Pentagram — Motion Config

Source: https://www.pentagram.com
Harvested: 2026-04-15

## Libraries Detected

No motion library strings in the static HTML payload.

## Signature Motion

Pentagram's motion is as restrained as its color palette. Observable moves:
- **Case-study thumbnail hover** — images scale slightly (1.02–1.05) and reveal a title overlay
- **Page transitions** — between the home and individual case-study pages, there is a subtle fade/slide (likely a client-side route transition)
- **Scroll reveals** — fade-in on IntersectionObserver, very subtle

That's essentially it. Pentagram's home is nearly static. The movement comes from the thumbnails themselves (which may be videos or animated GIFs) and from the reader's own scrolling.

## Easing & Duration

- 300–400ms for image hovers
- Ease-out curves, probably `cubic-bezier(0.16, 1, 0.3, 1)` or similar

## Scroll Behavior

- Native scroll
- No smooth-scroll library
- No parallax (this would violate the Swiss discipline)

## Transferable for REIS [IA]

The Pentagram lesson is the most humbling one: **the work itself should be the motion**. If the REIS home shows case-study imagery or method artifact videos, those pieces should carry the movement budget, and the chrome around them should hold still. This is the opposite of most SaaS sites which surround static screenshots with animated backgrounds.
