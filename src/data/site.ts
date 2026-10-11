export const siteConfig = {
  name: "Yann Nouve",
  role: "Développeur freelance",
  domain: "nouveyann.fr",
  url: "https://nouveyann.fr",
  location: "Île-de-France, France",
  region: "Île-de-France",
  country: "FR",
  email: "hello@nouveyann.fr",
  calendly: "https://calendly.com/evolspire/appel-decouverte",
  codeur: "[CODEUR_URL]",
  x: "https://x.com/yateux",
  xHandle: "yateux",
  evolspire: "https://evolspire.com",
  linkedin: "https://www.linkedin.com/in/nouve-yann/",
  malt: "https://www.malt.fr/profile/nouveyann",
  description:
    "Développeur freelance en Île-de-France. Je conçois et développe sites web, boutiques e-commerce et applications sur mesure. Découvrez mes réalisations.",
} as const;

export const externalLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Malt", href: siteConfig.malt },
  { label: "X", href: siteConfig.x },
  { label: "Evolspire", href: siteConfig.evolspire },
] as const;

export const profileUrls = [
  siteConfig.linkedin,
  siteConfig.malt,
  siteConfig.x,
  siteConfig.evolspire,
  siteConfig.codeur,
] as const;

export function isPlaceholder(value: string): boolean {
  return /^\[[A-Z_]+\]$/.test(value.trim());
}
