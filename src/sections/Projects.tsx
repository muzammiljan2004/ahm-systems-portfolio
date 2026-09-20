import { ArrowUpRight, FolderGit2, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/siteConfig';
import { scrollToSection } from '@/lib/utils';
import { SectionHeading } from '@/components/SectionHeading';
import { EmptyState } from '@/components/EmptyState';
import { GlowCard, Chip } from '@/components/GlowCard';
import { Button } from '@/components/Button';
import { Reveal, Stagger, RevealItem } from '@/components/Reveal';
import { GridBackdrop } from '@/components/AnimatedBackground';

/**
 * Renders the placeholder while `projects` is empty and switches to the grid
 * automatically once entries are added — no code change needed to publish.
 */
export function Projects() {
  const hasProjects = projects.length > 0;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section relative isolate overflow-hidden border-t border-line/60 bg-base-alt/30"
    >
      <GridBackdrop variant="dots" className="opacity-50" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Projects"
          title={<span id="projects-title">Selected work.</span>}
          description={
            hasProjects
              ? 'Builds we have shipped, and what went into them.'
              : 'This is where completed builds will be published.'
          }
        />

        {hasProjects ? (
          <Stagger
            className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {projects.map((project) => (
              <RevealItem key={project.id}>
                <GlowCard
                  as="article"
                  className="flex h-full flex-col p-6"
                  tone={project.accent ?? 'primary'}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[0.75rem] text-subtle">{project.year}</span>
                    <span className="flex items-center gap-1.5">
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${project.title} source code`}
                          className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Visit ${project.title}`}
                          className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[1.25rem] font-semibold text-ink">{project.title}</h3>
                  <p className="mt-1.5 text-[0.75rem] uppercase tracking-[0.08em] text-subtle">
                    {project.category}
                  </p>
                  <p className="mt-3.5 text-[0.875rem] leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Chip tone="neutral">{tag}</Chip>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </RevealItem>
            ))}
          </Stagger>
        ) : (
          <Reveal className="mt-12">
            <EmptyState
              icon={FolderGit2}
              title="No projects published yet"
              description="Completed builds will appear here with the problem they solved, what was delivered and the technology behind them. Until then, we would rather show nothing than fill the space with work that isn't ours."
              dataFile="src/data/projects.ts"
              tone="primary"
            >
              <Button variant="secondary" withArrow onClick={() => scrollToSection('contact')}>
                {siteConfig.cta.nav}
              </Button>
            </EmptyState>
          </Reveal>
        )}
      </div>
    </section>
  );
}
