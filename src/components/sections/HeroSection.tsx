'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import homeData from '@/data/home.json';

export function HeroSection() {
  const { hero } = homeData;

  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      {/* Floating blobs */}
      <div className="floating-blob w-72 h-72 bg-brand-400 top-10 -left-20" />
      <div className="floating-blob w-96 h-96 bg-accent-pink top-40 -right-32 animation-delay-2000" style={{ animationDelay: '2s' }} />
      <div className="floating-blob w-64 h-64 bg-accent-blue bottom-10 left-1/3" style={{ animationDelay: '4s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-text-primary">{hero.headline}</span>
                <br />
                <span className="text-gradient">{hero.headlineAccent}</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={hero.ctaPrimary.href}>
                  <Button size="lg" variant="gradient">{hero.ctaPrimary.label}</Button>
                </Link>
                <Link href={hero.ctaSecondary.href}>
                  <Button size="lg" variant="outline">{hero.ctaSecondary.label}</Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {hero.trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-surface-secondary dark:bg-surface-tertiary text-text-secondary"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="perspective-container hidden lg:block">
              <motion.div
                whileHover={{ rotateY: -8, rotateX: 5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative"
              >
                {/* 3D Card Stack */}
                <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-brand p-[2px]">
                  <div className="w-full h-full rounded-3xl bg-surface-primary dark:bg-surface-secondary flex items-center justify-center noise-overlay">
                    <div className="text-center p-12">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center mb-6">
                        <span className="text-3xl font-bold text-white">P</span>
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary">PrismTutor Studio</h3>
                      <p className="text-text-secondary mt-2">Where learning meets design</p>
                    </div>
                  </div>
                </div>
                {/* Stacked cards behind */}
                <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl bg-brand-200 dark:bg-brand-300 opacity-50" />
                <div className="absolute inset-0 -z-20 translate-x-8 translate-y-8 rounded-3xl bg-brand-100 dark:bg-brand-200 opacity-30" />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
