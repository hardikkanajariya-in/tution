'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Type,
  Square,
  ToggleLeft,
  Bell,
  Layers,
  Layout,
  MousePointer,
  Sparkles,
} from 'lucide-react';
import {
  Button,
  Card,
  Badge,
  Accordion,
  Tabs,
  Modal,
  Input,
  TextArea,
  useToast,
  Reveal,
  CourseCardSkeleton,
  TeacherCardSkeleton,
  BlogCardSkeleton,
} from '@/components/ui';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Table of Contents data                                            */
/* ------------------------------------------------------------------ */
const sections = [
  { id: 'buttons', label: 'Buttons', icon: MousePointer },
  { id: 'cards', label: 'Cards', icon: Layout },
  { id: 'badges', label: 'Badges', icon: Sparkles },
  { id: 'inputs', label: 'Inputs', icon: Type },
  { id: 'accordion', label: 'Accordion', icon: Layers },
  { id: 'tabs', label: 'Tabs', icon: ToggleLeft },
  { id: 'modal', label: 'Modal', icon: Square },
  { id: 'toasts', label: 'Toasts', icon: Bell },
  { id: 'skeletons', label: 'Skeletons', icon: Layers },
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'theme', label: 'Theme', icon: ToggleLeft },
];

/* ------------------------------------------------------------------ */
/*  Reusable section wrapper                                          */
/* ------------------------------------------------------------------ */
function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section id={id} className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <p className="text-text-secondary mt-1">{description}</p>
        </div>
        {children}
        <hr className="border-white/10 dark:border-white/5" />
      </section>
    </Reveal>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono text-text-muted bg-surface-tertiary px-2 py-0.5 rounded">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function PlaygroundPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* ---- Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary">
          Component Playground
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto">
          Explore our design system — interactive demos of every UI component.
        </p>
      </motion.div>

      {/* ---- Table of Contents ---- */}
      <nav className="flex flex-wrap gap-2 justify-center">
        {sections.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg',
              'bg-surface-secondary hover:bg-surface-tertiary text-text-secondary hover:text-text-primary',
              'transition-colors duration-200'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </a>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* BUTTONS                                                      */}
      {/* ============================================================ */}
      <Section id="buttons" title="Buttons" description="Five variants, three sizes, loading &amp; disabled states.">
        <div className="space-y-6">
          {/* Variants */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">Variants</p>
            <div className="flex flex-wrap gap-3 items-center">
              {(['primary', 'secondary', 'outline', 'ghost', 'gradient'] as const).map((v) => (
                <div key={v} className="flex flex-col items-center gap-1.5">
                  <Button variant={v}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                  <Label>{v}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">Sizes</p>
            <div className="flex flex-wrap gap-3 items-end">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <div key={s} className="flex flex-col items-center gap-1.5">
                  <Button size={s}>Size {s}</Button>
                  <Label>{s}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">States</p>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <Button loading>Loading…</Button>
                <Label>loading</Label>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Button disabled>Disabled</Button>
                <Label>disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* CARDS                                                        */}
      {/* ============================================================ */}
      <Section id="cards" title="Cards" description="Default, glass, and tilt card variants.">
        <div className="grid sm:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-text-primary mb-1">Default Card</h3>
            <p className="text-sm text-text-secondary">Standard surface with soft shadow.</p>
          </Card>
          <Card glass>
            <h3 className="font-semibold text-text-primary mb-1">Glass Card</h3>
            <p className="text-sm text-text-secondary">Frosted glass backdrop effect.</p>
          </Card>
          <Card tilt>
            <h3 className="font-semibold text-text-primary mb-1">Tilt Card</h3>
            <p className="text-sm text-text-secondary">Hover for a subtle 3D tilt.</p>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* BADGES                                                       */}
      {/* ============================================================ */}
      <Section id="badges" title="Badges" description="Status &amp; category indicators in five flavours.">
        <div className="flex flex-wrap gap-3 items-center">
          {(['default', 'success', 'warning', 'brand', 'outline'] as const).map((v) => (
            <div key={v} className="flex flex-col items-center gap-1.5">
              <Badge variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
              <Label>{v}</Label>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* INPUTS                                                       */}
      {/* ============================================================ */}
      <Section id="inputs" title="Inputs" description="Text inputs and textareas with labels, errors, and disabled state.">
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" placeholder="john@example.com" error="Please enter a valid email" />
          <div className="sm:col-span-2">
            <TextArea label="Message" placeholder="Type something…" />
          </div>
          <Input label="Disabled" placeholder="Cannot type here" disabled />
        </div>
      </Section>

      {/* ============================================================ */}
      {/* ACCORDION                                                    */}
      {/* ============================================================ */}
      <Section id="accordion" title="Accordion" description="Expandable panels — only one open at a time.">
        <Accordion
          items={[
            {
              question: 'What subjects do you offer?',
              answer:
                'We cover Mathematics, Physics, Chemistry, Biology, English, and Computer Science for grades 6 through 12.',
            },
            {
              question: 'How are classes conducted?',
              answer:
                'Classes are delivered both online via live video sessions and in‑person at our centres. You can choose the format that suits you best.',
            },
            {
              question: 'What is the refund policy?',
              answer:
                'You may request a full refund within the first 7 days. After that, a pro‑rated refund is available based on unused sessions.',
            },
          ]}
          className="max-w-2xl"
        />
      </Section>

      {/* ============================================================ */}
      {/* TABS                                                         */}
      {/* ============================================================ */}
      <Section id="tabs" title="Tabs" description="Switch between content panels.">
        <Tabs
          className="max-w-2xl"
          tabs={[
            {
              label: 'Overview',
              value: 'overview',
              content: (
                <p className="text-text-secondary">
                  This is the overview panel. Tabs keep only one panel visible at a time while
                  preserving their internal state.
                </p>
              ),
            },
            {
              label: 'Features',
              value: 'features',
              content: (
                <ul className="list-disc list-inside text-text-secondary space-y-1">
                  <li>Animated active indicator</li>
                  <li>Keyboard accessible</li>
                  <li>Supports any React node as content</li>
                </ul>
              ),
            },
            {
              label: 'Usage',
              value: 'usage',
              content: (
                <pre className="text-xs bg-surface-tertiary p-4 rounded-xl overflow-x-auto text-text-secondary">
                  {`<Tabs tabs={[{ label, value, content }]} />`}
                </pre>
              ),
            },
          ]}
        />
      </Section>

      {/* ============================================================ */}
      {/* MODAL                                                        */}
      {/* ============================================================ */}
      <Section id="modal" title="Modal" description="A dialog overlay with backdrop blur and escape‑key support.">
        <Button onClick={() => setModalOpen(true)}>Open Demo Modal</Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
          <p className="text-text-secondary mb-4">
            This is an interactive modal. Press <kbd className="px-1.5 py-0.5 rounded bg-surface-tertiary text-xs font-mono">Esc</kbd> or click outside to close.
          </p>
          <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal>
      </Section>

      {/* ============================================================ */}
      {/* TOASTS                                                       */}
      {/* ============================================================ */}
      <Section id="toasts" title="Toasts" description="Ephemeral notifications via the useToast hook.">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => addToast('Action completed successfully!', 'success')}>
            Success Toast
          </Button>
          <Button variant="outline" onClick={() => addToast('Something went wrong.', 'error')}>
            Error Toast
          </Button>
          <Button variant="ghost" onClick={() => addToast('Here is some information.', 'info')}>
            Info Toast
          </Button>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* SKELETONS                                                    */}
      {/* ============================================================ */}
      <Section id="skeletons" title="Skeletons" description="Loading placeholders for cards.">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>CourseCardSkeleton</Label>
            <CourseCardSkeleton />
          </div>
          <div className="space-y-2">
            <Label>TeacherCardSkeleton</Label>
            <TeacherCardSkeleton />
          </div>
          <div className="space-y-2">
            <Label>BlogCardSkeleton</Label>
            <BlogCardSkeleton />
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* COLORS                                                       */}
      {/* ============================================================ */}
      <Section id="colors" title="Colors" description="Brand, accent, and surface palette swatches.">
        <div className="space-y-6">
          {/* Brand */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">Brand</p>
            <div className="flex flex-wrap gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
                <div key={n} className="flex flex-col items-center gap-1">
                  <div
                    className="h-10 w-10 rounded-lg shadow-sm"
                    style={{ backgroundColor: `var(--brand-${n})` }}
                  />
                  <span className="text-[10px] font-mono text-text-muted">{n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accent */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">Accent</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Pink', var: '--accent-pink' },
                { name: 'Blue', var: '--accent-blue' },
                { name: 'Purple', var: '--accent-purple' },
              ].map((c) => (
                <div key={c.var} className="flex items-center gap-2">
                  <div
                    className="h-10 w-10 rounded-lg shadow-sm"
                    style={{ backgroundColor: `var(${c.var})` }}
                  />
                  <span className="text-xs font-mono text-text-muted">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Surfaces */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-3">Surfaces</p>
            <div className="flex flex-wrap gap-3">
              {['primary', 'secondary', 'tertiary'].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-lg shadow-sm border border-white/10 dark:border-white/5',
                      s === 'primary' && 'bg-surface-primary',
                      s === 'secondary' && 'bg-surface-secondary',
                      s === 'tertiary' && 'bg-surface-tertiary'
                    )}
                  />
                  <span className="text-xs font-mono text-text-muted">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* THEME                                                        */}
      {/* ============================================================ */}
      <Reveal>
        <section id="theme" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-bold text-text-primary">Dark Mode Preview</h2>
          <Card className="max-w-md">
            <p className="text-text-secondary text-sm">
              Dark mode is toggled via the <strong>sun/moon</strong> button in the
              navbar. All components above automatically adapt to the active theme via
              CSS custom properties and Tailwind&apos;s <code className="text-xs font-mono bg-surface-tertiary px-1 py-0.5 rounded">dark:</code> modifier.
            </p>
          </Card>
        </section>
      </Reveal>
    </div>
  );
}
