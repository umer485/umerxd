/*
 * Blogger Theme Access Check
 * Reads the text inside .sliders-x and compares it with the approved list.
 * This is a client-side allowlist check, not tamper-proof DRM.
 */
(function () {
  "use strict";

  var APPROVED_NAMES = [
    "A", "B", "C", "D", "E", "F", "G",
    "Ali", "Umar", "Farooq"
  ];

  var ROOT_CLASS = "sliders-x";
  var STYLE_ID = "sliders-x-access-style";
  var POPUP_ID = "sliders-x-access-popup";

  function hideMarker(element) {
    if (!element) return;
    element.setAttribute("aria-hidden", "true");
    element.style.setProperty("display", "none", "important");
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${POPUP_ID} {
        position: fixed; inset: 0; z-index: 2147483647;
        display: flex; align-items: center; justify-content: center;
        padding: 20px; background: rgba(15, 23, 42, .58);
        font-family: Arial, Helvetica, sans-serif;
        -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px);
      }
      #${POPUP_ID} .sx-card {
        box-sizing: border-box; width: 100%; max-width: 390px;
        padding: 30px 26px 26px; border: 1px solid #e5e7eb;
        border-radius: 18px; background: #fff; color: #1c1e21;
        text-align: center; box-shadow: 0 18px 60px rgba(0,0,0,.22);
      }
      #${POPUP_ID} .sx-mark {
        width: 54px; height: 54px; margin: 0 auto 18px;
        display: grid; place-items: center; border-radius: 50%;
        background: #fff1f0; color: #d93025; font-size: 26px;
        font-weight: 700;
      }
      #${POPUP_ID} h2 {
        margin: 0 0 10px; font-size: 21px; line-height: 1.3;
        font-weight: 700; letter-spacing: -.3px;
      }
      #${POPUP_ID} p {
        margin: 0; color: #606770; font-size: 14px; line-height: 1.65;
      }
      #${POPUP_ID} .sx-note {
        margin-top: 20px; padding-top: 16px; border-top: 1px solid #edf0f2;
        color: #8a8d91; font-size: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  function showPopup() {
    if (document.getElementById(POPUP_ID)) return;

    injectStyles();

    var overlay = document.createElement("div");
    overlay.id = POPUP_ID;
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "sx-popup-title");

    overlay.innerHTML =
      '<div class="sx-card">' +
        '<div class="sx-mark" aria-hidden="true">!</div>' +
        '<h2 id="sx-popup-title">License Verification Failed</h2>' +
        '<p>This theme is not authorized for use. Please contact the theme provider to verify your access.</p>' +
        '<div class="sx-note">Access verification required</div>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  function verify() {
    var marker = document.querySelector("." + ROOT_CLASS);

    if (!marker) {
      showPopup();
      return;
    }

    var enteredName = (marker.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    hideMarker(marker);

    var isApproved = APPROVED_NAMES.some(function (name) {
      return name.toLowerCase() === enteredName;
    });

    if (!isApproved) {
      showPopup();
    }
  }

  function start() {
    verify();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
