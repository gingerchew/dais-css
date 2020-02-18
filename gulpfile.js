const { series, parallel } = require('gulp');

const { imports, minify, preset, processes, cleanOutputs, serve, observe } = require('./tasks');

exports.cleanOutputs = cleanOutputs;

exports.default = parallel(series(cleanOutputs, imports, processes), series(serve, observe));
/* task.production: task runs and builds everything properly, but doesn't ever terminate back to the terminal */
exports.production = series(cleanOutputs, imports, processes, preset, minify);
