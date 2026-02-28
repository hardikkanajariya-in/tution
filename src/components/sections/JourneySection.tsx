'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import homeData from '@/data/home.json';
import { motion } from 'framer-motion';

export function JourneySection() {
  const { learningJourney } = homeData;

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
              Your Learning <span className="text-gradient">Journey</span>
            </h2>
            <p className="mt-3 text-text-secondary">
              Five simple steps from enrollment to excellence.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-brand-200 dark:bg-brand-300" />

          <div className="space-y-10 md:space-y-0">
            {learningJourney.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={item.step} delay={i * 0.12}>
                  <div
                    className={cn(
                      'relative md:grid md:grid-cols-2 md:gap-12 md:py-6',
                      isLeft ? 'md:text-right' : ''
                    )}
                  >
                    {/* Content */}
                    <div
                      className={cn(
                        isLeft ? 'md:col-start-1' : 'md:col-start-2'
                      )}
                    >
                      <Card glass className="inline-block w-full md:max-w-md">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                            whileHover={{ scale: 1.15 }}
                          >
                            {item.step}
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-text-primary text-lg">
                              {item.title}
                            </h3>
                            <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Center dot (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-500 border-4 border-surface-secondary" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
