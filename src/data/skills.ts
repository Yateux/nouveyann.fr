import type { Locale } from "@/i18n/config";

export type SkillGroup = { title: string; text: string };

const groups: Record<Locale, SkillGroup[]> = {
  fr: [
    {
      title: "Frontend",
      text: "JavaScript et TypeScript, React et Next.js au quotidien, Vue quand le projet le demande. Tailwind, styled-components ou Ant Design pour l’habillage, Redux et RTK Query, redux-saga ou TanStack Query pour l’état et les données, React Admin pour les back-offices. Chez Wooskill j’ai conçu le design system en atomic design, un form builder maison et la messagerie en temps réel.",
    },
    {
      title: "Backend et API",
      text: "Node.js avec Fastify ou NestJS, PHP et Symfony avec API Platform, des API REST documentées sous Swagger. J’ai aussi travaillé en Java Spring Boot et en Python à la Société Générale, sur un référentiel de flux qui servait une équipe de vingt-cinq personnes.",
    },
    {
      title: "Données",
      text: "PostgreSQL, MySQL et MariaDB pour le relationnel, Redis pour le cache et les files, Elasticsearch quand la recherche devient le cœur du produit. Le choix se fait selon la nature des données, pas par habitude.",
    },
    {
      title: "Infrastructure et mise en production",
      text: "Docker, Linux, AWS et OVH, avec des chaînes d’intégration continue sous GitLab CI ou CircleCI. J’ai repris toute la partie ops de Wooskill en même temps que le développement, monitoring et déploiement compris, et je conçois des architectures en microservices.",
    },
    {
      title: "Intégrations",
      text: "Stripe pour le paiement, Algolia pour la recherche, Socket.io et Mercure pour le temps réel, Twilio et Vonage pour la voix et le SMS, Sendinblue pour l’e-mail, et les API Google. Ce sont des briques posées en production, pas des lignes sur un CV.",
    },
    {
      title: "Renfort d’équipe",
      text: "J’interviens seul sur un produit, en renfort d’une équipe en place, ou aux côtés d’un Lead Dev ou d’un CTO pour prendre du recul sur l’architecture et l’organisation du code. Chez Wooskill je gérais le planning de cinq personnes, les revues de code et les bonnes pratiques Git.",
    },
    {
      title: "Transmission",
      text: "J’ai enseigné le JavaScript, le PHP, le SQL et la modélisation de bases de données à l’ESGI, ainsi que chez ANDN Services pour l’IEF2I et l’Efrei. Ça se voit dans la façon dont je livre : une prise en main de vive voix plutôt qu’un manuel que personne n’ouvre.",
    },
  ],
  en: [
    {
      title: "Frontend",
      text: "JavaScript and TypeScript, React and Next.js day to day, Vue when the project calls for it. Tailwind, styled-components or Ant Design for the interface layer, Redux and RTK Query, redux-saga or TanStack Query for state and data fetching, React Admin for back offices. At Wooskill I built the atomic design system, an in-house form builder and the realtime messaging.",
    },
    {
      title: "Backend and APIs",
      text: "Node.js with Fastify or NestJS, PHP and Symfony with API Platform, REST APIs documented in Swagger. I also worked in Java Spring Boot and Python at Société Générale, on a data-flow repository serving a team of twenty-five.",
    },
    {
      title: "Data",
      text: "PostgreSQL, MySQL and MariaDB for relational work, Redis for caching and queues, Elasticsearch when search becomes the heart of the product. The choice follows the shape of the data, not habit.",
    },
    {
      title: "Infrastructure and shipping",
      text: "Docker, Linux, AWS and OVH, with continuous integration on GitLab CI or CircleCI. I took over the whole ops side of Wooskill alongside the development work, monitoring and deployment included, and I design microservice architectures.",
    },
    {
      title: "Integrations",
      text: "Stripe for payments, Algolia for search, Socket.io and Mercure for realtime, Twilio and Vonage for voice and SMS, Sendinblue for email, and the Google APIs. These are pieces shipped to production, not lines on a CV.",
    },
    {
      title: "Joining a team",
      text: "I work alone on a product, as reinforcement for an existing team, or alongside a Lead Dev or CTO to step back on architecture and code organisation. At Wooskill I ran the schedule for five people, the code reviews and the Git practices.",
    },
    {
      title: "Teaching",
      text: "I have taught JavaScript, PHP, SQL and database modelling at ESGI, and at ANDN Services for IEF2I and Efrei. It shows in how I hand a project over: a walkthrough out loud rather than a manual nobody opens.",
    },
  ],
};

export function getSkills(locale: Locale): SkillGroup[] {
  return groups[locale];
}
