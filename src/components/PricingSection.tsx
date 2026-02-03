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
    price: "R150",
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
        <h2 className="text-3xl font-bold text-foreground mb-3">Our Prices</h2>
        <p className="text-muted-foreground">Choose your bubble experience</p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`relative overflow-hidden ${
                tier.popular
                  ? "border-primary border-2 shadow-lg"
                  : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <tier.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-3xl font-bold text-primary">
                      {tier.price}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                <Button
                  className="w-full mt-4"
                  variant={tier.popular ? "default" : "outline"}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
