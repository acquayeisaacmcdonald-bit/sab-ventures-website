SAB VENTURES — WEBSITE HANDOFF NOTES
=====================================

STRUCTURE
  index.html       Home
  products.html    Full catalog, filterable by category, deep-links to
                    products.html#bags / #disposables / #bottles /
                    #household / #popcorn
  gallery.html      Auto-scrolling filmstrip + full photo grid + lightbox
  about.html         Story, contact, embedded map
  admin.html          Password-gated add/delete product dashboard
  css/style.css        All design tokens + components live here
  js/products.js       Product data + localStorage CRUD (edit
                        DEFAULT_PRODUCTS here to change the starting catalog)
  js/main.js            Shared nav / reveal-on-scroll / lightbox behaviour

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
