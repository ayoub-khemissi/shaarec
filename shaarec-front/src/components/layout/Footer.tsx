"use client";

import { Separator } from "@heroui/react";
import { useTranslations } from "next-intl";
import { YouTubeIcon, FacebookIcon, InstagramIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");

  const sections = [
    {
      title: t("sections.association"),
      links: [
        { label: t("links.about"), href: "#about" },
        { label: t("links.team"), href: "#team" },
        { label: t("links.methodology"), href: "#methodology" },
        { label: t("links.transparency"), href: "#impact" },
      ],
    },
    {
      title: t("sections.engage"),
      links: [
        { label: t("links.donate"), href: "#donate" },
        { label: t("links.partner"), href: "#contact" },
        { label: t("links.blog"), href: "#blog" },
      ],
    },
    {
      title: t("sections.legal"),
      links: [
        { label: t("links.legalNotice"), href: "#" },
        { label: t("links.privacy"), href: "#" },
        { label: t("links.terms"), href: "#" },
      ],
    },
  ];

  const socials = [
    { icon: <YouTubeIcon />, label: "YouTube", href: "#" },
    { icon: <FacebookIcon />, label: "Facebook", href: "#" },
    { icon: <InstagramIcon />, label: "Instagram", href: "#" },
  ];

  return (
    <footer className="snap-section border-t border-border/50 bg-surface/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted leading-relaxed max-w-xs">{t("description")}</p>
            <div className="flex gap-3 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="size-9 rounded-lg bg-default/50 flex items-center justify-center
                    hover:bg-default transition-colors text-foreground/60 hover:text-foreground"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("legalEntity")}</p>
        </div>
      </div>
    </footer>
  );
}
