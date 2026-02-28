'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';
import homeData from '@/data/home.json';

export function PartnersSection() {
  const { partners } = homeData;
  const doubled = [...partners, ...partners];

  return (
    <section className="section-padding-sm overflow-hidden" aria-label="Trusted partners">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium text-text-muted uppercase tracking-wider mb-10">
            Trusted by leading education organizations
          </p>
        </Reveal>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <motion.div
          className="flex items-center gap-20 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center h-12 opacity-50 hover:opacity-100 transition-opacity duration-250 ease-out grayscale hover:grayscale-0"
            >
              <span className="text-lg font-bold tracking-wide text-text-primary whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
