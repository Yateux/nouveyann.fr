import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { isExternal, safeUrl } from "@/lib/safeUrl";

type Variant = "primary" | "secondary" | "onDeep" | "onDeepQuiet";

const VARIANTS: Record<Variant, string> = {
  primary: "btn-solid",
  secondary: "btn-line",
  onDeep: "btn-chalk",
  onDeepQuiet: "btn-chalk-line",
};

function buttonClass(variant: Variant = "primary", className?: string) {
  return cn("btn", VARIANTS[variant], className);
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const safeHref = safeUrl(href);
  if (!safeHref) return null;

  const style = buttonClass(variant, className);

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
