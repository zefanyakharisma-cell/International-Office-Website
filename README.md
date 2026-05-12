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
│   ├── admin.js        # Admin system — login, article CRUD, image upload, localStorage persistence
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
│       └── life at pcu/
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
│   ├── server.py           # Flask API — meeting request submission and email notification
│   ├── requirements.txt    # Python dependencies (flask, flask-cors, python-dotenv)
│   ├── submissions.db      # SQLite database — auto-created on first run (do not edit manually)
│   └── .env                # SMTP credentials — see Backend Setup below (NOT committed to git)
├── fix_news.py         # One-time dev utility — see note below (safe to ignore)
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
| Python 3 + Flask | Backend API for meeting request form submission and email notifications |
| SQLite | Persistent storage for meeting request submissions (`backend/submissions.db`) |

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
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

For Gmail, generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2-Step Verification). Do not commit this file — add `backend/.env` to `.gitignore`.

**2. Install dependencies and start the server:**

```bash
cd backend
pip install -r requirements.txt
python server.py
```

The server starts on `http://localhost:3001`. The SQLite database (`submissions.db`) is created automatically on first run.

**API endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/submit-meeting-request` | Save form submission to DB and send email |
| `GET` | `/api/submissions` | List all submissions (JSON) |
| `GET` | `/api/health` | Health check |

---

## Deployment

### Frontend (Static Files)

1. Copy the repository folder (excluding `backend/`) to your web server's public directory (e.g. `/var/www/html/international-office/`).
2. Ensure the web server (Apache/Nginx) serves `index.html` as the default document.
3. No `.htaccess` rewrite rules are needed — all navigation is handled client-side via JavaScript.
4. Verify that the `Assets/` folder and all subfolders are accessible. Several folder names contain spaces (`Assets/Graphics/Petra Graphic Asset/`, `Assets/Images/Foto Rektorat/`, etc.) — confirm your server handles these correctly, or rename them and update all references in `index.html`, `styles.css`, and `main.js`.

### Backend (Flask API)

The backend must be deployed separately and kept running for the Meeting Request Form to work.

1. Copy the `backend/` folder to your server.
2. Create `backend/.env` with valid SMTP credentials (see Backend Setup above).
3. Install dependencies: `pip install -r requirements.txt`
4. Run with a production WSGI server (e.g. Gunicorn): `gunicorn -w 2 -b 0.0.0.0:3001 server:app`
5. Configure a reverse proxy (Nginx/Apache) to forward `/api/*` requests to the Flask server, or expose port `3001` directly.
6. Update the `fetch` URL in `main.js` if the backend runs on a different host or port than `http://localhost:3001`.

---

## Admin System

The site includes a lightweight CMS for managing news articles — no backend required.

### Roles & Access

| Username | Role | Publishes to tag |
|---|---|---|
| `admin_inbound` | Inbound | `#inboundstudents` |
| `admin_outbound` | Outbound | `#outboundstudents` |
| `admin_partnership` | Partnership | `#partnership` |
| `admin_head` | Head | Any tag (unrestricted) |

Passwords are defined in `ADMIN_ACCOUNTS` at the top of `JS/admin.js`. The session is stored in `sessionStorage` and cleared when the tab closes.

### How it works

1. Click the **Admin** button (bottom-right corner) to open the login modal.
2. After login, a floating action button (FAB) appears with **Add Article** and **Sign Out** options.
3. The article form collects: title, excerpt, body paragraphs, key highlights, tag, and an optional image (drag-and-drop or file picker — stored as a base64 data URL).
4. Published articles are saved to `localStorage` under the key `pcu_admin_news` and immediately merged with the static seed articles from `JS/data/news.js` via `refreshNewsData()`.
5. Admins can edit or delete their own articles; the `Head` role can manage all articles.
6. The News page "Trending" sidebar is populated from visit counts stored in `localStorage` (`pcu_article_visits`), sorted by view count descending.

> **Note:** Because articles are stored in `localStorage`, they are **device- and browser-specific** — articles published on one device will not appear on another. For a shared content store, the admin articles would need to be persisted server-side.

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

**Admin credentials in source code**
Admin usernames and passwords are hardcoded in plain text in `JS/admin.js`. Anyone who can view the page source can read them. For a production deployment, move credentials server-side or use a proper authentication service.

**Admin articles are localStorage-only**
News articles published via the admin panel are stored in `localStorage` under `pcu_admin_news`. They are per-browser and per-device — clearing browser storage or opening the site in a different browser will lose all admin-published articles. If persistence across devices is needed, articles must be saved server-side.

**Backend API URL hardcoded**
The meeting request form `POST`s to `http://localhost:3001/api/submit-meeting-request`. Before deploying to production, update this URL in `main.js` to point to the live backend host. If the backend is offline, form submissions fail gracefully with an alert directing users to email `head-partnership@petra.ac.id`.

**SMTP / email config**
Email notifications require valid SMTP credentials in `backend/.env`. If the credentials are missing or incorrect, the form submission still saves to `submissions.db` but no email is sent (a warning is printed to the server console). Ensure `backend/.env` is never committed to the repository.

**`Assets/Images/` folder size**
The `Assets/Images/` directory contains a large number of images (logos, facilities, faculty, etc.). Ensure your web server is configured to serve these files efficiently, and verify that folder names with spaces (e.g. `Foto Rektorat/`, `Petra Graphic Asset/`) are handled correctly by your server or deployment pipeline.

---

## About `fix_news.py`

This is a **one-time developer utility** that was used during development to replace a static banner in the News page with a dynamic carousel. It has already been applied — the result is baked into `index.html`.

**The IT team does not need to run this script.** It is kept in the repository for reference only and can be safely ignored or deleted.

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
