import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import type { ProjectMedia as Media } from "@/lib/media";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { defaultLocale, projectPath, type Locale } from "@/i18n/config";
import { getCategories } from "@/i18n/getProjects";

export type ProjectCardItem = {
  project: Project;
  media: Media;
};

const SIZES = "(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 548px";

export function ProjectCard({
  project,
  media,
  number,
  priority = false,
  locale = defaultLocale,
}: ProjectCardItem & {
  locale?: Locale;
  number?: number;
  priority?: boolean;
}) {
  const label = getCategories(locale)[project.category].label;

  return (
    <article className="h-full">
      <Link
        href={projectPath(project.slug, locale)}
        className="group flex h-full flex-col"
      >
        <ProjectVisual
          slug={project.slug}
          name={project.name}
          label={label}
          src={media.cover}
          sizes={SIZES}
          priority={priority}
          className="aspect-[4/3] w-full"
        />

        <div className="mt-5 flex flex-1 items-baseline gap-4">
          {number !== undefined ? (
            <span className="mark pt-1 text-ink-subtle">
              {String(number).padStart(2, "0")}
            </span>
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="mark text-ink-subtle">{label}</span>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h3 className="text-headline-md">
                <span className="link-underline">{project.name}</span>
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ink-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </div>

            <p className="mt-2 line-clamp-2 min-h-[3.25rem] max-w-lg leading-relaxed text-ink-muted">
              {project.tagline}
            </p>

            <p className="mark mt-auto truncate border-t border-ink/10 pt-3 text-ink-subtle">
              {project.tech.join(" · ")}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
