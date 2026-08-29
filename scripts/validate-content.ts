import fs from "node:fs";
import path from "node:path";

import { projects, categories, type ProjectCategory } from "@/data/projects";
import { services } from "@/data/expertise";
import { externalLinks, isPlaceholder, siteConfig } from "@/data/site";
import { isComplete, jobs } from "@/data/experience";
import { safeUrl } from "@/lib/safeUrl";
import { untranslatedSlugs } from "@/i18n/getProjects";
import { untranslatedJobs } from "@/data/experience.en";
import { untranslatedServices } from "@/data/expertise.en";

const PUBLIC_PROJECTS = path.join(process.cwd(), "public", "projects");
const EXPECTED_FILES = ["cover.webp", "desktop.webp", "mobile.webp"];

const errors: string[] = [];
const warnings: string[] = [];

const fail = (message: string) => errors.push(message);
const warn = (message: string) => warnings.push(message);

const seenSlugs = new Set<string>();

for (const project of projects) {
  const where = `project "${project.name}"`;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(project.slug)) {
    fail(`${where}: invalid slug "${project.slug}", expected kebab-case.`);
  }

  if (seenSlugs.has(project.slug)) {
    fail(`duplicate slug "${project.slug}".`);
  }
  seenSlugs.add(project.slug);

  if (!(project.category in categories)) {
    fail(`${where}: unknown category "${project.category}".`);
  }

  if (project.name.trim().length === 0) fail(`${where}: empty name.`);
  if (project.tagline.trim().length < 20) {
    fail(`${where}: tagline too short.`);
  }
  if (project.tech.length === 0) {
    fail(`${where}: no technology listed.`);
  }

  for (const [key, value] of Object.entries(project.study)) {
    if (typeof value !== "string" || value.trim().length < 40) {
      fail(`${where}: case study section "${key}" is too short.`);
    }
  }

  if (project.url !== undefined && safeUrl(project.url) === null) {
    fail(`${where}: rejected url "${project.url}".`);
  }

  if (project.year !== undefined && !/^\d{4}$/.test(project.year)) {
    fail(`${where}: invalid year "${project.year}".`);
  }
}

const featuredCount = projects.filter((project) => project.featured).length;
if (featuredCount === 0) {
  fail("no featured project: the home page would be empty.");
} else if (featuredCount > 8) {
  warn(`${featuredCount} featured projects: the home page will get long.`);
}

function readDirectories(directory: string): string[] {
  try {
    return fs
      .readdirSync(directory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

function readDir(directory: string): string[] {
  try {
    return fs.readdirSync(directory);
  } catch {
    return [];
  }
}

let coversMissing = 0;

for (const project of projects) {
  const directory = path.join(PUBLIC_PROJECTS, project.slug);
  const files = readDir(directory);

  if (!files.includes("cover.webp")) coversMissing += 1;

  for (const file of files) {
    if (file.startsWith(".")) continue;
    if (!EXPECTED_FILES.includes(file)) {
      fail(
        `public/projects/${project.slug}/${file}: unexpected name, expected ${EXPECTED_FILES.join(", ")}.`,
      );
    }
  }
}

if (coversMissing > 0) {
  warn(
    `${coversMissing} project(s) without cover.webp, a typographic plate stands in.`,
  );
}

for (const entry of readDirectories(PUBLIC_PROJECTS)) {
  if (!seenSlugs.has(entry)) {
    fail(
      `public/projects/${entry}: no project uses this slug, images are invisible.`,
    );
  }
}

for (const service of services) {
  if (!service.exampleSlug) continue;
  if (!seenSlugs.has(service.exampleSlug)) {
    fail(
      `service "${service.title}": example "${service.exampleSlug}" matches no project.`,
    );
  }
}

const usedCategories = new Set<ProjectCategory>(
  projects.map((project) => project.category),
);
for (const category of Object.keys(categories) as ProjectCategory[]) {
  if (!usedCategories.has(category)) {
    warn(`category "${categories[category].label}": no project attached.`);
  }
}

const configuredLinks: { label: string; value: string }[] = [
  { label: "site", value: siteConfig.url },
  { label: "Calendly", value: siteConfig.calendly },
  { label: "e-mail", value: `mailto:${siteConfig.email}` },
];

for (const link of configuredLinks) {
  if (safeUrl(link.value) === null) {
    fail(`link "${link.label}" rejected: ${link.value}`);
  }
}

for (const link of externalLinks) {
  if (isPlaceholder(link.href)) {
    warn(
      `link "${link.label}": placeholder ${link.href}, hidden in the footer.`,
    );
    continue;
  }
  if (safeUrl(link.href) === null) {
    fail(`link "${link.label}" rejected: ${link.href}`);
  }
}

for (const page of ["legal-notice", "privacy-policy"]) {
  const file = path.join(process.cwd(), "src", "app", "[locale]", page, "page.tsx");
  if (!fs.existsSync(file)) {
    fail(`legal page not found: ${page}`);
    continue;
  }
  const left = [
    ...new Set(fs.readFileSync(file, "utf8").match(/\[[A-Z_]{3,}\]/g) ?? []),
  ];
  if (left.length > 0) {
    warn(`${page}: field(s) left to fill, ${left.join(", ")}`);
  }
}

const incompleteJobs = jobs.filter((job) => !isComplete(job));
if (incompleteJobs.length > 0) {
  warn(
    `experience: ${incompleteJobs.length} entry(ies) still incomplete, hidden from the page.`,
  );
}

if (!/^https:\/\//.test(siteConfig.url)) {
  fail(`siteConfig.url must be an absolute https url: ${siteConfig.url}`);
}

const FORBIDDEN = [/lorem ipsum/i, /\bTODO\b/, /\bFIXME\b/, /à compléter ici/i];

const contentBlobs: { label: string; text: string }[] = [
  ...projects.flatMap((project) => [
    { label: `project ${project.slug} (tagline)`, text: project.tagline },
    ...Object.entries(project.study).map(([key, value]) => ({
      label: `project ${project.slug} (${key})`,
      text: String(value),
    })),
  ]),
  ...services.map((service) => ({
    label: `service ${service.title}`,
    text: service.description,
  })),
];

for (const blob of contentBlobs) {
  for (const pattern of FORBIDDEN) {
    if (pattern.test(blob.text)) {
      fail(`${blob.label}: filler text detected (${pattern}).`);
    }
  }
}

const missingJobs = untranslatedJobs();
if (missingJobs.length > 0) {
  fail(`English copy missing for experience: ${missingJobs.join(", ")}.`);
}

const missingServices = untranslatedServices();
if (missingServices.length > 0) {
  fail(`English copy missing for services: ${missingServices.join(", ")}.`);
}

const missingTranslations = untranslatedSlugs();
if (missingTranslations.length > 0) {
  fail(
    `English copy missing for: ${missingTranslations.join(", ")}. The page would fall back to French.`,
  );
}

for (const message of warnings) console.warn(`  warning: ${message}`);
for (const message of errors) console.error(`  error: ${message}`);

if (errors.length > 0) {
  console.error(
    `\nInvalid content: ${errors.length} error(s). Build stopped.\n`,
  );
  process.exit(1);
}

console.log(
  `Content OK: ${projects.length} projects, ${warnings.length} warning(s).`,
);
