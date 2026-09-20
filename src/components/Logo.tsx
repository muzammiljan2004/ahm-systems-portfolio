import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Hides the wordmark, leaving only the glyph (used on very small screens). */
  markOnly?: boolean;
  size?: 'sm' | 'md';
}

/**
 * Brand lockup: the AHM geometric mark plus the wordmark, drawn inline so
 * there is no image asset to load. `markOnly` gives the compact icon-only
 * version used on very small screens. Set `siteConfig.brand.logo.imageSrc`
 * to swap in a file instead.
 */
export function Logo({ className, markOnly = false, size = 'md' }: LogoProps) {
  const { name, logo } = siteConfig.brand;
  const box = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {logo.imageSrc ? (
        <img src={logo.imageSrc} alt={logo.alt} className={cn(box, 'object-contain')} />
      ) : (
        <motion.span
          className={cn(
            'relative grid shrink-0 place-items-center overflow-hidden rounded-[0.6rem] border border-primary/30',
            box,
          )}
          style={{
            background:
              'linear-gradient(140deg, rgb(var(--c-primary) / 0.9), rgb(var(--c-violet) / 0.75) 55%, rgb(var(--c-cyan) / 0.8))',
          }}
          whileHover={{ rotate: -6, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          {/*
            AHM mark — one continuous angular ribbon: the outer strokes and
            centre valley draw the M, the bar spanning the two peaks is the H,
            and bar + valley close the A triangle. Five segments, no crossings,
            so it stays legible down to favicon size.
          */}
          <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
            <g
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path d="M6 24.5 L12 8 L16 19 L20 8 L26 24.5" />
              <path d="M12 8 H20" />
            </g>
          </svg>
          <span className="sr-only">{logo.monogram}</span>
        </motion.span>
      )}

      {!markOnly ? (
        <span
          className={cn(
            'font-display font-semibold tracking-[-0.02em] text-ink',
            size === 'sm' ? 'text-lg' : 'text-[1.3rem]',
          )}
        >
          {name}
        </span>
      ) : null}
    </span>
  );
}
