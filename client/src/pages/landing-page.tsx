import { HeroSection } from "@/components/landing/hero-section";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { FeaturesSection } from "@/components/landing/features-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { AIAssistantSection } from "@/components/landing/ai-assistant-section";
import { CTASection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#0f172a] to-[#1e293b]">
      <LandingHeader />
      <HeroSection />
      <DashboardPreview />
      <FeaturesSection />
      <IntegrationsSection />
      <AIAssistantSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}