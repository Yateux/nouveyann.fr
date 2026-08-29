import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { CTA } from "@/components/sections/CTA";
import { getDictionary } from "@/i18n/dictionaries";
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") notFound();

  return (
    <>
      <Hero locale={locale} />
      <Experience locale={locale} />
      <Work locale={locale} />
      <Capabilities locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
