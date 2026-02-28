'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          // Base — Fitts's Law: large enough targets, clear affordance
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
          'transition-all duration-250 ease-out-expo',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          'active:scale-[0.97]',
          // Variants — 60-30-10 color rule (primary & gradient = accent 10%)
          {
            'bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-brand':
              variant === 'primary',
            'bg-surface-secondary text-text-primary hover:bg-surface-tertiary border border-transparent':
              variant === 'secondary',
            'border-2 border-brand-300 dark:border-brand-400 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-100':
              variant === 'outline',
            'text-text-secondary hover:text-text-primary hover:bg-surface-secondary':
              variant === 'ghost',
            'bg-gradient-brand text-white shadow-md hover:shadow-brand hover:brightness-110':
              variant === 'gradient',
          },
          // Sizes — min 44px touch target (WCAG 2.5.5)
          {
            'px-4 py-2 text-sm min-h-[36px]': size === 'sm',
            'px-5 py-2.5 text-sm min-h-[44px]': size === 'md',
            'px-8 py-4 text-base min-h-[52px]': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
