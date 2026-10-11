import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Arm } from "@/components/ui/Arm";
import { calendlyHref, emailHref } from "@/lib/links";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { TrackedAnchor } from "@/components/ui/TrackedAnchor";
import { NewTab } from "@/components/ui/NewTab";
import { siteConfig } from "@/data/site";
import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const step = (value: number) => ({ "--i": value }) as CSSProperties;

export function CTA({
  locale = defaultLocale,
  title,
  description,
}: {
  locale?: Locale;
  title?: React.ReactNode;
  description?: string;
}) {
  const t = getDictionary(locale);

  return (
    <Arm
      as="section"
      className="sec mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12"
    >
      <div className="cta">
        <h2
          style={step(0)}
          className="max-w-[14ch] text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.03] font-bold tracking-[-0.035em]"
        >
          {title ?? t.cta.title}
        </h2>

        <p style={step(1)} className="max-w-[30rem] text-on-block-muted">
          {description ?? t.cta.description}
          <br />
          {t.contact.replyHint}
        </p>

        <div
          style={step(2)}
          className="flex max-w-full justify-center gap-3 max-[480px]:w-full max-[480px]:gap-2"
        >
          <TrackedLink
            event="booking_click"
            payload={{ from: "cta" }}
            href={calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-chalk whitespace-nowrap"
          >
            {t.cta.book}
            <NewTab label={t.nav.newTab} />
            <ArrowRight aria-hidden="true" className="ico" />
          </TrackedLink>
          <Link
            href={path("contact", locale)}
            className="btn btn-chalk-line whitespace-nowrap"
          >
            {t.cta.write}
          </Link>
        </div>

        <p style={step(3)} className="text-[0.9rem]">
          <TrackedAnchor
            event="email_click"
            payload={{ from: "cta" }}
            href={emailHref}
            className="font-mono font-medium"
          >
            <span className="link-underline">{siteConfig.email}</span>
          </TrackedAnchor>
        </p>
      </div>
    </Arm>
  );
}
