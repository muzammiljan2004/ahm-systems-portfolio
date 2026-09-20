import { siteConfig } from '@/config/siteConfig';
import type { BudgetRange, ServiceEnquiry } from '@/data/skills';

/* ============================================================================
 * CONTACT SERVICE LAYER
 * ----------------------------------------------------------------------------
 * The form never talks to the network directly — it calls `submitEnquiry`.
 * That keeps the UI unaware of where enquiries go, so you can point this at a
 * real backend without touching a component.
 *
 * Currently wired to FormSubmit, which emails every enquiry to
 * siteConfig.contact.email. FormSubmit sends a one-time activation link to
 * that inbox on the first submission — click it or nothing gets delivered.
 * Set `formEndpoint` to null to fall back to "preview mode" (validates, sends
 * nothing).
 *
 * TO CONNECT IT
 * -------------
 * 1. Hosted form service (quickest — Formspree, Basin, Web3Forms, …):
 *      siteConfig.contact.formEndpoint = 'https://formspree.io/f/XXXXXXX';
 *    The default JSON POST below already matches what these expect.
 *
 * 2. Your own API:
 *      siteConfig.contact.formEndpoint = 'https://api.example.com/enquiries';
 *    Adjust `buildRequest` if your endpoint wants a different payload shape.
 *
 * 3. A serverless function on the same deployment (recommended on Vercel):
 *      create /api/contact.ts, then set formEndpoint = '/api/contact'.
 *      Keep API keys server-side — never in this file, it ships to the browser.
 * ==========================================================================*/

export interface EnquiryPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceEnquiry | '';
  budget: BudgetRange | '';
  message: string;
  /** Anti-spam honeypot; must be empty. Never shown to real users. */
  website?: string;
}

export type SubmitStatus = 'sent' | 'preview' | 'error';

export interface SubmitResult {
  status: SubmitStatus;
  message: string;
}

/** Shapes the outgoing request. Adapt here if your API expects other keys. */
function buildRequest(payload: EnquiryPayload): RequestInit {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      budget: payload.budget,
      message: payload.message,
      // Useful context for whoever picks the enquiry up.
      submittedAt: new Date().toISOString(),
      // FormSubmit settings (ignored by other endpoints).
      _subject: `New enquiry via ${siteConfig.brand.name}${payload.name ? ` — ${payload.name}` : ''}`,
      _template: 'table',
      _captcha: 'false',
    }),
  };
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitResult> {
  // Honeypot: a bot filled the hidden field. Report success, send nothing.
  if (payload.website) {
    return { status: 'sent', message: 'Thanks — your enquiry has been received.' };
  }

  const endpoint = siteConfig.contact.formEndpoint;

  if (!endpoint) {
    // Preview mode. Be explicit rather than faking a successful send.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[contact] preview mode — payload that would be sent:', payload);
    }
    return {
      status: 'preview',
      message:
        'Your details passed validation, but no form endpoint is connected yet, so nothing was sent. ' +
        `Please email ${siteConfig.contact.email} directly — or connect an endpoint in src/config/siteConfig.ts.`,
    };
  }

  try {
    const response = await fetch(endpoint, buildRequest(payload));

    if (!response.ok) {
      return {
        status: 'error',
        message: `We couldn't send that (server responded ${response.status}). Please try again, or email ${siteConfig.contact.email}.`,
      };
    }

    return {
      status: 'sent',
      message: `Thanks — your enquiry is with us. ${siteConfig.contact.responseTime}.`,
    };
  } catch {
    return {
      status: 'error',
      message: `We couldn't reach the server. Please check your connection or email ${siteConfig.contact.email}.`,
    };
  }
}

/* -------------------------------------------------------------- validation */

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

/**
 * Deliberately permissive where it should be (international phone formats,
 * company names) and strict only where a mistake costs us the reply.
 */
export function validateEnquiry(payload: EnquiryPayload): FieldErrors {
  const errors: FieldErrors = {};

  const name = payload.name.trim();
  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length < 2) errors.name = 'That looks too short — please enter your full name.';

  const email = payload.email.trim();
  if (!email) {
    errors.email = 'We need an email address to reply to.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Please check that email address — it doesn’t look complete.';
  }

  const phone = payload.phone.trim();
  // Phone is optional, but if given it should be plausible.
  if (phone && !/^[+()\-.\s\d]{6,24}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number, or leave this blank.';
  }

  if (!payload.service) errors.service = 'Choose the area you need help with.';

  const message = payload.message.trim();
  if (!message) {
    errors.message = 'A sentence or two about what you need is enough.';
  } else if (message.length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).';
  } else if (message.length > 2000) {
    errors.message = 'Please keep this under 2,000 characters.';
  }

  return errors;
}

export const emptyEnquiry: EnquiryPayload = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
  website: '',
};
