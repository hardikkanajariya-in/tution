'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import courses from '@/data/courses.json';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const sorted = [...courses].sort((a, b) => b.popularity - a.popularity);

const modeColor: Record<string, 'success' | 'brand' | 'warning'> = {
  online: 'success',
  offline: 'warning',
  hybrid: 'brand',
};

export function PopularCoursesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                Popular <span className="text-gradient">Courses</span>
              </h2>
              <p className="mt-2 text-text-secondary">
                Hand-picked by thousands of students.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" onClick={() => scroll('left')} aria-label="Scroll left">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => scroll('right')} aria-label="Scroll right">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Reveal>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
        >
          {sorted.map((course, i) => (
            <Reveal key={course.slug} delay={i * 0.05} direction="left">
              <Link href={`/courses/${course.slug}`} className="block">
                <Card
                  className="w-[300px] flex-shrink-0 snap-start hover:shadow-elevated transition-shadow group"
                >
                  {/* Thumbnail */}
                  <div className="h-40 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={modeColor[course.mode] ?? 'default'} size="sm">
                      {course.mode}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-text-primary group-hover:text-brand-500 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-1">{course.subtitle}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/5 flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-500">${course.price}</span>
                    <span className="text-xs text-text-muted">{course.duration}</span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
