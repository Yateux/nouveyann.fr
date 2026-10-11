import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Arm } from "@/components/ui/Arm";
import { Shot } from "@/components/ui/Shot";
import { JsonLd } from "@/components/ui/JsonLd";
import { NewTab } from "@/components/ui/NewTab";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import { CTA } from "@/components/sections/CTA";
import { CaseChapters } from "@/components/sections/CaseChapters";
import { projects } from "@/data/projects";
import { getProjectMedia } from "@/lib/media";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/jsonLd";
import { safeUrl } from "@/lib/safeUrl";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getNeighbours, getProject } from "@/i18n/getProjects";
import { path, projectPath } from "@/i18n/config";
import { buildMetadata, resolveLocale } from "@/i18n/page";

type Params = { params: Promise<{ locale: string; slug: string }> };

const MAX_DESCRIPTION_LENGTH = 160;

/** The address as a browser shows it: the host, without "www.". */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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
    <article>
      <Container className="in flex flex-col gap-4 pt-[clamp(36px,6vw,80px)]">
        <Link
          href={path("projects", locale)}
          className="go go-back self-start font-normal text-ink-muted"
        >
          <ArrowLeft aria-hidden="true" className="ico" />
          <span className="link-underline">{t.caseStudy.backToProjects}</span>
        </Link>

        <h1
          style={{ "--i": 1 } as CSSProperties}
          className="text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.05] font-bold tracking-[-0.035em]"
        >
          {project.name}
        </h1>

        <p
          style={{ "--i": 2 } as CSSProperties}
          className="max-w-[40rem] text-[clamp(1.1rem,1.8vw,1.35rem)] text-ink-muted"
        >
          {project.tagline}
        </p>
      </Container>

      <Container className="pt-[clamp(32px,4.5vw,56px)]">
        <figure className="overflow-hidden rounded-card border border-rule bg-soft">
          {/* The frame reads as a browser: when the project is online, its
              address is the way to the live site. */}
          <figcaption className="flex items-center gap-3 border-b border-rule bg-soft px-3.5 py-2.5 text-[0.85rem] text-ink-muted">
            <span className="live-dots text-[1rem]" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {liveUrl ? (
              <>
                <TrackedAnchor
                  event="live_site_click"
                  payload={{ slug: project.slug }}
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="address"
                >
                  <Lock aria-hidden="true" className="address-lock" />
                  <span className="sr-only">{t.caseStudy.viewLive} : </span>
                  <span className="address-host">{hostOf(liveUrl)}</span>
                  <NewTab label={t.nav.newTab} />
                  <ArrowUpRight aria-hidden="true" className="address-go" />
                </TrackedAnchor>
                <span className="pill max-[479px]:hidden">
                  <i aria-hidden="true" />
                  {t.caseStudy.live}
                </span>
              </>
            ) : (
              project.name
            )}
          </figcaption>
          <ViewTransition
            name={`shot-${project.slug}`}
            share="morph"
            default="none"
          >
            <Shot
              src={media.cover}
              alt={t.projects.previewAlt(project.name)}
              name={project.name}
              sizes="(max-width: 1247px) 92vw, 1104px"
              priority
              className="rounded-none border-0"
            />
          </ViewTransition>
        </figure>

        <dl className="mt-[clamp(24px,3vw,40px)] grid grid-cols-2 gap-x-8 gap-y-4 min-[901px]:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.term}
              className="flex flex-col gap-1 border-t border-line-strong pt-3.5"
            >
              <dt className="text-[0.9rem] text-ink-muted">{fact.term}</dt>
              <dd className="font-display text-[1.1rem] leading-[1.3] font-semibold">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <section className="sec">
        <Container>
          <CaseChapters chapters={chapters} label={t.caseStudy.chaptersLabel} />
        </Container>
      </section>

      {media.gallery.length > 0 ? (
        <section className="sec">
          <Container className="flex flex-col gap-5">
            <h2 className="sr-only">{t.caseStudy.gallery(project.name)}</h2>
            {media.gallery.map((shot) => (
              <Arm as="figure" key={shot.src}>
                <div className="gal-shot overflow-hidden rounded-card border border-rule bg-soft">
                  <Image
                    src={shot.src}
                    alt={`${project.name}, ${t.caseStudy.views[shot.kind]}`}
                    width={1600}
                    height={900}
                    sizes="(max-width: 1247px) 92vw, 1104px"
                    className="h-auto w-full"
                  />
                </div>
              </Arm>
            ))}
          </Container>
        </section>
      ) : null}

      {previous || next ? (
        <section className="sec">
          <Container>
            <nav
              aria-label={t.caseStudy.navLabel}
              className="grid border-y border-rule md:grid-cols-2 md:gap-6"
            >
              {previous ? (
                <Link
                  href={projectPath(previous.slug, locale)}
                  className="flex min-w-0 flex-col gap-1.5 py-7"
                >
                  <span className="go go-back font-normal text-ink-muted">
                    <ArrowLeft aria-hidden="true" className="ico" />
                    {t.caseStudy.previous}
                  </span>
                  <span className="font-display text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.02em]">
                    <span className="link-underline">{previous.name}</span>
                  </span>
                </Link>
              ) : (
                <span className="max-md:hidden" />
              )}

              {next ? (
                <Link
                  href={projectPath(next.slug, locale)}
                  className="flex min-w-0 flex-col gap-1.5 py-7 max-md:border-t max-md:border-rule md:items-end md:text-right"
                >
                  <span className="go font-normal text-ink-muted">
                    {t.caseStudy.next}
                    <ArrowRight aria-hidden="true" className="ico" />
                  </span>
                  <span className="font-display text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.02em]">
                    <span className="link-underline">{next.name}</span>
                  </span>
                </Link>
              ) : null}
            </nav>
          </Container>
        </section>
      ) : null}

      <CTA locale={locale} />

      <JsonLd data={creativeWorkJsonLd(project, locale, media.cover)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.projects.label, path: path("projects", locale) },
          { name: project.name, path: projectPath(project.slug, locale) },
        ])}
      />
    </article>
  );
}
