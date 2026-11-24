/*
 * Umer Farooq XD - Blogger Theme License Check
 * Data source: licenses.json in the same GitHub folder.
 * Basic browser-side validation only; not tamper-proof DRM.
 */
(function () {
  "use strict";

  var root = document.getElementById("ufxd-license-root");
  if (!root) return;

  var customerName = (root.getAttribute("data-customer") || "").trim();
  var dataUrl = root.getAttribute("data-license-url") || "";

  function block(title, message) {
    root.style.display = "flex";
    root.innerHTML =
      '<div style="max-width:440px;background:#171717;border:1px solid #444;border-radius:14px;padding:28px;box-shadow:0 20px 70px rgba(0,0,0,.45)">' +
      '<h2 style="margin:0 0 12px;font-size:22px;color:#fff">' + title + '</h2>' +
      '<p style="margin:0;line-height:1.6;color:#ddd">' + message + '</p></div>';
  }

  function pakistanDate() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    return values.year + "-" + values.month + "-" + values.day;
  }

  if (!customerName || !dataUrl) {
    block("License configuration error", "Theme license settings complete nahi hain.");
    return;
  }

  fetch(dataUrl, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("License data unavailable");
      return response.json();
    })
    .then(function (license) {
      var savedName = String(license.name || "").trim().toLowerCase();
      var expiryDate = String(license.expiry_date || "").trim();

      if (savedName !== customerName.toLowerCase()) {
        block("License not found", "Is theme ke liye valid license record nahi mila.");
        return;
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(expiryDate)) {
        block("License date error", "License expiry date ka format valid nahi hai.");
        return;
      }

      var dateParts = expiryDate.split("-").map(Number);
      var checkDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
      if (checkDate.getUTCFullYear() !== dateParts[0] ||
          checkDate.getUTCMonth() !== dateParts[1] - 1 ||
          checkDate.getUTCDate() !== dateParts[2]) {
        block("License date error", "License expiry date valid calendar date nahi hai.");
        return;
      }

      // Expiry date last valid day hai; Pakistan time mein aglay din expire hogi.
      if (pakistanDate() > expiryDate) {
        block("License expired", "Is theme ki license expiry date " + expiryDate + " thi.");
        return;
      }

      root.remove();
    })
    .catch(function () {
      block("License check failed", "License data load nahi ho saka. Internet connection ya CDN availability check karein.");
    });
})();
