import { siteConfig } from "@/data/site";
import { projects, categories } from "@/data/projects";
import { jobs } from "@/data/experience";
import { getSkills } from "@/data/skills";
import { path, projectPath } from "@/i18n/config";

export const dynamic = "force-static";

const url = (p: string) => `${siteConfig.url}${p === "/" ? "" : p}`;

export function GET() {
  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Pages",
    "",
    `- [Accueil](${url(path("home", "fr"))}) : présentation et sélection de projets`,
    `- [Projets](${url(path("projects", "fr"))}) : les 12 réalisations, par catégorie`,
    `- [À propos](${url(path("about", "fr"))}) : parcours, compétences, méthode`,
    `- [Contact](${url(path("contact", "fr"))}) : formulaire et réservation d'appel`,
    `- [English version](${url(path("home", "en"))})`,
    "",
    "## Compétences",
    "",
    ...getSkills("fr").map((g) => `### ${g.title}\n\n${g.text}\n`),
    "",
    "## Projets",
    "",
    ...projects.map(
      (p) =>
        `- [${p.name}](${url(projectPath(p.slug, "fr"))}) : ${p.tagline} ` +
        `Type : ${categories[p.category].label}. Technologies : ${p.tech.join(", ")}.`,
    ),
    "",
    "## Parcours",
    "",
    ...jobs.map((j) => `- ${j.period} : ${j.role}, ${j.company}. ${j.description}`),
    "",
    "## Contact",
    "",
    `- E-mail : ${siteConfig.email}`,
    `- Appel de trente minutes : ${siteConfig.calendly}`,
    `- LinkedIn : ${siteConfig.linkedin}`,
    `- Malt : ${siteConfig.malt}`,
    `- Localisation : ${siteConfig.location}, à distance partout en France`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
