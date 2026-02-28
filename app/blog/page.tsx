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
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
];

const AVATAR_GRADIENTS = [
  'from-brand-500 to-purple-600',
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
    <main className="min-h-screen pb-24">
      {/* ─── Page Header ────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/60 via-transparent to-purple-50/40 dark:from-brand-950/30 dark:to-purple-950/20" />
        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="brand" size="md" className="mb-4">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Blog
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                PrismTutor Blog
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Insights, study tips, and educational resources to help you excel in your academic journey.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4">
        {/* ─── Featured Post ──────────────────────────── */}
        <Reveal delay={0.1}>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <Card padding="none" className="overflow-hidden mb-12">
              <div className="grid md:grid-cols-2">
                <div
                  className="aspect-[16/10] md:aspect-auto md:min-h-[320px]"
                  style={{ background: COVER_GRADIENTS[0] }}
                >
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white/30" />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <Badge variant="brand" className="mb-3 w-fit">
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
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white',
                          AVATAR_GRADIENTS[0],
                        )}
                      >
                        {getInitials(featured.author.name)}
                      </div>
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
            </Card>
          </Link>
        </Reveal>

        {/* ─── Filters ──────────────────────────────── */}
        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
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
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                !selectedTag
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary hover:text-text-primary',
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                  selectedTag === tag
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary hover:text-text-primary',
                )}
              >
                {tag}
              </button>
            ))}
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
                  <Card padding="none" className="flex h-full flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Cover gradient */}
                    <div
                      className="aspect-[16/9] relative"
                      style={{ background: COVER_GRADIENTS[idx % COVER_GRADIENTS.length] }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-white/20" />
                      </div>
                      <div className="absolute left-3 top-3">
                        <Badge variant="brand" className="backdrop-blur-sm">
                          {post.tags[0]}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-brand-500 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {truncate(post.excerpt, 120)}
                      </p>

                      {/* Author + meta */}
                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white',
                                AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
                              )}
                            >
                              {getInitials(post.author.name)}
                            </div>
                            <span className="text-xs font-medium text-text-primary">
                              {post.author.name}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
                        </div>
                        <div className="mt-2.5 flex items-center gap-3 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readingTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
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
