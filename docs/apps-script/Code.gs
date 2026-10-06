/**
 * JSS The Print Zone — website leads: capture endpoint + owner dashboard.
 *
 * Lives inside the leads spreadsheet (Extensions → Apps Script) together with
 * Dashboard.html. Two jobs:
 *
 *   1. doPost  — the website sends each quote-form enquiry (and Call/WhatsApp
 *                taps) here as JSON carrying WEBSITE_SECRET. Rows are appended
 *                to the "Leads" / "Clicks" tabs.
 *   2. doGet   — serves the dashboard. Anyone can open the URL; the page asks
 *                for DASHBOARD_PASSWORD before it will load or change anything.
 *
 * Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone.
 * Re-deploy (Manage deployments → ✎ → New version) after any edit here.
 */

// Long random string. Set the same value as LEADS_SCRIPT_SECRET on Vercel.
const WEBSITE_SECRET = "change-me-to-something-long-and-random";

// What you type to open the dashboard. Different from the one above.
const DASHBOARD_PASSWORD = "change-me-too";

const LEADS_TAB = "Leads";
const CLICKS_TAB = "Clicks";

/* ── Website → sheet ─────────────────────────────────────────────────── */

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "Bad JSON" });
  }
  if (!body || body.secret !== WEBSITE_SECRET) return json({ ok: false, error: "Unauthorized" });
  if (body.action !== "append") return json({ ok: false, error: "Unknown action" });

  // Serialise writes: two enquiries landing in the same second must not
  // overwrite each other's row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    append(body.tab, body.header, body.row);
    return json({ ok: true, data: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Returns the tab, creating it and writing the header row on first use. */
function sheet(tab, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(tab);
  if (!sh) sh = ss.insertSheet(tab);
  if (header && sh.getLastRow() === 0) {
    writeRow(sh, 1, header);
    sh.setFrozenRows(1);
  }
  return sh;
}

/**
 * Writes cells as plain text. Without the "@" format Sheets would turn the
 * ISO timestamp into a date and a phone number into arithmetic, and the
 * dashboard could no longer read them back reliably.
 */
function writeRow(sh, rowNumber, values) {
  const range = sh.getRange(rowNumber, 1, 1, values.length);
  range.setNumberFormat("@");
  range.setValues([values]);
}

function append(tab, header, row) {
  const sh = sheet(tab, header);
  writeRow(sh, sh.getLastRow() + 1, row);
}

/* ── Dashboard ───────────────────────────────────────────────────────── */

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Dashboard")
    .setTitle("Website leads — JSS The Print Zone")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function requirePassword(password) {
  if (!password || password !== DASHBOARD_PASSWORD) throw new Error("Unauthorized");
}

/** Called by Dashboard.html via google.script.run. Returns both tabs as rows. */
function dashLoad(password) {
  requirePassword(password);
  return {
    leads: rows(LEADS_TAB),
    clicks: rows(CLICKS_TAB),
    sheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  };
}

/**
 * Status / internal-notes edits. `patch` is { "<column header>": value }.
 * The row is found by the ID column and cells by header name, so sorting the
 * sheet or reordering columns by hand does not break updates.
 */
function dashUpdate(password, id, patch) {
  requirePassword(password);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEADS_TAB);
    if (!sh) throw new Error("No Leads tab yet");
    const values = sh.getDataRange().getDisplayValues();
    const header = values[0] || [];
    const idCol = header.indexOf("ID");
    if (idCol < 0) throw new Error("Leads tab has no ID column");

    for (let r = 1; r < values.length; r++) {
      if (values[r][idCol] !== id) continue;
      Object.keys(patch).forEach(function (name) {
        const c = header.indexOf(name);
        if (c < 0) return;
        const cell = sh.getRange(r + 1, c + 1);
        cell.setNumberFormat("@");
        cell.setValue(patch[name]);
      });
      SpreadsheetApp.flush();
      return sh.getRange(r + 1, 1, 1, header.length).getDisplayValues()[0];
    }
    throw new Error("Lead " + id + " not found — was the row deleted?");
  } finally {
    lock.releaseLock();
  }
}

function rows(tab) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  if (!sh || sh.getLastRow() === 0) return [];
  return sh.getDataRange().getDisplayValues();
}
