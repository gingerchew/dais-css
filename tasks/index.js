const { minify, preset, processes, buildCSS, devCSS } = require('./gulp.postcss');

const { cleanOutputs, cleanProcesses } = require('./gulp.utils');

const { serve, observe } = require('./gulp.sync');

module.exports = {
	minify,
	preset,
	processes,
	cleanOutputs,
	cleanProcesses,
	serve,
	observe,
	buildCSS,
	devCSS
};
