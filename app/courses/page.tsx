'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Star, Clock, X, GitCompare, Filter, SlidersHorizontal,
} from 'lucide-react';
import { Button, Card, Badge, Modal, Input, Reveal, useToast } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';
import { ITEMS_PER_PAGE, MAX_COMPARE } from '@/lib/constants';
import courses from '@/data/courses.json';
import subjects from '@/data/subjects.json';

// Metadata will be in a layout file

type SortKey = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
type ViewMode = 'grid' | 'list';
type CourseMode = 'all' | 'online' | 'offline' | 'hybrid';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const MODE_OPTIONS: { value: CourseMode; label: string }[] = [
  { value: 'all', label: 'All Modes' },
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'hybrid', label: 'Hybrid' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Mathematics: 'bg-blue-500',
  Physics: 'bg-orange-500',
  Chemistry: 'bg-emerald-500',
  Biology: 'bg-lime-500',
  English: 'bg-pink-500',
  'Computer Science': 'bg-violet-500',
  Commerce: 'bg-amber-500',
};

export default function CoursesPage() {
  const { addToast } = useToast();

  // ─── State ────────────────────────────────────────
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [modeFilter, setModeFilter] = useState<CourseMode>('all');
  const [sortBy, setSortBy] = useState<SortKey>('popular');
  const [view, setView] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  // ─── Debounced search ─────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [searchQuery, selectedCategory, selectedGrade, modeFilter, sortBy]);

  // ─── Derived data ─────────────────────────────────
  const categories = subjects.categories;
  const gradeLevels = subjects.gradeLevels;

  const filtered = useMemo(() => {
    let list = [...courses];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) list = list.filter((c) => c.category === selectedCategory);
    if (selectedGrade) list = list.filter((c) => c.gradeLevel === selectedGrade);
    if (modeFilter !== 'all') list = list.filter((c) => c.mode === modeFilter);

    switch (sortBy) {
      case 'popular':   list.sort((a, b) => b.popularity - a.popularity); break;
      case 'newest':    list.sort((a, b) => a.slug.localeCompare(b.slug)); break;
      case 'price-low': list.sort((a, b) => a.price - b.price); break;
      case 'price-high':list.sort((a, b) => b.price - a.price); break;
      case 'rating':    list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [searchQuery, selectedCategory, selectedGrade, modeFilter, sortBy]);

  const visible = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visible.length < filtered.length;
  const hasFilters = !!searchQuery || !!selectedCategory || !!selectedGrade || modeFilter !== 'all';

  // ─── Compare helpers ──────────────────────────────
  const toggleCompare = (slug: string) => {
    setCompareList((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) {
        addToast(`You can compare up to ${MAX_COMPARE} courses`, 'error');
        return prev;
      }
      return [...prev, slug];
    });
  };

  const clearFilters = () => {
    setSearchInput('');
    setSelectedCategory(null);
    setSelectedGrade(null);
    setModeFilter('all');
    setSortBy('popular');
  };

  const comparedCourses = courses.filter((c) => compareList.includes(c.slug));

  // ─── Mode badge variant ───────────────────────────
  const modeBadgeVariant = (mode: string) => {
    if (mode === 'online') return 'success';
    if (mode === 'offline') return 'warning';
    return 'brand';
  };

  // ─── Render ───────────────────────────────────────
  return (
    <main className="min-h-screen bg-surface-primary">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-600 dark:bg-brand-700 py-20 md:py-28 lg:py-32" aria-label="Courses overview">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Our Courses</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover expert-led courses designed to help you excel in academics and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* ─── Search + Sort + View Toggle ──────────── */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
            <Input
              placeholder="Search courses, subjects, tags…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className={cn(
                  'appearance-none pl-9 pr-8 py-2.5 rounded-xl border text-sm bg-surface-primary dark:bg-surface-secondary',
                  'border-gray-200 dark:border-white/10 text-text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-brand-500'
                )}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="flex rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={cn(
                  'p-2.5 transition-colors',
                  view === 'grid'
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-primary dark:bg-surface-secondary text-text-muted hover:text-text-primary'
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  'p-2.5 transition-colors',
                  view === 'list'
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-primary dark:bg-surface-secondary text-text-muted hover:text-text-primary'
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Filters ─────────────────────────────── */}
        <div className="space-y-4 mb-10">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-text-muted mr-1" aria-hidden="true" />
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                  selectedCategory === cat.name
                    ? 'bg-brand-500 text-white border-brand-500 shadow-brand'
                    : 'bg-surface-secondary dark:bg-surface-tertiary text-text-secondary border-transparent hover:border-brand-300'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grade pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-text-muted mr-1 uppercase tracking-wider">Grade</span>
            {gradeLevels.map((g) => (
              <button
                key={g.slug}
                onClick={() => setSelectedGrade(selectedGrade === g.label ? null : g.label)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border',
                  selectedGrade === g.label
                    ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-brand-300 dark:border-brand-600'
                    : 'bg-surface-secondary dark:bg-surface-tertiary text-text-secondary border-transparent hover:border-brand-200'
                )}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Mode filter + Clear */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-text-muted mr-1 uppercase tracking-wider">Mode</span>
            {MODE_OPTIONS.map((m) => (
              <button
                key={m.value}
                onClick={() => setModeFilter(m.value)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border',
                  modeFilter === m.value
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-surface-secondary dark:bg-surface-tertiary text-text-secondary border-transparent hover:border-brand-200'
                )}
              >
                {m.label}
              </button>
            ))}

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-xs">
                <X className="h-3 w-3 mr-1" /> Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* ─── Results count ───────────────────────── */}
        <p className="text-sm text-text-muted mb-6">
          Showing {visible.length} of {filtered.length} course{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* ─── Empty state ─────────────────────────── */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-secondary dark:bg-surface-tertiary mb-4">
              <Search className="h-7 w-7 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No courses found</h3>
            <p className="text-text-muted mb-6">Try adjusting your search or filters.</p>
            <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}

        {/* ─── Course cards ────────────────────────── */}
        <div className={cn(
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-5'
        )}>
          <AnimatePresence mode="popLayout">
            {visible.map((course) => {
              const isCompared = compareList.includes(course.slug);
              return (
                <motion.div
                  key={course.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    padding="none"
                    className={cn(
                      'group card-interactive duration-250 ease-out-expo overflow-hidden',
                      view === 'list' && 'md:flex md:flex-row'
                    )}
                  >
                    {/* Thumbnail */}
                    <div
                      className={cn(
                        'relative overflow-hidden',
                        view === 'grid' ? 'h-44' : 'h-44 md:h-auto md:w-56 shrink-0',
                      )}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <Badge variant={modeBadgeVariant(course.mode)} size="sm">
                          {course.mode}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Badge variant="outline" size="sm">{course.category}</Badge>
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-medium shrink-0">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {course.rating}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-text-primary mt-2 group-hover:text-brand-500 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-1 line-clamp-2">{course.subtitle}</p>

                      <div className="flex items-center gap-3 mt-3 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {course.duration}
                        </span>
                        <span className="text-text-muted">·</span>
                        <span>{course.gradeLevel}</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 dark:border-white/5">
                        <span className="text-xl font-bold text-brand-500">
                          {formatPrice(course.price)}
                          <span className="text-xs text-text-muted font-normal">/course</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCompare(course.slug)}
                            className={cn(
                              'p-2 rounded-lg transition-colors',
                              isCompared
                                ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-500'
                                : 'hover:bg-surface-secondary dark:hover:bg-surface-tertiary text-text-muted'
                            )}
                            aria-label={isCompared ? 'Remove from compare' : 'Add to compare'}
                            title={isCompared ? 'Remove from compare' : 'Add to compare'}
                          >
                            <GitCompare className="h-4 w-4" />
                          </button>
                          <Link
                            href={`/courses/${course.slug}`}
                            className={cn(
                              'inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all',
                              'bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-brand'
                            )}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ─── Load More ───────────────────────────── */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>
              Load More Courses
            </Button>
          </div>
        )}
      </div>

      {/* ─── Compare Drawer ──────────────────────── */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed bottom-0 inset-x-0 z-50',
              'bg-surface-primary dark:bg-surface-secondary border-t border-white/10 dark:border-white/5',
              'shadow-elevated backdrop-blur-xl'
            )}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <GitCompare className="h-5 w-5 text-brand-500 shrink-0" />
                <div className="flex flex-wrap gap-2 min-w-0">
                  {comparedCourses.map((c) => (
                    <span
                      key={c.slug}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium"
                    >
                      {c.title}
                      <button
                        onClick={() => toggleCompare(c.slug)}
                        className="hover:text-brand-800 dark:hover:text-brand-200 transition-colors"
                        aria-label={`Remove ${c.title} from compare`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <span className="text-xs text-text-muted shrink-0">
                  {compareList.length}/{MAX_COMPARE}
                </span>
              </div>
              <Button
                variant="gradient"
                size="sm"
                onClick={() => setCompareOpen(true)}
                disabled={compareList.length < 2}
              >
                Compare Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Comparison Modal ────────────────────── */}
      <Modal isOpen={compareOpen} onClose={() => setCompareOpen(false)} title="Course Comparison" size="xl">
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 dark:border-white/5">
                <th className="text-left py-3 pr-4 text-text-muted font-medium w-28">Field</th>
                {comparedCourses.map((c) => (
                  <th key={c.slug} className="text-left py-3 px-4 text-text-primary font-semibold">
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {([
                ['Category', (c: typeof courses[0]) => c.category],
                ['Grade', (c: typeof courses[0]) => c.gradeLevel],
                ['Mode', (c: typeof courses[0]) => c.mode],
                ['Duration', (c: typeof courses[0]) => c.duration],
                ['Price', (c: typeof courses[0]) => formatPrice(c.price)],
                ['Rating', (c: typeof courses[0]) => `${c.rating} ★ (${c.reviewCount})`],
              ] as [string, (c: typeof courses[0]) => string][]).map(([label, accessor]) => (
                <tr key={label} className="hover:bg-surface-secondary/50 dark:hover:bg-surface-tertiary/50 transition-colors">
                  <td className="py-3 pr-4 text-text-muted font-medium">{label}</td>
                  {comparedCourses.map((c) => (
                    <td key={c.slug} className="py-3 px-4 text-text-primary">{accessor(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </main>
  );
}
