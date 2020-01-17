const { src, dest } = require('gulp');

const rename = require('gulp-rename');
const cssimport = require('gulp-cssimport');

const { dest: { dev, prod }, start } = paths = require('./gulp.paths');
const { env } = require('./gulp.utils');

//* Handle imports/Concatenate Files
function imports() {
    const cssimport_options = {
        includePaths: [start]
    };

    if (env === 'dev') {
        return src(start)
            .pipe(cssimport(cssimport_options))
            .pipe(rename('main.import.css'))
            .pipe(dest(dev));
    }
    return src(start)
        .pipe(cssimport(cssimport_options))
        .pipe(rename('dais.css'))
        .pipe(dest(prod));
}
imports.description = `Reads ${start} and imports based off of the @import rules`;

module.exports = {
    imports,
};