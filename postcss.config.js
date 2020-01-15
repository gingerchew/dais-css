module.exports = {
    plugins: [
        require('postcss-each'),
        require('postcss-custom-media'),
        require('postcss-combine-media-query'),
        require('postcss-responsive-type'),
        require('postcss-easing-gradients'),
        require('postcss-preset-env')({
            config: {
                stage: 3,
                browsers: '',
                preserve: true
            }
        })
    ]
}