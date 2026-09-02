"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackNamed, type EventName } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: EventName;
  payload?: Record<string, string>;
};

export function TrackedLink({ event, payload, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        trackNamed(event, payload);
        onClick?.(e);
      }}
    />
  );
}
