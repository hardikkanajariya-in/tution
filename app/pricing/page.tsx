'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Crown, ArrowRight, HelpCircle, Sparkles, IndianRupee } from 'lucide-react';
import { Button, Card, Badge, Accordion, Modal, Input, Reveal } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import pricingData from '@/data/pricing.json';

const planIcons: Record<string, React.ReactNode> = {
  starter: <Zap className="h-6 w-6" />,
  pro: <Crown className="h-6 w-6" />,
  elite: <Shield className="h-6 w-6" />,
};

const planGradients: Record<string, string> = {
  starter: 'from-sky-500 to-blue-600',
  pro: 'from-brand-500 to-amber-500',
  elite: 'from-violet-500 to-purple-600',
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
    return `₹${p.toLocaleString('en-IN')}`;
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
    <main className="min-h-screen overflow-hidden">
      {/* ═══ Hero ═══ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden" aria-label="Pricing overview">
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-pink bottom-0 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
                <IndianRupee className="w-4 h-4" />
                <span>Transparent Pricing · No Hidden Fees</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
                <span className="text-text-primary">Plans That Fit</span>
                <br />
                <span className="text-gradient">Every Learner</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Pick the plan that fits your learning goals. No hidden fees, cancel anytime.
              </p>
            </div>
          </Reveal>

          {/* Billing Toggle */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-4 mt-10">
              <span className={cn('text-sm font-semibold transition-colors', !annual ? 'text-text-primary' : 'text-text-muted')}>
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={cn(
                  'relative w-16 h-8 rounded-full transition-colors duration-300 shadow-inner',
                  annual ? 'bg-brand-500' : 'bg-surface-tertiary'
                )}
                aria-label="Toggle annual billing"
              >
                <motion.div
                  layout
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: annual ? 32 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={cn('text-sm font-semibold transition-colors', annual ? 'text-text-primary' : 'text-text-muted')}>
                Annual
              </span>
              {annual && (
                <Badge variant="success" size="sm" className="animate-in fade-in-0 zoom-in-95">
                  <Sparkles className="w-3 h-3 mr-0.5" /> Save 20%
                </Badge>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Pricing Cards ═══ */}
      <section className="pb-20 md:pb-28" aria-label="Pricing plans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {plans.map((plan, i) => {
              const isPopular = plan.highlighted;
              const gradient = planGradients[plan.id] ?? 'from-brand-500 to-amber-500';
              return (
                <Reveal key={plan.id} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className={cn('h-full', isPopular && 'z-10 md:-mt-4 md:mb-[-16px]')}
                  >
                    <div
                      className={cn(
                        'h-full rounded-3xl overflow-hidden',
                        isPopular
                          ? 'p-[2.5px] bg-gradient-to-br from-brand-400 via-brand-500 to-amber-500 shadow-xl shadow-brand-500/20'
                          : ''
                      )}
                    >
                      <div className={cn(
                        'h-full flex flex-col relative rounded-3xl overflow-hidden',
                        'bg-surface-primary dark:bg-surface-secondary',
                        !isPopular && 'border border-border-primary shadow-elevated'
                      )}>
                        {/* Gradient Header Band */}
                        <div className={cn('h-2 w-full bg-gradient-to-r', gradient)} />

                        {isPopular && (
                          <div className="absolute top-5 right-4">
                            <Badge variant="brand" className="shadow-md">
                              <Sparkles className="w-3 h-3 mr-1" /> Most Popular
                            </Badge>
                          </div>
                        )}

                        <div className="px-6 pt-6 pb-0 text-center">
                          <div className={cn(
                            'inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br text-white shadow-lg',
                            gradient
                          )}>
                            {planIcons[plan.id] ?? <Zap className="h-6 w-6" />}
                          </div>
                          <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                          <p className="text-sm text-text-secondary mt-1.5">{plan.description}</p>

                          <div className="mt-6 pb-6 border-b border-border-primary">
                            <motion.span
                              key={`${plan.id}-${annual}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-4xl lg:text-5xl font-extrabold text-text-primary"
                            >
                              {getPrice(plan.price)}
                            </motion.span>
                            <span className="text-text-muted text-sm ml-1.5">
                              /{annual ? 'year' : 'month'}
                            </span>
                            {annual && (
                              <p className="text-xs text-text-muted mt-1 line-through">
                                ₹{(plan.price * 12).toLocaleString('en-IN')}/year
                              </p>
                            )}
                          </div>
                        </div>

                        <ul className="space-y-3 flex-1 px-6 pt-6">
                          {plan.features.map((f) => (
                            <li key={f.text} className="flex items-start gap-3 text-sm">
                              {f.included ? (
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-surface-tertiary shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-text-muted/50" />
                                </div>
                              )}
                              <span className={cn(
                                f.included ? 'text-text-primary' : 'text-text-muted line-through',
                                'leading-snug'
                              )}>
                                {f.text}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="px-6 pb-6 pt-8">
                          <Button
                            variant={isPopular ? 'gradient' : 'outline'}
                            className="w-full"
                            size="lg"
                            onClick={() => handleEnroll(plan.name)}
                          >
                            {plan.cta}
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Comparison Table ═══ */}
      <section className="py-20 md:py-28 bg-surface-secondary" aria-label="Compare plans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-4">
                Feature Breakdown
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
                Compare <span className="text-gradient">Plans</span>
              </h2>
              <p className="mt-3 text-text-secondary">See exactly what you get with each plan.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl overflow-hidden border border-border-primary shadow-elevated">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-brand-500/10 via-brand-400/5 to-transparent border-b border-border-primary">
                      {comparisonTable.headers.map((h, idx) => (
                        <th
                          key={h}
                          className={cn(
                            'px-6 py-5 font-bold text-text-primary whitespace-nowrap',
                            idx === 0 ? 'text-left' : 'text-center'
                          )}
                        >
                          {idx > 0 && (
                            <span className="block text-xs text-brand-500 font-medium mb-1">
                              {idx === 1 ? '⚡' : idx === 2 ? '👑' : '🛡️'}
                            </span>
                          )}
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
                          'border-b border-border-primary/50 transition-colors hover:bg-brand-50/30 dark:hover:bg-brand-950/20',
                          rIdx % 2 === 0 ? 'bg-transparent' : 'bg-surface-secondary/40'
                        )}
                      >
                        {row.map((cell, cIdx) => {
                          const isCheck = cell === '✓';
                          const isDash = cell === '—';
                          return (
                            <td
                              key={cIdx}
                              className={cn(
                                'px-6 py-4',
                                cIdx === 0 ? 'text-left font-medium text-text-primary' : 'text-center'
                              )}
                            >
                              {isCheck ? (
                                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30">
                                  <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                </div>
                              ) : isDash ? (
                                <X className="w-4 h-4 text-text-muted/30 mx-auto" />
                              ) : (
                                <span className={cn(cIdx === 0 ? '' : 'text-text-secondary font-medium')}>{cell}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Custom Plan CTA Banner ═══ */}
      <section className="py-20 md:py-24" aria-label="Custom plan">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-brand-500 to-amber-500 p-8 md:p-12 overflow-hidden text-white text-center">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mx-auto mb-5">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Need a Custom Plan?</h3>
                <p className="mt-3 text-white/80 max-w-md mx-auto">
                  Have specific requirements or need a plan for a school/institution? Let&apos;s talk.
                </p>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-white/90 border-0 shadow-lg">
                      Contact Us <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Billing FAQs ═══ */}
      <section className="py-20 md:py-28 bg-surface-secondary" aria-label="Billing FAQ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-4">
                Got Questions?
              </div>
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

      {/* ═══ Money-back Guarantee ═══ */}
      <section className="py-16 md:py-20" aria-label="Money-back guarantee">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="glass rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left border border-border-primary shadow-elevated">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shrink-0 shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">14-Day Money-Back Guarantee</h3>
                <p className="text-text-secondary text-sm mt-1.5 max-w-md">
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
