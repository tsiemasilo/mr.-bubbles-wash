import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Sparkles } from "lucide-react";

const pricingTiers = [
  {
    name: "Basic Bubble",
    price: "R90",
    icon: Sparkles,
    features: ["Exterior Hand Wash", "Wheel Cleaning", "Window Cleaning"],
    popular: false,
  },
  {
    name: "Super Shine",
    price: "R120",
    icon: Star,
    features: [
      "Everything in Basic",
      "Interior Vacuum",
      "Dashboard Wipe",
      "Air Freshener",
    ],
    popular: true,
  },
  {
    name: "Royal Bubble",
    price: "R250",
    icon: Crown,
    features: [
      "Everything in Super",
      "Full Interior Detail",
      "Tyre Shine",
      "Wax Polish",
      "Engine Bay Clean",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <motion.h2 
          className="text-3xl font-bold text-foreground mb-3"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Prices
        </motion.h2>
        <p className="text-muted-foreground">Choose your bubble experience</p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <Card
              className={`relative overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                tier.popular
                  ? "border-primary border-2 shadow-xl bg-card/90"
                  : "border-border/50 bg-card/70 hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              {/* Gradient overlay for visual interest */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
              
              {tier.popular && (
                <motion.div 
                  className="absolute top-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1.5 text-xs font-bold rounded-bl-xl shadow-md"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  ⭐ Most Popular
                </motion.div>
              )}
              
              <CardHeader className="pb-4 relative">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`p-3 rounded-2xl shadow-inner ${
                      tier.popular 
                        ? "bg-gradient-to-br from-primary/20 to-primary/30" 
                        : "bg-primary/10"
                    }`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <tier.icon className={`w-7 h-7 ${tier.popular ? "text-primary" : "text-primary/80"}`} />
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                    <motion.p 
                      className="text-3xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {tier.price}
                    </motion.p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3 relative">
                {tier.features.map((feature, featureIndex) => (
                  <motion.div 
                    key={feature} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * featureIndex + 0.3 }}
                  >
                    <div className="p-1 bg-primary/20 rounded-full">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium">{feature}</span>
                  </motion.div>
                ))}
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    className={`w-full font-bold text-base py-5 transition-all duration-300 ${
                      tier.popular 
                        ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl" 
                        : "border-2 border-primary/30 hover:border-primary hover:bg-primary/10"
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.popular ? "✨ Select Package" : "Select"}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
