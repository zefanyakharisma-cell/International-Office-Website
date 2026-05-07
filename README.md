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
└── Assets/
    └── Graphics/
        ├── logo-UKP.svg
        └── Petra Graphic Asset/
            └── *.svg   # Decorative background illustrations
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

## Runtime Configuration (Element SDK)

If `window.elementSdk` is present on the page (e.g. when embedded in a CMS or page builder), the site supports live editing of:

- Hero title and subtitle
- Section headings (Stats, Study, News)
- Background, surface, text, primary, and secondary colors
- Font family and base font size

These are configured via `defaultConfig` at the top of `main.js`.

---

## Contact

**PCU Global — Petra Christian University International Office**  
Jl. Siwalankerto 121-131, Surabaya 60236, Indonesia  
📧 General: [io@petra.ac.id](mailto:io@petra.ac.id)  
📧 Director: [io-director@petra.ac.id](mailto:io-director@petra.ac.id)

Social media: [Facebook](https://www.facebook.com/PetraChristianUniversity) · [Instagram](https://www.instagram.com/petrachristianuniversity) · [YouTube](https://www.youtube.com/c/PetraChristianUniversity) · [LinkedIn](https://www.linkedin.com/school/petra-christian-university/)

---

© 2025 PCU Global — Petra Christian University. All rights reserved.
