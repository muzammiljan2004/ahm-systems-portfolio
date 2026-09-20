import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

/**
 * Dark is the primary experience; this offers a fully tokenised light mode.
 * Hide it with `siteConfig.features.themeToggle = false`.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  if (!siteConfig.features.themeToggle || !siteConfig.theme.allowToggle) return null;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={!isDark}
      className={cn(
        'group relative grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-primary/40 hover:text-ink',
        className,
      )}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center"
      >
        {isDark ? (
          <Moon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
        ) : (
          <Sun className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
