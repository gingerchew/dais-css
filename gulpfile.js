const { series, watch } = require('gulp');

const {
	imports,
	minify,
	preset,
	processes,
	paths: { outputs, dest: { dev } },
	env,
	clean,
	serve,
	observe
} = require('./tasks');

function cleanOutputs(done) {
	[...outputs, dev].forEach(file => clean(file, done));
	// done()
}

function cleanProcesses(done) {
	clean(dev, done);
	// done();
}

if (env === 'dev') {
	exports.build = series(cleanProcesses, imports, processes, serve, observe);
} else {
	exports.build = series(cleanOutputs, imports, processes, preset, minify);
}