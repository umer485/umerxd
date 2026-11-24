/*
 * Umer Farooq XD - Blogger Theme License Check
 * Reads one license record from licenses.json.
 * Client-side validation is a basic access gate, not tamper-proof DRM.
 */
(function () {
  "use strict";

  var root = document.getElementById("ufxd-license-root");
  if (!root) {
    console.error("[UFXD License] License root element #ufxd-license-root was not found.");
    return;
  }

  var customerName = (root.getAttribute("data-customer") || "").trim();
  var dataUrl = (root.getAttribute("data-license-url") || "").trim();
  var timeoutMs = 12000;
  var timeoutId = null;
  var finished = false;

  function showStatus(title, message) {
    if (finished) return;
    finished = true;
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    root.style.display = "flex";
    root.innerHTML =
      '<div style="max-width:440px;background:#171717;border:1px solid #444;border-radius:14px;padding:28px;box-shadow:0 20px 70px rgba(0,0,0,.45)">' +
      '<h2 style="margin:0 0 12px;font-size:22px;color:#fff">' + title + '</h2>' +
      '<p style="margin:0;line-height:1.6;color:#ddd">' + message + '</p></div>';
  }

  function pakistanDate() {
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    return values.year + "-" + values.month + "-" + values.day;
  }

  function validCalendarDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    var p = value.split("-").map(Number);
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
    return d.getUTCFullYear() === p[0] &&
      d.getUTCMonth() === p[1] - 1 &&
      d.getUTCDate() === p[2];
  }

  if (!customerName || !dataUrl) {
    showStatus("License configuration error", "Theme license settings complete nahi hain.");
    return;
  }

  if (!window.fetch) {
    showStatus("Browser not supported", "Is browser mein license check support nahi ho raha. Updated browser use karein.");
    return;
  }

  var controller = window.AbortController ? new AbortController() : null;
  timeoutId = window.setTimeout(function () {
    if (controller) controller.abort();
    showStatus("License check timed out", "License server se 12 seconds mein response nahi mila. Page refresh karke dobara try karein.");
  }, timeoutMs);

  // Unique query value avoids stale CDN/browser cache during license updates.
  var requestUrl = dataUrl + (dataUrl.indexOf("?") === -1 ? "?" : "&") + "check=" + Date.now();

  fetch(requestUrl, {
    method: "GET",
    cache: "no-store",
    signal: controller ? controller.signal : undefined
  })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (license) {
      if (finished) return;

      if (!license || typeof license !== "object" || Array.isArray(license)) {
        throw new Error("Unexpected JSON structure");
      }

      var savedName = String(license.name || "").trim().toLowerCase();
      var expiryDate = String(license.expiry_date || "").trim();

      if (!savedName || savedName !== customerName.toLowerCase()) {
        showStatus("License not found", "Is theme ke liye valid license record nahi mila.");
        return;
      }

      if (!validCalendarDate(expiryDate)) {
        showStatus("License date error", "License expiry date YYYY-MM-DD format mein valid date nahi hai.");
        return;
      }

      // Expiry date is the final valid day. It expires after that date in Pakistan time.
      if (pakistanDate() > expiryDate) {
        showStatus("License expired", "Is theme ki license expiry date " + expiryDate + " thi.");
        return;
      }

      finished = true;
      window.clearTimeout(timeoutId);
      root.remove();
      console.info("[UFXD License] Valid license for:", customerName, "| Expiry:", expiryDate);
    })
    .catch(function (error) {
      if (finished) return;
      window.clearTimeout(timeoutId);
      console.error("[UFXD License] Check failed:", error);
      showStatus("License check failed", "License data load ya verify nahi ho saka. Internet, CDN link aur JSON file check karein.");
    });
})();
