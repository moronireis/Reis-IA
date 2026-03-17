# AIOX — Token Export Page
URL: https://brand.aioxsquad.ai/brandbook/token-export

## Page Purpose
Copy-paste-ready theme tokens for Tailwind + shadcn/ui projects. Provides both Lime and Gold theme CSS variable blocks.

## Content Structure
1. **Header** — "Token Export"
2. **Subtitle** — "Copy AIOX theme tokens for Tailwind + shadcn/ui projects"
3. **Instructions (01)** — "Copy · Paste · Ship" — 4-step guide
4. **Lime Theme CSS Block** — Complete variable set
5. **Gold Theme CSS Block** — Complete variable set
6. **Compatibility note** — "Compatible with Tailwind CSS v3 + v4, shadcn/ui, and Lovable."

## Lime Theme Export (Verbatim)
```css
--background: #050505;
--foreground: #F4F4E8;
--primary: #D1FF00;
--primary-foreground: #050505;
--card: #0F0F11;
--card-foreground: #F4F4E8;
--popover: #0F0F11;
--secondary: #1C1E19;
--muted: #111113;
--muted-foreground: rgba(245, 244, 231, 0.4);
--accent: rgba(209, 255, 0, 0.1);
--accent-foreground: #D1FF00;
--destructive: #EF4444;
--destructive-foreground: #FFFFFF;
--border: rgba(156, 156, 156, 0.15);
--input: rgba(156, 156, 156, 0.2);
--ring: rgba(209, 255, 0, 0.4);
--radius: 0.5rem;
--surface: #0F0F11;
--surface-alt: #1C1E19;
--dim: rgba(245, 244, 231, 0.4);
--blue: #0099FF;
--flare: #ED4609;
--error: #EF4444;
--warning: #F59E0B;
--font-sans: "Geist", "Inter", system-ui, sans-serif;
--font-mono: "Geist Mono", "Roboto Mono", monospace;
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-decel: cubic-bezier(0, 0, 0.2, 1);
```

## Gold Theme Export
```css
--primary: #DDD1BB;
--background: (adjusted dark values);
--foreground: #F4F4F4;
/* Warm tones replacing lime throughout */
```

## Navigation Context
- Position: Design System > Tokens > Token Export
- Final page in the Tokens subsection

## Key Design Decisions
- One-click copy for entire theme
- Tailwind v3 + v4 compatibility (no oklch dependency in exports)
- Font stack includes Inter as fallback (matches Reis IA!)
- Easing curves included in export (not just colors)
- Lovable platform compatibility noted
