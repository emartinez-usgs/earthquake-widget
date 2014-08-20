module.exports = {
	production: {
		files: [
			// Images
			{expand:true, cwd: 'src', src: ['htdocs/img/**/*.png'], dest: 'dist'},
			{expand:true, cwd: 'src', src: ['htdocs/img/**/*.jpg'], dest: 'dist'},
			{expand:true, cwd: 'src', src: ['htdocs/img/**/*.gif'], dest: 'dist'}
		]
	}
};