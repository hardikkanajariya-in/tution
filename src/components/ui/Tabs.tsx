'use client';

import { cn } from '@/lib/utils';
import { useState, type ReactNode } from 'react';

interface Tab {
  label: string;
  value: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
  defaultValue?: string;
}

export function Tabs({ tabs, className, defaultValue }: TabsProps) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value || '');

  return (
    <div className={cn('', className)}>
      <div className="flex gap-1 p-1 bg-surface-secondary dark:bg-surface-tertiary rounded-xl overflow-x-auto scrollbar-hide" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200',
              active === tab.value
                ? 'bg-surface-primary dark:bg-brand-200 text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {tabs.find((t) => t.value === active)?.content}
      </div>
    </div>
  );
}
