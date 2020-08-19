const config = require('./config.json');

module.exports = function (module) {
    return config[module];
}
