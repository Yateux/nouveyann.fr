import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLegalNotice } from "@/data/legal";
import { buildMetadata, localeParams, resolveLocale } from "@/i18n/page";

export const generateStaticParams = localeParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = getLegalNotice(locale);
  return buildMetadata({
    locale,
    route: "legalNotice",
    title: content.metaTitle,
    description: content.metaDescription,
    noIndex: true,
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const content = getLegalNotice(locale);

  return (
    <LegalPage
      title={content.title}
      intro={content.intro}
      sections={content.sections}
    />
  );
}
