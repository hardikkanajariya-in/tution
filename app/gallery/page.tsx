'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Grid3X3, Filter } from 'lucide-react';
import { Badge, Button, Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';
import galleryData from '@/data/gallery.json';

/* ── Types & Constants ────────────────────────────── */
interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const images: GalleryImage[] = galleryData.images;

const categories = ['all', 'events', 'classroom', 'campus', 'achievements'] as const;
const categoryLabels: Record<string, string> = {
  all: 'All',
  events: 'Events',
  classroom: 'Classroom',
  campus: 'Campus',
  achievements: 'Achievements',
};

const aspectByIndex = (i: number) => {
  const ratios = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/5]', 'aspect-[5/4]'];
  return ratios[i % ratios.length];
};

/* ── Page ─────────────────────────────────────────── */
export default function GalleryPage() {
  const [active, setActive] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'all' ? images : images.filter((img) => img.category === active);

  /* ── Lightbox helpers ───────────────────────────── */
  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goPrev = useCallback(() => {
    setLightbox((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightbox((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);

  /* ── Keyboard navigation ────────────────────────── */
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightbox, closeLightbox, goPrev, goNext]);

  const currentImage = lightbox !== null ? filtered[lightbox] : null;

  return (
    <main className="min-h-screen pb-24 overflow-hidden">
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden" aria-label="Gallery overview">
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-pink top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-amber bottom-0 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <Camera className="h-4 w-4" aria-hidden="true" />
              Photo Gallery
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-text-primary">Life at</span>{' '}
              <span className="text-gradient">Vidyaan</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A visual journey through our vibrant campus life, events, classrooms, and celebrations of student achievement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Category Filter ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" aria-label="Category filter">
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-4 border border-border-primary shadow-elevated flex flex-wrap items-center justify-center gap-3">
            <Filter className="h-4 w-4 text-text-muted mr-1" aria-hidden="true" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setLightbox(null); }}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border',
                  active === cat
                    ? 'bg-gradient-to-r from-brand-500 to-amber-500 text-white border-transparent shadow-lg shadow-brand-500/25'
                    : 'border-border-primary bg-surface-primary dark:bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-brand-300 dark:hover:border-brand-700'
                )}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Image Counter ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <p className="text-sm text-text-muted flex items-center gap-2">
          <Grid3X3 className="h-4 w-4" aria-hidden="true" />
          Showing {filtered.length} of {images.length}
        </p>
      </div>

      {/* ── Masonry Grid ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Photo gallery">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="mb-4 break-inside-avoid"
              >
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <button
                    onClick={() => openLightbox(idx)}
                    className="group relative block w-full rounded-3xl overflow-hidden shadow-elevated border border-border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                    aria-label={`View ${img.title}`}
                  >
                    {/* Gallery image */}
                    <img
                      src={img.image}
                      alt={img.title}
                      className={cn('w-full object-cover transition-transform duration-500 group-hover:scale-110', aspectByIndex(idx))}
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-start justify-end p-5">
                      <Badge variant="brand" className="mb-2 shadow-md">{categoryLabels[img.category]}</Badge>
                      <p className="text-white text-sm font-semibold leading-snug drop-shadow-lg">{img.title}</p>
                    </div>
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Camera className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">No images found in this category.</p>
          </div>
        )}
      </section>

      {/* ── Lightbox Modal ──────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && currentImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-label={currentImage.title}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={closeLightbox}
            />

            {/* Content */}
            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative z-10 w-full max-w-3xl mx-4"
            >
              {/* Lightbox image */}
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="w-full aspect-[16/10] rounded-2xl shadow-2xl object-cover"
              />

              {/* Info overlay */}
              <div className="mt-4 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="brand" className="mb-2">{categoryLabels[currentImage.category]}</Badge>
                    <h2 className="text-xl font-bold text-white">{currentImage.title}</h2>
                    <p className="text-white/70 text-sm mt-1">{currentImage.description}</p>
                  </div>
                  <span className="text-white/50 text-sm whitespace-nowrap">
                    {lightbox + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
