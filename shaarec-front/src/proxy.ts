import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

// Rate limiting en mémoire (sliding window)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 60; // requêtes par fenêtre

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Nettoyage périodique de la map
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip);
  }
}, RATE_LIMIT_WINDOW);

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (request.nextUrl.pathname.startsWith("/api/") && isRateLimited(ip)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api/auth|api/stripe/webhook).*)"],
};
