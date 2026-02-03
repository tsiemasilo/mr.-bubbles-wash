import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border px-6 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <img
          src={logo}
          alt="Mr. Bubbles Bubbles"
          className="w-16 h-16 object-contain mb-4"
        />
        <h3 className="text-xl font-bold text-foreground mb-2">
          Mr. Bubbles Bubbles
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Making your car sparkle since 2024
        </p>

        <div className="flex gap-6 mb-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Facebook
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Instagram
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            WhatsApp
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2024 Mr. Bubbles Bubbles. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
