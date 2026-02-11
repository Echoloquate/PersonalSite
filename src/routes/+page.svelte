<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/data/site';
	import { projects } from '$lib/data/projects';
	import { skills } from '$lib/data/skills';
</script>

<SEO />

<!-- Hero section -->
<section class="py-12 sm:py-16 md:py-20 text-center">
	<h1 class="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{siteConfig.name}</h1>
	<p class="mb-2 text-lg sm:text-xl text-text-secondary">{siteConfig.title}</p>
	<p class="mx-auto mb-8 max-w-lg text-text-secondary">{siteConfig.description}</p>
	<div class="flex flex-col sm:flex-row justify-center gap-4">
		<a href="{base}/projects" class="glass-button inline-block font-medium">View Projects</a>
		<a href="{base}/contact" class="glass-button inline-block font-medium">Get in Touch</a>
	</div>
</section>

<!-- Featured Projects -->
<section class="mb-10 sm:mb-16">
	<h2 class="mb-6 text-xl sm:text-2xl font-semibold">Featured Projects</h2>
	<div class="grid gap-6 md:grid-cols-2">
		{#each projects.filter((p) => p.featured) as project}
			<GlassCard hover>
				<h3 class="mb-2 text-lg font-semibold">{project.title}</h3>
				<p class="mb-3 text-sm text-text-secondary">{project.description}</p>
				<div class="flex flex-wrap gap-2">
					{#each project.tech as tag}
						<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-text-secondary">{tag}</span>
					{/each}
				</div>
			</GlassCard>
		{/each}
	</div>
</section>

<!-- Skills Overview -->
<section class="mb-10 sm:mb-16">
	<h2 class="mb-6 text-xl sm:text-2xl font-semibold">Skills</h2>
	<div class="grid gap-6 md:grid-cols-3">
		{#each skills as category}
			<GlassCard>
				<h3 class="mb-3 text-lg font-semibold">{category.category}</h3>
				<div class="flex flex-wrap gap-2">
					{#each category.skills as skill}
						<span class="rounded-full bg-white/10 px-3 py-1 text-sm text-text-secondary">{skill.name}</span>
					{/each}
				</div>
			</GlassCard>
		{/each}
	</div>
</section>
