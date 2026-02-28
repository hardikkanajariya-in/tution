'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Calendar, List } from 'lucide-react';
import { Card, Button, Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';
import legalData from '@/data/legal.json';

const { terms } = legalData;

export default function TermsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── Hero ──────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-brand-600 dark:bg-brand-900" />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl animate-pulse delay-1000" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              {terms.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <Calendar className="w-4 h-4" /> Last updated: {terms.lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Content ───────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
            {/* Sidebar TOC */}
            <Reveal direction="left" className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-28">
                <Card glass className="p-5">
                  <h3 className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                    <List className="w-4 h-4" /> Contents
                  </h3>
                  <nav className="flex flex-col gap-2">
                    {terms.sections.map((s, i) => (
                      <a
                        key={i}
                        href={`#terms-${i}`}
                        className="text-sm text-muted-foreground hover:text-brand-500 transition-colors truncate"
                      >
                        {s.heading}
                      </a>
                    ))}
                  </nav>
                </Card>
              </div>
            </Reveal>

            {/* Main Content */}
            <div className="flex-1 space-y-10">
              {terms.sections.map((section, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <motion.div
                    id={`terms-${i}`}
                    className="scroll-mt-28"
                  >
                    <h2 className="text-xl md:text-2xl font-bold mb-3 text-text-primary">
                      {section.heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      {section.content}
                    </p>
                    {i < terms.sections.length - 1 && (
                      <div className="mt-10 border-b border-border" />
                    )}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <Reveal delay={0.2}>
            <div className="max-w-6xl mx-auto mt-16 flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="md">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
                </Button>
              </Link>
              <Link href="/privacy">
                <Button variant="ghost" size="md">
                  View Privacy Policy
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
