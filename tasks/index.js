const { minify, preset, processes } = require('./gulp.postcss');

const { imports } = require('./gulp.css');

const { cleanOutputs } = require('./gulp.utils');

const { serve, observe } = require('./gulp.sync');

module.exports = {
	minify,
	preset,
	processes,
	imports,
	cleanOutputs,
	serve,
	observe
};
