<div align="center">
  <img src="./img/mueid.jpeg" width="112" height="112" alt="MD. Mueid Shahriar" />

  # MD. Mueid Shahriar

  **Software · Interface · Visual Design**

  A personal portfolio for selected software projects, creative work, leadership experience, and professional credentials.

  <p>
    <a href="https://github.com/MueidShahriar">GitHub</a> ·
    <a href="https://www.linkedin.com/in/mueid16">LinkedIn</a> ·
    <a href="mailto:mueidshahriar_cse1616@std.bauet.ac.bd">Email</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Firebase-Realtime_Data-FFCA28?style=for-the-badge&logo=firebase&logoColor=111827" alt="Firebase Realtime Database" />
  </p>
</div>

---

## Overview

This portfolio is designed as a focused digital profile rather than a single landing page. It combines:

- Product-focused project case studies
- Technical and creative skill groups
- Organization-based leadership timelines
- Creative work and certificate galleries
- Firebase-powered visitor analytics
- Direct contact and social links

The interface uses a dark purple visual system, responsive layouts, glass-style navigation, animated page artwork, accessible focus states, and a lightweight client-side route experience.

## Portfolio sections

| Section | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Introduction, focus modes, featured work, and impact |
| About | `/about` | Background, interests, and capabilities |
| Projects | `/projects` | Selected software and web applications |
| Creative | `/creative` | Posters, identities, event graphics, and visual work |
| Skills | `/skills` | Programming, web, mobile, backend, data, and design tools |
| Experience | `/experience` | Professional experience and responsibilities |
| Leadership | `/leadership` | Organization roles, timelines, and service |
| Education | `/education` | Academic background |
| Certificates | `/certificates` | Credential search, category filters, previews, and PDFs |
| Contact | `/contact` | Contact details and message form |

## Selected work

### BAUET Blood Donation Club

A community technology platform for donor management, authentication, real-time data, analytics, and digital club operations.

**Stack:** HTML5, CSS3, JavaScript, Tailwind CSS, Firebase, Chart.js, Node.js, Express.js, Gemini AI, jsPDF, PWA

- [Live website](https://blood-donation-community.vercel.app)
- [Source code](https://github.com/MueidShahriar/BAUET-BDC)

### Smart Hall Management System

A responsive web application for hall-related management and information services.

**Stack:** HTML, Tailwind CSS, JavaScript

- [Live website](https://smart-hall-ms.vercel.app)
- [Source code](https://github.com/MueidShahriar/Smart-Hall-Management-System)

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 18, Vite 6, Tailwind CSS 4 |
| UI icons | Lucide React |
| Data and auth | Firebase Realtime Database, Firebase Authentication |
| Analytics | Firebase Analytics |
| Deployment | Vercel, GitHub Pages, or any SPA-compatible host |

## Architecture

The portfolio uses a multi-page HTML entry structure with one shared React application and one shared stylesheet. Each page entry mounts the same `App` component; the current pathname selects which section is visible.

```mermaid
flowchart TD
    Visitor[Visitor] --> Entry[HTML page entry]
    Entry --> React[React bootstrap: src/main.jsx]
    React --> App[App.jsx]
    App --> Router[Path-based page selection]
    App --> Content[Static content modules]
    Content --> Projects[projects.js]
    Content --> Skills[skills.js]
    Content --> Leadership[leadership.js]
    Content --> Certificates[certificates.js]
    App --> Theme[index.css]
    App --> Firebase[Firebase services]
    Firebase --> Auth[Anonymous authentication]
    Firebase --> Database[Realtime Database]
    Firebase --> Analytics[Analytics events]
    Public[public assets] --> App
```

### Request and rendering flow

1. The browser opens one of the entries in `pages/`, such as `pages/projects.html`.
2. Vite loads the shared `src/main.jsx` bundle.
3. `App.jsx` reads the current pathname and selects the matching portfolio section.
4. Content is rendered from the modules in `src/data/`; media is served from `public/`.
5. Visitor statistics are tracked through anonymous Firebase authentication and Realtime Database subscriptions.
6. Navigation between sections uses the direct HTML page paths while preserving the shared visual system and interactions.

### Design principles

- **Single source of truth:** portfolio content lives in data modules instead of duplicated page markup.
- **Shared presentation:** all entries reuse the same React application and CSS bundle.
- **Progressive enhancement:** certificates, project links, and creative assets remain useful as standard links.
- **Privacy-aware analytics:** visitor counters use anonymous identities and do not store contact details.
- **Content-first maintenance:** adding a project or certificate normally requires updating one data file and its assets.

## Run locally

Use a recent Node.js and npm installation.

```bash
git clone <repository-url>
cd <repository-directory>
npm install
npm run dev
```

Open the local URL printed by Vite.

### Production preview

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`. Each portfolio page has a direct HTML entry under `pages/` (`pages/about.html`, `pages/projects.html`, and so on), while the React application and shared stylesheet are bundled once and reused across pages.

## Visitor analytics

The site uses Firebase for anonymous visitor statistics. Data is stored under `portfolioStats/`:

```text
portfolioStats/
├── totalViews
├── pageViews/{page}
├── dailyViews/{YYYY-MM-DD}/total
├── dailyViews/{YYYY-MM-DD}/pages/{page}
└── presence/{anonymousUid}/{tabId}
```

Counters use database transactions to avoid overwriting concurrent visits. Daily totals use Bangladesh time, and active visitors are estimated from browser-tab presence refreshed every 30 seconds. The analytics flow does not collect names, email addresses, or contact form details.

### Firebase configuration

1. Enable **Authentication → Sign-in method → Anonymous** in Firebase Console.
2. Add the production domain under **Authentication → Settings → Authorized domains**.
3. Review and deploy the database rules:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only database
   ```

4. Build and deploy the frontend.

The browser Firebase configuration is client-side configuration, not a service-account credential. Never place service-account keys in the frontend.

## Project structure

```text
.
├── img/                    # Profile image
├── public/
│   ├── certificates/       # Certificate PDFs and preview images
│   ├── designs/            # Creative media
│   └── logos/              # Organization logos
├── src/
│   ├── data/               # Portfolio content
│   ├── App.jsx             # Routes, page sections, and interactions
│   ├── firebase.js         # Firebase initialization and analytics
│   ├── index.css           # Theme, layout, animation, and responsive styles
│   └── main.jsx            # React entry point
├── pages/
│   ├── about.html          # About page entry
│   ├── projects.html       # Projects page entry
│   ├── creative.html       # Creative page entry
│   ├── skills.html         # Skills page entry
│   ├── experience.html     # Experience page entry
│   ├── leadership.html     # Leadership page entry
│   ├── education.html      # Education page entry
│   ├── certificates.html   # Certificates page entry
│   └── contact.html        # Contact page entry
├── database.rules.json
├── firebase.json
├── index.html
├── package.json
└── vite.config.js
```

## Updating content

| Content | File |
| --- | --- |
| Projects | `src/data/projects.js` |
| Skills | `src/data/skills.js` |
| Creative gallery | `src/data/creativeWorks.js` |
| Leadership roles | `src/data/leadership.js` |
| Certificates | `src/data/certificates.js` |
| Page layout and navigation | `src/App.jsx` |
| Theme and responsive styling | `src/index.css` |
| Profile image | `img/mueid.jpeg` |

For a certificate with a local preview, place the PDF and image in `public/certificates/`, then add `pdfUrl` and `preview` paths to `src/data/certificates.js`.

---

<div align="center">
  <strong>Designed and built by MD. Mueid Shahriar</strong><br />
  <sub>Computer Science & Engineering · Software Development · Graphics Design</sub>
</div>
