# 📄 CV Studio

> An elegant, open-source CV & Resume builder built with **Svelte 5**, **SvelteKit**, and **Tailwind CSS v4**. Designed for medical, academic, engineering, and corporate professionals.

[![Svelte 5](https://img.shields.io/badge/Svelte-5.0-orange.svg)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-Latest-red.svg)](https://kit.svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- **🎨 3 Professional Design Templates**:
  - **Modern (Bubbles)**: Vibrant 2-column layout with visual section anchors and accent styling.
  - **Executive (Ribbon)**: Sophisticated folded ribbon header with circular proficiency indicators.
  - **Academic (Sidebar)**: High-impact dark sidebar layout tailored for medical practitioners, researchers, and academics.
- **🌈 Customizable Color Palettes**: Switch color themes dynamically per template in real-time.
- **📝 Live Interactive Preview**: Split-screen workflow with instant rendering of form inputs.
- **✨ Rich Text Summary & Notes**: Full formatting support (bold, lists, links) for career descriptions and summaries.
- **🖨️ Pixel-Perfect PDF Export**: Built-in print CSS rules ensuring pristine A4 pagination without unwanted layout shifts or overflow.
- **🔒 100% Client-Side & Private**: All data remains stored safely in your browser's local storage (`localStorage`). No tracking, no external database, no mandatory sign-ups.

---

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev) (Static Site Generation with `@sveltejs/adapter-static`)
- **UI & Components**: [Svelte 5 Runes](https://svelte.dev/docs/svelte/runes), Bits UI & Lucide Icons
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Rich Text Editing**: Quill.js
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **pnpm** (or npm/yarn/bun) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cv-studio.git
   cd cv-studio
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Scripts

- `pnpm dev` - Start local development server
- `pnpm build` - Generate static production build
- `pnpm preview` - Preview production build locally
- `pnpm check` - Run TypeScript and Svelte diagnostics

---

## 📁 Project Structure

```text
cv-studio/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── form/                # Form section components
│   │   │   ├── templates/           # Resume templates (Template1, Template2, Template3)
│   │   │   ├── ui/                  # UI primitive components
│   │   │   └── TemplatePickerModal  # Interactive 3D gallery modal
│   │   ├── store.ts                 # Reactive Svelte store & state persistence
│   │   ├── themes.ts                # Color palette tokens & themes
│   │   ├── types.ts                 # TypeScript interfaces & data models
│   │   └── utils.ts                 # Class merger & helper functions
│   └── routes/
│       ├── +layout.svelte           # Root application layout
│       ├── +page.svelte             # Main workspace (Form + Live Preview)
│       └── layout.css               # Design tokens, Tailwind CSS & Print styles
├── static/                          # Static assets
└── vite.config.ts                   # Vite & SvelteKit configuration
```

---

## 🌐 Deployment

This application builds to static HTML/CSS/JS and can be hosted anywhere:

- **Cloudflare Pages**: Point to your repo and set build output directory to `build`.
- **Vercel**: Deploy as a static project.
- **GitHub Pages**: Build with `pnpm build` and deploy the `build` directory.

---

## 🤝 Contributing

Contributions, feature suggestions, and pull requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
