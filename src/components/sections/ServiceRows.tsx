import type { CSSProperties, ReactNode } from "react";
import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Arm } from "@/components/ui/Arm";
import { Shot } from "@/components/ui/Shot";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { NewTab } from "@/components/ui/NewTab";
import { ServiceVisual } from "@/components/sections/ServiceVisuals";
import { services } from "@/data/expertise";
import { servicesEn } from "@/data/expertise.en";
import { defaultLocale, path, projectPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjects } from "@/i18n/getProjects";
import { calendlyHref } from "@/lib/links";
import { getProjectMedia } from "@/lib/media";
import { cn } from "@/lib/cn";

const SHOWN = 3;

const SIZES: Record<number, string> = {
  1: "(max-width: 900px) 92vw, 720px",
  2: "(max-width: 900px) 46vw, 350px",
  3: "(max-width: 767px) 46vw, (max-width: 900px) 30vw, 230px",
};

/** The anchor of a service on the expertise page, shared with its index. */
export const serviceAnchor = (index: number) => `service-${index + 1}`;

/**
 * What I do, one row per service: its sentence and a way forward on one side,
 * the proof on the other.
 *
 * A service with an example stands for a whole type of project, so it shows
 * the real projects of that type, the example first. The others have no
 * project to show: each gets a small animation of its own, and its link opens
 * a conversation.
 */
export function ServiceRows({
  locale = defaultLocale,
}: { locale?: Locale } = {}) {
  const t = getDictionary(locale);
  const list = locale === "fr" ? services : servicesEn;
  const projects = getProjects(locale);
  // Without a project to open, the next step is to talk: a call first, then
  // a message.
  const conversations: ReactNode[] = [
    <TrackedLink
      key="call"
      event="booking_click"
      payload={{ from: "expertise" }}
      href={calendlyHref}
      target="_blank"
      rel="noopener noreferrer"
      className="go"
    >
      <span className="link-underline">{t.cta.book}</span>
      <NewTab label={t.nav.newTab} />
      <ArrowRight aria-hidden="true" className="ico" />
    </TrackedLink>,
    <Link key="message" href={path("contact", locale)} className="go">
      <span className="link-underline">{t.cta.write}</span>
      <ArrowRight aria-hidden="true" className="ico" />
    </Link>,
  ];
  let withoutProject = 0;

  return (
    <ul>
      {list.map((service, index) => {
        const example = projects.find(
          (project) => project.slug === service.exampleSlug,
        );
        const all = example
          ? projects.filter((project) => project.category === example.category)
          : [];
        const rest = all.filter((project) => project !== example);
        const shown = example
          ? [
              example,
              ...rest.filter((project) => project.featured),
              ...rest.filter((project) => !project.featured),
            ].slice(0, SHOWN)
          : [];
        const loop = example ? undefined : withoutProject++;

        return (
          <Arm
            as="li"
            key={service.title}
            id={serviceAnchor(index)}
            className="svc-row grid items-start gap-[clamp(24px,4vw,64px)] border-t border-rule py-[clamp(28px,4vw,48px)] min-[901px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
          >
            <div className="flex min-w-0 flex-col items-start gap-3">
              <h2 className="text-headline-lg">{service.title}</h2>
              <p className="max-w-[26rem] text-ink-muted">
                {service.description}
              </p>
              {example ? (
                <Link
                  href={
                    all.length > 1
                      ? `${path("projects", locale)}#${example.category}`
                      : projectPath(example.slug, locale)
                  }
                  className="go"
                >
                  <span className="link-underline">
                    {t.expertise.seeProjects(all.length)}
                  </span>
                  <ArrowRight aria-hidden="true" className="ico" />
                </Link>
              ) : (
                conversations[(loop ?? 0) % conversations.length]
              )}
            </div>

            {example ? (
              <ul
                className={cn(
                  "grid gap-[clamp(12px,1.6vw,20px)]",
                  shown.length === 1 && "grid-cols-1",
                  shown.length === 2 && "grid-cols-2",
                  shown.length === 3 &&
                    "grid-cols-2 md:grid-cols-3 max-md:[&>li:first-child]:col-span-2",
                )}
              >
                {shown.map((project, position) => (
                  <li
                    key={project.slug}
                    style={{ "--i": position } as CSSProperties}
                  >
                    <Link
                      href={projectPath(project.slug, locale)}
                      className="flex min-w-0 flex-col gap-2.5"
                    >
                      <ViewTransition
                        name={`shot-${project.slug}`}
                        share="morph"
                        default="none"
                      >
                        <Shot
                          src={getProjectMedia(project.slug).cover}
                          alt={t.projects.previewAlt(project.name)}
                          name={project.name}
                          sizes={SIZES[shown.length] ?? SIZES[3]!}
                          // The first two rows are on screen when the page
                          // opens on a wide screen.
                          eager={index < 2}
                          priority={index === 0 && position === 0}
                        />
                      </ViewTransition>
                      <span className="text-[0.95rem] font-semibold">
                        <span className="link-underline">{project.name}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ServiceVisual order={loop ?? 0} locale={locale} />
            )}
          </Arm>
        );
      })}
    </ul>
  );
}
