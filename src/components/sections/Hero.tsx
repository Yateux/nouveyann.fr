import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroDemo } from "@/components/demo/HeroDemo";
import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getFeaturedProjects } from "@/i18n/getProjects";
import { getProjectMedia } from "@/lib/media";

export function Hero({ locale = defaultLocale }: { locale?: Locale } = {}) {
  const t = getDictionary(locale).home;
  // The demo ends on a real site: the first featured project.
  const project = getFeaturedProjects(locale)[0];

  return (
    <section>
      <Container className="grid items-center gap-[clamp(28px,5vw,72px)] pt-[clamp(28px,5vw,64px)] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="text-[clamp(2.3rem,4.8vw,4rem)] leading-[1.05] font-bold tracking-[-0.035em]">
            {t.title.lead}{" "}
            <em className="text-accent-text">{t.title.accent}</em>
          </h1>

          <p className="max-w-[32rem] text-body-lg text-ink-muted">
            <strong className="font-bold text-ink">{t.lede.strong}</strong>{" "}
            {t.lede.rest}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={path("projects", locale)} className="btn btn-solid">
              {t.seeWork}
              <ArrowRight aria-hidden="true" className="ico" />
            </Link>
            <Link href={path("contact", locale)} className="btn btn-line">
              {t.getInTouch}
            </Link>
          </div>
        </div>

        <HeroDemo
          labels={t.demo}
          steps={t.demo.steps}
          shot={{
            name: project?.name ?? "",
            src: project ? getProjectMedia(project.slug).cover : null,
          }}
        />
      </Container>
    </section>
  );
}
