"use client";

import { useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { MOTION_STORAGE_KEY } from "@/lib/motion";

// <html data-motion> is the source of truth, set before the first paint.
function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}
const read = () => document.documentElement.dataset.motion === "reduce";
const onServer = () => false;

/**
 * Lets anyone stop what moves by itself on the site (the demo, the reels, the
 * scrolling band), whatever their system settings. The choice is remembered.
 */
export function MotionToggle({
  pause,
  resume,
  className,
  icon = false,
}: {
  pause: string;
  resume: string;
  className?: string;
  /** Shows a pause or play mark before the label. */
  icon?: boolean;
}) {
  const paused = useSyncExternalStore(subscribe, read, onServer);

  const toggle = () => {
    try {
      if (paused) window.localStorage.removeItem(MOTION_STORAGE_KEY);
      else window.localStorage.setItem(MOTION_STORAGE_KEY, "reduce");
    } catch {
      // Private browsing: the choice lasts for this page only.
    }
    if (paused) delete document.documentElement.dataset.motion;
    else document.documentElement.dataset.motion = "reduce";
    // The loops already running were started with the old setting: reloading
    // is the one way to be sure every one of them follows the new one.
    window.location.reload();
  };

  return (
    <button type="button" onClick={toggle} className={className}>
      {icon ? (
        paused ? (
          <Play aria-hidden="true" className="h-3.5 w-3.5" />
        ) : (
          <Pause aria-hidden="true" className="h-3.5 w-3.5" />
        )
      ) : null}
      {paused ? resume : pause}
    </button>
  );
}
