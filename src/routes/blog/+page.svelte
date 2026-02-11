<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { base } from '$app/paths';
	import type { BlogPost } from '$lib/types';

	// `data` comes from the sibling +page.ts load function
	let { data }: { data: { posts: BlogPost[] } } = $props();
</script>

<SEO title="Blog" description="Articles on web development, software engineering, and technology." />

<h1 class="mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold">Blog</h1>

{#if data.posts.length === 0}
	<GlassCard>
		<p class="text-text-secondary">No posts yet. Check back soon!</p>
	</GlassCard>
{:else}
	<div class="flex flex-col gap-6">
		{#each data.posts as post}
			<a href="{base}/blog/{post.slug}" class="group">
				<GlassCard hover>
					<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
						<div>
							<h2 class="mb-1 text-lg sm:text-xl font-semibold group-hover:text-accent">{post.title}</h2>
							<p class="mb-3 text-sm text-text-secondary">{post.description}</p>
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-text-secondary">{tag}</span>
								{/each}
							</div>
						</div>
						<div class="shrink-0 text-sm text-text-muted sm:text-right">
							<time datetime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
							{#if post.readingTime}
								<p>{post.readingTime}</p>
							{/if}
						</div>
					</div>
				</GlassCard>
			</a>
		{/each}
	</div>
{/if}
