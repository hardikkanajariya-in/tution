'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Calculator, Atom, BookOpen, Globe, Code, Palette, Music, Dumbbell,
  ArrowRight, GraduationCap, Trophy, TrendingUp, Sparkles, Star, Users,
  FlaskConical, Dna, ChevronRight, Zap, Target, Award, Flame,
} from 'lucide-react';
import { Card, Badge, Button, Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';
import subjectsData from '@/data/subjects.json';
import coursesData from '@/data/courses.json';
import { type MouseEvent, useRef } from 'react';

/* ── Icon mapping ─────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  Calculator, Atom, BookOpen, Globe, Code, Palette, Music, Dumbbell,
  GraduationCap, Trophy, TrendingUp, Sparkles, Star, Users,
  FlaskConical, Dna,
};

/* ── Subject theme config ─────────────────────────── */
const subjectThemes: Record<string, { color: string; gradient: string; bg: string; emoji: string; tagline: string }> = {
  mathematics: {
    color: '#EA580C',
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    emoji: '🧮',
    tagline: 'Numbers that shape the world',
  },
  physics: {
    color: '#2563EB',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    emoji: '⚛️',
    tagline: 'Unravel the laws of universe',
  },
  chemistry: {
    color: '#059669',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    emoji: '🧪',
    tagline: 'Reactions that transform matter',
  },
  biology: {
    color: '#65A30D',
    gradient: 'from-lime-500 to-green-500',
    bg: 'bg-lime-50 dark:bg-lime-950/30',
    emoji: '🧬',
    tagline: 'Decode the science of life',
  },
  english: {
    color: '#DB2777',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    emoji: '📖',
    tagline: 'Master the art of expression',
  },
  'computer-science': {
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    emoji: '💻',
    tagline: 'Build the future with code',
  },
  commerce: {
    color: '#D97706',
    gradient: 'from-amber-500 to-yellow-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    emoji: '📊',
    tagline: 'The engine of business & trade',
  },
};

/* ── Exam track icons & colors ────────────────────── */
const examTrackMeta: Record<string, { icon: React.ElementType; color: string; gradient: string }> = {
  'board-exams': { icon: GraduationCap, color: '#EA580C', gradient: 'from-orange-500 to-amber-500' },
  jee: { icon: Zap, color: '#2563EB', gradient: 'from-blue-500 to-indigo-500' },
  neet: { icon: Target, color: '#059669', gradient: 'from-emerald-500 to-teal-500' },
  olympiad: { icon: Award, color: '#7C3AED', gradient: 'from-violet-500 to-purple-500' },
  'ntse-kvpy': { icon: Flame, color: '#DC2626', gradient: 'from-red-500 to-orange-500' },
};

/* ── Grade level visual config ────────────────────── */
const gradeVisuals = [
  { pattern: '🌱', label: 'Foundation' },
  { pattern: '📚', label: 'Boards Prep' },
  { pattern: '🎯', label: 'Senior Sec' },
  { pattern: '🚀', label: 'Competitive' },
];

/* ── Helpers ──────────────────────────────────────── */
const courseCountByCategory = (categoryName: string) =>
  coursesData.filter((c) => c.category === categoryName).length;

const courseCountByGrade = (gradeLabel: string) =>
  coursesData.filter((c) => c.gradeLevel === gradeLabel).length;

/* ── Stats ────────────────────────────────────────── */
const stats = [
  { label: 'Subjects', value: subjectsData.categories.length, icon: BookOpen, suffix: '+' },
  { label: 'Total Courses', value: coursesData.length, icon: GraduationCap, suffix: '+' },
  { label: 'Grade Levels', value: subjectsData.gradeLevels.length, icon: Users, suffix: '' },
  { label: 'Exam Tracks', value: subjectsData.examTracks.length, icon: Trophy, suffix: '' },
];

/* ── Tilt Card Component ──────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={cn('perspective-container', className)}
    >
      {children}
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function SubjectsPage() {
  return (
    <main className="min-h-screen pb-24 overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — Immersive Header
          ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden" aria-label="Subjects overview">
        {/* Decorative blobs */}
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-pink bottom-0 left-1/4" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>{subjectsData.categories.length} Subjects · {coursesData.length}+ Courses</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
                <span className="text-text-primary">Your Learning</span>
                <br />
                <span className="text-gradient">Journey Starts Here</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                From CBSE foundations to IIT-JEE mastery — explore subjects crafted by India&apos;s finest educators to unlock every student&apos;s potential.
              </p>
            </Reveal>
          </div>

          {/* ── Floating Stats Bar ── */}
          <Reveal delay={0.15}>
            <div className="mt-14 glass rounded-2xl p-6 max-w-4xl mx-auto shadow-elevated">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((s, i) => {
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
                      <p className="text-2xl md:text-3xl font-bold text-text-primary">
                        {s.value}{s.suffix}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5 font-medium uppercase tracking-wider">
                        {s.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SUBJECT CARDS — Large immersive tiles
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" aria-label="All subjects">
        <div className="section-heading">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Explore All <span className="text-gradient">Subjects</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Tap on any subject to view courses, study materials, and expert faculty.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {subjectsData.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? BookOpen;
            const theme = subjectThemes[cat.slug] ?? subjectThemes.mathematics;
            const count = courseCountByCategory(cat.name);

            return (
              <Reveal key={cat.slug} delay={i * 0.06}>
                <Link href={`/courses?category=${encodeURIComponent(cat.name)}`}>
                  <TiltCard>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer"
                    >
                      {/* Colored top accent bar */}
                      <div
                        className={cn('h-1.5 w-full bg-gradient-to-r', theme.gradient)}
                        aria-hidden="true"
                      />

                      <div className={cn(
                        'p-6 sm:p-7 border border-t-0 rounded-b-2xl transition-all duration-300',
                        'bg-surface-primary dark:bg-surface-secondary',
                        'border-border-subtle dark:border-white/5',
                        'group-hover:shadow-xl',
                      )}>
                        {/* Icon + Emoji row */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className="flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${theme.color}15`, color: theme.color }}
                          >
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="text-3xl" role="img" aria-hidden="true">{theme.emoji}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {cat.name}
                        </h3>

                        {/* Tagline */}
                        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                          {theme.tagline}
                        </p>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between mt-5 pt-5 border-t border-border-subtle dark:border-white/5">
                          <div className="flex items-center gap-2">
                            <Badge variant="brand" size="sm">
                              {count} Course{count !== 1 && 's'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                            Explore
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GRADE LEVELS — Visual step cards
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28" aria-label="Grade levels">
        <div className="section-heading">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Choose Your <span className="text-gradient">Grade Level</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Courses tailored for every stage of your academic journey.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjectsData.gradeLevels.map((grade, i) => {
            const count = courseCountByGrade(grade.label);
            const visual = gradeVisuals[i] ?? gradeVisuals[0];

            return (
              <Reveal key={grade.slug} delay={i * 0.08}>
                <Link href={`/courses?grade=${encodeURIComponent(grade.label)}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={cn(
                      'group relative rounded-2xl overflow-hidden cursor-pointer',
                      'bg-surface-primary dark:bg-surface-secondary',
                      'border border-border-subtle dark:border-white/5',
                      'hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-600',
                      'transition-all duration-300',
                    )}
                  >
                    {/* Top decorative band */}
                    <div className="h-24 bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center relative overflow-hidden">
                      <span className="text-5xl opacity-90" role="img" aria-hidden="true">{visual.pattern}</span>
                      {/* Step number */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                        {i + 1}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
                        {visual.label}
                      </p>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {grade.label}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">{grade.description}</p>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-subtle dark:border-white/5">
                        <Badge variant="brand" size="sm">
                          {count} Course{count !== 1 && 's'}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-brand-500 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EXAM TRACKS — Bold feature cards
          ═══════════════════════════════════════════════ */}
      <section className="mt-28 py-20 bg-surface-secondary dark:bg-surface-tertiary relative" aria-label="Exam tracks">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                Target Your <span className="text-gradient">Exam</span>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                Focused preparation tracks for every competitive and board examination.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectsData.examTracks.map((track, i) => {
              const meta = examTrackMeta[track.slug] ?? examTrackMeta['board-exams'];
              const TrackIcon = meta.icon;

              return (
                <Reveal key={track.slug} delay={i * 0.06}>
                  <Link href="/courses">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={cn(
                        'group rounded-2xl overflow-hidden cursor-pointer',
                        'bg-surface-primary dark:bg-surface-secondary',
                        'border border-border-subtle dark:border-white/5',
                        'hover:shadow-xl transition-all duration-300',
                      )}
                    >
                      {/* Gradient header strip */}
                      <div className={cn('px-6 py-5 bg-gradient-to-r text-white flex items-center gap-4', meta.gradient)}>
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <TrackIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{track.label}</h3>
                          <p className="text-sm text-white/80">{track.description}</p>
                        </div>
                      </div>

                      {/* Bottom action area */}
                      <div className="px-6 py-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-text-secondary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          View Courses
                        </span>
                        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </motion.div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          POPULAR TOPICS — Interactive chip cloud
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28" aria-label="Popular topics">
        <div className="section-heading">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Trending <span className="text-gradient">Topics</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Jump straight into the most popular subjects students are exploring right now.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {subjectsData.subjectChips.map((chip, i) => (
              <motion.div
                key={chip}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, type: 'spring', stiffness: 200 }}
              >
                <Link href={`/courses?search=${encodeURIComponent(chip)}`}>
                  <motion.span
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-pointer',
                      'bg-surface-primary dark:bg-surface-secondary',
                      'border border-border-subtle dark:border-white/10',
                      'text-text-secondary hover:text-brand-600 dark:hover:text-brand-400',
                      'hover:border-brand-300 dark:hover:border-brand-600',
                      'hover:shadow-md transition-all duration-200',
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    {chip}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Bottom call to action
          ═══════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 mb-8" aria-label="Get started">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700" aria-hidden="true" />
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }} aria-hidden="true" />

            <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to Start Learning?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Join thousands of students across India who trust Vidyaan Academy for their academic success.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg font-semibold">
                    Browse All Courses
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 !border-2">
                    Talk to Us
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
