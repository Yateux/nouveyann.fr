import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { isExternal, safeUrl } from "@/lib/safeUrl";

type Variant = "primary" | "secondary" | "onDeep" | "onDeepQuiet";
type Size = "sm" | "md" | "lg";

const BASE =
  "group inline-flex items-center justify-center gap-2 text-label-sm uppercase " +
  "transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:opacity-85",
  secondary: "border border-ink/20 text-ink hover:border-ink",
  onDeep: "bg-canvas text-ink hover:bg-sand",
  onDeepQuiet:
    "border border-chalk-line text-chalk hover:border-chalk-muted hover:bg-white/5",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-6",
  lg: "h-14 px-8",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
}) {
  const safeHref = safeUrl(href);
  if (!safeHref) return null;

  const style = classes(variant, size, className);

  if (isExternal(safeHref)) {
    const opensTab = /^https?:/i.test(safeHref);
    return (
      <a
        href={safeHref}
        target={opensTab ? "_blank" : undefined}
        rel={opensTab ? "noopener noreferrer" : undefined}
        className={style}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={safeHref} className={style} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
