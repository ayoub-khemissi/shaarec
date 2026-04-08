"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}

export function SectionHeading({ tag, title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-start"}`}
    >
      {tag && (
        <span className="text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
