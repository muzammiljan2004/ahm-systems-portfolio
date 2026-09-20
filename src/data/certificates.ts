/* ============================================================================
 * CERTIFICATES
 * ----------------------------------------------------------------------------
 * The Certificates section shows a placeholder while this array has no entries
 * and switches to the grid as soon as one is added.
 *
 * TO ADD A CERTIFICATE:
 *
 *   {
 *     id: 'google-analytics',
 *     title: 'Google Analytics Certification',
 *     issuer: 'Google',
 *     issued: 'Mar 2026',
 *     credentialId: 'ABC-12345',       // omit if there isn't one
 *     credentialUrl: 'https://…',      // the public verification link
 *   }
 *
 * ⚠️ Only list certifications actually held. A credential link is checkable,
 * and an unverifiable claim costs more trust than an empty section does.
 *
 * `credentialUrl` here points at the scanned certificate in /public/docs —
 * swap for an issuer verification URL if one ever exists.
 * ==========================================================================*/

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** e.g. "Mar 2026" */
  issued: string;
  /** Optional expiry, e.g. "Mar 2029". */
  expires?: string | null;
  credentialId?: string | null;
  /** Public verification URL, or null. */
  credentialUrl?: string | null;
}

export const certificates: Certificate[] = [
  {
    id: 'techxserve-internship-muzammil',
    title: 'Certificate of Internship — Muzammil Ahmed',
    issuer: 'TechxServe',
    issued: 'Aug 2026',
    expires: null,
    credentialId: null,
    credentialUrl: '/docs/techxserve-internship-muzammil-ahmed.pdf',
  },
  {
    id: 'techxserve-internship-hasnat',
    title: 'Certificate of Internship — Hasnat Ali Shah',
    issuer: 'TechxServe',
    issued: 'Aug 2026',
    expires: null,
    credentialId: null,
    credentialUrl: '/docs/techxserve-internship-hasnat-ali-shah.pdf',
  },
  {
    id: 'sgpa-muzammil',
    title: 'Certificate of Highest SGPA (3.61 / 4.0) — 2nd Semester',
    issuer: 'Air University, Islamabad',
    issued: '2024',
    expires: null,
    credentialId: null,
    credentialUrl: null,
  },
  {
    id: 'sgpa-hasnat-s2',
    title: 'Certificate of Achievement — SGPA 3.43, 2nd Semester',
    issuer: 'Air University, Islamabad',
    issued: '2024',
    expires: null,
    credentialId: null,
    credentialUrl: null,
  },
  {
    id: 'sgpa-hasnat-s4',
    title: 'Certificate of Achievement — SGPA 3.35, 4th Semester',
    issuer: 'Air University, Islamabad',
    issued: '2025',
    expires: null,
    credentialId: null,
    credentialUrl: null,
  },
];
