import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LeadCard } from "@/components/admin/LeadCard";
import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { sheetsConfigured } from "@/lib/leads-sheet";
import {
  LEAD_STATUSES,
  computeStats,
  filterLeads,
  sortNewestFirst,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";
import { listClicks, listLeads } from "@/lib/leads-store";
import { products } from "@/content/products";

export const dynamic = "force-dynamic";

async function logout() {
  "use server";
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

function StatTile({
  label,
  value,
  hint,
  emphasis = false,
  className = "",
}: {
  label: string;
  value: number | string;
  hint?: string;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-sm border p-4 sm:p-5 ${className} ${
        emphasis
          ? "border-accent-500/40 bg-accent-050"
          : "border-paper-300 bg-paper-50"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</p>
      <p className="mt-2 font-display text-[2rem] font-semibold leading-none tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-2 text-[12px] text-ink-500">{hint}</p>}
    </div>
  );
}

/** Builds a filter URL while preserving the other active filters. */
function withParams(current: Record<string, string>, patch: Record<string, string | null>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...current, ...patch })) if (v) p.set(k, v);
  const s = p.toString();
  return s ? `/admin/leads?${s}` : "/admin/leads";
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; product?: string; q?: string }>;
}) {
  const params = await searchParams;
  const current = { status: params.status ?? "", product: params.product ?? "", q: params.q ?? "" };

  let leads: Lead[] = [];
  let clicksThisWeek = 0;
  let loadError: string | null = null;
  const configured = sheetsConfigured();

  if (configured) {
    try {
      leads = sortNewestFirst(await listLeads());
    } catch (err) {
      console.error("[admin/leads] could not read sheet", err);
      loadError =
        "Could not reach the leads script. Check LEADS_SCRIPT_URL and LEADS_SCRIPT_SECRET, and that the Apps Script deployment is set to Anyone — details in Vercel function logs.";
    }
    try {
      const weekAgo = Date.now() - 7 * 86_400_000;
      clicksThisWeek = (await listClicks()).filter((c) => Date.parse(c.at) >= weekAgo).length;
    } catch {
      /* The Clicks tab is optional; a missing tab just shows zero. */
    }
  }

  const stats = computeStats(leads);
  const shown = filterLeads(leads, current);
  const productOptions = Array.from(
    new Set([...products.map((p) => p.name), ...leads.map((l) => l.productType)].filter(Boolean))
  );
  const sheetUrl = process.env.LEADS_SHEET_URL || null;
  const filtering = Boolean(current.status || current.product || current.q);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
            JSS The Print Zone · Owner dashboard
          </p>
          <h1 className="mt-2 font-display text-[2rem] font-semibold leading-tight sm:text-4xl">
            Website leads
          </h1>
        </div>
        <div className="flex items-center gap-3 text-[14px]">
          {sheetUrl && (
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-ink-900/25 px-4 py-2 font-medium text-ink-900 hover:border-ink-900"
            >
              Open Google Sheet
            </a>
          )}
          <form action={logout}>
            <button type="submit" className="px-2 py-2 text-ink-600 underline-offset-4 hover:underline">
              Log out
            </button>
          </form>
        </div>
      </header>

      {!configured && (
        <div className="mt-8 rounded-sm border border-danger-500/40 bg-danger-050 px-5 py-4 text-[14px] leading-relaxed text-ink-800">
          The Google Sheet connection is not configured, so leads from the website are not
          being recorded yet. Set <code className="font-mono">LEADS_SCRIPT_URL</code> and{" "}
          <code className="font-mono">LEADS_SCRIPT_SECRET</code> — steps in{" "}
          <code className="font-mono">docs/leads-dashboard.md</code>.
        </div>
      )}
      {loadError && (
        <div className="mt-8 rounded-sm border border-danger-500/40 bg-danger-050 px-5 py-4 text-[14px] leading-relaxed text-ink-800">
          {loadError}
        </div>
      )}

      {/* ── Numbers ─────────────────────────────────────────────────── */}
      <section aria-label="Summary" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatTile
          label="Awaiting contact"
          value={stats.awaitingContact}
          emphasis={stats.awaitingContact > 0}
          hint={stats.awaitingContact > 0 ? "Marked New — reply within 24h" : "All caught up"}
        />
        <StatTile label="Today" value={stats.today} />
        <StatTile label="This week" value={stats.thisWeek} hint="Since Monday" />
        <StatTile label="This month" value={stats.thisMonth} />
        <StatTile
          label="Call / WhatsApp taps"
          value={clicksThisWeek}
          hint="Last 7 days, site-wide"
          className="col-span-2 sm:col-span-1"
        />
      </section>

      {/* ── Pipeline + product mix ───────────────────────────────────── */}
      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border border-paper-300 bg-paper-50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            Pipeline · {stats.total} lead{stats.total === 1 ? "" : "s"} total
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LEAD_STATUSES.map((s: LeadStatus) => {
              const active = current.status === s;
              return (
                <li key={s}>
                  <Link
                    href={withParams(current, { status: active ? null : s })}
                    className={`inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-[13px] font-medium ${
                      active
                        ? "border-ink-900 bg-ink-900 text-paper-100"
                        : "border-ink-900/20 text-ink-800 hover:border-ink-900"
                    }`}
                  >
                    {s}
                    <span className="font-mono tabular-nums opacity-70">{stats.byStatus[s]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[12px] text-ink-500">
            Sent via WhatsApp {stats.byChannel.whatsapp} · via email {stats.byChannel.email}
          </p>
        </div>

        <div className="rounded-sm border border-paper-300 bg-paper-50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            By product
          </p>
          {stats.byProduct.length === 0 ? (
            <p className="mt-4 text-[14px] text-ink-500">No leads yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {stats.byProduct.slice(0, 6).map((p) => {
                const pct = Math.round((p.count / Math.max(1, stats.total)) * 100);
                const active = current.product === p.label;
                return (
                  <li key={p.label}>
                    <Link
                      href={withParams(current, { product: active ? null : p.label })}
                      className="group grid grid-cols-[1fr_auto] items-center gap-3 text-[13px]"
                    >
                      <span className={active ? "font-semibold" : "text-ink-800 group-hover:underline"}>
                        {p.label}
                      </span>
                      <span className="font-mono tabular-nums text-ink-500">{p.count}</span>
                      <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-paper-300">
                        <span
                          className="block h-full rounded-full bg-accent-500"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ── Filters ─────────────────────────────────────────────────── */}
      <form
        method="get"
        className="mt-10 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end"
        role="search"
      >
        <div>
          <label htmlFor="q" className="sr-only">
            Search leads
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={current.q}
            placeholder="Search name, company, phone, email…"
            className="w-full rounded-sm border border-ink-900/25 bg-paper-50 px-4 py-2.5 text-[15px] outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/25"
          />
        </div>
        <div>
          <label htmlFor="product" className="sr-only">
            Product
          </label>
          <select
            id="product"
            name="product"
            defaultValue={current.product}
            className="w-full rounded-sm border border-ink-900/25 bg-paper-50 px-3 py-2.5 text-[14px]"
          >
            <option value="">All products</option>
            {productOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={current.status}
            className="w-full rounded-sm border border-ink-900/25 bg-paper-50 px-3 py-2.5 text-[14px]"
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-sm bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-paper-100"
          >
            Filter
          </button>
          {filtering && (
            <Link
              href="/admin/leads"
              className="rounded-sm border border-ink-900/25 px-4 py-2.5 text-[14px] text-ink-800"
            >
              Clear
            </Link>
          )}
        </div>
      </form>

      {/* ── List ────────────────────────────────────────────────────── */}
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
        {shown.length} of {leads.length} lead{leads.length === 1 ? "" : "s"}
        {filtering ? " · filtered" : " · newest first"}
      </p>
      {shown.length === 0 ? (
        <p className="mt-4 rounded-sm border border-dashed border-paper-400 px-5 py-10 text-center text-[14px] text-ink-500">
          {leads.length === 0
            ? "No leads recorded yet. Each Request-a-Quote submission will appear here."
            : "Nothing matches these filters."}
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {shown.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      )}
    </div>
  );
}
