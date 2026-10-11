"use client";

import { useRef } from "react";
import type { Job } from "@/data/experience";
import { useRail } from "@/lib/useRail";

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/** The full career, with a rail that fills as the page is read. */
export function ExperienceTimeline({ jobs }: { jobs: Job[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useRail(ref, { track: "ol", mark: "li", dot: "li", ratio: 0.6 });

  return (
    <div ref={ref} className="tl">
      <span className="tl-rail" aria-hidden="true">
        <span className="rail-fill" />
      </span>
      <ol>
        {jobs.map((job) => (
          <li key={`${job.period}-${job.role}`}>
            <span className="when pt-[0.45em]">{capitalize(job.period)}</span>
            <div className="flex max-w-[40rem] flex-col gap-1">
              <h3 className="text-[1.35rem] leading-[1.25] font-semibold tracking-[-0.01em]">
                {job.role}
              </h3>
              {/* The employer is a name, in ink like the title; the
                  description is running text, in the same grey as everywhere
                  else on the site. */}
              <p className="font-medium">{job.company}</p>
              <p className="text-ink-muted">{job.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
