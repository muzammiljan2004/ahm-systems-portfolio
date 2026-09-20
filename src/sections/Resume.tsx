import { Download, FileText, Mail } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { scrollToSection } from '@/lib/utils';
import { SectionHeading } from '@/components/SectionHeading';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { Reveal, Stagger, RevealItem } from '@/components/Reveal';
import { GridBackdrop } from '@/components/AnimatedBackground';

/**
 * Renders the company profile (when `resume.fileUrl` is set) plus a download
 * card per CV in `resume.documents`. The placeholder only appears when there
 * is nothing at all to download — a broken "Download CV" costs more
 * credibility than an honest "not published yet".
 */
export function Resume() {
  const { resume, contact } = siteConfig;
  const hasProfile = Boolean(resume.fileUrl);
  const documents = resume.documents ?? [];
  const hasAnything = hasProfile || documents.length > 0;

  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className="section relative isolate overflow-hidden border-t border-line/60 bg-base-alt/30"
    >
      <GridBackdrop variant="dots" className="opacity-50" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Resume"
          title={<span id="resume-title">Profiles &amp; CVs.</span>}
          description={
            hasAnything
              ? 'Download the team CVs, or the company profile for capabilities and engagement model.'
              : 'A downloadable profile will be available here.'
          }
        />

        {hasAnything ? (
          <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
            {hasProfile ? (
              <Reveal>
                <div className="gradient-border gradient-border-always relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-7 sm:p-9">
                  <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-primary/35 bg-primary/10 text-primary">
                        <FileText className="h-[1.35rem] w-[1.35rem]" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.0625rem] font-semibold text-ink">
                          {resume.fileName}
                        </h3>
                        {resume.updatedLabel ? (
                          <p className="mt-1 text-[0.8125rem] text-subtle">{resume.updatedLabel}</p>
                        ) : null}
                      </div>
                    </div>

                    <Button
                      as="a"
                      href={resume.fileUrl as string}
                      target="_blank"
                      icon={Download}
                      size="lg"
                      className="shrink-0"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </Reveal>
            ) : null}

            {documents.length ? (
              <Stagger className="flex flex-col gap-4" stagger={0.08}>
                {documents.map((document) => (
                  <RevealItem key={document.id}>
                    <div className="rounded-3xl border border-line bg-surface/40 p-6 transition-colors duration-400 hover:border-primary/30 sm:p-7">
                      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet/35 bg-violet/10 text-violet">
                            <FileText className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-[1.0625rem] font-semibold text-ink">
                              {document.name}
                            </h3>
                            <p className="mt-0.5 text-[0.8125rem] text-subtle">{document.role}</p>
                          </div>
                        </div>

                        <Button
                          as="a"
                          href={document.fileUrl}
                          target="_blank"
                          variant="secondary"
                          icon={Download}
                          className="shrink-0"
                        >
                          Download CV
                        </Button>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </Stagger>
            ) : null}
          </div>
        ) : (
          <Reveal className="mt-12">
            <EmptyState
              icon={FileText}
              title="Profile not published yet"
              description="A downloadable company profile — capabilities, engagement model and contact details in one document — will be available here shortly. In the meantime, ask for it directly and we'll send it over."
              dataFile="src/config/siteConfig.ts → resume.fileUrl"
              tone="violet"
            >
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button withArrow onClick={() => scrollToSection('contact')}>
                  Request the profile
                </Button>
                <Button
                  as="a"
                  href={`mailto:${contact.email}?subject=${encodeURIComponent('Company profile request')}`}
                  variant="secondary"
                  icon={Mail}
                >
                  Email us
                </Button>
              </div>
            </EmptyState>
          </Reveal>
        )}
      </div>
    </section>
  );
}
