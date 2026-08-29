import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { technologies } from "@/data/expertise";
import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Hero({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const t = getDictionary(locale).home;

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col items-center justify-start gap-8 overflow-hidden py-8 lg:justify-center lg:gap-8 lg:py-10">
      <GridBackdrop />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <span className="absolute top-1/4 left-[10%] h-32 w-px bg-ink/20" />
        <span className="absolute right-[10%] bottom-1/4 h-48 w-px bg-ink/20" />
        <span className="absolute top-1/3 right-[15%] h-px w-16 bg-ink/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-page px-5 sm:px-8 lg:px-16">
        <div className="relative rounded-card border border-ink/10 bg-surface/60 p-6 backdrop-blur-2xl sm:p-10 md:p-12 lg:p-14">
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 h-8 w-8 border-t border-l border-ink/20"
          />
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 h-8 w-8 border-t border-r border-ink/20"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-ink/20"
          />
          <span
            aria-hidden="true"
            className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-ink/20"
          />

          <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
            <div className="relative z-20 flex flex-col gap-5 md:gap-7 lg:col-span-7">
              <p className="mark flex items-center gap-2 text-ink-subtle">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40"
                />
                {t.location}
              </p>

              <h1 className="font-display text-display-lg text-ink">
                {t.headline.name}
                <br />
                <span className="accent-word pr-2">{t.headline.role}</span>
              </h1>

              <div className="flex max-w-xl flex-col gap-3 text-body-md text-ink-muted sm:gap-4 sm:text-body-lg">
                {t.intro.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-1 flex flex-row gap-3 border-t border-ink/10 pt-6 sm:gap-4 sm:pt-8">
                <Link
                  href={path("projects", locale)}
                  className="group inline-flex h-14 flex-1 items-center justify-center bg-ink px-4 text-label-sm whitespace-nowrap text-canvas uppercase transition-opacity duration-300 hover:opacity-85 sm:flex-none sm:px-8"
                >
                  {t.seeWork}
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={path("contact", locale)}
                  className="inline-flex h-14 flex-1 items-center justify-center border border-ink/20 px-4 text-label-sm whitespace-nowrap text-ink uppercase transition-colors duration-300 hover:border-ink sm:flex-none sm:px-8"
                >
                  {t.getInTouch}
                </Link>
              </div>

              <ul className="mark flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.625rem] text-ink-subtle sm:text-label-sm">
                {technologies.map((tech, index) => (
                  <li key={tech.name} className="flex items-center gap-3">
                    {tech.name}
                    {index < technologies.length - 1 ? (
                      <span aria-hidden="true" className="text-ink/25">
                        ·
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-12 hidden h-64 items-center justify-center md:h-96 lg:col-span-5 lg:mt-0 lg:flex">
              <div className="relative aspect-square w-full max-w-[300px]">
                <span
                  aria-hidden="true"
                  className="orbit absolute inset-4 flex items-center justify-center rounded-full border border-ink/5 bg-sand-soft"
                >
                  <span className="h-1/2 w-1/2 rounded-full border border-ink/10" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-ink/10 bg-surface/30 backdrop-blur-sm"
                >
                  <span className="h-px w-full rotate-45 bg-ink/20" />
                  <span className="absolute h-full w-px rotate-45 bg-ink/20" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -inset-4 flex items-center justify-center rounded-full border border-ink/20 backdrop-blur-md"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink">
                    <Eye aria-hidden="true" className="h-6 w-6 text-canvas" />
                  </span>
                </span>
              </div>

              <span className="mark absolute -bottom-10 left-1/2 -translate-x-1/2 border border-ink/10 bg-canvas px-3 py-1.5 whitespace-nowrap text-ink lg:right-0 lg:left-auto lg:translate-x-0">
                {t.figure}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative z-20 mt-auto flex flex-col items-center gap-3 pb-2 opacity-70"
      >
        <span className="mark text-ink-muted [writing-mode:vertical-rl]">
          {t.scroll}
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-ink/30">
          <span className="scroll-cue absolute top-0 left-0 block h-full w-full bg-ink" />
        </span>
      </div>
    </section>
  );
}
