const paths = require('./gulp.paths');
const {
    minify,
    preset,
    processes,
} = require('./gulp.postcss');
const {
    imports,
} = require('./gulp.css');

const { clean, env } = require('./gulp.utils');

const { serve, observe, reload } = require('./gulp.sync');

module.exports = {
    paths,
    minify,
    preset,
    processes,
    imports,
    clean,
    env,
    serve,
    observe,
    reload
};