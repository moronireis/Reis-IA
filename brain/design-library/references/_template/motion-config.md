# Motion Config — {site-name}

Exact configuration values captured from the live page. Copy-pasteable.

## GSAP ScrollTrigger instances

```js
// Example structure — replace with real captured config
gsap.to(".target", {
  // property changes
  ease: "none",
  scrollTrigger: {
    trigger: "#section",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    pin: false,
    markers: false,
  }
});
```

## Timelines

```js
// Captured timeline sequences
```

## Custom easings

```js
// Bezier curves detected
CustomEase.create("custom", "M0,0 C0.1,0.2 0.3,1 1,1");
```

## Three.js / R3F scenes

- Camera: position, fov, near/far
- Lighting rig: types, positions, intensities
- Materials: types, parameters
- Animation loop: rotation speeds, mouse tracking, scroll sync

## Lenis config

```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});
```

## Notes

Anything worth remembering about how these values were tuned together.
