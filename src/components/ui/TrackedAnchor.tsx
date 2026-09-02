"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackNamed, type EventName } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: EventName;
  payload?: Record<string, string>;
};

export function TrackedAnchor({ event, payload, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackNamed(event, payload);
        onClick?.(e);
      }}
    />
  );
}
