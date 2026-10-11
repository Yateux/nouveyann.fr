import { isPlaceholder, profileUrls, siteConfig } from "@/data/site";
import type { Project } from "@/data/projects";
import { getCategories } from "@/i18n/getProjects";
import { services, technologies } from "@/data/expertise";
import { servicesEn } from "@/data/expertise.en";
import {
  defaultLocale,
  htmlLang,
  path,
  projectPath,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Without escaping, a string containing </script> closes the tag early.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function personJsonLd(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: getDictionary(locale).jsonLd.jobTitle,
    description: getDictionary(locale).home.metaDescription,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    sameAs: profileUrls.filter((url) => !isPlaceholder(url)),
    areaServed: [
      { "@type": "AdministrativeArea", name: siteConfig.region },
      { "@type": "Country", name: "France" },
    ],
    knowsAbout: technologies.map((tech) => tech.name),
  };
}

export function websiteJsonLd(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: htmlLang[locale],
    author: { "@type": "Person", name: siteConfig.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function creativeWorkJsonLd(
  project: Project,
  locale: Locale = defaultLocale,
  image?: string | null,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    abstract: project.tagline,
    url: `${siteConfig.url}${projectPath(project.slug, locale)}`,
    genre: getCategories(locale)[project.category].label,
    inLanguage: htmlLang[locale],
    creator: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    keywords: project.tech.join(", "),
    ...(image ? { image: `${siteConfig.url}${image}` } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
  };
}

export function projectListJsonLd(
  projects: Project[],
  locale: Locale = defaultLocale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: `${siteConfig.url}${projectPath(project.slug, locale)}`,
    })),
  };
}

export function servicesJsonLd(locale: Locale = defaultLocale) {
  const list = locale === "fr" ? services : servicesEn;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: `${siteConfig.url}${path("expertise", locale)}`,
    areaServed: { "@type": "Country", name: "France" },
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: getDictionary(locale).home.capabilitiesLabel,
      itemListElement: list.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
}
