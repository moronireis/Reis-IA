/**
 * Lenis smooth scroll singleton.
 * Gated by prefers-reduced-motion. Exposes a single RAF loop.
 *
 * NOTE: requires `lenis` npm package (integration-engineer must add).
 * Import type kept loose to avoid build failure until package is installed.
 */

// @ts-ignore — dependency added later by integration-engineer
import Lenis from 'lenis';

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  on: (event: string, cb: (...args: any[]) => void) => void;
};

let instance: LenisInstance | null = null;
let rafId: number | null = null;

export function initLenis(): LenisInstance | null {
  if (typeof window === 'undefined') return null;
  if (instance) return instance;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return null;

  instance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  }) as unknown as LenisInstance;

  const loop = (time: number) => {
    instance?.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  return instance;
}

export function getLenis(): LenisInstance | null {
  return instance;
}

export function destroyLenis(): void {
  if (rafId !== null) cancelAnimationFrame(rafId);
  instance?.destroy();
  instance = null;
  rafId = null;
}
