import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Adds the animated gradient border on hover. */
  bordered?: boolean;
  /** Accent of the spotlight that follows the cursor. */
  tone?: 'primary' | 'violet' | 'cyan';
  /** Subtle lift on hover. */
  lift?: boolean;
  as?: 'div' | 'article' | 'li';
}

const toneVar = {
  primary: '--c-primary',
  violet: '--c-violet',
  cyan: '--c-cyan',
} as const;

/**
 * Premium card surface: glass background, hairline border, a spotlight that
 * tracks the cursor, and an optional animated gradient edge.
 * The spotlight is a single radial-gradient layer positioned with CSS custom
 * properties, so moving the mouse never triggers a React re-render of children.
 */
export function GlowCard({
  children,
  className,
  bordered = true,
  tone = 'primary',
  lift = true,
  as = 'div',
}: GlowCardProps) {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const Comp = motion[as];

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <Comp
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      whileHover={prefersReduced || !lift ? undefined : { y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-line bg-surface/50 backdrop-blur-sm transition-colors duration-500',
        'hover:border-line-strong',
        bordered && 'gradient-border',
        className,
      )}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(var(${toneVar[tone]}) / 0.1), transparent 62%)`,
        }}
      />
      {/* Top hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent"
      />
      <div className="relative">{children}</div>
    </Comp>
  );
}

interface ChipProps {
  children: ReactNode;
  className?: string;
  tone?: 'neutral' | 'primary' | 'violet' | 'cyan' | 'success';
}

const chipTones = {
  neutral: 'border-line bg-surface-2/60 text-muted',
  primary: 'border-primary/25 bg-primary/10 text-primary',
  violet: 'border-violet/25 bg-violet/10 text-violet',
  cyan: 'border-cyan/25 bg-cyan/10 text-cyan',
  success: 'border-success/25 bg-success/10 text-success',
} as const;

export function Chip({ children, className, tone = 'neutral' }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        chipTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Used wherever the interface shows invented data, so a visitor can never
 * mistake a demo value for a real company statistic.
 */
export function DemoBadge({
  label = 'Illustrative UI',
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-base/70 px-2 py-[0.2rem] text-[0.625rem] font-medium uppercase tracking-[0.14em] text-subtle backdrop-blur',
        className,
      )}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-subtle" />
      {label}
    </span>
  );
}
