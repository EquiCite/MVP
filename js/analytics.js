// js/analytics.js
// Optional: set this later to your Apps Script Web App URL
const ANALYTICS_ENDPOINT = ""; // "https://script.google.com/macros/s/XXXXX/exec";

function getSessionId() {
  let sid = localStorage.getItem("eq_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("eq_sid", sid);
  }
  return sid;
}

function track(event, props = {}) {
  if (!ANALYTICS_ENDPOINT) return;

  fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: getSessionId(),
      event,
      props,
      url: location.href,
      referrer: document.referrer || "",
      ua: navigator.userAgent
    }),
    keepalive: true
  }).catch(() => {});
}
