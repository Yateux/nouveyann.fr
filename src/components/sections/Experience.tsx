import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { publishedJobs } from "@/data/experience";
import { publishedJobsEn } from "@/data/experience.en";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

export function Experience({
  locale = defaultLocale,
}: { locale?: Locale } = {}) {
  const list = locale === "fr" ? publishedJobs : publishedJobsEn;
  if (list.length === 0) return null;
  const t = getDictionary(locale).home;

  return (
    <section className="pt-6 pb-20 lg:pt-10 lg:pb-section">
      <Container>
        <div className="mb-10 lg:mb-12">
          <Label as="h2">{t.experienceLabel}</Label>
        </div>

        <Reveal>
          <ol>
            {list.map((job, index) => {
              const last = index === list.length - 1;

              return (
                <li
                  key={`${job.period}-${job.role}`}
                  className="grid gap-x-gutter sm:grid-cols-[13rem_1fr]"
                >
                  <span className="mark text-ink-subtle max-sm:mb-3 sm:pt-1.5">
                    {job.period}
                  </span>

                  <div
                    className={cn(
                      "relative border-l pl-6 sm:pl-8",
                      last
                        ? "border-transparent pb-0"
                        : "border-ink/10 pb-10 lg:pb-12",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[3.5px] h-1.5 w-1.5 rounded-full bg-ink"
                    />

                    <h3 className="font-display text-headline-md text-ink">
                      {job.role}
                    </h3>
                    <p className="mark mt-2 text-ink-subtle">{job.company}</p>
                    <p className="mt-3 max-w-xl text-body-md text-ink-muted">
                      {job.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
