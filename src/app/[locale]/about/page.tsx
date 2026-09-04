import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Capabilities } from "@/components/sections/Capabilities";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { externalLinks, isPlaceholder } from "@/data/site";
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  const links = externalLinks.flatMap((link) => {
    if (isPlaceholder(link.href)) return [];
    const href = safeUrl(link.href);
    return href ? [{ label: link.label, href }] : [];
  });

  return (
    <>
      <PageHeader label={t.about.label} title={t.about.title} />

      <Container className="pb-12 lg:pb-16">
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex flex-col gap-5 text-body-lg text-ink-muted">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <dl className="mt-10 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {t.about.facts.map((fact) => (
              <div key={fact.term} className="bg-canvas p-5">
                <dt className="mark text-ink-subtle">{fact.term}</dt>
                <dd className="mt-2 text-body-md text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {links.length > 0 ? (
            <div className="mt-12">
              <Label as="h2">{t.about.elsewhere}</Label>

              <ul className="mt-5 flex flex-wrap gap-3">
                {links.map((link) => (
                  <li key={link.label} className="flex-1 sm:flex-none">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-12 items-center justify-between gap-4 rounded-card border border-line-strong bg-sand-soft px-4 transition-colors duration-300 hover:border-ink hover:bg-ink sm:justify-start sm:px-5"
                    >
                      <span className="mark whitespace-nowrap text-ink transition-colors duration-300 group-hover:text-canvas">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-ink-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-canvas"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>
      </Container>

      <Capabilities locale={locale} spacingBottom="pb-8 lg:pb-10" />
      <Skills locale={locale} />
      <Process locale={locale} />
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
