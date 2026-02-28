'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { Card, Badge, Button, Reveal } from '@/components/ui';
import { cn, getInitials } from '@/lib/utils';
import siteData from '@/data/site.json';
import teachersData from '@/data/teachers.json';
import resultsData from '@/data/results.json';

/* ─── Constants ──────────────────────────────────── */
const GRADIENTS = [
  'from-brand-500 to-purple-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
];

const MILESTONES = [
  { year: '2018', title: 'The Beginning', description: 'Founded with just 5 students and a bold vision to reimagine education through technology and creativity.' },
  { year: '2019', title: 'Going Digital', description: 'Launched our online learning platform, bringing quality education beyond geographic boundaries.' },
  { year: '2021', title: 'Major Milestone', description: 'Surpassed 5,000+ enrolled students and expanded to 30+ course offerings across multiple exam tracks.' },
  { year: '2023', title: '3D Learning Era', description: 'Introduced immersive 3D-inspired learning experiences, revolutionizing how students interact with complex concepts.' },
  { year: '2024', title: 'Where We Are Today', description: '12,500+ students, 50+ courses, and a passionate team of expert educators shaping the future of learning.' },
];

const VALUES = [
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace cutting-edge technology and creative teaching methods to make learning engaging and effective.', color: 'text-amber-500' },
  { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in curriculum design, teacher quality, and student outcomes.', color: 'text-brand-500' },
  { icon: Heart, title: 'Inclusivity', description: 'Every student deserves access to quality education regardless of background, learning style, or pace.', color: 'text-rose-500' },
  { icon: TrendingUp, title: 'Growth', description: 'We cultivate a growth mindset, encouraging continuous improvement in both students and educators.', color: 'text-emerald-500' },
];

const leaders = teachersData.slice(0, 3);

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── Hero ──────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden" aria-label="About hero">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-purple-600 to-brand-700 dark:from-brand-900 dark:via-purple-900 dark:to-brand-950" />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-400/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <Badge className="mb-6 bg-white/15 text-white border-white/20 backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5 mr-1.5" /> Est. 2018
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight text-balance">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">{siteData.brand.name}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              We are a passionate team of educators and technologists on a mission to make world-class education accessible, engaging, and effective for every student.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Mission & Vision ──────────────────────── */}
      <section className="py-20 md:py-28" aria-label="Mission and vision">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Reveal>
              <Card glass className="h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-500/10 to-transparent rounded-bl-full" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Empowering students through innovative, technology-driven education that bridges the gap between theoretical knowledge and practical understanding. We believe in nurturing curiosity, building confidence, and delivering measurable academic success.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.15}>
              <Card glass className="h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading academy bridging traditional teaching with modern 3D-inspired learning methodologies — creating an ecosystem where every student thrives, regardless of their starting point, and every educator feels empowered to innovate.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Our Story Timeline ────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-secondary/50 dark:bg-white/[0.02]" aria-label="Our journey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-balance">The Story So Far</h2>
            </div>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-purple-500 to-rose-500 hidden md:block" />
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-purple-500 to-rose-500 md:hidden" />

            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1}>
                <div className={cn('relative flex items-start gap-6 mb-12 last:mb-0', i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
                  {/* Content */}
                  <div className={cn('flex-1 pl-12 md:pl-0', i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12')}>
                    <Card glass padding="sm" className="inline-block">
                      <span className="text-sm font-bold text-brand-500">{m.year}</span>
                      <h3 className="text-lg font-bold mt-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-xs">{m.description}</p>
                    </Card>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-brand-500 border-4 border-background shadow-lg mt-2" />
                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Values ───────────────────────────── */}
      <section className="py-20 md:py-28" aria-label="Core values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">What We Stand For</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-balance">Core Values</h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <Card glass className="text-center h-full group hover:scale-[1.03] transition-transform">
                  <div className={cn('w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br', i === 0 && 'from-amber-500/20 to-orange-500/20', i === 1 && 'from-brand-500/20 to-purple-500/20', i === 2 && 'from-rose-500/20 to-pink-500/20', i === 3 && 'from-emerald-500/20 to-teal-500/20')}>
                    <v.icon className={cn('w-7 h-7', v.color)} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Leadership Team ───────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-secondary/50 dark:bg-white/[0.02]" aria-label="Leadership team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">Meet Our Leaders</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-balance">Leadership Team</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                Our leadership combines decades of academic expertise with a passion for innovation.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leaders.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.12}>
                <Link href={`/teachers/${t.slug}`} className="block group">
                  <Card glass className="text-center h-full card-interactive">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-brand-500 transition-colors">{t.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.title}</p>
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500" /> {t.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-brand-500" /> {t.studentCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                      {t.specialties.slice(0, 2).map((s) => (
                        <Badge key={s} className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="text-center mt-10">
              <Link href="/teachers">
                <Button variant="outline">
                  View All Teachers <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────── */}
      <section className="py-20 md:py-28" aria-label="Our impact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4">By The Numbers</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-balance">Our Impact</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {resultsData.overallStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <Card glass className="text-center group hover:scale-[1.04] transition-transform">
                  <motion.p
                    className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: i * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Campus / Location ─────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-secondary/50 dark:bg-white/[0.02]" aria-label="Campus location">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <Reveal>
              <div>
                <Badge className="mb-4">Our Campus</Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-balance">Visit Us</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Address</p>
                      <p className="text-sm text-muted-foreground">{siteData.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Phone</p>
                      <p className="text-sm text-muted-foreground">{siteData.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Email</p>
                      <p className="text-sm text-muted-foreground">{siteData.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-500/30 via-purple-500/20 to-rose-500/30 flex items-center justify-center shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.3),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(244,63,94,0.2),transparent_50%)]" />
                <div className="relative text-center p-8">
                  <MapPin className="w-12 h-12 text-brand-500 mx-auto mb-3" />
                  <p className="font-bold text-lg">San Francisco HQ</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon – Sat, 8 AM – 8 PM</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Call to action">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-purple-600 to-brand-700 dark:from-brand-900 dark:via-purple-900 dark:to-brand-950" />
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <Rocket className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Join Our Learning Community
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
              Whether you are preparing for board exams, competitive tests, or seeking to master new skills — we have the courses and mentors to help you succeed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 font-semibold shadow-lg">
                  <BookOpen className="w-4 h-4 mr-2" /> Explore Courses
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Get In Touch <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
