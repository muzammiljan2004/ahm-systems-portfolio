import { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';

interface Meta {
  title: string;
  description?: string;
  /** Path only, e.g. "/services/lead-intel". */
  path?: string;
}

function setTag(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Keeps title / description / canonical / OG tags in sync as the user moves
 * between routes. The base tags live in index.html so crawlers that do not run
 * JS still get valid metadata.
 */
export function useDocumentMeta({ title, description, path }: Meta): void {
  useEffect(() => {
    const fullTitle =
      title === siteConfig.seo.defaultTitle
        ? title
        : siteConfig.seo.titleTemplate.replace('%s', title);
    document.title = fullTitle;

    const desc = description ?? siteConfig.seo.description;
    setTag('meta[name="description"]', 'content', desc);
    setTag('meta[property="og:title"]', 'content', fullTitle);
    setTag('meta[property="og:description"]', 'content', desc);
    setTag('meta[name="twitter:title"]', 'content', fullTitle);
    setTag('meta[name="twitter:description"]', 'content', desc);

    if (path) {
      const url = `${siteConfig.seo.siteUrl}${path}`;
      setTag('link[rel="canonical"]', 'href', url);
      setTag('meta[property="og:url"]', 'content', url);
    }
  }, [title, description, path]);
}
