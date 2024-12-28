"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Heart, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "All Natural",
    description: "Made with organic ingredients and essential oils",
  },
  {
    icon: Shield,
    title: "Cruelty Free",
    description: "Never tested on animals, always ethically made",
  },
  {
    icon: Heart,
    title: "Skin Friendly",
    description: "Gentle formulations for all skin types",
  },
  {
    icon: Sparkles,
    title: "Handcrafted",
    description: "Small batches for ultimate quality control",
  },
];

export function Benefits() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-primary/5 mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
