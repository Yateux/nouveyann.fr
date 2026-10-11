"use client";

import { useRef } from "react";
import type { SkillGroup } from "@/data/skills";
import { useRail } from "@/lib/useRail";

/**
 * The skills, laid out like the experience above them: one point on the rail
 * per skill, its name level with the point, its text beside it, and a rail
 * that fills as the page is read.
 */
export function SkillsTimeline({ groups }: { groups: SkillGroup[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useRail(ref, { track: "ol", mark: "li", dot: "li", ratio: 0.6 });

  return (
    <div ref={ref} className="tl">
      <span className="tl-rail" aria-hidden="true">
        <span className="rail-fill" />
      </span>
      <ol>
        {groups.map((group) => (
          <li key={group.title}>
            <h3 className="pt-[0.15em] text-[1.15rem] leading-[1.3] font-semibold tracking-[-0.01em] max-[900px]:text-[1.35rem]">
              {group.title}
            </h3>
            <p className="max-w-[40rem] text-ink-muted">{group.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
