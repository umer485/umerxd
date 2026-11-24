/*
 * Sliders X presence guard
 * Redirects to WhatsApp if the .sliders-x marker element is absent.
 * The marker text is intentionally ignored; only the class is checked.
 */
(function () {
  "use strict";

  var MARKER_SELECTOR = ".sliders-x";
  var WHATSAPP_NUMBER = "923304541001";
  var MESSAGE = "Hello, my Blogger theme access marker is missing. Please help me.";

  function checkMarker() {
    var marker = document.querySelector(MARKER_SELECTOR);

    if (marker) {
      return; // Marker exists: allow the page to continue normally.
    }

    var whatsappURL =
      "https://wa.me/" + WHATSAPP_NUMBER +
      "?text=" + encodeURIComponent(MESSAGE);

    // Replace the current page so Back does not repeatedly return to the blocked page.
    window.location.replace(whatsappURL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkMarker, { once: true });
  } else {
    checkMarker();
  }
})();
