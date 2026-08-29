import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";

export function PageHeader({
  label,
  title,
  lead,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Container className="pt-10 pb-12 lg:pt-16 lg:pb-16">
      <Label>{label}</Label>
      <h1 className="mt-8 max-w-3xl font-display text-display-lg text-ink">
        {title}
      </h1>
      {lead ? (
        <p className="mt-6 max-w-xl text-body-lg text-ink-muted">{lead}</p>
      ) : null}
    </Container>
  );
}
