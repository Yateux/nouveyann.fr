import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { defaultLocale, path, projectPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getFeaturedProjects } from "@/i18n/getProjects";
import { getProjectMedia } from "@/lib/media";
import { cn } from "@/lib/cn";

// scroll-pl must match px, otherwise snapping ignores the padding and the
// left gutter disappears on load.
export function Work({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const t = getDictionary(locale).home;
  const categories = getCategories(locale);
  const items = getFeaturedProjects(locale)
    .slice(0, 4)
    .map((project) => ({
      project,
      media: getProjectMedia(project.slug),
    }));

  return (
    <section id="travail" className="pt-10 pb-20 lg:pt-14 lg:pb-section">
      <Container>
        <div className="mb-10 flex items-center justify-between gap-6 lg:mb-16">
          <Label as="h2">{t.workLabel}</Label>
          <Link
            href={path("projects", locale)}
            className="mark inline-flex items-center gap-2 text-ink transition-opacity hover:opacity-70"
          >
            {t.allProjects}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-24 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {items.map(({ project, media }, index) => {
            const reversed = index % 2 === 1;
            const label = categories[project.category].label;

            return (
              <li
                key={project.slug}
                className="w-[82vw] max-w-sm shrink-0 snap-start lg:w-auto lg:max-w-none lg:shrink"
              >
                <Reveal className="h-full">
                  <Link
                    href={projectPath(project.slug, locale)}
                    className="group grid h-full items-center gap-5 max-lg:grid-rows-[auto_1fr] lg:grid-cols-12 lg:gap-gutter"
                  >
                    <div
                      className={cn(
                        "lg:col-span-7",
                        reversed && "lg:order-2 lg:col-start-6",
                      )}
                    >
                      <div className="relative overflow-hidden border border-ink/10">
                        <ProjectVisual
                          slug={project.slug}
                          name={project.name}
                          label={label}
                          src={media.cover}
                          sizes="(max-width: 1023px) 82vw, 640px"
                          className="aspect-[4/3] w-full"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 z-10 bg-ink/5 transition-colors duration-500 group-hover:bg-transparent"
                        />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "max-lg:flex max-lg:h-full max-lg:flex-col lg:col-span-5",
                        reversed && "lg:order-1 lg:col-start-1 lg:row-start-1",
                      )}
                    >
                      <span className="mark flex items-center gap-3 text-ink/50">
                        {String(index + 1).padStart(2, "0")}.
                        <span
                          aria-hidden="true"
                          className="h-px w-6 bg-ink/20"
                        />
                        <span className="text-ink-subtle">{label}</span>
                      </span>

                      <h3 className="mt-4 font-display text-headline-md text-ink lg:mt-5 lg:text-headline-lg">
                        <span className="link-underline">{project.name}</span>
                      </h3>

                      <p className="mt-3 max-w-sm text-body-md text-ink-muted lg:mt-4">
                        {project.tagline}
                      </p>

                      <span className="mark mt-4 hidden truncate border-t border-ink/10 pt-3 text-ink-subtle lg:mt-6 lg:block">
                        {project.tech.join(" · ")}
                      </span>

                      <span className="mt-5 flex items-center gap-2 text-label-sm text-ink uppercase max-lg:mt-auto max-lg:pt-5 lg:mt-6">
                        {t.viewCaseStudy}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
