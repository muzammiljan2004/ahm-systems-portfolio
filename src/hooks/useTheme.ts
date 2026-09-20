import { useCallback, useEffect, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'ahm-theme';

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return siteConfig.theme.default;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* storage can be unavailable (private mode, blocked cookies) */
  }
  return siteConfig.theme.default;
}

/**
 * Dark is the designed-for experience and the default. Light mode is a fully
 * tokenised alternative — see src/styles/tokens.css.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* non-fatal */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
