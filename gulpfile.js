const { series } = require('gulp');

const {
	imports,
	minify,
	preset,
	processes,
	env,
	cleanOutputs,
	serve,
	observe
} = require('./tasks');

exports.cleanOutputs = cleanOutputs;
if (env === 'dev') {
	exports.build = series(cleanOutputs, imports, processes, serve, observe);
} else {
	exports.build = series(cleanOutputs, imports, processes, preset, minify);
}