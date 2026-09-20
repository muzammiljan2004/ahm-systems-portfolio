/** @type {import('tailwindcss').Config} */

/**
 * All colours resolve to CSS custom properties declared in `src/styles/tokens.css`.
 * To re-brand the site, edit that file only — nothing here needs to change.
 */
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: token('--c-base'),
        'base-alt': token('--c-base-alt'),
        surface: token('--c-surface'),
        'surface-2': token('--c-surface-2'),
        line: token('--c-line'),
        'line-strong': token('--c-line-strong'),
        ink: token('--c-ink'),
        muted: token('--c-muted'),
        subtle: token('--c-subtle'),
        primary: token('--c-primary'),
        violet: token('--c-violet'),
        cyan: token('--c-cyan'),
        success: token('--c-success'),
        danger: token('--c-danger'),
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Inter var"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5.6vw, 4.75rem)', { lineHeight: '0.96', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2.125rem, 4.4vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(1.875rem, 3.6vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em', fontWeight: '600' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 9rem)',
      },
      maxWidth: {
        shell: '80rem',
        prose: '42rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-primary) / 0.18), 0 18px 60px -18px rgb(var(--c-primary) / 0.45)',
        'glow-violet': '0 0 0 1px rgb(var(--c-violet) / 0.2), 0 18px 60px -18px rgb(var(--c-violet) / 0.45)',
        card: '0 1px 0 0 rgb(var(--c-line) / 0.9), 0 24px 48px -28px rgb(0 0 0 / 0.7)',
        lift: '0 28px 70px -30px rgb(var(--c-primary) / 0.55)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgb(var(--c-primary) / 0.16), transparent 70%)',
        'sheen': 'linear-gradient(110deg, transparent 20%, rgb(var(--c-ink) / 0.08) 45%, transparent 70%)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-spin': {
          to: { '--angle': '360deg' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-24' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 9s ease infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(0.16,1,0.3,1) infinite',
        marquee: 'marquee 38s linear infinite',
        'dash-flow': 'dash-flow 1.1s linear infinite',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
