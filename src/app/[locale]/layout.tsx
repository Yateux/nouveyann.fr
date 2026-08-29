import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { getLogo } from "@/lib/media";
import { HtmlLang } from "@/components/ui/HtmlLang";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonLd";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <div lang={htmlLang[locale]}>
      <HtmlLang locale={locale} />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        {t.nav.skipToContent}
      </a>

      <Header logo={getLogo()} locale={locale} />
      <main id="contenu" className="pt-20">
        {children}
      </main>
      <Footer locale={locale} />

      <JsonLd data={personJsonLd(locale)} />
      <JsonLd data={websiteJsonLd(locale)} />
    </div>
  );
}
