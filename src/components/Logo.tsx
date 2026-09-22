import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Hides the wordmark, leaving only the mark (used on very small screens). */
  markOnly?: boolean;
  size?: 'sm' | 'md';
}

/**
 * Brand lockup: the AHM mark plus the wordmark.
 *
 * Both marks ship in the markup and CSS picks one, so the right mark is on
 * screen in the first paint — a theme read in JS would flash the wrong one.
 * The theme attribute lands on <html>, hence the ancestor selectors.
 */
export function Logo({ className, markOnly = false, size = 'md' }: LogoProps) {
  const { name, logo } = siteConfig.brand;
  const box = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <motion.span
        className={cn('relative grid shrink-0 place-items-center', box)}
        whileHover={{ rotate: -6, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
      >
        <img
          src={logo.src.dark}
          alt={logo.alt}
          className="h-full w-full select-none object-contain [[data-theme=light]_&]:hidden"
          draggable={false}
        />
        <img
          src={logo.src.light}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full select-none object-contain [[data-theme=light]_&]:block"
          draggable={false}
        />
      </motion.span>

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
