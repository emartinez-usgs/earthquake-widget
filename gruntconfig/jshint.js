module.exports = {
	options: {
		bitwise: true,
		curly: true,
		eqeqeq: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		quotmark: 'single',
		undef: true,
		unused: true,
		strict: true,
		trailing: true,

		smarttabs: true,

		browser: true,
		node: true
	},
	development: {
		files: {
			src: ['src/htdocs/js/**/*.js']
		}
	},
	gruntfile: {
		files: {
			src: ['Gruntfile.js']
		}
	}
};