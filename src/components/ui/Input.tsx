'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full rounded-xl border bg-surface-primary dark:bg-surface-secondary px-4 py-3 text-sm min-h-[44px]',
            'text-text-primary placeholder:text-text-muted',
            'transition-all duration-200 ease-out-expo',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
            'hover:border-brand-300 dark:hover:border-brand-400',
            error
              ? 'border-red-400 dark:border-red-500'
              : 'border-gray-200 dark:border-white/10',
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-xs text-red-500 flex items-center gap-1" role="alert">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full rounded-xl border bg-surface-primary dark:bg-surface-secondary px-4 py-3 text-sm',
            'text-text-primary placeholder:text-text-muted min-h-[120px] resize-y',
            'transition-all duration-200 ease-out-expo',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
            'hover:border-brand-300 dark:hover:border-brand-400',
            error
              ? 'border-red-400 dark:border-red-500'
              : 'border-gray-200 dark:border-white/10',
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-xs text-red-500 flex items-center gap-1" role="alert">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

export { Input, TextArea };
