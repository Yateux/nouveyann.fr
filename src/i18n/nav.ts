import { path, routes, type Locale, type RouteKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export type NavLink = { href: string; label: string };

export function getNav(locale: Locale): NavLink[] {
  const t = getDictionary(locale).nav;

  return [
    { href: path("projects", locale), label: t.projects },
    { href: path("about", locale), label: t.about },
    { href: path("contact", locale), label: t.contact },
  ];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

export function alternatePath(
  key: RouteKey,
  locale: Locale,
  slug?: string,
): string {
  const target = otherLocale(locale);
  const base = routes[key][target];
  return slug ? `${routes.projects[target]}/${slug}` : base;
}

export function switchPath(pathname: string, locale: Locale): string {
  const target = otherLocale(locale);
  const current = pathname.replace(/\/$/, "") || "/";

  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][locale] === current) return routes[key][target];
  }

  const projectsRoot = routes.projects[locale];
  if (current.startsWith(`${projectsRoot}/`)) {
    const slug = current.slice(projectsRoot.length + 1);
    if (slug && !slug.includes("/"))
      return `${routes.projects[target]}/${slug}`;
  }

  return routes.home[target];
}
