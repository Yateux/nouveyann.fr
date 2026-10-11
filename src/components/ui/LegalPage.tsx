import { Container } from "@/components/ui/Container";

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
    <Container className="pt-[clamp(36px,6vw,80px)]">
      <div className="max-w-3xl">
        <h1 className="text-display-lg">{title}</h1>
        <p className="mt-[18px] text-body-lg text-ink-muted">{intro}</p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.01em]">
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
