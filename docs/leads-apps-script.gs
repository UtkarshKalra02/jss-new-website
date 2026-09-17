/**
 * JSS The Print Zone — website leads endpoint.
 *
 * Lives inside the leads spreadsheet (Extensions → Apps Script) and is the
 * only thing that writes to it. The website calls it with a JSON POST that
 * carries `secret`; anything else is ignored.
 *
 * Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone.
 * Re-deploy (Manage deployments → edit → New version) after any edit here.
 */

// Any long random string. Set the same value as LEADS_SCRIPT_SECRET on Vercel.
const SECRET = "change-me-to-something-long-and-random";

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "Bad JSON" });
  }
  if (!body || body.secret !== SECRET) return reply({ ok: false, error: "Unauthorized" });

  // Serialise writes: two enquiries landing in the same second must not
  // overwrite each other's row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    switch (body.action) {
      case "append":
        return reply({ ok: true, data: append(body.tab, body.header, body.row) });
      case "list":
        return reply({ ok: true, data: list(body.tab) });
      case "update":
        return reply({ ok: true, data: update(body.tab, body.id, body.patch) });
      default:
        return reply({ ok: false, error: "Unknown action" });
    }
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the URL in a browser just confirms the deployment is alive. */
function doGet() {
  return reply({ ok: true, data: "JSS leads endpoint is live. The website talks to it with POST." });
}

function reply(obj) {
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
  return true;
}

function list(tab) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  if (!sh || sh.getLastRow() === 0) return [];
  return sh.getDataRange().getDisplayValues();
}

/**
 * `patch` is { "<column header>": value }. The row is found by the ID column
 * and cells by header name, so sorting the sheet or reordering columns by
 * hand does not break updates.
 */
function update(tab, id, patch) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
  if (!sh) return null;
  const values = sh.getDataRange().getDisplayValues();
  const header = values[0] || [];
  const idCol = header.indexOf("ID");
  if (idCol < 0) return null;

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
  return null;
}
