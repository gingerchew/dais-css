const rimraf = require('rimraf');

const {
	dest: { dev },
	outputs
} = (paths = require('./gulp.paths'));

const clean = (glob, cb) => rimraf(glob, [], cb);
clean.description = `Cleans a file/directory based on a given glob and a callback func (usually just use the abstract gulp(done))`;

function cleanOutputs(done) {
	return [...outputs, dev].forEach((file) => clean(file, done));
}
cleanOutputs.description = `Spring cleans the directory: ${outputs.forEach((output) => `${output},`)} and ${dev}`;

exports.cleanOutputs = cleanOutputs;

function cleanProcesses(done) {
	clean(dev, done);
	done();
}
cleanProcesses.description = `executes 'rm -rf' on ${dev}`;

module.exports = {
	cleanOutputs
};
