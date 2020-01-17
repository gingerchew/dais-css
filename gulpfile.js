const { series, watch } = require('gulp');
const { imports, minify, preset, processes, paths: { outputs, glob, dest }, env, clean } = require('./tasks');

function watchSources() {
	watch(glob, series(imports, processes));
}

function cleanOutputs() {
	return [...outputs, dest.dev].forEach(file => clean(file));
}

function cleanProcesses() {
	return clean(dest.dev);
}

if (env === 'dev') {
	exports.build = series(cleanProcesses, imports, processes, watchSources);
} else {
	exports.build = series(cleanOutputs, imports, processes, preset, minify);
}