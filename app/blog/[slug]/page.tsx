'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, User, Tag, Copy, Check,
  ArrowLeft, ChevronRight, Quote, Lightbulb, ListChecks,
} from 'lucide-react';
import { Card, Badge, Button, Reveal } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { cn, getInitials } from '@/lib/utils';
import blogData from '@/data/blog.json';

/* ── Gradient palettes ──────────────────────────────────────── */
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
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'image'; url?: string; gradient?: string; caption?: string }
  | { type: 'callout'; text: string; icon?: string; type_variant?: string };

/* ── Content block renderer ─────────────────────────────────── */
function ContentRenderer({ block, index }: { block: ContentBlock; index: number }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-text-secondary leading-relaxed text-lg mb-6">
          {block.text}
        </p>
      );

    case 'heading':
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-10 mb-4 flex items-center gap-3">
          <span className="w-1 h-8 rounded-full bg-brand-500" />
          {block.text}
        </h2>
      );

    case 'list':
      return (
        <ul className="space-y-3 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-text-secondary text-lg">
              <ListChecks size={20} className="text-brand-500 mt-1 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className="relative my-8 pl-6 border-l-4 border-brand-500 bg-brand-50/50 dark:bg-brand-900/10 rounded-r-xl py-5 pr-6">
          <Quote size={24} className="absolute top-4 right-4 text-brand-300/40" />
          <p className="text-lg italic text-text-primary leading-relaxed">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <cite className="block mt-3 text-sm text-text-tertiary not-italic">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case 'image':
      return (
        <figure className="my-8">
          {(block as { url?: string }).url ? (
            <img
              src={(block as { url: string }).url}
              alt={block.caption ?? 'Article image'}
              className="w-full h-56 md:h-72 rounded-xl object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-56 md:h-72 rounded-xl"
              style={{ background: block.gradient ?? COVER_GRADIENTS[index % COVER_GRADIENTS.length] }}
            />
          )}
          {block.caption && (
            <figcaption className="text-center text-sm text-text-tertiary mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'callout':
      return (
        <div className="flex items-start gap-4 my-8 p-5 rounded-xl bg-amber-50/80 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-700/30">
          <span className="text-2xl shrink-0">{block.icon ?? '💡'}</span>
          <p className="text-text-secondary text-base leading-relaxed">{block.text}</p>
        </div>
      );

    default:
      return null;
  }
}

/* ── Main page ──────────────────────────────────────────────── */
export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const post = blogData.find((p) => p.slug === slug);
  const postIndex = blogData.findIndex((p) => p.slug === slug);
  const coverGradient = COVER_GRADIENTS[postIndex >= 0 ? postIndex % COVER_GRADIENTS.length : 0];
  const avatarGradient = AVATAR_GRADIENTS[postIndex >= 0 ? postIndex % AVATAR_GRADIENTS.length : 0];

  const related = useMemo(() => {
    if (!post) return [];
    const sameTags = blogData.filter(
      (p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)),
    );
    if (sameTags.length >= 2) return sameTags.slice(0, 2);
    return blogData.filter((p) => p.slug !== post.slug).slice(0, 2);
  }, [post]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast('Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Not found ────────────────────────────────────── */
  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center" padding="lg">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Post Not Found</h1>
          <p className="text-text-secondary mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog">
            <Button variant="primary">
              <ArrowLeft size={16} /> Back to Blog
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const content = (post.content ?? []) as ContentBlock[];
  const initials = getInitials(post.author.name);

  return (
    <main className="min-h-screen pb-20">
      {/* ── Breadcrumbs ──────────────────────────────── */}
      <Reveal>
        <nav className="max-w-4xl mx-auto px-4 pt-28 pb-4 flex items-center gap-2 text-sm text-text-tertiary" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-brand-500 transition-colors">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-text-primary truncate max-w-[200px]">{post.title}</span>
        </nav>
      </Reveal>

      {/* ── Cover banner ─────────────────────────────── */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <motion.div
            className="w-full h-[300px] rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-8">
              <Badge variant="brand" size="md">{post.tags[0]}</Badge>
            </div>
          </motion.div>
        </div>
      </Reveal>

      {/* ── Article header ───────────────────────────── */}
      <Reveal>
        <header className="max-w-3xl mx-auto px-4 mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight mb-6 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary">{post.author.name}</p>
                <p className="text-xs text-text-tertiary">Author</p>
              </div>
            </div>
            <span className="hidden sm:block w-px h-6 bg-border-primary" />
            <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
              <Calendar size={14} /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
              <Clock size={14} /> {post.readingTime}
            </span>
          </div>
        </header>
      </Reveal>

      {/* ── Article body ─────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-4" aria-label="Article content">
        {content.map((block, i) => (
          <Reveal key={i}>
            <ContentRenderer block={block} index={i} />
          </Reveal>
        ))}

        {/* ── Tags ────────────────────────────────────── */}
        <Reveal>
          <div className="mt-12 pt-8 border-t border-border-primary flex flex-wrap items-center gap-2">
            <Tag size={16} className="text-text-tertiary" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
            ))}
          </div>
        </Reveal>

        {/* ── Share / Copy link ──────────────────────── */}
        <Reveal>
          <div className="mt-6 flex items-center gap-3">
            <Button variant="outline" onClick={handleCopyLink} className="gap-2">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Link href="/blog">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft size={16} /> All Posts
              </Button>
            </Link>
          </div>
        </Reveal>

        {/* ── Author box ─────────────────────────────── */}
        <Reveal>
          <Card className="mt-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover shrink-0"
                loading="lazy"
              />
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold text-text-primary">{post.author.name}</p>
                <p className="text-sm text-text-tertiary mb-2">Author</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Passionate educator dedicated to making learning engaging and accessible
                  for every student. Contributing insights and strategies for academic success.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </article>

      {/* ── Related posts ────────────────────────────── */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 mt-16" aria-label="Related posts">
          <Reveal>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Related Posts</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((rp, idx) => {
              const rpGrad = COVER_GRADIENTS[blogData.indexOf(rp) % COVER_GRADIENTS.length];
              const rpAvatarGrad = AVATAR_GRADIENTS[blogData.indexOf(rp) % AVATAR_GRADIENTS.length];
              return (
                <Reveal key={rp.slug}>
                  <Link href={`/blog/${rp.slug}`}>
                    <Card padding="none" className="overflow-hidden group card-interactive duration-250 ease-out-expo">
                      <img
                        src={rp.cover}
                        alt={rp.title}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="p-5">
                        <Badge variant="brand" size="sm" className="mb-2">{rp.tags[0]}</Badge>
                        <h3 className="font-semibold text-text-primary line-clamp-2 mb-2 group-hover:text-brand-500 transition-colors">
                          {rp.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-text-tertiary">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={rp.author.avatar}
                              alt={rp.author.name}
                              className="w-5 h-5 rounded-full object-cover"
                              loading="lazy"
                            />
                            {rp.author.name}
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {rp.readingTime}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
