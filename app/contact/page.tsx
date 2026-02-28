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
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* ── Header ── */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-balance">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-lg">
              Have a question or want to learn more? We&apos;d love to hear from you.
              Fill out the form below and our team will respond promptly.
            </p>
          </div>
        </Reveal>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Contact form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <Card glass className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-brand-500" aria-hidden="true" />
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
            </Card>
          </Reveal>

          {/* Right — Contact info cards */}
          <Reveal className="lg:col-span-2 space-y-5" delay={0.2}>
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              value={contact.phone}
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Address"
              value={contact.address}
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Office Hours"
              value="Mon–Sat: 8:00 AM – 8:00 PM"
            />

            {/* Social links */}
            <Card glass className="p-5">
              <p className="text-sm font-medium text-text-secondary mb-3">
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
                      'p-2.5 rounded-xl bg-surface-secondary dark:bg-white/5',
                      'text-text-secondary hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10',
                      'transition-colors duration-200',
                    )}
                  >
                    {socialIcons[s.platform] ?? <Mail className="h-5 w-5" />}
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>

        {/* ── Map placeholder ── */}
        <Reveal delay={0.25}>
          <div
            className={cn(
              'relative w-full h-64 rounded-2xl overflow-hidden',
              'bg-gradient-to-br from-brand-400/20 via-brand-500/10 to-brand-600/20',
              'border border-white/10 dark:border-white/5',
              'flex items-center justify-center',
            )}
          >
            <div className="text-center space-y-2">
              <span className="text-4xl">📍</span>
              <p className="text-lg font-semibold text-text-primary">
                Our Location
              </p>
              <p className="text-sm text-text-secondary max-w-xs">
                {contact.address}
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── FAQ quick link ── */}
        <Reveal delay={0.3}>
          <Card glass className="p-6 md:p-8 text-center space-y-4">
            <HelpCircle className="h-8 w-8 text-brand-500 mx-auto" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-text-primary">
              Have questions?
            </h3>
            <p className="text-text-secondary max-w-md mx-auto">
              Browse our frequently asked questions for quick answers about
              courses, enrollment, and pricing.
            </p>
            <Link href="/pricing">
              <Button variant="outline" size="md" className="mt-2">
                Check our FAQ
              </Button>
            </Link>
          </Card>
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
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
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
    <Card glass className="p-5 flex items-start gap-4">
      <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="text-sm font-medium mt-0.5">{content}</p>
      </div>
    </Card>
  );
}
