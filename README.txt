SAB VENTURES — WEBSITE HANDOFF NOTES
=====================================

STRUCTURE
  index.html            Home — hero carousel (arrows/dots, per-slide caption)
  products.html         Full catalog: sidebar filters, quick-view modal,
                         order-list flyout, skeleton loading, deep-links to
                         products.html#bags / #disposables / #bottles /
                         #household / #popcorn
  gallery.html           Auto-scrolling filmstrip + full photo grid + lightbox
  about.html              Story, contact, embedded map
  admin.html               Password-gated add/delete product dashboard
  css/style.css             All design tokens + components live here
  js/products.js            Product data + localStorage CRUD + Cloudflare
                             KV sync stub (edit DEFAULT_PRODUCTS here to
                             change the starting catalog)
  js/main.js                 Shared nav / mega menu / reveal-on-scroll /
                              lightbox behaviour
  functions/api/products.js   Cloudflare Pages Function scaffold for the
                               shared KV catalog — inactive until deployed
                               + bound (see "CLOUDFLARE KV UPGRADE" below)

NEW SINCE LAST HANDOFF (bug fixes + features)
  - FIXED: hero slide fallback colour that matched the background exactly,
    making the hero look like an empty box ~25% of the time. Hero is now a
    proper JS carousel (fade, prev/next arrows, dots, per-slide caption)
    built from real <img> tags using the same placeholder system as the
    rest of the site — it can never render as a flat empty rectangle again.
  - FIXED: the placeholder-image generator broke on any product/caption
    containing "&" (e.g. "Spoons & Forks", "Bottles & gallons") because the
    text wasn't XML-escaped before being embedded in the SVG — those showed
    as broken image icons. Now escaped everywhere (sabvEscapeXml in
    js/products.js).
  - Mega menu: "Products" in the nav is now a dropdown with all 5
    categories + icons, on every page (desktop hover, mobile/touch tap).
  - Sidebar filters on products.html (category radio filters mirror the
    chip bar, with live item counts).
  - Quick View modal: click any product photo for a larger view + "Add to
    List" without leaving the page.
  - Order List flyout: tick the checkbox on any product card to add it to
    a running list (bottom-right floating button, badge shows count). The
    flyout builds ONE tidy WhatsApp message listing everything selected —
    this is the equivalent of a "cart," sized for a WhatsApp-order business
    rather than online checkout. Stored in sessionStorage (clears when the
    browser tab closes, by design — it's a message-builder, not a real cart).
  - Skeleton loading cards on products.html for a brief moment on load
    (matches the polish of larger e-commerce sites, and avoids layout
    shift on slow connections).

CLOUDFLARE KV UPGRADE (the "later do the KVP thing" you mentioned)
  functions/api/products.js is a ready-to-go Cloudflare Pages Function,
  same shape as the Ray Digital / Braketi / Estell's Collection admin
  dashboards. It does nothing until you:
    1. Deploy this project on Cloudflare Pages.
    2. Create a KV namespace and bind it to the project as "PRODUCTS_KV"
       (Pages dashboard → Settings → Functions → KV namespace bindings).
    3. Set an ADMIN_SECRET environment variable (Pages → Settings →
       Environment variables) — this protects the add/delete endpoints.
    4. Seed the KV key "catalog" once with the DEFAULT_PRODUCTS array from
       js/products.js (via wrangler or the Pages UI).
  Once that's live, every page's sabvSyncFromApi() call (already wired in
  on load) starts pulling the shared catalog automatically — no other code
  changes needed. Until then, everything keeps working exactly as it does
  today off localStorage, so there's no rush and nothing to break.

ADMIN PASSWORD
  Set in admin.html near the top of the <script> block:
      const ADMIN_PASSWORD = "sabventures2026";
  Change this before handing the site to Maame Serwaah, and give her the
  password separately (WhatsApp voice note, printed note, etc).

HOW THE ADMIN CATALOG WORKS (IMPORTANT)
  Products are stored in the visitor/admin's own browser (localStorage),
  not a shared database. That means:
    - Maame Serwaah can add/delete products from her phone any time,
      no coding needed.
    - Those changes only show up on THAT phone/browser — a customer
      browsing on their own phone still sees the DEFAULT_PRODUCTS list
      from js/products.js until you update that file and redeploy.
  This is the fastest way to ship a self-service catalog. If she wants
  her edits to show for every visitor everywhere, upgrade this to the
  same Cloudflare Pages Functions + KV pattern used on the Ray Digital /
  Braketi / Estell's admin dashboards — swap the localStorage calls in
  js/products.js for fetch() calls to a Worker/Function backed by a KV
  namespace. Everything else (UI, forms, delete buttons) stays the same.

IMAGES — REPLACE THESE PLACEHOLDER PATHS WITH REAL PHOTOS
  Until real photos are added, every <img> gracefully falls back to a
  branded "Photo coming soon" tile (see sabvPlaceholder() in
  js/products.js), so the site never looks broken. Drop real photos into
  these folders using the exact filenames below (or update the paths in
  the HTML/JS if you rename them):

  images/hero/            hero-1.jpg, hero-2.jpg, hero-3.jpg, hero-4.jpg
                           (square-ish, wide shots of the shop/stock —
                           used in the homepage hero, auto-crossfading)

  images/gallery/         shop-1.jpg through shop-8.jpg
                           (any shop/stock/product photos — used in the
                           gallery.html filmstrip + grid, and reused on
                           the homepage gallery teaser)

  images/about/           storefront.jpg
                           (a clear photo of the shop front for the
                           About page)

  images/products/        one photo per product — filenames already
                           referenced in js/products.js, e.g.
                           olonka.jpg, apapaye.jpg, bowls.jpg,
                           sobolo-bottles.jpg, tissue.jpg, popcorn-corn.jpg
                           (full list is in js/products.js — search
                           for "img:" to see every expected filename)

  Recommended photo shape: square (1:1) crops work best across every
  card and grid on this site so nothing looks cropped oddly on mobile.

CONTACT DETAILS USED SITE-WIDE
  Call:      0244-617732 / 0242-939938  → tel:+233244617732 /
                                           tel:+233242939938
  WhatsApp:  https://wa.me/233244617732 (pre-filled order message)
  TikTok:    https://www.tiktok.com/@serwaah.ampaafo.b
  Location:  Bogoso Town Hall Lane (Kokoase Taxi Station), opposite
             Ohms Electricals / Asantewaa Electricals
  Map:       Google Maps embed searches "Bogoso Town Hall, Kokoase Taxi
             Station, Ghana" — once you have exact GPS coordinates,
             swap the iframe src in index.html and about.html for a
             pinned coordinate for pixel-perfect accuracy.

MOBILE
  - Sticky bottom bar (Call / WhatsApp / Directions) appears only under
    641px so it's always thumb-reachable without covering content on
    desktop.
  - Every image grid/card uses aspect-ratio + object-fit:cover, so
    nothing crops awkwardly on small screens the way the previous site
    did.
  - Hamburger menu slides in from the right with large tap targets.

DEPLOY
  Same as the other Crisol Studios client sites: push this folder to
  GitHub and connect it to Cloudflare Pages (or drag-and-drop deploy).
  No build step required — it's plain HTML/CSS/JS.
