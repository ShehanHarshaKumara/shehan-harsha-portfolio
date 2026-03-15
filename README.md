# Shehan Harsha Kumara — Developer Portfolio

A modern, responsive developer portfolio website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- **Hero** — Animated typewriter effect, social links, CV download
- **About** — Bio with tech highlight cards
- **Skills** — Tech stack grid with brand icons (Frontend, Backend, Database, Tools & Cloud)
- **Projects** — Live GitHub repository cards fetched via GitHub API
- **Timeline** — Education & experience in alternating card layout
- **Contact** — Contact form with mailto handler + social links
- **Footer** — Social icons and branding

## 🚀 Tech Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations & scroll effects
- [React Icons](https://react-icons.github.io/react-icons/) — icon library
- [Axios](https://axios-http.com/) — GitHub API requests

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## 🎨 Customisation

Update the following files to personalise the portfolio:

| File | What to change |
|------|---------------|
| `src/components/Hero.tsx` | Name, description, social links |
| `src/components/About.tsx` | Bio text, highlights |
| `src/components/Skills.tsx` | Tech stack categories and icons |
| `src/components/Projects.tsx` | GitHub username for API fetch |
| `src/components/Timeline.tsx` | Education and work experience entries |
| `src/components/Contact.tsx` | Email address, social links |
| `src/components/Footer.tsx` | Social links |
| `public/resume.pdf` | Add your CV file |
