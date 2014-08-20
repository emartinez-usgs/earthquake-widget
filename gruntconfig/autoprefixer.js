module.exports = {
	options: {
		browsers: ['last 2 versions']
	},
	development: {
		src: ['src/htdocs/css/**/*.css', '.tmp/css/**/*.css']
		// Note: Not specifying "dest" forces in-place updates
	}
};