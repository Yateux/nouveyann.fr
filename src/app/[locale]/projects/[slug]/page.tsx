import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";
import { projects } from "@/data/projects";
import { getProjectMedia } from "@/lib/media";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/jsonLd";
import { safeUrl } from "@/lib/safeUrl";
import { getCategories, getNeighbours, getProject } from "@/i18n/getProjects";
import { getDictionary } from "@/i18n/dictionaries";
import { path, projectPath } from "@/i18n/config";
import { buildMetadata, resolveLocale } from "@/i18n/page";


type Params = { params: Promise<{ locale: string; slug: string }> };

const MAX_DESCRIPTION_LENGTH = 160;

export function generateStaticParams() {
  return projects.map((project) => ({ locale: "en", slug: project.slug }));
}

function metaDescription(tagline: string, signoff: string): string {
  const padded = tagline + signoff;
  return padded.length <= MAX_DESCRIPTION_LENGTH ? padded : tagline;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const project = getProject(slug, locale);
  if (!project) return { title: "404" };

  const t = getDictionary(locale);
  const label = getCategories(locale)[project.category].label;

  return buildMetadata({
    locale,
    route: "projects",
    slug,
    title: `${project.name}, ${label}`,
    description: metaDescription(project.tagline, t.caseStudy.signoff),
    type: "article",
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const project = getProject(slug, locale);
  if (!project) notFound();

  const media = getProjectMedia(project.slug);
  const { previous, next } = getNeighbours(project.slug, locale);
  const label = getCategories(locale)[project.category].label;
  const liveUrl = project.url ? safeUrl(project.url) : null;

  const facts = [
    { term: t.caseStudy.facts.client, value: project.name },
    ...(project.sector
      ? [{ term: t.caseStudy.facts.sector, value: project.sector }]
      : []),
    ...(project.year
      ? [{ term: t.caseStudy.facts.year, value: project.year }]
      : []),
    { term: t.caseStudy.facts.type, value: label },
    { term: t.caseStudy.facts.tech, value: project.tech.join(", ") },
  ];

  const chapters = [
    { label: t.caseStudy.chapters.need, text: project.study.need },
    { label: t.caseStudy.chapters.solution, text: project.study.solution },
    { label: t.caseStudy.chapters.design, text: project.study.design },
    {
      label: t.caseStudy.chapters.development,
      text: project.study.development,
    },
    { label: t.caseStudy.chapters.result, text: project.study.result },
  ];

  return (
    <>
      <Container className="pt-10 lg:pt-16">
        <Link
          href={path("projects", locale)}
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="link-underline">{t.caseStudy.backToProjects}</span>
        </Link>

        <div className="mt-7 max-w-3xl">
          <Label>{label}</Label>
          <h1 className="mt-8 font-display text-display-lg text-ink">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-ink-muted">
            {project.tagline}
          </p>

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="link-underline">{t.caseStudy.viewLive}</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        {media.cover ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-card bg-sand-soft lg:mt-12">
            <Image
              src={media.cover}
              alt={t.projects.previewAlt(project.name)}
              fill
              sizes="(max-width: 1279px) 92vw, 1160px"
              priority
              className="object-cover object-top"
            />
          </div>
        ) : null}

        <dl className="mt-8 grid gap-x-10 gap-y-6 border-y border-ink/10 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt className="mark text-ink-subtle">{fact.term}</dt>
              <dd className="mt-2 text-[0.9375rem] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Section spacing="tight">
        <div className="flex flex-col">
          {chapters.map((chapter, index) => (
            <Reveal key={chapter.label} delay={index * 40}>
              <div className="grid gap-3 border-b border-ink/10 py-7 lg:grid-cols-[16rem_1fr] lg:gap-12">
                <h2 className="font-display text-headline-md whitespace-nowrap text-ink">
                  {chapter.label}
                </h2>
                <p className="max-w-2xl text-body-md text-ink-muted">
                  {chapter.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {media.gallery.length > 0 ? (
        <Container className="pb-14 lg:pb-16">
          <h2 className="sr-only">{t.caseStudy.gallery(project.name)}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {media.gallery.map((shot) => (
              <Reveal key={shot.src}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-sand-soft">
                    <Image
                      src={shot.src}
                      alt={`${project.name}, ${shot.label.toLowerCase()}`}
                      fill
                      sizes="(max-width: 767px) 92vw, 46vw"
                      className="object-cover object-top"
                    />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      ) : null}

      {previous || next ? (
        <Container className="pb-14 lg:pb-16">
          <nav
            aria-label={t.caseStudy.navLabel}
            className="flex items-start justify-between gap-6"
          >
            {previous ? (
              <Link
                href={projectPath(previous.slug, locale)}
                className="group flex min-w-0 flex-col gap-1"
              >
                <span className="mark inline-flex items-center gap-2 text-ink-subtle">
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  {t.caseStudy.previous}
                </span>
                <span className="truncate font-display text-body-lg text-ink sm:text-headline-md">
                  {previous.name}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={projectPath(next.slug, locale)}
                className="group flex min-w-0 flex-col items-end gap-1 text-right"
              >
                <span className="mark inline-flex items-center gap-2 text-ink-subtle">
                  {t.caseStudy.next}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span className="truncate font-display text-body-lg text-ink sm:text-headline-md">
                  {next.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Container>
      ) : null}

      <CTA locale={locale} />

      <JsonLd data={creativeWorkJsonLd(project, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.projects.label, path: path("projects", locale) },
          { name: project.name, path: projectPath(project.slug, locale) },
        ])}
      />
    </>
  );
}
