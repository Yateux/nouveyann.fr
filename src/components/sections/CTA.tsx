import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { calendlyHref, emailHref } from "@/lib/links";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import { siteConfig } from "@/data/site";
import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function CTA({
  locale = defaultLocale,
  title,
  description,
}: {
  locale?: Locale;
  title?: React.ReactNode;
  description?: string;
}) {
  const t = getDictionary(locale).cta;

  return (
    <section className="pt-10 pb-20 lg:pt-14 lg:pb-section">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-display-lg text-ink">
            {title ?? t.title}
          </h2>

          <p className="mx-auto mt-8 max-w-md text-body-md text-ink-muted">
            {description ?? t.description}
          </p>

          <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
            <TrackedLink
              event="booking_click"
              payload={{ from: "cta" }}
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 flex-1 items-center justify-center bg-ink px-4 text-label-sm whitespace-nowrap text-canvas uppercase transition-opacity duration-300 hover:opacity-85 sm:h-16 sm:flex-none sm:px-10"
            >
              {t.book}
            </TrackedLink>
            <Link
              href={path("contact", locale)}
              className="inline-flex h-14 flex-1 items-center justify-center border border-ink/20 px-4 text-label-sm whitespace-nowrap text-ink uppercase transition-colors duration-300 hover:border-ink sm:h-16 sm:flex-none sm:px-10"
            >
              {t.write}
            </Link>
          </div>

          <p className="mt-10">
            <TrackedAnchor
              event="email_click"
              payload={{ from: "cta" }}
              href={emailHref}
              className="link-underline mark text-ink-muted hover:text-ink"
            >
              {siteConfig.email}
            </TrackedAnchor>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
