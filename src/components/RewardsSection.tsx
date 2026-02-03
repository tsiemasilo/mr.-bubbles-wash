import { motion } from "framer-motion";
import { Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const RewardsSection = () => {
  // Demo state - in real app this would come from user data
  const currentWashes = 7;
  const totalNeeded = 10;

  const bubbles = Array.from({ length: totalNeeded }, (_, i) => ({
    id: i,
    filled: i < currentWashes,
  }));

  return (
    <section className="px-6 py-16 bg-card">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Rewards Program</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Every 10th Wash
          <span className="block text-primary">is FREE!</span>
        </h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Collect bubbles with every wash. Get your 10th wash completely free!
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-sm mx-auto"
      >
        <div className="bg-background rounded-2xl p-6 shadow-lg border border-border">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Your Progress
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {bubbles.map((bubble, index) => (
              <motion.div
                key={bubble.id}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  bubble.filled
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                {bubble.filled ? (
                  <Star className="w-5 h-5" />
                ) : index === currentWashes ? (
                  <span className="text-xs font-bold">Next</span>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-foreground mb-1">
              {currentWashes}/{totalNeeded}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {totalNeeded - currentWashes} more washes until your free wash!
            </p>
            <Button className="w-full">Join Rewards Program</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RewardsSection;
