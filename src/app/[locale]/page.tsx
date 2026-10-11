import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/sections/Hero";
import { WorkSplit } from "@/components/sections/WorkSplit";
import { Showcase } from "@/components/sections/Showcase";
import { serviceAnchor } from "@/components/sections/ServiceRows";
import { ServiceVisual } from "@/components/sections/ServiceVisuals";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { CTA } from "@/components/sections/CTA";
import { publishedJobs } from "@/data/experience";
import { publishedJobsEn } from "@/data/experience.en";
import { services } from "@/data/expertise";
import { servicesEn } from "@/data/expertise.en";
import { path, projectPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getCategories,
  getFeaturedProjects,
  getProjects,
} from "@/i18n/getProjects";
import { getProjectMedia } from "@/lib/media";
import { buildMetadata, localeParams, resolveLocale } from "@/i18n/page";

export const generateStaticParams = localeParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).home;
  return buildMetadata({
    locale,
    route: "home",
    title: t.metaTitle,
    description: t.metaDescription,
    absoluteTitle: true,
  });
}

function SectionHead({
  title,
  href,
  link,
}: {
  title: string;
  href: string;
  link: string;
}) {
  return (
    <div className="sec-head">
      <h2 className="text-headline-md">{title}</h2>
      <Link href={href} className="go">
        <span className="link-underline">{link}</span>
        <ArrowRight aria-hidden="true" className="ico" />
      </Link>
    </div>
  );
}

function featuredWork(locale: Locale) {
  const t = getDictionary(locale);
  const categories = getCategories(locale);

  return getFeaturedProjects(locale)
    .slice(0, 4)
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      category: categories[project.category].label,
      meta: project.tech.join(" · "),
      tagline: project.tagline,
      href: projectPath(project.slug, locale),
      src: getProjectMedia(project.slug).cover,
      alt: t.projects.previewAlt(project.name),
    }));
}

const DECK = 3;
const RECENT_JOBS = 4;

/**
 * One reel entry per service. A service with an example stands for a type of
 * project: it shows real captures of that type, the example in front. The
 * others have no project to show: each plays its own animation, the same one
 * as on the expertise page.
 */
function showcase(locale: Locale) {
  const t = getDictionary(locale);
  const projects = getProjects(locale);
  let withoutCaptures = 0;

  return (locale === "fr" ? services : servicesEn).map((service, index) => {
    const example = projects.find(
      (project) => project.slug === service.exampleSlug,
    );

    if (!example) {
      const order = withoutCaptures++;
      return {
        title: service.title,
        tab: service.short ?? service.title,
        description: service.description,
        link: {
          href: `${path("expertise", locale)}#${serviceAnchor(index)}`,
          label: t.home.detail,
        },
        shots: [],
        visual: <ServiceVisual order={order} locale={locale} />,
      };
    }

    const all = projects.filter(
      (project) => project.category === example.category,
    );
    const rest = all.filter((project) => project !== example);
    const shown = [
      example,
      ...rest.filter((project) => project.featured),
      ...rest.filter((project) => !project.featured),
    ].slice(0, DECK);

    return {
      title: service.title,
      tab: service.short ?? service.title,
      description: service.description,
      link: {
        href:
          all.length > 1
            ? `${path("projects", locale)}#${example.category}`
            : projectPath(example.slug, locale),
        label: t.expertise.seeProjects(all.length),
      },
      shots: shown.map((project) => ({
        name: project.name,
        src: getProjectMedia(project.slug).cover,
        alt: t.projects.previewAlt(project.name),
      })),
    };
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") notFound();
  const t = getDictionary(locale).home;
  const jobs = (locale === "fr" ? publishedJobs : publishedJobsEn).slice(
    0,
    RECENT_JOBS,
  );

  return (
    <>
      <Hero locale={locale} />

      <section className="sec">
        <Container>
          <SectionHead
            title={t.workLabel}
            href={path("projects", locale)}
            link={t.allProjects}
          />
          <WorkSplit
            items={featuredWork(locale)}
            linkLabel={t.viewCaseStudy}
            label={t.workLabel}
          />
        </Container>
      </section>

      {/* A soft band: it sets the services apart from the work above and the
          career below. */}
      <section className="mt-[clamp(48px,7vw,88px)] bg-soft py-[clamp(40px,6vw,72px)]">
        <Container>
          <SectionHead
            title={t.capabilitiesLabel}
            href={path("expertise", locale)}
            link={t.detail}
          />
          <Showcase items={showcase(locale)} label={t.capabilitiesLabel} />
        </Container>
      </section>

      {jobs.length > 0 ? (
        <section className="sec">
          <Container>
            <SectionHead
              title={t.experienceLabel}
              href={path("about", locale)}
              link={t.fullCareer}
            />
            <ExperienceTimeline jobs={jobs} />
          </Container>
        </section>
      ) : null}

      <CTA locale={locale} />
    </>
  );
}
