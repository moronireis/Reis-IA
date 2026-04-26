# ZNITH Design System — Component Library

**Last updated:** April 2026
**Version:** 1.0
**Status:** Production Reference

---

## Design Token Quick Reference

| Token | Value | Tailwind Equivalent |
|---|---|---|
| Background | `#091022` | `bg-[#091022]` |
| Surface | `#14203A` | `bg-[#14203A]` |
| Elevated | `#1C2A4A` | `bg-[#1C2A4A]` |
| Gold Primary | `#DF9F3E` | `text-[#DF9F3E]` |
| Gold Light | `#FFD161` | `text-[#FFD161]` |
| Gold Deep | `#B8860B` | `text-[#B8860B]` |
| Text Primary | `#FFFFFF` | `text-white` |
| Text Secondary | `#BBBBBB` | `text-[#BBBBBB]` |
| Text Muted | `#7A7A7A` | `text-[#7A7A7A]` |
| Border | `#2A3A5A` | `border-[#2A3A5A]` |
| Border Radius MD | `8px` | `rounded-lg` |
| Border Radius LG | `12px` | `rounded-xl` |
| Spacing Base | `4px` | — |

---

## 1. Buttons

### Sizing Scale

| Size | Height | Padding X | Font Size | Letter Spacing |
|---|---|---|---|---|
| `sm` | 32px | 12px | 13px | 0.08em |
| `md` | 40px | 20px | 14px | 0.08em |
| `lg` | 48px | 28px | 16px | 0.1em |

---

### 1.1 Primary Button

**Purpose:** Main conversion action. Gold gradient, high contrast, Cinzel uppercase.

```
Background:   linear-gradient(135deg, #DF9F3E 0%, #FFD161 100%)
Color:        #000000
Font:         Cinzel, serif
Font-weight:  700
Text-transform: uppercase
Letter-spacing: 0.08em
Border-radius: 8px
Box-shadow:   0 0 21px rgba(255, 209, 97, 0.3)
Animation:    pulse-gold — keyframes opacity 0.7 → 1.0, 1.5s ease-in-out infinite
```

**States:**

| State | CSS |
|---|---|
| Default | Gradient #DF9F3E → #FFD161, shadow 0 0 21px rgba(255,209,97,0.3) |
| Hover | Gradient #FFD161 → #DF9F3E (reversed), scale(1.02), shadow 0 0 32px rgba(255,209,97,0.5) |
| Active | scale(0.98), shadow reduced to 0 0 12px rgba(255,209,97,0.3) |
| Focus | Outline: 2px solid #FFD161, outline-offset: 3px |
| Disabled | opacity: 0.4, cursor: not-allowed, animation paused |

**Tailwind (md size):**
```html
<button class="h-10 px-5 bg-gradient-to-br from-[#DF9F3E] to-[#FFD161]
  text-black font-cinzel font-bold text-sm uppercase tracking-widest
  rounded-lg shadow-[0_0_21px_rgba(255,209,97,0.3)]
  hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,209,97,0.5)]
  active:scale-[0.98] focus:outline focus:outline-[#FFD161]
  disabled:opacity-40 disabled:cursor-not-allowed
  transition-all duration-200">
  Label
</button>
```

**Keyframe — pulse-gold:**
```css
@keyframes pulse-gold {
  0%, 100% { opacity: 1.0; }
  50%       { opacity: 0.7; }
}
```

---

### 1.2 Secondary Button

**Purpose:** Secondary actions. Ghost-style with gold border.

```
Background:     transparent
Border:         1px solid #DF9F3E
Color:          #DF9F3E
Font:           Montserrat, sans-serif
Font-weight:    500
Text-transform: uppercase
Letter-spacing: 0.06em
Border-radius:  8px
```

**States:**

| State | CSS |
|---|---|
| Default | transparent bg, border #DF9F3E, text #DF9F3E |
| Hover | background #DF9F3E, color #000000, border #DF9F3E |
| Active | background #B8860B, border #B8860B, scale(0.98) |
| Focus | Outline: 2px solid #FFD161, outline-offset: 3px |
| Disabled | opacity: 0.4, cursor: not-allowed |

**Tailwind (md size):**
```html
<button class="h-10 px-5 bg-transparent border border-[#DF9F3E]
  text-[#DF9F3E] font-montserrat font-medium text-sm uppercase tracking-wide
  rounded-lg
  hover:bg-[#DF9F3E] hover:text-black
  active:bg-[#B8860B] active:border-[#B8860B] active:scale-[0.98]
  focus:outline focus:outline-[#FFD161]
  disabled:opacity-40 disabled:cursor-not-allowed
  transition-all duration-200">
  Label
</button>
```

---

### 1.3 Ghost Button

**Purpose:** Tertiary or low-emphasis actions. No border, text only.

```
Background:     transparent
Border:         none
Color:          #DF9F3E
Font:           Montserrat, sans-serif
Font-weight:    400
Text-decoration: none (default)
```

**States:**

| State | CSS |
|---|---|
| Default | transparent, text #DF9F3E, no underline |
| Hover | text-decoration: underline, text #FFD161 |
| Active | text #B8860B |
| Focus | Outline: 2px solid #FFD161, outline-offset: 2px |
| Disabled | opacity: 0.4, cursor: not-allowed |

**Tailwind (md size):**
```html
<button class="h-10 px-5 bg-transparent border-none
  text-[#DF9F3E] font-montserrat text-sm
  hover:underline hover:text-[#FFD161]
  active:text-[#B8860B]
  focus:outline focus:outline-[#FFD161]
  disabled:opacity-40 disabled:cursor-not-allowed
  transition-colors duration-200">
  Label
</button>
```

---

### 1.4 Danger Button

**Purpose:** Destructive or high-risk actions (delete, revoke, cancel contract).

```
Background:     #7F1D1D (dark red)
Border:         1px solid #991B1B
Color:          #FFFFFF
Font:           Montserrat, sans-serif
Font-weight:    500
Border-radius:  8px
```

**States:**

| State | CSS |
|---|---|
| Default | bg #7F1D1D, border #991B1B |
| Hover | bg #991B1B, border #B91C1C, scale(1.02) |
| Active | bg #6B1212, scale(0.98) |
| Focus | Outline: 2px solid #FC8181, outline-offset: 3px |
| Disabled | opacity: 0.4, cursor: not-allowed |

**Tailwind (md size):**
```html
<button class="h-10 px-5 bg-red-900 border border-red-800
  text-white font-montserrat font-medium text-sm
  rounded-lg
  hover:bg-red-800 hover:scale-[1.02]
  active:bg-red-950 active:scale-[0.98]
  focus:outline focus:outline-red-400
  disabled:opacity-40 disabled:cursor-not-allowed
  transition-all duration-200">
  Label
</button>
```

---

## 2. Cards

### 2.1 Content Card

**Purpose:** General content container. Default card pattern.

```
Background:     #14203A
Border:         1px solid #2A3A5A
Border-radius:  12px
Padding:        24px
Transition:     border-color 0.2s ease, box-shadow 0.2s ease
```

**Hover state:**
```
Border-color:   #DF9F3E
Box-shadow:     0 0 24px rgba(223, 159, 62, 0.15)
```

**Tailwind:**
```html
<div class="bg-[#14203A] border border-[#2A3A5A] rounded-xl p-6
  hover:border-[#DF9F3E] hover:shadow-[0_0_24px_rgba(223,159,62,0.15)]
  transition-all duration-200">
  <!-- content -->
</div>
```

---

### 2.2 Feature Card

**Purpose:** Showcasing features, services, or capabilities with icon.

**Structure:**
```
[Icon slot — 48x48px, gold stroke SVG]
[Title — Cinzel, 20px, white]
[Description — Montserrat, 15px, #BBBBBB, line-height 1.6]
```

**CSS:**
```
Background:     #14203A
Border:         1px solid #2A3A5A
Border-radius:  12px
Padding:        28px 24px
Icon wrapper:   48px × 48px, background #1C2A4A, border-radius 8px,
                display flex, align-items center, justify-content center
                margin-bottom: 20px
Title margin:   0 0 10px
```

**Hover:** Same as Content Card (border gold + subtle glow)

**Tailwind:**
```html
<div class="bg-[#14203A] border border-[#2A3A5A] rounded-xl p-7
  hover:border-[#DF9F3E] hover:shadow-[0_0_24px_rgba(223,159,62,0.15)]
  transition-all duration-200">
  <div class="w-12 h-12 bg-[#1C2A4A] rounded-lg flex items-center justify-center mb-5">
    <!-- SVG icon -->
  </div>
  <h3 class="font-cinzel font-semibold text-xl text-white mb-2.5">Title</h3>
  <p class="font-montserrat text-[15px] text-[#BBBBBB] leading-relaxed">Description</p>
</div>
```

---

### 2.3 Testimonial Card

**Purpose:** Social proof, client quotes.

**Structure:**
```
[Quote icon — 24px, gold]
[Quote text — Cinzel italic, 18px, white, line-height 1.7]
[Divider — 1px #2A3A5A, margin 16px 0]
[Author block — optional photo (40px circle) + name (Montserrat 15px white bold) + title (Montserrat 13px #7A7A7A)]
```

**CSS:**
```
Background:     #14203A
Border:         1px solid #2A3A5A
Border-radius:  12px
Padding:        28px 24px
Quote icon:     color #DF9F3E, margin-bottom 16px
```

**Tailwind:**
```html
<div class="bg-[#14203A] border border-[#2A3A5A] rounded-xl p-7">
  <!-- Quote icon SVG, gold, 24px -->
  <blockquote class="font-cinzel font-normal italic text-[18px] text-white leading-[1.7] mb-4">
    "Quote text here."
  </blockquote>
  <hr class="border-[#2A3A5A] my-4" />
  <div class="flex items-center gap-3">
    <img class="w-10 h-10 rounded-full object-cover" src="photo.jpg" alt="Author" /> <!-- optional -->
    <div>
      <p class="font-montserrat font-bold text-[15px] text-white">Author Name</p>
      <p class="font-montserrat text-[13px] text-[#7A7A7A]">Title, Company</p>
    </div>
  </div>
</div>
```

---

### 2.4 Service Card

**Purpose:** Product or service listing with pricing and CTA.

**Structure:**
```
[Service name — Cinzel 22px, white]
[Optional subtitle/tagline — Montserrat 14px, #DF9F3E, uppercase]
[Price — Cinzel 36px, gold; optional /month label Montserrat 14px #7A7A7A]
[Divider]
[Features list — Montserrat 14px #BBBBBB, checkmark icon gold, gap 10px]
[CTA Button — Primary or Secondary, full width]
```

**CSS:**
```
Background:     #14203A
Border:         1px solid #2A3A5A
Border-radius:  12px
Padding:        32px 28px
Featured state: border-color #DF9F3E, box-shadow 0 0 32px rgba(223,159,62,0.2)
```

**Tailwind:**
```html
<div class="bg-[#14203A] border border-[#2A3A5A] rounded-xl p-8
  [&.featured]:border-[#DF9F3E] [&.featured]:shadow-[0_0_32px_rgba(223,159,62,0.2)]">
  <p class="font-montserrat text-sm text-[#DF9F3E] uppercase tracking-[0.1em] mb-2">Tagline</p>
  <h3 class="font-cinzel font-semibold text-[22px] text-white mb-4">Service Name</h3>
  <div class="mb-6">
    <span class="font-cinzel font-bold text-4xl text-[#DF9F3E]">R$9.900</span>
    <span class="font-montserrat text-sm text-[#7A7A7A] ml-1">/projeto</span>
  </div>
  <hr class="border-[#2A3A5A] mb-6" />
  <ul class="space-y-2.5 mb-8">
    <li class="flex items-start gap-2.5 font-montserrat text-sm text-[#BBBBBB]">
      <!-- check icon gold --> Feature item
    </li>
  </ul>
  <!-- Primary or Secondary Button, w-full -->
</div>
```

---

### 2.5 Stat Card

**Purpose:** Highlight a key metric or achievement.

**Structure:**
```
[Number — Cinzel 48-56px, weight 700, #DF9F3E]
[Optional unit (%, x, K, M) — same font, 32px]
[Label — Montserrat 14px, white, weight 500]
[Optional description — Montserrat 12px, #7A7A7A]
```

**CSS:**
```
Background:     #14203A
Border:         1px solid #2A3A5A
Border-radius:  12px
Padding:        28px 24px
Text-align:     center
```

**Tailwind:**
```html
<div class="bg-[#14203A] border border-[#2A3A5A] rounded-xl p-7 text-center">
  <p class="font-cinzel font-bold text-[52px] leading-none text-[#DF9F3E] mb-2">
    240<span class="text-3xl">%</span>
  </p>
  <p class="font-montserrat font-medium text-sm text-white mb-1">Crescimento médio</p>
  <p class="font-montserrat text-xs text-[#7A7A7A]">em 90 dias de engajamento</p>
</div>
```

---

## 3. Navigation

### 3.1 Header

**Purpose:** Primary site navigation. Fixed position, always visible.

```
Height:         72px
Background:     #14203A
Border-bottom:  1px solid #2A3A5A
Position:       fixed, top 0, left 0, right 0
Z-index:        100
Backdrop-filter: blur(8px) — subtle glass effect when scrolled
Layout:         flex, align-items center, justify-content space-between
Padding:        0 48px (desktop), 0 20px (mobile)
```

**Logo (left):**
```
Width:          approx 15% of container
Font:           Cinzel, weight 300, white — "ZNITH" + gold "[AI]"
```

**Navigation links (center/right):**
```
Font:           Montserrat, 16px, weight 500
Color:          #FFFFFF
Hover color:    #DF9F3E
Hover border:   3px solid #DF9F3E, bottom edge
Transition:     color 0.2s, border 0.2s
Gap between:    32px
```

**Tailwind:**
```html
<header class="fixed top-0 left-0 right-0 h-[72px] bg-[#14203A] border-b border-[#2A3A5A]
  z-[100] flex items-center justify-between px-12">
  <a href="/" class="font-cinzel font-light text-2xl text-white">
    ZNITH <span class="text-[#DF9F3E]">[AI]</span>
  </a>
  <nav class="hidden md:flex items-center gap-8">
    <a href="#" class="font-montserrat font-medium text-base text-white
      hover:text-[#DF9F3E] border-b-2 border-transparent
      hover:border-[#DF9F3E] pb-0.5 transition-all duration-200">
      Link
    </a>
  </nav>
  <div class="flex items-center gap-4">
    <!-- CTA Button -->
    <!-- Hamburger (mobile only) -->
  </div>
</header>
```

---

### 3.2 Mobile Menu

**Purpose:** Full-screen navigation overlay for mobile viewports.

```
Trigger:        Hamburger icon — 3 lines, white, 24px, stroke 2px, rounded caps
                On open: morphs to X close icon (CSS transition)
Overlay:        position fixed, inset 0, background rgba(9,16,34,0.97)
                backdrop-filter blur(12px)
                z-index: 200
Layout:         flex, flex-direction column, align-items center, justify-content center
Items:          Cinzel, 24px, white, gap 32px between items
Close button:   top-right corner, 48x48 touch target
```

**Menu item states:**

| State | CSS |
|---|---|
| Default | Cinzel 24px, white |
| Hover | text #DF9F3E |
| Active/Current | text #DF9F3E, border-bottom 2px #DF9F3E |

**Tailwind:**
```html
<!-- Hamburger trigger -->
<button class="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
  <span class="w-6 h-0.5 bg-white rounded-full"></span>
  <span class="w-6 h-0.5 bg-white rounded-full"></span>
  <span class="w-6 h-0.5 bg-white rounded-full"></span>
</button>

<!-- Overlay -->
<div class="fixed inset-0 bg-[#091022]/97 backdrop-blur-lg z-[200]
  flex flex-col items-center justify-center gap-8">
  <a href="#" class="font-cinzel text-2xl text-white hover:text-[#DF9F3E] transition-colors">
    Link
  </a>
</div>
```

---

### 3.3 Dropdown Menu

**Purpose:** Sub-navigation for multi-page sections.

```
Background:     #091022
Border:         1px solid #2A3A5A
Border-radius:  8px
Box-shadow:     0 16px 48px rgba(0,0,0,0.5)
Padding:        8px 0
Min-width:      200px
Position:       absolute, top 100% of trigger, left aligned
```

**Dropdown item:**
```
Padding:        10px 16px
Font:           Montserrat, 14px, weight 400, #BBBBBB
Hover:          background rgba(223,159,62,0.1), color #DF9F3E
```

**Tailwind:**
```html
<div class="absolute top-full left-0 mt-1 bg-[#091022] border border-[#2A3A5A]
  rounded-lg shadow-[0_16px_48px_rgba(0,0,0,0.5)] py-2 min-w-[200px] z-50">
  <a href="#" class="block px-4 py-2.5 font-montserrat text-sm text-[#BBBBBB]
    hover:bg-[#DF9F3E]/10 hover:text-[#DF9F3E] transition-colors">
    Item
  </a>
</div>
```

---

### 3.4 Footer

**Purpose:** Site-wide footer with navigation, branding, and legal.

```
Background:     #091022
Border-top:     1px solid #2A3A5A
Padding:        64px 48px 32px (desktop), 40px 20px 24px (mobile)
Layout:         4-column grid (desktop), 2-column (tablet), 1-column (mobile)
Column gap:     40px
```

**Footer anatomy:**
```
Row 1 (grid):
  Col 1 — Logo + tagline + brief description (Montserrat 14px #7A7A7A)
  Col 2 — Navigation group (Cinzel 12px uppercase label + links)
  Col 3 — Navigation group
  Col 4 — Social icons + contact info

Row 2 (bottom bar):
  Left: Copyright (Montserrat 12px #7A7A7A)
  Right: Legal links (Montserrat 12px gold)
  Divider: border-top 1px #2A3A5A, margin-top 40px
```

**Footer link styles:**
```
Default:    Montserrat 14px, #BBBBBB
Hover:      color #DF9F3E
Transition: color 0.2s
```

---

## 4. Forms

### 4.1 Text Input

```
Background:       #14203A
Border:           1px solid #2A3A5A
Border-radius:    8px
Padding:          12px 16px
Font:             Montserrat, 14px, weight 400
Color:            #FFFFFF
Placeholder:      color #7A7A7A
Width:            100% (default)
Height:           44px
Caret-color:      #DF9F3E
```

**States:**

| State | CSS |
|---|---|
| Default | border #2A3A5A |
| Focus | border-color #DF9F3E, box-shadow 0 0 0 3px rgba(223,159,62,0.15), outline none |
| Hover (unfocused) | border-color #3A4A6A |
| Filled | border-color #2A3A5A (no change, content signals state) |
| Error | border-color #E53E3E, box-shadow 0 0 0 3px rgba(229,62,62,0.15) |
| Disabled | opacity: 0.5, cursor not-allowed, background #0D1928 |

**Tailwind:**
```html
<input type="text"
  class="w-full h-11 bg-[#14203A] border border-[#2A3A5A] rounded-lg px-4
  font-montserrat text-sm text-white placeholder-[#7A7A7A]
  caret-[#DF9F3E]
  focus:border-[#DF9F3E] focus:shadow-[0_0_0_3px_rgba(223,159,62,0.15)] focus:outline-none
  hover:border-[#3A4A6A]
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200" />
```

---

### 4.2 Textarea

Same visual system as Text Input with height override.

```
Min-height:     120px
Resize:         vertical
Padding:        14px 16px
```

**Tailwind:**
```html
<textarea
  class="w-full min-h-[120px] bg-[#14203A] border border-[#2A3A5A] rounded-lg px-4 py-3.5
  font-montserrat text-sm text-white placeholder-[#7A7A7A] resize-y
  caret-[#DF9F3E]
  focus:border-[#DF9F3E] focus:shadow-[0_0_0_3px_rgba(223,159,62,0.15)] focus:outline-none
  hover:border-[#3A4A6A]
  transition-all duration-200">
</textarea>
```

---

### 4.3 Select

Same visual as Text Input with custom gold dropdown arrow.

```
Appearance:     none (removes native arrow)
Background-image: SVG chevron-down, gold (#DF9F3E)
Background-position: right 16px center
Background-repeat: no-repeat
Padding-right:  48px
Cursor:         pointer
```

**Custom arrow SVG (inline):**
```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23DF9F3E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
```

---

### 4.4 Checkbox

```
Size:           18px × 18px
Border:         1.5px solid #2A3A5A
Border-radius:  4px
Background:     #14203A
Checked:
  Background:   #DF9F3E
  Border:       1.5px solid #DF9F3E
  Checkmark:    white SVG stroke icon, 11px
Focus:          ring 2px rgba(223,159,62,0.3)
```

**Structure:**
```html
<label class="flex items-center gap-3 cursor-pointer group">
  <input type="checkbox" class="sr-only peer" />
  <div class="w-[18px] h-[18px] rounded border-[1.5px] border-[#2A3A5A] bg-[#14203A]
    flex items-center justify-center
    peer-checked:bg-[#DF9F3E] peer-checked:border-[#DF9F3E]
    peer-focus:ring-2 peer-focus:ring-[#DF9F3E]/30
    transition-all duration-150">
    <!-- checkmark SVG, hidden until checked -->
  </div>
  <span class="font-montserrat text-sm text-[#BBBBBB] group-hover:text-white transition-colors">
    Label text
  </span>
</label>
```

---

### 4.5 Radio

```
Size:           18px × 18px
Border:         1.5px solid #2A3A5A
Border-radius:  9999px (circle)
Background:     #14203A
Checked:
  Border:       1.5px solid #DF9F3E
  Inner dot:    8px circle, background #DF9F3E, centered
```

---

### 4.6 Label

```
Font:             Montserrat, 13px, weight 600
Color:            #BBBBBB
Text-transform:   uppercase
Letter-spacing:   0.05em
Margin-bottom:    8px
Display:          block
```

**Tailwind:**
```html
<label class="block font-montserrat font-semibold text-[13px] text-[#BBBBBB]
  uppercase tracking-[0.05em] mb-2">
  Field Label
</label>
```

---

### 4.7 Error State

Applied to the input wrapper. Error message appears below the field.

```
Input border:       1px solid #E53E3E
Input shadow:       0 0 0 3px rgba(229,62,62,0.15)
Error message:      Montserrat, 12px, color #FC8181
                    margin-top: 6px
                    prefix with warning icon (12px, #FC8181)
```

**Tailwind:**
```html
<div>
  <input class="... border-[#E53E3E] shadow-[0_0_0_3px_rgba(229,62,62,0.15)]" />
  <p class="mt-1.5 font-montserrat text-xs text-[#FC8181] flex items-center gap-1">
    <!-- warning icon --> Error message text
  </p>
</div>
```

---

### 4.8 Helper Text

```
Font:         Montserrat, 12px, weight 400
Color:        #7A7A7A
Margin-top:   6px
```

**Tailwind:**
```html
<p class="mt-1.5 font-montserrat text-xs text-[#7A7A7A]">Helper message</p>
```

---

## 5. Typography Components

### 5.1 Scale Reference

| Style | Font | Size | Weight | Color | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| Display | Cinzel | 48–72px | 700 | #FFFFFF | 1.1 | -0.02em |
| H1 | Cinzel | 36–40px | 700 | #FFFFFF | 1.15 | -0.01em |
| H2 | Cinzel | 28–32px | 600 | #FFFFFF | 1.2 | -0.01em |
| H3 | Cinzel | 22–24px | 600 | #FFFFFF | 1.3 | 0 |
| H4 | Montserrat | 18–20px | 600 | #FFFFFF | 1.4 | 0 |
| H5 | Montserrat | 16px | 600 | #BBBBBB | 1.4 | 0.05em |
| H6 | Montserrat | 14px | 500 | #7A7A7A | 1.4 | 0.05em |
| Body Large | Montserrat | 18px | 400 | #BBBBBB | 1.7 | 0 |
| Body | Montserrat | 16px | 400 | #BBBBBB | 1.6 | 0 |
| Body Small | Montserrat | 14px | 400 | #7A7A7A | 1.5 | 0 |
| Caption | Montserrat | 12px | 400 | #7A7A7A | 1.4 | 0 |
| Overline | Montserrat | 12px | 600 | #DF9F3E | 1.0 | 0.1em |
| Quote | Cinzel | 20–24px | 400 | #FFFFFF | 1.6 | 0 |
| Tagline | Montserrat | 14–16px | 400 | #DF9F3E | 1.4 | 0.15em |

---

### 5.2 CSS Definitions

**Display:**
```css
.text-display {
  font-family: 'Cinzel', serif;
  font-size: clamp(48px, 7vw, 72px);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

**H1–H3 (Cinzel):**
```css
h1, .h1 { font-family: 'Cinzel', serif; font-size: clamp(32px, 5vw, 40px); font-weight: 700; color: #FFFFFF; line-height: 1.15; letter-spacing: -0.01em; }
h2, .h2 { font-family: 'Cinzel', serif; font-size: clamp(24px, 4vw, 32px); font-weight: 600; color: #FFFFFF; line-height: 1.2; letter-spacing: -0.01em; }
h3, .h3 { font-family: 'Cinzel', serif; font-size: clamp(20px, 3vw, 24px); font-weight: 600; color: #FFFFFF; line-height: 1.3; }
```

**H4–H6 (Montserrat):**
```css
h4, .h4 { font-family: 'Montserrat', sans-serif; font-size: clamp(18px, 2.5vw, 20px); font-weight: 600; color: #FFFFFF; line-height: 1.4; }
h5, .h5 { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 600; color: #BBBBBB; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.4; }
h6, .h6 { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.4; }
```

**Body variants:**
```css
.body-lg    { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 400; color: #BBBBBB; line-height: 1.7; }
.body       { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 400; color: #BBBBBB; line-height: 1.6; }
.body-sm    { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 400; color: #7A7A7A; line-height: 1.5; }
.caption    { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 400; color: #7A7A7A; line-height: 1.4; }
.overline   { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; color: #DF9F3E; text-transform: uppercase; letter-spacing: 0.1em; }
.tagline    { font-family: 'Montserrat', sans-serif; font-size: clamp(14px, 1.5vw, 16px); font-weight: 400; color: #DF9F3E; text-transform: uppercase; letter-spacing: 0.15em; }
```

**Quote:**
```css
.quote {
  font-family: 'Cinzel', serif;
  font-size: clamp(20px, 2.5vw, 24px);
  font-weight: 400;
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.6;
  padding-left: 20px;
  border-left: 3px solid #DF9F3E;
}
```

**Tailwind — Overline example:**
```html
<p class="font-montserrat font-semibold text-xs text-[#DF9F3E] uppercase tracking-[0.1em]">
  Overline text
</p>
```

**Tailwind — Quote example:**
```html
<blockquote class="font-cinzel italic text-xl text-white leading-relaxed
  pl-5 border-l-[3px] border-[#DF9F3E]">
  Quote content here.
</blockquote>
```

---

## 6. Icons

### System Specification

```
Style:          Stroke-based (not filled)
Stroke-width:   1.5px
Stroke-linecap: round
Stroke-linejoin: round
Grid:           24×24px base
Scalable to:    16, 20, 32, 48px
Viewbox:        0 0 24 24
```

**No emojis, ever. Geometric SVG only.**

---

### Color Usage

| Context | Color | Hex |
|---|---|---|
| Default | White | `#FFFFFF` |
| Accent / Highlighted | Gold | `#DF9F3E` |
| Muted / Inactive | Gray | `#7A7A7A` |
| Error | Red | `#FC8181` |
| Success | Green | `#68D391` |

---

### Icon Categories

**Navigation:**
```
menu          — 3 horizontal lines, 2px gap
close         — X, two crossed lines
arrow-right   — horizontal line + arrowhead right
arrow-left    — arrowhead left + horizontal line
chevron-down  — V shape, downward
chevron-up    — V shape, upward
chevron-right — > shape
external-link — box with arrow exiting top-right
```

**Actions:**
```
download      — arrow pointing down into tray
share         — fork shape (3 nodes)
edit          — pencil / pen nib
delete        — trash can with lid
search        — magnifier circle + handle
filter        — funnel
copy          — two overlapping rectangles
plus          — + cross
minus         — - horizontal line
```

**Status:**
```
check         — checkmark (V path)
check-circle  — circle with checkmark inside
warning       — triangle with exclamation
info          — circle with "i"
error/x-circle — circle with X
```

**Business:**
```
chart-bar     — 3 vertical bars ascending
chart-line    — line graph
briefcase     — rectangle with handle
users         — two overlapping silhouettes
calendar      — rectangle with grid + top hooks
clock         — circle with clock hands
target        — concentric circles with dot
trending-up   — ascending line with arrowhead
```

**Communication:**
```
email         — envelope outline
phone         — handset outline
chat          — speech bubble outline
video         — camera shape (trapezoid + triangle)
bell          — bell shape
at-sign       — @ symbol
```

---

### SVG Component Template

```html
<!-- Example: check-circle icon -->
<svg
  width="24" height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="10" />
  <polyline points="9 12 11 14 15 10" />
</svg>
```

Usage:
```html
<!-- White default -->
<svg class="text-white w-6 h-6" ...>

<!-- Gold accent -->
<svg class="text-[#DF9F3E] w-6 h-6" ...>

<!-- Muted -->
<svg class="text-[#7A7A7A] w-5 h-5" ...>
```

---

## 7. Badges & Tags

### 7.1 Category Tag

**Purpose:** Content classification. Pill shape.

```
Background:     #14203A
Border:         1px solid #2A3A5A
Border-radius:  9999px
Padding:        4px 12px
Font:           Montserrat, 12px, weight 500
Color:          #FFFFFF
```

**Tailwind:**
```html
<span class="bg-[#14203A] border border-[#2A3A5A] rounded-full
  px-3 py-1 font-montserrat font-medium text-xs text-white">
  Category
</span>
```

---

### 7.2 Status Badge

**Purpose:** Indicate state of items (active, complete, error, inactive).

**Structure:** 8px colored dot + Montserrat 13px text

| Status | Dot Color | Text |
|---|---|---|
| Active | `#DF9F3E` (gold) | Active |
| Complete | `#68D391` (green) | Completo |
| Error | `#FC8181` (red) | Erro |
| Inactive | `#7A7A7A` (gray) | Inativo |

**Tailwind:**
```html
<span class="inline-flex items-center gap-2 font-montserrat text-[13px] text-[#BBBBBB]">
  <span class="w-2 h-2 rounded-full bg-[#DF9F3E]"></span>
  Active
</span>
```

---

### 7.3 Seal Badge

**Purpose:** Membership tiers and certifications (e.g., Líderes Leões levels).

```
Shape:          Circle
Size:           80px (large), 48px (medium), 32px (small)
Border:         2px solid #DF9F3E
Background:     #091022
Font:           Cinzel, sized to fit, uppercase
Color:          #DF9F3E
Optional:       inner ring 1px #2A3A5A at 85% diameter
```

**Tailwind (large):**
```html
<div class="w-20 h-20 rounded-full border-2 border-[#DF9F3E] bg-[#091022]
  flex items-center justify-center text-center">
  <span class="font-cinzel font-bold text-xs text-[#DF9F3E] uppercase leading-tight">
    Leão<br/>Nível I
  </span>
</div>
```

---

### 7.4 Phase Badge

**Purpose:** Indicate which phase (1–5) a content item or module belongs to, in ZNITH.AI OS context.

```
Shape:          Rounded rectangle (pill variant or square 28px)
Size:           28px × 28px or auto width
Border-radius:  8px
Font:           Cinzel, 13px, bold
```

| Phase | Background | Text Color |
|---|---|---|
| Phase 1 | `rgba(223,159,62,0.15)` | `#DF9F3E` |
| Phase 2 | `rgba(223,159,62,0.15)` | `#DF9F3E` |
| Phase 3 | `rgba(223,159,62,0.2)` | `#FFD161` |
| Phase 4 | `rgba(223,159,62,0.2)` | `#FFD161` |
| Phase 5 | `rgba(223,159,62,0.25)` | `#FFD161` (brighter) |

**Tailwind:**
```html
<span class="inline-flex items-center justify-center w-7 h-7
  bg-[#DF9F3E]/15 rounded-lg
  font-cinzel font-bold text-[13px] text-[#DF9F3E]">
  1
</span>
```

---

## 8. Section Patterns

### 8.1 Hero Section

```
Min-height:     100vh
Display:        flex, flex-direction column, align-items center, justify-content center
Background:     #091022
Texture:        subtle noise overlay (SVG or CSS noise), opacity 16%
Padding:        80px 48px (desktop), 64px 20px (mobile)
Text-align:     center (default; left variant available)
```

**Anatomy:**
```
[Overline / tagline — gold, uppercase, letter-spacing 0.15em]
[Display heading — Cinzel 48–72px, white]
[Subheading — Montserrat 18–20px, #BBBBBB, max-width 640px, centered]
[CTA row — Primary Button + optional Ghost/Secondary button, gap 16px]
[Optional: Lottie animation, illustration, or mockup below text]
```

**Tailwind (base structure):**
```html
<section class="min-h-screen flex flex-col items-center justify-center
  bg-[#091022] px-12 py-20 text-center relative overflow-hidden">
  <!-- noise texture layer -->
  <div class="absolute inset-0 opacity-[0.16] pointer-events-none"
    style="background-image: url('noise.svg')"></div>

  <p class="font-montserrat text-sm text-[#DF9F3E] uppercase tracking-[0.15em] mb-4">
    Tagline
  </p>
  <h1 class="font-cinzel font-bold text-[clamp(48px,7vw,72px)] text-white
    leading-[1.1] tracking-[-0.02em] mb-6 max-w-4xl">
    Heading
  </h1>
  <p class="font-montserrat text-lg text-[#BBBBBB] leading-[1.7] mb-10 max-w-xl">
    Subheading
  </p>
  <div class="flex gap-4 flex-wrap justify-center">
    <!-- Primary Button -->
    <!-- Ghost Button (optional) -->
  </div>
</section>
```

---

### 8.2 Feature Grid

```
Layout:         CSS grid, 2 or 3 columns (desktop), 1 column (mobile)
Gap:            24px
Padding:        80px 48px (section)
```

**Tailwind:**
```html
<section class="px-12 py-20 bg-[#091022]">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <!-- Feature Cards -->
  </div>
</section>
```

---

### 8.3 Stats Row

```
Layout:         3–4 equal columns, flex or grid
Gap:            24px
Background:     #091022 or #14203A elevated row
Padding:        64px 48px
Border:         optional top + bottom 1px #2A3A5A
```

**Tailwind:**
```html
<section class="px-12 py-16 border-y border-[#2A3A5A]">
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
    <!-- Stat Cards -->
  </div>
</section>
```

---

### 8.4 CTA Section

```
Background:     #1C2A4A (elevated) or #14203A
Border-radius:  16px (contained variant) or full-bleed
Padding:        64px 48px
Text-align:     center
Max-width:      720px (text block)
```

**Anatomy:**
```
[Overline]
[Cinzel heading, 32–40px]
[Montserrat body, 16–18px, #BBBBBB, max-width 540px]
[Primary Button]
[Optional: supporting text below button, 13px #7A7A7A]
```

---

### 8.5 Testimonial Carousel

```
Layout:         Single card centered, max-width 680px
Controls:       Navigation dots below card
  Active dot:   8px circle, #DF9F3E
  Inactive dot: 8px circle, #2A3A5A
  Hover:        #7A7A7A
Gap:            8px between dots
Optional:       Prev/Next arrow buttons, ghost style
```

---

### 8.6 Content Section (Split Layout)

```
Layout:         2 columns, 50/50 or 60/40 (desktop), stacked (mobile)
Gap:            64px (desktop), 40px (tablet)
Alternating:    Text left + image right (odd), image left + text right (even)
```

**Text column anatomy:**
```
[Overline]
[H2 Cinzel]
[Body Montserrat, #BBBBBB]
[Feature list with check icons]
[CTA Button]
```

---

### 8.7 Process / Steps

```
Layout:         Horizontal numbered flow (desktop), vertical (mobile)
Connector:      1px dashed line #2A3A5A between steps (horizontal)
Step number:    Cinzel, 28px, gold (active), gray (inactive)
Step label:     Montserrat 14px, white (active), #7A7A7A (inactive)
Step dot:       24px circle, border 2px (gold active / gray inactive)
Active step:    glow: 0 0 16px rgba(223,159,62,0.4)
```

**5-step ZNITH.AI OS flow (Phase names):**
```
1 → Diagnóstico  2 → Estratégia  3 → Implementação  4 → Ativação  5 → Escala
```

---

### 8.8 Footer (Full Spec)

See Navigation section 3.4. Additional detail:

**Social icons row:**
```
Icons:      24px stroke SVG (LinkedIn, Instagram, YouTube, WhatsApp)
Color:      #7A7A7A default, #DF9F3E hover
Gap:        16px
```

**Copyright row:**
```
Text:       Montserrat 12px, #7A7A7A
Legal links: Montserrat 12px, #DF9F3E, hover underline
Divider:    border-top 1px #2A3A5A, padding-top 24px, margin-top 48px
```

---

## 9. Dividers & Separators

### 9.1 Full-Width Line Divider

```
Border:         none
Height:         1px
Background:     #2A3A5A
Width:          100%
```

**Tailwind:**
```html
<hr class="border-none h-px bg-[#2A3A5A]" />
```

---

### 9.2 Gold Accent Line (Section Underline)

**Purpose:** Used under section headings to add gold accent. Centered below H2 or Display heading.

```
Width:          80px
Height:         2px
Background:     #DF9F3E
Border-radius:  9999px
Margin:         8px auto 0 (centered) or 8px 0 0 (left-aligned)
```

**Tailwind:**
```html
<div class="w-20 h-0.5 bg-[#DF9F3E] rounded-full mx-auto mt-2"></div>
```

**Usage pattern:**
```html
<div class="text-center mb-12">
  <h2 class="font-cinzel font-semibold text-3xl text-white">Section Heading</h2>
  <div class="w-20 h-0.5 bg-[#DF9F3E] rounded-full mx-auto mt-3"></div>
</div>
```

---

### 9.3 Grafismo Divider

**Purpose:** Decorative section separator using the ZNITH swoosh/check grafismo mark. Used sparingly between major sections.

```
Element:        SVG grafismo (swoosh or angular check mark) — lion crown motif reference
Width:          120px (desktop), 80px (mobile)
Color:          #DF9F3E at 30% opacity (decorative) or 60% (featured)
Display:        block, centered
Margin:         48px auto
```

**Tailwind:**
```html
<div class="flex justify-center my-12 opacity-30">
  <!-- Grafismo SVG, color #DF9F3E, w-28 -->
</div>
```

---

## 10. Loading & Empty States

### 10.1 Spinner

**Purpose:** Indicate async loading in progress.

```
Size:           32px (default), 20px (inline), 48px (full-page)
Shape:          Ring — full circle, 3px stroke
Color:          #DF9F3E (animated portion), #2A3A5A (track)
Animation:      rotate 360deg, 0.8s linear infinite
```

**CSS:**
```css
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #2A3A5A;
  border-top-color: #DF9F3E;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Tailwind:**
```html
<div class="w-8 h-8 rounded-full border-[3px] border-[#2A3A5A]
  border-t-[#DF9F3E] animate-spin"></div>
```

---

### 10.2 Skeleton Loader

**Purpose:** Placeholder while content loads. Prevents layout shift.

```
Background:     #14203A
Border-radius:  8px (match content shape)
Animation:      shimmer — gradient slide left-to-right, 1.5s ease infinite
Shimmer color:  rgba(255,255,255,0.05) → rgba(255,255,255,0.12) → rgba(255,255,255,0.05)
```

**CSS:**
```css
.skeleton {
  background: #14203A;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.06) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: shimmer 1.5s ease infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**Common skeleton shapes:**
```html
<!-- Text line -->
<div class="skeleton h-4 w-48 rounded"></div>

<!-- Card placeholder -->
<div class="skeleton h-[200px] w-full rounded-xl"></div>

<!-- Avatar -->
<div class="skeleton w-10 h-10 rounded-full"></div>
```

---

### 10.3 Empty State

**Purpose:** Displayed when a list, table, or section has no content.

```
Layout:         Centered, flex column, align-items center
Icon:           40px stroke SVG (contextual — inbox, search, folder, etc.), color #7A7A7A
Heading:        Montserrat, 16px, weight 600, white
Description:    Montserrat, 14px, #7A7A7A, max-width 280px, centered
CTA:            Secondary or Ghost Button (optional)
Padding:        48px
```

**Tailwind:**
```html
<div class="flex flex-col items-center justify-center py-12 text-center">
  <!-- Contextual icon SVG, w-10 h-10, text-[#7A7A7A] -->
  <svg class="w-10 h-10 text-[#7A7A7A] mb-4" ...></svg>
  <p class="font-montserrat font-semibold text-base text-white mb-2">
    Nenhum resultado encontrado
  </p>
  <p class="font-montserrat text-sm text-[#7A7A7A] max-w-[280px] mb-6 leading-relaxed">
    Tente ajustar os filtros ou adicione um novo item para começar.
  </p>
  <!-- Secondary Button (optional) -->
</div>
```

---

## Changelog

| Date | Change |
|---|---|
| 2026-04-07 | Initial creation — all 10 component categories defined |
