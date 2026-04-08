"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SunIcon, MoonIcon } from "@/components/ui/Icons";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("theme");

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-9" />;
  }

  const isDark = theme === "shaarec-dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "shaarec" : "shaarec-dark")}
      className="size-9 flex items-center justify-center rounded-lg
        bg-surface/60 backdrop-blur-sm border border-border/50
        hover:bg-surface transition-colors cursor-pointer"
      aria-label={isDark ? t("light") : t("dark")}
    >
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  );
}
