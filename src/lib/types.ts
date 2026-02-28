// ─── Site ─────────────────────────────────────────
export interface SiteData {
  brand: {
    name: string;
    tagline: string;
    shortDescription: string;
    logo: string;
    logoDark: string;
  };
  nav: NavItem[];
  socials: Social[];
  contact: ContactInfo;
  locations: Location[];
  seo: SEODefaults;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Social {
  platform: string;
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface Location {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface SEODefaults {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  url: string;
  ogImage: string;
}

// ─── Home ─────────────────────────────────────────
export interface HomeData {
  hero: HeroData;
  stats: StatItem[];
  partners: Partner[];
  highlights: Highlight[];
  learningJourney: JourneyStep[];
  cta: CTAData;
  newsletter: NewsletterData;
}

export interface HeroData {
  headline: string;
  headlineAccent: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  trustBadges: string[];
  heroImage: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface Highlight {
  title: string;
  description: string;
  icon: string;
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
}

export interface CTAData {
  headline: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface NewsletterData {
  headline: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
}

// ─── Courses ──────────────────────────────────────
export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  gradeLevel: string;
  mode: 'online' | 'offline' | 'hybrid';
  duration: string;
  schedule: string;
  price: number;
  popularity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  thumbnail: string;
  teacherSlug: string;
  description: string;
  syllabus: SyllabusModule[];
  weeklySchedule: ScheduleItem[];
  faqs: FAQItem[];
}

export interface SyllabusModule {
  module: string;
  topics: string[];
}

export interface ScheduleItem {
  day: string;
  time: string;
  type: string;
}

// ─── Subjects ─────────────────────────────────────
export interface SubjectsData {
  categories: SubjectCategory[];
  gradeLevels: GradeLevel[];
  examTracks: ExamTrack[];
  subjectChips: string[];
}

export interface SubjectCategory {
  slug: string;
  name: string;
  icon: string;
  courseCount: number;
}

export interface GradeLevel {
  slug: string;
  label: string;
  description: string;
}

export interface ExamTrack {
  slug: string;
  label: string;
  description: string;
}

// ─── Teachers ─────────────────────────────────────
export interface Teacher {
  slug: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  specialties: string[];
  experience: string;
  achievements: string[];
  socials: Record<string, string>;
  rating: number;
  studentCount: number;
}

// ─── Testimonials ─────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  course: string;
}

// ─── Results ──────────────────────────────────────
export interface ResultsData {
  stories: SuccessStory[];
  overallStats: StatItem[];
}

export interface SuccessStory {
  id: string;
  studentName: string;
  exam: string;
  year: number;
  track: string;
  beforeScore: number;
  afterScore: number;
  rank: string;
  subject: string;
  quote: string;
}

// ─── Pricing ──────────────────────────────────────
export interface PricingData {
  plans: PricingPlan[];
  comparisonTable: ComparisonTable;
  billingFaqs: FAQItem[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  highlighted: boolean;
  features: PlanFeature[];
  cta: string;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

// ─── FAQ ──────────────────────────────────────────
export interface FAQData {
  groups: FAQGroup[];
}

export interface FAQGroup {
  topic: string;
  items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── Blog ─────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  author: BlogAuthor;
  cover: string;
  featured: boolean;
  content: ContentBlock[];
}

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'list' | 'image' | 'callout';
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  author?: string;
  type_variant?: string;
}

// ─── Gallery ──────────────────────────────────────
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption: string;
}

// ─── Legal ────────────────────────────────────────
export interface LegalData {
  terms: LegalSection;
  privacy: LegalSection;
}

export interface LegalSection {
  title: string;
  lastUpdated: string;
  sections: { heading: string; content: string }[];
}

// ─── UI ───────────────────────────────────────────
export interface UIData {
  buttons: Record<string, string>;
  labels: Record<string, string>;
  form: Record<string, string>;
  meta: Record<string, string>;
}
