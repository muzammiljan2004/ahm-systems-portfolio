import { Mail, MapPin, Phone, Linkedin, Github, Instagram, Youtube, Facebook, Dribbble, type LucideIcon } from 'lucide-react';
import { siteConfig, type SocialPlatform } from '@/config/siteConfig';
import { skillAreas } from '@/data/skills';
import { cn, scrollToSection } from '@/lib/utils';
import { Logo } from './Logo';
import { GridBackdrop } from './AnimatedBackground';

/** Inline X/Twitter glyph — lucide has no current X mark. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons: Record<SocialPlatform, LucideIcon | typeof XIcon> = {
  linkedin: Linkedin,
  x: XIcon,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
  dribbble: Dribbble,
};

export function Footer() {
  const year = new Date().getFullYear();
  const { brand, contact, socialLinks, nav, legal } = siteConfig;

  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-base-alt/50">
      <GridBackdrop variant="dots" fade={false} className="opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/[0.07] to-transparent"
      />

      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          {/* ---- Brand column ---- */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.9375rem] font-medium text-ink">{brand.tagline}</p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{brand.description}</p>

            {/* Social links — placeholders until real profiles exist. */}
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform];
                const isPlaceholder = link.href === '#';
                return (
                  <li key={link.platform}>
                    <a
                      href={link.href}
                      target={isPlaceholder ? undefined : '_blank'}
                      rel={isPlaceholder ? undefined : 'noreferrer noopener'}
                      aria-label={
                        isPlaceholder ? `${link.label} (link not set yet)` : `${brand.name} on ${link.label}`
                      }
                      aria-disabled={isPlaceholder || undefined}
                      onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
                      className={cn(
                        'grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all duration-300',
                        isPlaceholder
                          ? 'cursor-not-allowed opacity-55'
                          : 'hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary',
                      )}
                    >
                      <Icon className="h-[0.95rem] w-[0.95rem]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---- Navigation ---- */}
          <nav aria-labelledby="footer-nav-title">
            <h2 id="footer-nav-title" className="text-eyebrow uppercase text-subtle">
              Navigation
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.sectionId}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.sectionId)}
                    className="text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Capabilities ---- */}
          <nav aria-labelledby="footer-services-title">
            <h2 id="footer-services-title" className="text-eyebrow uppercase text-subtle">
              Capabilities
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {skillAreas.map((skill) => (
                <li key={skill.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('skills')}
                    className="inline-flex items-center gap-1.5 text-left text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {skill.title}
                    {skill.flagship ? (
                      <span className="rounded-full bg-primary/15 px-1.5 py-px text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-primary">
                        Core
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div>
            <h2 className="text-eyebrow uppercase text-subtle">Contact</h2>
            <ul className="mt-5 flex flex-col gap-3.5 text-[0.875rem]">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-start gap-2.5 text-muted transition-colors duration-300 hover:text-ink"
                >
                  <Mail className="mt-[0.15rem] h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              {siteConfig.features.showPhone && contact.phone ? (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                    className="inline-flex items-start gap-2.5 text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <Phone className="mt-[0.15rem] h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-2.5 text-muted">
                <MapPin className="mt-[0.15rem] h-3.5 w-3.5 shrink-0 text-subtle" aria-hidden="true" />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </span>
              </li>
            </ul>

            <p className="mt-5 text-[0.8125rem] text-subtle">{contact.hours}</p>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-subtle">
            © {year} {brand.legal}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {legal.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.href === '#' ? (event) => event.preventDefault() : undefined}
                aria-disabled={link.href === '#' || undefined}
                className={cn(
                  'text-[0.8125rem] transition-colors duration-300',
                  link.href === '#'
                    ? 'cursor-not-allowed text-subtle/60'
                    : 'text-subtle hover:text-ink',
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
