"use client";

import {
  useEffect,
  useRef,
  useState,
  ViewTransition,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Shot } from "@/components/ui/Shot";
import { trackNamed } from "@/lib/analytics";
import { reducedMotion } from "@/lib/motion";

export type WorkItem = {
  slug: string;
  name: string;
  category: string;
  meta: string;
  tagline: string;
  href: string;
  src: string | null;
  alt: string;
};

const NARROW = "(max-width: 900px)";

/**
 * Featured work, one list laid out two ways.
 *
 * Wide screens: the captures are stacked in a pinned column while the
 * projects scroll past, and the one crossing the middle of the screen shows
 * its capture. Narrow screens: the same list becomes a row to swipe, every
 * slide the same height.
 *
 * Each capture exists once, whatever the layout, so its transition name is
 * unique on the page: that is what lets it travel to the case study.
 */
export function WorkSplit({
  items,
  linkLabel,
  label,
}: {
  items: WorkItem[];
  linkLabel: string;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const slides = Array.from(list.children);
    const blocks = Array.from(list.querySelectorAll(".split-text"));
    const narrow = window.matchMedia(NARROW);
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    // Swiping: the slide resting against the left edge is the current one,
    // and the last one once the row cannot scroll any further.
    const nearest = () => {
      frame = 0;
      if (list.scrollLeft >= list.scrollWidth - list.clientWidth - 2) {
        setActive(slides.length - 1);
        return;
      }
      const edge =
        list.getBoundingClientRect().left +
        parseFloat(getComputedStyle(list).scrollPaddingLeft || "0");
      let best = 0;
      let distance = Infinity;
      slides.forEach((slide, index) => {
        const gap = Math.abs(slide.getBoundingClientRect().left - edge);
        if (gap < distance) {
          distance = gap;
          best = index;
        }
      });
      setActive(best);
    };
    const onSwipe = () => {
      if (!frame) frame = requestAnimationFrame(nearest);
    };

    const stop = () => {
      observer?.disconnect();
      observer = undefined;
      list.removeEventListener("scroll", onSwipe);
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const watch = () => {
      stop();
      if (narrow.matches) {
        list.addEventListener("scroll", onSwipe, { passive: true });
        onSwipe();
        return;
      }
      // Scrolling the page: a thin band across the middle of the screen,
      // where the captures are pinned.
      observer = new IntersectionObserver(
        (changes) => {
          for (const change of changes) {
            if (change.isIntersecting) setActive(blocks.indexOf(change.target));
          }
        },
        { rootMargin: "-50% 0px -48% 0px" },
      );
      for (const block of blocks) observer.observe(block);
    };

    watch();
    narrow.addEventListener("change", watch);
    return () => {
      stop();
      narrow.removeEventListener("change", watch);
    };
  }, []);

  const goTo = (index: number) => {
    const reduced = reducedMotion();
    listRef.current?.children[index]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  if (items.length === 0) return null;

  return (
    <div className="split">
      <ol
        ref={listRef}
        className="split-list"
        style={{ "--count": items.length } as CSSProperties}
      >
        {items.map((item, index) => (
          <li
            key={item.slug}
            className="split-item"
            data-on={index === active ? "" : undefined}
          >
            <figure className="split-shot">
              <ViewTransition
                name={`shot-${item.slug}`}
                share="morph"
                default="none"
              >
                <Shot
                  src={item.src}
                  alt={item.alt}
                  name={item.name}
                  sizes="(max-width: 489px) 86vw, (max-width: 900px) 420px, 600px"
                  priority={index === 0}
                />
              </ViewTransition>
              <figcaption className="split-cap">
                <span>{item.name}</span>
                <span className="when">
                  {index + 1} / {items.length}
                </span>
              </figcaption>
            </figure>

            <div className="split-text">
              <span className="tag">{item.category}</span>
              <h3 className="text-headline-lg">{item.name}</h3>
              <p className="tech">{item.meta}</p>
              <p className="max-w-[26rem] text-ink-muted">{item.tagline}</p>
              <Link
                href={item.href}
                className="go"
                onClick={() => trackNamed("project_open", { slug: item.slug })}
              >
                <span className="link-underline">{linkLabel}</span>
                <ArrowRight aria-hidden="true" className="ico" />
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <div role="group" aria-label={label} className="split-dots">
        {items.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            aria-label={item.name}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
