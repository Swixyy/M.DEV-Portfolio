# M.Dev Portfolio

A modern, responsive portfolio website built with Astro, Svelte, and TailwindCSS.

## Tech Stack

- **Astro** - Static Site Generator
- **Svelte** - Interactive Components
- **TailwindCSS** - Utility-first CSS Framework
- **TypeScript** - Type Safety

## Features

- **Bilingual Support** - Full English and Greek translations
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Scroll Animations** - Using svelte-inview
- **API Endpoint** - Dynamic content via Astro API
- **Circuit Line Animations** - Custom SVG background animations
- **Fountain Effect** - "Hello World" in multiple languages

## Getting Started

### Prerequisites

- Node.js >= 18.20.8
- npm >= 9.6.5

Or use Docker (recommended).

### Option 1: With Docker (Recommended)

```bash
# Build and start the container
docker-compose up --build

# The site will be available at http://localhost:4321
```

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The site will be available at http://localhost:4321
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.astro          # Navigation with language switcher
│   ├── Footer.astro          # Footer with social links
│   └── svelte/
│       ├── HeroSection.svelte      # Hero with fountain animation
│       ├── AboutSection.svelte     # About with typewriter effect
│       ├── ProjectsSection.svelte  # Projects with modal
│       └── ContactForm.svelte      # Contact form UI
├── layouts/
│   └── BaseLayout.astro      # Main layout with SEO
├── pages/
│   ├── index.astro           # English homepage
│   ├── el/
│   │   └── index.astro       # Greek homepage
│   └── api/
│       └── about.json.ts     # API endpoint for About data
├── i18n/
│   └── translations.ts       # UI translations
├── styles/
│   └── global.css            # Global styles & fonts
└── types/
    └── index.ts              # TypeScript interfaces
```

## Color Palette

| Color | RGB | Usage |
|-------|-----|-------|
| Primary Dark | rgb(12, 44, 85) | Headers, text |
| Primary | rgb(41, 99, 116) | Buttons, links |
| Primary Light | rgb(98, 159, 173) | Accents, highlights |
| Cream | rgb(237, 237, 206) | Background |

## Sections

1. **Hero** - Title, tagline, CTA buttons, animated code fountain
2. **About** - Personal bio, goals, interview highlight (API-driven)
3. **Projects** - Interactive project cards with modal details
4. **Contact** - Contact form UI

## Author

**Michael Papatatsis**

- [GitHub](https://github.com/Swixyy)
- [LinkedIn](https://www.linkedin.com/in/michael-papatatsis-in/)
- michaelpapatatsis98@gmail.com

## License

This project is for educational/portfolio purposes.
