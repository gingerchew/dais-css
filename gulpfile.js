const { series } = require('gulp');

const {
	imports,
	minify,
	preset,
	processes,
	paths: {
		outputs,
		dest: { dev }
	},
	env,
	clean,
	serve,
	observe
} = require('./tasks');

function cleanOutputs(done) {
	[...outputs, dev].forEach(file => clean(file, done));
	done();
}
cleanOutputs.description = `Spring cleans the directory: ${outputs.forEach(output => `${output},`)} and ${dev}`;

function cleanProcesses(done) {
	clean(dev, done);
	done();
}
cleanProcesses.description = `executes 'rm -rf' on ${dev}`;

if (env === 'dev') {
	exports.build = series(cleanProcesses, imports, processes, serve, observe);
} else {
	exports.build = series(cleanOutputs, imports, processes, preset, minify);
}