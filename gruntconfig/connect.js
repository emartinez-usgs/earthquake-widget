module.exports = {
	options: {
		debug: true,
		hostname: '*',
		open: true,
		port: 8000,
		useAvailablePort: true
	},

	development: {
		options: {
			base: ['src/htdocs', '.tmp'],
			livereload: true
		}
	},

	production: {
		options: {
			base: ['dist/htdocs']
		}
	}
};