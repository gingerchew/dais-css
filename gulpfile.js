const { series, parallel } = require('gulp');

const { buildCSS, devCSS, serve, observe } = require('./tasks');

const process = require('process');

exports.default = parallel(devCSS, series(serve, observe));

exports.production = series(buildCSS);

setTimeout(() => process.exit(0), 2000);
