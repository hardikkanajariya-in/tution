'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import subjectsData from '@/data/subjects.json';
import {
  Calculator, Atom, FlaskConical, Dna, BookOpen, Code, TrendingUp,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Calculator, Atom, FlaskConical, Dna, BookOpen, Code, TrendingUp,
};

type Tab = 'categories' | 'grades' | 'exams';

export function SubjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('categories');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'categories', label: 'Subjects' },
    { key: 'grades', label: 'Grade Levels' },
    { key: 'exams', label: 'Exam Tracks' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
              Explore by <span className="text-gradient">Subject</span>
            </h2>
            <p className="mt-3 text-text-secondary">
              Browse our curriculum across subjects, grades, and exam tracks.
            </p>
          </div>
        </Reveal>

        {/* Tab chips */}
        <Reveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeTab === tab.key
                    ? 'bg-brand-500 text-white shadow-brand'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Categories */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjectsData.categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? BookOpen;
              return (
                <Reveal key={cat.slug} delay={i * 0.05}>
                  <div className="glass rounded-2xl p-5 text-center hover:shadow-elevated transition-shadow cursor-pointer group">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-brand flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-text-primary">{cat.name}</h3>
                    <p className="text-xs text-text-muted mt-1">{cat.courseCount} courses</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Grade levels */}
        {activeTab === 'grades' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectsData.gradeLevels.map((gl, i) => (
              <Reveal key={gl.slug} delay={i * 0.05}>
                <div className="glass rounded-2xl p-6 hover:shadow-elevated transition-shadow cursor-pointer">
                  <h3 className="text-lg font-bold text-text-primary">{gl.label}</h3>
                  <p className="text-sm text-text-secondary mt-1">{gl.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Exam tracks */}
        {activeTab === 'exams' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectsData.examTracks.map((et, i) => (
              <Reveal key={et.slug} delay={i * 0.05}>
                <div className="glass rounded-2xl p-6 hover:shadow-elevated transition-shadow cursor-pointer">
                  <Badge variant="brand" size="md">{et.label}</Badge>
                  <p className="text-sm text-text-secondary mt-3">{et.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Subject chips */}
        <Reveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {subjectsData.subjectChips.map((chip) => (
              <Badge key={chip} variant="outline" size="md">
                {chip}
              </Badge>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
