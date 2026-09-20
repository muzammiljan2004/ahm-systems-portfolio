import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface GridProps {
  className?: string;
  /** Fades the grid out toward the bottom. */
  fade?: boolean;
  variant?: 'lines' | 'dots';
}

/** Static CSS grid — zero runtime cost, used as the base texture everywhere. */
export function GridBackdrop({ className, fade = true, variant = 'lines' }: GridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        variant === 'lines' ? 'bg-grid' : 'bg-dots',
        fade && 'mask-fade-b',
        className,
      )}
    />
  );
}

interface BlobProps {
  className?: string;
  /** Tailwind colour class, e.g. 'bg-primary/25'. */
  tone?: string;
  size?: number;
  delay?: number;
  /** Travel distance in pixels. */
  drift?: number;
}

/**
 * Soft gradient blob. Animates transform + opacity only (both compositor
 * properties), so several can run at once without layout work.
 */
export function GradientBlob({
  className,
  tone = 'bg-primary/25',
  size = 520,
  delay = 0,
  drift = 40,
}: BlobProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn('pointer-events-none absolute rounded-full blur-[110px]', tone, className)}
      style={{ width: size, height: size }}
      animate={
        prefersReduced
          ? undefined
          : {
              x: [0, drift, -drift * 0.6, 0],
              y: [0, -drift * 0.8, drift * 0.5, 0],
              scale: [1, 1.07, 0.96, 1],
            }
      }
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/** Fine noise overlay that stops large gradients from looking flat/banded. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
      style={{
        opacity: 'var(--noise-opacity)',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

interface SectionAuraProps {
  className?: string;
  tone?: 'primary' | 'violet' | 'cyan';
}

/** Single soft glow used to lift a section away from the page background. */
export function SectionAura({ className, tone = 'primary' }: SectionAuraProps) {
  const map = {
    primary: 'from-primary/[0.13]',
    violet: 'from-violet/[0.13]',
    cyan: 'from-cyan/[0.11]',
  } as const;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b to-transparent',
        map[tone],
        className,
      )}
    />
  );
}

/** Thin animated hairline used as a section divider. */
export function GlowDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative h-px w-full overflow-hidden', className)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        animate={{ x: ['-100%', '400%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
