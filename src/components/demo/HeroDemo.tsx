"use client";

import { useEffect, useRef, useState } from "react";
import {
  Demo,
  type DemoLabels,
  type DemoScene,
  type DemoShot,
} from "@/components/demo/Demo";
import { reducedMotion } from "@/lib/motion";

// Time spent on each step, and the part of it the cursor takes to reach the
// next one. The fill of the step bars follows `--dur` in globals.css.
const DURATION = 2600;
const TRAVEL = 600;

/**
 * The home demo: it plays the four moments of a project in a loop, a cursor
 * clicking from one step to the next. It pauses off screen and in a hidden
 * tab, and every step is a real button.
 */
export function HeroDemo({
  labels,
  steps,
  shot,
}: {
  labels: DemoLabels;
  steps: readonly string[];
  shot: DemoShot;
}) {
  const [scene, setScene] = useState<DemoScene>(0);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const jumpRef = useRef<(index: DemoScene) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    const cursor = cursorRef.current;
    if (!root || !cursor) return;

    const reduced = reducedMotion();
    let current: DemoScene = 0;
    let first = 0;
    let second = 0;
    let press = 0;
    let running = false;
    let visible = true;

    const pointAt = (index: number) => {
      const target = root.querySelectorAll<HTMLElement>(".step")[index];
      if (!target) return;
      const box = target.getBoundingClientRect();
      const origin = root.getBoundingClientRect();
      const x = box.left - origin.left + Math.min(box.width * 0.3, 36);
      const y = box.top - origin.top + 12;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    };

    const tick = () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      first = window.setTimeout(() => {
        const next = ((current + 1) % 4) as DemoScene;
        pointAt(next);
        second = window.setTimeout(() => {
          cursor.classList.add("press");
          press = window.setTimeout(
            () => cursor.classList.remove("press"),
            140,
          );
          current = next;
          setScene(next);
          tick();
        }, TRAVEL);
      }, DURATION - TRAVEL);
    };

    const stop = () => {
      running = false;
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
    const play = () => {
      if (reduced || running || !visible || document.hidden) return;
      running = true;
      setPlaying(true);
      setRun((value) => value + 1);
      tick();
    };
    const pause = () => {
      stop();
      setPlaying(false);
    };

    jumpRef.current = (index) => {
      current = index;
      setScene(index);
      if (!running) return;
      setRun((value) => value + 1);
      tick();
    };

    // Park the cursor on the canvas without animating to it.
    const canvas = root.querySelector(".demo-canvas")?.getBoundingClientRect();
    if (canvas) {
      cursor.style.transition = "none";
      cursor.style.transform = `translate(${canvas.width * 0.74}px, ${canvas.height * 0.72}px)`;
      void cursor.offsetWidth;
      cursor.style.transition = "";
    }

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1]?.isIntersecting ?? false;
        if (visible) play();
        else pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(root);

    return () => {
      stop();
      window.clearTimeout(press);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <Demo
      ref={rootRef}
      scene={scene}
      labels={labels}
      shot={shot}
      playing={playing}
      eager
    >
      <span ref={cursorRef} className="cur" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path
            d="M3 2l13 7-5.4 1.6L8.6 16z"
            fill="var(--color-ink)"
            stroke="var(--color-canvas)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <ol className="steps">
        {steps.map((step, index) => (
          <li key={step}>
            <button
              type="button"
              className="step"
              aria-current={index === scene ? "step" : undefined}
              data-done={index < scene ? "" : undefined}
              onClick={() => jumpRef.current(index as DemoScene)}
            >
              <span className="step-bar">
                {/* Remounting the bar is what restarts its fill. */}
                <i key={index === scene ? `on-${run}` : "off"} />
              </span>
              {step}
            </button>
          </li>
        ))}
      </ol>
    </Demo>
  );
}
