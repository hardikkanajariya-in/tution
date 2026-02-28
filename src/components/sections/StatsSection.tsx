'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import homeData from '@/data/home.json';

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const numericMatch = value.match(/^([\d,]+)/);
  const suffix = value.replace(/^[\d,]+/, '');
  const target = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ''), 10) : 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !target) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  if (!numericMatch) return <span>{value}</span>;
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {homeData.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <Card glass className="text-center">
                <motion.p
                  className="text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-brand"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <AnimatedValue value={stat.value} inView={inView} />
                </motion.p>
                <p className="mt-2 text-sm text-text-secondary font-medium">
                  {stat.label}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
