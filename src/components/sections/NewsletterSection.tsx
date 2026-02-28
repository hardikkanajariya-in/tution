'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Reveal } from '@/components/ui/Reveal';
import { useToast } from '@/components/ui/Toast';
import homeData from '@/data/home.json';
import { Send, Sparkles } from 'lucide-react';

export function NewsletterSection() {
  const { newsletter, cta } = homeData;
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    addToast('You\'re subscribed! Check your inbox for a welcome email.', 'success');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* CTA band */}
        <Reveal>
          <div className="relative rounded-3xl bg-gradient-brand p-px overflow-hidden">
            <div className="rounded-3xl bg-surface-primary dark:bg-surface-secondary p-10 md:p-16 text-center noise-overlay">
              <Sparkles className="w-10 h-10 mx-auto text-brand-500 mb-4" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                {cta.headline}
              </h2>
              <p className="mt-4 text-text-secondary max-w-xl mx-auto">
                {cta.subtitle}
              </p>
              <div className="mt-8">
                <Link href={cta.buttonHref}>
                  <Button size="lg" variant="gradient">{cta.buttonLabel}</Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Newsletter band */}
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary">
              {newsletter.headline}
            </h3>
            <p className="mt-3 text-text-secondary max-w-lg mx-auto">
              {newsletter.subtitle}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                aria-label="Email address"
              />
              <Button type="submit" variant="gradient" loading={loading}>
                <Send className="w-4 h-4" />
                {newsletter.buttonLabel}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
