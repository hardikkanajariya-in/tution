'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import homeData from '@/data/home.json';

export function HeroSection() {
  const { hero } = homeData;

  return (
    <section className="relative overflow-hidden py-24 md:py-36 lg:py-44" aria-label="Hero">
      {/* Floating blobs — decorative only */}
      <div className="floating-blob w-72 h-72 bg-brand-400 top-10 -left-20" aria-hidden="true" />
      <div className="floating-blob w-96 h-96 bg-accent-pink top-40 -right-32" style={{ animationDelay: '2s' }} aria-hidden="true" />
      <div className="floating-blob w-64 h-64 bg-accent-blue bottom-10 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="max-w-xl">
              {/* Visual hierarchy: largest text first, clear CTA */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
                <span className="text-text-primary">{hero.headline}</span>
                <br />
                <span className="text-gradient">{hero.headlineAccent}</span>
              </h1>
              <p className="mt-7 text-lg text-text-secondary leading-relaxed max-w-lg">
                {hero.subtitle}
              </p>
              {/* Fitts's Law: Large, obvious CTAs with strong visual weight */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={hero.ctaPrimary.href}>
                  <Button size="lg" variant="gradient">{hero.ctaPrimary.label}</Button>
                </Link>
                <Link href={hero.ctaSecondary.href}>
                  <Button size="lg" variant="outline">{hero.ctaSecondary.label}</Button>
                </Link>
              </div>
              {/* Social proof — proximity with CTAs */}
              <div className="mt-10 flex flex-wrap gap-2.5">
                {hero.trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-surface-secondary dark:bg-surface-tertiary text-text-secondary border border-gray-100 dark:border-white/5"
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
                whileHover={{ rotateY: -6, rotateX: 4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative"
              >
                {/* Hero Image Card */}
                <div className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-brand p-[2px] shadow-elevated">
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img
                      src={hero.heroImage}
                      alt="Students collaborating in a bright, modern classroom at PrismTutor Studio"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
                {/* Stacked cards behind — depth cue */}
                <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl bg-brand-200 dark:bg-brand-300 opacity-50" aria-hidden="true" />
                <div className="absolute inset-0 -z-20 translate-x-8 translate-y-8 rounded-3xl bg-brand-100 dark:bg-brand-200 opacity-30" aria-hidden="true" />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
