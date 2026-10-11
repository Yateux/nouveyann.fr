import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  title,
  lead,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Container className="in flex flex-col gap-[18px] pt-[clamp(36px,6vw,80px)]">
      <h1 className="max-w-[18ch] text-display-lg">{title}</h1>
      {lead ? (
        <p
          className="max-w-[38rem] text-body-lg text-ink-muted"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </Container>
  );
}
