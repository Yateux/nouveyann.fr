"use client";

import { useEffect, type RefObject } from "react";

/**
 * A vertical rail that fills down to a reading line as the page scrolls, and
 * lights the markers it has passed. Everything is written straight to the DOM
 * from one animation frame per scroll: no state, so no re-render while reading.
 *
 * Inside `ref`: `track` is the block whose height the rail measures, `mark`
 * the elements whose position counts, `dot` the elements that light up (one
 * per mark, same order), and every `.rail-fill` a bar to fill.
 */
export function useRail(
  ref: RefObject<HTMLElement | null>,
  {
    track,
    mark,
    dot,
    ratio,
    firstAlwaysOn = false,
  }: {
    track: string;
    mark: string;
    dot: string;
    ratio: number;
    firstAlwaysOn?: boolean;
  },
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const trackElement = root.querySelector<HTMLElement>(track);
    // A block can draw its rail twice (beside a pinned list on a wide
    // screen, along the content on a narrow one): they fill together.
    const fills = Array.from(root.querySelectorAll<HTMLElement>(".rail-fill"));
    if (!trackElement || fills.length === 0) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement>(mark));
    const dots = Array.from(root.querySelectorAll<HTMLElement>(dot));

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * ratio;
      const box = trackElement.getBoundingClientRect();
      const progress = box.height
        ? Math.min(Math.max((line - box.top) / box.height, 0), 1)
        : 0;
      for (const fill of fills) fill.style.transform = `scaleY(${progress})`;

      let last = firstAlwaysOn ? 0 : -1;
      marks.forEach((element, index) => {
        if (element.getBoundingClientRect().top + 30 < line) last = index;
      });
      // The marks light up too, for the layouts where they carry the dots.
      for (const group of [dots, marks]) {
        group.forEach((element, index) =>
          element.toggleAttribute("data-on", index <= last),
        );
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, track, mark, dot, ratio, firstAlwaysOn]);
}
