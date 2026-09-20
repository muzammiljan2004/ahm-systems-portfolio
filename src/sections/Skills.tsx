import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Star } from 'lucide-react';
import { skillAreas, toolGroups, type SkillArea } from '@/data/skills';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal, Stagger, RevealItem } from '@/components/Reveal';
import { GridBackdrop, SectionAura } from '@/components/AnimatedBackground';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Expandable capability card. The detail panel is a real disclosure widget
 * (button + aria-expanded + aria-controls) rather than a hover-only reveal, so
 * it works on touch and with a keyboard.
 */
function SkillCard({ skill, index }: { skill: SkillArea; index: number }) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const Icon = skill.icon;
  const flagship = Boolean(skill.flagship);
  const panelId = `skill-panel-${skill.id}`;

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn(
        'group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-colors duration-500 sm:p-7',
        'gradient-border',
        flagship
          ? 'border-primary/35 bg-primary/[0.055]'
          : 'border-line bg-surface/40 hover:border-line-strong',
      )}
    >
      {flagship ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              'radial-gradient(120% 90% at 0% 0%, rgb(var(--c-primary) / 0.16), transparent 60%)',
          }}
        />
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            'grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-all duration-500',
            flagship
              ? 'border-primary/45 bg-primary/15 text-primary'
              : 'border-line bg-base/60 text-muted group-hover:border-primary/35 group-hover:text-primary',
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <span className="flex items-center gap-2">
          {flagship ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-primary">
              <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
              Core
            </span>
          ) : null}
          <span className="font-mono text-[0.75rem] text-subtle">
            {String(index + 1).padStart(2, '0')}
          </span>
        </span>
      </div>

      <h3
        className={cn(
          'mt-6 font-display font-semibold tracking-[-0.02em] text-ink',
          flagship ? 'text-[1.5rem] sm:text-[1.75rem]' : 'text-[1.25rem]',
        )}
      >
        {skill.title}
      </h3>
      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted">{skill.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {skill.capabilities.map((capability) => (
          <li
            key={capability}
            className={cn(
              'rounded-full border px-2.5 py-1 text-[0.75rem] transition-colors duration-400',
              flagship
                ? 'border-primary/25 bg-primary/10 text-primary/90'
                : 'border-line bg-base/50 text-subtle group-hover:border-primary/25 group-hover:text-muted',
            )}
          >
            {capability}
          </li>
        ))}
      </ul>

      {/* Disclosure */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'mt-auto inline-flex items-center gap-1.5 pt-7 text-[0.875rem] font-medium transition-colors duration-300',
          flagship ? 'text-primary' : 'text-muted hover:text-ink',
        )}
      >
        {open ? 'Show less' : 'How we approach it'}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted">
              {skill.description}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section relative isolate overflow-hidden border-t border-line/60"
    >
      <SectionAura tone="violet" />
      <GridBackdrop className="opacity-50" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Skills"
          title={
            <span id="skills-title">
              What we <span className="text-gradient-accent">actually do.</span>
            </span>
          }
          description="Six areas, built around development and AI. Each one exists to get a product shipped and keep it working once real users arrive."
        />

        <Stagger
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {skillAreas.map((skill, index) => (
            <RevealItem
              key={skill.id}
              className={cn(skill.flagship && 'md:col-span-2 lg:col-span-2')}
            >
              <SkillCard skill={skill} index={index} />
            </RevealItem>
          ))}
        </Stagger>

        {/* ---------------------------- Toolset ---------------------------- */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-display-sm text-ink">Tools &amp; technologies</h3>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
              What we build and deliver with. If a project is better served by something not on
              this list, we&apos;ll say so rather than force a fit.
            </p>
          </Reveal>

          <Stagger
            className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {toolGroups.map((group) => (
              <RevealItem key={group.label}>
                <div className="h-full rounded-2xl border border-line bg-surface/40 p-5 transition-colors duration-400 hover:border-primary/25">
                  <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-subtle">
                    {group.label}
                  </h4>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.8125rem] text-muted"
                      >
                        <span className="mt-[0.15rem] grid h-[1rem] w-[1rem] shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10">
                          <Check className="h-[0.55rem] w-[0.55rem] text-primary" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
