module.exports = {
	production: {
		options: {
			collapseWhitespace: true,
			keepClosingSlash: true,
			minifyJS: true,
			minifyCSS: true,
			removeComments: true
		},
		files: {
			'dist/htdocs/index.html': 'src/htdocs/index.html'
		}
	}
};