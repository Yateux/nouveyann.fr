import type { Metadata } from "next";
import Page, { generateMetadata as build } from "@/app/[locale]/projects/[slug]/page";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return build({ params: Promise.resolve({ locale: "fr", slug }) });
}

export default async function FrenchProject({ params }: Params) {
  const { slug } = await params;
  return Page({ params: Promise.resolve({ locale: "fr", slug }) });
}
