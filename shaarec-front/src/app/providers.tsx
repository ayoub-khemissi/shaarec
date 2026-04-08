"use client";

import { ThemeProvider } from "next-themes";
import { useWheelSnap } from "@/hooks/useWheelSnap";

export function Providers({ children }: { children: React.ReactNode }) {
  useWheelSnap(".snap-container");

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="shaarec"
      themes={["shaarec", "shaarec-dark"]}
    >
      {children}
    </ThemeProvider>
  );
}
