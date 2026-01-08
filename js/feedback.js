// js/feedback.js
(() => {
    const GOOGLE_FORM_ENDPOINT =
      "https://docs.google.com/forms/d/e/1FAIpQLSfdOrL6xc8WvkeH7u9PxkRjh5Q1E2B3rdQ0AFEV8boIhlqS8g/formResponse";
  
    const form = document.getElementById("feedbackForm");
    const statusEl = document.getElementById("feedbackStatus");
    const modalEl = document.getElementById("feedbackModal");
  
    if (!form || !statusEl || !modalEl) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      statusEl.textContent = "Submitting…";
  
      const fd = new FormData(form);
  
      // Map modal fields -> Google Form entry IDs (from your page source)
      const data = new URLSearchParams();
      data.append("entry.1277209944", fd.get("name") || "");
    data.append("entry.1218445560", fd.get("email") || "");
    data.append("entry.1609854595", fd.get("role") || "");
    data.append("entry.363056654", fd.get("hbcu") || "");    
    data.append("entry.1233770286", fd.get("goal") || "");    
    data.append("entry.1857693389", fd.get("feedback") || "");

  
      try {
        await fetch(GOOGLE_FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: data
        });
  
        statusEl.textContent = "Thank you for your feedback!";
  
        // Optional: track
        if (typeof track === "function") track("feedback_submit");
  
        // Close modal + reset
        setTimeout(() => {
          form.reset();
          statusEl.textContent = "";
  
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modal.hide();
        }, 900);
  
      } catch (err) {
        console.error(err);
        statusEl.textContent = "Something went wrong. Please try again.";
      }
    });
  })();
  