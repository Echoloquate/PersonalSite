<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

	// In SvelteKit layouts, `children` is the page content rendered by the router
	let { children }: { children: Snippet } = $props();

	// View Transitions API — wraps each navigation in a browser view transition
	// for a smooth fade+blur effect between pages. Falls back gracefully in
	// browsers that don't support the API (the callback still runs, just without animation).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Nav />

<!-- pt-24 makes room for the fixed floating nav -->
<main class="mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-8">
	{@render children()}
</main>

<Footer />
