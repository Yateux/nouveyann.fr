import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Label } from "@/components/ui/Label";
import { ContactForm } from "@/components/ui/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/data/site";
import { calendlyHref, emailHref } from "@/lib/links";
import { TrackedLink } from "@/components/ui/TrackedLink";
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
  const t = getDictionary(locale).contact;
  return buildMetadata({
    locale,
    route: "contact",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const FACTS = [
    { term: t.contact.infoEmail, value: siteConfig.email, href: emailHref },
    { term: t.contact.infoWhere, value: t.contact.infoWhereValue },
    { term: t.contact.infoReply, value: t.contact.infoReplyValue },
  ];

  return (
    <>
      <PageHeader
        label={t.contact.label}
        title={t.contact.title}
        lead={t.contact.lead}
      />

      <Container className="pb-20 lg:pb-section">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-gutter">
          <div className="flex flex-col gap-8">
            <div className="border border-ink/10 bg-surface p-6 sm:p-8">
              <Label as="h2">{t.contact.bookLabel}</Label>
              <p className="mt-5 font-display text-headline-md text-ink">
                {t.contact.bookTitle}
              </p>
              <p className="mt-3 text-body-md text-ink-muted">
                {t.contact.bookText}
              </p>
              <TrackedLink
                event="booking_click"
                payload={{ from: "contact" }}
                href={calendlyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-14 items-center justify-center bg-ink px-8 text-label-sm whitespace-nowrap text-canvas uppercase transition-opacity duration-300 hover:opacity-85"
              >
                {t.contact.bookCta}
              </TrackedLink>
            </div>

            <dl className="grid gap-px border border-ink/10 bg-ink/10">
              {FACTS.map((fact) => (
                <div
                  key={fact.term}
                  className="flex flex-col gap-1 bg-canvas p-5 sm:flex-row sm:gap-6"
                >
                  <dt className="mark w-28 shrink-0 text-ink-subtle">
                    {fact.term}
                  </dt>
                  <dd className="text-body-md text-ink">
                    {fact.href ? (
                      <a href={fact.href} className="link-underline">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <Label as="h2">{t.contact.writeLabel}</Label>
            <p className="mt-5 font-display text-headline-md text-ink">
              {t.contact.writeTitle}
            </p>
            <p className="mt-3 text-body-md text-ink-muted">
              {t.contact.writeText}
            </p>
            <div className="mt-6">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: path("home", locale) },
          { name: t.contact.label, path: path("contact", locale) },
        ])}
      />
    </>
  );
}
