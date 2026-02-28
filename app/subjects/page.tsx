'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calculator, Atom, BookOpen, Globe, Code, Palette, Music, Dumbbell,
  ArrowRight, GraduationCap, Trophy, TrendingUp, Sparkles, Star, Users,
  FlaskConical, Dna,
} from 'lucide-react';
import { Card, Badge, Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';
import subjectsData from '@/data/subjects.json';
import coursesData from '@/data/courses.json';

/* ── Icon mapping ─────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  Calculator, Atom, BookOpen, Globe, Code, Palette, Music, Dumbbell,
  GraduationCap, Trophy, TrendingUp, Sparkles, Star, Users,
  FlaskConical, Dna,
};

const categoryColors: Record<string, string> = {
  mathematics: '#667eea',
  physics: '#f97316',
  chemistry: '#10b981',
  biology: '#84cc16',
  english: '#ec4899',
  'computer-science': '#8b5cf6',
  commerce: '#f59e0b',
};

/* ── Helpers ──────────────────────────────────────── */
const courseCountByCategory = (categoryName: string) =>
  coursesData.filter((c) => c.category === categoryName).length;

const courseCountByGrade = (gradeLabel: string) =>
  coursesData.filter((c) => c.gradeLevel === gradeLabel).length;

/* ── Stats ────────────────────────────────────────── */
const stats = [
  { label: 'Subjects', value: subjectsData.categories.length, icon: BookOpen },
  { label: 'Total Courses', value: coursesData.length, icon: GraduationCap },
  { label: 'Grade Levels', value: subjectsData.gradeLevels.length, icon: Users },
  { label: 'Exam Tracks', value: subjectsData.examTracks.length, icon: Trophy },
];

/* ── Page ─────────────────────────────────────────── */
export default function SubjectsPage() {
  return (
    <main className="min-h-screen pb-24">
      {/* ── Header ──────────────────────────────── */}
      <section className="pt-32 pb-20 text-center px-4" aria-label="Subjects overview">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-balance">
            Explore <span className="text-brand-600 dark:text-brand-400">Subjects</span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto text-lg">
            Discover our diverse catalogue spanning sciences, humanities, and technology — each crafted
            by expert educators to help every student excel.
          </p>
        </Reveal>
      </section>

      {/* ── Category Cards ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="All subjects">
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6 text-balance">All Subjects</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectsData.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? BookOpen;
            const color = categoryColors[cat.slug] ?? '#667eea';
            const count = courseCountByCategory(cat.name);

            return (
              <Reveal key={cat.slug} delay={i * 0.05}>
                <Link href={`/courses?category=${encodeURIComponent(cat.name)}`}>
                  <div
                    className="rounded-2xl border-l-4 group"
                    style={{ borderLeftColor: color }}
                  >
                    <Card
                      glass
                      className="card-interactive cursor-pointer overflow-hidden !rounded-l-none"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl"
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg group-hover:text-brand-500 transition-colors">
                            {cat.name}
                          </h3>
                          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                            {count} course{count !== 1 && 's'} available
                          </p>
                        </div>

                        <ArrowRight className="w-5 h-5 text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Grade Levels ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20" aria-label="Grade levels">
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6 text-balance">Grade Levels</h2>
        </Reveal>

        <div className="flex flex-wrap gap-4">
          {subjectsData.gradeLevels.map((grade, i) => {
            const count = courseCountByGrade(grade.label);
            return (
              <Reveal key={grade.slug} delay={i * 0.06}>
                <Link href={`/courses?grade=${encodeURIComponent(grade.label)}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      'glass rounded-2xl px-6 py-4 cursor-pointer border border-white/10',
                      'hover:border-brand-500/40 transition-colors min-w-[180px] text-center',
                    )}
                  >
                    <GraduationCap className="w-5 h-5 mx-auto mb-2 text-brand-500" />
                    <p className="font-semibold">{grade.label}</p>
                    <p className="text-xs text-text-secondary mt-1">{grade.description}</p>
                    <Badge variant="brand" className="mt-2">
                      {count} course{count !== 1 && 's'}
                    </Badge>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Exam Tracks ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20" aria-label="Exam tracks">
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6 text-balance">Exam Tracks</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjectsData.examTracks.map((track, i) => (
            <Reveal key={track.slug} delay={i * 0.05}>
              <Link href="/courses">
                <Card
                  glass
                  className="group card-interactive cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="font-semibold group-hover:text-brand-500 transition-colors">
                        {track.label}
                      </p>
                      <p className="text-xs text-text-secondary">{track.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Quick Chips ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20" aria-label="Popular topics">
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6 text-balance">Popular Topics</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {subjectsData.subjectChips.map((chip) => (
              <Link key={chip} href={`/courses?search=${encodeURIComponent(chip)}`}>
                <Badge
                  variant="outline"
                  size="md"
                  className="cursor-pointer hover:bg-brand-500/10 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  {chip}
                </Badge>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Stats Row ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-8" aria-label="Statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 0.08}>
                <Card glass className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-brand-500" />
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="text-sm text-text-secondary mt-1">{s.label}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
