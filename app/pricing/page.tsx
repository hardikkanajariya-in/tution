'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Crown, ArrowRight, HelpCircle } from 'lucide-react';
import { Button, Card, Badge, Accordion, Modal, Input, Reveal } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import pricingData from '@/data/pricing.json';

const planIcons: Record<string, React.ReactNode> = {
  starter: <Zap className="h-6 w-6" />,
  pro: <Crown className="h-6 w-6" />,
  elite: <Shield className="h-6 w-6" />,
};

export default function PricingPage() {
  const { plans, comparisonTable, billingFaqs } = pricingData;
  const { addToast } = useToast();

  const [annual, setAnnual] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  const getPrice = (price: number) => {
    const p = annual ? Math.round(price * 12 * 0.8) : price;
    return `$${p}`;
  };

  const handleEnroll = (planName: string) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      addToast('Please fill in all fields.', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setModalOpen(false);
      setFormData({ name: '', email: '' });
      addToast(`Enrolled in ${selectedPlan} plan! We'll be in touch.`, 'success');
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-surface-primary">
      {/* Header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary">
                Simple, Transparent <span className="text-gradient">Pricing</span>
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Pick the plan that fits your learning goals. No hidden fees, cancel anytime.
              </p>
            </div>
          </Reveal>

          {/* Billing Toggle */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-3 mt-10">
              <span className={cn('text-sm font-medium', !annual ? 'text-text-primary' : 'text-text-muted')}>
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={cn(
                  'relative w-14 h-7 rounded-full transition-colors duration-300',
                  annual ? 'bg-brand-500' : 'bg-surface-tertiary'
                )}
                aria-label="Toggle annual billing"
              >
                <motion.div
                  layout
                  className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: annual ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={cn('text-sm font-medium', annual ? 'text-text-primary' : 'text-text-muted')}>
                Annual
              </span>
              {annual && (
                <Badge variant="success" size="sm">Save 20%</Badge>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, i) => {
              const isPopular = plan.highlighted;
              return (
                <Reveal key={plan.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className={cn('h-full', isPopular && 'z-10')}
                  >
                    <div
                      className={cn(
                        'h-full rounded-2xl',
                        isPopular && 'p-[2px] bg-gradient-to-br from-brand-400 via-purple-500 to-pink-500'
                      )}
                    >
                      <Card
                        className={cn(
                          'h-full flex flex-col relative',
                          isPopular && 'shadow-brand !rounded-[14px]'
                        )}
                        padding="lg"
                      >
                        {isPopular && (
                          <Badge variant="brand" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-md">
                            Most Popular
                          </Badge>
                        )}

                        <div className="text-center mb-6">
                          <div className={cn(
                            'inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4',
                            isPopular
                              ? 'bg-gradient-to-br from-brand-400 to-purple-500 text-white'
                              : 'bg-surface-tertiary text-brand-500'
                          )}>
                            {planIcons[plan.id] ?? <Zap className="h-6 w-6" />}
                          </div>
                          <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                          <p className="text-sm text-text-secondary mt-1">{plan.description}</p>

                          <div className="mt-5">
                            <span className="text-4xl font-extrabold text-text-primary">
                              {getPrice(plan.price)}
                            </span>
                            <span className="text-text-muted text-sm ml-1">
                              /{annual ? 'year' : 'month'}
                            </span>
                          </div>
                          {annual && (
                            <p className="text-xs text-text-muted mt-1 line-through">
                              ${plan.price * 12}/year
                            </p>
                          )}
                        </div>

                        <ul className="space-y-3 flex-1">
                          {plan.features.map((f) => (
                            <li key={f.text} className="flex items-start gap-2.5 text-sm">
                              {f.included ? (
                                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              ) : (
                                <X className="w-4 h-4 text-text-muted/50 mt-0.5 shrink-0" />
                              )}
                              <span className={cn(f.included ? 'text-text-primary' : 'text-text-muted line-through')}>
                                {f.text}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8">
                          <Button
                            variant={isPopular ? 'gradient' : 'outline'}
                            className="w-full"
                            size="lg"
                            onClick={() => handleEnroll(plan.name)}
                          >
                            {plan.cta}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-surface-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                Compare <span className="text-gradient">Plans</span>
              </h2>
              <p className="mt-3 text-text-secondary">See exactly what you get with each plan.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="overflow-hidden" padding="none">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="sticky top-0 bg-surface-tertiary/80 backdrop-blur-sm border-b border-white/10 dark:border-white/5">
                      {comparisonTable.headers.map((h, idx) => (
                        <th
                          key={h}
                          className={cn(
                            'px-5 py-4 font-semibold text-text-primary whitespace-nowrap',
                            idx === 0 ? 'text-left' : 'text-center'
                          )}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={cn(
                          'border-b border-white/5 transition-colors hover:bg-surface-tertiary/40',
                          rIdx % 2 === 0 ? 'bg-transparent' : 'bg-surface-secondary/50'
                        )}
                      >
                        {row.map((cell, cIdx) => {
                          const isCheck = cell === '✓';
                          const isDash = cell === '—';
                          return (
                            <td
                              key={cIdx}
                              className={cn(
                                'px-5 py-3.5',
                                cIdx === 0 ? 'text-left font-medium text-text-primary' : 'text-center'
                              )}
                            >
                              {isCheck ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : isDash ? (
                                <X className="w-4 h-4 text-text-muted/40 mx-auto" />
                              ) : (
                                <span className={cn(cIdx === 0 ? '' : 'text-text-secondary')}>{cell}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="text-center bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/30 dark:to-purple-950/20 border-brand-200 dark:border-brand-800/40" padding="lg">
              <HelpCircle className="w-10 h-10 text-brand-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-text-primary">Need a Custom Plan?</h3>
              <p className="mt-2 text-text-secondary max-w-md mx-auto">
                Have specific requirements or need a plan for a school/institution? Let&apos;s talk.
              </p>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="gradient" size="lg">
                    Contact Us <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Billing FAQs */}
      <section className="py-16 md:py-24 bg-surface-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                Billing <span className="text-gradient">FAQ</span>
              </h2>
              <p className="mt-3 text-text-secondary">Common questions about plans and billing.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Accordion items={billingFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Money-back Guarantee Banner */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
                <Shield className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">14-Day Money-Back Guarantee</h3>
                <p className="text-text-secondary text-sm mt-1">
                  Not satisfied? Get a full refund within 14 days — no questions asked.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enrollment Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Enroll in ${selectedPlan}`} size="sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <div className="pt-1">
            <Card className="!p-3 bg-surface-tertiary/50" padding="none">
              <p className="text-xs text-text-muted">
                Selected plan: <span className="font-semibold text-text-primary">{selectedPlan}</span>
                {' · '}
                Billed {annual ? 'annually' : 'monthly'}
              </p>
            </Card>
          </div>
          <Button type="submit" variant="gradient" className="w-full" size="lg" loading={submitting}>
            Confirm Enrollment
          </Button>
        </form>
      </Modal>
    </main>
  );
}
