'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'brand' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        {
          'bg-surface-tertiary text-text-secondary': variant === 'default',
          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': variant === 'success',
          'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400': variant === 'warning',
          'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400': variant === 'brand',
          'border border-brand-300 dark:border-brand-600 text-brand-600 dark:text-brand-400': variant === 'outline',
        },
        {
          'px-2.5 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
