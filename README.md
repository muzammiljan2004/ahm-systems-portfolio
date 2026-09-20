# AHM Systems — Company Portfolio Website

A production-ready portfolio site for a digital growth and technology company,
with **Lead Intel** positioned as the core capability.

**Structure:** Home → About → Skills → Projects → Experience → Certificates →
Resume → Contact (one page, smooth-scrolled, plus a 404 route).

> **Company name, logo, colours, contact details, social links and all content
> are driven from config and data files** — see [Rebranding](#rebranding). You
> don't need to touch a component.

> **Projects, Certificates and Resume ship intentionally empty**, and the
> Experience entries are blank templates. See
> [Filling in the blank sections](#filling-in-the-blank-sections).

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion ·
Lucide React · React Router

---

## Quick start

Requires **Node 18+** (20+ recommended).

```bash
npm install
npm run dev
```

Open the URL it prints — usually <http://localhost:5173>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |

---

## Filling in the blank sections

Each empty section shows a designed placeholder that names the file to edit, and
switches to its full layout **automatically** as soon as you add data — no code
changes needed.

### Projects — `src/data/projects.ts`

Currently `export const projects: Project[] = []`. Add an object:

```ts
{
  id: 'acme-crm',
  title: 'Acme CRM',
  category: 'Web Development · CRM',
  description: 'What the client needed and what was built.',
  tags: ['React', 'Node.js', 'PostgreSQL'],
  year: '2026',
  liveUrl: 'https://example.com',  // or null
  repoUrl: null,
  accent: 'primary',               // 'primary' | 'violet' | 'cyan'
}
```

Only publish client names and links you have permission to use.

### Certificates — `src/data/certificates.ts`

```ts
{
  id: 'google-analytics',
  title: 'Google Analytics Certification',
  issuer: 'Google',
  issued: 'Mar 2026',
  expires: null,
  credentialId: 'ABC-12345',
  credentialUrl: 'https://…',   // public verification link
}
```

Only list credentials actually held — the verification link is checkable.

### Resume — `src/config/siteConfig.ts`

Drop a PDF in `public/`, then:

```ts
resume: {
  fileUrl: '/ahm-systems-company-profile.pdf',
  fileName: 'ahm-systems-company-profile.pdf',
  updatedLabel: 'Updated March 2026',
}
```

While `fileUrl` is `null` the section shows a placeholder with a "request the
profile" button, rather than a dead download link.

### Experience — `src/data/experience.ts`

Two **blank template** entries ship by default. They render dimmed with a
"Template" badge, and a notice above the timeline explains why. The company is
new, so an invented work history would be a claim a client can check.

Replace the bracketed placeholders and set `isTemplate: false` — the badge and
dimming disappear on their own. Delete rows you don't need, or empty the array
entirely to hide the timeline.

---

## Rebranding

### Company name and logo — `src/config/siteConfig.ts`

```ts
brand: {
  name: 'AHM Systems',            // ← the company name
  legal: 'AHM Systems',           // ← footer copyright
  tagline: 'Growth intelligence. Digital technology.',
  description: '…',               // footer blurb + meta description
  logo: {
    imageSrc: null,               // ← '/logo.svg' to use a real file
    monogram: 'N',
    alt: 'AHM Systems logo',
  },
}
```

The logo is a **generated SVG mark plus a wordmark built from `brand.name`**, so
there's no image asset to replace and nothing breaks when the name changes.

Also update when the name is final:

- `siteConfig.seo` → `titleTemplate`, `defaultTitle`, `siteUrl`
- `index.html` → static `<title>`, meta description, Open Graph and JSON-LD
  (duplicated deliberately so crawlers that don't run JS still see them)
- `public/` → `site.webmanifest`, `robots.txt`, `sitemap.xml`, `favicon.svg`,
  `apple-touch-icon.svg`, `og-image.svg`
- Remove the placeholder notices at the bottom of `src/components/Footer.tsx`
  and `src/sections/Contact.tsx`

### Colours — `src/styles/tokens.css`

All colours are CSS custom properties stored as space-separated RGB channels, so
Tailwind opacity modifiers (`bg-primary/20`) keep working:

```css
:root, [data-theme='dark'] {
  --c-base: 5 6 11;        /* page background */
  --c-surface: 16 19 29;   /* cards */
  --c-ink: 233 236 245;    /* text */
  --c-primary: 76 125 255; /* electric blue */
  --c-violet: 139 92 246;
  --c-cyan: 34 211 238;
}
[data-theme='light'] { /* full light palette */ }
```

Change a value and it propagates everywhere — buttons, glows, gradients, SVG
artwork. `tailwind.config.js` maps tokens to Tailwind names and holds the type
scale, shadows and easing; you'll rarely need to edit it.

**Dark mode is the designed-for experience** and the default. A fully tokenised
light theme is included; hide the toggle with
`siteConfig.features.themeToggle = false`.

### Contact and social links

```ts
contact: {
  email: 'hello@ahmsystem.com',
  phone: '+1 (000) 000-0000',   // features.showPhone = false to hide
  address: { line1: '…', line2: '…' },
  hours: 'Mon – Fri · 09:00 – 18:00',
  responseTime: 'Replies within 1 business day',
  formEndpoint: null,           // see below
},
socialLinks: [
  { platform: 'linkedin', label: 'LinkedIn', href: '#' },  // ← replace '#'
],
```

Links left as `'#'` render visibly disabled rather than pretending to work.
Supported platforms: `linkedin`, `x`, `instagram`, `github`, `youtube`,
`facebook`, `dribbble`.

### Skills — `src/data/skills.ts`

Drives the Skills cards, the footer capability list and the contact form
dropdown. `flagship: true` marks Lead Intel as the core offering (wider card,
accent treatment, "Core" badge) — only one entry should carry it.

`toolGroups` is the Tools & technologies grid. **Edit it** — a tools list is a
capability claim a client may ask you to prove.

### Navigation

`siteConfig.nav` maps labels to section ids. The order matches
`src/pages/Home.tsx` one-to-one, so the navbar scroll-spy and footer links stay
correct with no second list to maintain. To add a section: create it in
`src/sections/`, give its `<section>` an `id`, add it to `Home.tsx`, and add a
`nav` entry with the same `sectionId`.

---

## Connecting the contact form

The form is **not connected to a backend**, by design. It validates fully and
then reports honestly that no endpoint is configured — it never fakes a send.

All network logic is isolated in `src/services/contactService.ts`. To connect it,
set one value:

```ts
contact: { formEndpoint: 'https://formspree.io/f/XXXXXXX' }
```

1. **Hosted form service** (Formspree, Basin, Web3Forms). The default JSON `POST`
   already matches what these expect.
2. **Your own API.** Set the endpoint; adjust `buildRequest()` if the payload
   shape differs.
3. **Serverless function** (recommended on Vercel). Create `api/contact.ts`, set
   `formEndpoint: '/api/contact'`. Keep API keys server-side — anything in
   `src/` ships to the browser.

Validation rules live in `validateEnquiry()`. A hidden honeypot field provides
basic bot filtering.

---

## Deployment

### Vercel

`vercel.json` configures the build, SPA rewrites (so the 404 route works on a
hard refresh) and immutable caching for hashed assets.

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or import the repo at [vercel.com/new](https://vercel.com/new).

### Netlify / Cloudflare Pages / other static hosts

- **Build:** `npm run build` · **Publish directory:** `dist`
- **Required:** an SPA fallback to `/index.html`. On Netlify add
  `public/_redirects` containing `/*  /index.html  200`.

Before going live, replace `https://ahmsystem.com` in `index.html`,
`siteConfig.seo.siteUrl`, `public/robots.txt` and `public/sitemap.xml`.

---

## Project structure

```
src/
├─ components/
│  ├─ Navbar / Footer / Button / SectionHeading / Reveal
│  ├─ AnimatedBackground   Grid, blobs, noise, dividers
│  ├─ CursorGlow           Pointer-following light (desktop only)
│  ├─ HeroVisual           Animated lead-intelligence flow
│  ├─ EmptyState           Placeholder for unpublished sections
│  ├─ GlowCard / Logo / ThemeToggle / ContactForm
├─ sections/            Hero, About, Skills, Projects, Experience,
│                       Certificates, Resume, Contact
├─ pages/               Home, NotFound
├─ config/siteConfig.ts ★ Company identity — start here
├─ data/                skills · projects · certificates · experience
├─ services/            contactService.ts — API-ready submission layer
├─ hooks/               Theme, scroll spy, reduced motion, scroll lock, meta
├─ lib/                 motion.ts (shared variants), utils.ts
└─ styles/tokens.css    ★ Design tokens — colours live here
```

Business content stays out of components: sections read from `data/`, identity
comes from `config/`.

---

## Design system

- **Type scale** — `text-display-xl` → `text-display-sm`, fluid `clamp()` values
  in `tailwind.config.js`.
- **Layout** — `.shell` (max width + gutters) and `.section` (vertical rhythm).
- **Surfaces** — `.glass`, `.panel`, `.gradient-border`, `.bg-grid`, `.bg-dots`,
  `.mask-fade-b`, `.mask-radial`.
- **Motion** — shared variants in `src/lib/motion.ts` on one easing curve,
  wrapped by `<Reveal>`, `<Stagger>`, `<RevealItem>`.
- **Performance** — animations stick to `transform` and `opacity`; cursor glow is
  desktop-only; vendor and motion bundles are split.

---

## Accessibility

- Semantic landmarks, one `<h1>`, ordered heading levels, no level jumps
- "Skip to content" as the first tab stop
- Full keyboard support with visible focus rings
- Skills disclosures and the mobile menu use real buttons with `aria-expanded` /
  `aria-controls`
- Form: labels, `aria-invalid`, inline `role="alert"` errors, focus moves to the
  first invalid field, results announced via `aria-live`
- Mobile menu locks background scroll and closes on `Escape`
- **`prefers-reduced-motion` respected throughout** — loops stop, reveals become
  opacity-only
- Decorative graphics are `aria-hidden`; the animated headline carries a plain
  `aria-label`

---

## SEO

- Static title, meta description, canonical, Open Graph, Twitter card and
  `ProfessionalService` JSON-LD (with a capability `OfferCatalog`) in `index.html`
- Per-route updates via `useDocumentMeta`
- `robots.txt`, `sitemap.xml`, favicon, apple-touch-icon, OG image, web manifest

> The OG image is an SVG placeholder — some platforms won't render SVG previews.
> Export a 1200×630 PNG before launch and update the `og:image` paths.

---

## Content policy

This site ships with **no fabricated credibility**, and that's worth keeping as
you fill it in:

- **No invented clients, logos or testimonials.**
- **No fake statistics or guaranteed results.** Capability copy describes process
  and deliverables.
- **Empty sections stay empty** rather than being padded with placeholder work.
  Each says plainly that nothing is published yet.
- **Experience entries are labelled templates** until you replace them.
- **The hero visualisation is labelled illustrative** — its sample values
  demonstrate the workflow and are not company statistics.

If you add real numbers, clients or credentials, make sure you can substantiate
them and have permission to publish the names.
