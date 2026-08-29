import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <Container className="pt-10 pb-24 lg:pt-16 lg:pb-32">
      <div className="max-w-3xl">
        <Label>Informations légales</Label>
        <h1 className="mt-8 font-display text-display-lg text-ink">{title}</h1>
        <p className="mt-6 text-body-lg text-ink-muted">{intro}</p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-headline-md text-ink">
                {section.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-body-md text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
