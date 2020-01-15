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

const postcss = require('gulp-postcss');

function modernize() {
	//* preset-env/ Babel for CSS
	const preset = {
		env: require('postcss-preset-env'),
		config: {
			stage: 3,
			browsers: '',
			preserve: true
		}
	};

	const each = require('postcss-each');
	const custommedia = require('postcss-custom-media');
	const combine = require('postcss-combine-media-query');
	const responsivetype = require('postcss-responsive-type');
	const gradients = require('postcss-easing-gradients');
	const plugins = [each, custommedia, combine, gradients, responsivetype, preset.env(preset.config)]
	const postprocess = postcss(plugins)

	if (env === 'dev') {
		return src('./processing/main.import.css')
			.pipe(postprocess)
			.pipe(rename('main.future.css'))
			.pipe(dest('./processing'))
			.pipe(rename('dais.css'))
			.pipe(dest('.'));
	}
	return src('dais.css')
		.pipe(postprocess)
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