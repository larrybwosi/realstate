"use client";

import { Leaf, Recycle, Heart, Award } from "lucide-react";
import { MotionDiv } from "@/components/motion";

const features = [
  {
    icon: Leaf,
    title: "All Natural Ingredients",
    description:
      "We use only the finest natural ingredients, sourced responsibly from trusted suppliers.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Packaging",
    description:
      "Our packaging is 100% recyclable and biodegradable, minimizing environmental impact.",
  },
  {
    icon: Heart,
    title: "Handcrafted with Love",
    description:
      "Each soap is carefully handmade in small batches to ensure the highest quality.",
  },
  {
    icon: Award,
    title: "Certified Organic",
    description:
      "Our products are certified organic and free from harmful chemicals.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-brown mb-4">
            Why Choose Natural Essence?
          </h2>
          <p className="text-brown/80 max-w-2xl mx-auto">
            We&lsquo;re committed to creating the finest natural soaps while
            protecting our planet.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-cream/50"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sage/10">
                <feature.icon className="w-6 h-6 text-sage" />
              </div>
              <h3 className="text-lg font-semibold text-brown mb-2">
                {feature.title}
              </h3>
              <p className="text-brown/80">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}