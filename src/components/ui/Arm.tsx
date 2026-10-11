"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { reducedMotion } from "@/lib/motion";

type Tag = "div" | "section" | "ol" | "li" | "figure";

/**
 * Opens its content once, as the block scrolls into view. Blocks already on
 * screen at load are left alone, and nothing is hidden before JavaScript runs:
 * the page is complete without it. The styles hang on `data-arm`, and always
 * target children, so the observer still sees the block itself enter.
 */
export function Arm({
  as = "div",
  id,
  className,
  children,
}: {
  as?: Tag;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (reducedMotion()) return;
    if (element.getBoundingClientRect().top <= window.innerHeight) return;

    element.dataset.arm = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.arm = "in";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Every allowed tag takes the same props; the cast only settles the ref type.
  const Tag = as as "div";
  return (
    <Tag ref={ref} id={id} data-arm="" className={className}>
      {children}
    </Tag>
  );
}
