"use client";

import {
  useState,
  useSyncExternalStore,
  useTransition,
  ViewTransition,
} from "react";
import Link from "next/link";
import { Shot } from "@/components/ui/Shot";
import { trackNamed } from "@/lib/analytics";

export type GridProject = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  tech: string[];
  href: string;
  src: string | null;
  alt: string;
};

export type GridFilter = { key: string; label: string; count: number };

const ALL = "all";

function subscribeToHash(notify: () => void) {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
}
const readHash = () => window.location.hash.slice(1);
const noHash = () => "";

/**
 * The whole body of work, with a filter by type. Every project is in the
 * server-rendered page; filtering only hides cards, and the browser glides the
 * remaining ones into place. A link such as /projets#ecommerce opens the page
 * already filtered.
 */
export function ProjectsGrid({
  projects,
  filters,
  allLabel,
  filterLabel,
}: {
  projects: GridProject[];
  filters: GridFilter[];
  allLabel: string;
  filterLabel: string;
}) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, noHash);
  const [picked, setPicked] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const fromHash = filters.some((filter) => filter.key === hash) ? hash : ALL;
  const active = picked ?? fromHash;
  const visible =
    active === ALL
      ? projects
      : projects.filter((project) => project.category === active);

  const chips: GridFilter[] = [
    { key: ALL, label: allLabel, count: projects.length },
    ...filters,
  ];

  return (
    <>
      <div role="group" aria-label={filterLabel} className="chip-row">
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className="chip"
            aria-pressed={chip.key === active}
            onClick={() => startTransition(() => setPicked(chip.key))}
          >
            {chip.label}
            <span className="text-[0.72rem] leading-none tabular-nums opacity-60">
              {chip.count}
            </span>
          </button>
        ))}
      </div>

      <ul className="mt-[clamp(28px,4vw,48px)] grid gap-x-[clamp(20px,3vw,40px)] gap-y-[clamp(28px,4vw,52px)] md:grid-cols-2">
        {visible.map((project, index) => (
          <ViewTransition key={project.slug}>
            <li>
              <Link
                href={project.href}
                className="flex min-w-0 flex-col gap-3"
                onClick={() =>
                  trackNamed("project_open", { slug: project.slug })
                }
              >
                <ViewTransition
                  name={`shot-${project.slug}`}
                  share="morph"
                  default="none"
                >
                  <Shot
                    src={project.src}
                    alt={project.alt}
                    name={project.name}
                    sizes="(max-width: 767px) 92vw, (max-width: 1247px) 46vw, 540px"
                    // The first row loads with the page; a phone only shows
                    // the first card, so the rest waits for the scroll.
                    eager={index < 2}
                    priority={index === 0}
                  />
                </ViewTransition>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.02em]">
                    <span className="link-underline">{project.name}</span>
                  </h2>
                  <span className="tag">{project.categoryLabel}</span>
                </div>
                <p className="max-w-[30rem] text-ink-muted">
                  {project.tagline}
                </p>
                <p className="tech">{project.tech.join(" · ")}</p>
              </Link>
            </li>
          </ViewTransition>
        ))}
      </ul>
    </>
  );
}
