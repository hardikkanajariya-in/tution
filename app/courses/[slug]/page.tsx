'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Users, BookOpen, Monitor, MapPin, ChevronRight,
  Check, Play, Calendar, ArrowLeft,
} from 'lucide-react';
import { Button, Card, Badge, Accordion, Modal, Input, Reveal } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { cn, formatPrice, getInitials } from '@/lib/utils';
import coursesData from '@/data/courses.json';
import teachersData from '@/data/teachers.json';

/* ── Gradient map for course hero backgrounds ───────────────── */
const CATEGORY_GRADIENTS: Record<string, string> = {
  Mathematics: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  Physics: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
  Chemistry: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  Biology: 'linear-gradient(135deg, #84cc16 0%, #22c55e 100%)',
  English: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
  'Computer Science': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  Commerce: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
};

const MODE_ICONS: Record<string, typeof Monitor> = {
  online: Monitor,
  offline: MapPin,
  hybrid: Play,
};

/* ── Helper: render star rating ─────────────────────────────── */
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
export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToast } = useToast();

  const course = coursesData.find((c) => c.slug === slug);
  const teacher = course ? teachersData.find((t) => t.slug === course.teacherSlug) : null;

  /* Derived values */
  const lessonsCount = course?.syllabus.reduce((sum, m) => sum + m.topics.length, 0) ?? 0;
  const originalPrice = course ? Math.round(course.price * 1.3) : 0;
  const discount = course ? Math.round(((originalPrice - course.price) / originalPrice) * 100) : 0;
  const enrolledCount = course ? course.popularity * 52 : 0;

  const relatedCourses = useMemo(
    () =>
      course
        ? coursesData.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, 3)
        : [],
    [course],
  );

  /* ── Enrollment modal state ───────────────────────────────── */
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollStep, setEnrollStep] = useState(1);
  const [enrollMode, setEnrollMode] = useState<string>(course?.mode ?? 'online');
  const [enrollBatch, setEnrollBatch] = useState('');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetEnroll = () => {
    setEnrollStep(1);
    setEnrollMode(course?.mode ?? 'online');
    setEnrollBatch('');
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormErrors({});
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formName.trim()) errors.name = 'Name is required';
    if (!formEmail.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) errors.email = 'Enter a valid email';
    if (!formPhone.trim()) errors.phone = 'Phone is required';
    else if (!/^\+?[\d\s-]{7,15}$/.test(formPhone)) errors.phone = 'Enter a valid phone number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEnrollSubmit = () => {
    if (!validateStep2()) return;
    setEnrollStep(3);
    addToast('Enrollment submitted successfully!', 'success');
  };

  /* ── Not-found state ──────────────────────────────────────── */
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl"
        >
          📚
        </motion.div>
        <h1 className="text-2xl font-bold text-text-primary">Course Not Found</h1>
        <p className="text-text-secondary text-center max-w-md">
          The course you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link href="/courses">
          <Button variant="gradient" size="lg">
            <ArrowLeft size={18} /> Browse All Courses
          </Button>
        </Link>
      </div>
    );
  }

  const ModeIcon = MODE_ICONS[course.mode] ?? Monitor;
  const heroGradient = CATEGORY_GRADIENTS[course.category] ?? CATEGORY_GRADIENTS.Mathematics;

  /* ── Syllabus items for Accordion ─────────────────────────── */
  const syllabusItems = course.syllabus.map((mod) => ({
    question: mod.module,
    answer: mod.topics.map((t) => `• ${t}`).join('\n'),
  }));

  const faqItems = course.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <main className="min-h-screen bg-surface-primary dark:bg-[#0a0a1a]">
      {/* ── Breadcrumbs ──────────────────────────────────────── */}
      <Reveal>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-text-muted">
            <li><Link href="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
            <ChevronRight size={14} />
            <li><Link href="/courses" className="hover:text-brand-500 transition-colors">Courses</Link></li>
            <ChevronRight size={14} />
            <li className="text-text-primary font-medium truncate max-w-[200px]">{course.title}</li>
          </ol>
        </nav>
      </Reveal>

      {/* ── Hero / Header ────────────────────────────────────── */}
      <Reveal>
        <section
          className="relative overflow-hidden rounded-none sm:rounded-3xl max-w-7xl mx-auto sm:mx-6 lg:mx-auto mt-2 mb-8"
          style={{ background: heroGradient }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="relative z-10 px-6 sm:px-10 py-14 md:py-20 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="brand" size="md">{course.category}</Badge>
              <Badge variant="outline" size="md" className="border-white/40 text-white">
                <ModeIcon size={14} className="mr-1" /> {course.mode}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {course.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-6 max-w-2xl">{course.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1.5">
                <Stars rating={course.rating} size={16} />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-white/60">({course.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5"><Users size={16} /> {enrolledCount.toLocaleString()} enrolled</span>
              <span className="flex items-center gap-1.5"><Clock size={16} /> {course.duration}</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── LEFT COLUMN (2/3) ──────────────────────────────── */}
        <div className="lg:col-span-2 space-y-10">
          {/* About */}
          <Reveal>
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">About This Course</h2>
              <p className="text-text-secondary leading-relaxed">{course.description}</p>
            </section>
          </Reveal>

          {/* What You'll Learn */}
          <Reveal delay={0.05}>
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">What You&apos;ll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-surface-tertiary"
                  >
                    <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                      <Check size={12} className="text-brand-600 dark:text-brand-400" />
                    </span>
                    <span className="text-text-primary text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Syllabus */}
          <Reveal delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Syllabus</h2>
              <div className="space-y-3">
                {course.syllabus.map((mod, i) => (
                  <SyllabusModule key={i} module={mod} index={i} />
                ))}
              </div>
            </section>
          </Reveal>

          {/* Schedule */}
          <Reveal delay={0.15}>
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Weekly Schedule</h2>
              <Card glass className="overflow-hidden" padding="none">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 dark:border-white/5 bg-surface-secondary dark:bg-surface-tertiary">
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Day</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Time</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.weeklySchedule.map((s, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-0 border-white/5 hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors"
                      >
                        <td className="px-5 py-3 text-text-primary font-medium flex items-center gap-2">
                          <Calendar size={14} className="text-brand-500" /> {s.day}
                        </td>
                        <td className="px-5 py-3 text-text-secondary">{s.time}</td>
                        <td className="px-5 py-3">
                          <Badge variant={s.type === 'Lecture' ? 'brand' : s.type.includes('Test') ? 'warning' : 'success'} size="sm">
                            {s.type}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          </Reveal>

          {/* FAQs */}
          <Reveal delay={0.2}>
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
              <Accordion items={faqItems} />
            </section>
          </Reveal>
        </div>

        {/* ── RIGHT COLUMN (1/3) — sticky sidebar ────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Price card */}
            <Reveal direction="right">
              <Card glass className="overflow-hidden">
                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-text-primary">{formatPrice(course.price)}</span>
                    <span className="text-lg text-text-muted line-through">{formatPrice(originalPrice)}</span>
                    <Badge variant="success" size="sm">{discount}% OFF</Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-1">per course · one-time payment</p>
                </div>

                {/* CTAs */}
                <div className="space-y-3 mb-6">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    onClick={() => { resetEnroll(); setEnrollOpen(true); }}
                  >
                    Enroll Now
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Book a Free Demo
                  </Button>
                </div>

                {/* Quick facts */}
                <div className="space-y-3 pt-4 border-t border-white/10 dark:border-white/5">
                  {[
                    { icon: Clock, label: 'Duration', value: course.duration },
                    { icon: BookOpen, label: 'Lessons', value: `${lessonsCount} topics` },
                    { icon: ModeIcon, label: 'Mode', value: course.mode.charAt(0).toUpperCase() + course.mode.slice(1) },
                    { icon: Users, label: 'Grade', value: course.gradeLevel },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      <span className="h-8 w-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                        <Icon size={16} className="text-brand-600 dark:text-brand-400" />
                      </span>
                      <div>
                        <p className="text-text-muted text-xs">{label}</p>
                        <p className="text-text-primary font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>

            {/* Instructor card */}
            {teacher && (
              <Reveal direction="right" delay={0.1}>
                <Card glass>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Instructor</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(teacher.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{teacher.name}</p>
                      <p className="text-xs text-text-muted">{teacher.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">{teacher.bio}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {teacher.rating}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {teacher.studentCount.toLocaleString()} students</span>
                  </div>
                </Card>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* ── Related courses ──────────────────────────────────── */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <Reveal>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Related Courses</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((rc, i) => (
              <Reveal key={rc.slug} delay={i * 0.08}>
                <Link href={`/courses/${rc.slug}`}>
                  <Card tilt className="group cursor-pointer hover:shadow-elevated transition-shadow h-full">
                    <div
                      className="h-36 rounded-xl mb-4 relative overflow-hidden"
                      style={{ background: CATEGORY_GRADIENTS[rc.category] ?? CATEGORY_GRADIENTS.Mathematics }}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="brand" size="sm">{rc.category}</Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1 group-hover:text-brand-500 transition-colors">
                      {rc.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2 mb-3">{rc.subtitle}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-text-primary">{formatPrice(rc.price)}</span>
                      <span className="flex items-center gap-1 text-text-muted">
                        <Star size={14} className="fill-amber-400 text-amber-400" /> {rc.rating}
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Enrollment Modal ─────────────────────────────────── */}
      <Modal
        isOpen={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        title={enrollStep === 3 ? undefined : `Enroll — ${course.title}`}
        size="lg"
      >
        <AnimatePresence mode="wait">
          {/* ── Step 1: Mode & Batch ───────────────────────────── */}
          {enrollStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-text-secondary text-sm mb-5">Choose your preferred mode and batch timing.</p>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-text-primary">Mode</p>
                {['online', 'offline', 'hybrid'].map((m) => {
                  const I = MODE_ICONS[m] ?? Monitor;
                  return (
                    <label
                      key={m}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all',
                        enrollMode === m
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                          : 'border-white/10 dark:border-white/5 hover:border-brand-300',
                      )}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value={m}
                        checked={enrollMode === m}
                        onChange={() => setEnrollMode(m)}
                        className="accent-brand-500"
                      />
                      <I size={16} className="text-brand-500" />
                      <span className="text-sm text-text-primary capitalize">{m}</span>
                    </label>
                  );
                })}
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-text-primary mb-2">Preferred Batch</p>
                <select
                  value={enrollBatch}
                  onChange={(e) => setEnrollBatch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-surface-primary dark:bg-surface-secondary px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select a batch</option>
                  {course.weeklySchedule.map((s, i) => (
                    <option key={i} value={`${s.day} ${s.time}`}>
                      {s.day} · {s.time} ({s.type})
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="gradient" className="w-full" onClick={() => setEnrollStep(2)}>
                Continue
              </Button>
            </motion.div>
          )}

          {/* ── Step 2: Contact details ────────────────────────── */}
          {enrollStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-text-secondary text-sm mb-5">Fill in your details to complete enrollment.</p>
              <div className="space-y-4 mb-6">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  error={formErrors.name}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  error={formErrors.email}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  error={formErrors.phone}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setEnrollStep(1)}>
                  Back
                </Button>
                <Button variant="gradient" className="flex-1" onClick={handleEnrollSubmit}>
                  Submit Enrollment
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Success ─────────────────────────────────── */}
          {enrollStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-xl font-bold text-text-primary mb-2">You&apos;re Enrolled!</h3>
              <p className="text-text-secondary text-sm mb-1">
                Welcome to <span className="font-semibold text-brand-500">{course.title}</span>
              </p>
              <p className="text-text-muted text-xs mb-6">
                A confirmation has been sent to <span className="font-medium">{formEmail}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-text-muted">
                <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  {enrollMode.charAt(0).toUpperCase() + enrollMode.slice(1)}
                </span>
                {enrollBatch && (
                  <span className="px-3 py-1 rounded-full bg-surface-secondary dark:bg-surface-tertiary text-text-secondary">
                    {enrollBatch}
                  </span>
                )}
              </div>
              <Button variant="gradient" className="mt-6" onClick={() => setEnrollOpen(false)}>
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </main>
  );
}

/* ── Syllabus module sub-component ──────────────────────────── */
function SyllabusModule({ module: mod, index }: { module: (typeof coursesData)[number]['syllabus'][number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 dark:border-white/5 bg-surface-primary dark:bg-surface-secondary overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-4 md:p-5 text-left hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 text-xs font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-medium text-text-primary">{mod.module}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted hidden sm:inline">{mod.topics.length} topics</span>
          <ChevronRight
            className={cn('h-5 w-5 text-text-muted transition-transform duration-200', open && 'rotate-90')}
          />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="px-4 pb-4 md:px-5 md:pb-5 space-y-2">
              {mod.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Play size={12} className="text-brand-500 flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
