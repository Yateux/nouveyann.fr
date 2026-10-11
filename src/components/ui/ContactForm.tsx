"use client";

import { defaultLocale, path, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { trackEvent } from "@/lib/analytics";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ContactFieldErrors, ContactFormValues } from "@/lib/validation";
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

// The validator is the heaviest script of the site and only this form needs
// it: it is fetched when the visitor starts typing, not with every page that
// links to the contact page.
const loadValidation = () => import("@/lib/validation");

const FIELD_CLASS =
  "w-full rounded-card border bg-transparent p-3.5 text-body-md text-ink " +
  "placeholder:text-ink-muted/75 transition-colors duration-150 " +
  "focus:border-ink";

const LABEL_CLASS = "block text-[0.9rem] font-semibold";

export function ContactForm({
  locale = defaultLocale,
}: { locale?: Locale } = {}) {
  const t = getDictionary(locale).contact;
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const started = useRef(false);

  const update = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => {
    if (!started.current) {
      started.current = true;
      trackEvent("contact_form_start");
      void loadValidation();
    }
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const { createContactSchema, fieldErrorsFrom } = await loadValidation();
    const parsed = createContactSchema(t.errors).safeParse(values);
    if (!parsed.success) {
      const fieldErrors = fieldErrorsFrom(parsed.error);
      setErrors(fieldErrors);
      setStatus("idle");
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) {
        trackEvent("contact_form_invalid", { field: firstKey });
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
        trackEvent("contact_form_failed");
        setStatus("error");
        // The server answers in French: other languages get their own
        // wording of the same thing.
        setServerMessage(
          locale === "fr" ? message || t.genericError : t.genericError,
        );
        return;
      }

      trackEvent("contact_form_submit", { locale });
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      trackEvent("contact_form_failed");
      setStatus("error");
      setServerMessage(t.genericError);
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="in flex flex-col items-start gap-3.5 rounded-card border border-line-strong p-[clamp(24px,4vw,40px)]"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft">
          <Check aria-hidden="true" className="h-5 w-5 text-ink" />
        </div>
        <h3 className="text-[1.6rem] leading-[1.2] font-semibold">
          {t.successTitle}
        </h3>
        <p className="text-ink-muted">{t.successText}</p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStatus("idle")}
        >
          {t.writeAnother}
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="flex flex-col gap-[18px]">
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
          <label htmlFor="message" className={LABEL_CLASS}>
            {t.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder={t.messagePlaceholder}
            className={cn(
              FIELD_CLASS,
              "mt-2 resize-y",
              errors.message ? "border-danger" : "border-line-strong",
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
              required
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 accent-ink"
            />
            <span className="text-[0.9rem] text-ink-muted">
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
            className="rounded-card border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger"
          >
            {serverMessage} {t.errorFallback}{" "}
            <a href={emailHref} className="link-underline font-medium">
              {siteConfig.email}
            </a>
            .
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
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
          <p className="text-ink-muted">{t.replyHint}</p>
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
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          FIELD_CLASS,
          "mt-2",
          error ? "border-danger" : "border-line-strong",
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
