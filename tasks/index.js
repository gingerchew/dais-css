const paths = require('./gulp.paths');

const {
    minify,
    preset,
    processes
} = require('./gulp.postcss');

const {
    imports,
} = require('./gulp.css');

const { clean, env, cleanProcesses, cleanOutputs } = require('./gulp.utils');

const { serve, observe, reload } = require('./gulp.sync');

module.exports = {
    paths,
    minify,
    preset,
    processes,
    imports,
    clean,
    cleanOutputs,
    cleanProcesses,
    env,
    serve,
    observe,
    reload
};