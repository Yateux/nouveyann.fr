import Image from "next/image";
import { cn } from "@/lib/cn";

const PLATES = [
  "bg-deep text-chalk",
  "bg-sand text-ink",
  "bg-surface text-ink ring-1 ring-line ring-inset",
];

function plateFor(slug: string): string {
  let sum = 0;
  for (let index = 0; index < slug.length; index += 1) {
    sum += slug.charCodeAt(index);
  }
  return PLATES[sum % PLATES.length] as string;
}

export function ProjectVisual({
  slug,
  name,
  label,
  src,
  sizes,
  priority = false,
  className,
}: {
  slug: string;
  name: string;
  label: string;
  src: string | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "zoom-media relative overflow-hidden rounded-card",
        src ? "bg-sand-soft" : plateFor(slug),
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`Aperçu du projet ${name}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-between p-6 sm:p-7"
        >
          <span className="mark opacity-60">{label}</span>
          <span className="mark opacity-40">Visuel à venir</span>
        </div>
      )}
    </div>
  );
}
