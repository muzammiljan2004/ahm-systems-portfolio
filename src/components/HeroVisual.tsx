import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  ShieldCheck,
  Filter,
  MessageSquare,
  Handshake,
  TrendingUp,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { DemoBadge } from './GlowCard';

/* ---------------------------------------------------------------------------
 * The hero's Lead Intelligence visualisation.
 *
 * Businesses → Lead Discovery → Verification → Qualification → Setter →
 * Closer → Revenue
 *
 * Built entirely from CSS + SVG (no images, no 3D): a vertical spine of nodes
 * with connectors that carry a travelling pulse, plus floating interface cards.
 *
 * ⚠️ All values shown in the cards are ILLUSTRATIVE sample data used to
 * demonstrate the workflow. They are not company statistics.
 * ------------------------------------------------------------------------- */

interface FlowNode {
  label: string;
  icon: LucideIcon;
  tone: 'neutral' | 'primary' | 'cyan' | 'violet' | 'success';
}

const flowNodes: FlowNode[] = [
  { label: 'Businesses', icon: Building2, tone: 'neutral' },
  { label: 'Lead Discovery', icon: Search, tone: 'primary' },
  { label: 'Verification', icon: ShieldCheck, tone: 'cyan' },
  { label: 'Qualification', icon: Filter, tone: 'primary' },
  { label: 'Setter', icon: MessageSquare, tone: 'violet' },
  { label: 'Closer', icon: Handshake, tone: 'violet' },
  { label: 'Revenue', icon: TrendingUp, tone: 'success' },
];

const toneStyles = {
  neutral: {
    ring: 'border-line-strong',
    icon: 'text-muted',
    glow: 'shadow-none',
    dot: 'bg-subtle',
  },
  primary: {
    ring: 'border-primary/40',
    icon: 'text-primary',
    glow: 'shadow-[0_0_28px_-6px_rgb(var(--c-primary)/0.65)]',
    dot: 'bg-primary',
  },
  cyan: {
    ring: 'border-cyan/40',
    icon: 'text-cyan',
    glow: 'shadow-[0_0_28px_-6px_rgb(var(--c-cyan)/0.6)]',
    dot: 'bg-cyan',
  },
  violet: {
    ring: 'border-violet/40',
    icon: 'text-violet',
    glow: 'shadow-[0_0_28px_-6px_rgb(var(--c-violet)/0.6)]',
    dot: 'bg-violet',
  },
  success: {
    ring: 'border-success/45',
    icon: 'text-success',
    glow: 'shadow-[0_0_30px_-6px_rgb(var(--c-success)/0.65)]',
    dot: 'bg-success',
  },
} as const;

/** A connector with a pulse that travels down it, timed to its node index. */
function Connector({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-7 w-px overflow-hidden sm:h-8"
      style={{
        background:
          'linear-gradient(to bottom, rgb(var(--c-line-strong)), rgb(var(--c-line-strong) / 0.25))',
      }}
    >
      {!reduced ? (
        <motion.span
          className="absolute left-1/2 h-3 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
          animate={{ y: ['-0.75rem', '2rem'], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1.9,
            delay: index * 0.26,
            ease: 'linear',
          }}
        />
      ) : null}
    </div>
  );
}

function FlowNodeRow({
  node,
  index,
  reduced,
}: {
  node: FlowNode;
  index: number;
  reduced: boolean;
}) {
  const styles = toneStyles[node.tone];
  const Icon = node.icon;

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.35 + index * 0.085, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center"
    >
      <div
        className={cn(
          'relative flex w-full max-w-[16.5rem] items-center gap-3 rounded-2xl border bg-surface/70 px-3.5 py-2.5 backdrop-blur-md',
          styles.ring,
          styles.glow,
        )}
      >
        {/* Pulse ring on the active-looking nodes */}
        {!reduced && node.tone !== 'neutral' ? (
          <span
            aria-hidden="true"
            className={cn(
              'absolute -left-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full',
              styles.dot,
            )}
          />
        ) : null}

        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-xl border bg-base/60',
            styles.ring,
            styles.icon,
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>

        <span className="text-[0.8125rem] font-medium text-ink">{node.label}</span>

        {/* Tiny animated activity bars, purely decorative */}
        <span aria-hidden="true" className="ml-auto flex items-end gap-[3px]">
          {[0, 1, 2].map((bar) => (
            <motion.span
              key={bar}
              className={cn('w-[2px] rounded-full', styles.dot, 'opacity-60')}
              animate={reduced ? { height: 8 } : { height: [5, 12, 7, 10, 5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: index * 0.2 + bar * 0.18,
                ease: 'easeInOut',
              }}
              style={{ height: 8 }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

interface FloatCardProps {
  label: string;
  value: string;
  tone: 'primary' | 'cyan' | 'violet' | 'success';
  className?: string;
  delay: number;
  reduced: boolean;
  /** Shows a tick instead of a coloured dot. */
  checked?: boolean;
}

function FloatCard({ label, value, tone, className, delay, reduced, checked }: FloatCardProps) {
  const styles = toneStyles[tone];

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn('pointer-events-none', className)}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 1.6 }}
        className="glass flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-xl"
      >
        <span
          className={cn(
            'grid h-6 w-6 shrink-0 place-items-center rounded-lg border',
            styles.ring,
          )}
        >
          {checked ? (
            <Check className={cn('h-3 w-3', styles.icon)} aria-hidden="true" />
          ) : (
            <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} aria-hidden="true" />
          )}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.625rem] uppercase tracking-[0.12em] text-subtle">{label}</span>
          <span className="text-[0.8125rem] font-semibold text-ink">{value}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      {/* Ambient glow behind the spine */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--c-primary) / 0.18), rgb(var(--c-violet) / 0.1) 45%, transparent 70%)',
        }}
      />

      {/* Orbiting data particles */}
      {!reduced ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-cyan/70"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{
                rotate: 360,
                x: [0, 0],
              }}
              transition={{ duration: 26 + i * 6, repeat: Infinity, ease: 'linear' }}
            >
              <span
                className="absolute block h-1 w-1 rounded-full bg-current text-cyan shadow-[0_0_8px_2px_currentColor]"
                style={{ transform: `translateX(${120 + i * 34}px)` }}
              />
            </motion.span>
          ))}
        </div>
      ) : null}

      {/* ---- The pipeline spine ---- */}
      <div className="relative z-10 flex flex-col items-center py-2">
        {flowNodes.map((node, index) => (
          <div key={node.label} className="flex w-full flex-col items-center">
            <FlowNodeRow node={node} index={index} reduced={reduced} />
            {index < flowNodes.length - 1 ? (
              <Connector index={index} reduced={reduced} />
            ) : null}
          </div>
        ))}
      </div>

      {/* ---- Floating interface cards (desktop: around the spine) ---- */}
      <div aria-hidden="true" className="absolute inset-0 hidden xl:block">
        <FloatCard
          label="Prospects"
          value="2,840"
          tone="primary"
          delay={0.9}
          reduced={reduced}
          className="absolute left-0 top-[6%] w-[8.75rem]"
        />
        <FloatCard
          label="Verified"
          value="94%"
          tone="cyan"
          checked
          delay={1.05}
          reduced={reduced}
          className="absolute right-0 top-[26%] w-[8.75rem]"
        />
        <FloatCard
          label="High Intent"
          value="Flagged"
          tone="violet"
          delay={1.2}
          reduced={reduced}
          className="absolute left-0 top-[49%] w-[8.75rem]"
        />
        <FloatCard
          label="Booked"
          value="Thu 14:00"
          tone="success"
          checked
          delay={1.35}
          reduced={reduced}
          className="absolute right-0 top-[68%] w-[8.75rem]"
        />
        <FloatCard
          label="Closed"
          value="Won"
          tone="success"
          checked
          delay={1.5}
          reduced={reduced}
          className="absolute bottom-[3%] left-0 w-[8.75rem]"
        />
      </div>

      {/* ---- Floating cards, stacked for small/medium screens ---- */}
      <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:hidden">
        <FloatCard
          label="Prospects"
          value="2,840"
          tone="primary"
          delay={0.8}
          reduced={reduced}
        />
        <FloatCard
          label="Verified"
          value="94%"
          tone="cyan"
          checked
          delay={0.9}
          reduced={reduced}
        />
        <FloatCard
          label="Intent"
          value="Flagged"
          tone="violet"
          delay={1}
          reduced={reduced}
        />
        <FloatCard
          label="Booked"
          value="Thu 14:00"
          tone="success"
          checked
          delay={1.1}
          reduced={reduced}
        />
        <FloatCard
          label="Closed"
          value="Won"
          tone="success"
          checked
          delay={1.2}
          reduced={reduced}
          className="hidden sm:block"
        />
      </div>

      <div className="mt-5 flex justify-center xl:absolute xl:-bottom-11 xl:left-1/2 xl:mt-0 xl:-translate-x-1/2">
        <DemoBadge
          label="Illustrative UI — sample values"
          className="whitespace-nowrap"
        />
      </div>
    </div>
  );
}
