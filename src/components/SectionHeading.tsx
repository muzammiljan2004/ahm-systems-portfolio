import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';
import { fadeUp, viewportOnce, wordReveal, staggerParent } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Heading level — keeps the document outline correct. */
  level?: 'h2' | 'h3';
  className?: string;
  /** Extra element rendered under the description (e.g. a button row). */
  children?: ReactNode;
  size?: 'md' | 'lg';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  level = 'h2',
  className,
  children,
  size = 'lg',
}: SectionHeadingProps) {
  const Heading = level;
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'relative flex flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal className="mb-5">
          <span className="eyebrow">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-primary shadow-[0_0_12px_2px_rgb(var(--c-primary)/0.8)]"
            />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal variants={fadeUp}>
        <Heading
          className={cn(
            size === 'lg' ? 'text-display-md' : 'text-display-sm',
            'max-w-3xl text-ink',
          )}
        >
          {title}
        </Heading>
      </Reveal>

      {description ? (
        <Reveal delay={0.08} className={cn('mt-5 max-w-2xl', centered && 'mx-auto')}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      ) : null}

      {children ? <Reveal delay={0.14} className="mt-8">{children}</Reveal> : null}
    </div>
  );
}

interface AnimatedHeadlineProps {
  /** Each string is animated as its own word. Use '\n' for a line break. */
  words: string[];
  /** Indices that get the gradient treatment. */
  accentFrom?: number;
  className?: string;
  as?: 'h1' | 'h2';
  /**
   * The headline as one plain string. Applied as `aria-label` so assistive
   * tech reads a single clean sentence rather than a stream of word spans.
   */
  srLabel: string;
  id?: string;
}

/**
 * Word-by-word headline reveal used in the hero and final CTA.
 * Preserves a single accessible text node for screen readers.
 */
export function AnimatedHeadline({
  words,
  accentFrom,
  className,
  as = 'h1',
  srLabel,
  id,
}: AnimatedHeadlineProps) {
  const prefersReduced = usePrefersReducedMotion();
  const Comp = as === 'h1' ? motion.h1 : motion.h2;

  if (prefersReduced) {
    return (
      <Comp
        id={id}
        className={className}
        aria-label={srLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span aria-hidden="true">
          {words.map((word, i) =>
            word === '\n' ? (
              <br key={`br-${i}`} />
            ) : (
              <span
                key={`${word}-${i}`}
                className={
                  accentFrom !== undefined && i >= accentFrom ? 'text-gradient-accent' : undefined
                }
              >
                {`${word} `}
              </span>
            ),
          )}
        </span>
      </Comp>
    );
  }

  return (
    <Comp
      id={id}
      className={className}
      aria-label={srLabel}
      variants={staggerParent(0.055, 0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <span aria-hidden="true">
      {words.map((word, i) =>
        word === '\n' ? (
          <br key={`br-${i}`} />
        ) : (
          <motion.span
            key={`${word}-${i}`}
            variants={wordReveal}
            className={cn(
              'inline-block',
              accentFrom !== undefined && i >= accentFrom && 'text-gradient-accent',
            )}
          >
            {word}
            {' '}
          </motion.span>
        ),
      )}
      </span>
    </Comp>
  );
}
