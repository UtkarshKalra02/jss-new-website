/**
 * Owner-only access to /admin.
 *
 * One shared password, set as ADMIN_PASSWORD in the environment. A successful
 * login sets an httpOnly cookie holding an HMAC of a fixed string keyed by the
 * password — so the cookie itself never contains the password, and changing
 * the password in Vercel invalidates every existing session at once.
 *
 * Web Crypto only (no node:crypto) because `verifySession` also runs inside
 * the edge middleware.
 */

export const ADMIN_COOKIE = "jss_admin";
const SESSION_MESSAGE = "jss-admin-session-v1";
/** 30 days — the owner checks this from a phone; re-logging in daily would be a nuisance. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

async function hmac(key: string, message: string) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function sessionTokenFor(password: string) {
  return hmac(password, SESSION_MESSAGE);
}

export async function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare HMACs rather than the raw strings so length leaks nothing useful.
  return timingSafeEqual(await hmac(candidate, SESSION_MESSAGE), await hmac(expected, SESSION_MESSAGE));
}

export async function verifySession(token: string | undefined) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !token) return false;
  return timingSafeEqual(token, await sessionTokenFor(expected));
}
