/** Key shared with the script in the root layout that applies it early. */
export const MOTION_STORAGE_KEY = "motion";

/**
 * Whether motion should be kept to a minimum: the visitor asked for it on the
 * site (the "pause animations" control) or in their system settings. Every
 * loop and scroll effect checks this before starting.
 */
export function reducedMotion(): boolean {
  return (
    document.documentElement.dataset.motion === "reduce" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
