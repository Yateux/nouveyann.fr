export type ProjectCategory = "site" | "ecommerce" | "app-web" | "app-mobile";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  sector?: string;
  year?: string;
  url?: string;
  tech: string[];
  featured?: boolean;
  study: {
    need: string;
    solution: string;
    design: string;
    development: string;
    result: string;
  };
};

export const categories: Record<
  ProjectCategory,
  { label: string; plural: string }
> = {
  site: { label: "Site web", plural: "Sites web" },
  ecommerce: { label: "E-commerce", plural: "E-commerce" },
  "app-web": { label: "Application web", plural: "Applications web" },
  "app-mobile": { label: "Application mobile", plural: "Applications mobiles" },
};

export const projects: Project[] = [
  {
    slug: "visit-al-haramain",
    url: "https://visitalharamain.com",
    name: "Visit Al Haramain",
    category: "app-web",
    sector: "Voyage et pèlerinage",
    tagline:
      "Une plateforme pour préparer et réserver un pèlerinage, du choix du séjour à la demande d’inscription.",
    tech: ["Next.js", "Firebase", "Stripe"],
    featured: true,
    study: {
      need: "Organiser un pèlerinage demande de comparer des séjours, des dates, des hébergements et des prestations qui évoluent souvent. Tout passait par le téléphone et la messagerie : information dispersée, réponses répétées, suivi difficile.",
      solution:
        "Une plateforme complète : catalogue des séjours, fiches détaillées, demandes d’inscription en ligne et une administration pour tenir les offres à jour sans passer par un développeur.",
      design:
        "Un voyage de ce type est un engagement important : chaque page cherche à rassurer. Les informations qui décident (dates, hébergement, prestations incluses) sont visibles avant tout défilement. Le parcours a été dessiné pour le téléphone d’abord, parce que c’est là que la plupart des visiteurs consultent.",
      development:
        "Next.js pour la vitesse d’affichage et le référencement, Firebase pour l’authentification et les données, Stripe pour le paiement. Les contenus sont modifiables depuis l’administration : ajouter un séjour ne demande aucune intervention technique.",
      result:
        "Les visiteurs trouvent l’information sans appeler, et les demandes arrivent déjà qualifiées : le séjour concerné, les dates, le nombre de personnes. L’équipe gère son catalogue elle-même.",
    },
  },
  {
    slug: "wooskill",
    url: "https://wooskill.com",
    name: "Wooskill",
    category: "app-web",
    sector: "Marketplace, mise en relation",
    tagline:
      "Une marketplace qui met en relation professeurs et élèves, réservation et paiement compris.",
    tech: ["Next.js", "Symfony", "PostgreSQL", "MongoDB"],
    study: {
      need: "Faire vivre deux publics sur une même plateforme : d’un côté des professionnels qui proposent leurs compétences, de l’autre des personnes qui cherchent à apprendre. Il fallait que la rencontre aille jusqu’au paiement, sans jamais sortir du site.",
      solution:
        "Une marketplace complète : création de profil, publication d’offres, recherche, réservation, paiement en ligne et espace personnel pour chacun des deux côtés.",
      design:
        "Deux publics, deux logiques, une seule interface. Le parcours de celui qui achète devait rester très court ; celui qui vend avait besoin d’un tableau de bord lisible. La recherche a été traitée comme la page la plus importante du site, pas comme un utilitaire.",
      development:
        "Interface en Next.js, API métier en Symfony, données en PostgreSQL et MongoDB. La migration de la v2 vers la v3 s’est faite sans coupure de service, avec le déploiement et l’infrastructure repris au passage.",
      result:
        "Une transaction qui va jusqu’au bout sans quitter le site, et une plateforme qui peut accueillir de nouvelles catégories sans être reconstruite.",
    },
  },
  {
    slug: "loumari-parfum",
    url: "https://loumari-parfum.com",
    name: "Loumari Parfum",
    category: "ecommerce",
    sector: "Parfumerie",
    tagline:
      "La boutique en ligne d’une maison de parfum, vendue comme elle le serait en boutique.",
    tech: ["WordPress", "WooCommerce", "Elementor"],
    featured: true,
    study: {
      need: "Vendre du parfum en ligne pose un problème simple : on ne peut pas le sentir. Tout ce qui déclenche l’achat doit passer par l’image, le vocabulaire et la mise en scène du produit.",
      solution:
        "Une boutique WooCommerce où la fiche produit fait le travail d’un conseiller : grands visuels, notes du parfum, format, livraison. Le tunnel d’achat est court et sans distraction.",
      design:
        "Beaucoup de blanc, peu d’éléments, des visuels en grand format. La marque devait respirer le soin sans tomber dans le luxe factice. Les pages de collection restent sobres pour que ce soit le flacon qu’on regarde.",
      development:
        "Le socle est WooCommerce : catalogue, stocks et commandes se gèrent depuis l’administration. Elementor par-dessus, pour que les pages de campagne se montent sans moi.",
      result:
        "Une boutique autonome : nouveaux produits, promotions et pages saisonnières se gèrent en interne, sans intervention technique.",
    },
  },
  {
    slug: "janaza-jamaa",
    url: "https://www.janazajamaa.com",
    name: "Janaza Jamaa",
    category: "app-mobile",
    sector: "Application communautaire",
    tagline:
      "Une application qui prévient toute une communauté en même temps : une annonce publiée, une notification sur chaque téléphone.",
    tech: ["React Native", "NestJS", "PostgreSQL", "Redis"],
    featured: true,
    study: {
      need: "Une information qui doit circuler vite auprès d’un groupe de personnes, sans dépendre de chaînes de messages qui se perdent ou n’atteignent qu’une partie des concernés.",
      solution:
        "Une application mobile avec publication d’annonces et notifications push : l’information part une fois et arrive sur tous les téléphones, immédiatement.",
      design:
        "L’application est consultée dans l’urgence, souvent d’une seule main. Grands caractères, contrastes appuyés, aucune étape superflue entre l’ouverture de l’application et l’information recherchée.",
      development:
        "React Native pour iOS et Android, une API NestJS avec PostgreSQL et Redis côté serveur. Géolocalisation pour trouver les annonces dans un rayon donné, et notifications push dès qu’une annonce est publiée.",
      result:
        "Une diffusion immédiate et fiable, et une administration simple pour les personnes qui publient.",
    },
  },
  {
    slug: "fine-art-numismatics",
    url: "https://fineartnumismatics.com",
    name: "Fine Art Numismatics",
    category: "ecommerce",
    sector: "Numismatique, pièces de collection",
    tagline:
      "Une boutique de pièces de collection, où chaque article n’existe qu’en un exemplaire.",
    tech: ["WordPress", "WooCommerce"],
    featured: true,
    study: {
      need: "Vendre des pièces de collection ne ressemble pas à de la vente au détail : chaque article existe en un seul exemplaire, se décrit avec précision et s’adresse à des acheteurs exigeants qui comparent avant d’acheter.",
      solution:
        "Une boutique WooCommerce adaptée à la pièce unique : fiches détaillées, photographies en grand format, caractéristiques structurées, et un catalogue qui reste navigable à mesure qu’il s’étoffe.",
      design:
        "Sobriété totale : rien ne doit détourner l’attention de la pièce elle-même. La mise en page laisse la photographie occuper l’espace et présente les caractéristiques dans un ordre constant, pour que deux pièces se comparent d’un coup d’œil.",
      development:
        "WooCommerce, mais organisé pour la pièce unique plutôt que pour le réassort : un article vendu sort du catalogue sans laisser de page morte derrière lui.",
      result:
        "Un catalogue crédible face à des acheteurs connaisseurs, et une mise en ligne de nouvelle pièce qui prend quelques minutes.",
    },
  },
  {
    slug: "art-french-touch",
    url: "https://artfrenchtouch.com",
    name: "Art French Touch",
    category: "ecommerce",
    sector: "Galerie d’art",
    tagline:
      "Une galerie en ligne où les œuvres sont présentées comme elles le seraient sur un mur.",
    tech: ["WordPress", "WooCommerce", "Elementor"],
    study: {
      need: "Une galerie a besoin de montrer avant de vendre. Le site devait donner à des œuvres la place qu’elles occupent dans un lieu d’exposition, tout en permettant l’achat.",
      solution:
        "Un site-galerie : les œuvres sont mises en scène, classées par collection, et achetables sans que la boutique prenne le pas sur la présentation.",
      design:
        "Des marges larges, un fond neutre, aucune couleur qui entre en concurrence avec les œuvres. Le format des visuels est respecté plutôt que recadré de force.",
      development:
        "Des gabarits cadrés à l’avance : ajouter une œuvre ou une collection suit toujours la même trame, et la mise en page ne dérive pas au fil des ajouts.",
      result:
        "Une vitrine à la hauteur des œuvres exposées, que la galerie fait vivre elle-même.",
    },
  },
  {
    slug: "eveil-oriental",
    url: "https://www.free-bouddha.fr",
    name: "Éveil Oriental",
    category: "ecommerce",
    tagline:
      "Une boutique complète : catalogue, panier, paiement et gestion des commandes.",
    tech: ["PrestaShop"],
    study: {
      need: "Passer d’une activité de vente à une boutique en ligne autonome, capable de gérer le catalogue, les stocks, les commandes et les expéditions au quotidien.",
      solution:
        "Une boutique PrestaShop configurée de bout en bout : catégories, fiches produits, transporteurs, moyens de paiement, e-mails de commande.",
      design:
        "Un parcours d’achat sans surprise. Le catalogue reste lisible sur téléphone, et le tunnel de commande a été raccourci autant que la plateforme le permet : chaque étape supplémentaire est une commande perdue.",
      development:
        "PrestaShop pour ses fonctions de gestion natives : stocks, commandes, transporteurs et facturation sont couverts sans empiler les extensions.",
      result:
        "Une boutique administrable par son propriétaire, du catalogue à l’expédition.",
    },
  },
  {
    slug: "meteo-express",
    url: "https://meteo-express.com",
    name: "Météo Express",
    category: "site",
    sector: "Média, prévisions météo",
    tagline:
      "La remise en état d’un site de prévisions météo suivi par toute la francophonie.",
    tech: ["WordPress", "Elementor"],
    study: {
      need: "Un site en ligne depuis 2008, entièrement financé par la publicité et les dons. Des bugs d’affichage traînaient, des modules ne fonctionnaient plus après des mises à jour, et chaque défaut coûtait des visiteurs.",
      solution:
        "Un audit complet, puis la correction : pages de prévisions, cartes interactives, sections d’observations, tout ce qui coinçait à l’affichage comme au fonctionnement.",
      design:
        "Pas de refonte graphique : l’habitude des visiteurs est un actif. Les corrections ont porté sur ce qui gênait la lecture, sans déplacer les repères que le public connaît depuis des années.",
      development:
        "WordPress et Elementor, la pile déjà en place. Reprendre l’existant plutôt que tout réécrire : moins de risque, et un site qui reste administrable par la même équipe.",
      result:
        "Un site qui refonctionne pour ses utilisateurs, en parallèle des applications iOS et Android du même service.",
    },
  },
  {
    slug: "slk-pressing",
    name: "SLK Pressing",
    category: "site",
    sector: "Pressing, blanchisserie",
    tagline:
      "Le site d’un pressing de quartier : prestations, horaires, adresse, téléphone.",
    tech: ["WordPress", "Elementor"],
    study: {
      need: "Un commerce de proximité que les clients cherchent sur leur téléphone, souvent depuis la rue, avec trois questions : est-ce ouvert, où est-ce, et est-ce que vous faites ce dont j’ai besoin.",
      solution:
        "Un site vitrine qui répond à ces trois questions dès le premier écran, avec les prestations détaillées juste en dessous et le numéro de téléphone toujours accessible.",
      design:
        "Le mobile a commandé toutes les décisions. Appeler et voir l’adresse tiennent en un geste, sans zoom ni défilement. La mise en page reste nette et le vocabulaire est celui des clients, pas celui du métier.",
      development:
        "Un WordPress volontairement léger. Horaires, prestations et tarifs se changent depuis l’administration, en deux minutes, sans passer par moi.",
      result:
        "Un commerce visible dans les recherches locales, avec un site qui répond à la place du téléphone quand la boutique est fermée.",
    },
  },
  {
    slug: "cabinet-infirmier-ozoir",
    name: "Cabinet Infirmier Ozoir",
    category: "site",
    sector: "Santé, soins infirmiers",
    tagline:
      "Le site d’un cabinet infirmier : soins assurés, secteur d’intervention, contact.",
    tech: ["WordPress", "Elementor"],
    study: {
      need: "Les patients et leurs proches cherchent une information précise, parfois dans un moment difficile : quels soins sont assurés, sur quelle commune, et comment joindre le cabinet rapidement.",
      solution:
        "Un site clair et rassurant : les soins listés sans jargon, le secteur d’intervention explicite, le contact présent sur chaque page.",
      design:
        "Un ton calme, des contrastes confortables et une typographie généreuse : le site est aussi consulté par des personnes âgées, sur de petits écrans. Aucune animation qui gêne la lecture.",
      development:
        "La structure est réduite au strict nécessaire : quand l’équipe s’agrandit ou qu’un soin change, la modification tient en une page d’administration.",
      result:
        "Une présence en ligne professionnelle, qui inspire confiance avant même le premier appel.",
    },
  },
  {
    slug: "demrea",
    url: "https://demrea.com",
    name: "Demrea",
    category: "site",
    tagline:
      "Un site qui présente l’activité et donne envie de décrocher son téléphone.",
    tech: ["WordPress", "Elementor"],
    study: {
      need: "Une activité connue de ses clients mais invisible en ligne : aucune page à envoyer à un prospect, rien qui ressorte dans une recherche par le nom.",
      solution:
        "Trois réponses, une page chacune : ce que fait l’entreprise, pour qui, et comment la joindre. Rien d’empilé au-delà.",
      design:
        "Un cadre net et sobre, une hiérarchie évidente, un appel à l’action visible à chaque étape du parcours. Le site doit se lire en diagonale sans rien perdre.",
      development:
        "Chaque page repose sur un gabarit. Les contenus se modifient en interne sans que la mise en page parte à la dérive au bout de six mois.",
      result:
        "Une adresse à donner, un site qui répond aux questions habituelles et laisse au client le temps de préparer sa demande.",
    },
  },
  {
    slug: "senshouse",
    url: "https://senshouse.dk",
    name: "SensHouse",
    category: "site",
    tagline:
      "Un site de présentation, construit pour rester simple à faire vivre.",
    tech: ["WordPress", "Elementor"],
    study: {
      need: "Disposer d’une présence en ligne soignée, tenable dans la durée sans compétence technique et sans dépendre de quelqu’un pour la moindre modification.",
      solution:
        "Des contenus organisés, et surtout une administration que le client sait utiliser en partant.",
      design:
        "Une mise en page aérée qui met en avant l’essentiel et laisse de la place aux visuels. Des composants réutilisables, pour que les pages ajoutées plus tard restent cohérentes avec les premières.",
      development:
        "Gabarits préparés en amont, puis une prise en main faite de vive voix le jour de la livraison. Un manuel envoyé par e-mail ne se lit pas.",
      result:
        "Un site autonome, que son propriétaire fait évoluer sans revenir vers un développeur.",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbours(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2)
    return { previous: null, next: null };
  return {
    previous: projects[index - 1] ?? projects[projects.length - 1] ?? null,
    next: projects[index + 1] ?? projects[0] ?? null,
  };
}
