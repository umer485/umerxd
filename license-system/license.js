/*
 * Blogger Theme License Checker
 * Reads license-system/licenses.json from this same folder.
 *
 * Setup:
 * 1. Replace the sample customer names/dates in licenses.json.
 * 2. Add the loader snippet in the Blogger theme where the license check should run.
 *
 * Note: This is a basic client-side check, not tamper-proof DRM.
 */
(function () {
  "use strict";

  var script = document.currentScript;
  var scriptUrl = script && script.src ? script.src : "";
  var dataUrl = scriptUrl
    ? scriptUrl.replace(/license\.js(?:\?.*)?$/, "licenses.json")
    : "";

  var root = document.getElementById("ufxd-license-root");
  if (!root || !dataUrl) return;

  var customerName = (root.getAttribute("data-customer") || "").trim();

  function showMessage(title, message) {
    root.innerHTML =
      '<div style="position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;color:#fff;text-align:center;">' +
        '<div style="max-width:440px;background:#171717;border:1px solid #444;border-radius:14px;padding:28px;">' +
          '<h2 style="margin:0 0 12px;font-size:22px;">' + title + '</h2>' +
          '<p style="margin:0;line-height:1.6;">' + message + '</p>' +
        '</div>' +
      '</div>';
  }

  if (!customerName) {
    showMessage("License setup required", "Customer name is missing from the license configuration.");
    return;
  }

  fetch(dataUrl, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("License data could not be loaded.");
      return response.json();
    })
    .then(function (data) {
      var records = Array.isArray(data.licenses) ? data.licenses : [];
      var record = records.find(function (item) {
        return String(item.name || "").trim().toLowerCase() === customerName.toLowerCase();
      });

      if (!record || String(record.license).toLowerCase() !== "yes") {
        showMessage("License inactive", "Is theme ki license active nahi hai. License provider se rabta karein.");
        return;
      }

      var endDate = String(record.end_date || "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
        showMessage("License date error", "License ki end date sahi format mein set nahi hai.");
        return;
      }

      // End date ko last valid day samjha gaya hai (Pakistan time, poora din).
      var parts = endDate.split("-").map(Number);
      var expiry = Date.UTC(parts[0], parts[1] - 1, parts[2] + 1);
      var now = Date.now() + (5 * 60 * 60 * 1000);
      var pakistanNow = new Date(now);
      var pakistanDayStart = Date.UTC(
        pakistanNow.getUTCFullYear(),
        pakistanNow.getUTCMonth(),
        pakistanNow.getUTCDate()
      );

      if (!Number.isFinite(expiry) || pakistanDayStart >= expiry) {
        showMessage("License expired", "Is theme ki license " + endDate + " ko expire ho chuki hai.");
        return;
      }

      root.setAttribute("data-license-status", "active");
    })
    .catch(function () {
      showMessage("License check failed", "License server se data load nahi ho saka. Internet connection check karein.");
    });
})();
