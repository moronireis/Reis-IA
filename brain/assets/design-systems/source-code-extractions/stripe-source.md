# Stripe Source Code Extraction
## Last updated: 2026-03-17
## Source: https://stripe.com (Homepage, /payments, /billing, /enterprise)
## Pages analyzed: 4
## Extraction focus: Animations, interactions, scroll effects, micro-interactions

---

## 1. Design Tokens / CSS Custom Properties

### Colors
```css
:root {
  --accentColor: #96f;
  --backgroundColor: #fff;
  --navColor: #0a2540;
  --navHoverColor: #0a2540;
  --linkColor: #0a2540;
  --buttonColor: #635bff;
  --menuBgColor: #eff3f9;
  --knockoutColor: #fff;
  --cardBackground: #fff;
  --cardBorderColor: #cbd6e0;

  /* Enterprise dark theme */
  --backgroundColor-enterprise: linear-gradient(145deg, #24264d, #13172b 75%);

  /* Billing hero colors */
  --billingHeroAnimationSliderColor: #edf1f5;
  --billingHeroAnimationProfessionalColor: #15be53;
  --billingHeroAnimationStarterColor: #fab000;
  --billingHeroAnimationEnterpriseColor: #09cbcb;

  /* Product suite gradient colors */
  --suite-color-payments: #ff6118;
  --stop-color-payments: #fb76fa;
  --gradient-color-payments: #533afd;

  --suite-color-billing: #fc5;
  --stop-color-billing: #fb76fa;
  --gradient-color-billing: #533afd;

  --suite-color-connect: #f44bcc;
  --stop-color-connect: #ec8fff;
  --gradient-color-connect: #533afd;

  --suite-color-tax: #ea2261;
  --stop-color-tax: #da56ed;
  --gradient-color-tax: #533afd;
}
```

### Typography
```css
:root {
  --fontFamily: "sohne-var", "Helvetica Neue", Arial, sans-serif;
  --fontWeightNormal: 400;
  --fontWeightSemibold: 600;
  --fontWeightBold: 700;

  /* Enterprise page */
  --titleFontSize: 48px;
  --titleLineHeight: 56px;
  --titleLetterSpacing: -0.02em;
  --bodyFontSize: 18px;
  --bodyLineHeight: 1.5555555556;
}
```

### Shadows
```css
:root {
  --cardShadowXSmall: 0 0 60px rgba(50, 50, 93, 0.18);
  --cardShadowSmall: 0 20px 60px rgba(50, 50, 93, 0.18);
  --cardShadowMedium: 0 30px 60px rgba(50, 50, 93, 0.25);
  --cardShadowLarge: 0 41px 60px -40px rgba(0, 0, 0, 0.1),
                     0 40px 100px rgba(50, 50, 93, 0.15);
  --refreshedNavShadow: 0 30px 60px -50px rgba(0, 0, 0, 0.102),
                        0 30px 60px -10px rgba(50, 50, 93, 0.251);
  --refreshedMenuShadow: 0 18px 36px -18px rgba(0, 0, 0, 0.1),
                         0 30px 45px -30px rgba(50, 50, 93, 0.25);
}

/* Enterprise deep shadows */
.enterprise-card {
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
              0 30px 60px -30px rgba(0, 0, 0, 0.3),
              inset 0 -2px 6px 0 rgba(10, 37, 64, 0.35);
}

.enterprise-card-alt {
  box-shadow: 0px 20px 39px -20px rgba(0, 0, 0, 0.3),
              0px 32px 66px -13px rgba(50, 50, 93, 0.25),
              0px -1px 3px 0px rgba(10, 37, 64, 0.35) inset;
}
```

### Spacing & Layout
```css
:root {
  --refreshedNavHeight: 64px;
  --refreshedNavPaddingTop: 12px;
  --refreshedNavBorderRadius: 8px;
  --siteMenuTransition: 250ms;
  --siteMenuArrowSpacing: 13px;

  /* Billing hero */
  --billingHeroAnimationHeight: 525px;
  --billingHeroAnimationWidth: 540px;

  /* Enterprise */
  --sectionPaddingTop: 214px;
  --sectionPaddingBottom: 32px;
}
```

### Form Tokens
```css
:root {
  --formContentMaxWidth: 384px;
  --formPadding: 24px 16px;
  --formFieldFontSize: 12px;
  --formFieldInputHeight: 38px;
  --formFieldBorderColor: #e6ebf1;
  --formFieldBorderRadius: 6px;
  --formFieldBackground: #fff;
  --formFieldLabelFontSize: 13px;
  --formFieldTextColor: #425466;
  --formFieldPlaceholderColor: #8f9cb2;
  --formFieldRadioSelectedBorderColor: #6d7e94;
  --formButtonBackground: #0a2540;
}
```

---

## 2. Easing Functions & Timing Constants

```css
/* Named easing curves used across Stripe */
--easeOutSine: cubic-bezier(0.61, 1, 0.88, 1);
--hoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);

/* All cubic-bezier values found */
cubic-bezier(0.215, 0.61, 0.355, 1)   /* easeOutCubic - link hovers */
cubic-bezier(0.7, 0, 0, 1)            /* dramatic ease - hero animations */
cubic-bezier(0.65, 0, 0.35, 1)        /* easeInOutCubic - section transitions */
cubic-bezier(0.45, 0.05, 0.55, 0.95)  /* easeInOutSine - nav height changes */
cubic-bezier(0.25, 1, 0.5, 1)         /* easeOutBack-ish - arrow animations */
cubic-bezier(0.4, 0, 0.2, 1)          /* material ease - menu sections */
cubic-bezier(0.22, 1, 0.36, 1)        /* custom ease - enterprise transitions */
cubic-bezier(0, 0.09, 0.4, 1)         /* custom ease - mobile menu button */

/* Duration patterns */
150ms  /* micro-interactions (hovers, color changes) */
200ms  /* small UI changes (slider knob, menu height) */
240ms  /* mobile menu open/close */
250ms  /* navigation menu transitions */
300ms  /* gradient line reveals, arrow animations */
350ms  /* medium transitions */
500ms  /* section transforms */
600ms  /* spinner rotation */
850ms  /* large section animations */
1000ms /* gradient canvas fade-in initial */
1800ms /* gradient canvas full opacity */
```

---

## 3. Keyframe Animations

### Navigation Hover Arrow
```css
@keyframes refreshed-nav-hover-arrow-in {
  0% {
    opacity: 0;
    transform: translateX(-3px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes refreshed-nav-hover-arrow-out {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Usage */
.RefreshedHoverArrow {
  visibility: hidden;
  transition: visibility 0ms linear 0.3s;
  animation-name: refreshed-nav-hover-arrow-out;
  animation-duration: 0.15s;
  animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
}

a:hover .RefreshedHoverArrow,
button:hover .RefreshedHoverArrow {
  animation-name: refreshed-nav-hover-arrow-in;
  animation-duration: 0.3s;
  visibility: visible;
  transition-delay: 0ms;
}
```

### Knockout Text (Enterprise)
```css
@keyframes knockoutText {
  0% {
    background-position-y: 0;
  }
  to {
    background-position-y: 100%;
  }
}
```

### Billing Statistics Animations
```css
@keyframes bucketListingStatBackgroundAnimation {
  0% {
    background-position-y: 0;
  }
  to {
    background-position-y: 400000%;
  }
}

@keyframes bucketListingStatArrowAnimation {
  0% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
}
```

### Portal Tooltip Fade
```css
@keyframes PortalTooltipItemFadeIn {
  0% {
    opacity: 0;
  }
}
```

### Payment Hero Spinner
```css
@keyframes PaymentsHeroAnimationLinkSpinnerAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.PaymentsHeroAnimationLink__spinner {
  animation: PaymentsHeroAnimationLinkSpinnerAnimation 0.6s linear infinite;
}
```

---

## 4. Transition Patterns (Complete Catalog)

### Navigation Menu Transitions
```css
/* Refreshed menu height animation */
.RefreshedMenu {
  transition: height 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  will-change: height;
}

/* Menu section slide + fade */
.RefreshedMenu__section {
  opacity: 1;
  transform: translateX(-50%) translateX(var(--siteMenuSectionOffset));
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.25s, 0.5s;
}

.RefreshedMenu__section[aria-hidden=true] {
  opacity: 0;
  --siteMenuSectionOffset: -20%;
  pointer-events: none;
}
```

### Mobile Menu Open/Close
```css
.SiteHeader__mobileMenu {
  opacity: 0;
  transform: translateY(100%);
  transition: visibility step-end 240ms,
              transform ease-out 240ms,
              opacity ease-out 240ms;
}

.SiteHeader--mobileMenuVisible .SiteHeader__mobileMenu {
  transform: translateY(0);
  opacity: 1;
  transition: visibility step-start 240ms,
              transform ease-out 240ms,
              opacity ease-out 240ms;
}
```

### Hamburger Icon Animation
```css
.RefreshedMenuButton {
  transition: background-color 0.2s cubic-bezier(0, 0.09, 0.4, 1),
              opacity 0.25s ease-in-out,
              visibility 0.25s ease-in-out;
}

.RefreshedMenuButton rect {
  opacity: 1;
  transform-origin: center;
  transition: 0.25s ease-in-out;
}

/* Open state: X shape */
.SiteHeader--mobileMenuVisible .RefreshedMenuButton rect:nth-child(2) {
  transform: rotate(45deg);
}

.SiteHeader--mobileMenuVisible .RefreshedMenuButton rect:nth-child(3) {
  transform: rotate(-45deg);
}
```

### Sticky Header Transitions
```css
.SiteHeader--isSticky .SiteHeader__stickyShadow {
  transform: translateY(-100%);
  transition: opacity 0.25s var(--easeOutSine);
  opacity: 0;
}

.SiteHeader--isSticky.SiteHeader--opaque .SiteHeader__stickyShadow {
  transform: translateY(0);
}

/* Opaque state color transitions */
.SiteHeader--isSticky.SiteHeader--opaque .SiteHeader__container {
  transition-property: opacity, border-radius;
  transition-duration: 0.24s, 0ms;
  transition-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95), linear;
}

/* Hover override on sticky header */
.SiteHeader--isSticky.SiteHeader--opaque .SiteHeader__container:hover {
  --navColor: #061b31;
  --navHoverColor: #061b31;
  --linkColor: #061b31;
  --buttonColor: #0a2540;
  --menuBgColor: #eff3f9;
}
```

### Link & Button Hovers
```css
.Link {
  transition: var(--hoverTransition);
  transition-property: color, opacity;
}

.CtaButton.variant--Button {
  transition-property: background-color, opacity;
}

@media (pointer: fine) {
  .CtaButton.variant--Button:hover {
    background-color: var(--buttonHoverColor, var(--buttonColor));
  }
}

@media (pointer: coarse) {
  .CtaButton.variant--Link:active {
    color: var(--linkHoverColor);
    opacity: var(--linkHoverOpacity, 1);
  }
}
```

### Gradient Canvas (Hero Background)
```css
.Gradient:after {
  transition: transform 1s 1s;
  transform: translateX(-50%) scaleY(0.995);
}

.Gradient__canvas {
  opacity: 0;
  transition: opacity 1.8s ease-in 50ms;
}

.Gradient__canvas.isLoaded {
  opacity: 1;
}
```

### Billing Slider Knob
```css
.BillingHeroAnimation__sliderNob {
  box-shadow: var(--cardShadowXSmall);
  transition: transform 0.2s ease-out;
}
```

### Navigation Color Change on Hover
```css
.SiteHeader__container:hover {
  --navColor: #061b31;
  --linkColor: #061b31;
  --linkHoverOpacity: 0.6;
  --buttonColor: #031323;
  transition-property: opacity, color, background-color, fill, stroke;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}
```

---

## 5. Gradient Definitions

### Product Suite Navigation Gradient Line
```css
.RefreshedGradientLine:after {
  background: linear-gradient(
    90deg,
    var(--gradient-color),
    var(--gradient-color) 20%,
    var(--stop-color) 40%,
    var(--suite-color) 60%,
    var(--suite-color)
  ), #e5edf5;
  border-radius: 1px;
}

/* Mouse direction-aware reveal */
@media (hover: hover) {
  .RefreshedGradientLine:after {
    background-size: 0 100%, 100% 100%;
    background-position: var(--mouse-in-dir, right), 0;
    background-repeat: no-repeat, no-repeat;
    transition: background-size 0.3s ease-out;
  }

  .SiteProductsNav__group:hover .RefreshedGradientLine:after {
    background-position: var(--mouse-out-dir, left), 0;
    background-size: 100% 100%, 100% 100%;
  }
}
```

### Enterprise Hero Gradient
```css
background: linear-gradient(145deg, #24264d, #13172b 75%);
```

### Enterprise Rainbow Gradient (Knockout Text)
```css
background: linear-gradient(
  90deg,
  #96f,
  #bf70ff,
  #e67aff,
  #ff89dc,
  #ffa176,
  #ffb90f
);
-webkit-mask-image: linear-gradient(
  45deg,
  transparent,
  #000 20%,
  #000 60%,
  transparent 80%
);
-webkit-mask-position: -20%;
-webkit-mask-size: 1000%;
```

### Navigation CTA Gradient
```css
.NavCtaGradient .CtaButton .NavCta__label {
  background: linear-gradient(90deg, #e18638, #e17a38);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s linear;
}
```

### Modal Overlay Gradient
```css
.SiteHeader__overlay {
  background: linear-gradient(transparent, rgba(236, 239, 241, 0.8));
}
```

### Fade Edge Masks
```css
-webkit-mask-image: linear-gradient(
  90deg,
  transparent,
  #000 5%,
  #000 95%,
  transparent
);

background-image: linear-gradient(transparent, #fff 5px);
```

---

## 6. Backdrop & Filter Effects

```css
/* Mobile menu footer */
.MobileMenu__footer {
  background: radial-gradient(
    66.35% 66.35% at 50% 50%,
    hsla(0, 0%, 100%, 0.9) 0,
    hsla(0, 0%, 100%, 0) 100%
  ), hsla(0, 0%, 100%, 0.8);
  -webkit-backdrop-filter: blur(3.5px);
  backdrop-filter: blur(3.5px);
}

/* Header overlay */
.SiteHeader__overlay {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

/* Enterprise backdrop */
.enterprise-backdrop {
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}
```

---

## 7. Scroll-Driven Patterns

### Scroll Snap Configuration
```css
.scroll-container {
  scroll-snap-type: x mandatory;
  scroll-snap-align: center;
  scroll-padding-left: var(--overflowMargin);
  scroll-padding-right: var(--overflowMargin);
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scroll-item {
  scroll-snap-align: start;
}
```

### Sticky Header Logic (Inferred)
```javascript
// Stripe uses class toggling for sticky header states:
// .SiteHeader--isStuck    -> header has left initial position
// .SiteHeader--isSticky   -> header is pinned
// .SiteHeader--opaque     -> header has solid background

// IntersectionObserver or scroll listener toggles these classes
// Transition from transparent to opaque on scroll:
// 1. Initial: transparent nav, colored text
// 2. On scroll: solid white bg, dark text, shadow appears
// 3. The shadow element slides in via transform: translateY(-100%) -> translateY(0)

// Fixed nav scroll margin for anchor links:
scroll-margin-top: var(--fixedNavScrollMargin);
```

---

## 8. Interactive Demo Patterns

### Payments Hero - Multi-Tab Payment Flow
```html
<!-- Tab-based payment method switcher -->
<div class="PaymentsHeroAnimationPaymentElements">
  <div class="PaymentsHeroAnimationPaymentElements__header">
    <!-- Tab buttons: Card, Bank, Wallet -->
  </div>
  <div class="PaymentsHeroAnimationPaymentElements__paymentDashboard">
    <!-- Radio group for payment method selection -->
    <div class="PaymentsHeroAnimationPaymentElements__radioGroup">
      <div class="PaymentsHeroAnimationPaymentElements__radioItem">
        <!-- Animated radio with background fill + ring glow -->
        <div class="PaymentsHeroAnimationPaymentElements__radioBackground"></div>
        <div class="PaymentsHeroAnimationPaymentElements__radioRing"></div>
      </div>
    </div>
  </div>
</div>
```

### Payments Hero - Klarna Step Flow
```html
<!-- Step-by-step payment flow animation -->
<div class="PaymentsHeroAnimationKlarna">
  <div class="PaymentsHeroAnimationKlarna__header">
    <div class="PaymentsHeroAnimationKlarna__headerStepList">
      <!-- Step indicators with progress animation -->
    </div>
  </div>
  <div class="PaymentsHeroAnimationKlarna__payment">
    <!-- Shipping form with animated input values -->
    <div class="PaymentsHeroAnimationKlarna__shippingInput">
      <div class="PaymentsHeroAnimationKlarna__shippingInputValue">
        <!-- Text appears with opacity transition -->
      </div>
    </div>
  </div>
</div>
```

### Payments Hero - Link Verification
```html
<!-- Email verification with OTP animation -->
<div class="PaymentsHeroAnimationLink">
  <div class="PaymentsHeroAnimationLink__shippingEmailValue">
    <div class="PaymentsHeroAnimationLink__shippingEmailValueBackground">
      <!-- Highlight sweep animation -->
    </div>
    <div class="PaymentsHeroAnimationLink__spinner">
      <!-- Rotates at 0.6s linear infinite -->
    </div>
  </div>
  <div class="PaymentsHeroAnimationLink__verification">
    <div class="PaymentsHeroAnimationLink__verificationCode">
      <!-- OTP code input boxes with blinking cursor -->
      <div class="PaymentsHeroAnimationLink__verificationCodeInput">
        <!-- :after pseudo-element blinks opacity 0->1 -->
      </div>
    </div>
  </div>
</div>
```

### Billing Hero - Interactive Pricing Slider
```html
<div class="BillingHeroAnimation">
  <!-- Animated pricing page mockup -->
  <div class="BillingHeroAnimation__planBox">
    <!-- 3 plan cards: Starter, Professional, Enterprise -->
    <!-- Each with colored icon matching plan color token -->
  </div>
  <div class="BillingHeroAnimation__sliderBox">
    <!-- Range slider with animated track fill -->
    <div class="BillingHeroAnimation__activeSliderTrack">
      <!-- transform: translateX(-100%) to translateX(0) based on value -->
    </div>
    <div class="BillingHeroAnimation__sliderNob">
      <!-- Draggable knob with cardShadowXSmall -->
      <!-- transition: transform 0.2s ease-out -->
    </div>
  </div>
</div>
```

### Enterprise Hero Cards
```css
/* Card hover with animated arrow */
.EnterpriseHubHeroCard:hover .EnterpriseHubHeroCard__footerIconArrow--a {
  transform: translateY(100%);
}

.EnterpriseHubHeroCard:hover .EnterpriseHubHeroCard__footerIconArrow--b {
  transform: translateY(0);
}

/* Ticker speed change on hover */
.EnterpriseHubTicker:hover {
  --animationDuration: 90000;
}
```

---

## 9. Form Field Patterns

### GraphicForm System
```css
.GraphicFormFieldInput {
  min-height: var(--formFieldInputHeight);     /* 38px */
  padding: var(--formFieldInputPadding);
  border: 1px solid var(--formFieldBorderColor); /* #e6ebf1 */
  border-radius: var(--formFieldBorderRadius);   /* 6px */
  background: var(--formFieldBackground);        /* #fff */
  font: var(--fontWeightNormal) var(--formFieldFontSize)/2 var(--fontFamily);
  /* "sohne-var", "Helvetica Neue", Arial, sans-serif */
}

/* Focus glow effect */
.GraphicFormFieldInput--focused {
  box-shadow: 0 0 0 1px rgba(50, 151, 211, 0.3),
              0 1px 1px 0 rgba(0, 0, 0, 0.07),
              0 0 0 4px rgba(50, 151, 211, 0.3);
}

/* Radio/payment method selection */
.GraphicFormPaymentMethodField__item {
  border: 1px solid var(--formFieldRadioBorderColor);
  background: var(--formFieldRadioBackground);
}

.GraphicFormPaymentMethodField__item--isSelected {
  border-color: var(--formFieldRadioSelectedBorderColor);
  background: var(--formFieldRadioSelectedBackground);
  box-shadow: 0 0 0 calc(-1px + var(--formFieldRadioSelectedBorderWidth))
              var(--formFieldRadioSelectedBorderColor);
}
```

---

## 10. JavaScript Patterns

### Lazy Style Loading
```javascript
new MutationObserver(e => {
  for (const d of e)
    if (d.addedNodes)
      for (const e of d.addedNodes)
        if (e instanceof HTMLLinkElement && void 0 !== e.dataset.jsLazyStyle)
          e.addEventListener("load", function() { this.media = "all"; });
}).observe(document.head, { childList: true });

document.addEventListener("DOMContentLoaded", () => {
  for (const e of document.querySelectorAll("link[data-js-lazy-style]"))
    if ("all" !== e.media) e.media = "all";
});
```

### Client-Side A/B Experiments
```javascript
(() => {
  const getExperimentsContent = () =>
    document.querySelector('meta[name="edge-experiment-treatments"]')?.content ||
    document.querySelector('meta[name="experiment-treatments"]')?.content;

  const buildAssignedRules = (experimentId, variantId) => {
    const expClass = CSS.escape(experimentId);
    const varClass = CSS.escape(variantId);
    return [
      `.${expClass}.${varClass}.client-variant-wrapper { display: unset; }`,
      `.${expClass}.control.client-variant-wrapper { display: none; }`
    ];
  };

  const generateClientSideExperimentsStyle = () => {
    const baseRules = [
      '.client-variant-wrapper { display: none; }',
      '.control.client-variant-wrapper { display: unset; }'
    ];

    const experimentsContent = getExperimentsContent();
    if (!experimentsContent) return baseRules.join('\n');

    const assignedRules = experimentsContent
      .split(',')
      .map((entry) => {
        const [experimentId, variantId, , , , renderSide] = entry.split('.');
        return { experimentId, variantId, renderSide };
      })
      .filter((exp) => exp.renderSide === 'c' && exp.variantId !== 'control')
      .flatMap((exp) => buildAssignedRules(exp.experimentId, exp.variantId));

    return [...baseRules, ...assignedRules].join('\n');
  };

  const style = document.createElement('style');
  style.id = 'experiments-style';
  style.textContent = generateClientSideExperimentsStyle();
  document.head.appendChild(style);
  document.currentScript?.remove();
})();
```

### Mouse Direction Detection (Gradient Lines)
```javascript
// Stripe tracks mouse entry/exit direction for gradient line animations
// Sets CSS custom properties --mouse-in-dir and --mouse-out-dir
// Values: "left" or "right"
// Used to animate gradient fill from the direction the mouse enters
// and reverse from the direction the mouse exits

// The gradient line background-position uses these variables:
// background-position: var(--mouse-in-dir, right), 0;  /* default: fill from right */
// On hover: background-position: var(--mouse-out-dir, left), 0;
```

---

## 11. Transform Catalog

```css
/* Navigation transforms */
transform: translateX(-50%) translateX(var(--siteMenuSectionOffset));
transform: translateY(-100%);  /* hidden above viewport */
transform: translateY(100%);   /* hidden below viewport */
transform: translateY(0);      /* visible position */

/* Enterprise section skew */
transform: skewY(var(--sectionAngle));
transform: skewY(6deg);
transform: scaleY(1.51);

/* Interactive elements */
transform: scale(0);           /* hidden state */
transform: scale(1.3);         /* emphasized state */
transform: translateX(3px);    /* hover arrow nudge */
transform: translateX(calc(var(--progressIndicatorIndex) * 28px)); /* slider position */

/* 3D performance hints */
transform: translateZ(0);
transform-origin: top center;
transform-origin: top left;
transform-origin: bottom center;
```

---

## 12. Clip-Path & Mask Techniques

```css
/* Progressive reveal via clip-path */
clip-path: inset(0 100% 0 0);   /* fully hidden */
/* Animate to: */
clip-path: inset(0 0 0 0);      /* fully visible */

/* Gradient mask for text knockout */
-webkit-background-clip: text;
background-clip: text;

/* Directional fade mask */
-webkit-mask-image: linear-gradient(
  45deg,
  transparent,
  #000 20%,
  #000 60%,
  transparent 80%
);
-webkit-mask-position: -20%;
-webkit-mask-size: 1000%;

/* Edge fade for horizontal scroll */
-webkit-mask-image: linear-gradient(
  90deg,
  transparent,
  #000 5%,
  #000 95%,
  transparent
);
```

---

## 13. Reis IA Cross-Reference

### Patterns to Adapt
- **Gradient line reveals** on navigation hover (mouse-direction-aware) -- premium micro-interaction
- **Sticky header** with transparent-to-opaque transition and shadow slide-in
- **Form focus glow** (ring + shadow) for input fields
- **Arrow hover animation** (slide-in from left with opacity) for CTAs
- **Hamburger-to-X** SVG rect rotation animation
- **Backdrop blur** on overlays (3.5px - 7px range)
- **Knockout text** with animated gradient background-position
- **Clip-path reveals** for progressive content disclosure

### Conflicts with Reis IA
- Stripe uses light mode default (Reis IA is dark mode default)
- Stripe's primary purple (#635bff) conflicts with gold accent
- Stripe's font (Sohne) differs from Inter
- Shadow values use rgba(50, 50, 93, ...) which reads blue-gray, not suitable for dark backgrounds

### Adaptation Notes
- All blur values work well on dark backgrounds, may need opacity adjustment
- Easing curves are universally applicable
- Duration patterns (150ms micro, 250ms standard, 850ms dramatic) align well with premium feel
- The gradient line technique can be adapted with gold gradient for Reis IA
- Mouse-direction-aware animations are framework-agnostic, direct port possible
