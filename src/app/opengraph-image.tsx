import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt =
  "Yann Nouve, développeur freelance en Île-de-France : sites web, e-commerce et applications.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Développeur freelance · Île-de-France",
    title: "Je mets vos idées en ligne.",
    subtitle: "Sites web, boutiques e-commerce et applications sur mesure.",
  });
}
