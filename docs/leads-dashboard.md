# Leads dashboard

Every Request-a-Quote submission on the website is written to a Google Sheet,
and the owner dashboard at **`/admin/leads`** reads from that sheet. The sheet
is the source of truth: edit it by hand or from the dashboard, both are fine.

## How a lead flows

1. A buyer fills the quote form and presses **Send on WhatsApp** or **Send by email**.
2. Before the handoff, the browser posts the form to `POST /api/leads`, which
   validates it (same rules as the form, plus the honeypot) and appends a row
   to the **Leads** tab. The buyer is then taken to WhatsApp / their mail app
   exactly as before — a sheet failure never blocks them.
3. Taps on the **Call us** / **WhatsApp** buttons in the header and the mobile
   bar are logged to a **Clicks** tab, so you can see enquiry volume even when
   nobody fills the form.
4. `/admin/leads` shows today / week / month counts, how many leads are still
   *New*, a product and pipeline breakdown, filters, and one-tap call /
   WhatsApp / email actions per lead. Changing a lead's status or internal
   notes writes straight back to the sheet.

Pipeline statuses: **New → Contacted → Quoted → Won / Lost**.

## One-time setup (about 5 minutes)

The website never talks to Google directly. A small script that lives inside
your spreadsheet (Google Apps Script) receives the leads and writes them in,
running as your own Google account. No Google Cloud project, no API keys.

### 1. Create the sheet

Create a new Google Sheet, e.g. "JSS website leads". Leave it empty — the
`Leads` and `Clicks` tabs and their header rows are created automatically.

### 2. Add the script

1. In the sheet: **Extensions → Apps Script**. A code editor opens.
2. Delete the placeholder code and paste the whole of
   [`docs/leads-apps-script.gs`](leads-apps-script.gs).
3. On the `const SECRET = "…"` line, replace the text with a long random
   string (a password-manager generated one is ideal). Keep a copy.
4. Save (⌘S / Ctrl+S).

### 3. Deploy it as a web app

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**. ("Anyone" only
   means the URL is reachable; the script ignores any request without your
   secret.)
4. **Deploy**. Google will ask you to authorise the script for your sheet —
   approve it. (If it warns the app is unverified, choose *Advanced → Go to
   … (unsafe)*; it is your own script.)
5. Copy the **Web app URL** (ends in `/exec`).

Paste that URL into a browser tab: it should show
`{"ok":true,"data":"JSS leads endpoint is live…"}`.

### 4. Set the environment variables

In Vercel: **Project → Settings → Environment Variables** (Production and
Preview). Locally: a `.env.local` file (already git-ignored).

| Variable | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A long, random password for the dashboard. |
| `LEADS_SCRIPT_URL` | The web app URL from step 3. |
| `LEADS_SCRIPT_SECRET` | The same string you put in `SECRET`. |
| `LEADS_SHEET_URL` | *(optional)* the sheet's normal URL, for the "Open Google Sheet" button. |

Redeploy after saving. Then open `https://<your-domain>/admin/leads`, log in,
and submit a test enquiry from `/request-a-quote` — it should appear within a
few seconds, and as a new row in the sheet.

**Editing the script later?** Apps Script keeps serving the old version until
you go to **Deploy → Manage deployments → ✎ → Version: New version → Deploy**.
The URL stays the same.

## Day to day

- Bookmark `/admin/leads` on your phone. The login lasts 30 days.
- The **Awaiting contact** tile is the one to keep at zero: it counts leads
  still marked *New*.
- Tap a lead to expand it, change its status from the dropdown, and keep
  follow-up notes in **Internal notes** — they save to the sheet's last column.
- Anything you do directly in the sheet (sorting, editing a phone number,
  changing a status) shows up on the dashboard on the next reload. Just keep
  the column order as it is and never edit the **ID** column — that is how the
  dashboard finds a row.

## Security notes

- `/admin` and `/api` are excluded from search engines and the dashboard is
  `noindex`.
- The session cookie is an HMAC keyed by the password; it never contains the
  password. Changing `ADMIN_PASSWORD` in Vercel invalidates all sessions.
- The Apps Script URL is public by necessity, but every request must carry
  the shared secret; the script answers "Unauthorized" to anything else and
  never exposes the secret. Rotate it by changing `SECRET` in the script,
  re-deploying, and updating `LEADS_SCRIPT_SECRET`.
- `POST /api/leads` only accepts same-origin requests, enforces the form's
  validation and honeypot, and caps field length. It always answers `204` to
  the browser so a failure can never be detected or exploited from outside;
  failures are logged in Vercel's function logs under `[leads]`.
- Lead data lives only in your Google Sheet. Nothing is stored on Vercel.
- Apps Script's free quota is roughly 20,000 requests a day; a dashboard
  load is two, a lead is one.
