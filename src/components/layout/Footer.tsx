import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { NewTab } from "@/components/ui/NewTab";
import { externalLinks, isPlaceholder, siteConfig } from "@/data/site";
import { safeUrl } from "@/lib/safeUrl";
import { emailHref } from "@/lib/links";
import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const year = new Date().getFullYear();
  const t = getDictionary(locale);

  const elsewhere = externalLinks.flatMap((link) => {
    if (isPlaceholder(link.href)) return [];
    const href = safeUrl(link.href);
    return href ? [{ label: link.label, href }] : [];
  });

  const legal = [
    { href: path("legalNotice", locale), label: t.footer.legalNotice },
    { href: path("privacy", locale), label: t.footer.privacy },
  ];

  return (
    <footer>
      <Container>
        <div className="mt-[clamp(56px,8vw,96px)] flex flex-col gap-4 border-t border-rule py-7 text-[0.9rem] text-ink-muted max-md:items-center max-md:text-center">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 max-md:flex-col">
            <span>
              © {year} {siteConfig.name} · {t.contact.infoWhereValue}
            </span>
            <a href={emailHref} className="text-ink">
              <span className="link-underline">{siteConfig.email}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 max-md:flex-col">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 max-md:justify-center">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="link-underline">{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <MotionToggle
                  pause={t.nav.pauseMotion}
                  resume={t.nav.resumeMotion}
                  className="chip min-h-9 px-3.5 text-[0.82rem]"
                  icon
                />
              </li>
            </ul>

            {elsewhere.length > 0 ? (
              <ul
                aria-label={t.footer.elsewhere}
                className="flex flex-wrap gap-x-5 gap-y-2 max-md:justify-center"
              >
                {elsewhere.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="link-underline">{link.label}</span>
                      <NewTab label={t.nav.newTab} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
