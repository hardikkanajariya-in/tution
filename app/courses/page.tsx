'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Grid3X3, List, Star, Clock, X, GitCompare, Filter, SlidersHorizontal,
  ArrowRight, Sparkles, BookOpen, Users, GraduationCap, TrendingUp, Zap,
  Monitor, Building2, Layers, ChevronRight,
} from 'lucide-react';
import { Button, Card, Badge, Modal, Input, Reveal, useToast } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';
import { ITEMS_PER_PAGE, MAX_COMPARE } from '@/lib/constants';
import courses from '@/data/courses.json';
import subjects from '@/data/subjects.json';

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

const MODE_OPTIONS: { value: CourseMode; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: Layers },
  { value: 'online', label: 'Online', icon: Monitor },
  { value: 'offline', label: 'Offline', icon: Building2 },
  { value: 'hybrid', label: 'Hybrid', icon: Zap },
];

const CATEGORY_THEMES: Record<string, { color: string; gradient: string; emoji: string }> = {
  Mathematics: { color: '#EA580C', gradient: 'from-orange-500 to-amber-500', emoji: '🧮' },
  Physics: { color: '#2563EB', gradient: 'from-blue-500 to-cyan-500', emoji: '⚛️' },
  Chemistry: { color: '#059669', gradient: 'from-emerald-500 to-teal-500', emoji: '🧪' },
  Biology: { color: '#65A30D', gradient: 'from-lime-500 to-green-500', emoji: '🧬' },
  English: { color: '#DB2777', gradient: 'from-pink-500 to-rose-500', emoji: '📖' },
  'Computer Science': { color: '#0EA5E9', gradient: 'from-sky-500 to-blue-500', emoji: '💻' },
  Commerce: { color: '#D97706', gradient: 'from-amber-500 to-yellow-500', emoji: '📊' },
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

  // ─── Aggregate stats ──────────────────────────────
  const stats = useMemo(() => {
    const avgRating = courses.reduce((s, c) => s + c.rating, 0) / courses.length;
    const totalReviews = courses.reduce((s, c) => s + c.reviewCount, 0);
    return { total: courses.length, avgRating: avgRating.toFixed(1), totalReviews };
  }, []);

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

  const modeBadgeVariant = (mode: string) => {
    if (mode === 'online') return 'success';
    if (mode === 'offline') return 'warning';
    return 'brand';
  };

  const modeIcon = (mode: string) => {
    if (mode === 'online') return Monitor;
    if (mode === 'offline') return Building2;
    return Zap;
  };

  return (
    <main className="min-h-screen overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — Immersive top section
          ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden" aria-label="Courses overview">
        {/* Decorative blobs */}
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-pink bottom-0 left-1/4" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                <span>{stats.total} Courses · {stats.totalReviews.toLocaleString('en-IN')}+ Reviews</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
                <span className="text-text-primary">Find Your Perfect</span>
                <br />
                <span className="text-gradient">Course</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Expert-led programmes for CBSE, ICSE, JEE & NEET — crafted by IIT & IISc alumni to help every student shine.
              </p>
            </Reveal>
          </div>

          {/* Quick stats */}
          <Reveal delay={0.15}>
            <div className="mt-14 glass rounded-2xl p-6 max-w-4xl mx-auto shadow-elevated">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { icon: BookOpen, value: stats.total, label: 'Courses', suffix: '+' },
                  { icon: Star, value: stats.avgRating, label: 'Avg. Rating', suffix: '/5' },
                  { icon: GraduationCap, value: subjects.gradeLevels.length, label: 'Grade Levels', suffix: '' },
                  { icon: TrendingUp, value: subjects.examTracks.length, label: 'Exam Tracks', suffix: '' },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 mb-2">
                        <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-text-primary">{s.value}{s.suffix}</p>
                      <p className="text-xs text-text-secondary mt-0.5 font-medium uppercase tracking-wider">{s.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CATEGORY QUICK NAV — Scrollable cards
          ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-surface-secondary dark:bg-surface-tertiary relative" aria-label="Browse by subject">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary">Browse by Subject</h2>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline flex items-center gap-1"
                >
                  Show All <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </Reveal>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hidden -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat, i) => {
              const theme = CATEGORY_THEMES[cat.name] ?? CATEGORY_THEMES.Mathematics;
              const isActive = selectedCategory === cat.name;
              const count = courses.filter(c => c.category === cat.name).length;
              return (
                <Reveal key={cat.slug} delay={i * 0.04}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl border whitespace-nowrap transition-all duration-200 min-w-[160px]',
                      isActive
                        ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/25'
                        : 'bg-surface-primary dark:bg-surface-secondary border-border-subtle dark:border-white/5 text-text-primary hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-md',
                    )}
                  >
                    <span className="text-xl" role="img" aria-hidden="true">{theme.emoji}</span>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{cat.name}</p>
                      <p className={cn('text-[11px]', isActive ? 'text-white/70' : 'text-text-muted')}>
                        {count} course{count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MAIN CONTENT — Filter bar + Course grid
          ═══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* ─── Filter + Search Bar ──────────────────── */}
        <Reveal>
          <div className="glass rounded-2xl p-5 shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
                <Input
                  placeholder="Search courses, subjects, tags…"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort */}
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

                {/* View toggle */}
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

            {/* Filter rows */}
            <div className="mt-4 space-y-3">
              {/* Grade pills */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-text-muted mr-1 uppercase tracking-wider">Grade</span>
                {gradeLevels.map((g) => (
                  <motion.button
                    key={g.slug}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGrade(selectedGrade === g.label ? null : g.label)}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
                      selectedGrade === g.label
                        ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-brand-300 dark:border-brand-600'
                        : 'bg-surface-secondary dark:bg-surface-tertiary text-text-secondary border-transparent hover:border-brand-200'
                    )}
                  >
                    {g.label}
                  </motion.button>
                ))}
              </div>

              {/* Mode filter + active filter actions */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-text-muted mr-1 uppercase tracking-wider">Mode</span>
                {MODE_OPTIONS.map((m) => {
                  const MIcon = m.icon;
                  return (
                    <motion.button
                      key={m.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setModeFilter(m.value)}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
                        modeFilter === m.value
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-surface-secondary dark:bg-surface-tertiary text-text-secondary border-transparent hover:border-brand-200'
                      )}
                    >
                      <MIcon className="w-3 h-3" />
                      {m.label}
                    </motion.button>
                  );
                })}

                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-xs">
                    <X className="h-3 w-3 mr-1" /> Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ─── Results count ───────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-text-muted">
            Showing <span className="font-semibold text-text-primary">{visible.length}</span> of{' '}
            <span className="font-semibold text-text-primary">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
          </p>
          {selectedCategory && (
            <Badge variant="brand" size="md">
              <span className="mr-1">{CATEGORY_THEMES[selectedCategory]?.emoji}</span>
              {selectedCategory}
            </Badge>
          )}
        </div>

        {/* ─── Empty state ─────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-secondary dark:bg-surface-tertiary mb-5">
              <Search className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">No courses found</h3>
            <p className="text-text-muted mb-6 max-w-sm mx-auto">Try adjusting your search or filters to discover courses.</p>
            <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
          </motion.div>
        )}

        {/* ─── Course cards ────────────────────────── */}
        <div className={cn(
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-5'
        )}>
          <AnimatePresence mode="popLayout">
            {visible.map((course, idx) => {
              const isCompared = compareList.includes(course.slug);
              const theme = CATEGORY_THEMES[course.category] ?? CATEGORY_THEMES.Mathematics;
              const ModeIcon = modeIcon(course.mode);

              return (
                <motion.div
                  key={course.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  {view === 'grid' ? (
                    /* ──── GRID CARD ────────────────── */
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={cn(
                        'group relative rounded-2xl overflow-hidden h-full flex flex-col',
                        'bg-surface-primary dark:bg-surface-secondary',
                        'border border-border-subtle dark:border-white/5',
                        'hover:shadow-xl transition-shadow duration-300',
                      )}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Top badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white backdrop-blur-md',
                            course.mode === 'online' ? 'bg-emerald-500/80' : course.mode === 'offline' ? 'bg-amber-500/80' : 'bg-brand-500/80',
                          )}>
                            <ModeIcon className="w-3 h-3" />
                            {course.mode}
                          </span>
                        </div>

                        {/* Compare button */}
                        <button
                          onClick={(e) => { e.preventDefault(); toggleCompare(course.slug); }}
                          className={cn(
                            'absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-md',
                            isCompared
                              ? 'bg-brand-500 text-white shadow-md'
                              : 'bg-white/20 text-white hover:bg-white/40',
                          )}
                          aria-label={isCompared ? 'Remove from compare' : 'Add to compare'}
                        >
                          <GitCompare className="h-3.5 w-3.5" />
                        </button>

                        {/* Category pill at bottom of image */}
                        <div className="absolute bottom-3 left-3">
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white backdrop-blur-md"
                            style={{ backgroundColor: `${theme.color}CC` }}
                          >
                            {theme.emoji} {course.category}
                          </span>
                        </div>

                        {/* Popularity indicator */}
                        {course.popularity >= 90 && (
                          <div className="absolute bottom-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-red-500/80 backdrop-blur-md uppercase tracking-wider">
                              <Sparkles className="w-3 h-3" /> Popular
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">{course.subtitle}</p>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 mt-3 text-xs text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-brand-500" /> {course.duration}
                          </span>
                          <span className="text-border-default">·</span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-brand-500" /> {course.gradeLevel}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-3">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-3.5 w-3.5',
                                  i < Math.round(course.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-text-primary">{course.rating}</span>
                          <span className="text-xs text-text-muted">({course.reviewCount})</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {course.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-secondary dark:bg-surface-tertiary text-text-muted">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle dark:border-white/5">
                          <div>
                            <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                              {formatPrice(course.price)}
                            </span>
                            <span className="text-xs text-text-muted font-normal ml-0.5">/course</span>
                          </div>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-brand transition-all duration-200"
                          >
                            Details <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* ──── LIST CARD ────────────────── */
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={cn(
                        'group relative rounded-2xl overflow-hidden flex flex-col md:flex-row',
                        'bg-surface-primary dark:bg-surface-secondary',
                        'border border-border-subtle dark:border-white/5',
                        'hover:shadow-xl transition-all duration-300',
                      )}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-48 md:h-auto md:w-64 shrink-0 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white backdrop-blur-md',
                            course.mode === 'online' ? 'bg-emerald-500/80' : course.mode === 'offline' ? 'bg-amber-500/80' : 'bg-brand-500/80',
                          )}>
                            <ModeIcon className="w-3 h-3" />
                            {course.mode}
                          </span>
                        </div>
                        {course.popularity >= 90 && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-red-500/80 backdrop-blur-md uppercase tracking-wider">
                              <Sparkles className="w-3 h-3" /> Popular
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold text-white"
                              style={{ backgroundColor: theme.color }}
                            >
                              {theme.emoji} {course.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-semibold text-text-primary">{course.rating}</span>
                              <span className="text-xs text-text-muted">({course.reviewCount})</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCompare(course.slug)}
                            className={cn(
                              'p-2 rounded-lg transition-colors shrink-0',
                              isCompared
                                ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-500'
                                : 'hover:bg-surface-secondary dark:hover:bg-surface-tertiary text-text-muted'
                            )}
                            aria-label={isCompared ? 'Remove from compare' : 'Add to compare'}
                          >
                            <GitCompare className="h-4 w-4" />
                          </button>
                        </div>

                        <h3 className="text-lg font-bold text-text-primary mt-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">{course.subtitle}</p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-500" /> {course.duration}</span>
                          <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5 text-brand-500" /> {course.gradeLevel}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {course.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-secondary dark:bg-surface-tertiary text-text-muted">{tag}</span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle dark:border-white/5">
                          <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                            {formatPrice(course.price)}
                            <span className="text-xs text-text-muted font-normal ml-0.5">/course</span>
                          </span>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-brand transition-all"
                          >
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ─── Load More ───────────────────────────── */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)} className="group">
              Load More Courses
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          CTA — Bottom banner
          ═══════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24" aria-label="Get started">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700" aria-hidden="true" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} aria-hidden="true" />

            <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Can&apos;t Decide? We&apos;ll Help!
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Talk to our academic counsellors for a free personalised course recommendation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg font-semibold">
                    Get Guidance
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <Link href="/subjects">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 !border-2">
                    Explore Subjects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════
          COMPARE DRAWER
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed bottom-0 inset-x-0 z-50',
              'glass-strong shadow-elevated',
            )}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                  <GitCompare className="h-4.5 w-4.5 text-brand-600 dark:text-brand-400" />
                </div>
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
                <span className="text-xs text-text-muted shrink-0 font-medium">
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
              <tr className="border-b border-border-subtle dark:border-white/5">
                <th className="text-left py-3 pr-4 text-text-muted font-medium w-28">Field</th>
                {comparedCourses.map((c) => (
                  <th key={c.slug} className="text-left py-3 px-4 text-text-primary font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{CATEGORY_THEMES[c.category]?.emoji}</span>
                      {c.title}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle dark:divide-white/5">
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
