import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

// Create a Shiki highlighter instance (cached after first call)
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'bash', 'json', 'markdown']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Tell SvelteKit to also treat .md files as pages
	extensions: ['.svelte', '.md'],

	// mdsvex preprocessor turns Markdown into Svelte components
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: (code, lang) => {
					// Fall back to 'text' for languages not loaded in the highlighter
					const loaded = highlighter.getLoadedLanguages();
					const safeLang = loaded.includes(lang ?? '') ? lang : 'text';
					return `{@html \`${highlighter.codeToHtml(code, { lang: safeLang || 'text', theme: 'github-dark' })}\`}`;
				}
			}
		})
	],

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: ''
		}
	}
};

export default config;
