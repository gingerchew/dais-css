const paths = {
	start: './src/css/main.css',
	dest: {
		dev: './processing',
		prod: '.'
	},
	outputs: ['dais.css', 'dais.min.css', 'dais.min.css.map'],
	glob: ['src/css/*.css', '!src/css/main.css', 'styles.css'],
	main: './index.html',
	baseDir: './'
};

module.exports = paths;
