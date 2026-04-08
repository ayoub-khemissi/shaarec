import type { Metadata } from "next";
import { Sora, Inter, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { rtlLocales, type Locale } from "@/i18n/config";
import { Providers } from "../providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

// Latin — Titres : Sora ExtraBold / Contenu : Lexend Regular
const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Arabe — Titres : IBM Plex Sans Arabic Bold / Contenu : Readex Pro Regular
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-heading-ar",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

const readexPro = Readex_Pro({
  variable: "--font-body-ar",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SHAAREC — De Zourgane au Monde",
  description:
    "Bâtir une souveraineté de l'excellence. Soutenez l'éducation et le leadership des jeunes de Zourgane.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = rtlLocales.includes(locale as Locale);
  const dir = isRtl ? "rtl" : "ltr";

  const fontClasses = isRtl
    ? `${ibmPlexArabic.variable} ${readexPro.variable}`
    : `${sora.variable} ${inter.variable}`;

  return (
    <html
      lang={locale}
      dir={dir}
      className={fontClasses}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <div className="snap-container">
              <main>{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
