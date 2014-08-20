module.exports = (function () {
	'use strict';

	var modules = require('glob').sync('test/spec/**/*.js');

	var testFiles = {};

	modules.forEach(function (module) {
		var compiled = '.tmp/' + module;
		testFiles[compiled] = [module];
	});

	return {
		development: {
			src: ['src/htdocs/js/main.js'],
			dest: '.tmp/js/usgs-earthquake-map.js',
			options: {
				alias: [
					'leaflet:node_modules/leaflet/dist/leaflet-src.js'
				],
				bundleOptions: {
					debug: true
				}
			}
		},
		test: {
			files: testFiles,
			options: {
				bundleOptions: {
					debug: true
				}
			}
		}
	};
})();