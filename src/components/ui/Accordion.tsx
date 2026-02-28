'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('space-y-3', className)} role="region">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headingId = `accordion-heading-${index}`;
        const panelId = `accordion-panel-${index}`;
        return (
          <div
            key={index}
            className="rounded-xl border border-gray-100 dark:border-white/5 bg-surface-primary dark:bg-surface-secondary overflow-hidden transition-shadow duration-250 ease-out-expo hover:shadow-soft"
          >
            <button
              id={headingId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex items-center justify-between w-full p-5 md:p-6 text-left hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors duration-200 min-h-[52px]"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="font-medium text-text-primary pr-4">{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-text-muted shrink-0 transition-transform duration-250 ease-out-expo',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-text-secondary leading-relaxed text-[0.95rem]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
