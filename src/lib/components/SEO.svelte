<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { siteConfig } from '$lib/data/site';

	// Props with sensible defaults from siteConfig
	let {
		title = '',
		description = siteConfig.description,
		ogType = 'website',
		ogImage = siteConfig.ogImage,
		article
	}: {
		title?: string;
		description?: string;
		ogType?: 'website' | 'article';
		ogImage?: string;
		article?: { publishedTime?: string; tags?: string[] };
	} = $props();

	// Build the full page title — "Page — Site Name" or just "Site Name — Title"
	let fullTitle = $derived(
		title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.title}`
	);

	// Canonical URL: strip base path prefix to avoid doubling when siteConfig.url already includes it
	let canonical = $derived(() => {
		const pathname = page.url.pathname;
		const stripped = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
		return `${siteConfig.url}${stripped}`;
	});

	// Resolve OG image to absolute URL
	let ogImageUrl = $derived(
		ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical()} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical()} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content={siteConfig.name} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />

	<!-- Article-specific tags (blog posts) -->
	{#if article?.publishedTime}
		<meta property="article:published_time" content={article.publishedTime} />
	{/if}
	{#if article?.tags}
		{#each article.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>
