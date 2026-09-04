import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { getSkills } from "@/data/skills";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Skills({
  locale = defaultLocale,
}: { locale?: Locale } = {}) {
  const groups = getSkills(locale);
  const t = getDictionary(locale).skills;

  return (
    <section className="pt-6 pb-20 lg:pt-10 lg:pb-section">
      <Container>
        <div className="mb-10 lg:mb-12">
          <Label as="h2">{t.label}</Label>
        </div>

        <Reveal>
          <dl className="flex flex-col">
            {groups.map((group, index) => (
              <div
                key={group.title}
                className={
                  index < groups.length - 1
                    ? "grid gap-2 border-b border-ink/10 py-7 lg:grid-cols-[16rem_1fr] lg:gap-12"
                    : "grid gap-2 py-7 lg:grid-cols-[16rem_1fr] lg:gap-12"
                }
              >
                <dt className="font-display text-headline-md text-ink">
                  {group.title}
                </dt>
                <dd className="max-w-2xl text-body-md text-ink-muted">
                  {group.text}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
