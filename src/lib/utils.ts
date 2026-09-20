/** Tiny class-name joiner — avoids pulling in clsx for a one-line need. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Clamp a number between two bounds. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Map a value from one range to another. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);

/** Smoothly scroll to a section id, accounting for the sticky navbar. */
export function scrollToSection(sectionId: string, offset = 84): void {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
}

/** Stable id generator for aria relationships. */
let uid = 0;
export const nextId = (prefix: string): string => `${prefix}-${++uid}`;
