"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { GlobeIcon, ChevronDownIcon } from "@/components/ui/Icons";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getLocalePath = (newLocale: Locale) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    return segments.join("/") || "/";
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-9 px-3 flex items-center gap-1.5 rounded-lg text-sm font-medium
          bg-surface/60 backdrop-blur-sm border border-border/50
          hover:bg-surface transition-colors cursor-pointer"
      >
        <GlobeIcon className="size-4 opacity-70" strokeWidth={1.5} />
        <span className="hidden sm:inline">{localeNames[locale].slice(0, 3).toUpperCase()}</span>
        <ChevronDownIcon className="size-3 opacity-50" />
      </button>

      {open && (
        <div className="absolute end-0 top-full mt-2 min-w-[160px] rounded-xl
          bg-overlay/80 backdrop-blur-xl border border-border/50
          shadow-overlay overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {locales.map((l) => (
            <a
              key={l}
              href={getLocalePath(l)}
              className={`block px-4 py-2.5 text-start text-sm transition-colors
                hover:bg-default/60
                ${l === locale ? "text-accent font-medium" : "text-foreground"}`}
            >
              {localeNames[l]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
