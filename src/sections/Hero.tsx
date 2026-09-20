import { motion } from 'framer-motion';
import { ArrowDown, Radar, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { scrollToSection } from '@/lib/utils';
import { Button } from '@/components/Button';
import { HeroVisual } from '@/components/HeroVisual';
import { GridBackdrop, GradientBlob } from '@/components/AnimatedBackground';
import { AnimatedHeadline } from '@/components/SectionHeading';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-[8.5rem] sm:pb-24 lg:pb-32 lg:pt-[10.5rem]"
    >
      {/* ---------- Backdrop ---------- */}
      <GridBackdrop className="opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-grid-fade"
      />
      <GradientBlob
        tone="bg-primary/20"
        size={620}
        className="-left-40 -top-40"
        drift={46}
      />
      <GradientBlob
        tone="bg-violet/[0.16]"
        size={520}
        delay={3}
        className="-right-32 top-24"
        drift={38}
      />
      <GradientBlob
        tone="bg-cyan/[0.1]"
        size={420}
        delay={6}
        className="bottom-0 left-1/3"
        drift={30}
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-20">
          {/* ---------- Copy column ---------- */}
          <div className="relative z-10 flex flex-col items-start">
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/50 py-1.5 pl-1.5 pr-4 backdrop-blur-md"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary">
                <Radar className="h-3 w-3" aria-hidden="true" />
                {siteConfig.brand.name}
              </span>
              <span className="text-[0.8125rem] text-muted">
                {siteConfig.brand.tagline}
              </span>
            </motion.div>

            <AnimatedHeadline
              as="h1"
              id="hero-title"
              words={['Find', 'the', 'right', 'leads.', '\n', 'Build', 'what', 'comes', 'next.']}
              accentFrom={5}
              srLabel="Find the right leads. Build what comes next."
              className="text-display-xl text-ink"
            />

            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              We build modern digital experiences, scalable software, and innovative
              technology solutions that help businesses grow.
            </motion.p>

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button size="lg" withArrow onClick={() => scrollToSection('contact')}>
                {siteConfig.cta.primary}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={Sparkles}
                onClick={() => scrollToSection('skills')}
              >
                {siteConfig.cta.secondary}
              </Button>
            </motion.div>

            {/* Quick positioning strip */}
            <motion.ul
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.76 }}
              className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8125rem] text-subtle"
            >
              {['Lead generation & qualification', 'Appointment setting', 'Web, CRM & automation'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-primary/80 shadow-[0_0_8px_1px_rgb(var(--c-primary)/0.7)]"
                    />
                    {item}
                  </li>
                ),
              )}
            </motion.ul>
          </div>

          {/* ---------- Visual column ---------- */}
          <div className="relative z-10 lg:pl-4 xl:pl-14">
            <HeroVisual />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="group mx-auto mt-20 hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-subtle transition-colors hover:border-primary/40 hover:text-ink lg:flex"
        >
          See what we do
          <motion.span
            animate={reduced ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="grid place-items-center"
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
