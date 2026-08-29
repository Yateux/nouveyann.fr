import Link from "next/link";
import {
  Blocks,
  Gauge,
  Layers,
  RefreshCw,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { services } from "@/data/expertise";
import { servicesEn } from "@/data/expertise.en";
import { defaultLocale, projectPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/cn";

const ICONS = [Layers, Blocks, Gauge, Smartphone, RefreshCw, Wrench];

// spacingBottom replaces the bottom margin instead of adding to it: cn()
// does not merge conflicting classes.
export function Capabilities({
  locale = defaultLocale,
  spacingBottom = "pb-20 lg:pb-section",
}: {
  locale?: Locale;
  spacingBottom?: string;
}) {
  const list = locale === "fr" ? services : servicesEn;
  const t = getDictionary(locale).home;
  const fillers = (3 - (list.length % 3)) % 3;

  return (
    <section className={cn("pt-6 lg:pt-10", spacingBottom)}>
      <Container>
        <div className="mb-10 lg:mb-12">
          <Label as="h2">{t.capabilitiesLabel}</Label>
        </div>

        <ul className="grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service, index) => {
            const Icon = ICONS[index] ?? Layers;
            const example = service.exampleSlug
              ? getProject(service.exampleSlug)
              : undefined;

            return (
              <li
                key={service.title}
                className="flex gap-4 bg-canvas p-6 sm:flex-col sm:gap-6 sm:p-8 lg:p-10"
              >
                <Icon
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 stroke-1 text-ink sm:mt-0 sm:h-6 sm:w-6"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
                  <h3 className="font-display text-headline-md text-ink">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-body-md text-ink-muted">
                    {service.description}
                  </p>
                  {example ? (
                    <Link
                      href={projectPath(example.slug, locale)}
                      className="mark text-ink/60 transition-colors hover:text-ink"
                    >
                      <span className="link-underline">{example.name}</span>
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}

          {Array.from({ length: fillers }, (_, index) => (
            <li
              key={`filler-${index}`}
              aria-hidden="true"
              className="hidden bg-canvas lg:block"
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
