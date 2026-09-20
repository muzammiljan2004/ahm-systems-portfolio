import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the reading area.
 * Uses a single IntersectionObserver with a band near the top of the viewport
 * so the active nav item changes when a section *becomes* the subject, rather
 * than when it merely appears.
 */
export function useScrollSpy(sectionIds: string[], topOffset = 96): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track ratios so we can pick the most prominent section each tick.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }

        if (best) {
          setActiveId(best);
        } else if (window.scrollY < topOffset) {
          setActiveId(sectionIds[0] ?? '');
        }
      },
      {
        rootMargin: `-${topOffset}px 0px -45% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Bottom-of-page guard: the last section can never reach the band.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
      if (atBottom) setActiveId(sectionIds[sectionIds.length - 1] ?? '');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionIds, topOffset]);

  return activeId;
}
