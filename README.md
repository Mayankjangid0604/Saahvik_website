# SAAHVIK — Smarter Hostel Management

A premium **Coming Soon / Early Access** website for SAAHVIK, a next-generation
hostel management platform. Built as a polished, single-page SaaS landing
experience with luxury design language: **Deep Navy · Champagne Gold · Cream
Ivory · White**.

> Live preview is served from the Next.js app in this repo. The legacy
> standalone `index.html` (a static multi-step discovery form from an earlier
> iteration) is kept at the repo root for reference and is **not** part of the
> Next.js build.

## ✨ Highlights

- **15 sections** — hero, about, why-we're-building, problems, future platform,
  core modules, comparison, roadmap, early access, help-build, contact, footer.
- **Feature Suggestion wizard** — an 8-step premium modal with a drag-and-drop
  priority ranking (Framer Motion `Reorder`) and an animated success screen.
  The form lives **only inside the modal**, as specified.
- **Dark / Light themes** — deep navy ↔ cream ivory, with a no-flash boot
  script and persisted preference.
- **Motion** — scroll-reveal, staggered grids, animated gradients, floating
  decor, a logo-driven loading animation, and hover micro-interactions.
- **Accessible & responsive** — semantic roles, `prefers-reduced-motion`
  support, keyboard-dismissible modal, and a fully mobile-first layout.

## 🧱 Tech Stack

| Concern      | Choice                          |
| ------------ | ------------------------------- |
| Framework    | Next.js 14 (App Router)         |
| Language     | TypeScript                      |
| Styling      | Tailwind CSS (custom tokens)    |
| Animation    | Framer Motion                   |
| Icons        | Lucide React                    |
| Fonts        | Fraunces (display) · Manrope    |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## 📁 Structure

```
app/
  layout.tsx          # fonts, metadata, theme boot script, providers
  page.tsx            # section composition
  globals.css         # theme tokens + premium utilities
  icon.png            # favicon (the brand fleur-de-lis ornament)
components/
  Providers.tsx       # Theme + Modal context providers
  ThemeProvider.tsx   # dark/light state, persisted
  ModalProvider.tsx   # opens the feature-suggestion modal anywhere
  FeatureModal.tsx    # the 8-step wizard (incl. drag-and-drop ranking)
  Navbar.tsx · Loader.tsx · ThemeToggle.tsx · BackToTop.tsx · SaahvikLogo.tsx
  ui/                 # Reveal, SectionHeading, Aurora (decorative bg)
  sections/           # Hero, About, ... Contact, Footer
lib/
  data.ts             # all copy/content + option sets (single source of truth)
  api.ts              # 🔌 backend integration seam (see below)
  utils.ts            # cn() class helper
```

## 🔌 Backend Integration

All form submissions flow through **`lib/api.ts`** — the single seam between the
UI and a future backend:

- `submitEarlyAccess(payload)` — waiting-list capture.
- `submitFeatureSuggestion(payload)` — the full wizard payload (a flat,
  serialisable object that maps 1:1 to a spreadsheet row or DB record).

Every submission is always saved to `localStorage` first (nothing is ever
lost), then — if configured — delivered two ways in parallel:

### 1. Email notification (Web3Forms)

1. Go to **https://web3forms.com** and enter the inbox that should receive
   submissions (e.g. `contact@saahvik.com`) in "Create Access Key".
2. Check that inbox, click the verification link, copy the **Access Key**.
3. In Cloudflare → `saahvikwebsite` project → **Settings** → **Variables and
   Secrets**, add:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = *(your access key)*
4. Redeploy. Every submission now emails that inbox with all fields.

### 2. Google Sheet log (Apps Script — recommended if you have Workspace)

1. Create a new Google Sheet (e.g. "SAAHVIK Submissions").
2. **Extensions → Apps Script**, paste in the contents of
   `scripts/google-apps-script.gs` (full setup notes are in that file).
3. **Deploy → New deployment → Web app** — Execute as **Me**, access
   **Anyone** — Deploy, authorize, copy the Web app URL
   (`https://script.google.com/macros/s/.../exec`).
4. In Cloudflare, add another variable:
   - `NEXT_PUBLIC_GAS_ENDPOINT` = *(that Web app URL)*
5. Redeploy. Every submission now also appends a row to an
   auto-created **"Early Access"** or **"Feature Suggestions"** tab in that
   sheet — instant spreadsheet of every response, filterable/exportable.

Both are independent — enable either, both, or neither. With neither set, the
site still works fully; submissions just stay in the visitor's browser.

## ☁️ Deployment (Cloudflare Pages)

The site is a **static export** (`output: "export"` → `out/`) deployed via
**Cloudflare Pages**. This avoids `wrangler deploy`'s Next.js/OpenNext auto-
setup wizard, which forces an SSR build and rejects our Next 14 static site.

### One-time Cloudflare dashboard change

Open the Cloudflare Workers/Pages dashboard for this project and set the
**Deploy Command** to:

```
npm run deploy:ci
```

(`deploy:ci` runs `wrangler pages deploy out --project-name=saahvikwebsite`.)
Keep the **Build Command** as `npm run build`. That's the entire fix — no
OpenNext, no Next.js runtime-version constraints.

### Local build & deploy

```bash
npm run build   # → ./out
npm run deploy  # build + push to Cloudflare Pages
```

---

© 2026 SAAHVIK. All Rights Reserved.
