import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { locales, path, projectPath, type Locale } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (p: string) => `${siteConfig.url}${p === "/" ? "" : p}`;

  const alternates = (build: (locale: Locale) => string) => ({
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, url(build(l))])),
      "x-default": url(build("fr")),
    },
  });

  const pages = (["home", "projects", "about", "contact"] as const).flatMap(
    (key) =>
      locales.map((locale) => ({
        url: url(path(key, locale)),
        changeFrequency: "monthly" as const,
        priority: key === "home" ? 1 : key === "projects" ? 0.9 : 0.8,
        alternates: alternates((l) => path(key, l)),
      })),
  );

  const caseStudies = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: url(projectPath(project.slug, locale)),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: alternates((l) => projectPath(project.slug, l)),
    })),
  );

  return [...pages, ...caseStudies].map((entry) => ({
    ...entry,
    lastModified,
  }));
}
