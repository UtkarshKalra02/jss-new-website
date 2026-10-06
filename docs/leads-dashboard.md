# Leads dashboard

Every Request-a-Quote submission on the website is written to a Google Sheet,
and the owner dashboard runs **inside that sheet's Apps Script** — Google
hosts it, at the script's own URL. Nothing lead-related is deployed on Vercel
except the tiny route that forwards the form to the script.

The sheet is the source of truth: edit it by hand or from the dashboard, both
are fine.

## How a lead flows

1. A buyer fills the quote form and presses **Send on WhatsApp** or **Send by email**.
2. Before the handoff, the browser posts the form to `POST /api/leads` on the
   website, which validates it (same rules as the form, plus the honeypot) and
   forwards it to the Apps Script with a shared secret. The script appends a
   row to the **Leads** tab. The buyer is then taken to WhatsApp / their mail
   app exactly as before — a sheet failure never blocks them.
3. Taps on the **Call us** / **WhatsApp** buttons in the header and the mobile
   bar are logged to a **Clicks** tab, so you can see enquiry volume even when
   nobody fills the form.
4. The dashboard (the script URL, password-protected) shows today / week /
   month counts, how many leads are still *New*, a product and pipeline
   breakdown, search and filters, and one-tap call / WhatsApp / email per
   lead. Changing a lead's status or internal notes writes straight back to
   the sheet.

Pipeline statuses: **New → Contacted → Quoted → Won / Lost**.

## One-time setup (about 5 minutes)

### 1. Create the sheet

Create a new Google Sheet, e.g. "JSS website leads". Leave it empty — the
`Leads` and `Clicks` tabs and their header rows are created automatically.

### 2. Add the two script files

1. In the sheet: **Extensions → Apps Script**. A code editor opens with a
   file called `Code.gs`.
2. Replace its contents with [`docs/apps-script/Code.gs`](apps-script/Code.gs).
3. Near the top, set two values:
   - `WEBSITE_SECRET` — a long random string (a password-manager generated
     one is ideal). The website will send this with every lead.
   - `DASHBOARD_PASSWORD` — what you will type to open the dashboard. Make
     it different from the first one.
4. Add the dashboard page: click **+** next to "Files" → **HTML** → name it
   exactly `Dashboard` (the editor adds `.html`). Replace its contents with
   [`docs/apps-script/Dashboard.html`](apps-script/Dashboard.html).
5. Save (⌘S / Ctrl+S).

### 3. Deploy it as a web app

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**. ("Anyone" only
   means the URL is reachable; the dashboard asks for your password and the
   capture endpoint ignores any request without the secret.)
4. **Deploy**. Google will ask you to authorise the script for your sheet —
   approve it. (If it warns the app is unverified, choose *Advanced → Go to
   … (unsafe)*; it is your own script.)
5. Copy the **Web app URL** (ends in `/exec`). **This URL is the dashboard.**
   Open it, enter `DASHBOARD_PASSWORD`, and bookmark it on your phone.

### 4. Tell the website where to send leads

In Vercel: **Project → Settings → Environment Variables** (Production and
Preview). Locally: a `.env.local` file (already git-ignored).

| Variable | Value |
| --- | --- |
| `LEADS_SCRIPT_URL` | The web app URL from step 3. |
| `LEADS_SCRIPT_SECRET` | The same string you put in `WEBSITE_SECRET`. |

Redeploy. Then submit a test enquiry from `/request-a-quote` — it should
appear on the dashboard after a **Refresh**, and as a new row in the sheet.

**Editing the script later?** Apps Script keeps serving the old version until
you go to **Deploy → Manage deployments → ✎ → Version: New version → Deploy**.
The URL stays the same.

## Day to day

- The dashboard remembers your password for the browser tab session; **Log
  out** forgets it. Press **Refresh** to pull in leads that arrived while the
  page was open.
- The **Awaiting contact** tile is the one to keep at zero: it counts leads
  still marked *New*.
- Tap a lead to expand it, change its status from the dropdown, and keep
  follow-up notes in **Internal notes** — they save to the sheet's last column.
- Anything you do directly in the sheet (sorting, editing a phone number,
  changing a status) shows up on the dashboard on the next refresh. Just keep
  the header names as they are and never edit the **ID** column — that is how
  the dashboard finds a row.

## Security notes

- The script URL is public by necessity. The dashboard will not load or change
  anything without `DASHBOARD_PASSWORD`, and the capture endpoint answers
  "Unauthorized" to anything without `WEBSITE_SECRET`. Rotate either by
  editing the script, re-deploying, and (for the secret) updating
  `LEADS_SCRIPT_SECRET` on Vercel.
- `POST /api/leads` on the website only accepts same-origin requests, enforces
  the form's validation and honeypot, and caps field length. It always answers
  `204` to the browser so a failure can never be detected or exploited from
  outside; failures are logged in Vercel's function logs under `[leads]`.
- Lead data lives only in your Google Sheet. Nothing is stored on Vercel.
- Apps Script's free quota is roughly 20,000 requests a day; a dashboard load
  is one, a lead is one.
