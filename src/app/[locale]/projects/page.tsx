import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Label } from "@/components/ui/Label";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";
import { type ProjectCategory } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { getProjectMedia } from "@/lib/media";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import { getCategories, getProjects } from "@/i18n/getProjects";
import { getDictionary } from "@/i18n/dictionaries";
import { path } from "@/i18n/config";
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

function groupedProjects(locale: Locale) {
  const categories = getCategories(locale);
  const list = getProjects(locale);
  const order = Object.keys(categories) as ProjectCategory[];

  return order
    .map((category) => ({
      category,
      label: categories[category].plural,
      items: list
        .filter((project) => project.category === category)
        .map((project) => ({
          project,
          media: getProjectMedia(project.slug),
        })),
    }))
    .filter((group) => group.items.length > 0);
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const groups = groupedProjects(locale);

  return (
    <>
      <PageHeader
        label={t.projects.label}
        title={t.projects.title}
        lead={t.projects.lead}
      />

      {groups.map((group, groupIndex) => (
        <section
          key={group.category}
          id={group.category}
          className={
            groupIndex % 2 === 1
              ? "border-y border-ink/10 bg-sand-soft py-12 lg:py-20"
              : "py-12 lg:py-20"
          }
        >
          <Container>
            <div className="flex items-center justify-between gap-6 border-b border-ink/10 pb-4">
              <Label as="h2">{group.label}</Label>
              <span className="mark text-ink-subtle">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
          </Container>

          <ul
            aria-label={t.projects.listLabel(group.label)}
            className="mt-8 flex snap-x snap-mandatory gap-5 scroll-pl-5 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:scroll-pl-8 sm:px-8 lg:mx-auto lg:grid lg:max-w-page lg:grid-cols-2 lg:gap-x-8 lg:gap-y-14 lg:overflow-visible lg:px-10 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {group.items.map((item, index) => (
              <li
                key={item.project.slug}
                className="w-[82vw] max-w-sm shrink-0 snap-start lg:w-auto lg:max-w-none lg:shrink"
              >
                <Reveal delay={(index % 2) * 70}>
                  <ProjectCard
                    {...item}
                    locale={locale}
                    priority={groupIndex === 0 && index < 2}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <CTA locale={locale} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.projects.label, path: path("projects", locale) },
        ])}
      />
    </>
  );
}
