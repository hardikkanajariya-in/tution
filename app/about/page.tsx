'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Rocket,
  Users,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Lightbulb,
  TrendingUp,
  Star,
  ChevronRight,
  Globe,
  ArrowRight,
  Building2,
  Clock,
  GraduationCap,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Badge, Button, Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';
import siteData from '@/data/site.json';
import teachersData from '@/data/teachers.json';
import resultsData from '@/data/results.json';

/* ─── Constants ──────────────────────────────────── */

const MILESTONES = [
  { year: '2018', title: 'The Beginning', description: 'Founded with just 5 students and a bold vision to reimagine education through technology and creativity.', emoji: '🌱' },
  { year: '2019', title: 'Going Digital', description: 'Launched our online learning platform, bringing quality education beyond geographic boundaries.', emoji: '🌐' },
  { year: '2021', title: 'Major Milestone', description: 'Surpassed 5,000+ enrolled students and expanded to 30+ course offerings across multiple exam tracks.', emoji: '🚀' },
  { year: '2023', title: '3D Learning Era', description: 'Introduced immersive 3D-inspired learning experiences, revolutionizing how students interact with complex concepts.', emoji: '🎯' },
  { year: '2024', title: 'Where We Are Today', description: '12,500+ students, 50+ courses, and a passionate team of expert educators shaping the future of learning.', emoji: '🏆' },
];

const VALUES = [
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace cutting-edge technology and creative teaching methods to make learning engaging and effective.', gradient: 'from-amber-500 to-orange-500', bgLight: 'bg-amber-50 dark:bg-amber-950/30' },
  { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in curriculum design, teacher quality, and student outcomes.', gradient: 'from-brand-500 to-amber-500', bgLight: 'bg-orange-50 dark:bg-orange-950/30' },
  { icon: Heart, title: 'Inclusivity', description: 'Every student deserves access to quality education regardless of background, learning style, or pace.', gradient: 'from-rose-500 to-pink-500', bgLight: 'bg-rose-50 dark:bg-rose-950/30' },
  { icon: TrendingUp, title: 'Growth', description: 'We cultivate a growth mindset, encouraging continuous improvement in both students and educators.', gradient: 'from-emerald-500 to-teal-500', bgLight: 'bg-emerald-50 dark:bg-emerald-950/30' },
];

const STAT_ICONS = [TrendingUp, GraduationCap, Star, Award];

const leaders = teachersData.slice(0, 3);
const leaderAccents = [
  { gradient: 'from-brand-500 to-amber-500', ring: 'ring-brand-400/40' },
  { gradient: 'from-rose-500 to-pink-500', ring: 'ring-rose-400/40' },
  { gradient: 'from-emerald-500 to-teal-500', ring: 'ring-emerald-400/40' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — Immersive opening
          ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 md:pt-40 md:pb-36 overflow-hidden" aria-label="About hero">
        {/* Decorative blobs */}
        <div className="floating-blob w-96 h-96 bg-brand-400 -top-16 -left-28" aria-hidden="true" />
        <div className="floating-blob w-[28rem] h-[28rem] bg-accent-amber top-32 -right-48" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-72 h-72 bg-accent-pink bottom-0 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  <span>Established 2018 · Bengaluru, India</span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
                  <span className="text-text-primary">The Story Behind</span>
                  <br />
                  <span className="text-gradient">{siteData.brand.name}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed">
                  We are a passionate team of educators and technologists on a mission to make world-class education accessible, engaging, and effective for every student across India.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/courses">
                    <Button variant="gradient" size="lg">
                      Explore Courses <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      Talk to Us
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right — Decorative metrics collage */}
            <Reveal delay={0.2}>
              <div className="relative">
                {/* Main glass card */}
                <div className="glass rounded-3xl p-8 shadow-elevated relative z-10">
                  <div className="grid grid-cols-2 gap-5">
                    {resultsData.overallStats.map((stat, i) => {
                      const Icon = STAT_ICONS[i];
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                          className="text-center p-4 rounded-2xl bg-surface-primary/60 dark:bg-surface-secondary/60"
                        >
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 mb-2">
                            <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                          </div>
                          <p className="text-2xl md:text-3xl font-extrabold text-text-primary">{stat.value}</p>
                          <p className="text-[11px] text-text-muted mt-0.5 font-medium uppercase tracking-wider leading-tight">{stat.label}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 z-20 glass-strong rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold text-text-primary">Since 2018</span>
                </motion.div>

                {/* Background accent */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/10 via-transparent to-amber-500/10 -z-10" aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MISSION & VISION — Side-by-side rich cards
          ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative" aria-label="Mission and vision">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                What Drives Us
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-balance">
                Our <span className="text-gradient">Purpose</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <Reveal>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative rounded-2xl overflow-hidden h-full border border-border-subtle dark:border-white/5 bg-surface-primary dark:bg-surface-secondary hover:shadow-xl transition-shadow duration-300"
              >
                {/* Top gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-brand-500 to-amber-500" />
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-amber-500 flex items-center justify-center shadow-md">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">Our Mission</h2>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-medium mt-0.5">What we do, every day</p>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    Empowering students through innovative, technology-driven education that bridges the gap between theoretical knowledge and practical understanding. We believe in nurturing curiosity, building confidence, and delivering measurable academic success.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Technology-driven', 'Student-first', 'Result-oriented'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Vision */}
            <Reveal delay={0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative rounded-2xl overflow-hidden h-full border border-border-subtle dark:border-white/5 bg-surface-primary dark:bg-surface-secondary hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-amber-500 to-rose-500" />
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-md">
                      <Eye className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary">Our Vision</h2>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-medium mt-0.5">Where we&apos;re heading</p>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    To be the leading academy bridging traditional teaching with modern learning methodologies — creating an ecosystem where every student thrives, regardless of their starting point, and every educator feels empowered to innovate.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Inclusive learning', 'Pan-India reach', 'Innovation-first'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TIMELINE — Creative journey cards
          ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-surface-secondary dark:bg-surface-tertiary relative overflow-hidden" aria-label="Our journey">
        {/* Subtle side gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-balance">
                The <span className="text-gradient">Story</span> So Far
              </h2>
            </div>
          </Reveal>

          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:block max-w-5xl mx-auto">
            {/* Timeline bar */}
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-brand-200 dark:bg-brand-800" aria-hidden="true" />
              <div className="grid grid-cols-5 gap-4">
                {MILESTONES.map((m, i) => (
                  <Reveal key={m.year} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="relative pt-12"
                    >
                      {/* Dot on timeline */}
                      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-10">
                        <div className="w-5 h-5 rounded-full bg-brand-500 border-4 border-surface-secondary dark:border-surface-tertiary shadow-md" />
                      </div>
                      {/* Card */}
                      <div className="rounded-2xl overflow-hidden border border-border-subtle dark:border-white/5 bg-surface-primary dark:bg-surface-secondary hover:shadow-lg transition-shadow duration-300">
                        <div className="px-4 py-5 text-center">
                          <span className="text-2xl mb-2 block" role="img" aria-hidden="true">{m.emoji}</span>
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 mb-2">{m.year}</span>
                          <h3 className="text-sm font-bold text-text-primary mb-1">{m.title}</h3>
                          <p className="text-[11px] text-text-muted leading-relaxed">{m.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden relative max-w-md mx-auto">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-brand-200 dark:bg-brand-800" aria-hidden="true" />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08}>
                <div className="relative flex items-start gap-5 mb-8 last:mb-0">
                  {/* Dot */}
                  <div className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm shadow-md mt-1">
                    {m.emoji}
                  </div>
                  {/* Card */}
                  <div className="flex-1 rounded-xl border border-border-subtle dark:border-white/5 bg-surface-primary dark:bg-surface-secondary p-4">
                    <span className="text-xs font-bold text-brand-500">{m.year}</span>
                    <h3 className="text-sm font-bold text-text-primary mt-0.5">{m.title}</h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CORE VALUES — Creative icon cards
          ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" aria-label="Core values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                What We Stand For
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-balance">
                Core <span className="text-gradient">Values</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={cn(
                    'relative rounded-2xl overflow-hidden h-full border border-border-subtle dark:border-white/5',
                    'bg-surface-primary dark:bg-surface-secondary hover:shadow-xl transition-shadow duration-300'
                  )}
                >
                  {/* Gradient top */}
                  <div className={cn('h-1 bg-gradient-to-r', v.gradient)} />
                  <div className="p-6 text-center">
                    <div className={cn(
                      'w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center',
                      v.bgLight,
                    )}>
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br text-white', v.gradient)}>
                        <v.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{v.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          QUOTE BANNER — Inspirational interlude
          ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-20" aria-label="Inspirational quote">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700" aria-hidden="true" />
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} aria-hidden="true" />
              <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center text-white">
                <Quote className="w-10 h-10 text-white/30 mx-auto mb-5" />
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight max-w-2xl mx-auto">
                  &ldquo;Education is not just about marks — it&rsquo;s about building thinkers, dreamers and doers who shape tomorrow.&rdquo;
                </blockquote>
                <p className="mt-6 text-sm text-white/60 font-medium uppercase tracking-wider">
                  — The Founding Team, {siteData.brand.name}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LEADERSHIP TEAM — Rich profile cards
          ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-surface-secondary dark:bg-surface-tertiary relative" aria-label="Leadership team">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Meet Our Leaders
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-balance">
                Leadership <span className="text-gradient">Team</span>
              </h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">
                Our leadership combines decades of academic expertise with a passion for innovation.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leaders.map((t, i) => {
              const accent = leaderAccents[i % leaderAccents.length];
              return (
                <Reveal key={t.slug} delay={i * 0.1}>
                  <Link href={`/teachers/${t.slug}`} className="block group">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="relative rounded-2xl overflow-hidden border border-border-subtle dark:border-white/5 bg-surface-primary dark:bg-surface-secondary hover:shadow-xl transition-shadow duration-300 h-full"
                    >
                      {/* Top gradient band */}
                      <div className={cn('h-24 bg-gradient-to-r', accent.gradient, 'relative')}>
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }} />
                      </div>

                      {/* Avatar overlapping */}
                      <div className="relative -mt-10 px-6 pb-6 text-center">
                        <div className={cn('w-20 h-20 rounded-full mx-auto overflow-hidden ring-4 ring-surface-primary dark:ring-surface-secondary shadow-lg', accent.ring)}>
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mt-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{t.name}</h3>
                        <p className="text-sm text-text-muted mt-0.5">{t.title}</p>

                        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                          <span className="flex items-center gap-1 text-text-secondary">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> <span className="font-semibold text-text-primary">{t.rating}</span>
                          </span>
                          <span className="text-border-default">·</span>
                          <span className="flex items-center gap-1 text-text-secondary">
                            <Users className="w-3.5 h-3.5 text-brand-500" /> <span className="font-semibold text-text-primary">{t.studentCount.toLocaleString()}</span>
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                          {t.specialties.slice(0, 2).map((s) => (
                            <span key={s} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface-secondary dark:bg-surface-tertiary text-text-muted">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.35}>
            <div className="text-center mt-10">
              <Link href="/teachers">
                <Button variant="outline" className="group">
                  View All Teachers <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CAMPUS & LOCATIONS — Multi-location cards
          ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" aria-label="Our locations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Centres
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-balance">
                Visit <span className="text-gradient">Us</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {siteData.locations.map((loc, i) => (
              <Reveal key={loc.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="rounded-2xl overflow-hidden border border-border-subtle dark:border-white/5 bg-surface-primary dark:bg-surface-secondary hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                >
                  {/* Decorative header */}
                  <div className="relative h-28 bg-gradient-to-br from-brand-100 via-brand-50 to-amber-50 dark:from-brand-900/40 dark:via-brand-950/30 dark:to-amber-950/20 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.06]" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }} />
                    <Building2 className="w-10 h-10 text-brand-500/60 dark:text-brand-400/40" />
                    {i === 0 && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white uppercase tracking-wider">
                        HQ
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-text-primary">{loc.name}</h3>

                    <div className="mt-4 space-y-3 flex-1">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-text-secondary leading-relaxed">{loc.address}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                        <p className="text-sm text-text-secondary">{loc.phone}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                        <p className="text-sm text-text-secondary">{loc.hours}</p>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border-subtle dark:border-white/5">
                      <a
                        href={`mailto:${siteData.contact.email}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {siteData.contact.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Bottom call to action
          ═══════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24" aria-label="Call to action">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700" aria-hidden="true" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} aria-hidden="true" />

            <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center text-white">
              <Rocket className="w-12 h-12 text-white/60 mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Join Our Learning Community
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Whether you are preparing for board exams, competitive tests, or seeking to master new skills — we have the courses and mentors to help you succeed.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg font-semibold">
                    <BookOpen className="w-4 h-4 mr-2" /> Explore Courses
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 !border-2">
                    Get In Touch <ChevronRight className="w-4 h-4 ml-1" />
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
