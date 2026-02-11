<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { base } from '$app/paths';
	import type { BlogPost } from '$lib/types';
	import type { Component } from 'svelte';

	// data comes from the sibling +page.ts load function
	let { data }: { data: { content: Component; metadata: Omit<BlogPost, 'slug'> } } = $props();
</script>

<SEO
	title={data.metadata.title}
	description={data.metadata.description}
	ogType="article"
	article={{ publishedTime: data.metadata.date, tags: data.metadata.tags }}
/>

<article class="mx-auto max-w-3xl">
	<!-- Post header -->
	<header class="mb-8">
		<a href="{base}/blog" class="mb-4 inline-block text-sm text-accent hover:text-accent-hover">&larr; Back to blog</a>
		<h1 class="mb-3 text-2xl sm:text-3xl md:text-4xl font-bold">{data.metadata.title}</h1>
		<div class="flex items-center gap-4 text-sm text-text-muted">
			<time datetime={data.metadata.date}>
				{new Date(data.metadata.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
			</time>
			{#if data.metadata.readingTime}
				<span>{data.metadata.readingTime}</span>
			{/if}
		</div>
		<div class="mt-3 flex flex-wrap gap-2">
			{#each data.metadata.tags as tag}
				<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-text-secondary">{tag}</span>
			{/each}
		</div>
	</header>

	<!-- Post body — rendered inside a glass card with prose typography -->
	<GlassCard>
		<div class="prose prose-lg max-w-none">
			<!-- @render would work for Snippets, but mdsvex gives us a Component, so we use <svelte:component> -->
			<data.content />
		</div>
	</GlassCard>
</article>
