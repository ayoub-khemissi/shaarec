import { Link } from "@heroui/react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline text-foreground">
      <div className="size-8 rounded-lg bg-accent flex items-center justify-center">
        <span className="text-accent-foreground font-bold text-sm">S</span>
      </div>
      <span className="font-bold text-lg tracking-tight">SHAAREC</span>
    </Link>
  );
}
