"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import {
  HeartIcon,
  DocumentIcon,
  EyeIcon,
  ShieldTickIcon,
  XCloseIcon,
} from "@/components/ui/Icons";

const ITEMS = [
  { key: "dashboard", href: "/donor/dashboard", icon: ShieldTickIcon },
  { key: "donations", href: "/donor/donations", icon: HeartIcon },
  { key: "receipts", href: "/donor/receipts", icon: DocumentIcon },
  { key: "reports", href: "/donor/reports", icon: EyeIcon },
];

export function DonorSidebar() {
  const t = useTranslations("donor.nav");
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 lg:min-h-dvh lg:border-e lg:border-border/50 flex flex-col">
      <div className="p-4 lg:p-6 flex flex-col gap-1">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname.includes(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${active
                  ? "bg-accent/15 text-accent"
                  : "text-foreground/70 hover:text-foreground hover:bg-default/50"
                }`}
            >
              <Icon className="size-5" strokeWidth={active ? 2 : 1.5} />
              {t(item.key)}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-4 lg:p-6 border-t border-border/50">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
            text-danger hover:bg-danger/10 transition-colors cursor-pointer"
        >
          <XCloseIcon className="size-5" />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
