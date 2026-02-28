'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  tilt?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, glass, tilt, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        glass
          ? 'glass shadow-glass'
          : 'bg-surface-primary dark:bg-surface-secondary shadow-soft border border-white/10 dark:border-white/5',
        tilt && 'tilt-card perspective-container',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
