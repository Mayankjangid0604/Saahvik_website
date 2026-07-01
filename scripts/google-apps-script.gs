/**
 * SAAHVIK — Google Sheets submission logger.
 *
 * SETUP (one-time, ~3 minutes):
 * 1. Go to https://sheets.google.com → create a new blank spreadsheet.
 *    Name it e.g. "SAAHVIK Submissions".
 * 2. Extensions → Apps Script. Delete any starter code and paste this
 *    entire file in.
 * 3. Click Deploy → New deployment → gear icon → select type "Web app".
 *      - Description: "SAAHVIK form logger"
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Click Deploy. Authorize the permissions Google asks for (it's your
 *    own script, acting on your own sheet).
 * 5. Copy the "Web app URL" it gives you — looks like:
 *      https://script.google.com/macros/s/AKfycb.../exec
 * 6. Set that as NEXT_PUBLIC_GAS_ENDPOINT in Cloudflare's build
 *    environment variables (same place as NEXT_PUBLIC_WEB3FORMS_KEY),
 *    then redeploy.
 *
 * Every submission creates a row in a sheet tab named "Early Access" or
 * "Feature Suggestions" (created automatically on first submission), with
 * column headers inferred from the first row's fields.
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheetName = data.sheetName || "Submissions";
  delete data.sheetName;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  var keys = Object.keys(data);

  // First submission to this sheet: write the header row.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(keys);
    sheet.setFrozenRows(1);
  }

  // Align this row to the existing header order (new fields get appended
  // as new columns automatically so older rows aren't disturbed).
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var newKeys = keys.filter(function (k) {
    return headers.indexOf(k) === -1;
  });
  if (newKeys.length > 0) {
    headers = headers.concat(newKeys);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  var row = headers.map(function (h) {
    return Object.prototype.hasOwnProperty.call(data, h) ? data[h] : "";
  });
  sheet.appendRow(row);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
