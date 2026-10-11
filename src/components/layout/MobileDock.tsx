"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Layers, LayoutGrid, Mail, UserRound } from "lucide-react";
import { defaultLocale, path, type Locale, type RouteKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const ITEMS: { route: RouteKey; icon: typeof House }[] = [
  { route: "home", icon: House },
  { route: "projects", icon: LayoutGrid },
  { route: "expertise", icon: Layers },
  { route: "about", icon: UserRound },
  { route: "contact", icon: Mail },
];

/** Scroll this far before the bar may leave; smaller moves are ignored. */
const TOP_ZONE = 80;
const NUDGE = 6;

/**
 * Navigation on phones and small tablets: a floating bar at the bottom,
 * within reach of the thumb. It slides away while the page scrolls down, so the content has the
 * whole screen, and comes back as soon as the page scrolls up. Wide screens
 * keep the navigation in the header and never render this one.
 */
export function MobileDock({ locale = defaultLocale }: { locale?: Locale }) {
  const pathname = usePathname();
  const dockRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const t = getDictionary(locale).nav;

  const labels: Record<string, string> = {
    home: t.home,
    projects: t.projects,
    expertise: t.expertise,
    about: t.about,
    contact: t.contact,
  };

  // Hide on the way down, show on the way up. Written straight to the DOM
  // from one frame per scroll: scrolling never re-renders anything.
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y < TOP_ZONE || y < last - NUDGE) dock.removeAttribute("data-away");
      else if (y > last + NUDGE) dock.setAttribute("data-away", "");
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The highlight slides to the current section, and the bar is back in view
  // on every new page.
  useEffect(() => {
    const dock = dockRef.current;
    const pill = pillRef.current;
    if (!dock || !pill) return;
    dock.removeAttribute("data-away");

    const place = () => {
      const link = dock.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
      pill.style.opacity = "1";
    };

    place();
    void document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    const frame = requestAnimationFrame(() =>
      dock.setAttribute("data-ready", ""),
    );
    return () => {
      window.removeEventListener("resize", place);
      cancelAnimationFrame(frame);
    };
  }, [pathname, locale]);

  return (
    <nav ref={dockRef} aria-label={t.mainNavigation} className="dock">
      <span ref={pillRef} aria-hidden="true" className="dock-pill" />
      {ITEMS.map(({ route, icon: Icon }) => {
        const href = path(route, locale);
        const active =
          route === "home"
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={route}
            href={href}
            aria-current={active ? "page" : undefined}
            className="dock-item"
          >
            <Icon
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              strokeWidth={1.75}
            />
            {labels[route]}
          </Link>
        );
      })}
    </nav>
  );
}
