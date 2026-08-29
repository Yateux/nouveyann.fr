import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  spacing?: "tight" | "default" | "loose";
  tone?: "canvas" | "sand" | "deep";
};

const SPACING = {
  tight: "pt-10 pb-16 lg:pt-14 lg:pb-20",
  default: "py-16 lg:py-24",
  loose: "py-20 lg:py-section",
} as const;

export function Section({
  children,
  id,
  className,
  spacing = "default",
  tone = "canvas",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        SPACING[spacing],
        tone === "sand" && "border-y border-ink/10 bg-sand-soft",
        tone === "deep" && "bg-deep text-chalk",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
