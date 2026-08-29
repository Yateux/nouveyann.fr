import type { Service } from "@/data/expertise";
import { services } from "@/data/expertise";

const copy: Record<string, { title: string; description: string }> = {
  "Sites web": {
    title: "Websites",
    description:
      "Show what you do, get found, earn trust from the first visit.",
  },
  "E-commerce": {
    title: "E-commerce",
    description: "Sell online, with a store you administer yourself.",
  },
  "Applications web": {
    title: "Web apps",
    description: "Internal tools, platforms, services built to measure.",
  },
  "Applications mobiles": {
    title: "Mobile apps",
    description: "iOS and Android, notifications included, one codebase.",
  },
  Refonte: {
    title: "Redesign",
    description:
      "Bring an existing site up to date: its image, its speed, its experience.",
  },
  Maintenance: {
    title: "Maintenance",
    description: "Updates, fixes and new features once the site is live.",
  },
};

export const servicesEn: Service[] = services.map((service) => ({
  ...service,
  ...(copy[service.title] ?? {}),
}));

export function untranslatedServices(): string[] {
  return services.filter((s) => !copy[s.title]).map((s) => s.title);
}
