/* ============================================================
   SAB VENTURES — Product data store
   Products live in localStorage under key "sabv_products" so
   Maame Serwaah can add/delete them from admin.html without any
   coding. On first visit, the DEFAULT_PRODUCTS list below seeds
   the store. Edit DEFAULT_PRODUCTS any time to change the
   starting catalog — real edits after launch happen in /admin.html.

   NOTE FOR ISAAC: this is a client-side (localStorage) catalog —
   changes Maame Serwaah makes on her phone only show on that
   phone/browser. It's the fastest way to ship this. If she wants
   changes she makes to show for EVERY visitor on every device,
   swap this for the same Cloudflare Pages Functions + KV pattern
   used on the Ray Digital / Braketi / Estell's admin dashboards.
   ============================================================ */

const SABV_STORAGE_KEY = "sabv_products_v1";

const SABV_CATEGORIES = [
  { id: "bags",        label: "Polythene & Rubber Bags", short: "Bags" },
  { id: "disposables",  label: "Disposables & Cutlery",   short: "Disposables" },
  { id: "bottles",      label: "Bottles & Containers",    short: "Bottles" },
  { id: "household",    label: "Household & Packaging",   short: "Household" },
  { id: "popcorn",      label: "Popcorn Corn",            short: "Popcorn" },
];

/* Placeholder image: a clean SVG "photo coming soon" tile tinted
   per category, so the layout looks complete before real product
   photos are dropped into /images/products/. */
function sabvPlaceholder(catId, label){
  const tint = { bags:"#1B7A3D", disposables:"#1F5FA8", bottles:"#C3382B", household:"#F5B914", popcorn:"#7a4a1b" }[catId] || "#1B7A3D";
  const safe = (label||"SAB Ventures").slice(0,26);
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <rect width='600' height='600' fill='${tint}'/>
    <rect width='600' height='600' fill='black' opacity='0.12'/>
    <g fill='#FBF3E3' opacity='0.9' font-family='Manrope, sans-serif'>
      <circle cx='300' cy='250' r='54' fill='none' stroke='#FBF3E3' stroke-width='6'/>
      <path d='M280 250 h40 M300 230 v40' stroke='#FBF3E3' stroke-width='6' stroke-linecap='round'/>
      <text x='300' y='360' font-size='24' text-anchor='middle' font-weight='700'>${safe}</text>
      <text x='300' y='392' font-size='15' text-anchor='middle' opacity='0.75'>Photo coming soon</text>
    </g>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* Attach to any <img data-fallback-cat="..." data-fallback-label="..."> so a
   missing /images/products/xxx.jpg gracefully becomes a branded placeholder. */
function sabvBindImageFallback(img){
  img.addEventListener("error", function onerr(){
    img.removeEventListener("error", onerr);
    img.src = sabvPlaceholder(img.dataset.fallbackCat, img.dataset.fallbackLabel);
  }, { once:true });
}

const DEFAULT_PRODUCTS = [
  // ---- Bags ----
  { id:"bag-olonka", name:"Olonka Rubber Bags", category:"bags", unit:"Per bundle", note:"Market measuring bags, assorted sizes.", img:"images/products/olonka.jpg" },
  { id:"bag-apapa", name:"Apapa3 Rubber Bags", category:"bags", unit:"Per bundle", note:"Everyday carrier bags for shops & stalls.", img:"images/products/apapaye.jpg" },
  { id:"bag-1k4k", name:"1k – 4k Rubber Bags", category:"bags", unit:"Per pack", note:"Sold by weight — from 1,000 to 4,000 count packs.", img:"images/products/1k-4k.jpg" },
  { id:"bag-cups", name:"1 Cup & 2 Cup Rubbers", category:"bags", unit:"Per bundle", note:"Sizes for kenkey, banku & porridge sellers.", img:"images/products/cup-rubber.jpg" },
  { id:"bag-colour", name:"Colour Rubber Bags", category:"bags", unit:"Per bundle", note:"Assorted colours for packaging & retail.", img:"images/products/colour-rubber.jpg" },
  { id:"bag-takeaway", name:"Take-Away Rubber Bags", category:"bags", unit:"Per bundle", note:"For chop bars & food vendors.", img:"images/products/takeaway.jpg" },
  { id:"bag-olongo", name:"Olongon Bags", category:"bags", unit:"Per bundle", note:"Traditional market pack size.", img:"images/products/olongon.jpg" },
  { id:"bag-table", name:"Table Rubber", category:"bags", unit:"Per roll", note:"Table covering rubber for stalls & kitchens.", img:"images/products/table-rubber.jpg" },
  { id:"bag-banku", name:"Banku Rubber", category:"bags", unit:"Per bundle", note:"Sized for banku & swallow portions.", img:"images/products/banku-rubber.jpg" },
  { id:"bag-icewater", name:"Ice Water & Block Rubber", category:"bags", unit:"Per bundle", note:"For sachet ice water and ice blocks.", img:"images/products/ice-water.jpg" },
  { id:"bag-edwa", name:"Edwa Bag", category:"bags", unit:"Per bundle", note:"Traditional Edwa-style pack.", img:"images/products/edwa.jpg" },
  { id:"bag-breadonion", name:"Bread & Onion Rubber", category:"bags", unit:"Per bundle", note:"Ventilated bags for bread and onions.", img:"images/products/bread-onion.jpg" },
  { id:"bag-plantain", name:"Plantain Chips Rubber (All Sizes)", category:"bags", unit:"Per bundle", note:"Small to large sizes for chips packaging.", img:"images/products/plantain-chips.jpg" },

  // ---- Disposables ----
  { id:"disp-bowls", name:"Disposable Bowls (All Kinds)", category:"disposables", unit:"Per pack", note:"Assorted sizes for soups & stews.", img:"images/products/bowls.jpg" },
  { id:"disp-plates", name:"Disposable Plates", category:"disposables", unit:"Per pack", note:"For parties, funerals & everyday serving.", img:"images/products/plates.jpg" },
  { id:"disp-cups", name:"Disposable Cups", category:"disposables", unit:"Per pack", note:"Assorted sizes for drinks.", img:"images/products/disp-cups.jpg" },
  { id:"disp-teacups", name:"Tea Cups with Lids", category:"disposables", unit:"Per pack", note:"Leak-resistant lidded cups.", img:"images/products/tea-cups.jpg" },
  { id:"disp-cutlery", name:"Spoons & Forks", category:"disposables", unit:"Per pack", note:"Disposable cutlery sets.", img:"images/products/cutlery.jpg" },
  { id:"disp-icecream", name:"Ice Cream Cups", category:"disposables", unit:"Per pack", note:"For ice cream & desserts.", img:"images/products/icecream-cups.jpg" },
  { id:"disp-straw", name:"Drinking Straws", category:"disposables", unit:"Per pack", note:"Assorted straws.", img:"images/products/straws.jpg" },
  { id:"disp-toothpick", name:"Toothpicks", category:"disposables", unit:"Per pack", note:"Individually packed toothpicks.", img:"images/products/toothpicks.jpg" },

  // ---- Bottles ----
  { id:"bot-sobolo", name:"Sobolo / Kenkey Bottles (All Sizes)", category:"bottles", unit:"Per dozen", note:"For sobolo, kenkey soup & sauces.", img:"images/products/sobolo-bottles.jpg" },
  { id:"bot-pharma", name:"Pharma / Eduro Bottles", category:"bottles", unit:"Per dozen", note:"For herbal & pharmaceutical liquids.", img:"images/products/pharma-bottles.jpg" },
  { id:"bot-capsule", name:"Capsule Containers", category:"bottles", unit:"Per pack", note:"Small containers for capsules & tablets.", img:"images/products/capsule-containers.jpg" },
  { id:"bot-shito", name:"Shito Bottles", category:"bottles", unit:"Per dozen", note:"For packaging pepper sauce.", img:"images/products/shito-bottles.jpg" },
  { id:"bot-gallons", name:"Gallons (All Sizes)", category:"bottles", unit:"Per piece", note:"Storage & transport gallons, assorted sizes.", img:"images/products/gallons.jpg" },

  // ---- Household & packaging ----
  { id:"hh-tissue", name:"Tissue Paper (All Kinds)", category:"household", unit:"Per pack", note:"Facial & multi-purpose tissue.", img:"images/products/tissue.jpg" },
  { id:"hh-trolls", name:"Toilet Rolls", category:"household", unit:"Per pack", note:"Household toilet paper.", img:"images/products/t-rolls.jpg" },
  { id:"hh-ziplock", name:"Ziplock Bags", category:"household", unit:"Per pack", note:"Resealable storage bags.", img:"images/products/ziplock.jpg" },
  { id:"hh-chairs", name:"Plastic Chairs", category:"household", unit:"Per piece", note:"Durable plastic chairs for home & events.", img:"images/products/plastic-chairs.jpg" },
  { id:"hh-mop", name:"Mopping Sticks & Brooms", category:"household", unit:"Per piece", note:"Cleaning tools for home & shop.", img:"images/products/mop-broom.jpg" },
  { id:"hh-package", name:"Assorted Package Bags", category:"household", unit:"Per bundle", note:"Mixed sizes for retail packaging.", img:"images/products/package-bags.jpg" },
  { id:"hh-sallopain", name:"Sallopain Wrappers", category:"household", unit:"Per roll", note:"Wrapping material for goods.", img:"images/products/sallopain.jpg" },
  { id:"hh-ribbons", name:"Ribbons", category:"household", unit:"Per roll", note:"Assorted colours for gift & packaging.", img:"images/products/ribbons.jpg" },

  // ---- Popcorn ----
  { id:"pc-corn", name:"Popcorn Corn", category:"popcorn", unit:"Per kg / bag", note:"Quality corn for popcorn making.", img:"images/products/popcorn-corn.jpg" },
];

function sabvLoadProducts(){
  try{
    const raw = localStorage.getItem(SABV_STORAGE_KEY);
    if(!raw){
      localStorage.setItem(SABV_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS.slice();
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCTS.slice();
  }catch(e){
    console.error("SAB Ventures: could not read products", e);
    return DEFAULT_PRODUCTS.slice();
  }
}

function sabvSaveProducts(list){
  try{
    localStorage.setItem(SABV_STORAGE_KEY, JSON.stringify(list));
    return true;
  }catch(e){
    console.error("SAB Ventures: could not save products", e);
    return false;
  }
}

function sabvAddProduct(product){
  const list = sabvLoadProducts();
  product.id = "p" + Date.now().toString(36);
  list.unshift(product);
  sabvSaveProducts(list);
  return list;
}

function sabvDeleteProduct(id){
  const list = sabvLoadProducts().filter(p => p.id !== id);
  sabvSaveProducts(list);
  return list;
}

function sabvResetToDefaults(){
  sabvSaveProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS.slice();
}

function sabvCategoryLabel(id){
  const c = SABV_CATEGORIES.find(c => c.id === id);
  return c ? c.short : id;
}
