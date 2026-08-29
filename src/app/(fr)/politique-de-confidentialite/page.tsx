import type { Metadata } from "next";
import Page, { generateMetadata as build } from "@/app/[locale]/privacy-policy/page";

const params = Promise.resolve({ locale: "fr" });

export function generateMetadata(): Promise<Metadata> {
  return build({ params });
}

export default function FrenchPrivacy() {
  return Page({ params });
}
