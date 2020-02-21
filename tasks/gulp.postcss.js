const { src, dest } = require('gulp');

const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const importGulp = require('gulp-cssimport');
const eachPost = require('postcss-each');
const responsiveTypePost = require('postcss-responsive-type');
const mediaQueriesPost = require('postcss-combine-media-query');
const presetPost = require('postcss-preset-env');
const nanoPost = require('cssnano');

const preset = {
	config: {
		stage: 1,
		browsers: '',
		preserve: true
	}
};

const plugins = {
	all: [eachPost(), responsiveTypePost(), mediaQueriesPost(), presetPost(preset)],
	process: [eachPost(), responsiveTypePost(), mediaQueriesPost()]
};

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
	buildCSS,
	devCSS
};
