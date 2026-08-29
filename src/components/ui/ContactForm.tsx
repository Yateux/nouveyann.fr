"use client";

import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  contactSchema,
  fieldErrorsFrom,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/validation";
import { emailHref } from "@/lib/links";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

const EMPTY: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  consent: false,
  website: "",
};

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "w-full border bg-surface px-4 py-3.5 text-body-md text-ink " +
  "placeholder:text-ink-subtle/70 transition-colors duration-200 " +
  "focus:border-ink focus:outline-none";

export function ContactForm({
  locale = defaultLocale,
}: { locale?: Locale } = {}) {
  const t = getDictionary(locale).contact;
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = fieldErrorsFrom(parsed.error);
      setErrors(fieldErrors);
      setStatus("idle");
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
          ?.focus();
      }
      return;
    }

    setStatus("sending");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload: unknown = await response.json().catch(() => null);
      const message =
        payload && typeof payload === "object" && "message" in payload
          ? String((payload as { message: unknown }).message)
          : "";

      if (!response.ok) {
        setStatus("error");
        setServerMessage(message || t.genericError);
        return;
      }

      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
      setServerMessage(t.genericError);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-ink/10 bg-surface p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-sand-soft">
          <Check aria-hidden="true" className="h-5 w-5 text-ink" />
        </div>
        <h3 className="mt-5 font-display text-headline-md text-ink">
          {t.successTitle}
        </h3>
        <p className="mt-3 text-ink-muted">{t.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-6 text-sm font-medium text-ink"
        >
          {t.writeAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-ink/10 bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-col gap-5">
        <Field
          label={t.fields.name}
          name="name"
          error={errors.name}
          value={values.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
        />

        <Field
          label={t.fields.email}
          name="email"
          type="email"
          error={errors.email}
          value={values.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
        />

        <div>
          <label htmlFor="message" className="mark block text-ink-muted">
            {t.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder={t.messagePlaceholder}
            className={cn(
              FIELD_CLASS,
              "mt-2 resize-y",
              errors.message ? "border-danger" : "border-ink/20",
            )}
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-sm text-danger">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="website">Ne remplissez pas ce champ</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="consent" className="flex cursor-pointer gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--color-ink)]"
            />
            <span className="text-sm leading-relaxed text-ink-muted">
              {t.fields.consent}{" "}
              <Link
                href={path("privacy", locale)}
                className="link-underline text-ink"
              >
                {getDictionary(locale).footer.privacy}
              </Link>
              .
            </span>
          </label>
          {errors.consent ? (
            <p id="consent-error" className="mt-2 text-sm text-danger">
              {errors.consent}
            </p>
          ) : null}
        </div>

        {status === "error" ? (
          <p
            role="alert"
            className="rounded-lg border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger"
          >
            {serverMessage} Vous pouvez aussi m’écrire à{" "}
            <a href={emailHref} className="link-underline font-medium">
              {siteConfig.email}
            </a>
            .
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="w-full sm:w-auto"
          >
            {status === "sending" ? (
              <>
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                {t.sending}
              </>
            ) : (
              t.submit
            )}
          </Button>
          <p className="text-sm text-ink-subtle">{t.replyHint}</p>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: "name" | "email";
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mark block text-ink-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          FIELD_CLASS,
          "mt-2",
          error ? "border-danger" : "border-ink/20",
        )}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
