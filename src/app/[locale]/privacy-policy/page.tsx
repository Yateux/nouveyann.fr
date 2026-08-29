import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { getPrivacyPolicy } from "@/data/legal";
import { buildMetadata, localeParams, resolveLocale } from "@/i18n/page";

export const generateStaticParams = localeParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = getPrivacyPolicy(locale);
  return buildMetadata({
    locale,
    route: "privacy",
    title: content.metaTitle,
    description: content.metaDescription,
    noIndex: true,
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const content = getPrivacyPolicy(locale);

  return (
    <LegalPage
      title={content.title}
      intro={content.intro}
      sections={content.sections}
    />
  );
}
