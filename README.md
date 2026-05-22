# PCU Global — Petra Christian University International Office Website

A single-page application (SPA) for the PCU International Office, showcasing inbound and outbound academic programs, campus facilities, news, and contact information for prospective international students and partners.

---

## Project Structure

```
├── index.html          # Main HTML file — pages injected at load time; admin modals and FAB included
├── CSS/
│   ├── styles.css          # Custom styles, animations, page color themes, and PCU brand variables
│   ├── tailwind.src.css    # Tailwind source (directives only — compiled to tailwind.build.css)
│   └── tailwind.build.css  # Compiled and minified Tailwind output (committed; regenerated on build)
├── JS/
│   ├── main.js         # Navigation (hash routing), Supabase client init, modals, visit tracking, trending list
│   ├── admin.js        # Admin system — Supabase Auth login, article/OSE/internship CRUD
│   ├── data/
│   │   └── news.js     # Static news seed data and news page renderer (trending populated at runtime)
│   └── pages/          # One render function per page, grouped by nav section
│       ├── home.js
│       ├── news.js
│       ├── about/
│       │   ├── pcu-at-glance.js
│       │   ├── facilities.js
│       │   └── contact-us.js
│       ├── inbound/
│       │   ├── semester-exchange.js
│       │   ├── international-degree.js
│       │   ├── international-community-outreach-program.js
│       │   └── indonesian-spectrum.js
│       ├── outbound/
│       │   ├── outbound-semester-exchange.js
│       │   ├── joint-double-degree.js
│       │   └── internship.js
│       ├── partnership/
│       │   ├── international-partnership.js
│       │   ├── domestic-partnership.js
│       │   ├── consortium-association.js
│       │   └── meet-us.js
│       └── life-at-pcu/
│           ├── how-to-get-to-pcu.js
│           ├── accommodation.js
│           ├── preparation-arrival-guide.js
│           └── visa-immigration.js
├── Assets/
│   ├── Data/
│   │   ├── Meeting Request Form.docx   # Offline version of the partnership meeting request form
│   │   └── News Form.docx              # Offline template for submitting news article content
│   ├── Graphics/
│   │   ├── logo-UKP.svg
│   │   └── Petra Graphic Asset/
│   │       └── *.svg               # Decorative background illustrations
│   └── Images/
│       ├── Accreditation/          # Accreditation certificate images
│       ├── Facilities/             # Campus facility photos
│       ├── Faculty/                # Faculty photos
│       ├── Flag/                   # Country flag images
│       ├── Foto Rektorat/          # Rector office photos
│       ├── Gedung Petra/           # PCU building photos
│       ├── ICOP/                   # ICOP program photos
│       ├── Industries/             # Industry partner logos (~71 logos)
│       ├── Logo/                   # International partner university logos, organized by country
│       ├── Partnership/            # Partnership event photos
│       ├── Student Exchange/       # Student exchange program photos
│       └── Thumbnails/             # Thumbnail images
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql  # Full schema: pcu_global tables + RLS policies + increment_article_visits RPC
│   └── functions/
│       └── send-meeting-email/
│           └── index.ts            # Deno Edge Function — triggered by DB webhook on meeting_requests INSERT; sends email via Resend
├── scripts/
│   └── fix_news.py     # One-time dev utility — see note below (safe to ignore)
├── package.json        # npm scripts: build (minify) and dev (watch) for Tailwind CSS
├── tailwind.config.js
├── postcss.config.js
├── vercel.json         # Vercel deploy config — runs npm run build, serves repo root
├── .gitignore
└── README.md
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| HTML5 | Page structure and SPA page sections |
| [Tailwind CSS v3.4](https://tailwindcss.com) | Utility-first styling — built locally from `CSS/tailwind.src.css` |
| [Lucide Icons v0.263](https://lucide.dev) | Icon library (loaded via CDN) |
| [DM Sans + Playfair Display](https://fonts.google.com) | Typography (loaded via Google Fonts) |
| Vanilla JavaScript | Hash routing, animations, and dynamic page rendering |
| [Supabase](https://supabase.com) | PostgreSQL database, Auth (email+password), Row Level Security, Edge Functions |
| [Resend](https://resend.com) | Transactional email for meeting request notifications |
| Deno | Runtime for the `send-meeting-email` Supabase Edge Function |

The frontend requires no runtime build step for development — open `index.html` directly. Run `npm run build` to regenerate the compiled Tailwind CSS before deploying. All other JS dependencies are loaded via CDN.

---

## Pages

Navigation is handled client-side via `navigateTo(pageId)`, which pushes `#pageId` to the browser history. Direct links (`example.com/#semester-exchange`) and browser back/forward both work via a `hashchange` listener. The following pages are available:

**About**
- `home` — Hero carousel, stats counters, and program overview
- `pcu-at-glance` — University facts and figures
- `facilities` — Campus facilities
- `news` — International news carousel
- `contact-us` — Staff directory and contact details

**Inbound Programs**
- `semester-exchange` — Incoming exchange semester program
- `intl-degree` — International degree program
- `cop` — International Community Outreach Program
- `indonesian-spectrum` — Indonesian SPECTRUM program

**Outbound Programs**
- `outbound-semester-exchange` — Outgoing exchange semester program
- `joint-double-degree` — Joint/Double Degree program
- `internship` — Internship opportunities

**Partnership**
- `international-partnership` — International partner universities
- `domestic-partnership` — Domestic/national partner institutions
- `consortium-association` — Consortium and association memberships
- `partnership-meet-us` — Partnership contact and meeting information

**Life at PCU**
- `how-to-get` — Directions and transport to PCU
- `accommodation` — Student housing options *(placeholder — content pending)*
- `preparation-arrival` — Arrival guide for incoming students
- `visa-immigration` — Visa and immigration information

> **Note for IT team:** The `accommodation` page is still a placeholder. Do not link it from public-facing navigation until full content is provided.

---

## Key Features

- **Hash Routing** — `navigateTo(pageId)` pushes `#pageId` to history; `hashchange` handles back/forward and direct deep-links
- **Modular JS Pages** — Each page section lives in its own render function file under `JS/pages/`, keeping `main.js` focused on navigation and shared logic
- **Meeting Request Form** — Multi-step modal form (institution details → meeting details → guest list) that writes directly to `pcu_global.meeting_requests` in Supabase via the JS client; a database webhook fires the `send-meeting-email` Edge Function to send an email via Resend
- **Admin News System** — Role-based admin panel (Inbound / Outbound / Partnership / Head) for creating, editing, and deleting news articles; articles are persisted in `pcu_global.articles` in Supabase and merged with static seed data at runtime
- **Article Image Upload** — Drag-and-drop or file-picker image upload in the article form; images stored as base64 data URLs in the `image_url` column
- **Article Visit Tracking** — Each article view calls the `increment_article_visits` Supabase RPC; the News page sidebar "Trending" list is sorted by visit count in real time
- **Dynamic Article Pages** — Admin-published articles generate full detail pages on the fly (`renderAdminArticlePage`) and are injected into `#adminArticlePages`; no page reload required
- **Hero Carousel** — Auto-advancing slides with navigation arrows and dot indicators
- **Scroll Reveal Animations** — Sections fade in as they enter the viewport via `IntersectionObserver`
- **Animated Stat Counters** — Numbers count up when scrolled into view
- **Flip Cards** — Hover-to-flip program cards (CSS 3D transforms)
- **Program Type Selector** — Animated slide-in/out transitions for Joint vs Double Degree content
- **OSE University Popup Cards** — Each university card on the Outbound Semester Exchange page is clickable and opens a detail popup; data is fetched from `pcu_global.ose_programs` and merged by university name with the base partner list
- **Admin OSE Manager** — A "Manage Universities" button in the admin FAB opens `ose-manager-modal`; admins can add custom university entries or edit/delete program details via Supabase
- **Internship Partner Filtering** — The Internship page splits partners into International/Domestic tabs with a live search input, domestic sub-type filter, partner count label, and a paginated "Show More" button
- **Internship Opportunities CMS** — Admin-managed internship listings (position, company, apply link) stored in `pcu_global.internship_opportunities`; displayed as cards below the partner grid on the Internship page
- **International Partnership Modal** — Drill-down modal: continent → country → individual partner details, populated from `intlLogoFiles` in `main.js`
- **International Partner Logo Carousel** — Auto-scrolling marquee of partner university logos
- **Domestic Partnership Modal** — Institution detail modal with categorized partner cards and toggleable sections
- **Domestic Partner Logo Carousel** — Auto-scrolling marquee of domestic partner logos (pauses on hover)
- **Page Color Theming** — Each section group applies its own accent color via CSS overrides: Inbound (Sky), Outbound (Orange), Partnership (Purple), Life at PCU (Green), About (Navy)
- **Partner Maps** — Interactive partner university maps with tooltips and popups
- **News Carousel** — Dynamically rendered news card carousel
- **Mobile Menu** — Slide-in drawer navigation for small screens
- **Element SDK Integration** — Supports runtime config (colors, fonts, headings) via `window.elementSdk` if available
- **Floating Background Decorations** — Animated SVG linework graphics in the background

---

## Brand Colors

Defined as CSS custom properties in `styles.css` and extended into Tailwind via `tailwind.config.js`:

| Variable | Hex |
|---|---|
| `--pcu-navy` / `--pcu-blue` | `#1d446e` |
| `--pcu-sky` | `#30aeb4` |
| `--pcu-red` | `#f7000d` |
| `--pcu-orange` | `#fa6632` |
| `--pcu-yellow` / `--pcu-gold` | `#fdd600` |
| `--pcu-purple` | `#8d4bb1` |
| `--pcu-green` | `#52ac2d` |
| `--pcu-magenta` | `#fa207d` |
| `--pcu-white` | `#ebe6e5` |

---

## Getting Started

### Frontend

No build step is required to run the site locally:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (recommended to avoid CORS issues with SVG assets)
npx serve .
# or
python -m http.server 8080
```

> **Note:** SVG background assets are loaded as CSS `background-image` URLs. A local server is recommended so these resolve correctly.

To work on styles, rebuild the compiled Tailwind CSS:

```bash
npm install          # first time only
npm run dev          # watch mode — rebuilds CSS/tailwind.build.css on save
npm run build        # one-shot minified build (required before deploying)
```

### Backend (Supabase)

All backend functionality (database, auth, and email) runs on Supabase. No local server is required.

**1. Create a Supabase project**

Go to [supabase.com](https://supabase.com), create a new project, and note your **Project URL** and **anon public key**.

**2. Run the database migration**

In Supabase Dashboard → SQL Editor, paste and run `supabase/migrations/001_initial_schema.sql`. This creates the `pcu_global` schema, all four tables, RLS policies, and the `increment_article_visits` RPC.

**3. Create admin users**

In Supabase Dashboard → Authentication → Users, create one user per admin role:

| Email | Intended role |
|---|---|
| `admin.inbound@petra.ac.id` (or any email) | Inbound |
| `admin.outbound@petra.ac.id` | Outbound |
| `admin.partnership@petra.ac.id` | Partnership |
| `admin.head@petra.ac.id` | Head |

The role/tag mapping for each email is defined in the `ADMIN_ROLES` object at the top of `JS/admin.js`. Update that object if you use different email addresses.

**4. Update the Supabase credentials in the frontend**

At the top of `JS/main.js`, update:

```js
const SUPABASE_URL      = 'https://<your-project-ref>.supabase.co';
const SUPABASE_ANON_KEY = '<your-anon-key>';
```

**5. Deploy the `send-meeting-email` Edge Function**

The meeting request email is sent by a Supabase Edge Function triggered via a database webhook.

```bash
# Install the Supabase CLI if needed: https://supabase.com/docs/guides/cli
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy send-meeting-email
```

Then set the required secret in Supabase Dashboard → Edge Functions → Secrets:

| Secret | Value |
|---|---|
| `RESEND_API_KEY` | Your API key from [resend.com](https://resend.com) |
| `RECIPIENT_EMAIL` | Who receives meeting request notifications (default: `io@petra.ac.id`) |
| `FROM_EMAIL` | Verified sender address in Resend (default: `PCU Global <noreply@yourdomain.com>`) |

**6. Create the database webhook**

In Supabase Dashboard → Database → Webhooks → Create Webhook:
- Table: `meeting_requests` (in schema `pcu_global`)
- Events: `INSERT`
- Type: Supabase Edge Functions
- Function: `send-meeting-email`

---

## Deployment

### Frontend (Vercel)

The frontend is deployed on **Vercel**. The `vercel.json` config runs `npm run build` before serving the repo root as a static site.

To redeploy or self-host on Vercel:

1. Connect the GitHub repository to your Vercel project.
2. Vercel will automatically detect `vercel.json` and run `npm run build` before each deploy.
3. No additional environment variables are needed on Vercel — the Supabase credentials are hardcoded in `JS/main.js` (the anon key is safe to expose publicly; RLS enforces access control server-side).

To self-host on any static server instead:

1. Run `npm run build` locally to generate `CSS/tailwind.build.css`.
2. Copy the repository folder (excluding `node_modules/`) to your web server's public directory.
3. No `.htaccess` rewrite rules are needed — all navigation is handled client-side via JavaScript.
4. Verify that the `Assets/` folder and all subfolders are accessible. Several folder names contain spaces (`Assets/Graphics/Petra Graphic Asset/`, `Assets/Images/Foto Rektorat/`, etc.) — confirm your server handles these correctly, or rename them and update all references in `index.html`, `styles.css`, and `main.js`.

### Backend (Supabase)

No separate backend deployment is needed. The database, auth, and Edge Function all run on Supabase's managed infrastructure. See [Getting Started → Backend](#backend-supabase) above for setup steps.

---

## Admin System

The site includes a lightweight CMS for managing news articles, OSE programs, and internship opportunities. All data is persisted in Supabase (PostgreSQL + RLS), so changes are shared across all devices and browsers instantly.

### Roles & Access

| Email (example) | Role | Publishes to tag |
|---|---|---|
| `admin.inbound@…` | Inbound | `#inboundstudents` |
| `admin.outbound@…` | Outbound | `#outboundstudents` |
| `admin.partnership@…` | Partnership | `#partnership` |
| `admin.head@…` | Head | Any tag (unrestricted) |

The email-to-role mapping is defined in `ADMIN_ROLES` at the top of `JS/admin.js`. Authentication is handled by Supabase Auth (`signInWithPassword`); the Supabase session token is stored in `sessionStorage`. RLS policies on the `pcu_global` tables enforce write access to authenticated users only.

### How it works

1. Click the **Admin** button (bottom-right corner) to open the login modal.
2. `admin.js` calls `supabase.auth.signInWithPassword({ email, password })`; on success, the Supabase session is stored in `sessionStorage`.
3. A floating action button (FAB) appears with **Add Article**, **Manage Universities** (OSE), and **Sign Out** options.
4. The article form collects: title, excerpt, body paragraphs, key highlights, contact info, tag, and an optional image (drag-and-drop or file picker — stored as a base64 data URL in the `image_url` column).
5. On submit, `admin.js` upserts the article directly to `pcu_global.articles` via the Supabase JS client. `refreshNewsData()` merges the updated data with the static seed articles from `JS/data/news.js`.
6. Admins can edit or delete their own articles; the `Head` role can manage all articles.
7. **OSE university management** — Clicking "Manage Universities" opens `ose-manager-modal`. The admin can create, edit, or delete entries in `pcu_global.ose_programs`. Custom entries (`is_custom=true`) appear as extra cards on the OSE page; base universities from `oseBasePartners` can have program details attached by name-matching.
8. **Internship opportunity management** — On the Internship page, admins see an "Add Opportunity" button. Saved opportunities are fetched from `pcu_global.internship_opportunities` and displayed as cards.
9. Every article view calls `supabase.rpc('increment_article_visits', { article_id })` to increment the server-side counter. The News page "Trending" sidebar is sorted by `visits` descending.

---

## Known Dependencies & Limitations

**External image URLs (Unsplash)**
Several news article pages (`page-news-1` through `page-news-6`) load hero images from `https://images.unsplash.com`. These are placeholder images used during development. Before going live, replace them with actual PCU-owned images hosted locally or on a CDN.

**CDN dependencies**
Lucide Icons and Google Fonts are loaded from CDN. If the site needs to work in an offline or intranet environment, these assets must be downloaded and self-hosted. Tailwind CSS is now built locally and committed — it does not require a CDN at runtime.

**Supabase anon key**
The Supabase anon key in `JS/main.js` is intentionally public — it is the client-side key designed for browser use. Database access is controlled entirely by Row Level Security policies defined in `001_initial_schema.sql`. Do not replace it with the `service_role` key.

**Admin sessions**
Supabase Auth sessions are stored in `sessionStorage` and expire according to Supabase's JWT TTL (default 1 hour). Sessions are not shared across tabs. To extend session lifetime, update the JWT expiry in Supabase Dashboard → Authentication → Settings.

**Partner logo paths**
International partner logos are referenced as relative paths inside `intlLogoFiles` in `main.js`, resolved under `Assets/Images/Logo/<Country>/`. If logos are added, renamed, or reorganized, that array must be updated to match.

**Page render functions**
Each page is a standalone `render*()` function in `JS/pages/<section>/<page>.js`. When adding a new page, create the render file, add a `<script src="...">` tag plus a matching mount-point call in `index.html` (see the existing entries near line 420–458), and register the page ID in `main.js`.

**`Assets/Images/` folder size**
The `Assets/Images/` directory contains a large number of images (logos, facilities, faculty, etc.). Ensure your web server or CDN is configured to serve these files efficiently, and verify that folder names with spaces (e.g. `Foto Rektorat/`, `Petra Graphic Asset/`) are handled correctly by your deployment pipeline.

---

## About `scripts/fix_news.py`

This is a **one-time developer utility** that was used during development to replace a static banner in the News page with a dynamic carousel. It has already been applied — the result is baked into `index.html`.

**The IT team does not need to run this script.** It is kept in `scripts/` for reference only and can be safely ignored or deleted.

---

## Runtime Configuration (Element SDK)

If `window.elementSdk` is present on the page (e.g. when embedded in a CMS or page builder), the site supports live editing of:

- Hero title and subtitle
- Section headings (Stats, Study, News)
- Background, surface, text, primary, and secondary colors
- Font family and base font size

These are configured via `defaultConfig` at the top of `main.js`.

---

## Contact

**Zefanya Kharisma Nugroho, S.Hub.Int.**
Surabaya, Indonesia
📧 Personal: [zefanya.kharisma@gmail.com](mailto:zefanya.kharisma@gmail.com)
📧 Work: [zefanya.kharisma@petra.ac.id](mailto:zefanya.kharisma@petra.ac.id)

Social media: [Instagram](https://www.instagram.com/joshuazefanya_) · [LinkedIn](https://www.linkedin.com/in/zefanyakharisma)

---

© 2025–2026 Zefanya Kharisma Nugroho — Petra Christian University. All rights reserved.
