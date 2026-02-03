import BubbleBackground from "@/components/BubbleBackground";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import RewardsSection from "@/components/RewardsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BubbleBackground />
      <main className="relative z-10">
        <HeroSection />
        <PricingSection />
        <RewardsSection />
        <LocationSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
