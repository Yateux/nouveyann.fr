// Server only: never import this from a client component.
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const existsCache = new Map<string, boolean>();

function publicFileExists(relativePath: string): boolean {
  const cached = existsCache.get(relativePath);
  if (cached !== undefined) return cached;

  const normalized = path.normalize(relativePath).replace(/^[/\\]+/, "");
  const fullPath = path.join(PUBLIC_DIR, normalized);

  const inside = fullPath.startsWith(PUBLIC_DIR + path.sep);
  let exists = false;
  if (inside) {
    try {
      exists = fs.statSync(fullPath).isFile();
    } catch {
      exists = false;
    }
  }

  existsCache.set(relativePath, exists);
  return exists;
}

function publicAsset(relativePath: string): string | null {
  const clean = relativePath.startsWith("/")
    ? relativePath
    : `/${relativePath}`;
  return publicFileExists(clean) ? clean : null;
}

export type ProjectMedia = {
  cover: string | null;
  gallery: { src: string; label: string }[];
};

const GALLERY = [
  { file: "desktop.webp", label: "Vue sur ordinateur" },
  { file: "mobile.webp", label: "Vue sur mobile" },
];

export function getProjectMedia(slug: string): ProjectMedia {
  const cover = publicAsset(`/projects/${slug}/cover.webp`);
  const gallery = GALLERY.map(({ file, label }) => {
    const src = publicAsset(`/projects/${slug}/${file}`);
    return src ? { src, label } : null;
  }).filter((item): item is { src: string; label: string } => item !== null);

  return { cover, gallery };
}

export function getLogo(): string | null {
  return publicAsset("/logo.png") ?? publicAsset("/logo.webp");
}
