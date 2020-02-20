const { minify, preset, processes } = require('./gulp.postcss');

const { imports } = require('./gulp.css');

const { cleanOutputs, cleanProcesses } = require('./gulp.utils');

const { serve, observe } = require('./gulp.sync');

module.exports = {
	minify,
	preset,
	processes,
	imports,
	cleanOutputs,
	cleanProcesses,
	serve,
	observe
};
