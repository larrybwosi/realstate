"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div style={{ y }} className="relative h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1599848880232-930e41936561?q=80&w=1974"
              alt="Soap making process"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Founded in 2010, we began our journey with a simple mission: to
              create the finest natural soaps using traditional methods and the
              purest ingredients.
            </p>
            <p className="text-lg text-muted-foreground">
              Every bar of soap is handcrafted in small batches, ensuring the
              highest quality and attention to detail. We source our ingredients
              from sustainable suppliers who share our commitment to
              environmental stewardship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
