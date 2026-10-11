"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Copies a short value, and says so for a moment. */
export function CopyButton({
  value,
  label,
  doneLabel,
  onBlock = false,
}: {
  value: string;
  label: string;
  doneLabel: string;
  /** Set on an inverted block, where the outline takes the block's colours. */
  onBlock?: boolean;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef(0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDone(false), 1500);
    } catch {
      // No clipboard access: the value stays selectable next to the button.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "min-h-8 cursor-pointer rounded-full border px-3 text-[0.8rem] font-semibold transition-transform duration-150 active:scale-[0.97]",
        onBlock
          ? "border-block-line hover:border-on-block"
          : "border-line-strong hover:border-ink",
      )}
    >
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
