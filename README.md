# PCU Global — Petra Christian University International Office Website

A single-page application (SPA) for the PCU International Office, showcasing inbound and outbound academic programs, campus facilities, news, and contact information for prospective international students and partners.

---

## Project Structure

```
├── index.html          # Main HTML file — all pages are rendered as sections inside here
├── CSS/
│   └── styles.css      # Custom styles, animations, and PCU brand variables
├── JS/
│   └── main.js         # Navigation logic, dynamic rendering, and SDK integration
├── Assets/
│   └── Graphics/
│       ├── logo-UKP.svg
│       └── Petra Graphic Asset/
│           └── *.svg   # Decorative background illustrations
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
| Vanilla JavaScript | Navigation, animations, and dynamic rendering |

No build step or package manager is required — all dependencies are loaded via CDN.

---

## Pages

Navigation is handled client-side via `navigateTo(pageId)`. The following pages are available:

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
- `preparation-arrival` — Arrival guide for incoming students *(placeholder — content pending)*
- `visa-immigration` — Visa and immigration information *(placeholder — content pending)*

> **Note for IT team:** Pages marked as *placeholder* are incomplete and should not be linked from any public-facing navigation until content is finalized.

---

## Key Features

- **Hero Carousel** — Auto-advancing slides with navigation arrows and dot indicators
- **Scroll Reveal Animations** — Sections fade in as they enter the viewport via `IntersectionObserver`
- **Animated Stat Counters** — Numbers count up when scrolled into view
- **Flip Cards** — Hover-to-flip program cards (CSS 3D transforms)
- **Program Type Selector** — Animated slide-in/out transitions for Joint vs Double Degree content
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

---

## Deployment

This is a fully static site — no server-side processing is required. To deploy:

1. Copy the entire repository folder to your web server's public directory (e.g. `/var/www/html/international-office/`).
2. Ensure the web server (Apache/Nginx) serves `index.html` as the default document.
3. No `.htaccess` rewrite rules are needed — all navigation is handled client-side via JavaScript.
4. Verify that the `Assets/` folder and all subfolders are accessible. The folder `Assets/Graphics/Petra Graphic Asset/` contains spaces in its name — confirm your server handles this correctly, or rename the folder and update the references in `index.html` and `styles.css` if needed.

---

## Known Dependencies & Limitations

**External image URLs (Unsplash)**
Several news article pages (`page-news-1` through `page-news-6`) load hero images from `https://images.unsplash.com`. These are placeholder images used during development. Before going live, replace them with actual PCU-owned images hosted locally or on a CDN.

**CDN dependencies**
The site requires an internet connection to load Tailwind CSS, Lucide Icons, and Google Fonts. If the site needs to work in an offline or intranet environment, these assets must be downloaded and self-hosted.

**`.DS_Store` file**
A `.DS_Store` file (a macOS system file) was committed to the repository. It is harmless and can be safely deleted. To prevent this in the future, ensure `.DS_Store` is listed in `.gitignore`.

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

© 2025 Zefanya Kharisma Nugroho — Petra Christian University. All rights reserved.
