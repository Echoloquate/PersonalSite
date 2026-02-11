<script lang="ts">
	import type { Snippet } from 'svelte';

	// $props rune destructures component props (Svelte 5 replacement for export let)
	let { children, hover = false, class: className = '' }: {
		children: Snippet;
		hover?: boolean;
		class?: string;
	} = $props();
</script>

<div
	class="glass p-4 sm:p-6 {hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-glass-hover' : ''} {className}"
>
	<!-- @render calls a Snippet — this is how Svelte 5 handles slot content -->
	{@render children()}
</div>
