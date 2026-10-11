"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  defaultLocale,
  englishEnabled,
  locales,
  path,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getNav, switchPath } from "@/i18n/nav";
import { trackNamed } from "@/lib/analytics";
import { calendlyHref } from "@/lib/links";
import { Container } from "@/components/ui/Container";
import { NewTab } from "@/components/ui/NewTab";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { cn } from "@/lib/cn";

function Mark({ logo }: { logo: string | null }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={34}
        height={34}
        className="h-[34px] w-[34px] rounded-tile"
        loading="eager"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid h-[34px] w-[34px] place-items-center rounded-tile bg-ink text-[0.8rem] font-bold text-on-ink"
    >
      YN
    </span>
  );
}

const LANGUAGE_PILL =
  "flex h-[34px] min-w-[34px] items-center justify-center rounded-full px-2 sm:min-w-[38px] sm:px-2.5 " +
  "text-[0.78rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-200";

export function Header({
  logo,
  locale = defaultLocale,
}: {
  logo: string | null;
  locale?: Locale;
}) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const t = getDictionary(locale);
  const nav = getNav(locale);

  // The underline slides to the current section. It is placed by hand rather
  // than through state, so navigating never re-renders the bar twice.
  useEffect(() => {
    const element = navRef.current;
    const indicator = indicatorRef.current;
    if (!element || !indicator) return;

    const place = () => {
      const link = element.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      indicator.style.opacity = "1";
    };

    place();
    void document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    // The slide is switched on after the first placement, so loading a page
    // does not animate the underline in from the left.
    const frame = requestAnimationFrame(() =>
      element.setAttribute("data-ready", ""),
    );

    return () => {
      window.removeEventListener("resize", place);
      cancelAnimationFrame(frame);
    };
  }, [pathname, locale]);

  return (
    <header className="z-30 border-b border-rule bg-canvas lg:sticky lg:top-0">
      {/* One line at every width: the controls never drop under the name. */}
      <Container className="flex items-center justify-between gap-x-3 py-3.5 sm:gap-x-6">
        <Link
          href={path("home", locale)}
          className="flex min-w-0 items-center gap-2 font-display font-semibold whitespace-nowrap sm:gap-3"
        >
          <Mark logo={logo} />
          <span className="max-[339px]:sr-only">{siteConfig.name}</span>
        </Link>

        <nav
          ref={navRef}
          aria-label={t.nav.mainNavigation}
          // Phones and small tablets navigate from the bar at the bottom.
          className="nav relative flex gap-7 text-[0.95rem] max-lg:hidden"
        >
          {nav.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "py-2.5 transition-colors duration-150 hover:text-ink",
                  active ? "text-ink" : "text-ink-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <span ref={indicatorRef} aria-hidden="true" className="nav-ind" />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle toDark={t.nav.toDark} toLight={t.nav.toLight} />

          {englishEnabled ? (
            <div
              role="group"
              aria-label={t.nav.language}
              className="flex rounded-full border border-line-strong p-0.5"
            >
              {locales.map((code) =>
                code === locale ? (
                  <span
                    key={code}
                    aria-current="true"
                    className={cn(LANGUAGE_PILL, "bg-ink text-on-ink")}
                  >
                    {code}
                  </span>
                ) : (
                  <Link
                    key={code}
                    href={switchPath(pathname, locale)}
                    hrefLang={code}
                    lang={code}
                    aria-label={`${code.toUpperCase()}, ${t.nav.switchLanguage}`}
                    onClick={() => trackNamed("language_switch", { to: code })}
                    className={cn(
                      LANGUAGE_PILL,
                      "text-ink-muted hover:text-ink",
                    )}
                  >
                    {code}
                  </Link>
                ),
              )}
            </div>
          ) : null}

          <TrackedLink
            event="booking_click"
            payload={{ from: "header" }}
            href={calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid min-h-10 px-4 text-[0.88rem] max-[560px]:hidden"
          >
            {t.cta.book}
            <NewTab label={t.nav.newTab} />
          </TrackedLink>

          {/* Too narrow for the label: the same call, as an icon. */}
          <TrackedLink
            event="booking_click"
            payload={{ from: "header" }}
            href={calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.cta.book} (${t.nav.newTab})`}
            className="btn btn-solid min-h-[38px] w-[38px] p-0 min-[561px]:hidden"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
          </TrackedLink>
        </div>
      </Container>
    </header>
  );
}
