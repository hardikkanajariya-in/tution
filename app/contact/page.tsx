'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Send,
  Twitter, Instagram, Linkedin, Youtube,
  MessageCircle, HelpCircle,
} from 'lucide-react';
import { Button, Card, Input, Reveal } from '@/components/ui';
import { TextArea } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import siteData from '@/data/site.json';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Course Info',
  'Enrollment',
  'Feedback',
  'Other',
] as const;

const socialIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: 'General Inquiry',
  message: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      next.name = 'Name must be at least 2 characters.';
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email))
      next.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = 'Message must be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Message sent! We'll get back within 24 hours.", 'success');
      setForm(initialForm);
      setErrors({});
    }, 1500);
  };

  const { contact, socials } = siteData;

  return (
    <main className="min-h-screen overflow-hidden pb-20">
      {/* ═══ Hero ═══ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden" aria-label="Contact overview">
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-pink bottom-0 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              <span>We&apos;re Here to Help</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-text-primary">Get in</span>{' '}
              <span className="text-gradient">Touch</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Have a question or want to learn more? We&apos;d love to hear from you.
              Fill out the form below and our team will respond promptly.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Contact form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated">
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 to-amber-500" />
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-md">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </div>
                  Send us a Message
                </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />

                  {/* Subject dropdown */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={cn(
                        'w-full rounded-xl border bg-surface-primary dark:bg-surface-secondary px-4 py-2.5 text-sm',
                        'text-text-primary transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
                        'border-gray-200 dark:border-white/10',
                      )}
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <TextArea
                  label="Message"
                  name="message"
                  placeholder="Tell us what you need help with…"
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  loading={loading}
                  className="w-full sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
              </div>
            </div>
          </Reveal>

          {/* Right — Contact info cards */}
          <Reveal className="lg:col-span-2 space-y-5" delay={0.2}>
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
              gradient="from-blue-500 to-cyan-500"
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              value={contact.phone}
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              gradient="from-emerald-500 to-teal-500"
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Address"
              value={contact.address}
              gradient="from-brand-500 to-amber-500"
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Office Hours"
              value="Mon–Sat: 8:00 AM – 8:00 PM"
              gradient="from-violet-500 to-purple-500"
            />

            {/* Social links */}
            <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <div className="rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated p-5">
                <p className="text-sm font-semibold text-text-primary mb-3">
                  Follow us
                </p>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={cn(
                        'p-3 rounded-2xl bg-surface-secondary dark:bg-white/5',
                        'text-text-secondary hover:text-white hover:bg-gradient-to-br hover:from-brand-500 hover:to-amber-500',
                        'transition-all duration-200 shadow-sm hover:shadow-md',
                      )}
                    >
                      {socialIcons[s.platform] ?? <Mail className="h-5 w-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* ── Map placeholder ── */}
        <Reveal delay={0.25}>
          <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-border-primary shadow-elevated">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-amber-500/10 to-brand-600/20" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative h-full flex items-center justify-center text-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-amber-500 text-white shadow-lg mb-4">
                  <MapPin className="w-7 h-7" />
                </div>
                <p className="text-lg font-bold text-text-primary">
                  Our Location
                </p>
                <p className="text-sm text-text-secondary max-w-xs mt-1">
                  {contact.address}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── FAQ quick link CTA ── */}
        <Reveal delay={0.3}>
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-500 to-amber-500 p-8 md:p-12 overflow-hidden text-white text-center">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Have questions?
              </h3>
              <p className="text-white/80 max-w-md mx-auto mt-3">
                Browse our frequently asked questions for quick answers about
                courses, enrollment, and pricing.
              </p>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="mt-8 bg-white text-brand-600 hover:bg-white/90 border-0 shadow-lg">
                  Check our FAQ
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ── Reusable info card ── */
function InfoCard({
  icon,
  title,
  value,
  href,
  gradient = 'from-brand-500 to-amber-500',
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  gradient?: string;
}) {
  const content = href ? (
    <a
      href={href}
      className="text-text-primary hover:text-brand-500 transition-colors"
    >
      {value}
    </a>
  ) : (
    <span className="text-text-primary">{value}</span>
  );

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <div className="rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated p-5 flex items-start gap-4">
        <div className={cn('p-2.5 rounded-xl bg-gradient-to-br text-white shadow-md shrink-0', gradient)}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-text-secondary font-medium">{title}</p>
          <p className="text-sm font-semibold mt-0.5">{content}</p>
        </div>
      </div>
    </motion.div>
  );
}
