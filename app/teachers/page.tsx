'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Star, Users, Award, BookOpen, X, ArrowRight,
  Sparkles, GraduationCap, Quote, ChevronRight, Heart,
} from 'lucide-react';
import { Button, Card, Badge, Input, Reveal } from '@/components/ui';
import { cn, getInitials } from '@/lib/utils';
import teachersData from '@/data/teachers.json';

/* ─── Per-teacher accent theme ──────────────────────────────── */
const teacherAccents = [
  { gradient: 'from-orange-500 to-amber-500', ring: 'ring-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { gradient: 'from-blue-500 to-cyan-500', ring: 'ring-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { gradient: 'from-emerald-500 to-teal-500', ring: 'ring-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { gradient: 'from-pink-500 to-rose-500', ring: 'ring-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { gradient: 'from-sky-500 to-blue-500', ring: 'ring-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/30' },
  { gradient: 'from-amber-500 to-yellow-500', ring: 'ring-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
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
    const avgRating = teachersData.reduce((sum, t) => sum + t.rating, 0) / total;
    const totalStudents = teachersData.reduce((sum, t) => sum + t.studentCount, 0);
    const totalAchievements = teachersData.reduce((sum, t) => sum + t.achievements.length, 0);
    return { total, avgRating: avgRating.toFixed(1), totalStudents, totalAchievements };
  }, []);

  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedSubject(null);
  };

  const hasFilters = searchQuery || selectedSubject;

  return (
    <main className="min-h-screen pb-24 overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — Immersive header with floating avatars
          ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden" aria-label="Teachers overview">
        {/* Decorative blobs */}
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -right-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-32 -left-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-pink bottom-0 right-1/4" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  <span>{stats.total} Expert Educators</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
                  <span className="text-text-primary">Learn From</span>
                  <br />
                  <span className="text-gradient">India&apos;s Finest</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-lg">
                  IIT & IISc alumni, ISRO scientists, published authors — our hand-picked faculty brings real-world expertise and a passion for nurturing every student&apos;s potential.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#teacher-grid">
                    <Button size="lg" variant="gradient">
                      Meet the Faculty
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Floating avatar collage */}
            <Reveal delay={0.2}>
              <div className="hidden lg:block relative h-[420px]">
                {teachersData.slice(0, 5).map((teacher, i) => {
                  const positions = [
                    { top: '10%', left: '15%', size: 'w-28 h-28', delay: 0 },
                    { top: '5%', right: '10%', size: 'w-24 h-24', delay: 0.3 },
                    { top: '45%', left: '5%', size: 'w-20 h-20', delay: 0.6 },
                    { top: '50%', right: '5%', size: 'w-26 h-26', delay: 0.9 },
                    { top: '75%', left: '30%', size: 'w-24 h-24', delay: 1.2 },
                  ];
                  const pos = positions[i];
                  const accent = teacherAccents[i % teacherAccents.length];
                  return (
                    <motion.div
                      key={teacher.slug}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4 + (pos.delay ?? 0) * 0.4, type: 'spring', stiffness: 150, damping: 20 }}
                      className="absolute"
                      style={{ top: pos.top, left: 'left' in pos ? pos.left : undefined, right: 'right' in pos ? pos.right : undefined }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
                      >
                        <div className={cn('rounded-full p-[3px] bg-gradient-to-br shadow-xl', accent.gradient, pos.size)}>
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-full h-full rounded-full object-cover"
                            loading="eager"
                          />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-text-primary whitespace-nowrap shadow-md">
                          {teacher.name.split(' ').slice(-1)[0]}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  className="absolute top-[30%] left-[50%] w-16 h-16 border-2 border-dashed border-brand-200 dark:border-brand-800 rounded-full"
                  aria-hidden="true"
                />
                <div className="absolute top-[65%] right-[30%] w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 rotate-45" aria-hidden="true" />
              </div>
            </Reveal>
          </div>

          {/* ─── Stats Bar ──────────────────────────── */}
          <Reveal delay={0.2}>
            <div className="mt-16 glass rounded-2xl p-6 shadow-elevated">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { icon: Users, value: stats.total, label: 'Expert Teachers', suffix: '' },
                  { icon: Star, value: stats.avgRating, label: 'Avg. Rating', suffix: '/5' },
                  { icon: GraduationCap, value: stats.totalStudents.toLocaleString('en-IN'), label: 'Students Taught', suffix: '+' },
                  { icon: Award, value: stats.totalAchievements, label: 'Achievements', suffix: '+' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 200 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 mb-2">
                      <s.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-text-primary">
                      {s.value}{s.suffix}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 font-medium uppercase tracking-wider">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED — Top-rated teacher spotlight
          ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-surface-secondary dark:bg-surface-tertiary relative" aria-label="Featured teacher">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Faculty <span className="text-gradient">Spotlight</span>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                Get to know the educator leading the way this month.
              </p>
            </Reveal>
          </div>

          {(() => {
            const featured = [...teachersData].sort((a, b) => b.rating - a.rating)[0];
            const accent = teacherAccents[0];
            return (
              <Reveal delay={0.1}>
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  {/* Avatar side */}
                  <div className="md:col-span-2 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="relative"
                    >
                      <div className={cn('w-56 h-56 md:w-64 md:h-64 rounded-3xl p-[3px] bg-gradient-to-br shadow-2xl', accent.gradient)}>
                        <img
                          src={featured.avatar}
                          alt={featured.name}
                          className="w-full h-full rounded-[21px] object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Floating rating badge */}
                      <div className="absolute -bottom-3 -right-3 glass rounded-2xl px-4 py-2.5 shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          <span className="text-lg font-bold text-text-primary">{featured.rating}</span>
                        </div>
                        <p className="text-[10px] text-text-secondary font-medium mt-0.5">Top Rated</p>
                      </div>
                      {/* Stacked cards behind */}
                      <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-3xl bg-brand-200 dark:bg-brand-300 opacity-40" aria-hidden="true" />
                      <div className="absolute inset-0 -z-20 translate-x-6 translate-y-6 rounded-3xl bg-brand-100 dark:bg-brand-200 opacity-25" aria-hidden="true" />
                    </motion.div>
                  </div>

                  {/* Info side */}
                  <div className="md:col-span-3">
                    <Badge variant="brand" size="md" className="mb-3">
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> Featured Educator
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">{featured.name}</h3>
                    <p className="text-brand-600 dark:text-brand-400 font-medium mt-1">{featured.title}</p>

                    <p className="mt-4 text-text-secondary leading-relaxed line-clamp-3">{featured.bio}</p>

                    {/* Achievements */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featured.achievements.map((a) => (
                        <span key={a} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-surface-primary dark:bg-surface-secondary border border-border-subtle dark:border-white/10 text-text-secondary">
                          <Award className="w-3 h-3 text-brand-500" />
                          {a}
                        </span>
                      ))}
                    </div>

                    {/* Quick stats */}
                    <div className="mt-5 flex items-center gap-6 text-sm text-text-secondary">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-brand-500" />
                        {featured.experience} experience
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-brand-500" />
                        {featured.studentCount.toLocaleString('en-IN')}+ students
                      </span>
                    </div>

                    <Link href={`/teachers/${featured.slug}`} className="inline-block mt-6">
                      <Button variant="primary" size="md">
                        View Full Profile
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FILTER + GRID — Teacher cards
          ═══════════════════════════════════════════════ */}
      <section id="teacher-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24" aria-label="Filter teachers">
        <div className="section-heading">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Our <span className="text-gradient">Faculty</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Search, filter, and find the perfect mentor for your learning goals.
            </p>
          </Reveal>
        </div>

        {/* ─── Search & Filter Bar ──────────────────── */}
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-5 shadow-md mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name, subject, or specialty…"
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
                <motion.button
                  key={subject}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setSelectedSubject(selectedSubject === subject ? null : subject)
                  }
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                    selectedSubject === subject
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                      : 'bg-surface-secondary dark:bg-surface-tertiary text-text-secondary hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 border border-border-subtle dark:border-white/5'
                  )}
                >
                  {subject}
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ─── Results ────────────────────────────── */}
        <p className="text-sm text-text-muted mb-6">
          Showing{' '}
          <span className="font-semibold text-text-primary">{filtered.length}</span>{' '}
          instructor{filtered.length !== 1 && 's'}
        </p>

        {/* ─── Teacher Grid ─────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((teacher, idx) => {
              const accent = teacherAccents[idx % teacherAccents.length];
              return (
                <motion.div
                  key={teacher.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                >
                  <Link href={`/teachers/${teacher.slug}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={cn(
                        'group relative rounded-2xl overflow-hidden cursor-pointer h-full',
                        'bg-surface-primary dark:bg-surface-secondary',
                        'border border-border-subtle dark:border-white/5',
                        'hover:shadow-xl transition-shadow duration-300',
                      )}
                    >
                      {/* ── Colored top band ────────── */}
                      <div className={cn('h-24 bg-gradient-to-r relative overflow-hidden', accent.gradient)}>
                        {/* Decorative dots */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }} aria-hidden="true" />
                        {/* Experience badge */}
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white">
                          {teacher.experience}
                        </div>
                      </div>

                      {/* ── Avatar (overlaps band) ──── */}
                      <div className="px-6 -mt-10 relative z-10">
                        <div className={cn('w-20 h-20 rounded-2xl p-[2px] bg-gradient-to-br shadow-lg', accent.gradient)}>
                          <img
                            src={teacher.avatar}
                            alt={teacher.name}
                            className="w-full h-full rounded-[14px] object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* ── Content ────────────────── */}
                      <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-text-secondary truncate">{teacher.title}</p>

                        {/* Rating row */}
                        <div className="mt-2.5 flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
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
                          </div>
                          <span className="text-xs font-semibold text-text-primary">{teacher.rating}</span>
                          <span className="text-xs text-text-muted">
                            · {teacher.studentCount.toLocaleString('en-IN')} students
                          </span>
                        </div>

                        {/* Subject badges */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {teacher.specialties.slice(0, 3).map((s) => (
                            <Badge key={s} variant="outline" size="sm">{s}</Badge>
                          ))}
                          {teacher.specialties.length > 3 && (
                            <Badge variant="default" size="sm">
                              +{teacher.specialties.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Top achievement */}
                        <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
                          <Award className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span className="truncate">{teacher.achievements[0]}</span>
                        </div>

                        {/* CTA row */}
                        <div className="mt-auto pt-5 flex items-center justify-between border-t border-border-subtle dark:border-white/5">
                          <span className="text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View Profile
                          </span>
                          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ─── Empty state ──────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-20 max-w-sm text-center"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-secondary dark:bg-surface-tertiary">
              <Search className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">No instructors found</h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Try adjusting your search or filters to find the right mentor.
            </p>
            <Button variant="primary" size="sm" className="mt-5" onClick={clearFilters}>
              Clear all filters
            </Button>
          </motion.div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          WHY OUR TEACHERS — Value props
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28" aria-label="Why our teachers">
        <div className="section-heading">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Why Students <span className="text-gradient">Love</span> Our Faculty
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: GraduationCap,
              title: 'IIT & IISc Alumni',
              desc: 'Faculty from India\'s top institutions with deep subject mastery and research experience.',
              color: 'text-blue-500',
              bg: 'bg-blue-50 dark:bg-blue-950/30',
            },
            {
              icon: Heart,
              title: 'Passionate Mentors',
              desc: 'More than teachers — they\'re mentors who care about your growth and celebrate your wins.',
              color: 'text-rose-500',
              bg: 'bg-rose-50 dark:bg-rose-950/30',
            },
            {
              icon: Award,
              title: 'Industry Experience',
              desc: 'From ISRO scientists to ex-Microsoft engineers — real-world expertise in every lesson.',
              color: 'text-amber-500',
              bg: 'bg-amber-50 dark:bg-amber-950/30',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={cn(
                    'rounded-2xl p-7 border border-border-subtle dark:border-white/5',
                    'bg-surface-primary dark:bg-surface-secondary',
                    'hover:shadow-lg transition-shadow duration-300',
                  )}
                >
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-5', item.bg)}>
                    <Icon className={cn('w-6 h-6', item.color)} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA BANNER — Join / Contact
          ═══════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 mb-8" aria-label="Join us">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700" aria-hidden="true" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} aria-hidden="true" />

            <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Want to Teach with Us?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                We&apos;re always looking for passionate educators to join the Vidyaan Academy family. Share your expertise with thousands of eager students.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg font-semibold">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 !border-2">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
