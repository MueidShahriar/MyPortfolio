<div align="center">
  <img src="img/mueid.jpeg" width="112" height="112" alt="Portrait of MD. Mueid Shahriar" />
  <h1>MD. Mueid Shahriar</h1>
  <p><strong>Software Developer · Visual Designer · Community Builder</strong></p>
  <p>A portfolio of practical software, creative work, and the experience behind it.</p>
  <p>
    <a href="https://github.com/MueidShahriar">GitHub</a> ·
    <a href="https://www.linkedin.com/in/mueid16">LinkedIn</a> ·
    <a href="mailto:mueidshahriar_cse1616@std.bauet.ac.bd">Email</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Firebase-Realtime_Database-FFCA28?logo=firebase&logoColor=111827" alt="Firebase Realtime Database" />
  </p>
</div>

---

## About the portfolio

This site brings together selected web and mobile projects, technical skills, visual design, leadership roles, education, and credentials. It uses a responsive purple theme with shared navigation and page layouts across ten direct-entry pages.

Highlights include:

- Project previews and links to available live sites and source code.
- Searchable certificates and a filterable creative gallery.
- A home-page portfolio assistant with guided answers and an email scheduling shortcut.
- Visitor counts and online-presence estimates powered by Firebase.
- A shared back-to-top button on every page.

## Get started

From the project directory, run:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. **Use the Vite development server, not VS Code Live Server:** the source HTML loads React modules that Live Server cannot transform.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview a completed production build |

`dist/` is generated output, not a second copy of the source. It is ignored by Git and is created only when you run `npm run build`. To preview production output:

```bash
npm run build
npm run preview
```

## Explore the site

| Page | Direct URL | What you will find |
| --- | --- | --- |
| Home | `/` | Introduction, featured work, and portfolio assistant |
| About | `/pages/about.html` | Background and approach |
| Projects | `/pages/projects.html` | Software and web projects |
| Creative | `/pages/creative.html` | Visual design gallery |
| Skills | `/pages/skills.html` | Development and design skills |
| Experience | `/pages/experience.html` | Work experience |
| Leadership | `/pages/leadership.html` | Organization roles and contributions |
| Education | `/pages/education.html` | Academic background |
| Certificates | `/pages/certificates.html` | Credentials, filters, and document previews |
| Contact | `/pages/contact.html` | Email, phone, and social links |

## Selected projects

| Project | Focus | Links |
| --- | --- | --- |
| **BAUET Blood Donation Club** | Donor management, authentication, live data, and club operations | [Website](https://blood-donation-community.vercel.app) · [Code](https://github.com/MueidShahriar/BAUET-BDC) |
| **Smart Hall Management System** | Responsive hall management application | [Website](https://smart-hall-ms.vercel.app) · [Code](https://github.com/MueidShahriar/Smart-Hall-Management-System) |
| **Ontek Horizon Web App** | Web application for an industrial attachment | [Website](https://mueidshahriar.github.io/Ontek-Horizon/) · [Code](https://github.com/MueidShahriar/Ontek-Horizon) |

The portfolio also presents the **BAUET Boral Hall Management System**, an Android project with no public build linked in the project data.

## How it works

The site has a separate HTML entry for each page, but the entries share one React application. `src/App.jsx` reads the current path and renders the matching section; content lives in `src/data/`, styling in `src/index.css`, and images and documents in `public/`.

```text
index.html + pages/*.html
           │
           └── src/main.jsx → src/App.jsx
                                 ├── src/data/      portfolio content
                                 ├── src/index.css   shared interface
                                 └── src/firebase.js visitor statistics
```

**Stack:** React 18, Vite 6, Tailwind CSS 4, Lucide React, Firebase Authentication, Firebase Realtime Database, and Firebase Analytics.

### Project layout

```text
.
├── index.html             Home entry
├── pages/                Direct entries for the other nine pages
├── src/
│   ├── App.jsx           Page content, navigation, and interactions
│   ├── data/             Projects, skills, creative work, and credentials
│   ├── firebase.js       Visitor counters and presence
│   ├── index.css         Theme and responsive styles
│   └── main.jsx          React entry point
├── public/               Favicon, designs, certificates, and logos
├── img/                  Profile photograph
├── database.rules.json   Firebase Realtime Database rules
├── firebase.json         Firebase CLI configuration
├── package.json          Dependencies and scripts
└── vite.config.js        Vite plugins and page build entries
```

### Update content

| To change | Edit |
| --- | --- |
| Projects | `src/data/projects.js` |
| Skills | `src/data/skills.js` |
| Creative gallery | `src/data/creativeWorks.js` and `public/designs/` |
| Leadership | `src/data/leadership.js` |
| Certificates | `src/data/certificates.js` and `public/certificates/` |
| Navigation and page sections | `src/App.jsx` |
| Theme and responsive layout | `src/index.css` |
| Profile photograph | `img/mueid.jpeg` |

For a new certificate, add its PDF or preview image to `public/certificates/`, then add the matching paths to `src/data/certificates.js`.

## Visitor statistics

The shared statistics component uses anonymous Firebase Authentication and Realtime Database. It tracks total and page views, daily views in Bangladesh time, and active visitors based on browser-tab presence. Presence is refreshed every 30 seconds; a tab is counted as online when its last update is within 90 seconds.

The data is stored under `portfolioStats/`. Browser Firebase configuration is included in `src/firebase.js`; database access is controlled by `database.rules.json`. To use the counters in another Firebase project, update the browser configuration, enable **Anonymous** sign-in, add the site's domain to **Authorized domains**, and deploy the database rules for that project.

```bash
firebase deploy --only database
```

Firebase Analytics events are sent only in production builds. The contact page uses direct links, and the assistant's scheduling shortcut prepares an email in the visitor's mail app.

## Deployment

Run `npm run build` and serve the resulting `dist/` directory on a static host. The build includes `index.html` and the direct HTML entries under `dist/pages/`; deploy the whole output directory so page links and public assets resolve correctly.

---

<div align="center">
  <strong>Designed and built by MD. Mueid Shahriar</strong><br />
  <sub>Software development · Visual design · Community impact</sub>
</div>
