import type { Job } from "@/data/experience";
import { jobs } from "@/data/experience";

const copy: Record<
  string,
  { period: string; role: string; description: string }
> = {
  "2023 → aujourd’hui": {
    period: "2023 → today",
    role: "Freelance developer",
    description:
      "Websites, online stores and custom applications, from design through to launch.",
  },
  "sept. 2022 → avr. 2023": {
    period: "Sept 2022 → Apr 2023",
    role: "Instructor",
    description:
      "JavaScript, PHP, SQL and database modelling: course material, lab work and graded assessments.",
  },
  "janv. 2022 → août 2022": {
    period: "Jan 2022 → Aug 2022",
    role: "Lead dev / CTO",
    description:
      "Client websites, requirements analysis, project estimates, SEO strategy and mentoring interns.",
  },
  "mars 2021 → déc. 2021": {
    period: "Mar 2021 → Dec 2021",
    role: "Lead full-stack developer",
    description:
      "v2 to v3 migration, code reviews, testing and monitoring, running the schedule for a team of five.",
  },
  "févr. 2020 → mars 2021": {
    period: "Feb 2020 → Mar 2021",
    role: "Web developer",
    description:
      "Project architecture, an atomic design system, React front end and API wiring.",
  },
  "nov. 2019 → févr. 2020": {
    period: "Nov 2019 → Feb 2020",
    role: "Instructor",
    description:
      "Writing course material and a banking system project in React and Node.js.",
  },
  "oct. 2019 → mai 2020": {
    period: "Oct 2019 → May 2020",
    role: "Web developer",
    description:
      "Maintenance, fixing bugs reported by users, and real-time file sharing.",
  },
  "sept. 2016 → août 2019": {
    period: "Sept 2016 → Aug 2019",
    role: "Application design and development",
    description:
      "A data-flow repository used by a team of twenty-five, a documented REST API and advanced search in React.",
  },
};

const companies: Record<string, string> = {
  Indépendant: "Self-employed",
  "Plateforme médicale": "Medical platform",
};

export const jobsEn: Job[] = jobs.map((job) => {
  const translated = copy[job.period];
  return {
    ...job,
    ...(translated ?? {}),
    company: companies[job.company] ?? job.company,
  };
});

export const publishedJobsEn: Job[] = jobsEn.filter(
  (job) =>
    !Object.values(job).some((value) => /^\[[A-Z_]+\]$/.test(value.trim())),
);

export function untranslatedJobs(): string[] {
  return jobs.filter((job) => !copy[job.period]).map((job) => job.period);
}
