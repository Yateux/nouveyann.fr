"use client";

import { useRef } from "react";
import { useRail } from "@/lib/useRail";

/**
 * The chapters of a case study, with a pinned table of contents
 * whose rail fills as the reader moves through them. On narrow screens the table
 * disappears and the chapters carry a vertical rail themselves.
 */
export function CaseChapters({
  chapters,
  label,
}: {
  chapters: { label: string; text: string }[];
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useRail(ref, {
    track: ".chaps",
    mark: ".chap",
    dot: ".toc li",
    ratio: 0.4,
    firstAlwaysOn: true,
  });

  return (
    <div
      ref={ref}
      className="grid items-start gap-[clamp(32px,6vw,96px)] min-[901px]:grid-cols-[240px_minmax(0,1fr)]"
    >
      <nav
        aria-label={label}
        className="toc sticky top-[104px] max-[900px]:hidden"
      >
        <div className="relative pl-[26px]">
          <span className="toc-rail" aria-hidden="true">
            <span className="rail-fill" />
          </span>
          <ol>
            {chapters.map((chapter, index) => (
              <li key={chapter.label}>
                <a href={`#chapter-${index}`}>{chapter.label}</a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="chaps">
        {/* The rail of narrow screens, where the pinned list is hidden. */}
        <span className="chap-rail" aria-hidden="true">
          <span className="rail-fill" />
        </span>
        {chapters.map((chapter, index) => (
          <section
            key={chapter.label}
            id={`chapter-${index}`}
            className="chap border-t border-rule py-[clamp(24px,3.5vw,44px)] first-of-type:border-t-0 first-of-type:pt-0 max-[900px]:border-t-0"
          >
            <h2 className="mb-3.5 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              {chapter.label}
            </h2>
            <p className="max-w-[40rem] text-body-md text-ink-muted">
              {chapter.text}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
