---
title: What I Learned Building My First SvelteKit Site
date: '2026-02-11'
description: Lessons from going all-in on SvelteKit and Svelte 5 as a first-timer — runes, file-based routing, and the things that surprised me.
tags:
  - svelte
  - sveltekit
  - web dev
readingTime: 6 min read
published: true
---

# What I Learned Building My First SvelteKit Site

I'd never touched Svelte before building this portfolio site. I chose SvelteKit specifically *because* it was unfamiliar — nothing forces you to learn like shipping something real. Here's what stood out.

## Svelte 5 Runes Changed How I Think About State

Coming from React, I was used to `useState` and `useEffect`. Svelte 5's runes feel like a different philosophy entirely. Instead of hooks that run on every render, runes are compile-time primitives that wire up reactivity at build time.

```svelte
<script lang="ts">
  // $state creates a reactive variable — no setter function needed
  let count = $state(0);

  // $derived automatically tracks dependencies and recalculates
  let message = $derived(
    count === 0 ? 'Click to start' : 'Clicked ' + count + ' times'
  );

  // $effect runs side effects when its dependencies change
  $effect(() => {
    console.log('Count is now: ' + count);
  });
</script>

<button onclick={() => count++}>
  {message}
</button>
```

The thing that surprised me: **there's no dependency array.** `$derived` and `$effect` track what you read automatically. No stale closure bugs. No forgotten dependencies. The compiler just figures it out.

## File-Based Routing Is Genuinely Simpler

SvelteKit uses the filesystem as the router. A file at `src/routes/blog/+page.svelte` becomes the `/blog` route. Dynamic routes use brackets — `src/routes/blog/[slug]/+page.svelte` handles `/blog/any-slug`.

The mental model is dead simple, but the real power is in the `+page.ts` load functions:

```typescript
// src/routes/blog/+page.ts
// This runs before the page renders — on the server during SSR,
// or at build time during prerendering.
export async function load() {
  const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });

  const posts = Object.entries(postFiles).map(([path, module]) => {
    const slug = path.split('/').pop()!.replace('.md', '');
    const { metadata } = module as { metadata: BlogPost };
    return { ...metadata, slug };
  });

  return { posts };
}
```

Data loading, server-side rendering, and prerendering all use the same mechanism. I didn't have to learn three different patterns for three different deployment targets.

## mdsvex Makes Blogging Feel Native

One of the best decisions was using [mdsvex](https://mdsvex.pngwn.io/) for blog posts. It's Markdown with Svelte superpowers — you write `.md` files with frontmatter, and they become full Svelte components.

```markdown
---
title: My Post
date: '2026-02-11'
tags:
  - example
---

# This is markdown

But you can also use **Svelte components** inline.
```

Combined with Shiki for syntax highlighting, the blog infrastructure took maybe 30 minutes to set up. No external CMS, no build plugins to configure, no fighting with MDX compatibility issues.

## The Layout System Is Elegant

SvelteKit has a cascading layout system. A `+layout.svelte` file wraps all pages in its directory and below:

```svelte
<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Nav />
<main>{@render children()}</main>
<Footer />
```

Every page automatically gets the nav and footer. No wrapper components, no context providers, no layout prop drilling. It just works.

## What I'd Do Differently

**Start with TypeScript from day one.** I did this and it paid off immediately — Svelte 5's type inference with `$props()` caught several bugs before I ever opened the browser.

**Don't over-abstract early.** I started extracting components too soon. Some of those "reusable" components are only used once. Let patterns emerge from repetition before you DRY things up.

**Read the SvelteKit docs cover to cover.** They're some of the best framework docs I've encountered. I wasted time googling things that were clearly explained in the official guide.

## The Verdict

SvelteKit feels like what web development should be. The compiler does the heavy lifting, the conventions are sensible, and you spend most of your time writing the thing you actually want to build — not fighting the framework.

If you're on the fence about trying Svelte, just build something. The learning curve is genuinely short, and the "aha" moments come fast.
