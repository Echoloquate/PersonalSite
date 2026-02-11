<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/data/site';
	import { slide, fade } from 'svelte/transition';

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/testimonials', label: 'Testimonials' },
		{ href: '/contact', label: 'Contact' }
	];

	let mobileOpen = $state(false);
	let currentPath = $derived(page.url.pathname);

	// Hide nav when scrolling down, show after sustained upward scroll
	let hidden = $state(false);
	let lastScrollY = $state(0);
	let scrollDelta = $state(0); // accumulates scroll direction

	$effect(() => {
		function onScroll() {
			const y = window.scrollY;
			const diff = y - lastScrollY;

			// Always show nav near the top of the page
			if (y < 60) {
				hidden = false;
				scrollDelta = 0;
				lastScrollY = y;
				return;
			}

			// Accumulate delta in the current direction, reset on direction change
			if ((diff > 0 && scrollDelta < 0) || (diff < 0 && scrollDelta > 0)) {
				scrollDelta = 0;
			}
			scrollDelta += diff;

			// Require ~30px of sustained scroll before toggling
			if (scrollDelta > 30) {
				hidden = true;
				mobileOpen = false;
			} else if (scrollDelta < -30) {
				hidden = false;
			}

			lastScrollY = y;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<nav
	class="glass-nav fixed top-4 left-1/2 z-50 -translate-x-1/2 max-w-[calc(100vw-2rem)] px-2 py-2
		transition-transform duration-300 {hidden ? '-translate-y-[calc(100%+2rem)]' : ''}"
>
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
	<div
		class="glass-medium fixed top-16 left-4 right-4 z-40 flex flex-col gap-1 p-3 md:hidden"
		transition:slide={{ duration: 250 }}
	>
		{#each navLinks as link, i}
			<a
				href="{base}{link.href}"
				onclick={() => (mobileOpen = false)}
				class="rounded-xl px-4 py-2.5 text-sm transition-colors
					{currentPath === base + link.href
					? 'bg-white/15 text-text-primary'
					: 'text-text-secondary hover:text-text-primary'}"
				in:fade={{ delay: 30 * i, duration: 150 }}
			>
				{link.label}
			</a>
		{/each}
	</div>
{/if}
