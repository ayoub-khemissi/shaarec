"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GlassCard } from "./GlassCard";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-bold text-accent tabular-nums">
      {display}{suffix}
    </span>
  );
}

export function StatCard({ value, suffix, label, icon, delay = 0 }: StatCardProps) {
  return (
    <GlassCard delay={delay} className="aspect-square sm:aspect-auto lg:aspect-square flex flex-col items-center justify-center text-center gap-2 p-4">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: delay + 0.1 }}
        className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent"
      >
        {icon}
      </motion.div>
      <AnimatedNumber value={value} suffix={suffix} />
      <span className="text-xs text-muted font-medium leading-tight">{label}</span>
    </GlassCard>
  );
}
