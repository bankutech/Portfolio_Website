"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "text-up" | "fade-up" | "wipe-left" | "scale-up";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, animation = "fade-up", delay = 0, className = "" }: ScrollRevealProps) {
  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const, delay } }
    },
    "text-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const, delay } }
    },
    "wipe-left": {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] as const, delay } }
    },
    "scale-up": {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const, delay } }
    }
  };

  return (
    <motion.div
      variants={variants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
