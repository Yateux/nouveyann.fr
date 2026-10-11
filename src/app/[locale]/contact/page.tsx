import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { NewTab } from "@/components/ui/NewTab";
import { JsonLd } from "@/components/ui/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import { siteConfig } from "@/data/site";
import { calendlyHref, emailHref } from "@/lib/links";
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

const step = (value: number) => ({ "--i": value }) as CSSProperties;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader title={t.contact.title} lead={t.contact.lead} />

      <Container className="grid items-start gap-[clamp(32px,6vw,96px)] pt-[clamp(28px,4vw,56px)] min-[901px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* The quick way in, as the one inverted block of the page: the call,
            then how else to reach him. Same card as on the about page. */}
        <aside className="idcard min-[901px]:sticky min-[901px]:top-24">
          <div className="flex flex-col items-start gap-3.5" style={step(0)}>
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              {t.contact.bookTitle}
            </h2>
            <p className="idcard-muted">{t.contact.bookText}</p>
            <TrackedLink
              event="booking_click"
              payload={{ from: "contact" }}
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-chalk mt-1"
            >
              {t.contact.bookCta}
              <NewTab label={t.nav.newTab} />
              <ArrowRight aria-hidden="true" className="ico" />
            </TrackedLink>
          </div>

          <dl style={step(1)}>
            <div className="idcard-row">
              <dt className="idcard-muted text-[0.85rem]">
                {t.contact.infoEmail}
              </dt>
              <dd className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <TrackedAnchor
                  event="email_click"
                  payload={{ from: "contact" }}
                  href={emailHref}
                  className="font-mono text-[0.95rem] font-medium"
                >
                  <span className="link-underline">{siteConfig.email}</span>
                </TrackedAnchor>
                <CopyButton
                  value={siteConfig.email}
                  label={t.contact.copy}
                  doneLabel={t.contact.copied}
                  onBlock
                />
              </dd>
            </div>
            <div className="idcard-row">
              <dt className="idcard-muted text-[0.85rem]">
                {t.contact.infoWhere}
              </dt>
              <dd className="font-display text-[1.05rem] font-semibold">
                {t.contact.infoWhereValue}
              </dd>
            </div>
            <div className="idcard-row">
              <dt className="idcard-muted text-[0.85rem]">
                {t.contact.infoReply}
              </dt>
              <dd className="font-display text-[1.05rem] font-semibold">
                {t.contact.infoReplyValue}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="flex min-w-0 flex-col gap-[18px]">
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
            {t.contact.writeTitle}
          </h2>
          <p className="text-ink-muted">{t.contact.writeText}</p>
          <ContactForm locale={locale} />
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
