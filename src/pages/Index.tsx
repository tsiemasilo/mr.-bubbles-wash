import BubbleBackground from "@/components/BubbleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import RewardsSection from "@/components/RewardsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BubbleBackground />
      <Navbar />
      <main className="relative z-10 pt-16">
        <section id="home">
          <HeroSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="rewards">
          <RewardsSection />
        </section>
        <section id="location">
          <LocationSection />
        </section>
        <section id="contact">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Index;
