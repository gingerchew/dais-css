const env = process.env.NODE_ENV;

const rimraf = require('rimraf');

const clean = (glob, cb) => rimraf(glob, [], cb);
clean.description = `Cleans a file/directory based on a given glob and a callback func (usually just use the abstract gulp(done))`;

module.exports = {
    clean,
    env,
};