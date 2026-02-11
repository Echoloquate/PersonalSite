export interface Project {
	title: string;
	slug: string;
	description: string;
	longDescription?: string;
	tech: string[];
	github?: string;
	live?: string;
	image?: string;
	featured?: boolean;
}

export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	company: string;
	image?: string;
}

export interface Skill {
	name: string;
	icon?: string;
}

export interface SkillCategory {
	category: string;
	skills: Skill[];
}

export interface BlogPost {
	title: string;
	date: string;
	description: string;
	tags: string[];
	slug: string;
	readingTime?: string;
	published?: boolean;
}

export interface SiteConfig {
	name: string;
	title: string;
	description: string;
	email: string;
	url: string;
	ogImage: string;
	social: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
	available: boolean;
}
