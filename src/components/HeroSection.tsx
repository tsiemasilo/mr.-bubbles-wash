import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-6"
      >
        <img
          src={logo}
          alt="Mr. Bubbles Bubbles Logo"
          className="w-40 h-40 object-contain drop-shadow-lg"
        />
      </motion.div>

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4"
      >
        Mr. Bubbles
        <span className="block text-primary">Bubbles</span>
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-muted-foreground text-center mb-8 max-w-xs"
      >
        Where your car gets the royal bubble treatment ✨
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <Button size="lg" className="w-full text-lg gap-2">
          <Sparkles className="w-5 h-5" />
          Book a Wash
        </Button>
        <Button variant="outline" size="lg" className="w-full text-lg">
          View Prices
        </Button>
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
          <span className="text-2xl">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
