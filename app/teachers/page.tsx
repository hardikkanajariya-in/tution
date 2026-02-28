'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Users, Award, BookOpen, X } from 'lucide-react';
import { Button, Card, Badge, Input, Reveal } from '@/components/ui';
import { cn, getInitials } from '@/lib/utils';
import teachersData from '@/data/teachers.json';

/* ─── Gradient palette for avatar placeholders ──────────────── */
const GRADIENTS = [
  'from-brand-500 to-amber-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-yellow-400',
  'from-red-500 to-rose-500',
];

export default function TeachersPage() {
  /* ─── State ─────────────────────────────────────── */
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  /* ─── Debounced search ──────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ─── Derived: all unique subjects ──────────────── */
  const allSubjects = useMemo(() => {
    const set = new Set<string>();
    teachersData.forEach((t) => t.specialties.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, []);

  /* ─── Filtered teachers ─────────────────────────── */
  const filtered = useMemo(() => {
    let list = [...teachersData];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedSubject) {
      list = list.filter((t) => t.specialties.includes(selectedSubject));
    }

    return list;
  }, [searchQuery, selectedSubject]);

  /* ─── Aggregate stats ───────────────────────────── */
  const stats = useMemo(() => {
    const total = teachersData.length;
    const avgRating =
      teachersData.reduce((sum, t) => sum + t.rating, 0) / total;
    const totalStudents = teachersData.reduce(
      (sum, t) => sum + t.studentCount,
      0
    );
    return { total, avgRating: avgRating.toFixed(1), totalStudents };
  }, []);

  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedSubject(null);
  };

  const hasFilters = searchQuery || selectedSubject;

  return (
    <main className="min-h-screen pb-24">
      {/* ─── Page Header ────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32" aria-label="Teachers overview">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/60 via-transparent to-amber-50/40 dark:from-brand-950/30 dark:to-amber-950/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="brand" size="md" className="mb-4">
                <Award className="mr-1.5 h-3.5 w-3.5" /> Meet the Team
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl text-balance">
                Our Expert Instructors
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Learn from passionate educators with proven track records.
                Our hand-picked instructors bring real-world expertise and
                innovative teaching methods to every classroom.
              </p>
            </div>
          </Reveal>

          {/* ─── Stats Banner ───────────────────────── */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4">
              {[
                {
                  icon: Users,
                  value: stats.total,
                  label: 'Expert Teachers',
                },
                {
                  icon: Star,
                  value: stats.avgRating,
                  label: 'Avg. Rating',
                },
                {
                  icon: BookOpen,
                  value: stats.totalStudents.toLocaleString() + '+',
                  label: 'Students Taught',
                },
              ].map((s) => (
                <Card
                  key={s.label}
                  glass
                  className="flex flex-col items-center gap-1 py-5 text-center"
                >
                  <s.icon className="mb-1 h-5 w-5 text-brand-500" />
                  <span className="text-2xl font-bold text-text-primary">
                    {s.value}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {s.label}
                  </span>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Filters ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Filter teachers">
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or subject…"
                className="pl-10"
              />
            </div>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>

          {/* Subject chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {allSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() =>
                  setSelectedSubject(
                    selectedSubject === subject ? null : subject
                  )
                }
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                  selectedSubject === subject
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                )}
              >
                {subject}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ─── Results count ──────────────────────── */}
        <p className="mt-6 text-sm text-text-muted">
          Showing{' '}
          <span className="font-semibold text-text-primary">
            {filtered.length}
          </span>{' '}
          instructor{filtered.length !== 1 && 's'}
        </p>

        {/* ─── Teacher Grid ─────────────────────────── */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((teacher, idx) => (
              <motion.div
                key={teacher.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="group flex h-full flex-col card-interactive">
                  {/* Avatar + basic info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="h-16 w-16 shrink-0 rounded-full object-cover shadow-md"
                      loading="lazy"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-semibold text-text-primary group-hover:text-brand-600 transition-colors">
                        {teacher.name}
                      </h3>
                      <p className="truncate text-sm text-text-secondary">
                        {teacher.title}
                      </p>

                      {/* Rating */}
                      <div className="mt-1 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              i < Math.round(teacher.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                            )}
                          />
                        ))}
                        <span className="ml-1 text-xs font-medium text-text-secondary">
                          {teacher.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-brand-500" />
                      {teacher.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-brand-500" />
                      {teacher.studentCount.toLocaleString()} students
                    </span>
                  </div>

                  {/* Subject badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {teacher.specialties.slice(0, 3).map((s) => (
                      <Badge key={s} variant="outline" size="sm">
                        {s}
                      </Badge>
                    ))}
                    {teacher.specialties.length > 3 && (
                      <Badge variant="default" size="sm">
                        +{teacher.specialties.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-5">
                    <Link href={`/teachers/${teacher.slug}`} className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ─── Empty state ──────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-16 max-w-sm text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary">
              <Search className="h-7 w-7 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              No instructors found
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </section>
    </main>
  );
}
