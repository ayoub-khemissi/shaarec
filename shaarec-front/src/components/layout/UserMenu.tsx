"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/ui/Icons";

export function UserMenu() {
  const { data: session, status } = useSession();
  const t = useTranslations("auth.login");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (status === "loading") return <div className="size-9" />;

  if (!session?.user) {
    return (
      <Link
        href="/auth/login"
        className="hidden sm:flex h-9 px-3 items-center text-sm font-medium text-foreground/70
          hover:text-foreground transition-colors"
      >
        {t("submit")}
      </Link>
    );
  }

  const initials = (session.user.name || session.user.email || "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-9 ps-1 pe-2 flex items-center gap-1.5 rounded-lg text-sm font-medium
          bg-surface/60 backdrop-blur-sm border border-border/50
          hover:bg-surface transition-colors cursor-pointer"
      >
        <span className="size-7 rounded-md bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
          {initials}
        </span>
        <ChevronDownIcon className="size-3 opacity-50" />
      </button>

      {open && (
        <div
          className="absolute end-0 top-full mt-2 min-w-[200px] rounded-xl
            bg-overlay/90 backdrop-blur-xl border border-border/50
            shadow-overlay overflow-hidden z-50
            animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="px-4 py-3 border-b border-border/50">
            <p className="text-sm font-medium text-foreground truncate">{session.user.name}</p>
            <p className="text-xs text-muted truncate">{session.user.email}</p>
          </div>

          <Link
            href="/donor/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-foreground hover:bg-default/60 transition-colors"
          >
            Mon espace
          </Link>
          <Link
            href="/donor/donations"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-foreground hover:bg-default/60 transition-colors"
          >
            Mes dons
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="w-full text-start px-4 py-2.5 text-sm text-danger hover:bg-default/60 transition-colors cursor-pointer border-t border-border/50"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
