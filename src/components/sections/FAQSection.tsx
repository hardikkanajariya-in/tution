'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import faqsData from '@/data/faqs.json';

export function FAQSection() {
  const { groups } = faqsData;
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section className="section-padding" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="section-heading">
            <h2 className="text-balance">
              Frequently Asked <span className="text-brand-600 dark:text-brand-400">Questions</span>
            </h2>
            <p>
              Got questions? We&apos;ve got answers.
            </p>
          </div>
        </Reveal>

        {/* Topic tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="FAQ topics">
            {groups.map((group, i) => (
              <button
                key={group.topic}
                role="tab"
                aria-selected={activeGroup === i}
                onClick={() => setActiveGroup(i)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 ease-out',
                  activeGroup === i
                    ? 'bg-brand-500 text-white shadow-brand'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
                )}
              >
                {group.topic}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <Accordion items={groups[activeGroup].items} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
