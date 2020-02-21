const { series, parallel } = require('gulp');

const { buildCSS, devCSS, serve, observe } = require('./tasks');

exports.default = parallel(series(cleanOutputs, devCSS), series(serve, observe));
/* task.production: task runs and builds everything properly, but doesn't ever terminate back to the terminal */
exports.production = buildCSS;
