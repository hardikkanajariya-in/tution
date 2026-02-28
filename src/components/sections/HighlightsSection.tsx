'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import homeData from '@/data/home.json';
import {
  Layers, Route, Users, Video, Target, Clock,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Layers, Route, Users, Video, Target, Clock,
};

export function HighlightsSection() {
  const { highlights } = homeData;

  return (
    <section className="section-padding" aria-label="Why PrismTutor">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="section-heading">
            <h2 className="text-balance">
              Why <span className="text-brand-600 dark:text-brand-400">PrismTutor</span>?
            </h2>
            <p>
              Six pillars that make our learning experience truly exceptional.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Layers;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <Card glass className="h-full group card-interactive">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 dark:bg-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-250 ease-out">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
