"use client";

import { track } from "@vercel/analytics";

/**
 * Every event the site sends, in one place.
 *
 * Payloads carry only what the visitor did, never what they typed. Sending a
 * name, an email or a message body would turn anonymous measurement into
 * personal data: consent banner required, and against Vercel's terms.
 */
type Events = {
  contact_form_start: Record<string, never>;
  contact_form_submit: { locale: string };
  contact_form_invalid: { field: string };
  contact_form_failed: Record<string, never>;
  booking_click: { from: string };
  email_click: { from: string };
  project_open: { slug: string };
  live_site_click: { slug: string };
  language_switch: { to: string };
};

export type EventName = keyof Events;

/** Variante non générique, pour les composants qui reçoivent le nom en prop. */
export function trackNamed(
  name: EventName,
  payload?: Record<string, string>,
): void {
  try {
    track(name, payload);
  } catch {
    // La mesure ne doit jamais casser une interaction.
  }
}

export function trackEvent<K extends keyof Events>(
  name: K,
  ...payload: Events[K] extends Record<string, never> ? [] : [Events[K]]
): void {
  try {
    track(name, payload[0]);
  } catch {
    // La mesure ne doit jamais casser une interaction.
  }
}
