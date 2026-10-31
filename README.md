# MD. Mueid Shahriar — Portfolio

A responsive, multi-page portfolio for **MD. Mueid Shahriar**, a computer science student and frontend developer with an interest in visual design. The site brings together selected projects, creative work, technical skills, experience, leadership, education, and contact information in one purple-themed interface.

[GitHub profile](https://github.com/MueidShahriar) · [Email](mailto:mueidshahriar_cse1616@std.bauet.ac.bd)

## Features

- Dedicated pages for Home, About, Projects, Creative, Skills, Experience, Leadership, Education, Certificates, and Contact.
- Responsive layouts for phones, tablets, and desktop screens.
- Dark purple visual theme, page graphics, animated preloader, and cursor-follow glow on pointer devices.
- Searchable quick navigation. Press **⌘K** on macOS or **Ctrl+K** on Windows and Linux.
- Firebase Analytics page-view events in production.
- Firebase Realtime Database counters for each page, website-wide views, daily views, and current online visitors.
- Live project previews when a public project URL is available, plus a filterable creative-work gallery.
- Contact form that opens a prefilled email draft.

## Tech stack

- React 18, Vite 6, and Tailwind CSS 4
- Lucide React icons
- Firebase JavaScript SDK (Analytics, Authentication, and Realtime Database)

## Run locally

Use a recent Node.js and npm installation.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal. Visitor counts include local preview visits so you can confirm the Firebase integration while developing. Opening `index.html` directly, or through Live Server on port 5500, redirects to the Vite home page.

## Build and preview

```bash
npm run build
npm run preview
```

Vite writes the generated site to `dist/`. This folder can be recreated by running the build command; edit the source files instead of generated files. When deploying to a static host, configure it to serve `index.html` for the portfolio routes.

## Firebase visitor data

The portfolio writes its public visitor statistics to the `portfolioStats` node in the Firebase Realtime Database at `https://protfolio-d8443-default-rtdb.firebaseio.com`. The browser uses Firebase's public web configuration; it does not contain a service-account key. Firebase Authentication supplies anonymous visitor identities for the database rules.

The database stores:

```text
portfolioStats/
├── totalViews
├── pageViews/{page}
├── dailyViews/{YYYY-MM-DD}/total
├── dailyViews/{YYYY-MM-DD}/pages/{page}
└── presence/{anonymousUid}/{tabId} = { page, lastSeen }
```

Counts use Realtime Database transactions to avoid overwriting concurrent increments. Daily keys use Bangladesh time. The online count is an estimate of active anonymous browser profiles; a profile is considered online while at least one tab has checked in during the last 90 seconds. A browser tab sends a presence heartbeat every 30 seconds and registers an `onDisconnect` cleanup. No names, emails, or contact details are collected by this tracking feature.

### Enable anonymous sign-in

1. Open Firebase Console → **Authentication** → **Sign-in method**.
2. Enable **Anonymous** sign-in for the `protfolio-d8443` project.
3. Confirm the deployed website's domain is listed under Authentication → **Settings** → **Authorized domains**.

Without Anonymous sign-in, database writes are rejected and the panel shows **UNAVAILABLE**.

### Apply the database rules

The repository includes `database.rules.json`, which allows public reads for the displayed aggregate statistics and restricts writes to authenticated visitors. View counters can only increase by one; presence records can only be written under the signed-in visitor's own anonymous UID and must have a recent timestamp.

To publish these rules with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only database
```

The `.firebaserc` file selects the `protfolio-d8443` Firebase project. Review the rules in Firebase Console → **Realtime Database** → **Rules** after deployment. Do not replace them with public write access such as `.write: true`.

Deploy the updated frontend after enabling Anonymous sign-in and applying the rules. The panel is shared across all portfolio routes and displays current-page views, total website views, today's views, online visitors, and visitors on the current page. Firebase Analytics also records `portfolio_page_view` events in production; find them in Firebase Console → **Analytics → Events**.

## Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Projects | `/projects` |
| Creative | `/creative` |
| Skills | `/skills` |
| Experience | `/experience` |
| Leadership | `/leadership` |
| Education | `/education` |
| Certificates | `/certificates` |
| Contact | `/contact` |

## Project structure

```text
.
├── img/
│   └── mueid.jpeg
├── src/
│   ├── data/
│   │   ├── certificates.js
│   │   ├── creativeWorks.js
│   │   ├── leadership.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── App.jsx
│   ├── firebase.js
│   ├── index.css
│   └── main.jsx
├── database.rules.json
├── firebase.json
├── index.html
├── package.json
└── vite.config.js
```

## Update portfolio content

- **Projects:** edit `src/data/projects.js`.
- **Skills:** edit `src/data/skills.js`.
- **Creative work:** edit `src/data/creativeWorks.js`.
- **Leadership:** edit `src/data/leadership.js`.
- **Pages and layout:** edit `src/App.jsx`.
- **Theme and responsive styling:** edit `src/index.css`.
- **Profile image:** replace `img/mueid.jpeg` and keep the same filename, or update its import in `src/App.jsx`.
