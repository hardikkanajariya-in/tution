'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import resultsData from '@/data/results.json';
import { TrendingUp } from 'lucide-react';

export function ResultsPreviewSection() {
  const { stories, overallStats } = resultsData;

  return (
    <section className="section-padding bg-surface-secondary" aria-label="Proven results">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="section-heading">
            <h2 className="text-balance">
              Proven <span className="text-brand-600 dark:text-brand-400">Results</span>
            </h2>
            <p>
              Real students. Real transformations. See the numbers.
            </p>
          </div>
        </Reveal>

        {/* Overall stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {overallStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <Card glass className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Bar chart – before / after */}
        <Reveal delay={0.15}>
          <Card className="overflow-x-auto">
            <h3 className="font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-500" aria-hidden="true" />
              Score Improvements
            </h3>

            <div className="space-y-6" role="list" aria-label="Score improvements">
              {stories.map((s) => {
                const max = Math.max(s.beforeScore, s.afterScore, 100);
                const beforePct = Math.round((s.beforeScore / max) * 100);
                const afterPct = Math.round((s.afterScore / max) * 100);

                return (
                  <div key={s.id} role="listitem">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">
                        {s.studentName} — {s.exam}
                      </span>
                      <span className="text-xs text-text-muted">{s.rank}</span>
                    </div>

                    {/* Before bar */}
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-text-muted w-14 shrink-0">Before</span>
                      <div className="flex-1 h-4 rounded-full bg-surface-tertiary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-200 dark:bg-brand-300 transition-all duration-700"
                          style={{ width: `${beforePct}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-secondary w-12 text-right">
                        {s.beforeScore}
                      </span>
                    </div>

                    {/* After bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-muted w-14 shrink-0">After</span>
                      <div className="flex-1 h-4 rounded-full bg-surface-tertiary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-500 transition-all duration-700"
                          style={{ width: `${afterPct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-brand-500 w-12 text-right">
                        {s.afterScore}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
