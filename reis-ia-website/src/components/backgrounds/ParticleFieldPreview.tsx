/**
 * ParticleFieldPreview.tsx
 *
 * Preview-only variant of ParticleField with an exposed `id` prop.
 * Required for the preview page where multiple ParticleField instances
 * live on the same page — tsParticles uses the id to target the DOM node,
 * so each instance must have a unique id.
 *
 * Do NOT use this in production pages. Use ParticleField instead.
 */

import { useEffect, useState, useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

interface ParticleFieldPreviewProps {
  id: string;
  particleCount?: number;
  color?: string;
  secondaryColor?: string;
  linkDistance?: number;
  speed?: number;
  className?: string;
}

export default function ParticleFieldPreview({
  id,
  particleCount = 60,
  color = '#4A90FF',
  secondaryColor = '#6AADFF',
  linkDistance = 150,
  speed = 0.5,
  className = '',
}: ParticleFieldPreviewProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (reducedMotion) {
    return (
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Particles
        id={id}
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: { value: 'transparent' },
          },
          fpsLimit: 30,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'grab',
              },
              resize: { enable: true },
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: 0.4,
                },
              },
            },
          },
          particles: {
            color: {
              value: [color, secondaryColor],
            },
            links: {
              color: color,
              distance: linkDistance,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: speed,
              direction: 'none',
              random: true,
              straight: false,
              outModes: {
                default: 'bounce',
              },
            },
            number: {
              value: particleCount,
              density: {
                enable: true,
                width: 1200,
                height: 800,
              },
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: {
                enable: true,
                speed: 0.3,
                sync: false,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
