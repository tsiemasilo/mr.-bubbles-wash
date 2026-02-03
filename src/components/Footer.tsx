import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Mr. Bubbles Bubbles
          </h3>
          <p className="text-secondary-foreground/70 text-sm">
            Premium Car Wash Experience
          </p>
        </div>

        {/* Contact Info */}
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
            <span className="text-sm text-secondary-foreground/80">Mon - Sat: 7:00 AM - 6:00 PM</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 justify-center"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm text-secondary-foreground/80">+27 12 345 6789</span>
          </motion.div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.a 
            href="#" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook className="w-5 h-5 text-secondary-foreground" />
          </motion.a>
          <motion.a 
            href="#" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5 text-secondary-foreground" />
          </motion.a>
          <motion.a 
            href="#" 
            className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5 text-secondary-foreground" />
          </motion.a>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-foreground/20 pt-6">
          <p className="text-xs text-secondary-foreground/50 text-center">
            © 2024 Mr. Bubbles Bubbles. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
