"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { defaultLocale, englishEnabled, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getNav, otherLocale, switchPath } from "@/i18n/nav";
import { cn } from "@/lib/cn";
import { calendlyHref, emailHref } from "@/lib/links";

// Must be mounted outside <header>: its backdrop-filter creates a containing
// block, and the fixed panel would shrink to the bar's height.
export function MobileMenu({
  open,
  onClose,
  pathname,
  locale = defaultLocale,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  locale?: Locale;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      const inside =
        active instanceof Node && panelRef.current?.contains(active);

      if (event.shiftKey) {
        if (!inside || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.querySelector("a")?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const t = getDictionary(locale);
  const links = getNav(locale);
  const other = otherLocale(locale);

  return (
    <div
      ref={panelRef}
      inert={!open}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-canvas transition-opacity duration-300 md:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-ink/10 px-5 sm:px-8">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center bg-ink text-[0.6875rem] font-semibold text-canvas"
          >
            YN
          </span>
          <span className="mark tracking-[0.2em] text-ink">
            {siteConfig.name}
          </span>
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink transition-opacity hover:opacity-70"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <nav
        aria-label="Navigation principale"
        className="flex-1 overflow-y-auto px-5 sm:px-8"
      >
        <ul className="flex flex-col">
          {links.map((link, index) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href} className="border-b border-ink/10">
                <Link
                  href={link.href}
                  prefetch={false}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  style={{
                    transitionDelay: open ? `${60 + index * 50}ms` : "0ms",
                  }}
                  className={cn(
                    "flex items-baseline gap-4 py-6 transition-all duration-300",
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0",
                  )}
                >
                  <span className="mark w-6 shrink-0 text-ink/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-headline-lg",
                      active ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {englishEnabled ? (
          <Link
            href={switchPath(pathname, locale)}
            hrefLang={other}
            onClick={onClose}
            className="mark mt-8 inline-flex text-ink-subtle transition-colors hover:text-ink"
          >
            <span aria-hidden="true" className="mr-2">{t.nav.switchFlag}</span>
            {t.nav.switchLanguage}
          </Link>
        ) : null}
      </nav>

      <div className="shrink-0 border-t border-ink/10 px-5 py-8 sm:px-8">
        <p className="mark text-ink-subtle">{t.footer.reach}</p>

        <a
          href={emailHref}
          className="link-underline mt-3 inline-block text-body-md text-ink"
        >
          {siteConfig.email}
        </a>

        <p className="mt-1 text-body-md text-ink-muted">
          {t.contact.infoWhereValue}
        </p>

        <a
          href={calendlyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-ink px-6 text-label-sm text-canvas uppercase transition-opacity hover:opacity-85"
        >
          Réserver un appel
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
