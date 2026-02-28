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
      <Card className="text-center hover:shadow-brand/20 hover:shadow-lg group">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 transition-transform group-hover:scale-110">
          <Icon size={24} />
        </div>
        <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">
          {value.toLocaleString()}{suffix}
        </p>
        <p className="mt-1 text-sm text-text-secondary">{label}</p>
      </Card>
    </div>
  );
}

/* ── Story card ─────────────────────────────────────────────── */
function StoryCard({ story, index }: {
  story: (typeof resultsData.stories)[number]; index: number;
}) {
  const maxScore = Math.max(story.beforeScore, story.afterScore);
  const beforePct = (story.beforeScore / maxScore) * 100;
  const afterPct = (story.afterScore / maxScore) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="h-12 w-12 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
            style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
          >
            {getInitials(story.studentName)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary truncate">{story.studentName}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="brand">{story.exam}</Badge>
              <Badge variant="success">{story.rank}</Badge>
            </div>
          </div>
        </div>

        {/* Score comparison bars */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>Before</span>
              <span className="font-medium text-red-500 dark:text-red-400">{story.beforeScore}</span>
            </div>
            <div className="h-2.5 rounded-full bg-surface-tertiary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${beforePct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>After</span>
              <span className="font-medium text-emerald-500 dark:text-emerald-400">{story.afterScore}</span>
            </div>
            <div className="h-2.5 rounded-full bg-surface-tertiary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${afterPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative mb-4 pl-4 border-l-2 border-brand-300 dark:border-brand-600">
          <Quote size={14} className="absolute -left-[9px] -top-0.5 text-brand-400 bg-surface-primary dark:bg-surface-secondary" />
          <p className="text-sm italic text-text-secondary leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
        </div>

        {/* Footer badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{story.subject}</Badge>
          <Badge variant="default">{story.year}</Badge>
        </div>
      </Card>
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
      <section className="relative overflow-hidden pt-32 pb-20 text-center" aria-label="Results overview">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-transparent to-transparent dark:from-brand-950/30" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-brand-400/20 blur-[100px]" />
        <Reveal>
          <Badge variant="brand" size="md" className="mb-4 inline-flex items-center gap-1.5">
            <Trophy size={14} /> Student Achievements
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary text-balance">
            Our Results{' '}
            <span className="text-brand-600 dark:text-brand-400">
              Speak
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Real stories, real scores. See how our students transformed their
            academic journeys and achieved extraordinary results.
          </p>
        </Reveal>
      </section>

      {/* ── Stats banner ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Key statistics" role="region">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.key} label={s.label} target={s.value} suffix={s.suffix} icon={s.icon} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Filter bar ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16" aria-label="Filter by exam">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setActiveFilter(exam)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  activeFilter === exam
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary hover:text-text-primary',
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
      <section className="bg-surface-secondary/50 dark:bg-surface-secondary/20 py-20 md:py-28" aria-label="Overall impact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-text-primary mb-12 text-balance">
              Overall <span className="text-brand-600 dark:text-brand-400">Impact</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Average improvement */}
            <Reveal delay={0.1}>
              <Card className="text-center" padding="lg">
                <TrendingUp size={32} className="mx-auto mb-3 text-emerald-500" />
                <p className="text-sm text-text-secondary mb-2">Average Score Improvement</p>
                <div ref={improvementCounter.ref}>
                  <p className="text-6xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {improvementCounter.value}%
                  </p>
                </div>
                <p className="mt-2 text-xs text-text-secondary">Across all exam categories</p>
              </Card>
            </Reveal>

            {/* Success rate – circular indicator */}
            <Reveal delay={0.2}>
              <Card className="text-center" padding="lg">
                <Award size={32} className="mx-auto mb-3 text-brand-500" />
                <p className="text-sm text-text-secondary mb-4">Success Rate</p>
                <div ref={successCounter.ref} className="relative mx-auto h-36 w-36">
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
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-text-primary">
                    {successCounter.value}%
                  </span>
                </div>
                <p className="mt-3 text-xs text-text-secondary">
                  Students achieving target scores
                </p>
              </Card>
            </Reveal>
          </div>

          {/* Overall stats chips */}
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {resultsData.overallStats.map((stat) => (
                <Card key={stat.label} className="flex items-center gap-3" padding="sm">
                  <Star size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary">{stat.label}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA section ──────────────────────────────────────── */}
      <section className="py-20 md:py-28" aria-label="Call to action">
        <Reveal>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="rounded-3xl bg-brand-600 dark:bg-brand-700 p-10 shadow-xl shadow-brand-500/20">
              <h2 className="text-3xl font-bold text-white">Start Your Success Story</h2>
              <p className="mt-3 text-white/80">
                Join thousands of students who transformed their scores with our expert-led courses.
              </p>
              <Link href="/courses">
                <Button variant="secondary" size="lg" className="mt-6 group">
                  Explore Courses
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
