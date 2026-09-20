import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

/* ============================================================================
 * VERSION WATCHER
 * ----------------------------------------------------------------------------
 * A tab opened before a deploy keeps running the old bundle until someone
 * reloads — which is why a teammate "can't see" what you just pushed.
 *
 * Vite fingerprints the entry script (`/assets/index-<hash>.js`), so the hash
 * in the live index.html IS the deployed version. We read ours from our own
 * <script> tag at runtime, then re-fetch index.html periodically and compare.
 * No build step, no version file to bump, nothing to keep in sync.
 * ==========================================================================*/

const POLL_MS = 60_000;

/** The entry bundle this tab is running. */
function currentEntry(): string | null {
  const script = document.querySelector<HTMLScriptElement>('script[type="module"][src]');
  return script ? new URL(script.src).pathname : null;
}

/** The entry bundle the server is serving right now. */
async function deployedEntry(): Promise<string | null> {
  const response = await fetch(`/?_v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) return null;
  const html = await response.text();
  return html.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1] ?? null;
}

/**
 * Reload past the HTTP cache. Hashed assets make a plain reload sufficient in
 * theory, but index.html itself can be held by a CDN or the back/forward
 * cache, so clear what we can reach first.
 */
async function hardReload() {
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch {
    // Storage can be blocked (private mode); reloading is still worth trying.
  }
  window.location.reload();
}

/** Don't yank the page out from under someone mid-enquiry. */
function hasUnsavedInput() {
  return [...document.querySelectorAll('input, textarea')].some(
    (field) => (field as HTMLInputElement | HTMLTextAreaElement).value.trim().length > 0,
  );
}

export function VersionWatcher() {
  const [stale, setStale] = useState(false);

  useEffect(() => {
    // Dev runs off HMR; there is no deployed bundle to compare against.
    if (import.meta.env.DEV) return;

    const ours = currentEntry();
    if (!ours) return;

    let cancelled = false;

    const check = async () => {
      if (cancelled || document.visibilityState !== 'visible') return;
      try {
        const live = await deployedEntry();
        if (cancelled || !live || live === ours) return;
        // Nobody was looking and nothing is half-typed: just take the update.
        if (document.hidden || !hasUnsavedInput()) {
          void hardReload();
          return;
        }
        setStale(true);
      } catch {
        // Offline or a blip — try again on the next tick.
      }
    };

    const timer = window.setInterval(check, POLL_MS);
    // A tab coming back into focus is the most likely moment to be behind.
    document.addEventListener('visibilitychange', check);
    void check();

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', check);
    };
  }, []);

  if (!stale) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-card backdrop-blur-md sm:inset-x-auto sm:right-6"
    >
      <span className="flex-1 text-[0.8125rem] leading-snug text-muted">
        You&apos;re viewing an older version of this site.
      </span>
      <button
        type="button"
        onClick={() => void hardReload()}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[0.8125rem] font-medium text-white transition-colors hover:bg-primary/90"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Reload
      </button>
    </div>
  );
}
