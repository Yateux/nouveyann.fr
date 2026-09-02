"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  defaultLocale,
  englishEnabled,
  path,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getNav, otherLocale, switchPath } from "@/i18n/nav";
import { trackNamed } from "@/lib/analytics";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/cn";

function Mark({ logo }: { logo: string | null }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 items-center justify-center bg-ink text-[0.6875rem] font-semibold text-canvas"
    >
      YN
    </span>
  );
}

export function Header({
  logo,
  locale = defaultLocale,
}: {
  logo: string | null;
  locale?: Locale;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const t = getDictionary(locale);
  const nav = getNav(locale);
  const other = otherLocale(locale);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-canvas/80 backdrop-blur-md transition-shadow duration-200",
          scrolled && "shadow-[0_1px_0_0_rgba(34,50,63,0.1)]",
        )}
      >
        <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-10">
          <div className="relative flex h-20 items-center justify-between border-b border-ink/10">
            <Link
              href={path("home", locale)}
              className="flex items-center gap-2.5"
            >
              <Mark logo={logo} />
              <span className="mark tracking-[0.2em] text-ink">
                {siteConfig.name}
              </span>
            </Link>

            <nav
              aria-label={t.nav.mainNavigation}
              className="absolute left-1/2 hidden -translate-x-1/2 md:block"
            >
              <ul className="flex items-center gap-8">
                {nav.map((link) => {
                  const active =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "mark pb-1 transition-colors",
                          active
                            ? "border-b border-ink text-ink"
                            : "border-b border-transparent text-ink-subtle hover:text-ink",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {englishEnabled ? (
                <Link
                  href={switchPath(pathname, locale)}
                onClick={() => trackNamed("language_switch", { to: other })}
                  hrefLang={other}
                  className="mark hidden text-ink-subtle transition-colors hover:text-ink md:inline-flex"
                >
                  <span aria-hidden="true" className="mr-2">{t.nav.switchFlag}</span>
                  {t.nav.switchLanguage}
                </Link>
              ) : null}

              <Link
                href={path("contact", locale)}
                aria-label="Me contacter"
                className="hidden h-9 w-9 items-center justify-center rounded-full bg-ink text-canvas transition-colors hover:bg-ink-hover md:flex"
              >
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-ink transition-opacity hover:opacity-70 md:hidden"
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        locale={locale}
        open={menuOpen}
        onClose={closeMenu}
        pathname={pathname}
      />
    </>
  );
}
