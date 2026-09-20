/* ============================================================================
 * CENTRAL SITE CONFIGURATION
 * ----------------------------------------------------------------------------
 * This is the only file you need to touch to re-brand the website.
 * Every component reads its identity, contact details, links and CTA copy
 * from here — nothing is hard-coded elsewhere.
 * ==========================================================================*/

export type SocialPlatform =
  | 'linkedin'
  | 'x'
  | 'instagram'
  | 'github'
  | 'youtube'
  | 'facebook'
  | 'dribbble';

export interface SocialLink {
  /** Used to pick the icon. */
  platform: SocialPlatform;
  label: string;
  /** Replace with the real profile URL. `#` renders as a disabled placeholder. */
  href: string;
}

export interface NavItem {
  label: string;
  /** In-page section id (without `#`). */
  sectionId: string;
}

/** A downloadable CV shown in the Resume section. */
export interface ResumeDocument {
  id: string;
  /** Person the CV belongs to. */
  name: string;
  /** Line under the name, e.g. "Full-Stack Developer". */
  role: string;
  /** Path to the PDF in /public. */
  fileUrl: string;
  fileName: string;
}

export const siteConfig = {
  /* ---------------------------------------------------------------- brand */
  brand: {
    name: 'AHM Systems',
    /** Shown in the footer copyright line. */
    legal: 'AHM Systems',
    /** Primary slogan — hero badge, footer and Open Graph card. */
    tagline: 'Engineering Digital Solutions',
    /** One-line positioning statement, used in the footer + meta description. */
    description:
      'We build modern digital experiences, scalable software, and innovative technology solutions that help businesses grow.',
    /**
     * Logo: the site renders an SVG wordmark built from `name` by default,
     * so there is no image dependency. Point `imageSrc` at a file in /public
     * to use a real logo instead.
     */
    logo: {
      imageSrc: null as string | null,
      /** Letter(s) inside the logo glyph when no image is supplied. */
      monogram: 'AHM',
      alt: 'AHM Systems logo',
    },
  },

  /* -------------------------------------------------------------- contact */
  contact: {
    email: 'hello@ahmsystem.com',
    /** Shown as-is; set to null to hide the phone row entirely. */
    phone: '+1 (000) 000-0000',
    address: {
      line1: 'Remote-first',
      line2: 'Serving clients worldwide',
    },
    /** Business hours copy for the contact panel. */
    hours: 'Mon – Fri · 09:00 – 18:00',
    /** Typical first-response promise shown next to the form. */
    responseTime: 'Replies within 1 business day',
    /**
     * Where the contact form posts. Leave null and the form runs in
     * "preview mode" — it validates fully but does not transmit anything.
     * See src/services/contactService.ts for wiring instructions.
     */
    formEndpoint: null as string | null,
  },

  /* --------------------------------------------------------------- social */
  /** All placeholders — replace the `href` values, remove what you don't use. */
  socialLinks: [
    { platform: 'linkedin', label: 'LinkedIn', href: '#' },
    { platform: 'x', label: 'X', href: '#' },
    { platform: 'instagram', label: 'Instagram', href: '#' },
    { platform: 'github', label: 'GitHub', href: '#' },
  ] as SocialLink[],

  /* ---------------------------------------------------------- navigation */
  nav: [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Certificates', sectionId: 'certificates' },
    { label: 'Resume', sectionId: 'resume' },
    { label: 'Contact', sectionId: 'contact' },
  ] as NavItem[],

  /* ------------------------------------------------------- call to action */
  cta: {
    nav: "Let's Talk",
    primary: 'Get Started',
    secondary: 'View Our Skills',
    form: 'Send Enquiry',
  },

  /* ----------------------------------------------------------------- seo */
  seo: {
    /** %s is replaced by the page title. */
    titleTemplate: '%s · AHM Systems',
    defaultTitle: 'AHM Systems | Engineering Digital Solutions',
    description:
      'AHM Systems builds modern websites, mobile applications, and custom software solutions that help businesses grow through technology.',
    /** Absolute URL of the deployed site — update before going live. */
    siteUrl: 'https://ahmsystem.com',
    /** Open Graph image served from /public. */
    ogImage: '/og-image.svg',
    twitterHandle: '@ahmsystems',
    locale: 'en_US',
    keywords: [
      'software development company',
      'custom software solutions',
      'web development agency',
      'mobile app development',
      'lead intelligence',
      'CRM development',
      'business automation',
      'AI business solutions',
    ],
  },

  /* --------------------------------------------------------------- theme */
  theme: {
    /** 'dark' is the designed-for experience; the toggle is still available. */
    default: 'dark' as 'dark' | 'light',
    /** Set false to hide the light/dark toggle entirely. */
    allowToggle: true,
    /**
     * Mirrors the accent tokens in src/styles/tokens.css. Keep in sync if you
     * need the values in JS (e.g. for inline SVG gradients).
     */
    primaryColor: '#4C7DFF',
    secondaryColor: '#8B5CF6',
    tertiaryColor: '#22D3EE',
  },

  /* -------------------------------------------------------------- resume */
  resume: {
    /**
     * Company profile. Drop a PDF in /public and put its path here. While this
     * is null the Resume section falls back to the team CVs below, and shows
     * its placeholder state only when there is nothing at all to download.
     */
    fileUrl: null as string | null,
    fileName: 'ahm-systems-company-profile.pdf',
    /** Shown next to the download button once a file is set. */
    updatedLabel: '',
    /**
     * Individual CVs, served from /public/docs. Each renders its own download
     * card. Remove an entry to take that CV off the site.
     */
    documents: [
      {
        id: 'muzammil-cv',
        name: 'Muzammil Ahmed Chandio',
        role: 'Full-Stack Developer',
        fileUrl: '/docs/muzammil-ahmed-chandio-cv.pdf',
        fileName: 'muzammil-ahmed-chandio-cv.pdf',
      },
      {
        id: 'hasnat-cv',
        name: 'Hasnat Ali Shah',
        role: 'Full-Stack Developer',
        fileUrl: '/docs/hasnat-ali-shah-cv.pdf',
        fileName: 'hasnat-ali-shah-cv.pdf',
      },
    ] as ResumeDocument[],
  },

  /* -------------------------------------------------------------- legal */
  legal: {
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },

  /* ------------------------------------------------------------ features */
  /** Feature flags so sections can be switched off without deleting code. */
  features: {
    cursorGlow: true,
    themeToggle: true,
    showPhone: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Convenience: mailto link with a useful default subject. */
export const mailtoHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
  `Enquiry for ${siteConfig.brand.name}`,
)}`;
