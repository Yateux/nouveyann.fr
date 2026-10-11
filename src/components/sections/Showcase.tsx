"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Shot } from "@/components/ui/Shot";
import { cn } from "@/lib/cn";
import { reducedMotion } from "@/lib/motion";

export type ShowcaseItem = {
  title: string;
  /** The name on its bar: short, so all six read alike. */
  tab: string;
  description: string;
  link: { href: string; label: string };
  /** Real captures for this service, dealt like cards. */
  shots: { name: string; src: string | null; alt: string }[];
  /** Without captures, the animation that stands for the service. */
  visual?: ReactNode;
};

const INTERVAL = 2800;

/**
 * What I do, played as a reel: one service at a time, its name and sentence
 * on one side and the proof on the other, real captures dealt one after the other.
 * The bars on top show where the reel is and jump to any service. It holds
 * while the pointer or the keyboard is inside, and off screen.
 *
 * Every panel is in the page from the start; only one is shown.
 */
export function Showcase({
  items,
  label,
}: {
  items: ShowcaseItem[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const controls = useRef({
    select: (index: number) => void index,
    hold: (value: boolean) => void value,
  });
  const count = items.length;

  useEffect(() => {
    const root = rootRef.current;
    const tabs = tabsRef.current;
    if (!root || !tabs) return;

    const reduced = reducedMotion();
    let current = 0;
    let advance = 0;
    let held = false;
    let visible = false;

    const show = (index: number) => {
      current = index;
      setActive(index);

      // On a narrow screen the bars scroll sideways: keep the current one in
      // view, without ever moving the page itself.
      const tab = tabs.children[index];
      if (tab instanceof HTMLElement && tabs.scrollWidth > tabs.clientWidth) {
        tabs.scrollTo({
          left: tab.offsetLeft - tabs.offsetLeft - 20,
          behavior: reduced ? "auto" : "smooth",
        });
      }
    };

    const schedule = () => {
      window.clearTimeout(advance);
      const on = !reduced && visible && !held && !document.hidden;
      setPlaying(on);
      if (!on) return;
      setRun((value) => value + 1);
      advance = window.setTimeout(() => {
        show((current + 1) % count);
        schedule();
      }, INTERVAL);
    };

    controls.current = {
      select: (index) => {
        show(index);
        schedule();
      },
      hold: (value) => {
        held = value;
        schedule();
      },
    };

    document.addEventListener("visibilitychange", schedule);
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1]?.isIntersecting ?? false;
        schedule();
      },
      { threshold: 0.35 },
    );
    observer.observe(root);

    return () => {
      window.clearTimeout(advance);
      document.removeEventListener("visibilitychange", schedule);
      observer.disconnect();
    };
  }, [count]);

  return (
    <div
      ref={rootRef}
      className={cn("show", playing && "playing")}
      style={{ "--dur": `${INTERVAL}ms` } as CSSProperties}
      onPointerEnter={() => controls.current.hold(true)}
      onPointerLeave={() => controls.current.hold(false)}
      onFocus={() => controls.current.hold(true)}
      onBlur={() => controls.current.hold(false)}
    >
      <div
        ref={tabsRef}
        role="tablist"
        aria-label={label}
        className="show-tabs"
      >
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            id={`show-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`show-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            data-done={index < active ? "" : undefined}
            className="show-tab"
            onClick={() => controls.current.select(index)}
            onKeyDown={(event) => {
              const step =
                event.key === "ArrowRight"
                  ? 1
                  : event.key === "ArrowLeft"
                    ? -1
                    : 0;
              if (!step) return;
              event.preventDefault();
              const next = (index + step + count) % count;
              controls.current.select(next);
              const tab = tabsRef.current?.children[next];
              if (tab instanceof HTMLElement) tab.focus();
            }}
          >
            <span className="show-bar" aria-hidden="true">
              {/* Remounting the bar is what restarts its fill. */}
              <i key={index === active ? `on-${run}` : "off"} />
            </span>
            {item.tab}
          </button>
        ))}
      </div>

      <div className="show-stage">
        {items.map((item, index) => {
          const on = index === active;
          return (
            <div
              key={item.title}
              role="tabpanel"
              id={`show-panel-${index}`}
              aria-labelledby={`show-tab-${index}`}
              className="show-panel"
              data-on={on ? "" : undefined}
            >
              <div className="show-text">
                <h3 className="show-title">{item.title}</h3>
                <p className="show-lead">{item.description}</p>
                <Link href={item.link.href} className="go">
                  <span className="link-underline">{item.link.label}</span>
                  <ArrowRight aria-hidden="true" className="ico" />
                </Link>
              </div>

              {item.shots.length > 0 ? (
                <div className="deck" data-n={item.shots.length}>
                  {item.shots.map((shot, position) => (
                    <div
                      key={shot.name}
                      className="deck-card"
                      style={
                        {
                          // The back card lands first, the front one last.
                          "--i": item.shots.length - 1 - position,
                        } as CSSProperties
                      }
                    >
                      <Shot
                        src={shot.src}
                        alt={shot.alt}
                        name={shot.name}
                        sizes="(max-width: 900px) 74vw, 430px"
                      />
                    </div>
                  ))}
                </div>
              ) : item.visual ? (
                // Remounted when its panel comes up, so the animation starts
                // from its first frame.
                <div key={on ? "on" : "off"}>{item.visual}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
