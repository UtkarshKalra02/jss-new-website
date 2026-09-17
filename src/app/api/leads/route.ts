import { NextResponse } from "next/server";
import { validate, emptyFields, type Fields } from "@/lib/rfq";
import { leadFromFields } from "@/lib/leads";
import { recordClick, saveLead } from "@/lib/leads-store";
import { sheetsConfigured } from "@/lib/leads-sheet";

export const runtime = "nodejs";

/**
 * Lead capture. The RFQ form posts here *before* it hands the visitor off to
 * WhatsApp or their mail client, so the enquiry is on record even if the buyer
 * never actually presses send in the other app.
 *
 * Always answers 204 to the browser on a well-formed request — a failure to
 * write the sheet is logged server-side and must never block the handoff.
 */

type LeadBody = {
  kind: "lead";
  fields: Partial<Fields>;
  channel: "whatsapp" | "email";
  sourcePage?: string;
};
type ClickBody = { kind: "click"; channel: "call" | "whatsapp"; page?: string };

const MAX_LEN = 4000;

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // keepalive / sendBeacon-style posts may omit it
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clip(v: unknown) {
  return typeof v === "string" ? v.slice(0, MAX_LEN) : "";
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });

  let body: LeadBody | ClickBody;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!sheetsConfigured()) {
    console.warn("[leads] Google Sheet not configured; enquiry not recorded");
    return new NextResponse(null, { status: 204 });
  }

  try {
    if (body.kind === "click") {
      if (body.channel !== "call" && body.channel !== "whatsapp")
        return new NextResponse(null, { status: 400 });
      await recordClick(body.channel, clip(body.page).slice(0, 200));
      return new NextResponse(null, { status: 204 });
    }

    if (body.kind !== "lead") return new NextResponse(null, { status: 400 });
    if (body.channel !== "whatsapp" && body.channel !== "email")
      return new NextResponse(null, { status: 400 });

    const fields: Fields = { ...emptyFields };
    for (const key of Object.keys(emptyFields) as (keyof Fields)[]) {
      fields[key] = clip(body.fields?.[key]);
    }

    // Same rules as the form itself, plus the honeypot. A bot that skips the
    // page and posts straight here still has to produce a valid enquiry.
    if (fields.website) return new NextResponse(null, { status: 204 });
    if (Object.keys(validate(fields)).length > 0)
      return new NextResponse(null, { status: 422 });

    await saveLead(
      leadFromFields(fields, {
        channel: body.channel,
        sourcePage: clip(body.sourcePage).slice(0, 200),
      })
    );
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[leads] failed to record", err);
    return new NextResponse(null, { status: 204 });
  }
}
