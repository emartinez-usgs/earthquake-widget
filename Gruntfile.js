module.exports = function (grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var gruntConfig = require('./gruntconfig');
	grunt.initConfig(gruntConfig);


	grunt.registerTask('development', [
		'copy:development',
		'browserify:development',
		'compass:development',
		'autoprefixer:development',
	]);

	grunt.registerTask('production', [
		'development',

		'copy:production',
		'htmlmin:production',
		'uglify:production',
		'cssmin:production'
	]);

	grunt.registerTask('test', function (save) {
		var tasks = ['browserify:test', 'jasmine:test'];

		if (save) {
			tasks.push('jasmine:test:build');
		}

		grunt.task.run(tasks);
	});

	grunt.registerTask('preview', function (subtask) {
		var task = subtask || 'development', tasks;

		if (task === 'development') {
			tasks = ['development', 'connect:development', 'watch'];
		} else if (task === 'production') {
			tasks = ['production', 'connect:production:keepalive'];
		}

		grunt.task.run(tasks);
	});

	grunt.registerTask('default', ['preview:development']);
};