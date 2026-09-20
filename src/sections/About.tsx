import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { scrollToSection } from '@/lib/utils';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal, Stagger, RevealItem } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { GradientBlob } from '@/components/AnimatedBackground';

const pillars = [
  {
    title: 'Acquire opportunities',
    body: 'Research, verification and outreach that put qualified conversations in front of the people who can close them.',
  },
  {
    title: 'Improve sales processes',
    body: 'Pipelines, CRM structure and automation that make the state of every deal visible and the next action obvious.',
  },
  {
    title: 'Build scalable systems',
    body: 'Websites, applications and internal tools that keep working as volume grows, documented for whoever maintains them next.',
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section relative isolate overflow-hidden border-t border-line/60"
    >
      <GradientBlob tone="bg-violet/[0.1]" size={520} className="-left-44 top-20" drift={34} />

      <div className="shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About"
              title={
                <span id="about-title">
                  Technology is only valuable when it moves a business forward.
                </span>
              }
            />

            <Reveal delay={0.08} className="mt-6">
              <div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                <p>
                  {siteConfig.brand.name} is a growth and technology partner. We help businesses
                  acquire opportunities, improve their sales processes and build the digital
                  systems those processes depend on.
                </p>
                <p>
                  Most agencies sit on one side of that line. A lead-generation firm hands over a
                  list and leaves; a development studio builds a CRM without ever having run a
                  pipeline through one. We do both, which means the research informs the system
                  and the system makes the research usable.
                </p>
                <p>
                  We are direct about scope and about what a given approach can reasonably
                  achieve. If the work you are asking for will not produce the outcome you want,
                  we would rather say so at the proposal stage than at the review.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-9">
              <Button variant="secondary" withArrow onClick={() => scrollToSection('contact')}>
                Talk to us about your business
              </Button>
            </Reveal>
          </div>

          {/* ---- Pillars ---- */}
          <Stagger className="flex flex-col gap-4 lg:pt-6" stagger={0.09}>
            {pillars.map((pillar, index) => (
              <RevealItem key={pillar.title}>
                <div className="group relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-6 transition-colors duration-400 hover:border-primary/30">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-4 font-display text-[4rem] font-semibold leading-none text-ink/[0.03] transition-colors duration-500 group-hover:text-primary/[0.09]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="flex items-center gap-2 text-[1.0625rem] font-semibold text-ink">
                    <ArrowRight
                      className="h-4 w-4 text-primary transition-transform duration-400 ease-expo group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
