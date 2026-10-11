import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTA } from "@/components/sections/CTA";
import { ServiceRows, serviceAnchor } from "@/components/sections/ServiceRows";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { services } from "@/data/expertise";
import { servicesEn } from "@/data/expertise.en";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/jsonLd";
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
  const t = getDictionary(locale).expertise;
  return buildMetadata({
    locale,
    route: "expertise",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const list = locale === "fr" ? services : servicesEn;

  return (
    <>
      {/* The six services, named once before they are shown: the list below
          then reads as the answer to its own title. */}
      <PageHeader title={t.expertise.title} lead={t.expertise.lead}>
        <nav
          aria-label={t.home.capabilitiesLabel}
          style={{ "--i": 2 } as CSSProperties}
        >
          <ul className="chip-row">
            {list.map((service, index) => (
              <li key={service.title}>
                <a href={`#${serviceAnchor(index)}`} className="chip">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <section className="pt-[clamp(28px,4vw,48px)]">
        <Container>
          <ServiceRows locale={locale} />
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="sec-head">
            <h2 className="text-headline-md">{t.expertise.technologies}</h2>
          </div>
        </Container>
        <TechMarquee />
      </section>

      <CTA locale={locale} />

      <JsonLd data={servicesJsonLd(locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.expertise.label, path: path("expertise", locale) },
        ])}
      />
    </>
  );
}
