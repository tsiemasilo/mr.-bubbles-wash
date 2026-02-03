import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, MapPin, Gift, DollarSign, Phone, Home, FileText, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateCompanyProfile } from "@/lib/generateCompanyProfile";
import { generateEnvironmentalCompliance } from "@/lib/generateEnvironmentalCompliance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home", icon: Home, type: "scroll" },
    { name: "Prices", href: "#pricing", icon: DollarSign, type: "scroll" },
    { name: "Rewards", href: "#rewards", icon: Gift, type: "scroll" },
    { name: "Contact", href: "#contact", icon: Phone, type: "scroll" },
  ];

  const pdfItems = [
    { name: "Business Proposal", icon: FileText, action: generateCompanyProfile },
    { name: "Environmental Compliance", icon: Leaf, action: generateEnvironmentalCompliance },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePdfDownload = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            data-testid="link-logo"
          >
            <Droplets className="w-10 h-10 text-white" />
            <span className="font-bold text-xl text-white">Mr. Bubbles Bubbles</span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-white/90 hover:text-white hover:bg-white/10 text-base px-4"
                onClick={() => scrollToSection(item.href)}
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Button>
            ))}
            <div className="w-px h-6 bg-white/30 mx-2" />
            {pdfItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-white/90 hover:text-white hover:bg-white/10 text-base px-4 gap-2"
                onClick={() => handlePdfDownload(item.action)}
                data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Button>
            ))}
          </div>

          <label 
            className="lg:hidden cursor-pointer z-50"
            data-testid="button-menu-toggle"
          >
            <input 
              type="checkbox" 
              className="hidden"
              checked={isOpen}
              onChange={() => setIsOpen(!isOpen)}
            />
            <svg 
              viewBox="0 0 32 32"
              className="h-12 w-12"
              style={{
                transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)"
              }}
            >
              <path 
                className="line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                style={{
                  strokeDasharray: isOpen ? "20 300" : "12 63",
                  strokeDashoffset: isOpen ? "-32.42" : "0",
                  transition: "stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
              <path 
                className="line"
                d="M7 16 27 16"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                style={{
                  transition: "stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
            </svg>
          </label>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden bg-primary border-t border-white/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                  data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-semibold text-lg">{item.name}</span>
                </motion.button>
              ))}
              
              <div className="h-px bg-white/20 my-3" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.3 }}
                className="text-white/70 text-sm px-4 pb-2 font-medium"
              >
                Download Documents
              </motion.p>
              
              {pdfItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + index) * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => handlePdfDownload(item.action)}
                  className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                  data-testid={`link-mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-semibold text-lg">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
