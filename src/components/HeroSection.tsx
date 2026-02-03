import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import BookingModal from "./BookingModal";

const HeroSection = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToPricing = () => {
    const element = document.querySelector("#pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="mb-6 relative"
      >
        <div className="absolute inset-0 bg-primary/10 blur-[80px] scale-[2] rounded-full" />
        
        <motion.div
          animate={{ 
            y: [0, -6, 0],
          }}
          transition={{ 
            duration: 3.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative"
        >
          <img
            src={logo}
            alt="Mr. Bubbles Bubbles Logo"
            className="w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(0, 136, 204, 0.2))",
              mixBlendMode: "multiply",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-muted-foreground text-center mb-8 max-w-xs"
      >
        Where your car gets the royal bubble treatment
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            size="lg" 
            className="w-full text-lg gap-2 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
            onClick={() => setIsBookingOpen(true)}
            data-testid="button-book-wash"
          >
            <Sparkles className="w-5 h-5" />
            Book a Wash
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full text-lg py-6 border-2 border-primary/40 hover:border-primary hover:bg-primary/10 transition-all duration-300 font-semibold backdrop-blur-sm"
            onClick={scrollToPricing}
            data-testid="button-view-prices"
          >
            View Prices
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground text-sm flex flex-col items-center"
        >
          <span>Scroll Down</span>
          <motion.span 
            className="text-2xl text-primary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
};

export default HeroSection;
