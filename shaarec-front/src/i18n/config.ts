export const locales = ["fr", "ar", "en", "es", "nl", "de", "ber"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const rtlLocales: Locale[] = ["ar"];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
  es: "Español",
  nl: "Nederlands",
  de: "Deutsch",
  ber: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
};
