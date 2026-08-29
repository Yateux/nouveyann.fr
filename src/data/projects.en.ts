import type { Project, ProjectCategory } from "@/data/projects";

export type ProjectCopy = {
  sector?: string;
  tagline: string;
  study: Project["study"];
};

export const categoriesEn: Record<
  ProjectCategory,
  { label: string; plural: string }
> = {
  site: { label: "Website", plural: "Websites" },
  ecommerce: { label: "E-commerce", plural: "E-commerce" },
  "app-web": { label: "Web app", plural: "Web apps" },
  "app-mobile": { label: "Mobile app", plural: "Mobile apps" },
};

export const projectsEn: Record<string, ProjectCopy> = {
  "visit-al-haramain": {
    sector: "Travel and pilgrimage",
    tagline:
      "A platform to plan and book a pilgrimage, from picking a trip to sending the application.",
    study: {
      need: "Organising a pilgrimage means comparing trips, dates, accommodation and services that change often. Everything went through phone calls and messaging: scattered information, the same answers repeated, no way to follow up.",
      solution:
        "A full platform: trip catalogue, detailed pages, online applications, and an admin area to keep offers current without going through a developer.",
      design:
        "A trip like this is a serious commitment, so every page works to reassure. The details that decide the booking sit above the fold: dates, accommodation, what is included. The whole flow was drawn for the phone first, because that is where most visitors are.",
      development:
        "Next.js for rendering speed and search visibility, Firebase for authentication and data, Stripe for payment. Content is editable from the admin: adding a trip takes no technical work.",
      result:
        "Visitors find what they need without calling, and applications arrive already qualified: which trip, which dates, how many people. The team runs its own catalogue.",
    },
  },
  wooskill: {
    sector: "Marketplace",
    tagline:
      "A marketplace connecting teachers and students, booking and payment included.",
    study: {
      need: "Two audiences on the same platform, with opposite expectations. Someone offering lessons needs to publish and manage their availability; someone looking for one needs to find, compare and book without friction.",
      solution:
        "A complete marketplace: profile creation, listings, search, booking, online payment and a personal area for each side.",
      design:
        "Two audiences, two logics, one interface. The buyer's path had to stay very short; the seller needed a dashboard they could read. Search was treated as the most important page on the site, not as a utility.",
      development:
        "Next.js on the front, a Symfony API for the business logic, PostgreSQL and MongoDB for the data. The v2 to v3 migration ran without downtime, with deployment and infrastructure taken over along the way.",
      result:
        "A platform where both sides do their job on their own, and a codebase a team can keep working on.",
    },
  },
  "loumari-parfum": {
    sector: "Perfumery",
    tagline:
      "The online shop of a perfume house, selling the way the counter would.",
    study: {
      need: "Selling perfume online raises one obvious problem: you cannot smell it. Everything that triggers the purchase has to come through images, wording and how the product is staged.",
      solution:
        "A WooCommerce shop where the product page does a salesperson's job: large visuals, the notes, the size, the delivery terms. The checkout is short and free of distraction.",
      design:
        "A lot of white, few elements, images at full width. The brand had to feel cared for without tipping into fake luxury. Collection pages stay plain so the bottle is what you look at.",
      development:
        "WooCommerce underneath: catalogue, stock and orders are handled from the admin. Elementor on top, so campaign pages get built without me.",
      result:
        "A shop that runs itself: new products, promotions and seasonal pages are handled in house, with no technical help.",
    },
  },
  "janaza-jamaa": {
    sector: "Community app",
    tagline:
      "An app that reaches a whole community at once: one announcement published, a notification on every phone.",
    study: {
      need: "Information that has to travel fast through a group of people, without depending on message chains that get lost or only reach part of the people concerned.",
      solution:
        "A mobile app with announcements and push notifications: the information goes out once and lands on every phone, immediately.",
      design:
        "The app gets opened in a hurry, often one-handed. Large type, strong contrast, and nothing between opening the app and the information being looked for.",
      development:
        "React Native for iOS and Android, a NestJS API backed by PostgreSQL and Redis. Geolocation finds announcements within a given radius, and push notifications fire as soon as one is published.",
      result:
        "Delivery that is immediate and reliable, and an admin simple enough for the people who publish.",
    },
  },
  "fine-art-numismatics": {
    sector: "Numismatics, collectible coins",
    tagline: "A coin shop where every item exists in a single copy.",
    study: {
      need: "Selling collectible coins is nothing like retail: each item exists once, has to be described precisely, and is aimed at demanding buyers who compare before buying.",
      solution:
        "A WooCommerce shop shaped around the one-off item: detailed pages, large photography, structured attributes, and a catalogue that stays navigable as it grows.",
      design:
        "Complete restraint: nothing should pull attention away from the coin. The layout lets the photograph take the space and lists attributes in a constant order, so two coins can be compared at a glance.",
      development:
        "WooCommerce, but organised for the unique item rather than for restocking: a sold coin leaves the catalogue without leaving a dead page behind.",
      result:
        "A catalogue that holds up in front of knowledgeable buyers, and a new coin that goes live in minutes.",
    },
  },
  "art-french-touch": {
    sector: "Art gallery",
    tagline: "An online gallery where works are hung, not listed.",
    study: {
      need: "A gallery needs to show before it sells. The site had to give the works the room they get in an exhibition space, while still allowing a purchase.",
      solution:
        "A gallery-first site: works are staged, grouped by collection, and buyable without the shop taking over the presentation.",
      design:
        "Wide margins, a neutral background, no colour competing with the works. Image ratios are respected rather than force-cropped.",
      development:
        "Templates framed up front: adding a work or a collection always follows the same structure, and the layout does not drift as items pile up.",
      result:
        "A showcase worthy of the works on display, kept alive by the gallery itself.",
    },
  },
  "eveil-oriental": {
    tagline: "A complete shop: catalogue, cart, payment and order management.",
    study: {
      need: "Moving from selling in person to a self-sufficient online shop, able to handle the catalogue, stock, orders and shipping day to day.",
      solution:
        "A PrestaShop store configured end to end: categories, product pages, carriers, payment methods, order emails.",
      design:
        "A checkout with no surprises. The catalogue stays readable on a phone, and the order flow was shortened as much as the platform allows: every extra step is a lost order.",
      development:
        "PrestaShop for its native management features: stock, orders, carriers and invoicing are covered without stacking up extensions.",
      result:
        "A shop its owner administers alone, from the catalogue through to shipping.",
    },
  },
  "meteo-express": {
    sector: "Media, weather forecasts",
    tagline:
      "Bringing a weather forecast site followed across the French-speaking world back into shape.",
    study: {
      need: "A site online since 2008, funded entirely by advertising and donations. Display bugs had piled up, modules stopped working after updates, and every fault cost visitors.",
      solution:
        "A full audit, then the fixes: forecast pages, interactive maps, observation sections, everything that misbehaved on screen or under the hood.",
      design:
        "No visual redesign: habit is an asset here. The work targeted what got in the way of reading, without moving the landmarks the audience has known for years.",
      development:
        "WordPress and Elementor, the stack already in place. Building on what existed rather than rewriting: less risk, and a site the same team can still administer.",
      result:
        "A site working again for its users, alongside the iOS and Android apps of the same service.",
    },
  },
  "slk-pressing": {
    sector: "Dry cleaning",
    tagline:
      "A neighbourhood dry cleaner's site: services, opening hours, address, phone number.",
    study: {
      need: "A local business people look up on their phone, often from the street, with three questions: are you open, where are you, and do you do the thing I need.",
      solution:
        "A site that answers those three questions on the first screen, with the services detailed just below and the phone number always in reach.",
      design:
        "Mobile drove every decision. Calling and seeing the address take one tap, with no zooming or scrolling. The layout stays sharp and the wording is the customers', not the trade's.",
      development:
        "A deliberately light WordPress. Hours, services and prices change from the admin, in two minutes, without going through me.",
      result:
        "A business that shows up in local searches, with a site that answers instead of the phone when the shop is closed.",
    },
  },
  "cabinet-infirmier-ozoir": {
    sector: "Healthcare, nursing",
    tagline:
      "A nursing practice's site: treatments offered, area covered, contact details.",
    study: {
      need: "Patients and their families look for precise information, sometimes at a hard moment: which treatments are provided, in which town, and how to reach the practice quickly.",
      solution:
        "A clear, reassuring site: treatments listed without jargon, the area covered stated plainly, contact details on every page.",
      design:
        "A calm tone, comfortable contrast and generous type: the site is also read by older people, on small screens. No animation that gets in the way of reading.",
      development:
        "The structure is cut back to the strict minimum: when the team grows or a treatment changes, the edit fits on one admin page.",
      result:
        "A professional presence online that earns trust before the first phone call.",
    },
  },
  demrea: {
    tagline:
      "A site that presents the business and makes people want to pick up the phone.",
    study: {
      need: "A business known to its customers but invisible online: no page to send a prospect, nothing coming up in a search for the name.",
      solution:
        "Three answers, one page each: what the company does, who for, and how to reach it. Nothing stacked beyond that.",
      design:
        "A clean, sober frame, an obvious hierarchy, and a call to action visible at every step. The site has to be skimmed without losing anything.",
      development:
        "Every page sits on a template. Content is edited in house without the layout drifting six months later.",
      result:
        "An address to hand out, a site that answers the usual questions and gives the client time to prepare their request.",
    },
  },
  senshouse: {
    tagline: "A presentation site, built to stay easy to run.",
    study: {
      need: "Having a polished online presence that holds up over time without technical skill, and without depending on someone for the smallest change.",
      solution:
        "Organised content, and above all an admin the client knows how to use when we part ways.",
      design:
        "An airy layout that puts the essentials forward and leaves room for images. Reusable components, so pages added later stay consistent with the first ones.",
      development:
        "Templates prepared up front, then a hand-over done out loud on delivery day. A manual sent by email does not get read.",
      result:
        "A site its owner keeps evolving without coming back to a developer.",
    },
  },
};
