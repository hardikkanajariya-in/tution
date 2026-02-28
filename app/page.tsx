import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { HighlightsSection } from '@/components/sections/HighlightsSection';
import { PopularCoursesSection } from '@/components/sections/PopularCoursesSection';
import { SubjectsSection } from '@/components/sections/SubjectsSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { TeacherSpotlightSection } from '@/components/sections/TeacherSpotlightSection';
import { ResultsPreviewSection } from '@/components/sections/ResultsPreviewSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingPreviewSection } from '@/components/sections/PricingPreviewSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PartnersSection />
      <HighlightsSection />
      <PopularCoursesSection />
      <SubjectsSection />
      <JourneySection />
      <TeacherSpotlightSection />
      <ResultsPreviewSection />
      <TestimonialsSection />
      <PricingPreviewSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
