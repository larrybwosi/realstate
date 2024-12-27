"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { BackgroundBeams } from "./ui/background-beams";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="newsletter bg-gradient-to-r from-primary-50 to-secondary-50 py-24">
      {" "}
      {/* Gradient background */}
      <div className="container mx-auto px-4">
        <BackgroundBeams />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-4">
            Stay Updated
          </h2>{" "}
          {/* Dark mode text */}
          <p className="text-lg text-muted-foreground dark:text-muted-foreground-dark mb-8">
            Subscribe to our newsletter for exclusive offers, the latest
            apartment listings, and valuable tips for finding your dream home.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
            {" "}
            {/* Centered form */}
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button type="submit" variant="ghost">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
