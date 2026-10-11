import { z } from "zod";
import { getDictionary } from "@/i18n/dictionaries";

export type ContactMessages = {
  name: string;
  nameLong: string;
  email: string;
  emailLong: string;
  message: string;
  messageLong: string;
  consent: string;
};

/** The form's rules, with the error messages of the page's language. */
export function createContactSchema(messages: ContactMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.name).max(80, messages.nameLong),
    email: z
      .string()
      .trim()
      .max(160, messages.emailLong)
      .pipe(z.email(messages.email)),
    message: z
      .string()
      .trim()
      .min(20, messages.message)
      .max(4000, messages.messageLong),
    consent: z.literal(true, { message: messages.consent }),
    website: z.string().max(500).optional(),
  });
}

// The server checks the same rules; its own replies stay in French.
export const contactSchema = createContactSchema(
  getDictionary("fr").contact.errors,
);

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
