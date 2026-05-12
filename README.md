# PCU Global — Petra Christian University International Office Website

A single-page application (SPA) for the PCU International Office, showcasing inbound and outbound academic programs, campus facilities, news, and contact information for prospective international students and partners.

---

## Project Structure

```
├── index.html          # Main HTML file — pages injected at load time; admin modals and FAB included
├── CSS/
│   └── styles.css      # Custom styles, animations, page color themes, and PCU brand variables
├── JS/
│   ├── main.js         # Navigation (hash routing), modals, visit tracking, trending list, and SDK integration
│   ├── admin.js        # Admin system — login (Bearer token), article CRUD via backend API, image upload
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
├── backend/
│   ├── main.py             # Flask API — admin auth, article CRUD, meeting requests, email
│   ├── procfile            # Railway/Heroku process definition: `web: gunicorn main:app`
│   ├── requirements.txt    # Python dependencies (flask, flask-cors, python-dotenv, gunicorn)
│   ├── submissions.db      # SQLite database — auto-created on first run (do not edit manually)
│   └── .env                # SMTP credentials — see Backend Setup below (NOT committed to git)
├── scripts/
│   └── fix_news.py     # One-time dev utility — see note below (safe to ignore)
├── .gitignore
└── README.md
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| HTML5 | Page structure and SPA page sections |
| [Tailwind CSS v3.4](https://cdn.tailwindcss.com/3.4.17) | Utility-first styling (loaded via CDN) |
| [Lucide Icons v0.263](https://lucide.dev) | Icon library (loaded via CDN) |
| [DM Sans + Playfair Display](https://fonts.google.com) | Typography (loaded via Google Fonts) |
| Vanilla JavaScript | Hash routing, animations, and dynamic page rendering |
| Python 3 + Flask | Backend API for admin auth, article CRUD, meeting requests, and email |
| Gunicorn | Production WSGI server (defined in `backend/procfile`) |
| SQLite | Persistent storage for articles and meeting request submissions (`backend/submissions.db`) |

The frontend requires no build step — all JS dependencies are loaded via CDN. The backend requires Python 3 and the packages listed in `backend/requirements.txt`.

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
- **Meeting Request Form** — Multi-step modal form (institution details → meeting details → guest list) that `POST`s to the Flask backend, persists to SQLite, and triggers an HTML email notification
- **Admin News System** — Role-based admin panel (Inbound / Outbound / Partnership / Head) for creating, editing, and deleting news articles; articles are persisted in `localStorage` and merged with static seed data at runtime
- **Article Image Upload** — Drag-and-drop or file-picker image upload in the article form; images stored as base64 data URLs in `localStorage`
- **Article Visit Tracking** — Each article view is counted in `localStorage`; the News page sidebar "Trending" list is sorted by visit count in real time
- **Dynamic Article Pages** — Admin-published articles generate full detail pages on the fly (`renderAdminArticlePage`) and are injected into `#adminArticlePages`; no page reload required
- **Hero Carousel** — Auto-advancing slides with navigation arrows and dot indicators
- **Scroll Reveal Animations** — Sections fade in as they enter the viewport via `IntersectionObserver`
- **Animated Stat Counters** — Numbers count up when scrolled into view
- **Flip Cards** — Hover-to-flip program cards (CSS 3D transforms)
- **Program Type Selector** — Animated slide-in/out transitions for Joint vs Double Degree content
- **OSE University Popup Cards** — Each university card on the Outbound Semester Exchange page is clickable and opens a detail popup with programs, description, duration, deadline, requirements, notes, and a website link; data is fetched from `/api/ose-programs` and merged by university name with the base partner list
- **Admin OSE Manager** — A "Manage Universities" button in the admin FAB opens `ose-manager-modal`; admins can add custom university entries or edit/delete program details; saves to the `ose_programs` table via `/api/ose-programs`
- **Internship Partner Filtering** — The Internship page splits partners into International/Domestic tabs with a live search input, domestic sub-type filter (International / National / Government / Education), partner count label, and a paginated "Show More" button
- **Internship Opportunities CMS** — Admin-managed internship listings (position, company, apply link) stored in `internship_opportunities` table; admins add/edit/delete via `intern-form-modal`; displayed as cards below the partner grid on the Internship page
- **International Partnership Modal** — Drill-down modal: continent → country → individual partner details, populated from `intlLogoFiles` in `main.js`
- **International Partner Logo Carousel** — Auto-scrolling marquee of partner university logos on the International Partnership page
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

Defined as CSS custom properties in `styles.css` and extended into Tailwind via `tailwind.config`:

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

No installation is needed. Simply open `index.html` in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (recommended to avoid CORS issues with SVG assets)
npx serve .
# or
python -m http.server 8080
```

> **Note:** SVG background assets are loaded as CSS `background-image` URLs. A local server is recommended so these resolve correctly.

### Backend (Meeting Request Form)

The Meeting Request Form requires the Flask backend to be running. Without it, form submissions will fail with a fallback alert prompting users to email `head-partnership@petra.ac.id` directly.

**1. Create the `.env` file** inside `backend/`:

```
# SMTP — email notifications for meeting request submissions
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Admin passwords — required; the server will refuse to start if any are missing
PASS_INBOUND=your-inbound-password
PASS_OUTBOUND=your-outbound-password
PASS_PARTNERSHIP=your-partnership-password
PASS_HEAD=your-head-password
```

For Gmail, generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2-Step Verification). Do not commit this file — `backend/.env` is already listed in `.gitignore`.

**2. Install dependencies and start the server:**

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The server starts on `http://localhost:3001`. The SQLite database (`submissions.db`) is created automatically on first run. It contains three tables: `articles`, `ose_programs`, and `internship_opportunities`.

> For production, start with Gunicorn instead: `gunicorn main:app` (the `procfile` handles this automatically on Railway/Heroku).

**API endpoints:**

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | — | Authenticate and receive a Bearer token |
| `POST` | `/api/admin/logout` | Bearer | Invalidate the current session token |
| `GET` | `/api/articles` | — | List all published articles |
| `POST` | `/api/articles` | Bearer | Create a new article |
| `PUT` | `/api/articles/<id>` | Bearer | Update an existing article |
| `DELETE` | `/api/articles/<id>` | Bearer | Delete an article |
| `POST` | `/api/articles/<id>/visit` | — | Increment article visit counter |
| `GET` | `/api/ose-programs` | — | List all OSE university program details |
| `POST` | `/api/ose-programs` | Bearer | Create an OSE university program entry |
| `PUT` | `/api/ose-programs/<pid>` | Bearer | Update an OSE university program entry |
| `DELETE` | `/api/ose-programs/<pid>` | Bearer | Delete an OSE university program entry |
| `GET` | `/api/internship-opportunities` | — | List all admin-managed internship opportunities |
| `POST` | `/api/internship-opportunities` | Bearer | Create an internship opportunity listing |
| `PUT` | `/api/internship-opportunities/<oid>` | Bearer | Update an internship opportunity listing |
| `DELETE` | `/api/internship-opportunities/<oid>` | Bearer | Delete an internship opportunity listing |
| `POST` | `/api/submit-meeting-request` | — | Save meeting request to DB and send email |
| `GET` | `/api/submissions` | — | List all meeting request submissions (JSON) |
| `GET` | `/api/health` | — | Health check |

---

## Deployment

### Frontend (Static Files)

1. Copy the repository folder (excluding `backend/`) to your web server's public directory (e.g. `/var/www/html/international-office/`).
2. Ensure the web server (Apache/Nginx) serves `index.html` as the default document.
3. No `.htaccess` rewrite rules are needed — all navigation is handled client-side via JavaScript.
4. Verify that the `Assets/` folder and all subfolders are accessible. Several folder names contain spaces (`Assets/Graphics/Petra Graphic Asset/`, `Assets/Images/Foto Rektorat/`, etc.) — confirm your server handles these correctly, or rename them and update all references in `index.html`, `styles.css`, and `main.js`.

### Backend (Flask API)

The backend is deployed on **Railway** at:
`https://international-office-website-production.up.railway.app`

`JS/admin.js` and `JS/main.js` use this URL as `API_BASE`. To redeploy or run your own instance:

1. Push the `backend/` folder to your Railway/Heroku project (the `procfile` handles the start command: `gunicorn main:app`).
2. Add **all** required environment variables in the platform's environment settings — do not rely on a committed `.env` file:
   - SMTP: `SMTP_EMAIL`, `SMTP_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`
   - Admin passwords: `PASS_INBOUND`, `PASS_OUTBOUND`, `PASS_PARTNERSHIP`, `PASS_HEAD`
   > The server will raise a `RuntimeError` and refuse to start if any `PASS_*` variable is missing.
3. If the backend URL changes, update `API_BASE` at the top of `JS/admin.js` and the `fetch` call in `JS/main.js`.
4. The SQLite database (`submissions.db`) is ephemeral on most cloud platforms — consider migrating to a managed Postgres database for production persistence.

---

## Admin System

The site includes a lightweight CMS for managing news articles. Articles are persisted in the backend SQLite database (`articles` table), so they are shared across all devices and browsers. **The Flask backend must be running** for the admin system to work.

### Roles & Access

| Username | Role | Publishes to tag |
|---|---|---|
| `admin_inbound` | Inbound | `#inboundstudents` |
| `admin_outbound` | Outbound | `#outboundstudents` |
| `admin_partnership` | Partnership | `#partnership` |
| `admin_head` | Head | Any tag (unrestricted) |

Passwords are read from environment variables (`PASS_INBOUND`, `PASS_OUTBOUND`, `PASS_PARTNERSHIP`, `PASS_HEAD`) into `ADMIN_ACCOUNTS` in `backend/main.py`. `JS/admin.js` only stores the role/tag mapping — actual password validation happens server-side. On successful login, the server issues a random Bearer token stored in `sessionStorage`; the token is invalidated on logout or tab close.

### How it works

1. Click the **Admin** button (bottom-right corner) to open the login modal.
2. `admin.js` sends credentials to `POST /api/admin/login`; on success, the Bearer token is stored in `sessionStorage`.
3. A floating action button (FAB) appears with **Add Article**, **Manage Universities** (OSE), and **Sign Out** options.
4. The article form collects: title, excerpt, body paragraphs, key highlights, contact info, tag, and an optional image (drag-and-drop or file picker — stored as a base64 data URL in the `image_url` column).
5. On submit, the article is `POST`ed (or `PUT`ed for edits) to `/api/articles` with the Bearer token. The server saves it to SQLite and returns the saved article; `refreshNewsData()` merges it with the static seed articles from `JS/data/news.js`.
6. Admins can edit or delete their own articles; the `Head` role can manage all articles (calls `DELETE /api/articles/<id>`).
7. **OSE university management** — Clicking "Manage Universities" opens `ose-manager-modal`. The admin can create a new university entry (opens `ose-form-modal`) or edit/delete existing ones. Custom entries (`isCustom=true`) appear as extra cards on the OSE page; base universities from `oseBasePartners` can have program details attached by name-matching.
8. **Internship opportunity management** — On the Internship page, admins see an "Add Opportunity" button. Clicking it opens `intern-form-modal` (position, company with autocomplete from partner list, apply link). Saved opportunities are fetched from `/api/internship-opportunities` and displayed as cards.
7. Every article view fires a fire-and-forget `POST /api/articles/<id>/visit` to increment the server-side visit counter. The News page "Trending" sidebar is sorted by `visits` descending.

---

## Known Dependencies & Limitations

**External image URLs (Unsplash)**
Several news article pages (`page-news-1` through `page-news-6`) load hero images from `https://images.unsplash.com`. These are placeholder images used during development. Before going live, replace them with actual PCU-owned images hosted locally or on a CDN.

**CDN dependencies**
The site requires an internet connection to load Tailwind CSS, Lucide Icons, and Google Fonts. If the site needs to work in an offline or intranet environment, these assets must be downloaded and self-hosted.

**Partner logo paths**
International partner logos are referenced as relative paths inside `intlLogoFiles` in `main.js`, resolved under `Assets/Images/Logo/<Country>/`. If logos are added, renamed, or reorganized, that array must be updated to match.

**Page render functions**
Each page is a standalone `render*()` function in `JS/pages/<section>/<page>.js`. When adding a new page, create the render file, add a `<script src="...">` tag plus a matching mount-point call in `index.html` (see the existing entries near line 420–458), and register the page ID in `main.js`.

**Admin credentials**
Admin passwords are **not** stored in source code. `backend/main.py` reads them exclusively from environment variables (`PASS_INBOUND`, `PASS_OUTBOUND`, `PASS_PARTNERSHIP`, `PASS_HEAD`) and refuses to start if any are missing. `JS/admin.js` only stores the role/tag mapping — actual password validation happens server-side. To rotate a password, update the corresponding env var and restart the server. For a hardened deployment, consider replacing the static dict with a database-backed user table and hashed passwords.

**Admin sessions are in-memory**
Bearer tokens issued by `/api/admin/login` are stored in a Python dict (`admin_sessions`) in the Flask process. Restarting the server invalidates all active sessions. For multi-process or multi-server deployments, move sessions to a shared store (Redis, DB table, etc.).

**Backend API URL hardcoded**
`API_BASE` in `JS/admin.js` currently points to the Railway deployment (`https://international-office-website-production.up.railway.app`). If the backend is redeployed to a different URL, update `API_BASE` in `JS/admin.js` and the visit-tracking `fetch` in `JS/main.js`. If the backend is offline, the admin system and meeting request form fail gracefully — the form shows an alert directing users to email `head-partnership@petra.ac.id`.

**SQLite on cloud platforms**
Railway's filesystem is ephemeral — `submissions.db` may be wiped on redeployment. For durable storage, migrate to a managed database (e.g. Railway's Postgres plugin) and update the SQLite calls in `main.py` to use SQLAlchemy or `psycopg2`.

**SMTP / email config**
Email notifications require valid SMTP credentials in `backend/.env`. If the credentials are missing or incorrect, the form submission still saves to `submissions.db` but no email is sent (a warning is printed to the server console). Ensure `backend/.env` is never committed to the repository.

**`Assets/Images/` folder size**
The `Assets/Images/` directory contains a large number of images (logos, facilities, faculty, etc.). Ensure your web server is configured to serve these files efficiently, and verify that folder names with spaces (e.g. `Foto Rektorat/`, `Petra Graphic Asset/`) are handled correctly by your server or deployment pipeline.

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
