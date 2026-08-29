import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";
import { projects } from "@/data/projects";
import { getCategories, getProject } from "@/i18n/getProjects";
import { isLocale, locales } from "@/i18n/config";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study, Yann Nouve";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safe = isLocale(locale) ? locale : "fr";
  const project = getProject(slug, safe);

  return renderOgImage({
    eyebrow: project ? getCategories(safe)[project.category].label : "Projet",
    title: project?.name ?? "Projet",
    subtitle: project?.tagline ?? "",
  });
}
