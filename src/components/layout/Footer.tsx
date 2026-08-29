import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { externalLinks, isPlaceholder, siteConfig } from "@/data/site";
import { safeUrl } from "@/lib/safeUrl";
import { emailHref } from "@/lib/links";
import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const year = new Date().getFullYear();
  const t = getDictionary(locale).footer;

  const elsewhere = externalLinks.flatMap((link) => {
    if (isPlaceholder(link.href)) return [];
    const href = safeUrl(link.href);
    return href ? [{ label: link.label, href }] : [];
  });

  return (
    <footer className="w-full border-t border-ink/5 bg-sand-soft">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="mark text-ink-muted">{t.where}</span>
            <span className="text-body-lg text-ink">{siteConfig.region}</span>
            <span className="text-body-md text-ink-muted">{t.remote}</span>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <span className="mark text-ink-muted">{t.reach}</span>
            <a
              href={emailHref}
              className="link-underline text-body-lg text-ink"
            >
              {siteConfig.email}
            </a>
            {elsewhere.length > 0 ? (
              <ul className="flex flex-wrap gap-4 md:justify-end">
                {elsewhere.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-md text-ink transition-opacity hover:opacity-70"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="mark text-ink-muted">
            © {year} {siteConfig.name}
          </span>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              { href: path("legalNotice", locale), label: t.legalNotice },
              { href: path("privacy", locale), label: t.privacy },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mark text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#contenu"
                className="mark text-ink-muted transition-colors hover:text-ink"
              >
                {t.backToTop}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
