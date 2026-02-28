'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, X, Tag } from 'lucide-react';
import { Card, Badge, Input, Reveal } from '@/components/ui';
import { cn, getInitials, truncate } from '@/lib/utils';
import blogData from '@/data/blog.json';

/* ── Gradient palette for cover placeholders ────────────────── */
const COVER_GRADIENTS = [
  'linear-gradient(135deg, #EA580C 0%, #D97706 100%)',
  'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
];

const AVATAR_GRADIENTS = [
  'from-brand-500 to-amber-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
];

/* ── Helpers ────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = blogData;
  const featured = posts.find((p) => p.featured) ?? posts[0];

  /* ─── State ───────────────────────────────────────── */
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  /* ─── Debounced search ────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ─── All unique tags ─────────────────────────────── */
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  /* ─── Filtered posts (exclude featured from grid) ── */
  const filtered = useMemo(() => {
    let list = posts.filter((p) => p.slug !== featured.slug);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (selectedTag) {
      list = list.filter((p) => p.tags.includes(selectedTag));
    }

    return list;
  }, [posts, featured.slug, searchQuery, selectedTag]);

  const clearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedTag(null);
  };

  const hasFilters = searchQuery || selectedTag;

  return (
    <main className="min-h-screen pb-24 overflow-hidden">
      {/* ─── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20" aria-label="Blog overview">
        <div className="floating-blob w-80 h-80 bg-brand-400 -top-10 -left-24" aria-hidden="true" />
        <div className="floating-blob w-96 h-96 bg-accent-amber top-20 -right-40" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="floating-blob w-60 h-60 bg-accent-emerald bottom-0 left-1/3" style={{ animationDelay: '4s' }} aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <BookOpen className="mr-1 h-3.5 w-3.5" /> Blog
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-text-primary">Vidyaan</span>{' '}
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Insights, study tips, and educational resources to help you excel in your academic journey.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Featured Post ──────────────────────────── */}
        <Reveal delay={0.1}>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <div className="rounded-3xl overflow-hidden border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated mb-14">
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 to-amber-500" />
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden">
                    <img
                      src={featured.cover}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <Badge variant="brand" className="mb-3 w-fit shadow-md">
                      <Tag className="mr-1 h-3 w-3" /> Featured
                    </Badge>
                    <h2 className="text-2xl font-bold text-text-primary transition-colors group-hover:text-brand-500 md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-text-secondary leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                      <div className="flex items-center gap-2">
                        <img
                          src={featured.author.avatar}
                          alt={featured.author.name}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-brand-200 dark:ring-brand-800"
                          loading="lazy"
                        />
                        <span className="font-medium text-text-primary">{featured.author.name}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {formatDate(featured.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {featured.readingTime}
                      </span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-transform group-hover:translate-x-1">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </Reveal>

        {/* ─── Filters ──────────────────────────────── */}
        <Reveal delay={0.15}>
          <div className="glass rounded-2xl p-5 border border-border-primary shadow-elevated">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles by title, topic, or tag…"
                  className="pl-10"
                />
              </div>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              )}
            </div>

            {/* Tag chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 border',
                  !selectedTag
                    ? 'bg-gradient-to-r from-brand-500 to-amber-500 text-white border-transparent shadow-md shadow-brand-500/25'
                    : 'border-border-primary bg-surface-primary dark:bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-brand-300',
                )}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 border',
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-brand-500 to-amber-500 text-white border-transparent shadow-md shadow-brand-500/25'
                      : 'border-border-primary bg-surface-primary dark:bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-brand-300',
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ─── Results count ──────────────────────────── */}
        <p className="mt-6 text-sm text-text-muted">
          Showing{' '}
          <span className="font-semibold text-text-primary">{filtered.length}</span>{' '}
          article{filtered.length !== 1 && 's'}
        </p>

        {/* ─── Blog Grid ──────────────────────────────── */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, idx) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border-primary bg-surface-primary dark:bg-surface-secondary shadow-elevated">
                      {/* Cover image */}
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute left-3 top-3">
                          <Badge variant="brand" className="backdrop-blur-sm shadow-md">
                            {post.tags[0]}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-brand-500 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                          {truncate(post.excerpt, 120)}
                        </p>

                        {/* Author + meta */}
                        <div className="mt-auto pt-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="h-7 w-7 rounded-full object-cover ring-2 ring-brand-200 dark:ring-brand-800"
                                loading="lazy"
                              />
                              <span className="text-xs font-medium text-text-primary">
                                {post.author.name}
                              </span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
                          </div>
                          <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {post.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ─── Empty State ────────────────────────────── */}
        {filtered.length === 0 && (
          <Reveal>
            <div className="mt-16 flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-secondary">
                <Search className="h-8 w-8 text-text-muted" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-text-primary">
                No articles found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-text-secondary">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                <X className="h-4 w-4" /> Clear all filters
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
