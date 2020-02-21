const { src, dest, series } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const importGulp = require('gulp-cssimport');
const eachPost = require('postcss-each');
const responsiveTypePost = require('postcss-responsive-type');
const mediaQueriesPost = require('postcss-combine-media-query');
const presetPost = require('postcss-preset-env');
const nanoPost = require('cssnano');

const paths = require('./gulp.paths');
const {
	dest: { dev, prod }
} = paths;

const plugins = {
	process: [eachPost(), responsiveTypePost(), mediaQueriesPost()],
	preset: {
		config: {
			stage: 1,
			browsers: '',
			preserve: true
		}
	},
	min: [nanoPost()]
};
plugins.all = [eachPost(), responsiveTypePost(), mediaQueriesPost(), presetPost(plugins.preset)];
function each() {
	return src('./processing/imports.css')
		.pipe(postcss([eachPost()]))
		.pipe(rename('each.css'))
		.pipe(dest(dev));
}

function responsiveType() {
	return src('./processing/each.css')
		.pipe(postcss([responsiveTypePost()]))
		.pipe(rename('type.css'))
		.pipe(dest(dev));
}

function mediaQueries() {
	return src('./processing/type.css')
		.pipe(postcss([mediaQueriesPost()]))
		.pipe(rename('media.css'))
		.pipe(dest(dev));
}

function processed() {
	return src('./processing/media.css')
		.pipe(rename('processed.css'))
		.pipe(dest(dev))
		.pipe(rename('dais.css'))
		.pipe(dest(prod));
}

/* Internal functions */
function preset() {
	return src('./dais.css')
		.pipe(postcss([presetPost(plugins.preset)]))
		.pipe(dest(prod));
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

function buildCSS() {
	const d = 'dist/';
	const s = 'src/css/main.css';
	return src(s)
		.pipe(
			importGulp({
				includePaths: [s]
			})
		)
		.pipe(postcss(plugins.all))
		.pipe(rename('dais.css'))
		.pipe(dest(d))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(postcss([nanoPost()]))
		.pipe(dest(d));
}

function devCSS() {
	const d = 'src/';
	const s = 'src/css/main.css';

	return src(s)
		.pipe(
			importGulp({
				includePaths: [s]
			})
		)
		.pipe(rename('dais.css'))
		.pipe(postcss(plugins.process))
		.pipe(dest(d));
}

module.exports = {
	minify,
	preset,
	processes: series(each, responsiveType, mediaQueries, processed),
	buildCSS,
	devCSS
};
