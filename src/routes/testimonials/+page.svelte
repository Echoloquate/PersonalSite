<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { testimonials } from '$lib/data/testimonials';
</script>

<SEO title="Testimonials" description="What colleagues and clients say about working together." />

<h1 class="mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold">Testimonials</h1>

<div class="grid gap-6 md:grid-cols-2">
	{#each testimonials as testimonial}
		<GlassCard>
			<blockquote class="mb-4 italic leading-relaxed text-text-secondary">
				"{testimonial.quote}"
			</blockquote>
			<div class="text-sm">
				<p class="font-semibold text-text-primary">{testimonial.name}</p>
				<p class="text-text-muted">{testimonial.role}, {testimonial.company}</p>
			</div>
		</GlassCard>
	{/each}
</div>
