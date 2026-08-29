import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/data/site";

export type LegalSection = { title: string; paragraphs: string[] };
export type LegalPageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

const COMPANY = {
  name: "EVOLSPIRE",
  capital: "500,00 €",
  siren: "999 547 003",
  siret: "999 547 003 00015",
  rcs: "RCS Créteil 999 547 003",
  vat: "FR93999547003",
  naf: "62.02A",
  address: "34 rue du Docteur Calmette, 94310 Orly, France",
  host: "Vercel Inc.",
  hostAddress: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
};

const legalNotice: Record<Locale, LegalPageContent> = {
  fr: {
    metaTitle: "Mentions légales",
    metaDescription: `Mentions légales du site ${siteConfig.domain}.`,
    title: "Mentions légales",
    intro: `Informations légales relatives au site ${siteConfig.domain}.`,
    sections: [
      {
        title: "Éditeur du site",
        paragraphs: [
          `Le site ${siteConfig.domain} est édité par ${COMPANY.name}, EURL au capital de ${COMPANY.capital}.`,
          `SIREN : ${COMPANY.siren}. SIRET : ${COMPANY.siret}. ${COMPANY.rcs}. Numéro de TVA intracommunautaire : ${COMPANY.vat}. Code NAF/APE : ${COMPANY.naf} - Conseil en systèmes et logiciels informatiques.`,
          `Siège social : ${COMPANY.address}.`,
          `Adresse électronique : ${siteConfig.email}.`,
        ],
      },
      {
        title: "Directeur de la publication",
        paragraphs: [
          `${siteConfig.name}, en qualité de gérant de la société ${COMPANY.name}.`,
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          `Le site est hébergé par ${COMPANY.host}, dont le site est accessible à l’adresse vercel.com.`,
          `Adresse de l’hébergeur : ${COMPANY.hostAddress}.`,
        ],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          "L’ensemble des contenus de ce site (textes, mise en page, code, visuels) est protégé par le droit d’auteur. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
          "Les noms, marques et visuels des projets présentés restent la propriété de leurs titulaires respectifs. Ils sont montrés à titre de références de travaux réalisés.",
        ],
      },
      {
        title: "Données personnelles",
        paragraphs: [
          "Le traitement des données transmises par le formulaire de contact est décrit dans la politique de confidentialité, accessible depuis le pied de page.",
        ],
      },
      {
        title: "Responsabilité",
        paragraphs: [
          "Les informations publiées sur ce site sont fournies à titre indicatif. Malgré le soin apporté à leur mise à jour, aucune garantie n’est donnée quant à leur exhaustivité ou leur actualité.",
          "Les liens vers des sites tiers sont proposés pour votre commodité ; leur contenu n’engage que leurs éditeurs.",
        ],
      },
      {
        title: "Droit applicable",
        paragraphs: [
          "Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français sont seuls compétents.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Legal notice",
    metaDescription: `Legal information for ${siteConfig.domain}.`,
    title: "Legal notice",
    intro: `Legal information for the ${siteConfig.domain} website.`,
    sections: [
      {
        title: "Publisher",
        paragraphs: [
          `${siteConfig.domain} is published by ${COMPANY.name}, a French EURL with share capital of ${COMPANY.capital}.`,
          `SIREN: ${COMPANY.siren}. SIRET: ${COMPANY.siret}. ${COMPANY.rcs}. EU VAT number: ${COMPANY.vat}. NAF/APE code: ${COMPANY.naf} - IT systems and software consultancy.`,
          `Registered office: ${COMPANY.address}.`,
          `Email: ${siteConfig.email}.`,
        ],
      },
      {
        title: "Publication director",
        paragraphs: [
          `${siteConfig.name}, as managing director of ${COMPANY.name}.`,
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          `The site is hosted by ${COMPANY.host}, whose website is at vercel.com.`,
          `Host address: 440 N Barranca Avenue #4133, Covina, CA 91723, United States.`,
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "All content on this site (text, layout, code, images) is protected by copyright. Any reproduction or representation, in whole or in part, without prior written permission is prohibited.",
          "The names, trademarks and images of the projects shown remain the property of their respective owners. They appear as references to work carried out.",
        ],
      },
      {
        title: "Personal data",
        paragraphs: [
          "How data submitted through the contact form is processed is described in the privacy policy, linked from the footer.",
        ],
      },
      {
        title: "Liability",
        paragraphs: [
          "Information published on this site is provided for guidance. Despite the care taken to keep it current, no guarantee is given as to its completeness or timeliness.",
          "Links to third-party sites are offered for convenience; their content is the sole responsibility of their publishers.",
        ],
      },
      {
        title: "Governing law",
        paragraphs: [
          "This site is governed by French law. In the event of a dispute, and failing an amicable settlement, the French courts have sole jurisdiction.",
        ],
      },
    ],
  },
};

const privacy: Record<Locale, LegalPageContent> = {
  fr: {
    metaTitle: "Politique de confidentialité",
    metaDescription: `Traitement des données personnelles sur ${siteConfig.domain}.`,
    title: "Politique de confidentialité",
    intro: `Comment les données transmises sur ${siteConfig.domain} sont traitées.`,
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          `${COMPANY.name} (EURL), éditrice du site ${siteConfig.domain}, représentée par ${siteConfig.name}. Siège social : ${COMPANY.address}.`,
          `Pour toute question relative à vos données : ${siteConfig.email}.`,
        ],
      },
      {
        title: "Données collectées",
        paragraphs: [
          "Seul le formulaire de contact collecte des données : votre nom, votre adresse électronique et le contenu de votre message.",
          "Aucun compte, aucun profil, aucune donnée bancaire n’est collecté sur ce site.",
        ],
      },
      {
        title: "Finalité et base légale",
        paragraphs: [
          "Ces données servent uniquement à répondre à votre demande et, le cas échéant, à échanger sur le projet que vous décrivez.",
          "La base légale est votre consentement, recueilli par la case à cocher du formulaire. Vous pouvez le retirer à tout moment en écrivant à l’adresse ci-dessus.",
        ],
      },
      {
        title: "Destinataires",
        paragraphs: [
          `Les messages sont reçus par ${siteConfig.name} seul. Ils ne sont ni revendus, ni cédés, ni utilisés à des fins publicitaires.`,
          `L’acheminement des messages fait appel à un prestataire technique d’envoi d’e-mails, agissant comme sous-traitant : Resend (Resend, Inc.). Les messages transitent par ses serveurs pour être acheminés vers ${siteConfig.email}.`,
        ],
      },
      {
        title: "Durée de conservation",
        paragraphs: [
          "Les messages sont conservés le temps nécessaire au traitement de la demande et à la relation qui peut en découler, puis supprimés. Durée retenue : trois ans à compter du dernier échange, conformément à la recommandation de la CNIL pour les contacts commerciaux.",
        ],
      },
      {
        title: "Cookies et mesure d’audience",
        paragraphs: [
          "Ce site ne dépose aucun cookie publicitaire et n’utilise aucun traceur de mesure d’audience. Aucune bannière de consentement n’est donc nécessaire.",
          "Si un outil de mesure venait à être ajouté, cette page serait mise à jour et votre consentement recueilli au préalable.",
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          `Le site est hébergé par ${COMPANY.host}. Les journaux techniques générés par l’hébergement peuvent contenir des adresses IP, à des fins de sécurité et de bon fonctionnement du service.`,
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos données. Écrivez à ${siteConfig.email} : la demande est traitée dans un délai d’un mois.`,
          "Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL (cnil.fr).",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Privacy policy",
    metaDescription: `How personal data submitted on ${siteConfig.domain} is handled.`,
    title: "Privacy policy",
    intro: `How data submitted on ${siteConfig.domain} is handled.`,
    sections: [
      {
        title: "Data controller",
        paragraphs: [
          `${COMPANY.name} (EURL), publisher of ${siteConfig.domain}, represented by ${siteConfig.name}. Registered office: ${COMPANY.address}.`,
          `For any question about your data: ${siteConfig.email}.`,
        ],
      },
      {
        title: "Data collected",
        paragraphs: [
          "Only the contact form collects data: your name, your email address and the content of your message.",
          "No account, no profile and no payment data is collected on this site.",
        ],
      },
      {
        title: "Purpose and legal basis",
        paragraphs: [
          "This data is used solely to answer your request and, where relevant, to discuss the project you describe.",
          "The legal basis is your consent, given through the checkbox on the form. You can withdraw it at any time by writing to the address above.",
        ],
      },
      {
        title: "Recipients",
        paragraphs: [
          `Messages are received by ${siteConfig.name} alone. They are never sold, transferred or used for advertising.`,
          `Delivery relies on an email service provider acting as a processor: Resend (Resend, Inc.). Messages pass through its servers on their way to ${siteConfig.email}.`,
        ],
      },
      {
        title: "Retention",
        paragraphs: [
          "Messages are kept for as long as needed to handle the request and any relationship that follows, then deleted. Retention period: three years from the last exchange, in line with the French data protection authority's guidance for business contacts.",
        ],
      },
      {
        title: "Cookies and analytics",
        paragraphs: [
          "This site sets no advertising cookie and uses no analytics tracker. No consent banner is therefore needed.",
          "Should an analytics tool be added, this page would be updated and your consent collected beforehand.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          `The site is hosted by ${COMPANY.host}. Technical logs generated by the host may contain IP addresses, for security and service reliability.`,
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          `You have the right to access, rectify, erase, restrict and object to the processing of your data. Write to ${siteConfig.email}: requests are handled within one month.`,
          "If the answer does not satisfy you, you may refer the matter to the CNIL (cnil.fr).",
        ],
      },
    ],
  },
};

export function getLegalNotice(locale: Locale): LegalPageContent {
  return legalNotice[locale];
}

export function getPrivacyPolicy(locale: Locale): LegalPageContent {
  return privacy[locale];
}
