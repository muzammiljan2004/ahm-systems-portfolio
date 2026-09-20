import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Path of the file to edit, shown as a hint for whoever fills it in. */
  dataFile?: string;
  /** Optional action row (e.g. a "get in touch" button). */
  children?: ReactNode;
  className?: string;
  tone?: 'primary' | 'violet' | 'cyan';
}

const toneMap = {
  primary: { ring: 'border-primary/30', text: 'text-primary', wash: 'rgb(var(--c-primary) / 0.1)' },
  violet: { ring: 'border-violet/30', text: 'text-violet', wash: 'rgb(var(--c-violet) / 0.1)' },
  cyan: { ring: 'border-cyan/30', text: 'text-cyan', wash: 'rgb(var(--c-cyan) / 0.1)' },
} as const;

/**
 * Placeholder for a section with no content yet.
 *
 * The point is that an empty section should look deliberate rather than
 * broken: a dashed frame reads as "reserved space", not "failed to load". Each
 * one names the data file to edit, so filling it in needs no code archaeology.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  dataFile,
  children,
  className,
  tone = 'primary',
}: EmptyStateProps) {
  const reduced = usePrefersReducedMotion();
  const styles = toneMap[tone];

  return (
    <div
      className={cn(
        'relative flex flex-col items-center overflow-hidden rounded-3xl border border-dashed border-line-strong/70 bg-surface/25 px-6 py-14 text-center sm:px-10 sm:py-16',
        className,
      )}
    >
      {/* Faint grid so the empty area still has texture */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: `radial-gradient(70% 100% at 50% 0%, ${styles.wash}, transparent 70%)` }}
      />

      <motion.span
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'relative grid h-14 w-14 place-items-center rounded-2xl border bg-base/60',
          styles.ring,
          styles.text,
        )}
      >
        <Icon className="h-[1.35rem] w-[1.35rem]" aria-hidden="true" />
        {!reduced ? (
          <motion.span
            aria-hidden="true"
            className={cn('absolute inset-0 rounded-2xl border', styles.ring)}
            animate={{ opacity: [0, 0.7, 0], scale: [0.95, 1.25, 1.25] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeOut' }}
          />
        ) : null}
      </motion.span>

      <h3 className="relative mt-6 text-[1.125rem] font-semibold text-ink">{title}</h3>
      <p className="relative mt-2.5 max-w-md text-[0.875rem] leading-relaxed text-muted">
        {description}
      </p>

      {children ? <div className="relative mt-7">{children}</div> : null}

      {dataFile ? (
        <p className="relative mt-8 text-[0.75rem] text-subtle">
          To publish this section, add entries in{' '}
          <code className="rounded bg-base/70 px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted">
            {dataFile}
          </code>
        </p>
      ) : null}
    </div>
  );
}
