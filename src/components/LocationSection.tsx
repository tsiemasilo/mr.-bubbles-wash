import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-3">Find Us</h2>
        <p className="text-muted-foreground">Come visit for a sparkling clean!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
          {/* Map placeholder with bubble pattern */}
          <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-30">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 rounded-full border-2 border-primary/40"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
            <MapPin className="w-12 h-12 text-primary z-10" />
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">
                  Boksburg Center, Gauteng
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Operating Hours</p>
                <p className="text-sm text-muted-foreground">
                  Mon - Sat: 7:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-muted-foreground">
                  Sun: 8:00 AM - 4:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Contact</p>
                <p className="text-sm text-muted-foreground">
                  +27 11 XXX XXXX
                </p>
              </div>
            </div>

            <Button className="w-full mt-4">Get Directions</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LocationSection;
