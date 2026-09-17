import { NextResponse } from "next/server";
import { isLeadStatus, type LeadStatus } from "@/lib/leads";
import { updateLead } from "@/lib/leads-store";

export const runtime = "nodejs";

/** Status / internal-notes edits from the dashboard. Auth is enforced by middleware. */
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  let body: { status?: unknown; internalNotes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const patch: { status?: LeadStatus; internalNotes?: string } = {};
  if (body.status !== undefined) {
    if (!isLeadStatus(body.status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
    patch.status = body.status;
  }
  if (body.internalNotes !== undefined) {
    if (typeof body.internalNotes !== "string")
      return NextResponse.json({ error: "Bad notes" }, { status: 400 });
    patch.internalNotes = body.internalNotes.slice(0, 4000);
  }

  try {
    const lead = await updateLead(id, patch);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(lead);
  } catch (err) {
    console.error("[admin/leads] update failed", err);
    return NextResponse.json({ error: "Could not write to the sheet" }, { status: 502 });
  }
}
