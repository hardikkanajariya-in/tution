'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import teachers from '@/data/teachers.json';
import { Star, Users } from 'lucide-react';

export function TeacherSpotlightSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
              Meet Our <span className="text-gradient">Teachers</span>
            </h2>
            <p className="mt-3 text-text-secondary">
              Award-winning educators who make every concept click.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher, i) => (
            <Reveal key={teacher.slug} delay={i * 0.1}>
              <Link href={`/teachers/${teacher.slug}`}>
                <motion.div
                  whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="perspective-container"
                >
                  <Card className="h-full group hover:shadow-elevated transition-shadow">
                    {/* Avatar placeholder */}
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-brand flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">
                        {teacher.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>

                    <div className="text-center">
                      <h3 className="font-bold text-lg text-text-primary group-hover:text-brand-500 transition-colors">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-text-secondary mt-0.5">{teacher.title}</p>

                      <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                        {teacher.specialties.slice(0, 3).map((s) => (
                          <Badge key={s} variant="outline" size="sm">{s}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-4 mt-4 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {teacher.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {teacher.studentCount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
