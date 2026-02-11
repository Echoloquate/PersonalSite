import type { SiteConfig } from '$lib/types';

export const siteConfig: SiteConfig = {
	name: 'Your Name',
	title: 'Full-Stack Developer',
	description: 'I build modern web applications with clean code and great user experiences.',
	email: 'hello@example.com',
	url: 'https://echoloquate.github.io',
	// Drop a 1200×630 PNG into static/ to replace the default
	ogImage: '/og-image.png',
	social: {
		github: 'https://github.com/yourusername',
		linkedin: 'https://linkedin.com/in/yourusername',
		twitter: 'https://twitter.com/yourusername'
	},
	available: true
};
