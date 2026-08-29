import { categories, projects, type Project } from "@/data/projects";
import { categoriesEn, projectsEn } from "@/data/projects.en";
import type { Locale } from "@/i18n/config";

export function getProjects(locale: Locale): Project[] {
  if (locale === "fr") return projects;

  return projects.map((project) => {
    const copy = projectsEn[project.slug];
    if (!copy) return project;

    return {
      ...project,
      tagline: copy.tagline,
      sector: copy.sector,
      study: copy.study,
    };
  });
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getCategories(locale: Locale) {
  return locale === "fr" ? categories : categoriesEn;
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) => project.featured);
}

/** Previous and next project, matched by slug, never by index. */
export function getNeighbours(slug: string, locale: Locale) {
  const list = getProjects(locale);
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function untranslatedSlugs(): string[] {
  return projects
    .filter((project) => !projectsEn[project.slug])
    .map((project) => project.slug);
}
