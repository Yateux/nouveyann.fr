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
    <Container className="flex min-h-[50vh] flex-col justify-center pt-10 pb-24 lg:pt-16">
      <p className="mark text-ink-subtle">Erreur 404</p>
      <h1 className="mt-8 max-w-2xl font-display text-display-lg text-ink">
        Cette page n’existe pas.
      </h1>
      <p className="mt-6 max-w-lg text-body-lg text-ink-muted">
        Le lien est peut-être ancien, ou l’adresse comporte une erreur. Le
        travail, lui, est toujours là.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/projets" size="lg">
          Voir mon travail
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Retour à l’accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
