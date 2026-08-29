import { siteConfig } from "@/data/site";
import { safeUrl } from "@/lib/safeUrl";

function requireSafe(raw: string, label: string): string {
  const safe = safeUrl(raw);
  if (!safe) {
    throw new Error(`Adresse refusée pour « ${label} » : ${raw}`);
  }
  return safe;
}

export const emailHref = requireSafe(`mailto:${siteConfig.email}`, "e-mail");
export const calendlyHref = requireSafe(siteConfig.calendly, "Calendly");
