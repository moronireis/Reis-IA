/**
 * ScrollReveal.tsx
 *
 * Wrapper component that applies fade-in + slide animations to children
 * as they enter the viewport. Uses framer-motion.
 *
 * Usage:
 *   <ScrollReveal>
 *     <h2>This will animate in</h2>
 *   </ScrollReveal>
 *
 *   <ScrollReveal direction="left" delay={0.2} duration={0.8}>
 *     <Card />
 *   </ScrollReveal>
 *
 * Customization:
 *   - direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
 *   - delay: Animation delay in seconds (default: 0)
 *   - duration: Animation duration in seconds (default: 0.6)
 *   - distance: Slide distance in pixels (default: 30)
 *   - once: Animate only on first appearance (default: true)
 *   - threshold: Viewport intersection threshold 0-1 (default: 0.1)
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  threshold = 0.1,
  className = '',
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  // Calculate initial offset based on direction
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { x: 0, y: distance };
    }
  };

  const offset = getInitialOffset();

  // Skip animation for reduced motion preference
  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </MotionTag>
  );
}
