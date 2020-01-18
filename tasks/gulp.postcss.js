const { src, dest, series } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const { dest: { dev, prod } } = paths = require('./gulp.paths');
const { env } = require('./gulp.utils');

const plugins = {
    process: [
        require('postcss-each'),
        require('postcss-responsive-type'),
        require('postcss-combine-media-query'),
    ],
    preset: [
        require('postcss-preset-env')({
            config: {
                stage: 3,
                browsers: '',
                preserve: true,
            }
        })
    ],
    stylelint: [
        require('stylelint'),
    ],
    min: [
        require('cssnano'),
    ]
}

function each() {
    return src('./processing/main.import.css')
        .pipe(postcss([require('postcss-each')]))
        .pipe(rename('main.each.css'))
        .pipe(dest(dev));
}

function responsiveType() {
    return src('./processing/main.each.css')
        .pipe(postcss([require('postcss-responsive-type')]))
        .pipe(rename('main.type.css'))
        .pipe(dest(dev));
}

function mediaQueries() {
    return src('./processing/main.type.css')
        .pipe(postcss([require('postcss-combine-media-query')]))
        .pipe(rename('main.media.css'))
        .pipe(dest(dev));
}

function processed() {
    return src('./processing/main.media.css')
        .pipe(rename('main.processed.css'))
        .pipe(dest(dev))
        .pipe(rename('dais.css'))
        .pipe(dest(prod))
}

/* Internal functions */
function preset() {
    return src('dais.css')
        .pipe(postcss(plugins.preset))
        .pipe(dest(prod))
}
preset.description = `Applies the preset-env from postcss to make the css more compatible`;

function minify() {
    return src('./dais.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins.min))
        .pipe(rename('dais.min.css'))
        .pipe(sourcemaps.write(prod))
        .pipe(dest(prod));
}
minify.description = `Minifies CSS and produces a sourcemap`;

exports.processes = series(each, responsiveType, mediaQueries, processed);

module.exports = {
    minify,
    preset,
    processed,
    each,
    responsiveType,
    mediaQueries
};