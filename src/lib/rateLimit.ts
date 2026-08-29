const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5_000;

const hits = new Map<string, number[]>();

type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

export function rateLimit(
  key: string,
  now: number = Date.now(),
): RateLimitResult {
  if (hits.size > MAX_TRACKED_KEYS) purge(now);

  const recent = (hits.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, retryAfter: 0 };
}

function purge(now: number): void {
  for (const [key, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}

export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip && ip.length > 0 ? ip : (headers.get("x-real-ip") ?? "inconnu");
}
