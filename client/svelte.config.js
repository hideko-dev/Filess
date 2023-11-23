import adapter from '@sveltejs/adapter-cloudflare';

const config = {
	kit: {
		adapter: adapter(),
		outDir: ".extend",
		files: {
			routes: "src/pages",
			appTemplate: "src/static.html"
		}
	},
};

export default config