<script lang="ts">
	import { siteConfig } from '$lib/data/site';
</script>

<footer class="mt-12 sm:mt-20 border-t border-white/10 px-4 sm:px-6 py-8 sm:py-10 text-center text-sm text-text-secondary">
	<div class="mx-auto flex max-w-xl flex-col items-center gap-4">
		<div class="flex gap-5">
			{#if siteConfig.social.github}
				<a href={siteConfig.social.github} target="_blank" rel="noopener" class="hover:text-text-primary transition-colors">GitHub</a>
			{/if}
			{#if siteConfig.social.linkedin}
				<a href={siteConfig.social.linkedin} target="_blank" rel="noopener" class="hover:text-text-primary transition-colors">LinkedIn</a>
			{/if}
			{#if siteConfig.social.twitter}
				<a href={siteConfig.social.twitter} target="_blank" rel="noopener" class="hover:text-text-primary transition-colors">Twitter</a>
			{/if}
		</div>
		<p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
	</div>
</footer>
