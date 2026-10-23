# Portfolio Website

Website portofolio pribadi yang dibangun menggunakan **React JS + Vite**. Data profil, pengalaman, dan proyek diambil dari API **Hustlr** (`/api/portfolio`); tech stack tetap menggunakan JSON lokal.

## ✨ Fitur

- ⚡️ Dibangun dengan Vite — build & dev server super cepat
- 🎨 Styling menggunakan Tailwind CSS dengan custom color palette (light/dark mode via CSS variables)
- 🗂️ Data-driven — konten (experience, projects, tech stack) dikelola lewat file JSON, tanpa perlu backend/database
- 🌙 Dark mode support
- 📱 Fully responsive

## 🛠️ Tech Stack

| Kategori      | Teknologi                         |
| ------------- | ---------------------------------- |
| Framework     | React JS (Vite)                    |
| Styling       | Tailwind CSS                       |
| Routing       | React Router                       |
| Animasi       | Framer Motion                      |
| Icon          | React Icons / Lucide React         |
| Form Contact  | Web3Form                           |
| Data Source   | REST API Hustlr + JSON lokal       |

## 📁 Struktur Folder

```
project-root/
├── public/
│   └── images/
│       ├── projects/
│       ├── techstack/
│       └── profile/
├── src/
│   ├── assets/
│   ├── data/
│   │   ├── experience.json
│   │   ├── projects.json
│   │   ├── techstack.json
│   │   └── profile.json
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ExperienceCard.jsx
│   │   ├── ProjectCard.jsx
│   │   └── TechStackBadge.jsx
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── main.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🚀 Instalasi & Menjalankan Project

```bash
# 1. Buat project Vite + React
npm create vite@latest portfolio -- --template react
cd portfolio

# 2. Install dependencies
npm install

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Jalankan development server
npm run dev
```

### Konfigurasi API

Default API: `http://localhost:8000/api`. Untuk environment lain, set saat build/dev:

```bash
VITE_API_BASE_URL=https://domain-hustlr/api npm run build
```

## 🎨 Tailwind Configuration

Custom color palette didefinisikan menggunakan CSS variables agar mendukung **light & dark mode** secara dinamis.

**`tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
```

**`src/main.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --text: #10161e;
    --background: #e8ebf2;
    --primary: #2e3d56;
    --secondary: #c1988b;
    --accent: #808849;
  }
  .dark {
    --text: #e0e6ee;
    --background: #0c0f16;
    --primary: #a8b7d0;
    --secondary: #734b3e;
    --accent: #aeb677;
  }
}
```

### Cara pakai warna di komponen

```jsx
<div className="bg-background text-text">
  <button className="bg-primary text-background hover:bg-accent">
    Contact Me
  </button>
  <span className="text-secondary">Secondary text</span>
</div>
```

### Toggle Dark Mode

Karena `darkMode: "class"`, tambahkan/hapus class `dark` pada elemen `<html>`:

```js
document.documentElement.classList.toggle("dark");
```

Contoh hook sederhana:

```jsx
import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, setIsDark];
}
```

## 🗃️ Struktur Data (JSON)

### `data/experience.json`
```json
[
  {
    "id": 1,
    "role": "Frontend Developer",
    "company": "PT Contoh Digital",
    "period": "2023 - Sekarang",
    "location": "Remote",
    "description": "Membangun dan memelihara aplikasi web menggunakan React dan Tailwind.",
    "highlights": [
      "Meningkatkan performa loading 40%",
      "Memimpin migrasi dari CRA ke Vite"
    ]
  }
]
```

### `data/projects.json`
```json
[
  {
    "id": 1,
    "title": "Portfolio Website",
    "description": "Website portofolio pribadi dibangun dengan React + Vite.",
    "image": "/images/projects/portfolio.png",
    "techStack": ["React", "Vite", "Tailwind CSS"],
    "liveUrl": "https://...",
    "repoUrl": "https://github.com/...",
    "featured": true
  }
]
```

### `data/techstack.json`
```json
[
  { "name": "React", "icon": "SiReact", "category": "Frontend" },
  { "name": "Tailwind CSS", "icon": "SiTailwindcss", "category": "Styling" },
  { "name": "Node.js", "icon": "SiNodedotjs", "category": "Backend" }
]
```

### `data/profile.json`
```json
{
  "name": "Nama Kamu",
  "title": "Frontend Developer",
  "bio": "Deskripsi singkat tentang diri kamu.",
  "photo": "/images/profile/photo.jpg",
  "socials": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "email": "kamu@email.com"
  }
}
```

> 💡 **Catatan penempatan gambar:** simpan gambar di folder `public/images/` (bukan `src/assets/`) agar path-nya bisa langsung dituliskan sebagai string di JSON tanpa perlu proses `import`.

## 📦 Import Data JSON di Komponen

Vite mendukung import file `.json` langsung tanpa fetch:

```jsx
import projects from "../data/projects.json";

function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}

export default Projects;
```

## 📄 Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pribadi.
# portofolio-me
