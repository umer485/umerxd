/*
 * Sliders X — Blogger theme access notice
 * Checks the marker text in .sliders-x against the approved allowlist.
 * If the marker is absent or not approved, displays a renewal notice.
 *
 * Note: This browser-side check is a basic access gate, not tamper-proof DRM.
 */
(function () {
  "use strict";

  var APPROVED_NAMES = [
    "A", "B", "C", "D", "E", "F", "G",
    "Ali", "Umar", "Farooq"
  ];

  var MARKER_SELECTOR = ".sliders-x";
  var POPUP_ID = "sliders-x-renewal-notice";
  var WHATSAPP_NUMBER = "923304541001";
  var WHATSAPP_MESSAGE = "Hello My Blog License Expired. I want to Buy New.";
  var WHATSAPP_URL =
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  function addStyles() {
    if (document.getElementById("sliders-x-renewal-styles")) return;

    var style = document.createElement("style");
    style.id = "sliders-x-renewal-styles";
    style.textContent = [
      "#" + POPUP_ID + "{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;background:rgba(15,23,42,.58);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-family:Arial,Helvetica,sans-serif}",
      "#" + POPUP_ID + " *{box-sizing:border-box}",
      "#" + POPUP_ID + " .sx-panel{width:100%;max-width:410px;padding:30px 26px 25px;border:1px solid #e7eaf0;border-radius:20px;background:#fff;color:#1c1e21;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.24)}",
      "#" + POPUP_ID + " .sx-icon{width:58px;height:58px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#fff4e5;color:#b76e00;font-size:27px;font-weight:700}",
      "#" + POPUP_ID + " .sx-kicker{margin:0 0 9px;color:#1877f2;font-size:11px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase}",
      "#" + POPUP_ID + " h2{margin:0 0 11px;font-size:22px;line-height:1.3;font-weight:700;letter-spacing:-.45px}",
      "#" + POPUP_ID + " .sx-copy{margin:0 auto;color:#606770;font-size:14px;line-height:1.7}",
      "#" + POPUP_ID + " .sx-primary{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;margin-top:23px;padding:12px 18px;border-radius:10px;background:#1877f2;color:#fff;text-decoration:none;font-size:14px;font-weight:700}",
      "#" + POPUP_ID + " .sx-primary:hover{background:#166fe5}",
      "#" + POPUP_ID + " .sx-secondary{display:inline-block;margin-top:16px;color:#1877f2;text-decoration:none;font-size:13px;font-weight:600}",
      "#" + POPUP_ID + " .sx-foot{margin:20px 0 0;padding-top:15px;border-top:1px solid #edf0f2;color:#8a8d91;font-size:11px;line-height:1.5}"
    ].join("");
    document.head.appendChild(style);
  }

  function hideMarker(marker) {
    if (!marker) return;
    marker.setAttribute("aria-hidden", "true");
    marker.style.setProperty("display", "none", "important");
  }

  function showRenewalNotice() {
    if (document.getElementById(POPUP_ID)) return;
    addStyles();

    var overlay = document.createElement("div");
    overlay.id = POPUP_ID;
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "sliders-x-title");

    var panel = document.createElement("div");
    panel.className = "sx-panel";

    var icon = document.createElement("div");
    icon.className = "sx-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "!";

    var kicker = document.createElement("div");
    kicker.className = "sx-kicker";
    kicker.textContent = "Access notice";

    var heading = document.createElement("h2");
    heading.id = "sliders-x-title";
    heading.textContent = "Aapki theme license expire ho chuki hai";

    var copy = document.createElement("p");
    copy.className = "sx-copy";
    copy.textContent = "Website ka access jari rakhne ke liye apni license renew karein. Dobara purchase karne ke liye neeche WhatsApp par rabta karein.";

    var primary = document.createElement("a");
    primary.className = "sx-primary";
    primary.href = WHATSAPP_URL;
    primary.target = "_blank";
    primary.rel = "noopener noreferrer";
    primary.textContent = "WhatsApp par Renew / Re-purchase karein";

    var secondary = document.createElement("a");
    secondary.className = "sx-secondary";
    secondary.href = WHATSAPP_URL;
    secondary.target = "_blank";
    secondary.rel = "noopener noreferrer";
    secondary.textContent = "WhatsApp par message bhejein";

    var foot = document.createElement("div");
    foot.className = "sx-foot";
    foot.textContent = "Theme access verification required";

    panel.appendChild(icon);
    panel.appendChild(kicker);
    panel.appendChild(heading);
    panel.appendChild(copy);
    panel.appendChild(primary);
    panel.appendChild(secondary);
    panel.appendChild(foot);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  }

  function verifyMarker() {
    var marker = document.querySelector(MARKER_SELECTOR);

    if (!marker) {
      showRenewalNotice();
      return;
    }

    var markerText = (marker.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    hideMarker(marker);

    var approved = APPROVED_NAMES.some(function (name) {
      return name.toLowerCase() === markerText;
    });

    if (!approved) showRenewalNotice();
  }

  function start() {
    verifyMarker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
