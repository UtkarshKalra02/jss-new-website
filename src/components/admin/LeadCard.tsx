"use client";

import { useState, useTransition } from "react";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads";

/** Status colours: the pipeline reads at a glance without any legend. */
const statusTone: Record<LeadStatus, string> = {
  New: "bg-accent-500 text-white",
  Contacted: "bg-accent-050 text-accent-600 border border-accent-500/30",
  Quoted: "bg-ink-900 text-paper-100",
  Won: "bg-emerald-600 text-white",
  Lost: "bg-paper-300 text-ink-600",
};

const IST = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

function digitsOnly(phone: string) {
  const d = phone.replace(/\D/g, "");
  // A 10-digit Indian mobile with no country code → assume +91.
  return d.length === 10 ? `91${d}` : d.replace(/^0+/, "");
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-ink-800">{value}</dd>
    </div>
  );
}

export function LeadCard({ lead: initial }: { lead: Lead }) {
  const [lead, setLead] = useState(initial);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(initial.internalNotes);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function save(patch: { status?: LeadStatus; internalNotes?: string }) {
    const before = lead;
    setLead((l) => ({ ...l, ...patch }));
    setError(null);
    start(async () => {
      try {
        const res = await fetch(`/api/admin/leads/${encodeURIComponent(lead.id)}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error(String(res.status));
        setLead(await res.json());
      } catch {
        setLead(before);
        setError("Could not save to the sheet — try again.");
      }
    });
  }

  const received = Number.isNaN(Date.parse(lead.receivedAt))
    ? lead.receivedAt
    : IST.format(new Date(lead.receivedAt));
  const wa = lead.phone ? digitsOnly(lead.phone) : "";
  const notesDirty = notes !== lead.internalNotes;

  return (
    <li className="rounded-sm border border-paper-300 bg-paper-50">
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-start sm:p-5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="min-w-0 text-left"
        >
          <p className="font-mono text-[11px] text-ink-500">
            {received}
            <span className="mx-2 text-paper-400">·</span>
            {lead.productType || "Unspecified"}
            {lead.quantity && (
              <>
                <span className="mx-2 text-paper-400">·</span>
                {lead.quantity}
              </>
            )}
          </p>
          <p className="mt-1.5 truncate text-[16px] font-semibold leading-snug">
            {lead.companyName || "—"}
          </p>
          <p className="truncate text-[14px] text-ink-600">
            {lead.name}
            {lead.phone && <span className="text-ink-500"> · {lead.phone}</span>}
            {!lead.phone && lead.email && <span className="text-ink-500"> · {lead.email}</span>}
          </p>
          {!open && lead.requirement && (
            <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink-600">
              {lead.requirement}
            </p>
          )}
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          <label className="sr-only" htmlFor={`status-${lead.id}`}>
            Status
          </label>
          <select
            id={`status-${lead.id}`}
            value={lead.status}
            disabled={pending}
            onChange={(e) => save({ status: e.target.value as LeadStatus })}
            className={`cursor-pointer appearance-none rounded-sm px-3 py-1.5 pr-7 text-[12px] font-medium ${statusTone[lead.status]} bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='currentColor' stroke-width='1.5'%3E%3Cpath d='M3 4.5l3 3 3-3'/%3E%3C/svg%3E")] bg-[length:12px_12px] bg-[position:right_8px_center] bg-no-repeat disabled:opacity-60`}
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="flex gap-1.5">
            {lead.phone && (
              <a
                href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                title="Call"
                aria-label={`Call ${lead.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink-900/20 text-ink-800 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-100"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M2.5 4.2c0-.9.7-1.7 1.6-1.7h2c.7 0 1.3.5 1.5 1.2l.6 2.3c.2.6 0 1.3-.5 1.7l-1 .8a11 11 0 0 0 4.8 4.8l.8-1c.4-.5 1.1-.7 1.7-.5l2.3.6c.7.2 1.2.8 1.2 1.5v2c0 .9-.8 1.6-1.7 1.6A14.7 14.7 0 0 1 2.5 4.2Z" />
                </svg>
              </a>
            )}
            {wa && (
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                aria-label={`WhatsApp ${lead.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink-900/20 text-ink-800 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-100"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-6.6-5.8c-.5-.9-.5-1.7-.4-2.3.1-.5.6-1.1 1-1.3.2-.1.6-.1.8 0 .2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.2-.3.3-.1.6a8.8 8.8 0 0 0 3.6 3c.3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.2.5.4 0 .2 0 .8-.2 1.2Z" />
                </svg>
              </a>
            )}
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                title="Email"
                aria-label={`Email ${lead.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink-900/20 text-ink-800 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-100"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="15" height="11" rx="1" />
                  <path d="m3 5.5 7 5 7-5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-paper-300 px-4 pb-5 pt-4 sm:px-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail label="Requirement" value={lead.requirement} />
            <Detail label="Dimensions / specs" value={lead.dimensions} />
            <Detail label="Timeline" value={lead.timeline} />
            <Detail label="Buyer's notes" value={lead.notes} />
            <Detail label="Email" value={lead.email} />
            <Detail label="Phone" value={lead.phone} />
            <Detail label="Sent via" value={lead.channel === "email" ? "Email" : "WhatsApp"} />
            <Detail label="From page" value={lead.sourcePage} />
            <Detail label="Lead ID" value={lead.id} />
          </dl>

          <label
            htmlFor={`notes-${lead.id}`}
            className="mt-6 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500"
          >
            Internal notes
          </label>
          <textarea
            id={`notes-${lead.id}`}
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Spoke on the phone, quote sent for 10k pcs…"
            className="mt-2 w-full rounded-sm border border-ink-900/20 bg-white px-3 py-2 text-[14px] leading-relaxed outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/25"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              disabled={!notesDirty || pending}
              onClick={() => save({ internalNotes: notes })}
              className="rounded-sm bg-ink-900 px-4 py-2 text-[13px] font-medium text-paper-100 disabled:opacity-40"
            >
              {pending ? "Saving…" : "Save notes"}
            </button>
            {error && (
              <p role="alert" className="text-[13px] text-danger-600">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
