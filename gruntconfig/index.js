module.exports = (function () {
	'use strict';

	var config = {
		autoprefixer: require('./autoprefixer.js'),
		browserify: require('./browserify.js'),
		clean: require('./clean.js'),
		compass: require('./compass.js'),
		connect: require('./connect.js'),
		copy: require('./copy.js'),
		cssmin: require('./cssmin.js'),
		htmllint: require('./htmllint.js'),
		htmlmin: require('./htmlmin.js'),
		jasmine: require('./jasmine.js'),
		jshint: require('./jshint.js'),
		uglify: require('./uglify.js'),
		watch: require('./watch.js')
	};

	return config;
})();