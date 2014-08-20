module.exports = {
	css: {
		files: ['src/htdocs/css/**/*.css', '.tmp/css/**/*.css'],
		tasks: ['autoprefixer:development']
	},
	html: {
		files: ['src/htdocs/**/*.html'],
		tasks: ['htmllint:development']
	},
	js: {
		files: ['src/htdocs/js/**/*.js'],
		tasks: ['jshint:development', 'browserify:development']
	},
	scss: {
		files: ['src/htdocs/css/**/*.scss'],
		tasks: ['compass:development', 'autoprefixer:development']
	},

	gruntfile: {
		options: {
			reload: true
		},
		files: ['Gruntfile.js'],
		tasks: ['jshint:gruntfile']
	},

	livereload: {
		options: {
			livereload: true
		},
		files: [
			'.tmp/js/**/*.js',
			'.tmp/css/**/*.css',

			'src/htdocs/**/*.html',
			'src/htdocs/css/**/*.css'
		]
	}
};