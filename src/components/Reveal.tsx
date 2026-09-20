import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { fadeUp, reducedVariants, staggerParent, viewportOnce } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Element = 'div' | 'section' | 'span' | 'li' | 'ul' | 'ol' | 'header' | 'article' | 'p';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Override the variant (defaults to a fade + 22px rise). */
  variants?: Variants;
  delay?: number;
  as?: Element;
  /** Replay every time it enters the viewport instead of once. */
  repeat?: boolean;
}

/**
 * Scroll-reveal wrapper. Swaps to an opacity-only variant when the user has
 * asked for reduced motion, so content still arrives but nothing moves.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
  repeat = false,
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={prefersReduced ? reducedVariants : variants}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { margin: '-12% 0px -12% 0px' } : viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: Element;
}

/**
 * Parent for staggered groups. Children should be `<RevealItem>` (or any
 * motion element using the `fadeUp` variant names).
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
  as = 'div',
}: StaggerProps) {
  const prefersReduced = usePrefersReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={staggerParent(prefersReduced ? 0.02 : stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: Element;
}

/** Child of `<Stagger>`; inherits the parent's orchestration. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
}: RevealItemProps) {
  const prefersReduced = usePrefersReducedMotion();
  const Comp = motion[as];
  return (
    <Comp className={className} variants={prefersReduced ? reducedVariants : variants}>
      {children}
    </Comp>
  );
}
