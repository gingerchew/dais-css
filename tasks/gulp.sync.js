const { watch, series } = require('gulp');

const { reload, init } = require('browser-sync').create();

const { baseDir, main, glob } = paths = require('./gulp.paths');
const { imports } = require('./gulp.css');
const { processes } = require('./gulp.postcss');

function serve(done) {
    init({
        server: {
            baseDir,
            index: main
        }
    });
    done();
}

function observe() {
    watch(glob, series(imports, processes, reload));
    watch(main).on('change', reload)
}

module.exports = {
    serve,
    observe
}



