'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/Button';
import siteData from '@/data/site.json';
import coursesJson from '@/data/courses.json';
import teachersJson from '@/data/teachers.json';
import blogJson from '@/data/blog.json';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const mainNav = siteData.nav.slice(0, 7);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-350 ease-out-expo',
          scrolled
            ? 'glass-strong shadow-soft py-2'
            : 'bg-transparent py-4'
        )}
        role="banner"
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Vidyaan Academy Home">
            <span className="text-xl font-bold text-gradient transition-opacity group-hover:opacity-80">Vidyaan</span>
            <span className="text-xl font-light text-text-secondary transition-opacity group-hover:opacity-80">Academy</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === item.href
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary dark:hover:bg-surface-tertiary'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-brand rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted rounded-lg border border-gray-200 dark:border-white/10 hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors"
              aria-label="Open search (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline text-xs bg-surface-tertiary dark:bg-brand-200 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5 text-text-secondary" /> : <Sun className="h-5 w-5 text-text-secondary" />}
            </button>
            <Link href="/contact" className="hidden lg:block">
              <Button size="sm" variant="gradient">Book a Free Demo</Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface-primary dark:bg-surface-secondary shadow-elevated p-6 pt-20 overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <div className="space-y-1">
                {siteData.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-brand-100 dark:bg-brand-200 text-brand-600 dark:text-brand-400'
                        : 'text-text-secondary hover:bg-surface-secondary dark:hover:bg-surface-tertiary'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <Button variant="gradient" className="w-full">Book a Free Demo</Button>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
    </>
  );
}

function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');

  const courses = coursesJson as Array<{ slug: string; title: string; category: string }>;
  const teachers = teachersJson as Array<{ slug: string; name: string; title: string }>;
  const blog = blogJson as Array<{ slug: string; title: string }>;

  const q = query.toLowerCase();

  const results = [
    ...courses
      .filter((c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
      .map((c) => ({ label: c.title, href: `/courses/${c.slug}`, type: 'Course' })),
    ...teachers
      .filter((t) => t.name.toLowerCase().includes(q) || t.title.toLowerCase().includes(q))
      .map((t) => ({ label: t.name, href: `/teachers/${t.slug}`, type: 'Teacher' })),
    ...blog
      .filter((b) => b.title.toLowerCase().includes(q))
      .map((b) => ({ label: b.title, href: `/blog/${b.slug}`, type: 'Blog' })),
  ].slice(0, 8);

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center pt-[15vh] px-4" role="dialog" aria-modal="true" aria-label="Search">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative w-full max-w-lg bg-surface-primary dark:bg-surface-secondary rounded-2xl shadow-elevated border border-white/10 dark:border-white/5 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-white/10">
          <Search className="h-5 w-5 text-text-muted shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, teachers, blog posts..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
          <kbd className="text-xs bg-surface-tertiary dark:bg-brand-200 text-text-muted px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        {query.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.length > 0 ? (
              results.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-surface-secondary dark:hover:bg-surface-tertiary transition-colors"
                >
                  <span className="text-text-primary">{r.label}</span>
                  <span className="text-xs text-text-muted bg-surface-tertiary dark:bg-brand-200 px-2 py-0.5 rounded">{r.type}</span>
                </Link>
              ))
            ) : (
              <p className="text-sm text-text-muted text-center py-8">No results found for &ldquo;{query}&rdquo;</p>
            )}
          </div>
        )}
        {query.length === 0 && (
          <div className="p-6 text-center text-sm text-text-muted">
            Start typing to search across courses, teachers, and blog posts.
          </div>
        )}
      </motion.div>
    </div>
  );
}
