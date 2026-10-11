import type { Locale } from "@/i18n/config";

export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    expertise: string;
    about: string;
    contact: string;
    mainNavigation: string;
    language: string;
    toDark: string;
    toLight: string;
    pauseMotion: string;
    resumeMotion: string;
    newTab: string;
    skipToContent: string;
    switchLanguage: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    headline: { name: string; role: string };
    title: { lead: string; accent: string };
    lede: { strong: string; rest: string };
    demo: {
      label: string;
      steps: [string, string, string, string];
      callMessage: string;
      callMeta: string;
      live: string;
    };
    seeWork: string;
    getInTouch: string;
    workLabel: string;
    allProjects: string;
    viewCaseStudy: string;
    capabilitiesLabel: string;
    experienceLabel: string;
    exampleLink: string;
    detail: string;
    fullCareer: string;
  };
  expertise: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    lead: string;
    seeProjects: (count: number) => string;
    technologies: string;
    redesign: { before: string; after: string };
    maintenance: [string, string, string];
  };
  projects: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    lead: string;
    all: string;
    filterLabel: string;
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
    views: { desktop: string; mobile: string };
    chaptersLabel: string;
    live: string;
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
    experiences: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    lead: string;
    bookTitle: string;
    bookText: string;
    bookCta: string;
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
    copy: string;
    copied: string;
    errorFallback: string;
    errors: {
      name: string;
      nameLong: string;
      email: string;
      emailLong: string;
      message: string;
      messageLong: string;
      consent: string;
    };
  };
  cta: {
    title: string;
    description: string;
    book: string;
    write: string;
  };
  footer: {
    elsewhere: string;
    legalNotice: string;
    privacy: string;
  };
  skills: { label: string };
  jsonLd: { jobTitle: string };
};

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    projects: "Projets",
    expertise: "Expertise",
    about: "À propos",
    contact: "Contact",
    mainNavigation: "Navigation principale",
    language: "Langue",
    toDark: "Passer au thème sombre",
    toLight: "Passer au thème clair",
    pauseMotion: "Mettre les animations en pause",
    resumeMotion: "Réactiver les animations",
    newTab: "nouvel onglet",
    skipToContent: "Aller au contenu",
    switchLanguage: "English",
  },
  home: {
    metaTitle: "Yann Nouve, développeur web freelance en Île-de-France",
    metaDescription:
      "Développeur freelance en Île-de-France. Je conçois et développe sites web, boutiques e-commerce et applications sur mesure. Découvrez mes réalisations.",
    headline: { name: "Yann Nouve,", role: "lead développeur fullstack." },
    title: {
      lead: "Du premier appel à la mise en ligne,",
      accent: "une seule personne.",
    },
    lede: {
      strong: "Yann Nouve, lead développeur fullstack en freelance.",
      rest: "Je conçois et je développe des sites, des boutiques en ligne et des applications sur mesure.",
    },
    demo: {
      label: "Les étapes d’un projet",
      steps: ["Appel", "Maquette", "Code", "En ligne"],
      callMessage:
        "« Bonjour, je voudrais que mes clients réservent en ligne. »",
      callMeta: "Premier appel, 30 minutes",
      live: "En ligne",
    },
    seeWork: "Mon travail",
    getInTouch: "Me contacter",
    workLabel: "Réalisations",
    allProjects: "Tous les projets",
    viewCaseStudy: "Voir l’étude de cas",
    capabilitiesLabel: "Ce que je fais",
    experienceLabel: "Parcours",
    exampleLink: "Exemple",
    detail: "Le détail",
    fullCareer: "Tout le parcours",
  },
  expertise: {
    metaTitle: "Expertise : sites web, e-commerce et applications",
    metaDescription:
      "Sites web, boutiques e-commerce, applications web et mobiles, refonte et maintenance : ce que conçoit et développe Yann Nouve, développeur freelance.",
    label: "Expertise",
    title: "Ce que je fais.",
    lead: "J’accompagne directement les entrepreneurs, les commerces et les entreprises dans la création de leurs produits digitaux : sites web, boutiques en ligne, applications web et mobiles.",
    seeProjects: (count) =>
      count > 1 ? `Voir les ${count} projets` : "Voir le projet",
    technologies: "Technologies",
    redesign: { before: "Avant", after: "Après" },
    maintenance: ["Mises à jour", "Correctifs", "Évolutions"],
  },
  projects: {
    metaTitle: "Projets",
    metaDescription:
      "Sites vitrines, boutiques e-commerce, applications web et mobiles : les projets conçus et développés par Yann Nouve, développeur freelance en Île-de-France.",
    label: "Projets",
    title: "Tout ce que j’ai mis en ligne.",
    lead: "Du pressing du coin à la maison de parfum. Le besoin décide de la solution, jamais l’inverse.",
    all: "Tous",
    filterLabel: "Filtrer les projets",
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
    views: { desktop: "vue sur ordinateur", mobile: "vue sur mobile" },
    chaptersLabel: "Chapitres",
    live: "En ligne",
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
    experiences: "Expériences",
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Parlons de votre projet : réservez un appel de trente minutes ou écrivez-moi. Yann Nouve, développeur freelance en Île-de-France.",
    label: "Contact",
    title: "Parlons de votre projet.",
    lead: "Dites-moi ce que vous voulez construire.",
    bookTitle: "Réserver un appel",
    bookText:
      "Trente minutes au téléphone, sans engagement. Vous me racontez votre projet, je vous dis comment je le ferais et ce que cela implique.",
    bookCta: "Choisir un créneau",
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
    copy: "Copier",
    copied: "Copié",
    errorFallback: "Vous pouvez aussi m’écrire à",
    errors: {
      name: "Indiquez votre nom.",
      nameLong: "Ce nom est trop long.",
      email: "Cette adresse e-mail semble incorrecte.",
      emailLong: "Cette adresse est trop longue.",
      message:
        "Décrivez votre projet en quelques mots (20 caractères minimum).",
      messageLong: "Ce message est trop long (4000 caractères maximum).",
      consent: "Merci de cocher cette case pour envoyer votre message.",
    },
  },
  cta: {
    title: "Un projet à mettre en ligne ?",
    description:
      "Sans engagement : trente minutes au téléphone pour comprendre votre besoin et vous dire ce qui est possible.",
    book: "Réserver un appel",
    write: "Écrire un message",
  },
  footer: {
    elsewhere: "Ailleurs",
    legalNotice: "Mentions légales",
    privacy: "Politique de confidentialité",
  },
  skills: { label: "Compétences" },
  jsonLd: { jobTitle: "Développeur freelance" },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    projects: "Work",
    expertise: "Expertise",
    about: "About",
    contact: "Contact",
    mainNavigation: "Main navigation",
    language: "Language",
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
    pauseMotion: "Pause animations",
    resumeMotion: "Resume animations",
    newTab: "new tab",
    skipToContent: "Skip to content",
    switchLanguage: "Français",
  },
  home: {
    metaTitle: "Yann Nouve, freelance full-stack web developer in Paris",
    metaDescription:
      "Freelance web developer based near Paris, France. I design and build websites, online stores and custom applications, end to end. See the work.",
    headline: { name: "Yann Nouve,", role: "lead full-stack developer." },
    title: {
      lead: "From the first call to launch day,",
      accent: "one person.",
    },
    lede: {
      strong: "Yann Nouve, freelance lead full-stack developer.",
      rest: "I design and build websites, online stores and custom applications.",
    },
    demo: {
      label: "The stages of a project",
      steps: ["Call", "Mockup", "Code", "Live"],
      callMessage: "“Hello, I’d like my customers to book online.”",
      callMeta: "First call, 30 minutes",
      live: "Live",
    },
    seeWork: "See my work",
    getInTouch: "Get in touch",
    workLabel: "Selected work",
    allProjects: "All projects",
    viewCaseStudy: "Read the case study",
    capabilitiesLabel: "What I do",
    experienceLabel: "Experience",
    exampleLink: "Example",
    detail: "In detail",
    fullCareer: "Full background",
  },
  expertise: {
    metaTitle: "Expertise: websites, online stores and apps",
    metaDescription:
      "Websites, online stores, web and mobile apps, redesign and maintenance: what Yann Nouve, freelance full-stack developer near Paris, designs and builds.",
    label: "Expertise",
    title: "What I do.",
    lead: "I work directly with founders, local businesses and companies on their digital products: websites, online stores, web and mobile applications.",
    seeProjects: (count) =>
      count > 1 ? `See all ${count} projects` : "See the project",
    technologies: "Stack",
    redesign: { before: "Before", after: "After" },
    maintenance: ["Updates", "Fixes", "New features"],
  },
  projects: {
    metaTitle: "Work",
    metaDescription:
      "Websites, online stores, web and mobile applications: projects designed and built by Yann Nouve, freelance full-stack developer near Paris.",
    label: "Work",
    title: "Everything I have put online.",
    lead: "From the dry cleaner around the corner to a perfume house. The need decides the solution, never the other way round.",
    all: "All",
    filterLabel: "Filter projects",
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
    views: { desktop: "desktop view", mobile: "mobile view" },
    chaptersLabel: "Chapters",
    live: "Live",
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
    experiences: "Experience",
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Let's talk about your project: book a thirty-minute call or write to me. Yann Nouve, freelance full-stack developer near Paris.",
    label: "Contact",
    title: "Let's talk about your project.",
    lead: "Tell me what you want to build.",
    bookTitle: "Book a call",
    bookText:
      "Thirty minutes on the phone, no commitment. You walk me through your project, I tell you how I would build it and what that involves.",
    bookCta: "Pick a slot",
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
    copy: "Copy",
    copied: "Copied",
    errorFallback: "You can also write to me at",
    errors: {
      name: "Enter your name.",
      nameLong: "This name is too long.",
      email: "This email address looks incorrect.",
      emailLong: "This address is too long.",
      message: "Describe your project in a few words (20 characters minimum).",
      messageLong: "This message is too long (4000 characters maximum).",
      consent: "Please tick this box to send your message.",
    },
  },
  cta: {
    title: "A project to put online?",
    description:
      "No commitment: thirty minutes on the phone to understand what you need and tell you what is possible.",
    book: "Book a call",
    write: "Send a message",
  },
  footer: {
    elsewhere: "Elsewhere",
    legalNotice: "Legal notice",
    privacy: "Privacy policy",
  },
  skills: { label: "Skills" },
  jsonLd: { jobTitle: "Freelance full-stack developer" },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
