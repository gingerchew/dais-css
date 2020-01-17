const env = process.env.NODE_ENV;

const rimraf = require('rimraf');

const clean = (glob, cb) => rimraf(glob, [], cb);

module.exports = {
    clean,
    env,
};