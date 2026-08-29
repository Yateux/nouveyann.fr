export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const htmlLang: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export const routes = {
  home: { fr: "/", en: "/en" },
  projects: { fr: "/projets", en: "/en/projects" },
  about: { fr: "/a-propos", en: "/en/about" },
  contact: { fr: "/contact", en: "/en/contact" },
  legalNotice: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/politique-de-confidentialite", en: "/en/privacy-policy" },
} as const;

export type RouteKey = keyof typeof routes;

export function path(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

export function projectPath(slug: string, locale: Locale): string {
  return `${routes.projects[locale]}/${slug}`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const englishEnabled = true;
