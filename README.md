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

Today these resolve locally and persist to `localStorage` so nothing is lost.
Swap the function bodies for real `fetch()` calls (markers are in the file) and
no component has to change.

## ☁️ Deployment (Cloudflare)

The site is a **static export** (`output: "export"` → `out/`) deployed as
**Cloudflare Workers static assets**. The committed `wrangler.jsonc` points at
`./out`, so `npx wrangler deploy` uploads the static files directly — no
OpenNext/SSR adapter, and therefore no Next.js runtime-version constraints.

```bash
npm run build        # produces ./out
npx wrangler deploy  # uploads ./out as static assets
```

---

© 2026 SAAHVIK. All Rights Reserved.
