<script lang="ts">
	import GlassCard from '$lib/components/GlassCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/data/site';
	import { skills } from '$lib/data/skills';
</script>

<SEO title="About" description="Learn more about {siteConfig.name} — background, tech stack, and career highlights." />

<h1 class="mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold">About Me</h1>

<div class="grid gap-8 md:grid-cols-3">
	<!-- Bio (spans 2 cols on desktop) -->
	<div class="md:col-span-2">
		<GlassCard>
			<h2 class="mb-4 text-xl sm:text-2xl font-semibold">Bio</h2>
			<p class="mb-4 leading-relaxed text-text-secondary">
				I'm a full-stack developer passionate about building clean, performant web applications.
				With experience across frontend and backend technologies, I enjoy turning complex problems
				into simple, elegant solutions.
			</p>
			<p class="leading-relaxed text-text-secondary">
				When I'm not coding, you'll find me exploring new technologies, contributing to open source,
				or writing about software development on my blog.
			</p>
		</GlassCard>
	</div>

	<!-- Quick info sidebar -->
	<div>
		<GlassCard>
			<h2 class="mb-4 text-xl sm:text-2xl font-semibold">Quick Info</h2>
			<ul class="space-y-2 text-sm text-text-secondary">
				<li><span class="font-medium text-text-primary">Location:</span> Your City</li>
				<li><span class="font-medium text-text-primary">Experience:</span> X+ years</li>
				<li><span class="font-medium text-text-primary">Focus:</span> Full-Stack Web</li>
				<li>
					<span class="font-medium text-text-primary">Status:</span>
					{#if siteConfig.available}
						<span class="text-green-400">Available for work</span>
					{:else}
						<span class="text-text-muted">Not currently available</span>
					{/if}
				</li>
			</ul>
		</GlassCard>
	</div>
</div>

<!-- Tech Stack -->
<section class="mt-10">
	<h2 class="mb-6 text-xl sm:text-2xl font-semibold">Tech Stack</h2>
	<div class="grid gap-6 md:grid-cols-3">
		{#each skills as category}
			<GlassCard>
				<h3 class="mb-3 font-semibold">{category.category}</h3>
				<div class="flex flex-wrap gap-2">
					{#each category.skills as skill}
						<span class="rounded-full bg-white/10 px-3 py-1 text-sm text-text-secondary">{skill.name}</span>
					{/each}
				</div>
			</GlassCard>
		{/each}
	</div>
</section>
