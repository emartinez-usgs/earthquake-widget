module.exports = {
	development: {
		files: [
			{expand:true, cwd: 'node_modules/leaflet/dist', src: ['leaflet.css'], dest: '.tmp/css'},
			{expand:true, cwd: 'node_modules/leaflet/dist', src: ['leaflet-src.js'], dest: '.tmp/js'}
		]
	},
	production: {
		files: [
			// Images
			{expand:true, cwd: 'src', src: ['htdocs/img/**/*.png'], dest: 'dist'},
			{expand:true, cwd: 'src', src: ['htdocs/img/**/*.jpg'], dest: 'dist'},
			{expand:true, cwd: 'src', src: ['htdocs/img/**/*.gif'], dest: 'dist'}
		]
	}
};