import { motion } from 'framer-motion';
import { Briefcase, Info } from 'lucide-react';
import { experienceEntries, experienceIsEmpty } from '@/data/experience';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal, Stagger, RevealItem } from '@/components/Reveal';
import { GradientBlob } from '@/components/AnimatedBackground';
import { Chip } from '@/components/GlowCard';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Vertical timeline. Entries still marked `isTemplate` render dimmed with a
 * "Template" badge — the section is honest about being unfilled rather than
 * shipping an invented work history.
 */
export function Experience() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section relative isolate overflow-hidden border-t border-line/60"
    >
      <GradientBlob tone="bg-violet/[0.1]" size={500} className="-right-40 top-24" drift={32} />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Experience"
          title={<span id="experience-title">Where we&apos;ve worked.</span>}
          description="Engagements, roles and the systems built along the way."
        />

        {experienceIsEmpty ? (
          <Reveal className="mx-auto mt-7 max-w-2xl">
            <p className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface/40 px-4 py-3 text-[0.8125rem] leading-relaxed text-muted">
              <Info className="mt-[0.15rem] h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                The entries below are{' '}
                <span className="font-medium text-ink">blank templates</span>, not real history.
                Replace the bracketed text in{' '}
                <code className="rounded bg-base/70 px-1.5 py-0.5 font-mono text-[0.6875rem]">
                  src/data/experience.ts
                </code>{' '}
                and set <code className="font-mono text-[0.6875rem]">isTemplate: false</code> — the
                badge and the dimming disappear on their own.
              </span>
            </p>
          </Reveal>
        ) : null}

        <div className="relative mt-14">
          {/* Timeline rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line sm:left-[1.65rem]"
          >
            <motion.span
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-violet to-cyan"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: reduced ? 0.01 : 1.5, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>

          <Stagger as="ol" className="relative flex flex-col gap-8" stagger={0.1}>
            {experienceEntries.map((entry) => (
              <RevealItem as="li" key={entry.id}>
                <div className={cn('flex gap-5 sm:gap-6', entry.isTemplate && 'opacity-70')}>
                  {/* Marker */}
                  <span
                    className={cn(
                      'relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border bg-base sm:h-[3.3rem] sm:w-[3.3rem]',
                      entry.isTemplate
                        ? 'border-dashed border-line-strong text-subtle'
                        : 'border-primary/35 text-primary',
                    )}
                  >
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                  </span>

                  {/* Card */}
                  <div
                    className={cn(
                      'min-w-0 flex-1 rounded-3xl border p-5 transition-colors duration-400 sm:p-6',
                      entry.isTemplate
                        ? 'border-dashed border-line-strong/70 bg-surface/25'
                        : 'border-line bg-surface/40 hover:border-primary/30',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-[0.75rem] text-primary">{entry.period}</span>
                      {entry.isTemplate ? (
                        <Chip tone="neutral" className="uppercase tracking-[0.1em]">
                          Template
                        </Chip>
                      ) : null}
                    </div>

                    <h3 className="mt-2.5 text-[1.125rem] font-semibold text-ink">{entry.role}</h3>
                    <p className="mt-1 text-[0.875rem] font-medium text-muted">
                      {entry.organisation}
                    </p>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                      {entry.summary}
                    </p>

                    {entry.highlights.length ? (
                      <ul className="mt-4 flex flex-col gap-2">
                        {entry.highlights.map((highlight, index) => (
                          <li
                            key={`${entry.id}-h${index}`}
                            className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/70"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.tags.length ? (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {entry.tags.map((tag, index) => (
                          <li key={`${entry.id}-t${index}`}>
                            <Chip tone="neutral">{tag}</Chip>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
