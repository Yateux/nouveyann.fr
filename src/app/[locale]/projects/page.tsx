import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { type ProjectCategory } from "@/data/projects";
import { path, projectPath, type Locale } from "@/i18n/config";
import { getProjectMedia } from "@/lib/media";
import { breadcrumbJsonLd, projectListJsonLd } from "@/lib/jsonLd";
import { getCategories, getProjects } from "@/i18n/getProjects";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata, localeParams, resolveLocale } from "@/i18n/page";

export const generateStaticParams = localeParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).projects;
  return buildMetadata({
    locale,
    route: "projects",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

function gridData(locale: Locale) {
  const t = getDictionary(locale);
  const categories = getCategories(locale);
  const list = getProjects(locale);

  const projects = list.map((project) => ({
    slug: project.slug,
    name: project.name,
    category: project.category,
    categoryLabel: categories[project.category].label,
    tagline: project.tagline,
    tech: project.tech,
    href: projectPath(project.slug, locale),
    src: getProjectMedia(project.slug).cover,
    alt: t.projects.previewAlt(project.name),
  }));

  const filters = (Object.keys(categories) as ProjectCategory[])
    .map((key) => ({
      key,
      label: categories[key].plural,
      count: list.filter((project) => project.category === key).length,
    }))
    .filter((filter) => filter.count > 0);

  return { projects, filters };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const { projects, filters } = gridData(locale);

  return (
    <>
      <PageHeader title={t.projects.title} lead={t.projects.lead} />

      <Container className="pt-[clamp(24px,3vw,36px)]">
        <ProjectsGrid
          projects={projects}
          filters={filters}
          allLabel={t.projects.all}
          filterLabel={t.projects.filterLabel}
        />
      </Container>

      <CTA locale={locale} />

      <JsonLd data={projectListJsonLd(getProjects(locale), locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.projects.label, path: path("projects", locale) },
        ])}
      />
    </>
  );
}
