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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="mt-3 text-text-secondary">
              Got questions? We&apos;ve got answers.
            </p>
          </div>
        </Reveal>

        {/* Topic tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {groups.map((group, i) => (
              <button
                key={group.topic}
                onClick={() => setActiveGroup(i)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
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
