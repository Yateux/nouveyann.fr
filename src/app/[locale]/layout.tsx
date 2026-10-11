import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { JsonLd } from "@/components/ui/JsonLd";
import { getLogo } from "@/lib/media";
import { HtmlLang } from "@/components/ui/HtmlLang";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonLd";
import { htmlLang, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
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
    // Below the desktop layout, the bottom padding keeps the end of the page
    // clear of the floating navigation.
    <div
      lang={htmlLang[locale]}
      className="flex min-h-dvh flex-col max-lg:pb-[calc(100px+env(safe-area-inset-bottom,0px))]"
    >
      <HtmlLang locale={locale} />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-on-ink"
      >
        {t.nav.skipToContent}
      </a>
      {/* Reached with the keyboard before anything moves on the page. */}
      <MotionToggle
        pause={t.nav.pauseMotion}
        resume={t.nav.resumeMotion}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-on-ink"
      />

      <Header logo={getLogo()} locale={locale} />
      <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer locale={locale} />
      <MobileDock locale={locale} />

      <JsonLd data={personJsonLd(locale)} />
      <JsonLd data={websiteJsonLd(locale)} />
    </div>
  );
}
