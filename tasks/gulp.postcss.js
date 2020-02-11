const { src, dest, series } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const eachPost = require('postcss-each');
const responsiveTypePost = require('postcss-responsive-type');
const mediaQueriesPost = require('postcss-combine-media-query');
const presetPost = require('postcss-preset-env');
const nanoPost = require('cssnano');

const { dest: { dev, prod } } = paths = require('./gulp.paths');

const plugins = {
    process: [
        eachPost(),
        responsiveTypePost(),
        mediaQueriesPost()
    ],
    preset: {
        config: {
            stage: 1,
            browsers: '',
            preserve: true,
        }
    },
    min: [
        nanoPost()
    ]
};

function each() {
    return src('./processing/main.import.css')
        .pipe(postcss([eachPost()]))
        .pipe(rename('main.each.css'))
        .pipe(dest(dev));
}

function responsiveType() {
    return src('./processing/main.each.css')
        .pipe(postcss([responsiveTypePost()]))
        .pipe(rename('main.type.css'))
        .pipe(dest(dev));
}

function mediaQueries() {
    return src('./processing/main.type.css')
        .pipe(postcss([mediaQueriesPost()]))
        .pipe(rename('main.media.css'))
        .pipe(dest(dev));
}

function processed() {
    return src('./processing/main.media.css')
        .pipe(rename('main.processed.css'))
        .pipe(dest(dev))
        .pipe(rename('dais.css'))
        .pipe(dest(prod));
}

/* Internal functions */
function preset() {
    return src('./dais.css')
        /*
         * ! Error - Message: Cannot read property 'root' of undefined
         * 
         * fileName: /Users/gngrchw/Code/dais-css/dais.css
         *   domainEmitter: [object Object]
         *   domainThrown: false
         */
        .pipe(postcss(presetPost(plugins.preset)))
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

module.exports = {
    minify,
    preset,
    processed,
    processes: series(each, responsiveType, mediaQueries, processed),
    each,
    responsiveType,
    mediaQueries
};