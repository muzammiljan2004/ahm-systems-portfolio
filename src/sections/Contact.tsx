import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { GridBackdrop, GradientBlob } from '@/components/AnimatedBackground';

export function Contact() {
  const { contact, brand } = siteConfig;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section relative isolate overflow-hidden border-t border-line/60"
    >
      <GridBackdrop variant="dots" className="opacity-50" />
      <GradientBlob tone="bg-primary/[0.12]" size={540} className="-left-40 top-16" drift={36} />

      <div className="shell relative">
        <SectionHeading
          align="left"
          eyebrow="Contact"
          title={<span id="contact-title">Tell us what you&apos;re working on.</span>}
          description="A short description of the objective and where you're stuck is enough to start. We'll come back with questions, or with a view on whether we're the right fit."
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-10">
          {/* ---- Form ---- */}
          <Reveal>
            <div className="rounded-3xl border border-line bg-surface/40 p-6 backdrop-blur-sm sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* ---- Details ---- */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl border border-line bg-surface/40 p-6">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-subtle">
                  Direct
                </h3>
                <ul className="mt-4 flex flex-col gap-4 text-[0.875rem]">
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="group flex items-start gap-3 text-muted transition-colors hover:text-ink"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-base/60 text-primary transition-colors group-hover:border-primary/40">
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col leading-tight">
                        <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                          Email
                        </span>
                        <span className="break-all">{contact.email}</span>
                      </span>
                    </a>
                  </li>

                  {siteConfig.features.showPhone && contact.phone ? (
                    <li>
                      <a
                        href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                        className="group flex items-start gap-3 text-muted transition-colors hover:text-ink"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-base/60 text-primary transition-colors group-hover:border-primary/40">
                          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="flex flex-col leading-tight">
                          <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                            Phone
                          </span>
                          <span>{contact.phone}</span>
                        </span>
                      </a>
                      {contact.phonesAlt.length ? (
                        <ul className="mt-2 flex flex-col gap-1 pl-11 text-[0.8125rem] text-subtle">
                          {contact.phonesAlt.map((number) => (
                            <li key={number}>
                              <a
                                href={`tel:${number.replace(/[^+\d]/g, '')}`}
                                className="transition-colors hover:text-ink"
                              >
                                {number}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ) : null}

                  <li className="flex items-start gap-3 text-muted">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-base/60 text-primary">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                        Location
                      </span>
                      <span>{contact.address.line1}</span>
                      <span className="text-subtle">{contact.address.line2}</span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3 text-muted">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-base/60 text-primary">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                        Hours
                      </span>
                      <span>{contact.hours}</span>
                      <span className="text-subtle">{contact.responseTime}</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* What happens next */}
              <div className="rounded-3xl border border-line bg-surface/40 p-6">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-subtle">
                  What happens next
                </h3>
                <ol className="mt-4 flex flex-col gap-3.5">
                  {[
                    'We read it and reply within one business day.',
                    'A short call to understand the objective — no deck.',
                    'A written scope with price and timeline, or an honest no.',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3 text-[0.8125rem] leading-relaxed text-muted">
                      <span className="font-mono text-[0.6875rem] text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-auto rounded-2xl border border-line/70 bg-base/40 px-4 py-3 text-[0.75rem] leading-relaxed text-subtle">
                {brand.name} works remotely with clients worldwide. Email is the fastest
                route — we reply to every enquiry.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
