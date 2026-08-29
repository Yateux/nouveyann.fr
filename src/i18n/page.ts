import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  locales,
  ogLocale,
  path,
  projectPath,
  type Locale,
  type RouteKey,
} from "@/i18n/config";

const EN_KEYWORDS = [
  "freelance web developer Paris",
  "freelance full-stack developer France",
  "Next.js freelance developer",
  "React freelance developer",
  "React Native freelance",
  "hire a freelance web developer",
];

const FR_KEYWORDS = [
  "développeur freelance Île-de-France",
  "développeur web freelance",
  "développeur Next.js freelance",
  "développeur React freelance",
  "freelance React Native",
  "création de site web freelance",
];

export function localeParams() {
  return locales.map((locale) => ({ locale }));
}

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

/**
 * Canonical, hreflang, og and twitter for one page, in one place. The urls are
 * the public ones from the routes table, never the internal /[locale]/ paths
 * the rewrites point at.
 */
export function buildMetadata({
  locale,
  route,
  slug,
  title,
  description,
  absoluteTitle = false,
  type = "website",
  noIndex = false,
}: {
  locale: Locale;
  route: RouteKey;
  slug?: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const url = slug ? projectPath(slug, locale) : path(route, locale);
  const other = locale === "fr" ? "en" : "fr";
  const otherUrl = slug ? projectPath(slug, other) : path(route, other);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: locale === "fr" ? FR_KEYWORDS : EN_KEYWORDS,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [other]: otherUrl,
        "x-default": locale === "fr" ? url : otherUrl,
      },
    },
    openGraph: {
      type,
      locale: ogLocale[locale],
      url,
      title: absoluteTitle ? title : `${title} | Yann Nouve`,
      description,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | Yann Nouve`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
