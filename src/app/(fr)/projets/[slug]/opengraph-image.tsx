import Image, {
  size as ogSize,
  contentType as ogContentType,
  alt as ogAlt,
} from "@/app/[locale]/projects/[slug]/opengraph-image";
import { projects } from "@/data/projects";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = ogAlt;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function FrenchOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return Image({ params: Promise.resolve({ locale: "fr", slug }) });
}
