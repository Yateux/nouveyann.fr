const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

const INVISIBLE = new RegExp(
  "[\\u0000-\\u0020\\u007F-\\u00A0\\u1680\\u2000-\\u200D\\u2028\\u2029\\u202A-\\u202E\\u205F\\u2060\\u3000\\uFEFF]",
  "g",
);

export function safeUrl(raw: string | null | undefined): string | null {
  if (typeof raw !== "string") return null;

  const value = raw.replace(INVISIBLE, "");
  if (value.length === 0) return null;

  if (value.startsWith("#")) return value;
  if (value.startsWith("/")) {
    return /^\/[/\\]/.test(value) ? null : value;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  return ALLOWED_PROTOCOLS.has(url.protocol) ? url.toString() : null;
}

export function isExternal(href: string): boolean {
  return /^(https?|mailto|tel):/i.test(href);
}
