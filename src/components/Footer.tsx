import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import siteData from '@/data/site.json';
import uiData from '@/data/ui.json';

export function Footer() {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { label: 'Courses', href: '/courses' },
        { label: 'Subjects', href: '/subjects' },
        { label: 'Teachers', href: '/teachers' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Results', href: '/results' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Component Playground', href: '/playground' },
      ],
    },
  ];

  return (
    <footer className="bg-surface-secondary dark:bg-surface-secondary border-t border-gray-200 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient">PrismTutor</span>
              <span className="text-xl font-light text-text-secondary">Studio</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary max-w-xs leading-relaxed">
              {siteData.brand.tagline}
            </p>
            <div className="mt-6 space-y-3">
              <a href={`mailto:${siteData.contact.email}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 transition-colors">
                <Mail className="h-4 w-4" /> {siteData.contact.email}
              </a>
              <a href={`tel:${siteData.contact.phone}`} className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 transition-colors">
                <Phone className="h-4 w-4" /> {siteData.contact.phone}
              </a>
              <p className="flex items-center gap-2 text-sm text-text-muted">
                <MapPin className="h-4 w-4 shrink-0" /> {siteData.contact.address}
              </p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-brand-500 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">{uiData.meta.copyright}</p>
          <p className="text-xs text-text-muted">{uiData.meta.demoNotice}</p>
        </div>
      </div>
    </footer>
  );
}
