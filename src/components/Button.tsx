import { forwardRef, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tap-highlight-none transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-[0_10px_40px_-14px_rgb(var(--c-primary)/0.9)] hover:bg-primary/90',
  secondary:
    'glass text-ink hover:border-primary/40 hover:bg-primary/10',
  outline:
    'border border-line-strong bg-transparent text-ink hover:border-primary/50 hover:bg-primary/5',
  ghost: 'bg-transparent text-muted hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders a right-hand arrow that slides on hover. */
  withArrow?: boolean;
  /** Leading icon. */
  icon?: LucideIcon;
  /** Cursor-follow tilt/pull. Disabled automatically for reduced motion. */
  magnetic?: boolean;
  'aria-label'?: string;
}

type ButtonAsButton = CommonProps & {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

type ButtonAsAnchor = CommonProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type ButtonAsLink = CommonProps & {
  as: 'link';
  to: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

/**
 * One button component for the whole site: magnetic pull, a light sweep on
 * hover, and an arrow that advances. Renders as <button>, <a> or react-router
 * <Link> depending on `as`.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, _ref) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    icon: Icon,
    magnetic = true,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const prefersReduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 260, damping: 20, mass: 0.4 });
  const x = useTransform(sx, (v) => v * 0.16);
  const y = useTransform(sy, (v) => v * 0.16);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!magnetic || prefersReduced) return;
    const el = hostRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(event.clientX - (rect.left + rect.width / 2));
    my.set(event.clientY - (rect.top + rect.height / 2));
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const content = (
    <>
      {/* Light sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-full"
      />
      {Icon ? <Icon className="relative h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span className="relative">{children}</span>
      {withArrow ? (
        <ArrowRight
          className="relative h-4 w-4 shrink-0 transition-transform duration-300 ease-expo group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);
  const motionProps = {
    style: prefersReduced ? undefined : { x, y },
    whileHover: prefersReduced ? undefined : { scale: 1.03 },
    whileTap: prefersReduced ? undefined : { scale: 0.97 },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  };

  if (rest.as === 'a') {
    const { as: _as, href, target, rel, onClick, ...anchorRest } = rest as Record<string, never> & {
      as: 'a';
      href: string;
      target?: string;
      rel?: string;
      onClick?: () => void;
    };
    return (
      <motion.a
        ref={(node) => {
          hostRef.current = node;
        }}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noreferrer noopener' : undefined)}
        onClick={onClick}
        className={classes}
        {...motionProps}
        {...anchorRest}
      >
        {content}
      </motion.a>
    );
  }

  if (rest.as === 'link') {
    const { as: _as, to, onClick, ...linkRest } = rest as Record<string, never> & {
      as: 'link';
      to: string;
      onClick?: () => void;
    };
    return (
      <motion.span
        className="inline-flex"
        {...motionProps}
        ref={(node) => {
          hostRef.current = node;
        }}
      >
        <Link to={to} onClick={onClick} className={classes} {...linkRest}>
          {content}
        </Link>
      </motion.span>
    );
  }

  const { as: _as, type = 'button', onClick, disabled, ...buttonRest } = rest as Record<
    string,
    never
  > & {
    as?: 'button';
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
  };

  return (
    <motion.button
      ref={(node) => {
        hostRef.current = node;
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...buttonRest}
    >
      {content}
    </motion.button>
  );
});
