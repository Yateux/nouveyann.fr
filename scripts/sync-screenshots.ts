// Matched by slug, never by index: two catalogues in a different order would
// silently pair screenshots with the wrong project.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { projects } from "@/data/projects";

const SOURCE = path.resolve(
  process.env.EVOLSPIRE_PATH ??
    path.join(process.cwd(), "..", "..", "evolspire"),
);
const DATA_FILE = path.join(SOURCE, "src", "data", "projects.json");
const PUBLIC_SOURCE = path.join(SOURCE, "public");
const TARGET = path.join(process.cwd(), "public", "projects");

const MAX_WIDTH = 1600;
const QUALITY = 78;

type SourceProject = {
  slug: string;
  url?: string;
  details?: {
    screenshot?: string;
    sections?: { images?: string[] }[];
  };
};

function readSource(): SourceProject[] {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(
      `Evolspire repo not found: ${DATA_FILE}\n` +
        "Indiquez son chemin avec EVOLSPIRE_PATH=/chemin/vers/evolspire",
    );
    process.exit(1);
  }

  const raw: unknown = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const list = Array.isArray(raw)
    ? raw
    : ((Object.values(raw as Record<string, unknown>)[0] ?? []) as unknown[]);

  return list as SourceProject[];
}

async function convert(relativePath: string, destination: string) {
  const source = path.join(PUBLIC_SOURCE, relativePath);
  if (!fs.existsSync(source)) return false;

  const image = sharp(source);
  const { width } = await image.metadata();

  await image
    .resize({
      width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(destination);

  return true;
}

async function main() {
  const source = readSource();
  const bySlug = new Map(source.map((project) => [project.slug, project]));

  let covers = 0;
  let extras = 0;
  const missing: string[] = [];

  for (const project of projects) {
    const match = bySlug.get(project.slug);
    const shot = match?.details?.screenshot;
    const sectionImages = (match?.details?.sections ?? []).flatMap(
      (section) => section.images ?? [],
    );

    if (!shot && sectionImages.length === 0) {
      missing.push(project.slug);
      continue;
    }

    const directory = path.join(TARGET, project.slug);
    fs.mkdirSync(directory, { recursive: true });

    if (shot && (await convert(shot, path.join(directory, "cover.webp")))) {
      covers += 1;
    }

    const [first, second] = sectionImages;
    if (first && (await convert(first, path.join(directory, "desktop.webp")))) {
      extras += 1;
    }
    if (
      second &&
      (await convert(second, path.join(directory, "mobile.webp")))
    ) {
      extras += 1;
    }
  }

  console.log(
    `${covers} cover(s) and ${extras} extra image(s) imported from ${SOURCE}.`,
  );

  if (missing.length > 0) {
    console.warn(
      `Aucune image dans Evolspire pour : ${missing.join(", ")}. ` +
        "Une plaque de couleur tient la place.",
    );
  }
}

main().catch((error: unknown) => {
  console.error("Import interrompu :", error);
  process.exit(1);
});
