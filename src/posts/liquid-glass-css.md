---
title: 'Building Liquid Glass UI With Pure CSS'
date: '2026-02-09'
description: A deep dive into backdrop-filter, layered transparency, and the CSS techniques behind frosted glass interfaces.
tags:
  - css
  - design
  - tutorial
readingTime: 7 min read
published: true
---

# Building Liquid Glass UI With Pure CSS

Apple's iOS 26 popularized the "Liquid Glass" design language — translucent panels with depth, blur, and layered transparency. It looks complex, but the core techniques are surprisingly accessible with modern CSS. This post breaks down how I built the glass design system for this site.

## The Foundation: `backdrop-filter`

The entire glass effect hinges on one CSS property:

```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

`backdrop-filter: blur()` blurs whatever is *behind* the element. Combined with a semi-transparent background, it creates the frosted glass illusion. The background color tints the blur — white tints create a light frost, dark tints create a moody, deep-glass look.

The `-webkit-` prefix is still needed for Safari. Don't skip it.

## Layering for Depth

A single glass panel is flat. The Liquid Glass effect comes alive with **multiple layers at different intensities**:

```css
/* Light glass — subtle, for large background panels */
.glass-light {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
}

/* Medium glass — cards, interactive surfaces */
.glass-medium {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(24px);
}

/* Heavy glass — modals, elevated surfaces */
.glass-heavy {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40px);
}
```

The pattern: **higher elevation = more opacity + more blur.** Elements that feel "closer" to the user are more opaque and more blurred. This mimics how physical glass works — thicker glass is less transparent and distorts more.

## The Background Matters

Glass over a white background looks like nothing. Glass over a solid color looks like a tinted overlay. The effect only works when there's something visually interesting to blur. Gradient mesh backgrounds are ideal:

```css
body {
  background: #0e0e1a;
  background-image:
    radial-gradient(ellipse at 20% 20%, rgba(110, 80, 200, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 10%, rgba(60, 130, 240, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(180, 60, 200, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 10% 70%, rgba(40, 160, 200, 0.2) 0%, transparent 50%);
}
```

This stacks four radial gradients at different positions with different colors. The result is a rich, organic-looking background that gives the glass panels something beautiful to diffuse.

Key decisions:
- **Dark base color** (`#0e0e1a`) — works better with light text and white-tinted glass
- **Spread the gradients** — position them at different corners so the background varies across the page
- **Keep opacity moderate** — `0.2–0.4` range prevents any single gradient from dominating

## Borders and Shadows

Glass panels need edges and depth to feel physical. Two properties handle this:

```css
.glass {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
```

The **border** is a subtle white line that catches the "light" — it simulates the bright edge you see on real glass. Keep it thin (1px) and low opacity.

The **shadow** pushes the panel off the background. Use large blur radius (32px+) and moderate spread for a soft, diffused shadow rather than a hard drop shadow. This is what makes it feel like glass floating in space rather than a card sitting on a page.

**Border radius** should be generous. Liquid Glass avoids sharp corners entirely — 12px minimum for small elements, 20px+ for panels.

## Hover States That Feel Physical

Static glass is nice. Interactive glass is better. Hover states should feel like the panel is lifting toward you:

```css
.glass-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
```

The combination of `translateY` (moves up) and increased shadow (falls further) creates a convincing lift effect. Keep the transform small — 2px to 4px is enough. More than that feels cartoonish.

## Glass Inputs and Buttons

Form elements need the same treatment, with a few adjustments:

```css
.glass-input {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #f0f0f5;
  transition: border-color 0.2s ease;
}

.glass-input:focus {
  outline: none;
  border-color: #6eb1ff; /* accent color */
}
```

Inputs use **lower opacity and less blur** than panels — they're recessed, not elevated. The focus state swaps the border to an accent color rather than adding a glow or outline. This keeps the glass metaphor consistent.

Buttons get slightly more opacity and a hover state that increases both background opacity and shadow:

```css
.glass-button {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}
```

## Performance Considerations

`backdrop-filter` is GPU-accelerated in modern browsers, but it's not free. A few things to watch:

- **Avoid stacking too many blurred elements.** Each one composites independently. Three or four layers is fine; ten will cause jank on mobile.
- **Large blur values are more expensive.** 16px is cheap. 80px is not. Use the minimum blur that looks good.
- **Test on real mobile devices.** Desktop performance is rarely an issue. Mid-range Android phones are where you'll feel it.
- **The `-webkit-backdrop-filter` prefix** isn't just for Safari — some mobile browsers still need it.

## Browser Support

`backdrop-filter` has excellent support in 2026. Chrome, Safari, Firefox, and Edge all support it unprefixed. The main gap is older Android WebView versions, where you can provide a solid fallback:

```css
.glass {
  /* Fallback for browsers without backdrop-filter */
  background: rgba(30, 30, 50, 0.9);
}

@supports (backdrop-filter: blur(1px)) {
  .glass {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
  }
}
```

The `@supports` query lets you serve an opaque background to browsers that can't blur, while glass-capable browsers get the full effect.

## Putting It Together

The Liquid Glass design system is really just five ingredients working together:

1. **Semi-transparent backgrounds** — `rgba` with low alpha
2. **Backdrop blur** — `backdrop-filter: blur()`
3. **Gradient mesh background** — something beautiful to blur
4. **Subtle borders and shadows** — edges and depth
5. **Generous border radius** — soft, rounded corners

No JavaScript required. No canvas tricks. No SVG filters. Pure CSS, and it works in every modern browser.

The full source for this site's glass system is in `app.css` — about 90 lines of CSS that define the entire design language. Sometimes the best UI techniques are the simplest ones.
