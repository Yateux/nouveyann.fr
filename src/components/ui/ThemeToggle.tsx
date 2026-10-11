"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Key shared with the script in the root layout that sets the theme early. */
const THEME_STORAGE_KEY = "theme";

// <html data-theme> is the source of truth: it is set before the first paint,
// so the button only has to read it and follow it.
function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
const read = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";
const onServer = (): Theme => "light";

export function ThemeToggle({
  toDark,
  toLight,
}: {
  toDark: string;
  toLight: string;
}) {
  const theme = useSyncExternalStore(subscribe, read, onServer);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing: the choice simply lasts for this page.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? toDark : toLight}
      className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border border-line-strong text-ink-muted transition-colors duration-200 hover:border-ink hover:text-ink active:scale-[0.97]"
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Moon aria-hidden="true" className="h-4 w-4" />
      )}
    </button>
  );
}
