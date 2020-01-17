const paths = {
    start: './css/main.css',
    dest: {
        dev: './processing',
        prod: '.'
    },
    outputs: ['dais.css', 'dais.min.css', 'dais.min.css.map'],
    glob: ['css/*.css', '!css/main.css'],
}

module.exports = paths;