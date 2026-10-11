import Image from "next/image";
import { cn } from "@/lib/cn";

/** A project capture in its 2:1 frame. Without a cover, the name stands in. */
export function Shot({
  src,
  alt,
  name,
  sizes,
  eager = false,
  priority = false,
  className,
}: {
  src: string | null;
  alt: string;
  name: string;
  sizes: string;
  /** Above the fold: load at once instead of waiting for the scroll. */
  eager?: boolean;
  /** The main image of the page: fetched ahead of everything else. One per page. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("pshot", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager || priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover object-top"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-headline-md text-ink-faint"
        >
          {name}
        </span>
      )}
    </div>
  );
}
