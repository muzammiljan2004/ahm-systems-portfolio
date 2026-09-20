import { Award, BadgeCheck, ExternalLink } from 'lucide-react';
import { certificates } from '@/data/certificates';
import { SectionHeading } from '@/components/SectionHeading';
import { EmptyState } from '@/components/EmptyState';
import { GlowCard } from '@/components/GlowCard';
import { Reveal, Stagger, RevealItem } from '@/components/Reveal';
import { GradientBlob } from '@/components/AnimatedBackground';

export function Certificates() {
  const hasCertificates = certificates.length > 0;

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="section relative isolate overflow-hidden border-t border-line/60"
    >
      <GradientBlob tone="bg-cyan/[0.09]" size={460} className="-left-36 top-20" drift={28} />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Certificates"
          title={<span id="certificates-title">Credentials.</span>}
          description={
            hasCertificates
              ? 'Certifications held, each with a link you can verify independently.'
              : 'Verified certifications will be listed here as they are earned.'
          }
        />

        {hasCertificates ? (
          <Stagger
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {certificates.map((certificate) => (
              <RevealItem key={certificate.id}>
                <GlowCard className="flex h-full flex-col p-6" tone="cyan">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan">
                    <BadgeCheck className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-[1.0625rem] font-semibold leading-snug text-ink">
                    {certificate.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] text-muted">{certificate.issuer}</p>

                  <dl className="mt-4 flex flex-col gap-1.5 text-[0.75rem] text-subtle">
                    <div className="flex gap-2">
                      <dt>Issued</dt>
                      <dd className="text-muted">{certificate.issued}</dd>
                    </div>
                    {certificate.expires ? (
                      <div className="flex gap-2">
                        <dt>Expires</dt>
                        <dd className="text-muted">{certificate.expires}</dd>
                      </div>
                    ) : null}
                    {certificate.credentialId ? (
                      <div className="flex gap-2">
                        <dt>ID</dt>
                        <dd className="break-all font-mono text-muted">
                          {certificate.credentialId}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  {certificate.credentialUrl ? (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8125rem] font-medium text-cyan"
                    >
                      Verify credential
                      <ExternalLink
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                </GlowCard>
              </RevealItem>
            ))}
          </Stagger>
        ) : (
          <Reveal className="mt-12">
            <EmptyState
              icon={Award}
              title="No certificates listed yet"
              description="Certifications will be published here with their issuer, date and a public verification link — so anything claimed can be checked rather than taken on trust."
              dataFile="src/data/certificates.ts"
              tone="cyan"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
