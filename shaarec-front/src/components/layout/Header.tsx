"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { AppButton } from "@/components/ui/AppButton";
import { HeartIcon, XCloseIcon, MenuIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserMenu } from "./UserMenu";

const NAV_KEYS = [
  { key: "about", href: "#about" },
  { key: "impact", href: "#impact" },
  { key: "methodology", href: "#methodology" },
  { key: "donate", href: "#donate" },
  { key: "team", href: "#team" },
];

export function Header() {
  const t = useTranslations("nav");
  const hidden = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300
          ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <div
            className="flex items-center justify-between gap-4 px-5 py-3
              rounded-2xl border border-border/40
              bg-surface/90 backdrop-blur-xl backdrop-saturate-150
              shadow-surface"
          >
            <Logo />

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_KEYS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/70
                    hover:text-foreground hover:bg-default/50 transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <UserMenu />
              <LanguageSwitcher />
              <ThemeSwitcher />
              <AppButton
                variant="primary"
                size="sm"
                className="hidden sm:flex"
                onPress={() => {
                  document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <HeartIcon className="size-4" />
                {t("donate")}
              </AppButton>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden size-9 flex items-center justify-center rounded-lg
                  hover:bg-default/50 transition-colors cursor-pointer"
                aria-label={t("menu")}
              >
                {mobileOpen ? <XCloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div
              className="lg:hidden mt-2 rounded-2xl border border-border/40
                bg-surface/80 backdrop-blur-xl backdrop-saturate-150
                shadow-overlay overflow-hidden"
            >
              <nav className="flex flex-col p-2">
                {NAV_KEYS.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-foreground/70
                      hover:text-foreground hover:bg-default/50 transition-colors"
                  >
                    {t(item.key)}
                  </a>
                ))}
                <div className="px-4 py-3">
                  <AppButton
                    variant="primary"
                    fullWidth
                    onPress={() => {
                      document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
                      setMobileOpen(false);
                    }}
                  >
                    <HeartIcon className="size-4" />
                    {t("donate")}
                  </AppButton>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
