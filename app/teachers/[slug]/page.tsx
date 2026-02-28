'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star, Users, BookOpen, Award, GraduationCap, Mail,
  ChevronRight, ArrowLeft, ExternalLink, Clock,
} from 'lucide-react';
import { Button, Card, Badge, Modal, Input, Reveal } from '@/components/ui';
import { TextArea } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { cn, formatPrice, getInitials } from '@/lib/utils';
import teachersData from '@/data/teachers.json';
import coursesData from '@/data/courses.json';

/* ── Gradient palette (mirrors teachers list page) ──────────── */
const GRADIENTS = [
  'from-brand-500 to-purple-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-yellow-400',
  'from-fuchsia-500 to-pink-500',
];

const BG_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #f97316 100%)',
  'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #facc15 100%)',
  'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)',
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Mathematics: 'from-indigo-500 to-purple-600',
  Physics: 'from-orange-500 to-red-500',
  Chemistry: 'from-emerald-500 to-green-600',
  Biology: 'from-lime-500 to-green-500',
  English: 'from-pink-500 to-purple-500',
  'Computer Science': 'from-violet-500 to-indigo-500',
  Commerce: 'from-amber-500 to-yellow-600',
};

const SOCIAL_LABELS: Record<string, string> = {
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
};

/* ── Stars helper ───────────────────────────────────────────── */
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : i < rating
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-gray-300 dark:text-gray-600',
          )}
        />
      ))}
    </span>
  );
}

/* ── Main page ──────────────────────────────────────────────── */
export default function TeacherDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToast } = useToast();

  const teacherIndex = teachersData.findIndex((t) => t.slug === slug);
  const teacher = teacherIndex !== -1 ? teachersData[teacherIndex] : null;
  const gradient = GRADIENTS[teacherIndex % GRADIENTS.length];
  const bgGradient = BG_GRADIENTS[teacherIndex % BG_GRADIENTS.length];

  const teacherCourses = useMemo(
    () => (teacher ? coursesData.filter((c) => c.teacherSlug === teacher.slug) : []),
    [teacher],
  );

  /* ── Contact modal state ──────────────────────────────────── */
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormMessage('');
    setErrors({});
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formName.trim()) errs.name = 'Name is required';
    if (!formEmail.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) errs.email = 'Invalid email';
    if (!formMessage.trim()) errs.message = 'Message is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setModalOpen(false);
      resetForm();
      addToast(`Your message has been sent to ${teacher?.name}!`, 'success');
    }, 1200);
  };

  /* ── Not-found state ──────────────────────────────────────── */
  if (!teacher) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-secondary">
            <Users className="h-9 w-9 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Teacher Not Found</h1>
          <p className="mt-2 text-text-secondary">
            We couldn&apos;t find a teacher with this profile.
          </p>
          <Link href="/teachers">
            <Button variant="outline" className="mt-6">
              <ArrowLeft className="h-4 w-4" /> Back to Teachers
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  const socials = Object.entries(teacher.socials) as [string, string][];

  return (
    <main className="min-h-screen pb-24">
      {/* ── Breadcrumbs ─────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/teachers" className="hover:text-brand-500 transition-colors">Teachers</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary font-medium">{teacher.name}</span>
        </nav>
      </div>

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative mt-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: bgGradient }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-primary dark:to-surface-primary" />

        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="h-[120px] w-[120px] rounded-full shadow-elevated ring-4 ring-white/20 overflow-hidden"
              >
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Name & title */}
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                {teacher.name}
              </h1>
              <p className="mt-2 text-lg text-text-secondary">{teacher.title}</p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={teacher.rating} size={20} />
                <span className="text-sm font-semibold text-text-primary">{teacher.rating}</span>
              </div>

              {/* Stats row */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {[
                  { icon: Clock, value: teacher.experience, label: 'Experience' },
                  { icon: Users, value: teacher.studentCount.toLocaleString() + '+', label: 'Students' },
                  { icon: BookOpen, value: teacherCourses.length, label: 'Courses' },
                  { icon: Award, value: teacher.achievements.length, label: 'Achievements' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm">
                      <stat.icon className="h-5 w-5 text-brand-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                      <p className="text-xs text-text-muted">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              {socials.length > 0 && (
                <div className="mt-6 flex items-center gap-3">
                  {socials.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm px-4 py-2 text-xs font-medium text-text-secondary hover:text-brand-500 hover:bg-white/20 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {SOCIAL_LABELS[platform] ?? platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 space-y-16 mt-8">
        {/* ── Bio Section ───────────────────────────────────── */}
        <Reveal>
          <Card glass padding="lg" className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-text-primary mb-4">About</h2>
            <p className="text-text-secondary leading-relaxed text-[15px]">{teacher.bio}</p>
          </Card>
        </Reveal>

        {/* ── Specialties Section ───────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-brand-500" /> Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {teacher.specialties.map((s) => (
                <Badge key={s} variant="brand" size="md">{s}</Badge>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Achievements Section ──────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-500" /> Achievements
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {teacher.achievements.map((ach, i) => (
                <motion.div
                  key={ach}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card
                    glass
                    className="flex items-center gap-4 hover:shadow-elevated transition-shadow"
                  >
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                      GRADIENTS[i % GRADIENTS.length],
                    )}>
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{ach}</span>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Courses Taught ────────────────────────────────── */}
        {teacherCourses.length > 0 && (
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-brand-500" /> Courses by {teacher.name.split(' ')[0]}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teacherCourses.map((course, i) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/courses/${course.slug}`} className="group block h-full">
                      <Card
                        padding="none"
                        className="flex h-full flex-col overflow-hidden hover:shadow-elevated transition-shadow"
                      >
                        {/* Course thumbnail */}
                        <div className="h-36 overflow-hidden">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <Badge variant="outline" size="sm" className="self-start mb-2">
                            {course.category}
                          </Badge>
                          <h3 className="font-semibold text-text-primary group-hover:text-brand-500 transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="mt-1 text-xs text-text-muted line-clamp-2">
                            {course.subtitle}
                          </p>

                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Stars rating={course.rating} size={12} />
                              <span className="text-xs text-text-secondary ml-1">
                                ({course.reviewCount})
                              </span>
                            </div>
                            <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                              {formatPrice(course.price)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Contact CTA ───────────────────────────────────── */}
        <Reveal delay={0.1}>
          <Card
            glass
            padding="lg"
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto mb-4 h-14 w-14 rounded-full overflow-hidden">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h2 className="text-xl font-bold text-text-primary">
              Schedule a Session with {teacher.name.split(' ').pop()}
            </h2>
            <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto">
              Interested in learning from {teacher.name.split(' ')[0]}? Send a message
              to discuss your goals and schedule a personalized session.
            </p>
            <Button
              variant="gradient"
              size="lg"
              className="mt-6"
              onClick={() => setModalOpen(true)}
            >
              <Mail className="h-4 w-4" /> Get in Touch
            </Button>
          </Card>
        </Reveal>
      </div>

      {/* ── Contact Modal ───────────────────────────────────── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); resetForm(); }}
        title={`Message ${teacher.name}`}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Your Name"
            placeholder="John Doe"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            error={errors.name}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            error={errors.email}
          />
          <TextArea
            label="Message"
            placeholder={`Hi ${teacher.name.split(' ')[0]}, I'd like to learn more about…`}
            value={formMessage}
            onChange={(e) => setFormMessage(e.target.value)}
            error={errors.message}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setModalOpen(false); resetForm(); }}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              size="sm"
              loading={sending}
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
