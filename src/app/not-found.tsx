import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="in flex min-h-[50vh] flex-col justify-center gap-[18px] pt-[clamp(36px,6vw,80px)]">
      <h1 className="max-w-[18ch] text-display-lg">Cette page n’existe pas.</h1>
      <p
        className="max-w-[38rem] text-body-lg text-ink-muted"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        Le lien est peut-être ancien, ou l’adresse comporte une erreur. Le
        travail, lui, est toujours là.
      </p>
      <div
        className="mt-2 flex flex-wrap gap-3"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <ButtonLink href="/projets">
          Voir mon travail
          <ArrowRight aria-hidden="true" className="ico" />
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Retour à l’accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
