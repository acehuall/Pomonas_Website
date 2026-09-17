# Pomona's

A food-lifestyle marketing site for Pomona's, built with React 19, TypeScript, React Router 7, Vite and Tailwind CSS v4. It includes Home, About, Services, Merchandise and Contact, with Formspree contact/newsletter forms and product enquiry links. The existing brand colours, fonts and component layout are retained.

## Local setup

Use Node.js 22.12 or newer (Node 22 LTS is the deployment default).

```sh
npm install
cp .env.example .env
npm run dev
```

Before testing real submissions, fill in `.env`:

```dotenv
VITE_FORMSPREE_CONTACT_ID=your-contact-form-id
VITE_FORMSPREE_NEWSLETTER_ID=your-newsletter-form-id
```

Use the IDs from the two Formspree endpoints (`https://formspree.io/f/<id>`), not full URLs. Configure and verify their destination inboxes in Formspree. Set up the newsletter form's intended subscriber handling there; this website only submits the email address to that form. Vite exposes `VITE_*` values in the client bundle: do not put private API keys in these variables. `.env` and environment-specific files are gitignored; `.env.example` is committed.

Restart the dev server after changing environment variables. If a form ID is absent or submission fails, the page shows an inline email fallback and keeps the entered values. A request times out after 20 seconds. Successful submissions replace the form with a confirmation.

## Build and verify

```sh
npm test
npm run build
npx tsc --noEmit
npm run preview
```

The automated tests use a simulated DOM and mocked requests. They cover form validation, Enter submission, loading and success states, duplicate prevention, error/retry/timeout handling, missing configuration, all six product enquiry links, shared product prices, route links, mobile-menu state and the 404 page. They never send test emails or create subscribers.

Complete a browser check on desktop and at **375px** width: visit all five pages, follow every call to action and product enquiry, open/close the mobile menu (including Escape), check keyboard navigation and the horizontal product strip, and refresh directly on `/about`. Check `/does-not-exist` and its home link. With configured forms, submit controlled test messages and verify their receipt in Formspree and the intended inbox/subscriber destination.

Validation during this change: production build and typecheck pass; automated tests pass; HTTP requests to every route, including `/about`, return the SPA document from `npm run preview`. The available browser could not connect to the local server, so visual equivalence, a real 375px viewport and browser click-through remain unverified. Live Formspree delivery also remains unverified because no form IDs were supplied.

## Images

All ten images are imported from `src/assets/images/` and bundled locally. Product images have a maximum edge of 1000px; the other images have a maximum edge of 1600px. Every file is WebP at quality 80, below 250 KB, with explicit image dimensions and asynchronous decoding. Only the Home hero is prioritised; other images load lazily.

Rerun the reproducible Sharp conversion:

```sh
npm run optimise:images
```

The script `scripts/optimise-images.mjs` reads the original eight photos from commit `472bffebe5d2aaa8391a3d7ebe48cfcbfe9f536d`. Keep full Git history available (`git fetch --unshallow` if this is a shallow clone). It downloads the two original Home photos from Unsplash if they are not already cached in the ignored `.cache/image-sources/` folder. Internet access is needed for the first download; a proxy-only environment can use Node 24 with `NODE_USE_ENV_PROXY=1`.

Alternatively, supply a folder containing originals with the old `Photos/` filenames:

```sh
node scripts/optimise-images.mjs /path/to/original-photos
```

Edit the source manifest in the script when adding/replacing assets. The script also regenerates `src/assets/images/index.ts` with their actual dimensions and `scripts/image-report.json` with byte counts. Do not use optimised WebP files as originals for repeated lossy conversion. Builds use the committed WebP files and do not run the image script.

Image totals (unique source files, including the two downloaded Unsplash responses): **10,708,625 bytes → 683,092 bytes**, a **93.6% reduction**. The original `Photos/` alone held 10,011,036 bytes. The downloaded Unsplash photos remain credited in the image script and generated asset module.

## Product and contact data

`data/products.ts` is the single source for names, descriptions, images, enquiry IDs and prices. Merchandise renders every product; Home renders `products.filter(p => p.featured)`. Prices retained from the original Merchandise page are: jewellery £55, tea towel £18, cap £18, art print £45, net bag £15 and vase £73. The jewellery description makes no material claims.

The public contact email lives in `data/contact.ts`. The studio address and placeholder social icons were removed as requested. No replacement location or social profile has been invented.

## Deploy to Netlify

1. Import this GitHub repository into Netlify and select the branch you intend to deploy.
2. Use **`npm run build`** as the build command and **`dist`** as the publish directory. These settings and Node 22 are recorded in `netlify.toml`.
3. Set `VITE_FORMSPREE_CONTACT_ID` and `VITE_FORMSPREE_NEWSLETTER_ID` in Netlify's environment variables for the relevant deploy contexts **before building**. Rebuild after changing either value.
4. Deploy and repeat the browser/form checks above on the deployed URL. Confirm a direct refresh of `/about` works.

`public/_redirects` contains `/* /index.html 200` and is copied into `dist/`, allowing BrowserRouter routes to load directly on Netlify. Vite's preview server also provides an SPA fallback, but it is not a production server. Unknown client routes display the on-brand 404 view; like most SPA fallbacks, their initial HTTP response is 200.

## Before launch

- **TODO:** confirm `hello@pomona.studio` is the correct, monitored contact address (`data/contact.ts`).
- **TODO:** provide both Formspree IDs and configure/verify their destinations (`.env.example`). Test real delivery after deployment.
- Complete the outstanding desktop/mobile browser and visual checks described above.

No live deployment or production form submission was performed as part of these changes.
