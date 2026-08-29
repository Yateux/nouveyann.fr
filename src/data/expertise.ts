export type Service = {
  title: string;
  description: string;
  exampleSlug?: string;
};

export const services: Service[] = [
  {
    title: "Sites web",
    description:
      "Présenter votre activité, être trouvé, inspirer confiance dès la première visite.",
    exampleSlug: "cabinet-infirmier-ozoir",
  },
  {
    title: "E-commerce",
    description:
      "Vendre en ligne, avec une boutique que vous administrez vous-même.",
    exampleSlug: "loumari-parfum",
  },
  {
    title: "Applications web",
    description: "Outils métier, plateformes, services sur mesure.",
    exampleSlug: "wooskill",
  },
  {
    title: "Applications mobiles",
    description:
      "iOS et Android, avec les notifications, sur une seule base de code.",
    exampleSlug: "janaza-jamaa",
  },
  {
    title: "Refonte",
    description:
      "Moderniser un site existant : son image, sa vitesse, son expérience.",
  },
  {
    title: "Maintenance",
    description:
      "Mises à jour, correctifs et évolutions une fois le site en ligne.",
  },
];

export const technologies: { name: string; note: string }[] = [
  { name: "Next.js", note: "Sites et applications web performants" },
  { name: "React", note: "Interfaces modernes" },
  { name: "TypeScript", note: "Un code plus sûr, plus facile à maintenir" },
  { name: "React Native", note: "Applications iOS et Android" },
  { name: "Node.js", note: "Serveurs et API" },
  { name: "IA", note: "Fonctions d’IA intégrées à vos produits" },
  {
    name: "WordPress & WooCommerce",
    note: "Sites et boutiques que vous gérez seul",
  },
];
