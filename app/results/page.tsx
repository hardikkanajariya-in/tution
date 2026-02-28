'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, TrendingUp, Users, Star, Award, Target, ArrowRight, Quote,
} from 'lucide-react';
import { Card, Badge, Button, Reveal } from '@/components/ui';
import { cn, getInitials } from '@/lib/utils';
import resultsData from '@/data/results.json';

/* ── Animated counter hook ──────────────────────────────────── */
function useCounter(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* ── Gradient palette for story avatars ─────────────────────── */
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
];

/* ── Stats config ───────────────────────────────────────────── */
const STATS = [
  { key: 'students', label: 'Students Mentored', value: 12500, suffix: '+', icon: Users },
  { key: 'improvement', label: 'Avg Score Improvement', value: 34, suffix: '%', icon: TrendingUp },
  { key: 'rankers', label: 'Top Rankers', value: 280, suffix: '+', icon: Trophy },
  { key: 'rate', label: 'Success Rate', value: 96, suffix: '%', icon: Target },
] as const;

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({ label, target, suffix, icon: Icon }: {
  label: string; target: number; suffix: string; icon: typeof Users;
}) {
  const { value, ref } = useCounter(target);
  return (
    <div ref={ref}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <div className="glass rounded-2xl p-5 text-center border border-border-primary shadow-elevated group">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-md transition-transform group-hover:scale-110">
            <Icon size={22} />
          </div>
          <p className="text-3xl font-extrabold text-gradient">
            {value.toLocaleString()}{suffix}
          </p>
          <p className="mt-1 text-sm text-text-secondary">{label}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Story card ─────────────────────────────────────────────── */
const STORY_GRADIENTS = [
  'from-sky-500 to-blue-600',
  'from-brand-500 to-amber-500',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
];

function StoryCard({ story, index }: {
  story: (typeof resultsData.stories)[number]; index: number;
}) {
  const maxScore = Math.max(story.beforeScore, story.afterScore);
  const beforePct = (story.beforeScore / maxScore) * 100;
  const afterPct = (story.afterScore / maxScore) * 100;
  const gradient = STORY_GRADIENTS[index % STORY_GRADIENTS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <div className="h-full rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated">
          {/* Gradient top bar */}
          <div className={cn('h-1.5 w-full bg-gradient-to-r', gradient)} />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white dark:ring-surface-secondary"
                style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
              >
                {getInitials(story.studentName)}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-text-primary truncate text-lg">{story.studentName}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge variant="brand">{story.exam}</Badge>
                  <Badge variant="success">{story.rank}</Badge>
                </div>
              </div>
            </div>

            {/* Score comparison bars */}
            <div className="space-y-3 mb-5 p-4 rounded-2xl bg-surface-secondary/50 dark:bg-surface-tertiary/30">
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1.5">
                  <span className="font-medium">Before</span>
                  <span className="font-semibold text-red-500 dark:text-red-400">{story.beforeScore}</span>
                </div>
                <div className="h-3 rounded-full bg-surface-tertiary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${beforePct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1.5">
                  <span className="font-medium">After</span>
                  <span className="font-semibold text-emerald-500 dark:text-emerald-400">{story.afterScore}</span>
                </div>
                <div className="h-3 rounded-full bg-surface-tertiary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${afterPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="relative mb-5 pl-5 border-l-3 border-brand-400 dark:border-brand-500">
              <Quote size={16} className="absolute -left-[10px] -top-0.5 text-brand-400 bg-surface-primary dark:bg-surface-secondary rounded-full" />
              <p className="text-sm italic text-text-secondary leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
            </div>

            {/* Footer badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{story.subject}</Badge>
              <Badge variant="default">{story.year}</Badge>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main page ──────────────────────────────────────────────── */
export default function ResultsPage() {
  const exams = ['All', ...Array.from(new Set(resultsData.stories.map((s) => s.exam)))];
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? resultsData.stories
    : resultsData.stories.filter((s) => s.exam === activeFilter);

  /* Counters for aggregate section */
  const improvementCounter = useCounter(34);
  const successCounter = useCounter(96);

  return (
    <main className="min-h-screen">
      {/* ── Hero header ──────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20" aria-label="Results overview">
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-emerald bottom-0 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <Trophy size={14} /> Student Achievements
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-text-primary">Our Results</span>{' '}
              <span className="text-gradient">Speak</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-text-secondary leading-relaxed">
              Real stories, real scores. See how our students transformed their
              academic journeys and achieved extraordinary results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats banner ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-4" aria-label="Key statistics" role="region">
        <Reveal>
          <div className="glass rounded-3xl p-6 md:p-8 border border-border-primary shadow-elevated">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {STATS.map((s) => (
                <StatCard key={s.key} label={s.label} target={s.value} suffix={s.suffix} icon={s.icon} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Filter bar ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16" aria-label="Filter by exam">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-sm font-medium text-text-secondary mr-1">Filter by:</span>
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setActiveFilter(exam)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border',
                  activeFilter === exam
                    ? 'bg-gradient-to-r from-brand-500 to-amber-500 text-white border-transparent shadow-lg shadow-brand-500/25'
                    : 'glass border-border-primary text-text-secondary hover:text-text-primary hover:border-brand-300 dark:hover:border-brand-700',
                )}
              >
                {exam}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Success stories grid ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 pb-24" aria-label="Student success stories">
        <AnimatePresence mode="popLayout">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-text-secondary">
            No stories found for this filter.
          </p>
        )}
      </section>

      {/* ── Aggregate improvement section ────────────────────── */}
      <section className="bg-surface-secondary py-20 md:py-28" aria-label="Overall impact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-4">
                By The Numbers
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                Overall <span className="text-gradient">Impact</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Average improvement */}
            <Reveal delay={0.1} className="h-full">
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="h-full">
                <div className="h-full rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated flex flex-col">
                  <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-600 shrink-0" />
                  <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg mb-4">
                      <TrendingUp size={28} />
                    </div>
                    <p className="text-sm text-text-secondary mb-4 font-medium">Average Score Improvement</p>
                    <div ref={improvementCounter.ref}>
                      <p className="text-7xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {improvementCounter.value}%
                      </p>
                    </div>
                    <p className="mt-4 text-xs text-text-muted">Across all exam categories</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Success rate – circular indicator */}
            <Reveal delay={0.2} className="h-full">
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="h-full">
                <div className="h-full rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated flex flex-col">
                  <div className="h-1.5 w-full bg-gradient-to-r from-brand-400 to-brand-600 shrink-0" />
                  <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-lg mb-4">
                      <Award size={28} />
                    </div>
                    <p className="text-sm text-text-secondary mb-4 font-medium">Success Rate</p>
                    <div ref={successCounter.ref} className="relative mx-auto h-40 w-40">
                      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label="Success rate 96%">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor"
                          className="text-surface-tertiary" strokeWidth="10" />
                        <motion.circle
                          cx="60" cy="60" r="52" fill="none"
                          className="text-brand-500"
                          strokeWidth="10" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 52}
                          initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                          whileInView={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - 0.96) }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.6, ease: 'easeOut' }}
                          stroke="currentColor"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-text-primary">
                        {successCounter.value}%
                      </span>
                    </div>
                    <p className="mt-4 text-xs text-text-muted">
                      Students achieving target scores
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Overall stats chips */}
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {resultsData.overallStats.map((stat) => (
                <motion.div key={stat.label} whileHover={{ y: -2, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3 border border-border-primary shadow-elevated">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <Star size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                      <p className="text-xs text-text-secondary">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="py-20 md:py-28" aria-label="Call to action">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-brand-500 to-amber-500 p-10 md:p-14 overflow-hidden text-white text-center">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold">Start Your Success Story</h2>
                <p className="mt-3 text-white/80 max-w-lg mx-auto">
                  Join thousands of students who transformed their scores with our expert-led courses.
                </p>
                <Link href="/courses">
                  <Button variant="secondary" size="lg" className="mt-8 bg-white text-brand-600 hover:bg-white/90 border-0 shadow-lg group">
                    Explore Courses
                    <ArrowRight size={18} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
