import type { Metadata } from "next";
import Page, { generateMetadata as build } from "@/app/[locale]/contact/page";

const params = Promise.resolve({ locale: "fr" });

export function generateMetadata(): Promise<Metadata> {
  return build({ params });
}

export default function FrenchContact() {
  return Page({ params });
}
