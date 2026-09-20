import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { cn, scrollToSection } from '@/lib/utils';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Logo } from './Logo';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

const NAV_HEIGHT = 84;

export function Navbar() {
  const scrolled = useScrolled(18);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  const sectionIds = useMemo(() => siteConfig.nav.map((item) => item.sectionId), []);
  const activeSection = useScrollSpy(onHome ? sectionIds : [], NAV_HEIGHT + 12);

  useLockBodyScroll(menuOpen);

  // Close the mobile menu on Escape and on route change.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const goToSection = useCallback(
    (sectionId: string) => {
      setMenuOpen(false);
      if (onHome) {
        scrollToSection(sectionId, NAV_HEIGHT);
      } else {
        // Navigating from a detail page: land on the home route, then scroll.
        navigate('/', { state: { scrollTo: sectionId } });
      }
    },
    [navigate, onHome],
  );

  return (
    <>
      {/* Skip link — first tab stop on the page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={prefersReduced ? undefined : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            'transition-all duration-500 ease-expo',
            scrolled
              ? 'border-b border-line/80 backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent',
          )}
          style={scrolled ? { background: 'var(--nav-bg)' } : undefined}
        >
          <nav
            aria-label="Primary"
            className="shell flex h-[var(--nav-h)] items-center justify-between gap-4"
            style={{ ['--nav-h' as string]: `${NAV_HEIGHT}px` }}
          >
            {/* Brand */}
            <button
              type="button"
              onClick={() => goToSection('home')}
              className="shrink-0 rounded-lg tap-highlight-none"
              aria-label={`${siteConfig.brand.name} — back to top`}
            >
              <Logo />
            </button>

            {/* Desktop nav */}
            <ul className="hidden items-center gap-1 lg:flex">
              {siteConfig.nav.map((item) => {
                const isActive = onHome && activeSection === item.sectionId;
                return (
                  <li key={item.sectionId}>
                    <button
                      type="button"
                      onClick={() => goToSection(item.sectionId)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Right cluster */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle className="hidden sm:grid" />
              <Button
                size="sm"
                className="hidden sm:inline-flex"
                withArrow
                onClick={() => goToSection('contact')}
              >
                {siteConfig.cta.nav}
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary/40 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.18 }}
                    className="grid place-items-center"
                  >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress hairline */}
        <ScrollProgress />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu
            activeSection={onHome ? activeSection : ''}
            onNavigate={goToSection}
            onClose={() => setMenuOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** Thin progress bar showing how far through the page the reader is. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="h-px w-full bg-transparent">
      <div
        className="h-px origin-left bg-gradient-to-r from-primary via-violet to-cyan transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

interface MobileMenuProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onClose: () => void;
}

function MobileMenu({ activeSection, onNavigate, onClose }: MobileMenuProps) {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-40 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-base/80 backdrop-blur-md"
      />

      <motion.nav
        aria-label="Mobile"
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-3 top-[5.25rem] overflow-hidden rounded-3xl border border-line bg-base-alt/95 p-3 shadow-2xl backdrop-blur-xl"
      >
        <ul className="flex flex-col">
          {siteConfig.nav.map((item, index) => (
            <motion.li
              key={item.sectionId}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + index * 0.045, duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => onNavigate(item.sectionId)}
                className={cn(
                  'flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[0.9375rem] font-medium transition-colors',
                  activeSection === item.sectionId
                    ? 'bg-primary/10 text-ink'
                    : 'text-muted active:bg-surface-2',
                )}
              >
                {item.label}
                {activeSection === item.sectionId ? (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                ) : null}
              </button>
            </motion.li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
          <Button
            className="flex-1"
            withArrow
            magnetic={false}
            onClick={() => onNavigate('contact')}
          >
            {siteConfig.cta.nav}
          </Button>
          <ThemeToggle />
        </div>
      </motion.nav>
    </motion.div>
  );
}
