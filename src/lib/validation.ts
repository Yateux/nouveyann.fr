import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom.")
    .max(80, "Ce nom est trop long."),
  email: z
    .string()
    .trim()
    .max(160, "Cette adresse est trop longue.")
    .pipe(z.email("Cette adresse e-mail semble incorrecte.")),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre projet en quelques mots (20 caractères minimum).")
    .max(4000, "Ce message est trop long (4000 caractères maximum)."),
  consent: z.literal(true, {
    message: "Merci de cocher cette case pour envoyer votre message.",
  }),
  website: z.string().max(500).optional(),
});

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
  website: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export function fieldErrorsFrom(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof ContactFormValues] = issue.message;
    }
  }
  return errors;
}
