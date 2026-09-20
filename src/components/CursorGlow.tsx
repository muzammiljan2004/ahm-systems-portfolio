import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { siteConfig } from '@/config/siteConfig';

/**
 * A soft light that trails the pointer. Implementation notes:
 *  - only `transform` and `opacity` are animated, so it never triggers layout
 *  - skipped entirely on touch devices (no hover) and for reduced motion
 *  - `fixed` + `pointer-events-none` so it can never intercept a click
 */
export function CursorGlow() {
  const prefersReduced = usePrefersReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 110, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 110, damping: 22, mass: 0.6 });

  const enabled =
    siteConfig.features.cursorGlow &&
    !prefersReduced &&
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(circle, rgb(var(--c-primary) / 0.09) 0%, rgb(var(--c-violet) / 0.05) 35%, transparent 68%)',
      }}
    />
  );
}
