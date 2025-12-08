# Introduction
This shopping site showcases droids and vehicles with:
- Client-side routing (`src/app.js`) for Home, Browse, Product detail, Checkout, Order History, and 404.
- Product catalog fed by locale-driven strings (`src/content/products.js` + `src/content/<locale>/strings.json`).
- Cart drawer with quantity updates and persistence via `localStorage`.
- Checkout form with terms link and totals rendered in locale-aware currency/date using `Intl`.
- Locale selector that reloads strings/products and remembers choice in `localStorage`.

Built with vanilla JS modules (`src/views/*`), `live-server` for dev, and `Intl` for formatting.

# Localization Plan
- Project brief and assets: https://www.canva.com/design/DAG6zp4PUjw/MpxGW5QW9NQnB27aYVmkpA/edit
- Strings: `src/content/<locale>/strings.json` (current locales: `en-US`, `zh-CN`).
- Terms pages: `src/static/<locale>/terms.html`.
- Currency/date: handled via `src/services/i18n.js` with `Intl`.

# Adding a Locale
1) Copy `src/content/en-US/strings.json` to `src/content/<locale>/strings.json` and translate values.
2) Add `src/static/<locale>/terms.html` so the checkout terms link resolves.
3) Add the locale option label under `LocaleSelector` in each bundle.
4) Update the currency map in `src/services/i18n.js` if the locale uses a new currency code.

# How to Run
```bash
npm install
npm run server
```
Open the URL printed by `live-server` (default http://127.0.0.1:8080).

# Reflection
- Julia: see slide deck (link above).
- Cathy: see slide deck (link above).
- Ruiyi: see slide deck (link above).
- Yanlin: https://www.notion.so/Reflection-2c38613a895e80a0b3c5cf9fd0708afe
