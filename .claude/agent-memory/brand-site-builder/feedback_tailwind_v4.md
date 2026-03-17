---
name: Tailwind CSS v4 compatibility
description: @astrojs/tailwind is incompatible with Tailwind v4 - use @tailwindcss/vite plugin instead
type: feedback
---

Do NOT use `@astrojs/tailwind` with Tailwind CSS v4. It has a peer dependency on tailwindcss ^3.x.

**Why:** npm install fails with ERESOLVE dependency conflict.

**How to apply:** Use `@tailwindcss/vite` as a Vite plugin in `astro.config.mjs`:
```js
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
```
Import Tailwind in CSS with `@import "tailwindcss"` (v4 syntax, no @tailwind directives).
