// const prod = process.argv.length !== 0 && process.argv.indexOf('--prod') !== -1 && true;
const processMod = require('process');

const prod = processMod.argv !== undefined && processMod.argv.indexOf('--prod') !== -1 && true;

const { series, parallel } = require('gulp');

const { buildCSS, devCSS, serve, observe } = require('./tasks');

const process = require('process');

exports.default = parallel(devCSS, series(serve, observe));

exports.production = series(buildCSS);
if (prod) setTimeout(() => process.exit(0), 2000);
// ** Add in .env support so that we can avoid running this function on default
/*
setTimeout(() => process.exit(0), 2000);
*/
