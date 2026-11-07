import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        about: "pages/about.html",
        projects: "pages/projects.html",
        creative: "pages/creative.html",
        skills: "pages/skills.html",
        experience: "pages/experience.html",
        leadership: "pages/leadership.html",
        education: "pages/education.html",
        certificates: "pages/certificates.html",
        contact: "pages/contact.html",
      },
    },
  },
});
