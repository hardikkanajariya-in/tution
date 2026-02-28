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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
              Why <span className="text-gradient">PrismTutor</span>?
            </h2>
            <p className="mt-4 text-text-secondary">
              Six pillars that make our learning experience truly exceptional.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Layers;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <Card glass className="h-full group hover:shadow-elevated transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
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
