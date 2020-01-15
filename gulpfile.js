const env = process.env.NODE_ENV;

const { src, dest, series } = require('gulp');

const start = './css/main.css';

const rename = require('gulp-rename');

//* Handle imports/Concatenate Files
function handleImport() {
	const cssimport = require('gulp-cssimport');
	const cssimport_options = {
		includePaths: [start]
	};

	if (env === 'dev') {
		return src(start)
			.pipe(cssimport(cssimport_options))
			.pipe(rename('main.import.css'))
			.pipe(dest('./processing'));
	}
	return src(start)
		.pipe(cssimport(cssimport_options))
		.pipe(rename('dais.css'))
		.pipe(dest('.'));
}

exports.imports = handleImport;


function modernize() {
	const postcss = require('gulp-postcss');

	if (env === 'dev') {
		return src('./processing/main.import.css')
			.pipe(postcss())
			.pipe(rename('main.future.css'))
			.pipe(dest('./processing'))
			.pipe(rename('dais.css'))
			.pipe(dest('.'));
	}
	return src('dais.css')
		.pipe(postcss())
		.pipe(dest('.'))

}

exports.modernizes = modernize;

function minStyles() {
	const sourcemaps = require('gulp-sourcemaps');
	const plugins = [require('cssnano')];

	return src('./dais.css')
		.pipe(sourcemaps.init())
		.pipe(postcss(plugins))
		.pipe(rename('dais.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('.'));
}

if (env === 'dev') {
	exports.build = series(handleImport, modernize)
} else {
	exports.build = series(handleImport, modernize, minStyles);
}