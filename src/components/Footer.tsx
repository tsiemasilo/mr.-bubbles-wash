import { motion } from "framer-motion";
import { MapPin, Phone, Clock, FileDown, Leaf, Handshake } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { generateCompanyProfile } from "@/lib/generateCompanyProfile";
import { generateEnvironmentalCompliance } from "@/lib/generateEnvironmentalCompliance";
import { generateMallPartnership } from "@/lib/generateMallPartnership";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Mr. Bubbles Bubbles
          </h3>
          <p className="text-secondary-foreground/70 text-sm">
            Premium Car Wash Experience
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <motion.div 
            className="flex items-center gap-3 justify-center"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-secondary-foreground/80">Boksburg Center, Gauteng</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 justify-center"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-secondary-foreground/80">Mon - Sun: 9:00 AM - 5:00 PM</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 justify-center"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm text-secondary-foreground/80">082 806 9569</span>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <motion.a 
            href="#" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-[#1877F2]/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Facebook"
          >
            <SiFacebook className="w-5 h-5 text-[#1877F2]" />
          </motion.a>
          <motion.a 
            href="#" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-[#E4405F]/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Instagram"
          >
            <SiInstagram className="w-5 h-5 text-[#E4405F]" />
          </motion.a>
          <motion.a 
            href="https://wa.me/27828069569" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-[#25D366]/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="WhatsApp"
          >
            <SiWhatsapp className="w-5 h-5 text-[#25D366]" />
          </motion.a>
          <motion.a 
            href="#" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-secondary-foreground/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="TikTok"
          >
            <SiTiktok className="w-5 h-5 text-secondary-foreground" />
          </motion.a>
        </div>

        <div className="mb-6">
          <p className="text-xs text-secondary-foreground/60 text-center mb-4 font-medium uppercase tracking-wider">
            Download Business Documents
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={generateCompanyProfile}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                data-testid="button-download-profile"
              >
                <FileDown className="w-4 h-4" />
                Business Proposal
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={generateEnvironmentalCompliance}
                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto"
                data-testid="button-download-environmental"
              >
                <Leaf className="w-4 h-4" />
                Environmental
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={generateMallPartnership}
                className="gap-2 bg-amber-600 text-white hover:bg-amber-700 w-full sm:w-auto"
                data-testid="button-download-partnership"
              >
                <Handshake className="w-4 h-4" />
                Mall Partnership
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-6">
          <p className="text-xs text-secondary-foreground/50 text-center">
            © 2025 Mr. Bubbles Bubbles. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
