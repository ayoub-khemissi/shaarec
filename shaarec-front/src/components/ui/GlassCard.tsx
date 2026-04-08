"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = "", hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl border border-border/60
        bg-overlay/70 backdrop-blur-lg
        shadow-surface
        p-6 transition-shadow
        ${hover ? "hover:shadow-overlay" : ""}
        ${className}`}
    >
      {children}
    </motion.div>
  );
}
