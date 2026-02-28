'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import testimonials from '@/data/testimonials.json';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const t = testimonials[active];

  return (
    <section className="section-padding" aria-label="Student testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="section-heading">
            <h2 className="text-balance">
              What Students <span className="text-brand-600 dark:text-brand-400">Say</span>
            </h2>
            <p>
              Hear from the learners who transformed their journey with us.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative max-w-3xl mx-auto" role="region" aria-label="Testimonials" aria-roledescription="carousel">
            <Card glass padding="lg" className="text-center">
              <Quote className="w-10 h-10 mx-auto text-brand-300 mb-4" aria-hidden="true" />

              <p className="text-lg md:text-xl text-text-primary leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < t.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300 dark:text-gray-600'
                    )}
                  />
                ))}
              </div>

              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover mx-auto mt-4"
                loading="lazy"
              />
              <p className="mt-3 font-bold text-text-primary">{t.name}</p>
              <p className="text-sm text-text-secondary">{t.role}</p>
              <p className="text-xs text-text-muted mt-1">{t.course}</p>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="sm" onClick={prev} aria-label="Previous testimonial">
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2" role="tablist">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all duration-250 ease-out',
                      i === active
                        ? 'bg-brand-500 w-6'
                        : 'bg-brand-200 dark:bg-brand-300 hover:bg-brand-300'
                    )}
                  />
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={next} aria-label="Next testimonial">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
