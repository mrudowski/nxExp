const baseConfig = require('../../eslint.config.js');
const reactConfig = require('../../eslint-react.config.js');

module.exports = [...baseConfig, ...reactConfig];
