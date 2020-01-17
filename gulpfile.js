const env = process.env.NODE_ENV

const { src, dest, series, watch } = require('gulp');

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
function processes() {
	const debug = require('gulp-debug');
	const plugins = [
		require('postcss-each'),
		require('postcss-responsive-type'),
		require('postcss-custom-media'),
		require('postcss-easing-gradients'),
		require('postcss-combine-media-query')
	]

	if (env === 'dev') {
		return src('./processing/main.import.css')
			.pipe(postcss(plugins))
			.pipe(rename('main.processed.css'))
			.pipe(dest('./processing'))
			.pipe(rename('dais.css'))
			.pipe(dest('.'));
	}
	return src('dais.css')
		.pipe(postcss(plugins))
		.pipe(dest('.'))

}

exports.process = processes;

/* Internal functions */
function preset() {
	const postcssPreset = [
		require('postcss-preset-env')({
			config: {
				stage: 3,
				browsers: '',
				preserve: true
			}
		})
	]

	if (env === 'dev') {
		return src('main.processed.css')
			.pipe(postcss(postcssPreset))
			.pipe(rename('main.future.css'))
			.pipe(dest('./processing'))
			.pipe(rename('dais.css'))
			.pipe(dest('.'));
	}
	return src('dais.css')
		.pipe(postcss(postcssPreset))
		.pipe(dest('.'))
}


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

function watchSources() {
	watch(['css/*.css', '!css/main.css'], series(handleImport, processes));
}

if (env === 'dev') {
	exports.build = series(handleImport, processes, watchSources);
} else {
	exports.build = series(handleImport, processes, preset, minStyles);
}