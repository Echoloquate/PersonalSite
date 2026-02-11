<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/data/site';
</script>

<SEO title="Contact" description="Get in touch — send a message or connect on social media." />

<h1 class="mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold">Contact</h1>

<div class="grid gap-8 md:grid-cols-2">
	<!-- Contact form -->
	<GlassCard>
		<h2 class="mb-4 text-xl sm:text-2xl font-semibold">Send a Message</h2>
		<form class="flex flex-col gap-4" method="POST">
			<input type="text" name="name" placeholder="Your name" class="glass-input" required />
			<input type="email" name="email" placeholder="Your email" class="glass-input" required />
			<textarea name="message" rows="5" placeholder="Your message" class="glass-input resize-none" required></textarea>
			<button type="submit" class="glass-button font-medium">Send Message</button>
		</form>
	</GlassCard>

	<!-- Contact info -->
	<div class="flex flex-col gap-6">
		<GlassCard>
			<h2 class="mb-4 text-xl sm:text-2xl font-semibold">Get in Touch</h2>
			<p class="mb-4 text-sm text-text-secondary">
				Prefer email? Reach me directly at
				<a href="mailto:{siteConfig.email}" class="text-accent hover:text-accent-hover">{siteConfig.email}</a>.
			</p>
			<div class="flex gap-4">
				{#if siteConfig.social.github}
					<a href={siteConfig.social.github} target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-hover">GitHub</a>
				{/if}
				{#if siteConfig.social.linkedin}
					<a href={siteConfig.social.linkedin} target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-hover">LinkedIn</a>
				{/if}
				{#if siteConfig.social.twitter}
					<a href={siteConfig.social.twitter} target="_blank" rel="noopener" class="text-sm text-accent hover:text-accent-hover">Twitter</a>
				{/if}
			</div>
		</GlassCard>

		<GlassCard>
			<h2 class="mb-3 text-xl sm:text-2xl font-semibold">Availability</h2>
			{#if siteConfig.available}
				<div class="flex items-center gap-2">
					<span class="h-2.5 w-2.5 rounded-full bg-green-400"></span>
					<span class="text-sm text-green-400">Available for new projects</span>
				</div>
			{:else}
				<div class="flex items-center gap-2">
					<span class="h-2.5 w-2.5 rounded-full bg-text-muted"></span>
					<span class="text-sm text-text-muted">Not currently available</span>
				</div>
			{/if}
		</GlassCard>
	</div>
</div>
