const { src, dest } = require('gulp');

const rename = require('gulp-rename');
const cssimport = require('gulp-cssimport');
const paths = require('./gulp.paths');
const {
	dest: { dev },
	start
} = paths;

//* Handle imports/Concatenate Files
function imports() {
	const cssimport_options = {
		includePaths: [start]
	};
	return src(start)
		.pipe(cssimport(cssimport_options))
		.pipe(rename('imports.css'))
		.pipe(dest(dev));
}
imports.description = `Reads ${start} and imports based off of the @import rules`;

module.exports = {
	imports
};
