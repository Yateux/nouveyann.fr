import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Process({
  locale = defaultLocale,
  label,
  title,
}: {
  locale?: Locale;
  label?: string;
  title?: string;
} = {}) {
  const t = getDictionary(locale).process;
  const steps = t.steps;

  return (
    <section className="pt-10 pb-20 lg:pt-14 lg:pb-section">
      <Container>
        <div className="mb-10 lg:mb-12">
          <Label as="h2">{label ?? t.label}</Label>
          {title ? (
            <p className="mt-8 max-w-2xl font-display text-headline-lg text-ink">
              {title}
            </p>
          ) : null}
        </div>

        <ol className="grid grid-cols-1 border-y border-ink/10 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={
                index < steps.length - 1
                  ? "border-b border-ink/10 py-8 transition-colors duration-300 md:border-r md:border-b-0 md:p-10 md:hover:bg-sand-soft lg:p-12"
                  : "py-8 transition-colors duration-300 md:p-10 md:hover:bg-sand-soft lg:p-12"
              }
            >
              <span className="mark text-ink/50">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <h3 className="mt-5 font-display text-headline-md text-ink md:mt-8">
                {step.title}
              </h3>
              <p className="mt-3 text-body-md text-ink-muted md:mt-4">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
