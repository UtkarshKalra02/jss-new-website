import "server-only";

/**
 * Client for the Google Apps Script web app bound to the leads spreadsheet.
 *
 * The script (docs/leads-apps-script.gs) runs as the owner's own Google
 * account and is the only thing that touches the sheet. Every request is a
 * JSON POST carrying a shared secret; the script ignores anything without it,
 * because a deployed web-app URL is reachable by anyone who knows it.
 *
 * Required environment (see .env.example):
 *   LEADS_SCRIPT_URL     the web app URL from Deploy → Web app (…/exec)
 *   LEADS_SCRIPT_SECRET  the same string as SECRET at the top of the script
 */

export function sheetsConfigured() {
  return Boolean(process.env.LEADS_SCRIPT_URL && process.env.LEADS_SCRIPT_SECRET);
}

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

type Reply<T> = { ok: true; data: T } | { ok: false; error: string };

export async function script<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(env("LEADS_SCRIPT_URL"), {
    method: "POST",
    // text/plain keeps Apps Script from treating the body as a form post.
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret: env("LEADS_SCRIPT_SECRET"), action, ...payload }),
    // Apps Script answers a POST with a 302 to the actual JSON body.
    redirect: "follow",
    cache: "no-store",
  });
  const text = await res.text();

  let reply: Reply<T>;
  try {
    reply = JSON.parse(text);
  } catch {
    // An HTML page here almost always means the deployment is not set to
    // "Anyone" access, so Google served a sign-in page instead of the script.
    throw new Error(
      `Apps Script returned ${res.status} with a non-JSON body. Check the deployment's "Who has access" is "Anyone". Body starts: ${text.slice(0, 120)}`
    );
  }
  if (!reply.ok) throw new Error(`Apps Script: ${reply.error}`);
  return reply.data;
}
