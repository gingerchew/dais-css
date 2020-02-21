const { series, parallel } = require('gulp');

const { buildCSS, devCSS, serve, observe } = require('./tasks');

const process = require('process');

exports.default = parallel(devCSS, series(serve, observe));

exports.production = series(buildCSS);
// ** Add in .env support so that we can avoid running this function on default
/*
setTimeout(() => process.exit(0), 2000);
*/
