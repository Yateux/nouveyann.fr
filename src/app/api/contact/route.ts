import { NextResponse } from "next/server";
import { contactSchema, fieldErrorsFrom } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

const GENERIC_ERROR =
  "Votre message n’a pas pu être envoyé. Réessayez dans un instant.";

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

// Origin is compared against the Host header. Not nextUrl.host: that returns
// the listen address, which rejects visitors coming from the LAN IP.
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Content-Length is declarative: count the bytes actually received.
async function readBody(request: Request): Promise<string | null> {
  const body = request.body;
  if (!body) return null;

  const reader = body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } catch {
    return null;
  }
}

async function deliver(message: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? siteConfig.email;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] message reçu (aucun service d’envoi configuré)", {
        name: message.name,
        email: message.email,
      });
      return true;
    }
    console.error(
      "[contact] RESEND_API_KEY ou CONTACT_FROM manquant : message non délivré.",
    );
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.email,
        subject: `nouveyann.fr : message de ${message.name}`,
        text: `Nom : ${message.name}\nE-mail : ${message.email}\n\n${message.message}\n`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[contact] envoi refusé par le service (${response.status}) : ${detail}`,
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[contact] échec de l’envoi", error);
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json(403, { ok: false, message: GENERIC_ERROR });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json(415, { ok: false, message: GENERIC_ERROR });
  }

  const limit = rateLimit(clientKey(request.headers));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Vous avez envoyé plusieurs messages coup sur coup. Patientez quelques minutes.",
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(limit.retryAfter),
        },
      },
    );
  }

  const raw = await readBody(request);
  if (raw === null) {
    return json(413, { ok: false, message: GENERIC_ERROR });
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, message: GENERIC_ERROR });
  }

  const result = contactSchema.safeParse(parsedJson);
  if (!result.success) {
    return json(400, {
      ok: false,
      message: "Certains champs sont incomplets ou incorrects.",
      errors: fieldErrorsFrom(result.error),
    });
  }

  if (result.data.website && result.data.website.length > 0) {
    return json(200, { ok: true });
  }

  const delivered = await deliver({
    name: result.data.name,
    email: result.data.email,
    message: result.data.message,
  });

  if (!delivered) {
    return json(502, { ok: false, message: GENERIC_ERROR });
  }

  return json(200, { ok: true });
}
