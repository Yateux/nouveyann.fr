import type { Locale } from "@/i18n/config";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    mainNavigation: string;
    menu: string;
    close: string;
    skipToContent: string;
    switchLanguage: string;
    switchFlag: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    location: string;
    headline: { name: string; role: string };
    intro: string[];
    seeWork: string;
    getInTouch: string;
    scroll: string;
    figure: string;
    workLabel: string;
    allProjects: string;
    viewCaseStudy: string;
    capabilitiesLabel: string;
    experienceLabel: string;
    exampleLink: string;
  };
  process: {
    label: string;
    steps: { title: string; description: string }[];
  };
  projects: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    lead: string;
    listLabel: (category: string) => string;
    previewAlt: (name: string) => string;
  };
  caseStudy: {
    backToProjects: string;
    viewLive: string;
    signoff: string;
    facts: {
      client: string;
      sector: string;
      year: string;
      type: string;
      tech: string;
    };
    chapters: {
      need: string;
      solution: string;
      design: string;
      development: string;
      result: string;
    };
    gallery: (name: string) => string;
    navLabel: string;
    previous: string;
    next: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    paragraphs: string[];
    facts: { term: string; value: string }[];
    elsewhere: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    lead: string;
    bookLabel: string;
    bookTitle: string;
    bookText: string;
    bookCta: string;
    writeLabel: string;
    writeTitle: string;
    writeText: string;
    fields: { name: string; email: string; message: string; consent: string };
    messagePlaceholder: string;
    submit: string;
    sending: string;
    replyHint: string;
    genericError: string;
    messageLabel: string;
    successTitle: string;
    successText: string;
    writeAnother: string;
    infoEmail: string;
    infoWhere: string;
    infoWhereValue: string;
    infoReply: string;
    infoReplyValue: string;
  };
  cta: {
    title: string;
    description: string;
    book: string;
    write: string;
    or: string;
  };
  footer: {
    reach: string;
    navigation: string;
    elsewhere: string;
    legalNotice: string;
    privacy: string;
    rights: string;
    where: string;
    remote: string;
    backToTop: string;
  };
  skills: { label: string };
  jsonLd: { jobTitle: string };
  notFound: {
    title: string;
    text: string;
    back: string;
  };
};

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
    mainNavigation: "Navigation principale",
    menu: "Menu",
    close: "Fermer",
    skipToContent: "Aller au contenu",
    switchLanguage: "English",
    switchFlag: "🇬🇧",
  },
  home: {
    metaTitle: "Yann Nouve, développeur web freelance en Île-de-France",
    metaDescription:
      "Développeur freelance en Île-de-France. Je conçois et développe sites web, boutiques e-commerce et applications sur mesure. Découvrez mes réalisations.",
    location: "Île-de-France · Partout en France",
    headline: { name: "Yann Nouve,", role: "lead développeur fullstack." },
    intro: [
      "En freelance, je conçois et je développe des sites, des boutiques en ligne et des applications sur mesure.",
      "Vous échangez avec la personne qui écrit le code, du premier appel aux évolutions qui suivent.",
    ],
    seeWork: "Mon travail",
    getInTouch: "Me contacter",
    scroll: "Défiler",
    figure: "Fig. 01 · Développé sur mesure",
    workLabel: "Réalisations",
    allProjects: "Tous les projets",
    viewCaseStudy: "Voir l’étude de cas",
    capabilitiesLabel: "Ce que je fais",
    experienceLabel: "Parcours",
    exampleLink: "Exemple",
  },
  process: {
    label: "La méthode",
    steps: [
      {
        title: "On se parle",
        description:
          "Trente minutes pour cerner votre activité, vos clients et ce que le projet doit vous rapporter.",
      },
      {
        title: "Je construis",
        description:
          "Maquette, développement, retours à chaque étape. Vous voyez le projet avancer, sans surprise à la livraison.",
      },
      {
        title: "On continue",
        description:
          "Mise en ligne, vérifications, prise en main. Puis je reste disponible pour faire évoluer le site au rythme de votre activité.",
      },
    ],
  },
  projects: {
    metaTitle: "Projets",
    metaDescription:
      "Sites vitrines, boutiques e-commerce, applications web et mobiles : les projets conçus et développés par Yann Nouve, développeur freelance en Île-de-France.",
    label: "Projets",
    title: "Tout ce que j’ai mis en ligne.",
    lead: "Du pressing du coin à la maison de parfum. Le besoin décide de la solution, jamais l’inverse.",
    listLabel: (category) => `Projets : ${category}`,
    previewAlt: (name) => `Aperçu du projet ${name}`,
  },
  caseStudy: {
    backToProjects: "Tous les projets",
    viewLive: "Voir le site en ligne",
    signoff: " Étude de cas par Yann Nouve, développeur freelance.",
    facts: {
      client: "Client",
      sector: "Secteur",
      year: "Année",
      type: "Type de projet",
      tech: "Technologies",
    },
    chapters: {
      need: "Le besoin",
      solution: "La solution",
      design: "Le design",
      development: "Le développement",
      result: "Le résultat",
    },
    gallery: (name) => `Galerie du projet ${name}`,
    navLabel: "Projets précédent et suivant",
    previous: "Projet précédent",
    next: "Projet suivant",
  },
  about: {
    metaTitle: "À propos",
    metaDescription:
      "Yann Nouve, développeur freelance en Île-de-France. Je conçois et développe directement les sites, boutiques et applications de mes clients, sans intermédiaire.",
    label: "À propos",
    title: "Du premier appel à la mise en ligne.",
    paragraphs: [
      "J’accompagne directement les entrepreneurs, les commerces et les entreprises dans la création de leurs produits digitaux : sites web, boutiques en ligne, applications web et mobiles.",
      "Celui qui dessine votre projet est aussi celui qui l’écrit et qui le met en production. Next.js, React et React Native pour le sur-mesure ; WordPress et WooCommerce quand vous devez pouvoir tout gérer vous-même.",
      "Une fois le site en ligne, je ne disparais pas. Mises à jour, corrections, évolutions : vous savez à qui vous adresser, et c’est toujours la même personne.",
      "Je fais également vivre Evolspire, ma marque d’agence.",
    ],
    facts: [
      { term: "Base", value: "Île-de-France" },
      { term: "Périmètre", value: "À distance partout en France" },
      { term: "Interlocuteur", value: "Le même du début à la fin" },
    ],
    elsewhere: "Me retrouver ailleurs",
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Parlons de votre projet : réservez un appel de trente minutes ou écrivez-moi. Yann Nouve, développeur freelance en Île-de-France.",
    label: "Contact",
    title: "Parlons de votre projet.",
    lead: "Dites-moi ce que vous voulez construire.",
    bookLabel: "Le plus simple",
    bookTitle: "Réserver un appel",
    bookText:
      "Trente minutes au téléphone, sans engagement. Vous me racontez votre projet, je vous dis comment je le ferais et ce que cela implique.",
    bookCta: "Choisir un créneau",
    writeLabel: "Ou par écrit",
    writeTitle: "Écrire un message",
    writeText:
      "Trois champs suffisent. Le budget et le périmètre, on en parle de vive voix.",
    fields: {
      name: "Nom",
      email: "E-mail",
      message: "Message",
      consent:
        "J’accepte que ces informations soient utilisées pour répondre à ma demande.",
    },
    messagePlaceholder: "Ce que vous voulez construire, et pour quand.",
    submit: "Envoyer le message",
    sending: "Envoi en cours…",
    replyHint: "Réponse sous 24 à 48 h.",
    genericError: "Votre message n’a pas pu être envoyé.",
    messageLabel: "Votre message",
    successTitle: "Message envoyé.",
    successText:
      "Merci. Je vous réponds sous 24 à 48 heures ouvrées, à l’adresse que vous m’avez indiquée.",
    writeAnother: "Écrire un autre message",
    infoEmail: "E-mail",
    infoWhere: "Où",
    infoWhereValue: "Île-de-France, à distance partout en France",
    infoReply: "Réponse",
    infoReplyValue: "Sous 24 à 48 heures ouvrées",
  },
  cta: {
    title: "Un projet à mettre en ligne ?",
    description:
      "Sans engagement : trente minutes au téléphone pour comprendre votre besoin et vous dire ce qui est possible.",
    book: "Réserver un appel",
    write: "Écrire un message",
    or: "ou",
  },
  footer: {
    reach: "Me joindre",
    navigation: "Navigation",
    elsewhere: "Ailleurs",
    legalNotice: "Mentions légales",
    privacy: "Politique de confidentialité",
    rights: "Tous droits réservés.",
    where: "Où",
    remote: "À distance partout en France",
    backToTop: "Retour en haut",
  },
  skills: { label: "Compétences" },
  jsonLd: { jobTitle: "Développeur freelance" },
  notFound: {
    title: "Page introuvable.",
    text: "Cette adresse ne mène nulle part. Le reste du site fonctionne.",
    back: "Retour à l’accueil",
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    projects: "Work",
    about: "About",
    contact: "Contact",
    mainNavigation: "Main navigation",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    switchLanguage: "Français",
    switchFlag: "🇫🇷",
  },
  home: {
    metaTitle: "Yann Nouve, freelance full-stack web developer in Paris",
    metaDescription:
      "Freelance web developer based near Paris, France. I design and build websites, online stores and custom applications, end to end. See the work.",
    location: "Île-de-France · Remote across France",
    headline: { name: "Yann Nouve,", role: "lead full-stack developer." },
    intro: [
      "Freelance, I design and build websites, online stores and custom applications.",
      "You talk to the person writing the code, from the first call to whatever comes after launch.",
    ],
    seeWork: "See my work",
    getInTouch: "Get in touch",
    scroll: "Scroll",
    figure: "Fig. 01 · Built to measure",
    workLabel: "Selected work",
    allProjects: "All projects",
    viewCaseStudy: "Read the case study",
    capabilitiesLabel: "What I do",
    experienceLabel: "Experience",
    exampleLink: "Example",
  },
  process: {
    label: "How it works",
    steps: [
      {
        title: "We talk",
        description:
          "Thirty minutes to understand your business, your customers, and what the project has to bring in.",
      },
      {
        title: "I build",
        description:
          "Design, development, feedback at every step. You watch the project move, with no surprise on delivery day.",
      },
      {
        title: "We keep going",
        description:
          "Launch, checks, hand-over. Then I stay available to grow the site at the pace of your business.",
      },
    ],
  },
  projects: {
    metaTitle: "Work",
    metaDescription:
      "Websites, online stores, web and mobile applications: projects designed and built by Yann Nouve, freelance full-stack developer near Paris.",
    label: "Work",
    title: "Everything I have put online.",
    lead: "From the dry cleaner around the corner to a perfume house. The need decides the solution, never the other way round.",
    listLabel: (category) => `Projects: ${category}`,
    previewAlt: (name) => `Preview of the ${name} project`,
  },
  caseStudy: {
    backToProjects: "All projects",
    viewLive: "Visit the live site",
    signoff: " Case study by Yann Nouve, freelance developer.",
    facts: {
      client: "Client",
      sector: "Sector",
      year: "Year",
      type: "Project type",
      tech: "Stack",
    },
    chapters: {
      need: "The need",
      solution: "The solution",
      design: "The design",
      development: "The build",
      result: "The outcome",
    },
    gallery: (name) => `${name} project gallery`,
    navLabel: "Previous and next project",
    previous: "Previous project",
    next: "Next project",
  },
  about: {
    metaTitle: "About",
    metaDescription:
      "Yann Nouve, freelance full-stack developer near Paris. I design and build my clients' websites, stores and applications myself, with no middleman.",
    label: "About",
    title: "From the first call to launch day.",
    paragraphs: [
      "I work directly with founders, local businesses and companies on their digital products: websites, online stores, web and mobile applications.",
      "Whoever designs your project is also the one who writes it and ships it. Next.js, React and React Native when it has to be custom; WordPress and WooCommerce when you need to run everything yourself.",
      "Once the site is live I do not disappear. Updates, fixes, new features: you know who to ask, and it is always the same person.",
      "I also run Evolspire, my agency brand.",
    ],
    facts: [
      { term: "Based in", value: "Île-de-France, France" },
      { term: "Scope", value: "Remote across France" },
      { term: "Point of contact", value: "The same one throughout" },
    ],
    elsewhere: "Find me elsewhere",
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Let's talk about your project: book a thirty-minute call or write to me. Yann Nouve, freelance full-stack developer near Paris.",
    label: "Contact",
    title: "Let's talk about your project.",
    lead: "Tell me what you want to build.",
    bookLabel: "Simplest way",
    bookTitle: "Book a call",
    bookText:
      "Thirty minutes on the phone, no commitment. You walk me through your project, I tell you how I would build it and what that involves.",
    bookCta: "Pick a slot",
    writeLabel: "Or in writing",
    writeTitle: "Send a message",
    writeText:
      "Three fields are enough. Budget and scope are better discussed out loud.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
      consent: "I agree to this information being used to answer my request.",
    },
    messagePlaceholder: "What you want to build, and by when.",
    submit: "Send message",
    sending: "Sending…",
    replyHint: "Reply within 24 to 48 hours.",
    genericError: "Your message could not be sent.",
    messageLabel: "Your message",
    successTitle: "Message sent.",
    successText:
      "Thank you. I will reply within 24 to 48 working hours, at the address you gave me.",
    writeAnother: "Write another message",
    infoEmail: "Email",
    infoWhere: "Where",
    infoWhereValue: "Île-de-France, remote across France",
    infoReply: "Reply",
    infoReplyValue: "Within 24 to 48 working hours",
  },
  cta: {
    title: "A project to put online?",
    description:
      "No commitment: thirty minutes on the phone to understand what you need and tell you what is possible.",
    book: "Book a call",
    write: "Send a message",
    or: "or",
  },
  footer: {
    reach: "Reach me",
    navigation: "Navigation",
    elsewhere: "Elsewhere",
    legalNotice: "Legal notice",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
    where: "Where",
    remote: "Remote across France",
    backToTop: "Back to top",
  },
  skills: { label: "Skills" },
  jsonLd: { jobTitle: "Freelance full-stack developer" },
  notFound: {
    title: "Page not found.",
    text: "This address leads nowhere. The rest of the site works.",
    back: "Back to home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
