# CLAUDE.md — Personal Site

## Project Overview

This is a personal portfolio website for a professional programmer. It serves as a marketing tool to showcase skills, projects, and experience. The full spec lives in `README.md`.

## Tech Stack

- **SvelteKit** (Svelte 5) with file-based routing
- **Tailwind CSS** for styling
- **mdsvex** for blog posts (Markdown + Svelte components)
- **Shiki** for code syntax highlighting in blog posts

## Key Context

- **The user is learning Svelte for the first time.** Prefer clear, idiomatic Svelte 5 patterns. Use runes (`$state`, `$derived`, `$effect`) instead of Svelte 4 stores where applicable. Add brief inline comments when using non-obvious Svelte-specific patterns so the code is educational.
- **Design language: iOS 26 Liquid Glass.** All UI should follow the frosted glass / translucent panel aesthetic. Key CSS techniques:
  - `backdrop-filter: blur()` with semi-transparent `rgba` backgrounds
  - Soft diffused `box-shadow` for depth
  - Generous `border-radius` on interactive surfaces
  - Gradient mesh backgrounds that show through glass layers
  - Spring-based Svelte transitions for motion

## Pages (6 total)

1. **Home** — Hero, CTAs, featured projects, latest blog post, skills overview
2. **About** — Bio, tech stack, career highlights, resume download, headshot
3. **Projects** — Filterable project cards with descriptions, tech tags, links, screenshots
4. **Blog** — Post list with tags/filtering, individual post pages, code highlighting, read time
5. **Testimonials** — Quotes from colleagues/clients with name, role, company
6. **Contact** — Form, email fallback, social links, availability status

## Project Structure (expected once scaffolded)

```
src/
  routes/           # SvelteKit file-based routing
    +page.svelte    # Home
    +layout.svelte  # Shared layout (nav, footer, glass background)
    about/
    projects/
    blog/
    testimonials/
    contact/
  lib/
    components/     # Reusable Svelte components (GlassCard, Nav, Footer, etc.)
    styles/         # Global CSS, glass utility classes, gradient backgrounds
    data/           # Static data (projects list, testimonials, skills)
  posts/            # Markdown blog posts (.md / .svx files)
static/             # Images, resume PDF, favicon
```

## Coding Conventions

- Use Svelte 5 runes syntax (`$state`, `$derived`, `$effect`, `$props`)
- Use TypeScript (`.ts` / `lang="ts"` in Svelte files)
- Use Tailwind utilities where possible; extract custom glass/blur styles into reusable CSS classes or Svelte components when repeated
- Keep components small and focused — one responsibility per component
- Blog posts are Markdown files processed by mdsvex
- Prefer SvelteKit's built-in features (form actions, load functions, error handling) over external libraries

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run check` — Run svelte-check for type errors
