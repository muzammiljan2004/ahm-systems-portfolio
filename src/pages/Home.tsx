import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { siteConfig } from '@/config/siteConfig';

import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Projects } from '@/sections/Projects';
import { Experience } from '@/sections/Experience';
import { Certificates } from '@/sections/Certificates';
import { Resume } from '@/sections/Resume';
import { Contact } from '@/sections/Contact';

/**
 * Section order matches siteConfig.nav one-to-one, so the navbar's scroll-spy
 * and the footer links stay correct without a second list to maintain.
 *
 *   Home → About → Skills → Projects → Experience → Certificates → Resume → Contact
 */
export function Home() {
  useDocumentMeta({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    path: '/',
  });

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Resume />
      <Contact />
    </>
  );
}
