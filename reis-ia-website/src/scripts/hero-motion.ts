/**
 * Hero Cinematic Motion — 5 beats from the brief
 * "Tempo, renderizado como arquitetura"
 *
 * Consumes: #hero-cinematic root, .hero-blade, .hero-seam, .hero-headline [data-char],
 *           .hero-sub, .hero-cta, .hero-mesh
 *
 * Motion tiers:
 *   full     → GSAP + ScrollTrigger scrub + SplitText char reveal + magnetic CTA
 *   reduced  → simple fade-in on IntersectionObserver (prefers-reduced-motion)
 *   minimal  → static (no JS failure path)
 */

import { gsap } from 'gsap';
// @ts-ignore — ScrollTrigger ships within gsap package
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis, getLenis } from '../lib/lenis-setup';

gsap.registerPlugin(ScrollTrigger);

export function initHeroMotion(): void {
  if (typeof window === 'undefined') return;

  const root = document.getElementById('hero-cinematic');
  if (!root) return;

  // Bridge Lenis → ScrollTrigger
  initLenis();
  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
  }

  const mm = gsap.matchMedia();

  // ─────────────────────────────────────────────
  // FULL TIER (motion allowed)
  // ─────────────────────────────────────────────
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const blade = root.querySelector('.hero-blade') as HTMLElement | null;
    const seam = root.querySelector('.hero-seam') as HTMLElement | null;
    const chars = root.querySelectorAll<HTMLElement>('.hero-headline [data-char]');
    const sub = root.querySelector('.hero-sub') as HTMLElement | null;
    const cta = root.querySelector('.hero-cta') as HTMLElement | null;
    const mesh = root.querySelector('.hero-mesh') as HTMLElement | null;
    const waist = root.querySelector('.hero-waist-line') as HTMLElement | null;

    // Initial state
    gsap.set(blade, { yPercent: -20, opacity: 0 });
    gsap.set(seam, { scaleY: 0, transformOrigin: 'top center', opacity: 0 });
    gsap.set(chars, { yPercent: 120, opacity: 0 });
    gsap.set([sub, cta], { opacity: 0, y: 24 });
    gsap.set(waist, { scaleX: 0, transformOrigin: 'left center' });

    // ── BEAT 1 (0–600ms): camera descends, blade rises ──
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro.to(blade, { yPercent: 0, opacity: 1, duration: 0.6 }, 0);

    // ── BEAT 2 (600–1400ms): seam draws top-down + pulse bloom ──
    intro.to(
      seam,
      { scaleY: 1, opacity: 1, duration: 0.8, ease: 'expo.inOut' },
      0.6
    );
    intro.to(
      seam,
      {
        boxShadow:
          '0 0 60px rgba(74,144,255,0.9), 0 0 140px rgba(74,144,255,0.45)',
        duration: 0.25,
        yoyo: true,
        repeat: 1,
      },
      1.35
    );

    // ── BEAT 3 (1400–2200ms): SplitText char reveal, 25ms stagger ──
    intro.to(
      chars,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.025,
      },
      1.4
    );
    intro.to([sub, cta], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.9);

    // ── BEAT 4: pinned scrub (+1800px) ──
    ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: '+=1800',
      pin: true,
      scrub: 0.6,
      animation: gsap
        .timeline()
        .to(mesh, { yPercent: 18, ease: 'none' }, 0)
        .to(blade, { yPercent: -6, ease: 'none' }, 0)
        .to(waist, { scaleX: 1, ease: 'none' }, 0.2)
        .to(sub, { y: -40, ease: 'none' }, 0.4),
    });

    // ── BEAT 5: clip-path reveal of next section on pin release ──
    const next = document.querySelector('[data-next-section]') as HTMLElement | null;
    if (next) {
      gsap.set(next, { clipPath: 'inset(100% 0 0 0)' });
      ScrollTrigger.create({
        trigger: root,
        start: 'bottom bottom',
        end: '+=600',
        scrub: 0.8,
        animation: gsap.to(next, {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
        }),
      });
    }

    // ── Magnetic CTA micro-interaction ──
    if (cta) {
      const strength = 18;
      const onMove = (e: MouseEvent) => {
        const rect = cta.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(cta, {
          x: (x / rect.width) * strength,
          y: (y / rect.height) * strength,
          duration: 0.4,
          ease: 'power3.out',
        });
      };
      const onLeave = () => {
        gsap.to(cta, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      };
      cta.addEventListener('mousemove', onMove);
      cta.addEventListener('mouseleave', onLeave);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });

  // ─────────────────────────────────────────────
  // REDUCED TIER (prefers-reduced-motion: reduce)
  // ─────────────────────────────────────────────
  mm.add('(prefers-reduced-motion: reduce)', () => {
    const targets = root.querySelectorAll(
      '.hero-blade, .hero-seam, .hero-headline [data-char], .hero-sub, .hero-cta'
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'none';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((el) => {
      (el as HTMLElement).style.transition = 'opacity 300ms ease';
      (el as HTMLElement).style.opacity = '0';
      io.observe(el);
    });

    return () => io.disconnect();
  });
}

// Auto-init when imported as a module script
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroMotion);
  } else {
    initHeroMotion();
  }
}
