import { MessageCircle, PhoneCall } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/lib/utils';

/** wa.me and tel: both want digits only; wa.me additionally wants no '+'. */
const digits = (number: string) => number.replace(/\D/g, '');

const waHref = (number: string) =>
  `https://wa.me/${digits(number)}?text=${encodeURIComponent(
    `Hi ${siteConfig.brand.name}, I'd like to talk about a project.`,
  )}`;

interface PhoneActionsProps {
  number: string;
  /** Smaller type for the secondary numbers. */
  muted?: boolean;
  className?: string;
}

/**
 * A number with an explicit choice of action. Tapping the number itself used
 * to drop straight into the dialer, which is the wrong default when most
 * people would rather send a WhatsApp message.
 */
export function PhoneActions({ number, muted = false, className }: PhoneActionsProps) {
  const chip =
    'inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[0.6875rem] font-medium text-muted transition-colors hover:border-primary/40 hover:text-ink';

  return (
    <span className={cn('flex flex-wrap items-center gap-x-2 gap-y-1.5', className)}>
      <span className={muted ? 'text-[0.8125rem] text-subtle' : undefined}>{number}</span>
      <a href={`tel:+${digits(number)}`} className={chip}>
        <PhoneCall className="h-3 w-3" aria-hidden="true" />
        Call
        <span className="sr-only"> {number}</span>
      </a>
      <a href={waHref(number)} target="_blank" rel="noopener noreferrer" className={chip}>
        <MessageCircle className="h-3 w-3" aria-hidden="true" />
        WhatsApp
        <span className="sr-only"> {number}</span>
      </a>
    </span>
  );
}
