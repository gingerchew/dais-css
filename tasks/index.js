const { buildCSS, devCSS } = require('./gulp.postcss');

const { serve, observe } = require('./gulp.sync');

module.exports = {
	serve,
	observe,
	buildCSS,
	devCSS
};
