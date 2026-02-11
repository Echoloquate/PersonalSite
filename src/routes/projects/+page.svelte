<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/data/site';
	import { projects } from '$lib/data/projects';

	// Collect all unique tech tags for filtering
	const allTags = [...new Set(projects.flatMap((p) => p.tech))];

	// $state for the active filter — null means "show all"
	let activeFilter: string | null = $state(null);

	// $derived auto-recalculates when activeFilter changes
	let filtered = $derived(
		activeFilter ? projects.filter((p) => p.tech.includes(activeFilter!)) : projects
	);
</script>

<SEO title="Projects" description="Browse {siteConfig.name}'s portfolio of web development projects." />

<h1 class="mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold">Projects</h1>

<!-- Filter buttons -->
<div class="mb-8 flex flex-wrap gap-1.5 sm:gap-2">
	<button
		onclick={() => (activeFilter = null)}
		class="glass-button text-sm {activeFilter === null ? 'bg-white/20' : ''}"
	>
		All
	</button>
	{#each allTags as tag}
		<button
			onclick={() => (activeFilter = tag)}
			class="glass-button text-sm {activeFilter === tag ? 'bg-white/20' : ''}"
		>
			{tag}
		</button>
	{/each}
</div>

<!-- Project grid -->
<div class="grid gap-6 md:grid-cols-2">
	{#each filtered as project (project.slug)}
		<GlassCard hover>
			<h2 class="mb-2 text-lg sm:text-xl font-semibold">{project.title}</h2>
			<p class="mb-4 text-sm text-text-secondary">{project.description}</p>
			<div class="mb-4 flex flex-wrap gap-2">
				{#each project.tech as tag}
					<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-text-secondary">{tag}</span>
				{/each}
			</div>
			<div class="flex gap-3">
				{#if project.github}
					<a href={project.github} target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-hover">GitHub</a>
				{/if}
				{#if project.live}
					<a href={project.live} target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-hover">Live Demo</a>
				{/if}
			</div>
		</GlassCard>
	{/each}
</div>
