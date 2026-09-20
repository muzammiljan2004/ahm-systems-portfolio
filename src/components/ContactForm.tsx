import { useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import {
  emptyEnquiry,
  submitEnquiry,
  validateEnquiry,
  type EnquiryPayload,
  type FieldErrors,
  type SubmitResult,
} from '@/services/contactService';
import { serviceEnquiryOptions, budgetRanges } from '@/data/skills';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------- field shell */

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, htmlFor, error, required, hint, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-muted">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[0.75rem] font-normal text-subtle">(optional)</span>
        )}
      </label>

      {children}

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="err"
            id={`${htmlFor}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-1.5 text-[0.75rem] text-danger"
          >
            <AlertCircle className="mt-[0.1rem] h-3 w-3 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        ) : hint ? (
          <p className="text-[0.75rem] text-subtle">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const controlClass =
  'w-full rounded-xl border bg-base/60 px-3.5 py-2.5 text-[0.875rem] text-ink placeholder:text-subtle/80 transition-all duration-300 focus:outline-none focus:ring-0';

function controlState(error?: string) {
  return error
    ? 'border-danger/50 focus:border-danger'
    : 'border-line hover:border-line-strong focus:border-primary/60 focus:shadow-[0_0_0_3px_rgb(var(--c-primary)/0.12)]';
}

/* ------------------------------------------------------------------- form */

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<EnquiryPayload>(emptyEnquiry);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const firstErrorRef = useRef<string | null>(null);

  const update = <K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    const found = validateEnquiry(values);
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      firstErrorRef.current = firstKey;
      document.getElementById(`${id}-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    const response = await submitEnquiry(values);
    setSubmitting(false);
    setResult(response);

    if (response.status === 'sent') setValues(emptyEnquiry);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${id}-status`}
      className="flex flex-col gap-5"
    >
      {/* Honeypot — hidden from users, catches naive bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website (leave blank)</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${id}-name`} error={errors.name} required>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={cn(controlClass, controlState(errors.name))}
          />
        </Field>

        <Field label="Company" htmlFor={`${id}-company`}>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            value={values.company}
            onChange={(event) => update('company', event.target.value)}
            className={cn(controlClass, controlState())}
          />
        </Field>

        <Field label="Email" htmlFor={`${id}-email`} error={errors.email} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
            className={cn(controlClass, controlState(errors.email))}
          />
        </Field>

        <Field label="Phone" htmlFor={`${id}-phone`} error={errors.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+00 000 000 0000"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            className={cn(controlClass, controlState(errors.phone))}
          />
        </Field>

        <Field
          label="What do you need help with?"
          htmlFor={`${id}-service`}
          error={errors.service}
          required
        >
          <select
            id={`${id}-service`}
            name="service"
            value={values.service}
            onChange={(event) => update('service', event.target.value as EnquiryPayload['service'])}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
            className={cn(controlClass, controlState(errors.service), 'appearance-none pr-9')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%237C859C' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.9rem center',
            }}
          >
            <option value="">Select a service…</option>
            {serviceEnquiryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget range" htmlFor={`${id}-budget`} hint="Helps us scope realistically.">
          <select
            id={`${id}-budget`}
            name="budget"
            value={values.budget}
            onChange={(event) => update('budget', event.target.value as EnquiryPayload['budget'])}
            className={cn(controlClass, controlState(), 'appearance-none pr-9')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%237C859C' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.9rem center',
            }}
          >
            <option value="">Prefer not to say</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Message"
        htmlFor={`${id}-message`}
        error={errors.message}
        required
        hint={`${values.message.length}/2000 characters`}
      >
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          maxLength={2000}
          placeholder="What are you trying to achieve, and where are you stuck?"
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(controlClass, controlState(errors.message), 'resize-y min-h-[7rem]')}
        />
      </Field>

      {/* Submit */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            'group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-7 text-[0.9375rem] font-medium text-white',
            'shadow-[0_10px_40px_-14px_rgb(var(--c-primary)/0.9)] transition-all duration-300',
            'hover:bg-primary/90 hover:shadow-[0_14px_44px_-14px_rgb(var(--c-primary)/1)] active:scale-[0.98]',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-full"
          />
          {submitting ? (
            <Loader2 className="relative h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          )}
          <span className="relative">{submitting ? 'Sending…' : siteConfig.cta.form}</span>
        </button>

        <p className="text-[0.75rem] leading-relaxed text-subtle">
          We use your details only to reply to this enquiry.
        </p>
      </div>

      {/* Live status region */}
      <div id={`${id}-status`} aria-live="polite" className="min-h-0">
        <AnimatePresence>
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className={cn(
                'flex items-start gap-2.5 rounded-2xl border px-4 py-3.5 text-[0.8125rem] leading-relaxed',
                result.status === 'sent' && 'border-success/30 bg-success/[0.08] text-success',
                result.status === 'preview' && 'border-cyan/30 bg-cyan/[0.07] text-cyan',
                result.status === 'error' && 'border-danger/30 bg-danger/[0.08] text-danger',
              )}
            >
              {result.status === 'sent' ? (
                <CheckCircle2 className="mt-[0.1rem] h-4 w-4 shrink-0" aria-hidden="true" />
              ) : result.status === 'preview' ? (
                <Info className="mt-[0.1rem] h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="mt-[0.1rem] h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>{result.message}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
