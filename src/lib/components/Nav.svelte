<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/data/site';

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/testimonials', label: 'Testimonials' },
		{ href: '/contact', label: 'Contact' }
	];

	// $state rune creates reactive state (Svelte 5 reactivity primitive)
	let mobileOpen = $state(false);

	// $derived rune computes a value that auto-updates when dependencies change
	let currentPath = $derived(page.url.pathname);
</script>

<nav class="glass-nav fixed top-4 left-1/2 z-50 -translate-x-1/2 px-2 py-2">
	<!-- Desktop nav -->
	<div class="hidden items-center gap-1 md:flex">
		<a href="{base}/" class="px-3 py-1.5 font-semibold text-text-primary">
			{siteConfig.name}
		</a>
		{#each navLinks as link}
			<a
				href="{base}{link.href}"
				class="rounded-full px-3 py-1.5 text-sm transition-colors
					{currentPath === base + link.href
					? 'bg-white/15 text-text-primary'
					: 'text-text-secondary hover:text-text-primary'}"
			>
				{link.label}
			</a>
		{/each}
	</div>

	<!-- Mobile nav toggle -->
	<div class="flex items-center justify-between md:hidden">
		<a href="{base}/" class="px-3 py-1.5 font-semibold text-text-primary">
			{siteConfig.name}
		</a>
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="rounded-lg p-2 text-text-secondary hover:text-text-primary"
			aria-label="Toggle menu"
		>
			<!-- Hamburger / X icon -->
			{#if mobileOpen}
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>
	</div>
</nav>

<!-- Mobile dropdown menu -->
{#if mobileOpen}
	<div class="glass-medium fixed top-16 left-4 right-4 z-40 flex flex-col gap-1 p-3 md:hidden">
		{#each navLinks as link}
			<a
				href="{base}{link.href}"
				onclick={() => (mobileOpen = false)}
				class="rounded-xl px-4 py-2.5 text-sm transition-colors
					{currentPath === base + link.href
					? 'bg-white/15 text-text-primary'
					: 'text-text-secondary hover:text-text-primary'}"
			>
				{link.label}
			</a>
		{/each}
	</div>
{/if}
