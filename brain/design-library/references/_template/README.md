# Reference Template

Copy this entire folder and rename to `{kebab-case-site-name}/` when extracting a new reference.

## Expected contents

```
{site-name}/
  html.html              # rendered HTML (post-hydration)
  css.css                # concatenated stylesheets
  js.js                  # inline + linked JS
  assets/                # images, videos, fonts, lotties
    images/
    videos/
    fonts/
  screenshots/
    desktop-full.png     # 1440px full-page
    desktop-hero.png     # 1440px viewport only
    mobile-full.png      # 390px full-page
    mobile-hero.png      # 390px viewport only
  observations.md        # see observations.md
  motion-config.md       # see motion-config.md
```

## Rules

- Never edit `html.html`, `css.css`, `js.js` after extraction. They are the archive.
- Strip only things that block the file from being saved (CSP headers, nonces).
- `observations.md` and `motion-config.md` are the living analysis — update freely.
- If the page has multiple distinct "scenes" worth capturing, create sub-folders: `scenes/hero/`, `scenes/product-spin/`, etc.
