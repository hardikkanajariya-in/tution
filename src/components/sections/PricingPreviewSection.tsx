'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import pricingData from '@/data/pricing.json';
import { Check, X } from 'lucide-react';

export function PricingPreviewSection() {
  const { plans } = pricingData;

  return (
    <section className="section-padding bg-surface-secondary" aria-label="Pricing plans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="section-heading">
            <h2 className="text-balance">
              Simple, Transparent <span className="text-brand-600 dark:text-brand-400">Pricing</span>
            </h2>
            <p>
              Pick the plan that fits your learning goals. Upgrade anytime.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ rotateY: -4, rotateX: 3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className={cn('perspective-container h-full', plan.highlighted && 'z-10')}
              >
                <Card
                  className={cn(
                    'h-full flex flex-col relative',
                    plan.highlighted && 'ring-2 ring-brand-500 shadow-brand'
                  )}
                  padding="lg"
                >
                  {plan.highlighted && (
                    <Badge variant="brand" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                    <p className="text-sm text-text-secondary mt-1">{plan.description}</p>
                    <p className="mt-4">
                      <span className="text-4xl font-extrabold text-text-primary">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-text-muted text-sm ml-1">/{plan.period.replace('per ', '')}</span>
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2 text-sm">
                        {f.included ? (
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                        ) : (
                          <X className="w-4 h-4 text-text-muted mt-0.5 shrink-0" aria-hidden="true" />
                        )}
                        <span className={cn(f.included ? 'text-text-primary' : 'text-text-muted')}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link href="/pricing" className="block">
                      <Button
                        variant={plan.highlighted ? 'gradient' : 'outline'}
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
