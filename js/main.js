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

  // Social icons live as static markup (.social-rail) in each page's <body> —
  // see the "SOCIAL RAIL" comment near the top of every HTML file — so no
  // JS injection is needed here.

  const current = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.dataset.nav === current) a.classList.add("active");
  });

  // ---- Mega menu: populate + touch/click toggle (hover handles desktop mouse) ----
  const megaPanel = document.getElementById("megaPanel");
  if (megaPanel && typeof SABV_CATEGORIES !== "undefined"){
    const icons = {
      bags: '<path d="M6 9h12l-1 12H7L6 9Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
      disposables: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>',
      bottles: '<path d="M10 2h4v4l3 3v11a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V9l3-3V2Z"/>',
      household: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 10h16"/>',
      popcorn: '<path d="M12 3c-2 0-3 2-2 4-2 0-3 2-1 4-2 1-2 4 1 4h4c3 0 3-3 1-4 2-2 1-4-1-4 1-2 0-4-2-4Z"/>',
    };
    megaPanel.innerHTML = SABV_CATEGORIES.map(cat => `
      <a class="mega-item" href="products.html#${cat.id}">
        <span class="ico"><svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icons[cat.id] || ""}</svg></span>
        <span><strong>${cat.label}</strong><span>Browse ${cat.short.toLowerCase()}</span></span>
      </a>`).join("") + `
      <div class="mega-cta">
        <p>Not sure which category? Browse the full catalog.</p>
        <a class="btn btn-call btn-sm" href="products.html">Shop All Products</a>
      </div>`;

    const trigger = document.querySelector(".mega-trigger");
    const wrapper = trigger && trigger.closest(".has-mega");
    if (trigger && wrapper){
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = wrapper.classList.toggle("open");
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) wrapper.classList.remove("open");
      });
    }
  }

  // ---- Mobile panel: inject category links under Products ----
  const mobileCatSlot = document.getElementById("mobileCategoryLinks");
  if (mobileCatSlot && typeof SABV_CATEGORIES !== "undefined"){
    mobileCatSlot.innerHTML = SABV_CATEGORIES.map(cat =>
      `<li><a href="products.html#${cat.id}" style="padding-left:22px; font-size:.92rem; font-weight:600;">— ${cat.short}</a></li>`
    ).join("");
  }

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
        const sourceImg = trigger.querySelector("img");
        // Prefer the on-page image's CURRENT src: if the real photo already
        // failed to load and became a placeholder, we want the lightbox to
        // show that same placeholder rather than retrying the missing file.
        lbImg.dataset.fallbackCat = sourceImg ? sourceImg.dataset.fallbackCat : "";
        lbImg.dataset.fallbackLabel = trigger.dataset.caption || "";
        lbImg.onerror = () => sabvOnImgError(lbImg); // set BEFORE src
        lbImg.src = (sourceImg && sourceImg.src) || trigger.dataset.full || "";
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
