/* ============================================================
   SAB VENTURES — shared site behaviour
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  // ---- Mobile nav panel ----
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".mobile-panel");
  const scrim = document.querySelector(".scrim");
  const closeBtn = document.querySelector(".mobile-close");

  function openPanel(){ panel && panel.classList.add("open"); scrim && scrim.classList.add("open"); document.body.style.overflow="hidden"; }
  function closePanel(){ panel && panel.classList.remove("open"); scrim && scrim.classList.remove("open"); document.body.style.overflow=""; }

  toggle && toggle.addEventListener("click", openPanel);
  closeBtn && closeBtn.addEventListener("click", closePanel);
  scrim && scrim.addEventListener("click", closePanel);
  panel && panel.querySelectorAll("a").forEach(a => a.addEventListener("click", closePanel));

  // ---- Active nav link highlight ----
  const current = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.dataset.nav === current) a.classList.add("active");
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  // ---- Lightbox (used on gallery.html) ----
  const lightbox = document.getElementById("lightbox");
  if (lightbox){
    const lbImg = lightbox.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach(trigger => {
      trigger.addEventListener("click", () => {
        lbImg.src = trigger.dataset.full || trigger.querySelector("img").src;
        lbImg.alt = trigger.dataset.caption || "";
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        lightbox.classList.remove("open");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }

  // ---- Header shadow on scroll ----
  const header = document.querySelector(".site-header");
  if (header){
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 8 ? "0 6px 18px -10px rgba(0,0,0,.25)" : "none";
    }, { passive:true });
  }
});
