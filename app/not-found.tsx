'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BookOpen } from 'lucide-react';
import { Button, Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';

/* ─── Floating Decorative Blob ───────────────────── */
function Blob({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl opacity-30', className)}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ─── Floating Shape ─────────────────────────────── */
function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn('absolute', className)}
      animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* ─── Background ──────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary" />
      <Blob className="w-80 h-80 bg-brand-400 top-10 -left-20" delay={0} />
      <Blob className="w-96 h-96 bg-purple-400 bottom-10 -right-20" delay={2} />
      <Blob className="w-64 h-64 bg-amber-300 top-1/3 right-1/4" delay={4} />

      {/* ─── Floating Shapes ─────────────────────── */}
      <FloatingShape
        className="top-[15%] left-[12%] w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/30"
        delay={0}
      />
      <FloatingShape
        className="top-[25%] right-[15%] w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30"
        delay={1.5}
      />
      <FloatingShape
        className="bottom-[20%] left-[18%] w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 rotate-12"
        delay={0.8}
      />
      <FloatingShape
        className="bottom-[30%] right-[10%] w-14 h-14 rounded-xl bg-rose-500/15 border border-rose-500/25 -rotate-12"
        delay={2.2}
      />
      <FloatingShape
        className="top-[60%] left-[8%] w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30"
        delay={3}
      />

      {/* ─── Content ─────────────────────────────── */}
      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* 404 Number */}
        <Reveal>
          <motion.h1
            className="text-[10rem] md:text-[14rem] font-black leading-none select-none text-transparent bg-clip-text bg-gradient-to-br from-brand-500 via-purple-500 to-brand-600"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 12 }}
          >
            404
          </motion.h1>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.15}>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary -mt-6 mb-3">
            Page Not Found
          </h2>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.25}>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="gradient" size="lg">
                <Home className="w-4 h-4 mr-1.5" /> Go Home
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                <BookOpen className="w-4 h-4 mr-1.5" /> Browse Courses
              </Button>
            </Link>
          </div>
        </Reveal>

        {/* Animated Book Illustration */}
        <Reveal delay={0.5}>
          <div className="mt-14 flex items-end justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  'rounded-md shadow-lg',
                  i === 0 && 'w-6 h-16 bg-gradient-to-t from-brand-400 to-brand-300 -rotate-6',
                  i === 1 && 'w-7 h-20 bg-gradient-to-t from-purple-400 to-purple-300',
                  i === 2 && 'w-6 h-14 bg-gradient-to-t from-amber-400 to-amber-300 rotate-6'
                )}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
