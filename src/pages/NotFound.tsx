import { siteConfig } from '@/config/siteConfig';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { GridBackdrop, GradientBlob } from '@/components/AnimatedBackground';

export function NotFound() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'That page does not exist.',
  });

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <GridBackdrop className="opacity-60" />
      <GradientBlob tone="bg-primary/[0.14]" size={520} className="-left-32 top-0" drift={38} />

      <div className="shell relative py-24 text-center">
        <Reveal>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-primary">
            Error 404
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-5 text-display-lg text-ink">This page doesn&apos;t exist.</h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
            The link may be out of date, or the address may have a typo in it.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-9">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as="link" to="/" withArrow size="lg">
              Back to home
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-14">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-subtle">
            Or jump to a section
          </p>
          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2">
            {siteConfig.nav.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`/#${item.sectionId}`}
                  className="inline-block rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-primary/35 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
