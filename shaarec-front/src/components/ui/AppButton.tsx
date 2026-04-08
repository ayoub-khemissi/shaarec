"use client";

import { Button } from "@heroui/react";
import type { ComponentProps } from "react";

type HeroButtonProps = ComponentProps<typeof Button>;

interface AppButtonProps extends Omit<HeroButtonProps, "variant" | "className"> {
  variant?: "primary" | "secondary" | "outline" | "warm";
  fullWidth?: boolean;
  className?: string;
}

const styles = {
  primary:
    "bg-accent text-accent-foreground font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all",
  secondary:
    "bg-foreground/10 text-foreground font-semibold border border-border hover:bg-foreground/15 transition-all",
  outline:
    "bg-transparent text-foreground font-semibold border border-border hover:bg-foreground/5 transition-all",
  warm:
    "bg-sahara text-eclipse font-semibold border border-sahara/30 shadow-sm hover:shadow-md transition-all",
} as const;

export function AppButton({
  variant = "primary",
  fullWidth = false,
  size = "md",
  className = "",
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      size={size}
      className={`${styles[variant]} ${fullWidth ? "w-full" : ""} ${size === "lg" ? "px-8 text-base" : ""} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
