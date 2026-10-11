import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { NewTab } from "@/components/ui/NewTab";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsTimeline } from "@/components/sections/SkillsTimeline";
import { CTA } from "@/components/sections/CTA";
import { publishedJobs } from "@/data/experience";
import { publishedJobsEn } from "@/data/experience.en";
import { getSkills } from "@/data/skills";
import { externalLinks, isPlaceholder, siteConfig } from "@/data/site";
import { safeUrl } from "@/lib/safeUrl";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
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
  const t = getDictionary(locale).about;
  return buildMetadata({
    locale,
    route: "about",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

const step = (value: number) => ({ "--i": value }) as CSSProperties;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const jobs = locale === "fr" ? publishedJobs : publishedJobsEn;

  const links = externalLinks.flatMap((link) => {
    if (isPlaceholder(link.href)) return [];
    const href = safeUrl(link.href);
    return href ? [{ label: link.label, href }] : [];
  });

  return (
    <>
      <Container className="grid items-start gap-[clamp(32px,6vw,88px)] pt-[clamp(36px,6vw,80px)] min-[901px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="in flex flex-col gap-[18px]">
          <h1 className="max-w-[18ch] text-display-lg">{t.about.title}</h1>
          {t.about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              style={step(index + 1)}
              className={
                index === 0
                  ? "max-w-[40rem] pt-2 font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.35] font-medium tracking-[-0.01em]"
                  : "max-w-[40rem] text-body-md text-ink-muted"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Who, where and how to reach him, as one object: it opens when the
            page loads and stays beside the text on a wide screen. */}
        <aside className="idcard min-[901px]:sticky min-[901px]:top-24">
          <div className="flex items-center gap-3.5" style={step(0)}>
            <span className="idcard-mark" aria-hidden="true">
              YN
            </span>
            <p className="flex flex-col">
              <span className="font-display text-[1.25rem] leading-[1.2] font-semibold">
                {siteConfig.name}
              </span>
              <span className="idcard-muted text-[0.9rem]">
                {t.jsonLd.jobTitle}
              </span>
            </p>
          </div>

          <dl style={step(1)}>
            {t.about.facts.map((fact) => (
              <div key={fact.term} className="idcard-row">
                <dt className="idcard-muted text-[0.85rem]">{fact.term}</dt>
                <dd className="font-display text-[1.05rem] font-semibold">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {links.length > 0 ? (
            <div style={step(2)}>
              <h2 className="idcard-muted mb-3 font-sans text-[0.85rem]">
                {t.about.elsewhere}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="idcard-pill"
                    >
                      {link.label}
                      <NewTab label={t.nav.newTab} />
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </Container>

      {jobs.length > 0 ? (
        <section className="sec">
          <Container>
            <div className="sec-head">
              <h2 className="text-headline-md">{t.about.experiences}</h2>
            </div>
            <ExperienceTimeline jobs={jobs} />
          </Container>
        </section>
      ) : null}

      <section className="sec">
        <Container>
          <div className="sec-head">
            <h2 className="text-headline-md">{t.skills.label}</h2>
          </div>
          <SkillsTimeline groups={getSkills(locale)} />
        </Container>
      </section>

      <CTA locale={locale} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.about.label, path: path("about", locale) },
        ])}
      />
    </>
  );
}
