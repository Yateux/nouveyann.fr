export type Job = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export const jobs: Job[] = [
  {
    period: "2023 → aujourd’hui",
    role: "Développeur freelance",
    company: "Indépendant",
    description:
      "Sites, boutiques en ligne et applications sur mesure, de la conception à la mise en ligne.",
  },
  {
    period: "sept. 2022 → avr. 2023",
    role: "Formateur",
    company: "ANDN Services",
    description:
      "Cours de JavaScript, PHP, SQL et modélisation de bases de données : supports, travaux pratiques et contrôles notés.",
  },
  {
    period: "janv. 2022 → août 2022",
    role: "Lead dev / CTO",
    company: "Numiad",
    description:
      "Sites clients, analyse des besoins, chiffrage des projets, stratégie SEO et encadrement des stagiaires.",
  },
  {
    period: "mars 2021 → déc. 2021",
    role: "Lead dev fullstack",
    company: "Wooskill",
    description:
      "Migration de la v2 vers la v3, revues de code, tests et monitoring, avec le planning d’une équipe de cinq personnes.",
  },
  {
    period: "févr. 2020 → mars 2021",
    role: "Développeur web",
    company: "Wooskill",
    description:
      "Architecture du projet, design system en atomic design, front React et liaison avec les API.",
  },
  {
    period: "nov. 2019 → févr. 2020",
    role: "Formateur",
    company: "ESGI",
    description:
      "Rédaction de formations et d’un projet de système bancaire en React et Node.js.",
  },
  {
    period: "oct. 2019 → mai 2020",
    role: "Développeur web",
    company: "Plateforme médicale",
    description:
      "Maintenance, correction de bugs remontés par les utilisateurs et partage de fichiers en temps réel.",
  },
  {
    period: "sept. 2016 → août 2019",
    role: "Conception et développement d’applications",
    company: "Société Générale",
    description:
      "Référentiel de flux utilisé par une équipe de vingt-cinq personnes, API REST documentée et recherche avancée en React.",
  },
];

export function isComplete(job: Job): boolean {
  return !Object.values(job).some((value) =>
    /^\[[A-Z_]+\]$/.test(value.trim()),
  );
}

export const publishedJobs: Job[] = jobs.filter(isComplete);
