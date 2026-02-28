'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  tilt?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, glass, tilt, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-250 ease-out-expo',
        glass
          ? 'glass shadow-glass'
          : 'bg-surface-primary dark:bg-surface-secondary shadow-soft border border-gray-100 dark:border-white/5',
        tilt && 'tilt-card perspective-container',
        hover && 'card-interactive cursor-pointer',
        {
          'p-0': padding === 'none',
          'p-4 sm:p-5': padding === 'sm',
          'p-5 sm:p-6': padding === 'md',
          'p-6 sm:p-8': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
