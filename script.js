/* ============================================================
THE RUG ATELIER — script.js
============================================================ */

document.addEventListener(“DOMContentLoaded”, () => {

/* –– Sticky nav –– */
const nav = document.querySelector(”.nav”);
const onScroll = () => {
nav.classList.toggle(“scrolled”, window.scrollY > 40);
};
window.addEventListener(“scroll”, onScroll, { passive: true });
onScroll();

/* –– Mobile nav toggle –– */
const toggle    = document.querySelector(”.nav-toggle”);
const mobileNav = document.querySelector(”.nav-mobile”);

if (toggle && mobileNav) {
toggle.addEventListener(“click”, () => {
const open = toggle.classList.toggle(“open”);
mobileNav.classList.toggle(“open”, open);
document.body.style.overflow = open ? “hidden” : “”;
});

```
// Close on link click
mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  });
});
```

}

/* –– Active nav link –– */
const currentPage = window.location.pathname.split(”/”).pop() || “index.html”;
document.querySelectorAll(”.nav-links a, .nav-mobile a”).forEach(a => {
const href = a.getAttribute(“href”);
if (
(currentPage === “” && href === “index.html”) ||
(currentPage === “index.html” && href === “index.html”) ||
(currentPage === “about.html” && href === “about.html”)
) {
a.classList.add(“active”);
}
});

/* –– Scroll reveal –– */
const revealObserver = new IntersectionObserver(
(entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add(“visible”);
revealObserver.unobserve(e.target);
}
});
},
{ threshold: 0.12 }
);

document.querySelectorAll(”.reveal”).forEach(el => revealObserver.observe(el));

/* –– Contact form validation & submit –– */
const form = document.querySelector(”.contact-form”);
if (form) {
form.addEventListener(“submit”, async (e) => {
e.preventDefault();

```
  let valid = true;

  // Clear previous errors
  form.querySelectorAll(".form-error").forEach(el => el.classList.remove("visible"));
  form.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error"));

  const nameEl  = form.querySelector("#name");
  const emailEl = form.querySelector("#email");
  const msgEl   = form.querySelector("#message");

  if (!nameEl.value.trim()) {
    showError(nameEl, "name-error");
    valid = false;
  }
  if (!emailEl.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
    showError(emailEl, "email-error");
    valid = false;
  }
  if (!msgEl.value.trim()) {
    showError(msgEl, "message-error");
    valid = false;
  }

  if (!valid) return;

  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      form.reset();
      const success = document.querySelector(".form-success");
      if (success) success.classList.add("visible");
      setTimeout(() => success && success.classList.remove("visible"), 6000);
    } else {
      throw new Error("Server error");
    }
  } catch {
    alert("There was a problem sending your message. Please try again or contact us directly.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
```

}

function showError(input, errorId) {
input.classList.add(“error”);
const errEl = document.getElementById(errorId);
if (errEl) errEl.classList.add(“visible”);
}

/* –– Smooth anchor scroll for in-page links –– */
document.querySelectorAll(‘a[href^=”#”]’).forEach(a => {
a.addEventListener(“click”, e => {
const target = document.querySelector(a.getAttribute(“href”));
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: “smooth”, block: “start” });
}
});
});

});