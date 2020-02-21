const { series, parallel } = require('gulp');

const { buildCSS, devCSS, serve, observe } = require('./tasks');

const process = require('process');

const exit = function(done) {
	return new Promise((resolve) => {
		resolve(() => process.exit(0));
		done();
	});
};

exports.default = parallel(devCSS, series(serve, observe));

exports.production = series(buildCSS);
