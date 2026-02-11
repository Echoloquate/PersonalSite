# Personal Site

## Overview

A personal portfolio website for a professional programmer. The site serves as a marketing tool to showcase skills, projects, and experience to potential employers, clients, and collaborators.

---

## Process Log

This project was built collaboratively with Claude Code (Anthropic's CLI agent). Below is a record of how the spec and scaffold came together.

### Phase 1: Spec Sheet (Brainstorming Session)

The spec was generated through a conversational brainstorm. The process went roughly like this:

1. **User prompt:** "I'm working on putting together a personal site and would like some assistance writing a spec sheet. What do you think would belong in a personal website? I'm a programmer by trade and looking to market myself."
2. **Claude proposed a structure** — 4 core pages (Home, About, Projects, Contact) plus optional additions (Blog, Testimonials, Open Source contributions), along with technical considerations (responsive design, performance, SEO, accessibility, analytics).
3. **User made selections:** Include all 6 pages (the 4 core plus Blog and Testimonials). All technical considerations looked good.
4. **Claude wrote the full spec** into `README.md`, deliberately leaving two sections open-ended: Tech Stack and Design Direction.
5. **User filled in the blanks:**
   - **Framework:** SvelteKit (Svelte 5) — chosen specifically because the user had never used it and wanted to learn it.
   - **Design direction:** "iOS 26 Liquid Glass" — Claude then elaborated this into a detailed design spec covering color palette, typography, navigation, component styling, and motion.
6. **User requested a `CLAUDE.md`** to orient future sessions on the project's context, learning goals, coding conventions, and expected structure.
7. Both files were committed and pushed to main.

### Phase 2: Scaffold (Implementation Session)

With the spec and `CLAUDE.md` in place, a second session handled the full scaffold:

1. **Plan mode:** Claude read the spec and `CLAUDE.md`, explored the empty repo, and produced a step-by-step implementation plan. The user reviewed and approved it.
2. **Node.js upgrade:** The `sv` CLI required Node 20+. Upgraded from Node 18 to Node 22 via `nvm`.
3. **SvelteKit scaffold:** Ran `npx sv create` with the minimal TypeScript template.
4. **Dependencies:** Installed `mdsvex`, `shiki`, `tailwindcss`, `@tailwindcss/vite`, and `@tailwindcss/typography`.
5. **Build tool config:**
   - `svelte.config.js` — Added mdsvex preprocessor with a Shiki highlighter (github-dark theme), registered `.md` as a page extension.
   - `vite.config.ts` — Added the Tailwind CSS Vite plugin.
6. **Liquid Glass design system (`app.css`):** Defined custom design tokens via Tailwind's `@theme` directive (glass colors, blur values, border radii, shadows), a gradient mesh body background, and 6 reusable glass utility classes (`.glass`, `.glass-medium`, `.glass-heavy`, `.glass-nav`, `.glass-button`, `.glass-input`).
7. **TypeScript types and data:** Created interfaces for Project, Testimonial, Skill, BlogPost, and SiteConfig. Wrote placeholder data files for projects, testimonials, skills, and site constants.
8. **Shared components:** Built `Nav.svelte` (floating glass nav with mobile hamburger using `$state`/`$derived` runes), `Footer.svelte`, and `GlassCard.svelte` (reusable glass panel accepting Snippet children).
9. **All 6 page routes:** Home (hero + featured projects + skills), About (bio + quick info + tech stack), Projects (filterable grid with `$state`/`$derived`), Blog listing (`import.meta.glob` to load all posts), Blog `[slug]` (dynamic post page), Testimonials (quote cards), Contact (form + info + availability).
10. **Blog infrastructure:** Load functions using `import.meta.glob` for the listing and dynamic `import()` for individual slugs. An example `hello-world.md` post with frontmatter metadata and code blocks in Svelte, TypeScript, and CSS.
11. **Verification:** Dev server started clean, all 7 routes returned HTTP 200, Shiki syntax highlighting confirmed in blog HTML, `npm run check` passed with 0 errors/0 warnings, `npm run build` succeeded.
12. Committed and pushed to main.

### Phase 3: Design Refinements — Transitions, Responsive, Favicon & OG Meta

With the scaffold functional, a third session focused on design polish and SEO infrastructure:

1. **Plan mode:** Claude reviewed all existing pages and components, then produced a 7-step implementation plan covering page transitions, responsive scaling, favicon, and Open Graph meta tags. The user approved it.
2. **Types & site config:** Added `url` and `ogImage` fields to the `SiteConfig` interface and populated them in `site.ts` (GitHub Pages URL, placeholder OG image path).
3. **Favicon:** Created a hand-coded SVG favicon matching the glass aesthetic — a dark gradient squircle with `</>` code brackets in accent blue. Removed the unused default Svelte logo from `src/lib/assets/`. Added `<meta name="theme-color">` and favicon `<link>` to `app.html`.
4. **SEO component (`SEO.svelte`):** Built a reusable component rendering `<svelte:head>` with `<title>`, `<meta description>`, `<link rel="canonical">`, Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`), Twitter Card tags, and optional `article:published_time`/`article:tag` for blog posts. Props default from `siteConfig`.
5. **All 7 pages updated:** Replaced inline `<svelte:head>` blocks with the `<SEO>` component and added mobile-first responsive Tailwind classes throughout — scaled headings (`text-3xl sm:text-4xl md:text-5xl`), responsive padding/margins, stacked CTA buttons on mobile (`flex-col sm:flex-row`), and blog card layout adjustments.
6. **Component polish:** `GlassCard` got responsive padding (`p-4 sm:p-6`). `Nav` got `max-w-[calc(100vw-2rem)]` to prevent overflow on narrow viewports, plus `slide` and `fade` transitions on the mobile dropdown with staggered link entry. `Footer` got responsive spacing.
7. **Page transitions:** Added `onNavigate` in `+layout.svelte` wrapping navigation with the View Transitions API (`document.startViewTransition()`) with graceful fallback for unsupported browsers. Added glass dissolve keyframes in `app.css` — `::view-transition-old(root)` fades out with `blur(4px)`, `::view-transition-new(root)` fades in from `blur(4px)`. Also added a `transition` shorthand to the `.glass` base class for smooth hover behavior.
8. **Verification:** `svelte-check` passed with 0 errors, `npm run build` succeeded with static output.
9. Committed and pushed to main.
10. **Hook fix:** A `PreToolUse` hook for ensuring README updates before commits was erroring on Windows due to `$CLAUDE_PROJECT_DIR` not expanding. Fixed the path to use a relative path (`.claude/hooks/pre-commit-readme.mjs`).

### Phase 4: Blog Posts & Root Path

1. **Blog posts:** Wrote three example posts — "What I Learned Building My First SvelteKit Site" (SvelteKit/Svelte 5 lessons), "Agentic Coding: Lessons From Building Software With AI" (workflow best practices), and "Building Liquid Glass UI With Pure CSS" (deep dive into `backdrop-filter` and the site's design system).
2. **Shiki config fix:** Added `markdown` to the loaded languages list in `svelte.config.js` and added a safe fallback so unknown languages default to `text` instead of crashing the build.
3. **Template literal fix:** Avoided `${}` template literals in code blocks within markdown posts, as Svelte's compiler interprets them as expressions during mdsvex processing.
4. **Root path migration:** Removed the `/PersonalSite` base path from `svelte.config.js` and updated `siteConfig.url` to `https://echoloquate.github.io` after the repo was renamed to serve from root.
5. Committed and pushed to main.

---

## Pages

### 1. Home / Landing Page

- Hero section with name, professional title, and a brief tagline
- Call to action buttons (e.g., "View My Work", "Get In Touch")
- Featured projects section (2-3 highlight cards pulled from the Projects page)
- Brief skills overview or tech stack icons
- Latest blog post preview

### 2. About Me

- Professional background and personal story
- Tech stack and skills broken out by category (languages, frameworks, tools, platforms)
- Career timeline or work experience highlights
- Soft skills and working style
- Downloadable resume/CV (PDF link)
- Professional photo/headshot

### 3. Projects / Portfolio

- Filterable grid or list of projects
- Each project card includes:
  - Project name and description
  - Technologies used (tags)
  - Screenshots or demo media
  - Links to live demo and source code (GitHub)
  - Your role and key contributions
  - Problem solved / impact summary
- 3-6 featured projects minimum

### 4. Blog

- List of blog posts with title, date, excerpt, and tags
- Individual post pages with full content
- Category or tag filtering
- Code syntax highlighting for technical posts
- Estimated read time
- Share buttons (optional)

### 5. Testimonials

- Quotes from colleagues, clients, or collaborators
- Name, role, and company of the person giving the testimonial
- Photo or avatar (optional)
- Displayed as a carousel, grid, or dedicated section
- Can also be embedded as a section on the Home or About page

### 6. Contact

- Contact form (name, email, subject, message)
- Direct email link as a fallback
- Links to professional profiles:
  - GitHub
  - LinkedIn
  - Any other relevant platforms (Twitter/X, Dev.to, Stack Overflow, etc.)
- Availability status (e.g., "Open to full-time roles", "Available for freelance")
- Location / timezone info (optional)

---

## Technical Considerations

### Responsive Design
- Mobile-first approach
- Breakpoints for mobile, tablet, and desktop
- Touch-friendly navigation and interactions

### Performance
- Fast load times (target < 2s initial load)
- Optimized images (lazy loading, modern formats like WebP)
- Minimal JavaScript bundle size

### SEO
- Semantic HTML5 structure
- Meta tags (title, description, Open Graph, Twitter cards)
- Sitemap and robots.txt
- Clean URL structure

### Accessibility (a11y)
- WCAG 2.1 AA compliance
- Keyboard navigable
- Proper heading hierarchy and ARIA labels
- Sufficient color contrast

### Analytics
- Privacy-respecting analytics (e.g., Plausible, Umami, or Google Analytics)
- Track page views, referral sources, and visitor trends

---

## Tech Stack

- **Framework:** SvelteKit (Svelte 5) — full-stack framework with file-based routing, SSR/SSG support
- **Styling:** Tailwind CSS — utility-first, pairs well with Svelte's scoped styles for custom glass effects
- **Blog engine:** mdsvex — Markdown preprocessor for Svelte, supports Svelte components inside posts
- **Syntax highlighting:** Shiki (built into mdsvex) for code blocks in blog posts
- **Hosting:** Vercel or Netlify (both have first-class SvelteKit adapter support)
- **Contact form:** Formspree or SvelteKit form actions with an email API (e.g., Resend)
- **Analytics:** Plausible or Umami (lightweight, privacy-respecting)

---

## Design Direction — iOS 26 Liquid Glass

### Core Aesthetic
- Translucent, frosted glass panels (`backdrop-filter: blur()` + semi-transparent backgrounds)
- Depth and layering — floating cards and surfaces with soft, diffused shadows
- Light, airy feel with vibrant gradient backgrounds that bleed through glass layers
- Generous rounded corners on all interactive surfaces
- Subtle refraction and specular highlight effects on glass edges

### Color Palette
- Soft, muted base tones with vibrant accent colors visible through translucent layers
- Background: fluid gradient meshes (soft blues, purples, pinks, or dynamic ambient colors)
- Glass surfaces: `rgba(255, 255, 255, 0.3–0.6)` with blur overlays
- Text: high-contrast against glass (dark text on light glass, white text on dark glass)
- Accents: vibrant but not harsh — pulled from the gradient background

### Typography
- Clean sans-serif system font stack (SF Pro style): `Inter`, `system-ui`, or similar
- Light to medium font weights on glass surfaces
- Clear hierarchy: large bold headings, lighter body text

### Navigation
- Translucent floating top nav bar with glass effect
- Collapses to a glass-panel hamburger menu on mobile
- Active state indicated by a brighter glass pill or subtle glow

### Components
- Cards: frosted glass panels with soft borders and hover lift animations
- Buttons: glass-style with subtle gradient fills, hover glow effects
- Inputs: translucent fields with soft inner glow on focus
- Sections: layered glass panels at varying depths over a gradient background

### Motion & Interaction
- Smooth, spring-based transitions (Svelte's built-in transitions and animations)
- Subtle parallax or depth shifts on scroll
- Hover states: gentle scale, glow, or blur intensity changes
- Page transitions: crossfade or slide with glass opacity shifts
