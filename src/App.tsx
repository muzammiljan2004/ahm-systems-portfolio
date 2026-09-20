import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';
import { NoiseOverlay } from '@/components/AnimatedBackground';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { useTheme } from '@/hooks/useTheme';
import { scrollToSection } from '@/lib/utils';

/** Resets scroll on route change, or jumps to a requested section. */
function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      // Let the home route paint before measuring the section's offset.
      const raf = requestAnimationFrame(() => scrollToSection(target, 84));
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.state]);

  return null;
}

export function App() {
  // Applies the data-theme attribute on mount so tokens resolve immediately.
  useTheme();

  return (
    <>
      <CursorGlow />
      <NoiseOverlay />
      <Navbar />
      <RouteEffects />

      <main id="main" className="relative z-[2]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
