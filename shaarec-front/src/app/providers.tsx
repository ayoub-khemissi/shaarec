"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useWheelSnap } from "@/hooks/useWheelSnap";

export function Providers({ children }: { children: React.ReactNode }) {
  useWheelSnap(".snap-container");

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="shaarec"
        themes={["shaarec", "shaarec-dark"]}
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
