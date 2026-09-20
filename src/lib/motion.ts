import type { Transition, Variants } from 'framer-motion';

/* ============================================================================
 * Shared motion language.
 * One easing curve and a small set of variants keep every section feeling like
 * part of the same system.
 * ==========================================================================*/

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.65, 0, 0.35, 1] as const;

export const springSoft: Transition = { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 };
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32, mass: 0.6 };

/** Standard viewport config: animate once, trigger slightly before full view. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: EASE_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.75, ease: EASE_EXPO } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -26 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 26 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.62, ease: EASE_EXPO } },
};

/** Parent that staggers its children. Pair with `fadeUp` on each child. */
export const staggerParent = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Word-by-word text reveal: apply to a wrapper whose children are words. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

/** Draw an SVG path. Use with `pathLength` on a motion.path. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, ease: EASE_SOFT }, opacity: { duration: 0.2 } },
  },
};

/** Reduced-motion fallback: present, but without displacement. */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};
